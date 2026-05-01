import type {
  Activity,
  Appointment,
  Company,
  Course,
  Grade,
  JobPosting,
  Lecturer,
  Schedule,
  Student,
} from "@/types";
import {
  mockActivities,
  mockAppointments,
  mockCompanies,
  mockCourses,
  mockGrades,
  mockJobPostings,
  mockLecturers,
  mockMessages,
  mockStudent,
  mockStudents,
} from "@/lib/mockData";
import { asArray, asBoolean, asDate, asNumber, asRecord, asString } from "@/lib/live-data";

type MessageRow = (typeof mockMessages)[number];

const dayThai: Record<Schedule["day"], string> = {
  monday: "Monday",
  tuesday: "Tuesday",
  wednesday: "Wednesday",
  thursday: "Thursday",
  friday: "Friday",
  saturday: "Saturday",
  sunday: "Sunday",
};

const normalizeDay = (value: unknown, fallback: Schedule["day"] = "monday") => {
  const day = asString(value, fallback).toLowerCase();
  return (
    ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"].includes(day)
      ? day
      : fallback
  ) as Schedule["day"];
};

const normalizeProgram = (value: unknown, fallback: Student["program"] = "bachelor") => {
  const program = asString(value, fallback).toLowerCase();
  return (["bachelor", "master", "doctoral"].includes(program) ? program : fallback) as Student["program"];
};

const normalizeAcademicStatus = (
  value: unknown,
  fallback: Student["academicStatus"] = "normal",
) => {
  const status = asString(value, fallback).toLowerCase();
  return (["normal", "probation", "risk", "dropped"].includes(status) ? status : fallback) as Student["academicStatus"];
};

const normalizeActivityType = (value: unknown, fallback: Activity["type"] = "event") => {
  const type = asString(value, fallback).toLowerCase();
  return (
    ["event", "hackathon", "internship", "workshop", "seminar", "competition", "volunteer"].includes(type)
      ? type
      : fallback
  ) as Activity["type"];
};

const normalizeActivityStatus = (
  value: unknown,
  fallback: Activity["status"] = "upcoming",
) => {
  const status = asString(value, fallback).toLowerCase();
  return (["upcoming", "ongoing", "completed", "cancelled"].includes(status) ? status : fallback) as Activity["status"];
};

const normalizeRegistrationStatus = (
  value: unknown,
  fallback: Activity["registrationStatus"] = "open",
) => {
  const status = asString(value, fallback).toLowerCase();
  return (["open", "closed", "full"].includes(status) ? status : fallback) as Activity["registrationStatus"];
};

const normalizeAppointmentStatus = (
  value: unknown,
  fallback: Appointment["status"] = "pending",
) => {
  const status = asString(value, fallback).toLowerCase();
  return (["pending", "confirmed", "completed", "cancelled"].includes(status) ? status : fallback) as Appointment["status"];
};

const normalizePosition = (value: unknown, fallback: Lecturer["position"] = "instructor") => {
  const position = asString(value, fallback).toLowerCase();
  return (
    ["instructor", "assistant_professor", "associate_professor", "professor"].includes(position)
      ? position
      : fallback
  ) as Lecturer["position"];
};

const normalizeMaterialType = (value: unknown) => {
  const type = asString(value, "document").toLowerCase();
  return (["video", "document", "slide", "link"].includes(type) ? type : "document") as Course["materials"][number]["type"];
};

const normalizeAssignmentType = (value: unknown) => {
  const type = asString(value, "individual").toLowerCase();
  return (type === "group" ? "group" : "individual") as Course["assignments"][number]["type"];
};

const normalizeJobType = (value: unknown, fallback: JobPosting["type"] = "internship") => {
  const type = asString(value, fallback).toLowerCase();
  return (
    ["internship", "full-time", "part-time", "contract"].includes(type)
      ? type
      : fallback
  ) as JobPosting["type"];
};

const normalizeWorkType = (value: unknown, fallback: JobPosting["workType"] = "onsite") => {
  const type = asString(value, fallback).toLowerCase();
  return (["onsite", "remote", "hybrid"].includes(type) ? type : fallback) as JobPosting["workType"];
};

const normalizeJobStatus = (value: unknown, fallback: JobPosting["status"] = "open") => {
  const status = asString(value, fallback).toLowerCase();
  return (["open", "closed", "filled"].includes(status) ? status : fallback) as JobPosting["status"];
};

const normalizeCompanySize = (value: unknown, fallback: Company["size"] = "medium") => {
  const size = asString(value, fallback).toLowerCase();
  return (
    ["startup", "small", "medium", "large", "enterprise"].includes(size)
      ? size
      : fallback
  ) as Company["size"];
};

const normalizeSkillCategory = (
  value: unknown,
  fallback: Student["skills"][number]["category"] = "programming",
) => {
  const category = asString(value, fallback).toLowerCase();
  return (
    ["programming", "framework", "tool", "language", "soft_skill"].includes(category)
      ? category
      : fallback
  ) as Student["skills"][number]["category"];
};

const normalizeSkillLevel = (
  value: unknown,
  fallback: Student["skills"][number]["level"] = "intermediate",
) => {
  const level = asString(value, fallback).toLowerCase();
  return (
    ["beginner", "intermediate", "advanced", "expert"].includes(level)
      ? level
      : fallback
  ) as Student["skills"][number]["level"];
};

export const mapSchedule = (value: unknown, index = 0, fallback?: Schedule): Schedule => {
  const source = asRecord(value);
  const day = normalizeDay(source.day, fallback?.day);
  return {
    id: asString(source.id, fallback?.id ?? `schedule-${index}`),
    day,
    dayThai: asString(source.dayThai, fallback?.dayThai ?? dayThai[day]),
    startTime: asString(source.startTime, fallback?.startTime ?? "09:00"),
    endTime: asString(source.endTime, fallback?.endTime ?? "12:00"),
    room: asString(source.room, fallback?.room ?? ""),
    building: asString(source.building, fallback?.building ?? ""),
    type: (asString(source.type, fallback?.type ?? "lecture") as Schedule["type"]) || "lecture",
  };
};

export const mapCourse = (value: unknown, index = 0): Course => {
  const source = asRecord(value);
  const fallback = mockCourses[index % mockCourses.length] ?? mockCourses[0];
  const lecturer = asRecord(source.lecturer);
  const lecturerUser = asRecord(lecturer.user);
  const enrollments = asArray(source.enrollments);
  const sections = asArray(source.sections);
  const courseSchedule = asArray(source.schedule);

  const mappedSchedule = courseSchedule.length
    ? courseSchedule.map((slot, slotIndex) => mapSchedule(slot, slotIndex, fallback.schedule[slotIndex]))
    : fallback.schedule;

  return {
    ...fallback,
    id: asString(source.id, fallback.id),
    code: asString(source.code, fallback.code),
    name: asString(source.name, fallback.name),
    nameThai: asString(source.nameThai, fallback.nameThai),
    credits: asNumber(source.credits, fallback.credits),
    semester: asNumber(source.semester, fallback.semester),
    academicYear: asString(source.academicYear, fallback.academicYear),
    year: asNumber(source.year, fallback.year),
    lecturerId: asString(source.lecturerId, fallback.lecturerId),
    lecturerName: asString(
      lecturerUser.nameThai,
      asString(lecturerUser.name, fallback.lecturerName),
    ),
    description: asString(source.description, fallback.description ?? ""),
    prerequisites: asArray<string>(source.prerequisites),
    learningOutcomes: asArray<string>(source.learningOutcomes),
    syllabus: asString(source.syllabus, fallback.syllabus ?? ""),
    schedule: mappedSchedule,
    enrolledStudents: enrollments
      .map((item) => {
        const enrollment = asRecord(item);
        const student = asRecord(enrollment.student);
        return asString(enrollment.studentId, asString(student.studentId, asString(student.id)));
      })
      .filter(Boolean),
    maxStudents: asNumber(source.maxStudents, fallback.maxStudents),
    minStudents: asNumber(source.minStudents, fallback.minStudents),
    sections: sections.length
      ? sections.map((item, sectionIndex) => {
          const section = asRecord(item);
          const sectionSchedule = asArray(section.schedule);
          const fallbackSection = fallback.sections[sectionIndex] ?? fallback.sections[0];
          return {
            id: asString(section.id, fallbackSection?.id ?? `${fallback.id}-section-${sectionIndex}`),
            sectionNumber: asString(section.number, asString(section.sectionNumber, fallbackSection?.sectionNumber ?? "01")),
            room: asString(section.room, fallbackSection?.room ?? mappedSchedule[0]?.room ?? ""),
            maxStudents: asNumber(section.maxStudents, fallbackSection?.maxStudents ?? fallback.maxStudents),
            enrolledStudents: enrollments
              .filter((enrollment) => asString(asRecord(enrollment).sectionId) === asString(section.id))
              .map((enrollment) => asString(asRecord(enrollment).studentId))
              .filter(Boolean),
            schedule: sectionSchedule.length
              ? sectionSchedule.map((slot, slotIndex) => mapSchedule(slot, slotIndex, fallbackSection?.schedule[slotIndex]))
              : mappedSchedule,
          };
        })
      : fallback.sections,
    materials: asArray(source.materials).map((item, materialIndex) => {
      const material = asRecord(item);
      return {
        id: asString(material.id, `${fallback.id}-material-${materialIndex}`),
        title: asString(material.title, "Course material"),
        type: normalizeMaterialType(material.type),
        url: asString(material.url, "#"),
        uploadDate: asDate(material.uploadDate ?? material.createdAt),
        size: asString(material.size, ""),
      };
    }),
    assignments: asArray(source.assignments).map((item, assignmentIndex) => {
      const assignment = asRecord(item);
      return {
        id: asString(assignment.id, `${fallback.id}-assignment-${assignmentIndex}`),
        title: asString(assignment.title, "Assignment"),
        description: asString(assignment.description, ""),
        type: normalizeAssignmentType(assignment.type),
        dueDate: asDate(assignment.dueDate),
        maxScore: asNumber(assignment.maxScore, 100),
        submissions: asArray(assignment.submissions) as Course["assignments"][number]["submissions"],
        isPublished: asBoolean(assignment.isPublished, true),
      };
    }),
    grades: fallback.grades,
  };
};

export const mapJob = (value: unknown, index = 0): JobPosting => {
  const source = asRecord(value);
  const fallback = mockJobPostings[index % mockJobPostings.length] ?? mockJobPostings[0];
  const company = asRecord(source.company);
  const companyProfile = asRecord(source.companyProfile);
  const hasApplicationField = Object.prototype.hasOwnProperty.call(source, "applications") || Object.prototype.hasOwnProperty.call(source, "applicants");
  const rawApplications = asArray(source.applications).length ? asArray(source.applications) : asArray(source.applicants);

  return {
    ...fallback,
    id: asString(source.id, fallback.id),
    companyId: asString(source.companyId, fallback.companyId),
    companyName: asString(
      company.companyName,
      asString(companyProfile.companyName, asString(source.companyName, fallback.companyName)),
    ),
    title: asString(source.title, fallback.title),
    type: normalizeJobType(source.type, fallback.type),
    positions: asNumber(source.positions, fallback.positions),
    description: asString(source.description, fallback.description),
    responsibilities: asArray<string>(source.responsibilities).length
      ? asArray<string>(source.responsibilities)
      : fallback.responsibilities,
    requirements: asArray<string>(source.requirements).length
      ? asArray<string>(source.requirements)
      : fallback.requirements,
    preferredSkills: asArray<string>(source.preferredSkills).length
      ? asArray<string>(source.preferredSkills)
      : fallback.preferredSkills,
    salary: asString(source.salary, fallback.salary ?? ""),
    benefits: asArray<string>(source.benefits).length ? asArray<string>(source.benefits) : fallback.benefits,
    location: asString(source.location, fallback.location),
    workType: normalizeWorkType(source.workType, fallback.workType),
    startDate: source.startDate ? asDate(source.startDate, fallback.startDate) : fallback.startDate,
    deadline: asDate(source.deadline, fallback.deadline),
    applicants: hasApplicationField
      ? rawApplications.map((item, applicationIndex) => {
          const application = asRecord(item);
          return {
            id: asString(application.id, `${asString(source.id, fallback.id)}-application-${applicationIndex}`),
            jobPostingId: asString(application.jobPostingId, asString(source.id, fallback.id)),
            studentId: asString(application.studentId),
            appliedAt: asDate(application.appliedAt ?? application.createdAt),
            status: asString(application.status, "pending") as JobPosting["applicants"][number]["status"],
            coverLetter: asString(application.coverLetter),
            resumeUrl: asString(application.resumeUrl),
            notes: asString(application.notes),
          };
        })
      : fallback.applicants,
    maxApplicants: source.maxApplicants ? asNumber(source.maxApplicants, fallback.maxApplicants) : fallback.maxApplicants,
    status: normalizeJobStatus(source.status, fallback.status),
    isActive: asBoolean(source.isActive, fallback.isActive),
    postedAt: asDate(source.postedAt ?? source.createdAt, fallback.postedAt),
  };
};

export const mapCompany = (value: unknown, index = 0): Company => {
  const source = asRecord(value);
  const fallback = mockCompanies[index % mockCompanies.length] ?? mockCompanies[0];
  const user = asRecord(source.user);

  return {
    ...fallback,
    id: asString(source.id, asString(user.id, fallback.id)),
    email: asString(source.email, asString(user.email, fallback.email)),
    name: asString(source.name, asString(user.name, fallback.name)),
    nameThai: asString(source.nameThai, asString(user.nameThai, fallback.nameThai)),
    avatar: asString(source.avatar, asString(user.avatar, fallback.avatar ?? "")),
    phone: asString(source.phone, asString(user.phone, fallback.phone ?? "")),
    createdAt: asDate(source.createdAt, fallback.createdAt),
    lastLogin: source.lastLogin ? asDate(source.lastLogin) : fallback.lastLogin,
    isActive: asBoolean(source.isActive, asBoolean(user.isActive, fallback.isActive)),
    companyId: asString(source.companyId, fallback.companyId),
    companyName: asString(source.companyName, fallback.companyName),
    companyNameThai: asString(source.companyNameThai, fallback.companyNameThai),
    industry: asString(source.industry, fallback.industry),
    size: normalizeCompanySize(source.size, fallback.size),
    website: asString(source.website, fallback.website ?? ""),
    address: asString(source.address, fallback.address ?? ""),
    jobPostings: asArray(source.jobPostings).length
      ? asArray(source.jobPostings).map(mapJob)
      : fallback.jobPostings,
    internshipSlots: asNumber(source.internshipSlots, fallback.internshipSlots),
    currentInterns: asNumber(source.currentInterns, fallback.currentInterns),
    studentViewConsent: asArray<string>(source.studentViewConsent).length
      ? asArray<string>(source.studentViewConsent)
      : fallback.studentViewConsent,
    canContactStudents: asBoolean(source.canContactStudents, fallback.canContactStudents),
    messages: asArray(source.messages).length ? (asArray(source.messages) as Company["messages"]) : fallback.messages,
  };
};

export const mapStudent = (value: unknown, index = 0): Student => {
  const source = asRecord(value);
  const fallback = mockStudents[index % mockStudents.length] ?? mockStudent;
  const user = asRecord(source.user);
  const advisor = asRecord(source.advisor);
  const consent = asRecord(source.consent ?? source.dataConsent);
  const rawSkills = asArray(source.skills);
  const portfolio = asRecord(source.portfolio);

  return {
    ...fallback,
    id: asString(source.id, fallback.id),
    email: asString(source.email, asString(user.email, fallback.email)),
    name: asString(source.name, asString(user.name, fallback.name)),
    nameThai: asString(source.nameThai, asString(user.nameThai, fallback.nameThai)),
    avatar: asString(source.avatar, asString(user.avatar, fallback.avatar ?? "")),
    phone: asString(source.phone, asString(user.phone, fallback.phone ?? "")),
    createdAt: asDate(source.createdAt, fallback.createdAt),
    lastLogin: source.lastLogin ? asDate(source.lastLogin) : fallback.lastLogin,
    isActive: asBoolean(source.isActive, asBoolean(user.isActive, fallback.isActive)),
    studentId: asString(source.studentId, fallback.studentId),
    major: asString(source.major, fallback.major),
    program: normalizeProgram(source.program, fallback.program),
    year: asNumber(source.year, fallback.year),
    semester: asNumber(source.semester, fallback.semester),
    academicYear: asString(source.academicYear, fallback.academicYear),
    gpa: asNumber(source.gpa, fallback.gpa),
    gpax: asNumber(source.gpax, fallback.gpax),
    totalCredits: asNumber(source.totalCredits, asNumber(source.requiredCredits, fallback.totalCredits)),
    earnedCredits: asNumber(source.earnedCredits, fallback.earnedCredits),
    requiredCredits: asNumber(source.requiredCredits, fallback.requiredCredits),
    academicStatus: normalizeAcademicStatus(source.academicStatus, fallback.academicStatus),
    advisorId: asString(source.advisorId, asString(advisor.id, fallback.advisorId ?? "")),
    advisorName: asString(advisor.nameThai, asString(advisor.name, fallback.advisorName ?? "")),
    skills: rawSkills.length
      ? rawSkills.map((item) => {
          if (typeof item === "string") {
            return { name: item, category: "programming", level: "intermediate" } as Student["skills"][number];
          }
          const skillRow = asRecord(item);
          const skill = asRecord(skillRow.skill);
          return {
            name: asString(skill.name, asString(skillRow.name, "Skill")),
            category: normalizeSkillCategory(skill.category ?? skillRow.category),
            level: normalizeSkillLevel(skillRow.level ?? skill.level),
            verifiedBy: asString(skillRow.verifiedBy, asString(skillRow.source, "")),
          };
        })
      : fallback.skills,
    badges: asArray(source.badges).length ? (asArray(source.badges) as Student["badges"]) : fallback.badges,
    activities: asArray(source.activities).length
      ? (asArray(source.activities) as Student["activities"])
      : fallback.activities,
    totalActivityHours: asNumber(source.totalActivityHours, fallback.totalActivityHours),
    gamificationPoints: asNumber(source.gamificationPoints, fallback.gamificationPoints),
    portfolio: portfolio.studentId || portfolio.id
      ? {
          ...(fallback.portfolio ?? {
            studentId: fallback.id,
            summary: "",
            summaryThai: "",
            projects: [],
            isPublic: true,
            sharedWith: [],
            updatedAt: new Date(),
          }),
          studentId: asString(portfolio.studentId, fallback.id),
          summary: asString(portfolio.summary, fallback.portfolio?.summary ?? ""),
          summaryThai: asString(portfolio.summaryThai, fallback.portfolio?.summaryThai ?? ""),
          githubUrl: asString(portfolio.githubUrl, fallback.portfolio?.githubUrl ?? ""),
          linkedinUrl: asString(portfolio.linkedinUrl, fallback.portfolio?.linkedinUrl ?? ""),
          personalWebsite: asString(portfolio.personalWebsite, fallback.portfolio?.personalWebsite ?? ""),
          isPublic: asBoolean(portfolio.isPublic, fallback.portfolio?.isPublic ?? true),
          sharedWith: asArray<string>(portfolio.sharedWith),
          updatedAt: asDate(portfolio.updatedAt, fallback.portfolio?.updatedAt),
          projects: asArray(portfolio.projects).map((item, projectIndex) => {
            const project = asRecord(item);
            const fallbackProject = fallback.portfolio?.projects?.[projectIndex];
            return {
              id: asString(project.id, fallbackProject?.id ?? `project-${projectIndex}`),
              title: asString(project.title, fallbackProject?.title ?? "Project"),
              description: asString(project.description, fallbackProject?.description ?? ""),
              technologies: asArray<string>(project.technologies).length
                ? asArray<string>(project.technologies)
                : (fallbackProject?.technologies ?? []),
              role: asString(project.role, fallbackProject?.role ?? ""),
              startDate: asDate(project.startDate, fallbackProject?.startDate),
              endDate: project.endDate ? asDate(project.endDate, fallbackProject?.endDate) : fallbackProject?.endDate,
              url: asString(project.url, fallbackProject?.url ?? ""),
              images: asArray<string>(project.images),
              highlights: asArray<string>(project.highlights).length
                ? asArray<string>(project.highlights)
                : (fallbackProject?.highlights ?? []),
            };
          }),
        }
      : fallback.portfolio,
    internship: (source.internship as Student["internship"]) ?? fallback.internship,
    dataConsent: {
      ...fallback.dataConsent,
      studentId: asString(consent.studentId, fallback.dataConsent.studentId),
      allowDataSharing: asBoolean(consent.allowDataSharing, fallback.dataConsent.allowDataSharing),
      allowPortfolioSharing: asBoolean(
        consent.allowPortfolioSharing,
        fallback.dataConsent.allowPortfolioSharing,
      ),
      sharedWithCompanies: asArray<string>(consent.sharedWithCompanies),
      emailNotifications: asBoolean(consent.emailNotifications, fallback.dataConsent.emailNotifications),
      smsNotifications: asBoolean(consent.smsNotifications, fallback.dataConsent.smsNotifications),
      inAppNotifications: asBoolean(consent.inAppNotifications, fallback.dataConsent.inAppNotifications),
      showInLeaderboard: asBoolean(consent.showInLeaderboard, fallback.dataConsent.showInLeaderboard),
      profileVisibility: asString(consent.profileVisibility, fallback.dataConsent.profileVisibility) as Student["dataConsent"]["profileVisibility"],
      consentDate: asDate(consent.consentDate ?? consent.createdAt, fallback.dataConsent.consentDate),
      lastModified: asDate(consent.lastModified ?? consent.updatedAt, fallback.dataConsent.lastModified),
      history: asArray(consent.history) as Student["dataConsent"]["history"],
    },
    timeline: asArray(source.timeline).length ? (asArray(source.timeline) as Student["timeline"]) : fallback.timeline,
  };
};

export const mapActivity = (value: unknown, index = 0): Activity => {
  const source = asRecord(value);
  const fallback = mockActivities[index % mockActivities.length] ?? mockActivities[0];
  const enrollments = asArray(source.enrollments);
  const attendedStudents = enrollments
    .filter((item) => asString(asRecord(item).status).toLowerCase() === "completed")
    .map((item) => asString(asRecord(item).studentId))
    .filter(Boolean);

  return {
    ...fallback,
    id: asString(source.id, fallback.id),
    title: asString(source.title, fallback.title),
    titleThai: asString(source.titleThai, fallback.titleThai),
    description: asString(source.description, fallback.description),
    type: normalizeActivityType(source.type, fallback.type),
    startDate: asDate(source.startDate, fallback.startDate),
    endDate: asDate(source.endDate, fallback.endDate),
    location: asString(source.location, fallback.location),
    organizer: asString(source.organizer, fallback.organizer),
    activityHours: asNumber(source.activityHours, fallback.activityHours),
    gamificationPoints: asNumber(source.gamificationPoints, fallback.gamificationPoints),
    maxParticipants: source.maxParticipants ? asNumber(source.maxParticipants, fallback.maxParticipants) : fallback.maxParticipants,
    enrolledStudents: enrollments.map((item) => asString(asRecord(item).studentId)).filter(Boolean),
    attendedStudents: attendedStudents.length ? attendedStudents : fallback.attendedStudents,
    isGroupActivity: asBoolean(source.isGroupActivity, fallback.isGroupActivity),
    teamSize: source.teamSize ? asNumber(source.teamSize, fallback.teamSize) : fallback.teamSize,
    qrCode: asString(source.qrCode, fallback.qrCode ?? ""),
    checkInEnabled: asBoolean(source.checkInEnabled, fallback.checkInEnabled),
    status: normalizeActivityStatus(source.status, fallback.status),
    registrationStatus: normalizeRegistrationStatus(source.registrationStatus, fallback.registrationStatus),
    requiresPeerEvaluation: asBoolean(source.requiresPeerEvaluation, fallback.requiresPeerEvaluation),
    evaluations: asArray(source.evaluations).length
      ? (asArray(source.evaluations) as Activity["evaluations"])
      : fallback.evaluations,
  };
};

export const mapLecturer = (value: unknown, index = 0): Lecturer => {
  const source = asRecord(value);
  const fallback = mockLecturers[index % mockLecturers.length] ?? mockLecturers[0];
  const user = asRecord(source.user);
  const courses = asArray(source.courses);

  return {
    ...fallback,
    id: asString(source.id, fallback.id),
    email: asString(source.email, asString(user.email, fallback.email)),
    name: asString(source.name, asString(user.name, fallback.name)),
    nameThai: asString(source.nameThai, asString(user.nameThai, fallback.nameThai)),
    avatar: asString(source.avatar, asString(user.avatar, fallback.avatar ?? "")),
    phone: asString(source.phone, asString(user.phone, fallback.phone ?? "")),
    createdAt: asDate(source.createdAt, fallback.createdAt),
    lastLogin: source.lastLogin ? asDate(source.lastLogin) : fallback.lastLogin,
    isActive: asBoolean(source.isActive, asBoolean(user.isActive, fallback.isActive)),
    lecturerId: asString(source.lecturerId, fallback.lecturerId),
    department: asString(source.department, fallback.department),
    position: normalizePosition(source.position, fallback.position),
    courses: courses.length ? courses.map(mapCourse) : fallback.courses,
    teachingHours: asNumber(source.teachingHours, fallback.teachingHours),
    maxTeachingHours: asNumber(source.maxTeachingHours, fallback.maxTeachingHours),
    advisees: asArray(source.advisees).map((item) => asString(asRecord(item).id, asString(item))).filter(Boolean),
    maxAdvisees: asNumber(source.maxAdvisees, fallback.maxAdvisees),
    officeHours: asArray(source.officeHours).length
      ? (asArray(source.officeHours) as Lecturer["officeHours"])
      : fallback.officeHours,
    appointments: asArray(source.appointments).length
      ? (asArray(source.appointments) as Lecturer["appointments"])
      : fallback.appointments,
    specialization: asArray<string>(source.specialization),
    researchInterests: asArray<string>(source.researchInterests),
  };
};

export const mapAppointment = (value: unknown, index = 0): Appointment => {
  const source = asRecord(value);
  const fallback = mockAppointments[index % mockAppointments.length] ?? mockAppointments[0];
  const student = asRecord(source.student);
  const studentUser = asRecord(student.user);
  const lecturer = asRecord(source.lecturer);
  const lecturerUser = asRecord(lecturer.user);

  return {
    ...fallback,
    id: asString(source.id, fallback.id),
    studentId: asString(source.studentId, fallback.studentId),
    studentName: asString(studentUser.nameThai, asString(studentUser.name, fallback.studentName)),
    lecturerId: asString(source.lecturerId, fallback.lecturerId),
    lecturerName: asString(lecturerUser.nameThai, asString(lecturerUser.name, fallback.lecturerName)),
    date: asDate(source.date, fallback.date),
    startTime: asString(source.startTime, fallback.startTime),
    endTime: asString(source.endTime, fallback.endTime),
    location: asString(source.location, fallback.location),
    purpose: asString(source.purpose, fallback.purpose),
    notes: asString(source.notes, fallback.notes ?? ""),
    status: normalizeAppointmentStatus(source.status, fallback.status),
    meetingNotes: asString(source.meetingNotes, fallback.meetingNotes ?? ""),
    followUp: asString(source.followUp, fallback.followUp ?? ""),
    createdAt: asDate(source.createdAt, fallback.createdAt),
  };
};

export const mapMessage = (value: unknown, index = 0): MessageRow => {
  const source = asRecord(value);
  const fallback = mockMessages[index % mockMessages.length] ?? mockMessages[0];
  const from = asRecord(source.from);
  const to = asRecord(source.to);

  return {
    ...fallback,
    id: asString(source.id, fallback.id),
    from: asString(from.nameThai, asString(from.name, asString(source.from, fallback.from))),
    fromId: asString(source.fromId, fallback.fromId),
    to: asString(to.nameThai, asString(to.name, fallback.to)),
    toId: asString(source.toId, fallback.toId),
    subject: asString(source.subject, fallback.subject),
    preview: asString(source.preview, fallback.preview),
    body: asString(source.body, fallback.body),
    date: asDate(source.timestamp ?? source.date, fallback.date),
    read: asBoolean(source.read, fallback.read),
    starred: asBoolean(source.starred, fallback.starred),
    hasAttachment: asBoolean(source.hasAttachment, fallback.hasAttachment),
    attachments: asArray(source.attachments).length
      ? (asArray(source.attachments) as MessageRow["attachments"])
      : (fallback.attachments ?? []),
    category: asString(source.category, fallback.category),
  };
};

export const mapGrade = (value: unknown, index = 0): Grade => {
  const source = asRecord(value);
  const fallback = mockGrades[index % mockGrades.length] ?? mockGrades[0];
  const course = asRecord(source.course);

  return {
    ...fallback,
    studentId: asString(source.studentId, fallback.studentId),
    courseId: asString(source.courseId, asString(course.id, fallback.courseId)),
    midterm: source.midterm === null || typeof source.midterm === "undefined" ? undefined : asNumber(source.midterm, 0),
    final: source.final === null || typeof source.final === "undefined" ? undefined : asNumber(source.final, 0),
    assignments: source.assignments === null || typeof source.assignments === "undefined" ? undefined : asNumber(source.assignments, 0),
    participation: source.participation === null || typeof source.participation === "undefined" ? undefined : asNumber(source.participation, 0),
    project: source.project === null || typeof source.project === "undefined" ? undefined : asNumber(source.project, 0),
    total: source.total === null || typeof source.total === "undefined" ? undefined : asNumber(source.total, 0),
    letterGrade: (asString(source.letterGrade) || undefined) as Grade["letterGrade"],
    gradedBy: asString(source.gradedBy),
    gradedAt: source.gradedAt ? asDate(source.gradedAt) : undefined,
    remarks: asString(source.remarks),
    history: asArray(source.history).length ? (asArray(source.history) as Grade["history"]) : [],
  };
};

export const mapStudentStatsToStudent = (student: Student, stats: unknown): Student => {
  const source = asRecord(stats);
  return {
    ...student,
    gpa: asNumber(source.gpa, student.gpa),
    gpax: asNumber(source.gpax, student.gpax),
    earnedCredits: asNumber(source.earnedCredits, student.earnedCredits),
    requiredCredits: asNumber(source.requiredCredits, student.requiredCredits),
    totalCredits: asNumber(source.requiredCredits, student.totalCredits),
    academicStatus: normalizeAcademicStatus(source.academicStatus, student.academicStatus),
    gamificationPoints: asNumber(source.gamificationPoints, student.gamificationPoints),
    totalActivityHours: asNumber(source.totalActivityHours, student.totalActivityHours),
    badges: asArray(source.badges).length ? (asArray(source.badges) as Student["badges"]) : student.badges,
  };
};
