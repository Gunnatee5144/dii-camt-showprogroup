import { api, type BackendUser } from "@/lib/api";
import {
  mockActivities,
  mockAdmin,
  mockAppointments,
  mockCompanies,
  mockCompany,
  mockCourses,
  mockGrades,
  mockInternships,
  mockJobPostings,
  mockLecturer,
  mockLecturerWorkloads,
  mockLecturers,
  mockMessages,
  mockNotifications,
  mockRequests,
  mockStaff,
  mockStaffUsers,
  mockStudent,
  mockStudents,
} from "@/lib/mockData";

type AnyRecord = Record<string, any>;

const asRecord = (value: unknown): AnyRecord =>
  value && typeof value === "object" ? (value as AnyRecord) : {};

const asArray = <T = AnyRecord>(value: unknown): T[] => (Array.isArray(value) ? (value as T[]) : []);

const asString = (value: unknown, fallback = "") =>
  typeof value === "string" && value.trim() ? value : fallback;

const asNumber = (value: unknown, fallback = 0) => {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : fallback;
};

const asDate = (value: unknown, fallback = new Date()) => {
  const date = value ? new Date(String(value)) : fallback;
  return Number.isNaN(date.getTime()) ? fallback : date;
};

const first = <T,>(items: T[]) => items[0];

const replaceArray = (target: any[], items: any[]) => {
  target.splice(0, target.length, ...items);
};

const assignObject = (target: object, value?: object) => {
  if (value) {
    Object.assign(target, value);
  }
};

const safe = async <T,>(run: () => Promise<T>): Promise<T | null> => {
  try {
    return await run();
  } catch {
    return null;
  }
};

const roleOf = (user: BackendUser | AnyRecord) =>
  String(user.role || "").toLowerCase() as "student" | "lecturer" | "staff" | "company" | "admin";

const callWhen = <T,>(condition: boolean, run: () => Promise<T>) =>
  condition ? safe(run) : Promise.resolve(null);

const baseUser = (source: AnyRecord, fallback: AnyRecord) => {
  const user = asRecord(source.user);
  return {
    id: asString(source.id, asString(user.id, fallback.id)),
    email: asString(source.email, asString(user.email, fallback.email)),
    name: asString(source.name, asString(user.name, fallback.name)),
    nameThai: asString(source.nameThai, asString(user.nameThai, fallback.nameThai)),
    avatar: asString(source.avatar, asString(user.avatar, fallback.avatar)),
    phone: asString(source.phone, asString(user.phone, fallback.phone)),
    createdAt: asDate(source.createdAt || user.createdAt, fallback.createdAt),
    lastLogin: asDate(source.lastLogin || user.lastLogin, fallback.lastLogin),
    isActive: source.isActive ?? user.isActive ?? fallback.isActive ?? true,
  };
};

const getRoleProfile = (user: BackendUser | AnyRecord) => {
  const role = roleOf(user);
  return asRecord((user as AnyRecord)[`${role}Profile`]);
};

const mapSkill = (item: AnyRecord) => ({
  name: asString(item.name || item.skill?.name, "Skill"),
  category: asString(item.category || item.skill?.category, "programming") as any,
  level: asString(item.level, "beginner") as any,
  verifiedBy: asString(item.verifiedBy) || undefined,
});

const mapStudent = (source: AnyRecord, fallback: AnyRecord = mockStudent) => {
  const profile = source.studentProfile ? asRecord(source.studentProfile) : source;
  const user = asRecord(source.user);
  const advisor = asRecord(profile.advisor);

  return {
    ...fallback,
    ...baseUser({ ...profile, user, email: source.email, name: source.name, nameThai: source.nameThai }, fallback),
    id: asString(profile.id, asString(source.id, fallback.id)),
    role: "student" as const,
    studentId: asString(profile.studentId, fallback.studentId),
    major: asString(profile.major, fallback.major),
    program: asString(profile.program, fallback.program) as any,
    year: asNumber(profile.year, fallback.year),
    semester: asNumber(profile.semester, fallback.semester),
    academicYear: asString(profile.academicYear, fallback.academicYear),
    gpa: asNumber(profile.gpa, fallback.gpa),
    gpax: asNumber(profile.gpax, fallback.gpax),
    totalCredits: asNumber(profile.totalCredits, asNumber(profile.requiredCredits, fallback.totalCredits)),
    earnedCredits: asNumber(profile.earnedCredits, fallback.earnedCredits),
    requiredCredits: asNumber(profile.requiredCredits, fallback.requiredCredits),
    academicStatus: asString(profile.academicStatus, fallback.academicStatus) as any,
    advisorId: asString(advisor.id || profile.advisorId, fallback.advisorId),
    advisorName: asString(advisor.nameThai || advisor.name, fallback.advisorName),
    skills: asArray(profile.skills).map((item) =>
      typeof item === "string" ? { name: item, category: "programming" as const, level: "intermediate" as const } : mapSkill(asRecord(item)),
    ),
    totalActivityHours: asNumber(profile.totalActivityHours, fallback.totalActivityHours),
    gamificationPoints: asNumber(profile.gamificationPoints, fallback.gamificationPoints),
    badges: asArray(profile.badges).length ? asArray(profile.badges) : fallback.badges,
    dataConsent: {
      ...fallback.dataConsent,
      ...(asRecord(profile.consent) || {}),
      studentId: asString(profile.id, fallback.dataConsent?.studentId),
    },
    timeline: asArray(profile.timeline).length ? asArray(profile.timeline) : fallback.timeline,
    portfolio: profile.portfolio || fallback.portfolio,
    internship: profile.internship || fallback.internship,
    cvUrl: asString(profile.cvUrl, fallback.cvUrl),
  };
};

const mapLecturer = (source: AnyRecord, fallback: AnyRecord = mockLecturer) => {
  const profile = source.lecturerProfile ? asRecord(source.lecturerProfile) : source;
  const user = asRecord(profile.user || source.user);

  return {
    ...fallback,
    ...baseUser({ ...profile, user, email: source.email, name: source.name, nameThai: source.nameThai }, fallback),
    id: asString(profile.id, fallback.id),
    role: "lecturer" as const,
    lecturerId: asString(profile.lecturerId, fallback.lecturerId),
    department: asString(profile.department, fallback.department),
    position: asString(profile.position, fallback.position) as any,
    courses: asArray(profile.courses).map((course) => mapCourse(asRecord(course))),
    teachingHours: asNumber(profile.teachingHours, fallback.teachingHours),
    maxTeachingHours: asNumber(profile.maxTeachingHours, fallback.maxTeachingHours),
    advisees: asArray(profile.advisees).map((student) => asString(asRecord(student).id || asRecord(student).studentId)),
    maxAdvisees: asNumber(profile.maxAdvisees, fallback.maxAdvisees),
    officeHours: asArray(profile.officeHours).length ? asArray(profile.officeHours) : fallback.officeHours,
    appointments: fallback.appointments,
    specialization: asArray<string>(profile.specialization),
    researchInterests: asArray<string>(profile.researchInterests),
  };
};

const mapStaff = (source: AnyRecord, fallback: AnyRecord = mockStaff) => {
  const profile = source.staffProfile ? asRecord(source.staffProfile) : source;

  return {
    ...fallback,
    ...baseUser({ ...profile, user: source.user, email: source.email, name: source.name, nameThai: source.nameThai }, fallback),
    id: asString(profile.id, fallback.id),
    role: "staff" as const,
    staffId: asString(profile.staffId, fallback.staffId),
    department: asString(profile.department, fallback.department),
    position: asString(profile.position, fallback.position),
    permissions: asArray(profile.permissions),
    canManageUsers: Boolean(profile.canManageUsers ?? fallback.canManageUsers),
    canManageCourses: Boolean(profile.canManageCourses ?? fallback.canManageCourses),
    canManageSchedules: Boolean(profile.canManageSchedules ?? fallback.canManageSchedules),
    canViewReports: Boolean(profile.canViewReports ?? fallback.canViewReports),
    canManageInternships: Boolean(profile.canManageInternships ?? fallback.canManageInternships),
  };
};

const mapCompany = (source: AnyRecord, fallback: AnyRecord = mockCompany) => {
  const profile = source.companyProfile ? asRecord(source.companyProfile) : source;

  return {
    ...fallback,
    ...baseUser({ ...profile, user: source.user, email: source.email, name: source.name, nameThai: source.nameThai }, fallback),
    id: asString(profile.id, fallback.id),
    role: "company" as const,
    companyId: asString(profile.companyId, fallback.companyId),
    companyName: asString(profile.companyName, fallback.companyName),
    companyNameThai: asString(profile.companyNameThai, fallback.companyNameThai),
    industry: asString(profile.industry, fallback.industry),
    size: asString(profile.size, fallback.size) as any,
    website: asString(profile.website, fallback.website),
    address: asString(profile.address, fallback.address),
    internshipSlots: asNumber(profile.internshipSlots, fallback.internshipSlots),
    currentInterns: asNumber(profile.currentInterns, fallback.currentInterns),
    jobPostings: asArray(profile.jobPostings).map((job) => mapJob(asRecord(job))),
    studentViewConsent: asArray(profile.studentViewConsent),
    canContactStudents: Boolean(profile.canContactStudents ?? fallback.canContactStudents),
  };
};

const mapAdmin = (source: AnyRecord, fallback: AnyRecord = mockAdmin) => {
  const profile = source.adminProfile ? asRecord(source.adminProfile) : source;

  return {
    ...fallback,
    ...baseUser({ ...profile, user: source.user, email: source.email, name: source.name, nameThai: source.nameThai }, fallback),
    id: asString(profile.id, fallback.id),
    role: "admin" as const,
    adminId: asString(profile.adminId, fallback.adminId),
    isSuperAdmin: Boolean(profile.isSuperAdmin ?? fallback.isSuperAdmin),
    permissions: asArray<string>(profile.permissions).length ? asArray<string>(profile.permissions) : fallback.permissions,
  };
};

const mapSchedule = (item: AnyRecord, index = 0) => ({
  id: asString(item.id, `schedule-${index}`),
  day: asString(item.day, "monday") as any,
  dayThai: asString(item.dayThai, "จันทร์"),
  startTime: asString(item.startTime, "09:00"),
  endTime: asString(item.endTime, "12:00"),
  room: asString(item.room || item.facility?.room),
  building: asString(item.building || item.facility?.building),
  type: asString(item.type, "lecture") as any,
});

const mapCourse = (source: AnyRecord, fallback: AnyRecord = first(mockCourses) || {}) => {
  const lecturer = asRecord(source.lecturer);
  const lecturerUser = asRecord(lecturer.user);
  const sections = asArray(source.sections).map((section, index) => {
    const item = asRecord(section);
    return {
      id: asString(item.id, `${source.id || "course"}-sec-${index + 1}`),
      sectionNumber: asString(item.sectionNumber || item.number, String(index + 1).padStart(2, "0")),
      room: asString(item.room || item.facility?.room),
      maxStudents: asNumber(item.maxStudents, source.maxStudents || 40),
      enrolledStudents: asArray(item.enrollments).map((enrollment) => asString(asRecord(enrollment).studentId)),
      schedule: asArray(item.schedule).map((schedule, scheduleIndex) => mapSchedule(asRecord(schedule), scheduleIndex)),
    };
  });

  return {
    ...fallback,
    id: asString(source.id, fallback.id),
    code: asString(source.code, fallback.code),
    name: asString(source.name, fallback.name),
    nameThai: asString(source.nameThai, source.name || fallback.nameThai),
    credits: asNumber(source.credits, fallback.credits),
    semester: asNumber(source.semester, fallback.semester),
    academicYear: asString(source.academicYear, fallback.academicYear),
    year: asNumber(source.year, fallback.year),
    lecturerId: asString(source.lecturerId || lecturer.id, fallback.lecturerId),
    lecturerName: asString(lecturerUser.nameThai || lecturerUser.name || source.lecturerName, fallback.lecturerName),
    sections,
    description: asString(source.description, fallback.description),
    prerequisites: asArray<string>(source.prerequisites),
    learningOutcomes: asArray<string>(source.learningOutcomes),
    syllabus: asString(source.syllabus, fallback.syllabus),
    schedule: asArray(source.schedule).map((schedule, index) => mapSchedule(asRecord(schedule), index)),
    enrolledStudents: asArray(source.enrollments).map((item) => asString(asRecord(item).studentId)),
    maxStudents: asNumber(source.maxStudents, fallback.maxStudents),
    minStudents: asNumber(source.minStudents, fallback.minStudents),
    materials: asArray(source.materials),
    assignments: asArray(source.assignments),
    grades: fallback.grades || [],
  };
};

const mapActivity = (source: AnyRecord, fallback: AnyRecord = first(mockActivities) || {}) => ({
  ...fallback,
  id: asString(source.id, fallback.id),
  title: asString(source.title, fallback.title),
  titleThai: asString(source.titleThai, source.title || fallback.titleThai),
  description: asString(source.description, fallback.description),
  type: asString(source.type, fallback.type) as any,
  startDate: asDate(source.startDate, fallback.startDate),
  endDate: asDate(source.endDate, fallback.endDate),
  location: asString(source.location, fallback.location),
  organizer: asString(source.organizer, fallback.organizer),
  activityHours: asNumber(source.activityHours, fallback.activityHours),
  gamificationPoints: asNumber(source.gamificationPoints, fallback.gamificationPoints),
  maxParticipants: asNumber(source.maxParticipants, fallback.maxParticipants),
  enrolledStudents: asArray(source.enrollments).map((item) => asString(asRecord(item).studentId)),
  attendedStudents: asArray(source.enrollments)
    .filter((item) => asString(asRecord(item).status) === "attended")
    .map((item) => asString(asRecord(item).studentId)),
  isGroupActivity: Boolean(source.isGroupActivity ?? fallback.isGroupActivity),
  teamSize: asNumber(source.teamSize, fallback.teamSize),
  qrCode: asString(source.qrCode, fallback.qrCode),
  checkInEnabled: Boolean(source.checkInEnabled ?? fallback.checkInEnabled),
  status: asString(source.status, fallback.status) as any,
  registrationStatus: asString(source.registrationStatus, fallback.registrationStatus) as any,
  requiresPeerEvaluation: Boolean(source.requiresPeerEvaluation ?? fallback.requiresPeerEvaluation),
  evaluations: asArray(source.evaluations),
});

const mapJob = (source: AnyRecord, fallback: AnyRecord = first(mockJobPostings) || {}) => {
  const company = asRecord(source.company);
  return {
    ...fallback,
    id: asString(source.id, fallback.id),
    companyId: asString(source.companyId, fallback.companyId),
    companyName: asString(company.companyName || source.companyName, fallback.companyName),
    title: asString(source.title, fallback.title),
    type: asString(source.type, fallback.type) as any,
    positions: asNumber(source.positions, fallback.positions),
    description: asString(source.description, fallback.description),
    responsibilities: asArray<string>(source.responsibilities),
    requirements: asArray<string>(source.requirements),
    preferredSkills: asArray<string>(source.preferredSkills),
    salary: asString(source.salary, fallback.salary),
    benefits: asArray<string>(source.benefits),
    location: asString(source.location, fallback.location),
    workType: asString(source.workType, fallback.workType) as any,
    startDate: asDate(source.startDate, fallback.startDate),
    deadline: asDate(source.deadline, fallback.deadline),
    applicants: asArray(source.applications),
    maxApplicants: asNumber(source.maxApplicants, fallback.maxApplicants),
    status: asString(source.status, fallback.status) as any,
    isActive: Boolean(source.isActive ?? fallback.isActive),
    postedAt: asDate(source.postedAt || source.createdAt, fallback.postedAt),
  };
};

const mapNotification = (source: AnyRecord, fallback: AnyRecord = first(mockNotifications) || {}) => ({
  ...fallback,
  id: asString(source.id, fallback.id),
  recipientId: asString(source.userId || source.recipientId, fallback.recipientId),
  recipientRole: asString(source.recipientRole, fallback.recipientRole) as any,
  title: asString(source.title, fallback.title),
  titleThai: asString(source.titleThai, source.title || fallback.titleThai),
  message: asString(source.message, fallback.message),
  messageThai: asString(source.messageThai, source.message || fallback.messageThai),
  type: asString(source.type, fallback.type) as any,
  priority: asString(source.priority, fallback.priority) as any,
  channels: asArray(source.channels).length ? asArray(source.channels) : fallback.channels,
  isRead: Boolean(source.isRead),
  readAt: source.readAt ? asDate(source.readAt) : undefined,
  actionUrl: asString(source.actionUrl, fallback.actionUrl),
  actionLabel: asString(source.actionLabel, fallback.actionLabel),
  createdAt: asDate(source.createdAt, fallback.createdAt),
  expiresAt: source.expiresAt ? asDate(source.expiresAt) : undefined,
});

const mapAppointment = (source: AnyRecord, fallback: AnyRecord = first(mockAppointments) || {}) => {
  const student = asRecord(source.student);
  const lecturer = asRecord(source.lecturer);
  return {
    ...fallback,
    id: asString(source.id, fallback.id),
    studentId: asString(source.studentId, fallback.studentId),
    studentName: asString(student.user?.nameThai || student.user?.name || source.studentName, fallback.studentName),
    lecturerId: asString(source.lecturerId, fallback.lecturerId),
    lecturerName: asString(lecturer.user?.nameThai || lecturer.user?.name || source.lecturerName, fallback.lecturerName),
    date: asDate(source.date, fallback.date),
    startTime: asString(source.startTime, fallback.startTime),
    endTime: asString(source.endTime, fallback.endTime),
    location: asString(source.location, fallback.location),
    purpose: asString(source.purpose, fallback.purpose),
    notes: asString(source.notes, fallback.notes),
    status: asString(source.status, fallback.status) as any,
    meetingNotes: asString(source.meetingNotes, fallback.meetingNotes),
    followUp: asString(source.followUp, fallback.followUp),
    createdAt: asDate(source.createdAt, fallback.createdAt),
  };
};

const mapRequest = (source: AnyRecord, fallback: AnyRecord = first(mockRequests) || {}) => {
  const student = asRecord(source.student);
  return {
    ...fallback,
    id: asString(source.id, fallback.id),
    studentId: asString(source.studentId, fallback.studentId),
    studentName: asString(student.user?.nameThai || student.user?.name || source.studentName, fallback.studentName),
    type: asString(source.type, fallback.type) as any,
    title: asString(source.title, fallback.title),
    description: asString(source.description, fallback.description),
    documents: asArray<string>(source.documents),
    status: asString(source.status, fallback.status) as any,
    assignedTo: asString(source.assignedTo, fallback.assignedTo),
    reviewedBy: asString(source.reviewedBy, fallback.reviewedBy),
    reviewNotes: asString(source.reviewNotes, fallback.reviewNotes),
    submittedAt: asDate(source.submittedAt || source.createdAt, fallback.submittedAt),
    reviewedAt: source.reviewedAt ? asDate(source.reviewedAt) : undefined,
    completedAt: source.completedAt ? asDate(source.completedAt) : undefined,
  };
};

const mapMessage = (source: AnyRecord, fallback: AnyRecord = first(mockMessages as unknown[]) as AnyRecord) => ({
  ...fallback,
  id: asString(source.id, fallback.id),
  from: asString(source.from?.nameThai || source.from?.name || source.from, fallback.from),
  fromId: asString(source.fromId, fallback.fromId),
  to: asString(source.to?.nameThai || source.to?.name || source.to, fallback.to),
  toId: asString(source.toId, fallback.toId),
  subject: asString(source.subject, fallback.subject),
  preview: asString(source.preview, source.body || fallback.preview),
  body: asString(source.body, fallback.body),
  date: asDate(source.timestamp || source.date || source.createdAt, fallback.date),
  read: Boolean(source.read ?? source.isRead ?? fallback.read),
  starred: Boolean(source.starred ?? fallback.starred),
  hasAttachment: Boolean(source.hasAttachment ?? asArray(source.attachments).length),
  attachments: asArray(source.attachments),
  category: asString(source.category, fallback.category),
});

const mapGrade = (source: AnyRecord, fallback: AnyRecord = first(mockGrades) || {}) => {
  const course = asRecord(source.course);
  return {
    ...fallback,
    id: asString(source.id, fallback.id),
    studentId: asString(source.studentId, fallback.studentId),
    courseId: asString(source.courseId || course.id, fallback.courseId),
    score: asNumber(source.score, fallback.score),
    grade: asString(source.grade || source.letterGrade, fallback.grade) as any,
    semester: asNumber(source.semester || course.semester, fallback.semester),
    academicYear: asString(source.academicYear || course.academicYear, fallback.academicYear),
    createdAt: asDate(source.createdAt, fallback.createdAt),
  };
};

const mapWorkload = (source: AnyRecord, fallback: AnyRecord = first(mockLecturerWorkloads) || {}) => {
  const lecturer = asRecord(source.lecturer);
  return {
    ...fallback,
    lecturerId: asString(source.lecturerId || lecturer.id, fallback.lecturerId),
    lecturerName: asString(source.lecturerName || lecturer.user?.nameThai || lecturer.user?.name, fallback.lecturerName),
    totalCourses: asNumber(source.totalCourses, fallback.totalCourses),
    totalStudents: asNumber(source.totalStudents, fallback.totalStudents),
    teachingHours: asNumber(source.teachingHours || source.hours, fallback.teachingHours),
    maxHours: asNumber(source.maxHours, fallback.maxHours),
    advisees: asNumber(source.advisees, fallback.advisees),
    workloadPercentage: asNumber(source.workloadPercentage, fallback.workloadPercentage),
  };
};

const hydrateCurrentUser = (user: BackendUser) => {
  const role = roleOf(user);
  const profile = getRoleProfile(user);
  const merged = { ...profile, ...user };

  if (role === "student") {
    assignObject(mockStudent, mapStudent({ ...merged, studentProfile: profile }));
    if (!mockStudents.some((item) => item.id === mockStudent.id)) {
      mockStudents.unshift(mockStudent);
    }
  }

  if (role === "lecturer") {
    assignObject(mockLecturer, mapLecturer({ ...merged, lecturerProfile: profile }));
    if (!mockLecturers.some((item) => item.id === mockLecturer.id)) {
      mockLecturers.unshift(mockLecturer);
    }
  }

  if (role === "staff") {
    assignObject(mockStaff, mapStaff({ ...merged, staffProfile: profile }));
    if (!mockStaffUsers.some((item) => item.id === mockStaff.id)) {
      mockStaffUsers.unshift(mockStaff);
    }
  }

  if (role === "company") {
    assignObject(mockCompany, mapCompany({ ...merged, companyProfile: profile }));
    if (!mockCompanies.some((item) => item.id === mockCompany.id)) {
      mockCompanies.unshift(mockCompany);
    }
  }

  if (role === "admin") {
    assignObject(mockAdmin, mapAdmin({ ...merged, adminProfile: profile }));
  }
};

export const hydrateFrontendData = async (user: BackendUser) => {
  hydrateCurrentUser(user);
  const role = roleOf(user);
  const isStudent = role === "student";
  const isPrivileged = role === "admin" || role === "staff" || role === "lecturer";
  const canSeeStudentDirectory = isPrivileged || role === "company";

  const [
    usersResponse,
    studentsResponse,
    studentProfilesResponse,
    studentProfileResponse,
    lecturersResponse,
    companiesResponse,
    coursesResponse,
    activitiesResponse,
    notificationsResponse,
    messagesResponse,
    requestsResponse,
    appointmentsResponse,
    jobsResponse,
    applicationsResponse,
    transcriptResponse,
    workloadResponse,
    internshipResponse,
  ] = await Promise.all([
    callWhen(isPrivileged, () => api.users.list()),
    callWhen(isPrivileged, () => api.students.list()),
    callWhen(canSeeStudentDirectory, () => api.students.profiles()),
    callWhen(isStudent, () => api.students.profile()),
    callWhen(isPrivileged, () => api.lecturers.list()),
    callWhen(isPrivileged || role === "company", () => api.companies.list()),
    safe(() => api.courses.list()),
    safe(() => api.activities.list()),
    safe(() => api.notifications.list()),
    safe(() => api.messages.list()),
    safe(() => api.requests.list()),
    safe(() => api.appointments.list()),
    safe(() => api.jobs.list()),
    safe(() => api.applications.list()),
    callWhen(isStudent, () => api.grades.transcript()),
    callWhen(isPrivileged, () => api.workload.list()),
    callWhen(isStudent, () => api.internship.get()),
  ]);

  const users = asArray(asRecord(usersResponse).users);
  const students = [
    ...asArray(asRecord(studentsResponse).students),
    ...asArray(asRecord(studentProfilesResponse).profiles),
    ...asArray(asRecord(studentProfileResponse).profile ? [asRecord(studentProfileResponse).profile] : []),
  ];
  const lecturers = asArray(asRecord(lecturersResponse).lecturers);
  const companies = asArray(asRecord(companiesResponse).companies);

  if (students.length) {
    const mapped = students.map((item, index) => mapStudent(asRecord(item), mockStudents[index] || mockStudent));
    replaceArray(mockStudents, mapped);
    assignObject(mockStudent, first(mapped));
  }

  const userStudents = users.filter((item) => roleOf(item) === "student");
  if (!students.length && userStudents.length) {
    const mapped = userStudents.map((item, index) => mapStudent(asRecord(item), mockStudents[index] || mockStudent));
    replaceArray(mockStudents, mapped);
    assignObject(mockStudent, first(mapped));
  }

  if (lecturers.length) {
    const mapped = lecturers.map((item, index) => mapLecturer(asRecord(item), mockLecturers[index] || mockLecturer));
    replaceArray(mockLecturers, mapped);
    assignObject(mockLecturer, first(mapped));
  } else {
    const mapped = users
      .filter((item) => roleOf(item) === "lecturer")
      .map((item, index) => mapLecturer(asRecord(item), mockLecturers[index] || mockLecturer));
    if (mapped.length) {
      replaceArray(mockLecturers, mapped);
      assignObject(mockLecturer, first(mapped));
    }
  }

  const staff = users
    .filter((item) => roleOf(item) === "staff")
    .map((item, index) => mapStaff(asRecord(item), mockStaffUsers[index] || mockStaff));
  if (staff.length) {
    replaceArray(mockStaffUsers, staff);
    assignObject(mockStaff, first(staff));
  }

  if (companies.length) {
    const mapped = companies.map((item, index) => mapCompany(asRecord(item), mockCompanies[index] || mockCompany));
    replaceArray(mockCompanies, mapped);
    assignObject(mockCompany, first(mapped));
  } else {
    const mapped = users
      .filter((item) => roleOf(item) === "company")
      .map((item, index) => mapCompany(asRecord(item), mockCompanies[index] || mockCompany));
    if (mapped.length) {
      replaceArray(mockCompanies, mapped);
      assignObject(mockCompany, first(mapped));
    }
  }

  const admin = users.find((item) => roleOf(item) === "admin");
  if (admin) {
    assignObject(mockAdmin, mapAdmin(asRecord(admin)));
  }

  const courses = asArray(asRecord(coursesResponse).courses).map((item, index) =>
    mapCourse(asRecord(item), mockCourses[index] || first(mockCourses)),
  );
  if (courses.length) replaceArray(mockCourses, courses);

  const activities = asArray(asRecord(activitiesResponse).activities).map((item, index) =>
    mapActivity(asRecord(item), mockActivities[index] || first(mockActivities)),
  );
  if (activities.length) replaceArray(mockActivities, activities);

  const notifications = asArray(asRecord(notificationsResponse).notifications).map((item, index) =>
    mapNotification(asRecord(item), mockNotifications[index] || first(mockNotifications)),
  );
  if (notifications.length) replaceArray(mockNotifications, notifications);

  const messages = asArray(asRecord(messagesResponse).messages).map((item, index) =>
    mapMessage(asRecord(item), (mockMessages as unknown[])[index] as AnyRecord),
  );
  if (messages.length) replaceArray(mockMessages as unknown as AnyRecord[], messages);

  const requests = asArray(asRecord(requestsResponse).requests).map((item, index) =>
    mapRequest(asRecord(item), mockRequests[index] || first(mockRequests)),
  );
  if (requests.length) replaceArray(mockRequests, requests);

  const appointments = asArray(asRecord(appointmentsResponse).appointments).map((item, index) =>
    mapAppointment(asRecord(item), mockAppointments[index] || first(mockAppointments)),
  );
  if (appointments.length) replaceArray(mockAppointments, appointments);

  const jobs = asArray(asRecord(jobsResponse).jobs).map((item, index) =>
    mapJob(asRecord(item), mockJobPostings[index] || first(mockJobPostings)),
  );
  if (jobs.length) replaceArray(mockJobPostings, jobs);

  const transcript = asArray(asRecord(transcriptResponse).transcript).map((item, index) =>
    mapGrade(asRecord(item), mockGrades[index] || first(mockGrades)),
  );
  if (transcript.length) replaceArray(mockGrades, transcript);

  const workload = asArray(asRecord(workloadResponse).workload).map((item, index) =>
    mapWorkload(asRecord(item), mockLecturerWorkloads[index] || first(mockLecturerWorkloads)),
  );
  if (workload.length) replaceArray(mockLecturerWorkloads, workload);

  const applications = asArray(asRecord(applicationsResponse).applications);
  if (applications.length && mockJobPostings.length) {
    mockJobPostings.forEach((job) => {
      job.applicants = applications.filter((application) => asRecord(application).jobPostingId === job.id) as any;
    });
  }

  const internship = asRecord(asRecord(internshipResponse).internship);
  if (internship.id) {
    replaceArray(mockInternships, [internship as any]);
    mockStudent.internship = internship as any;
  }
};
