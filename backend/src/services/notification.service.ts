import type { Prisma, Role } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { emitToRole, emitToUser } from "../lib/realtime";

type NotificationInput = {
  userId: string;
  title: string;
  titleThai?: string;
  message: string;
  messageThai?: string;
  type: string;
  priority?: string;
  channels?: string[];
  actionUrl?: string;
  actionLabel?: string;
  expiresAt?: Date;
};

type RoleNotificationInput = Omit<NotificationInput, "userId">;

export const createNotification = async (payload: NotificationInput) => {
  const notification = await prisma.notification.create({
    data: {
      userId: payload.userId,
      title: payload.title,
      titleThai: payload.titleThai,
      message: payload.message,
      messageThai: payload.messageThai,
      type: payload.type,
      priority: payload.priority ?? "medium",
      channels: payload.channels ?? ["in-app"],
      actionUrl: payload.actionUrl,
      actionLabel: payload.actionLabel,
      expiresAt: payload.expiresAt,
    },
  });

  emitToUser(payload.userId, "notification:created", notification);
  return notification;
};

export const createNotificationsForRole = async (
  role: Role,
  payload: RoleNotificationInput,
  userWhere?: Prisma.UserWhereInput,
) => {
  const users = await prisma.user.findMany({
    where: {
      role,
      isActive: true,
      ...(userWhere ?? {}),
    },
    select: {
      id: true,
    },
  });

  if (users.length === 0) {
    return [];
  }

  const notifications = await Promise.all(
    users.map((user) =>
      createNotification({
        userId: user.id,
        ...payload,
      }),
    ),
  );

  emitToRole(role, "notification:role-broadcast", notifications);
  return notifications;
};
