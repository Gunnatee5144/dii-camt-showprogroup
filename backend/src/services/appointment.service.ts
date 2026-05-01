import { prisma } from "../lib/prisma";
import { AppError } from "../utils/errors";

const dayMap = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

export const getAvailableOfficeHourSlots = async (lecturerId: string, date?: string) => {
  const lecturer = await prisma.lecturerProfile.findFirst({
    where: {
      OR: [{ id: lecturerId }, { lecturerId }, { userId: lecturerId }],
    },
    include: {
      user: true,
      officeHours: { where: { isAvailable: true }, orderBy: [{ day: "asc" }, { startTime: "asc" }] },
      appointments: {
        where: {
          status: { in: ["pending", "confirmed"] },
          ...(date
            ? {
                date: {
                  gte: new Date(`${date}T00:00:00.000Z`),
                  lte: new Date(`${date}T23:59:59.999Z`),
                },
              }
            : {}),
        },
      },
    },
  });

  if (!lecturer) {
    throw new AppError(404, "Lecturer profile not found");
  }

  if (date) {
    const requestedDate = new Date(date);
    const day = dayMap[requestedDate.getUTCDay()];
    const officeHours = lecturer.officeHours.filter((slot) => slot.day === day);
    const bookedSlots = new Set(
      lecturer.appointments.map((appointment) => `${appointment.startTime}-${appointment.endTime}`),
    );

    return {
      lecturer: {
        id: lecturer.id,
        lecturerId: lecturer.lecturerId,
        name: lecturer.user.name,
      },
      date,
      slots: officeHours.map((slot) => ({
        ...slot,
        isBooked: bookedSlots.has(`${slot.startTime}-${slot.endTime}`),
      })),
    };
  }

  return {
    lecturer: {
      id: lecturer.id,
      lecturerId: lecturer.lecturerId,
      name: lecturer.user.name,
    },
    officeHours: lecturer.officeHours,
    appointments: lecturer.appointments,
  };
};

export const replaceOfficeHours = async (
  lecturerProfileId: string,
  officeHours: Array<{
    day: string;
    startTime: string;
    endTime: string;
    location: string;
    isAvailable?: boolean;
  }>,
) => {
  await prisma.$transaction(async (tx) => {
    await tx.officeHour.deleteMany({
      where: { lecturerId: lecturerProfileId },
    });

    if (officeHours.length > 0) {
      await tx.officeHour.createMany({
        data: officeHours.map((slot) => ({
          lecturerId: lecturerProfileId,
          day: slot.day,
          startTime: slot.startTime,
          endTime: slot.endTime,
          location: slot.location,
          isAvailable: slot.isAvailable ?? true,
        })),
      });
    }
  });

  return prisma.officeHour.findMany({
    where: { lecturerId: lecturerProfileId },
    orderBy: [{ day: "asc" }, { startTime: "asc" }],
  });
};
