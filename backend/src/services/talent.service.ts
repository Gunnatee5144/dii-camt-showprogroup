import { prisma } from "../lib/prisma";
import { AppError } from "../utils/errors";

const computeMatchPercentage = (requirements: string[], studentSkills: string[]) => {
  if (requirements.length === 0) {
    return 0;
  }

  const normalizedRequirements = requirements.map((item) => item.toLowerCase());
  const skillSet = new Set(studentSkills.map((item) => item.toLowerCase()));
  const matches = normalizedRequirements.filter((item) => skillSet.has(item)).length;

  return Math.round((matches / normalizedRequirements.length) * 100);
};

export const searchTalent = async (
  companyId: string,
  {
    jobId,
    q,
    major,
    minGpax,
  }: { jobId?: string; q?: string; major?: string; minGpax?: number },
) => {
  const company = await prisma.companyProfile.findUnique({
    where: { id: companyId },
  });

  if (!company) {
    throw new AppError(404, "Company profile not found");
  }

  const job = jobId
    ? await prisma.jobPosting.findUnique({
        where: { id: jobId },
      })
    : null;

  const students = await prisma.studentProfile.findMany({
    where: {
      AND: [
        major ? { major: { contains: major, mode: "insensitive" } } : {},
        typeof minGpax === "number" ? { gpax: { gte: minGpax } } : {},
        q
          ? {
              OR: [
                { user: { name: { contains: q, mode: "insensitive" } } },
                { user: { nameThai: { contains: q, mode: "insensitive" } } },
                { major: { contains: q, mode: "insensitive" } },
                {
                  skills: {
                    some: {
                      skill: { name: { contains: q, mode: "insensitive" } },
                    },
                  },
                },
              ],
            }
          : {},
        {
          OR: [
            { consent: { allowDataSharing: true } },
            {
              consent: {
                sharedWithCompanies: {
                  has: company.id,
                },
              },
            },
          ],
        },
      ],
    },
    include: {
      user: true,
      skills: { include: { skill: true } },
      portfolio: { include: { projects: true } },
      consent: true,
      badges: true,
    },
  });

  const results = students.map((student) => {
    const skillNames = student.skills.map((item) => item.skill.name);
    const matchPercentage = job
      ? computeMatchPercentage(job.requirements, skillNames)
      : computeMatchPercentage([], skillNames);

    return {
      id: student.id,
      studentId: student.studentId,
      name: student.user.name,
      nameThai: student.user.nameThai,
      major: student.major,
      year: student.year,
      gpax: student.gpax,
      skills: skillNames,
      badges: student.badges,
      portfolio: student.portfolio
        ? {
            summary: student.portfolio.summary,
            githubUrl: student.portfolio.githubUrl,
            linkedinUrl: student.portfolio.linkedinUrl,
            projectCount: student.portfolio.projects.length,
          }
        : null,
      matchPercentage,
    };
  });

  return results.sort((a, b) => b.matchPercentage - a.matchPercentage);
};
