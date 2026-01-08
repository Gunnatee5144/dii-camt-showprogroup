import { Student, Teacher, Staff, Company, Course, Activity, JobPosting, Notification, StudentRequest, Appointment } from '@/types';

// Mock Students
export const mockStudent: Student = {
  id: '1',
  email: 'student@cmu.ac.th',
  name: 'สมชาย ใจดี',
  role: 'student',
  studentId: '650510001',
  major: 'Digital Innovation and Intelligence',
  year: 3,
  gpa: 3.45,
  credits: 90,
  advisor: 'ดร.สมศักดิ์ วิชาการ',
  createdAt: new Date(),
  skills: ['Python', 'React', 'Data Analysis', 'Machine Learning', 'UI/UX Design'],
  activities: [],
};

// Mock Teacher
export const mockTeacher: Teacher = {
  id: '2',
  email: 'teacher@cmu.ac.th',
  name: 'ดร.สมศักดิ์ วิชาการ',
  role: 'teacher',
  teacherId: 'T001',
  department: 'Digital Innovation and Intelligence',
  position: 'อาจารย์ประจำ',
  createdAt: new Date(),
  courses: [],
  advisees: ['650510001', '650510002', '650510003'],
};

// Mock Staff
export const mockStaff: Staff = {
  id: '3',
  email: 'staff@cmu.ac.th',
  name: 'สมหญิง รักงาน',
  role: 'staff',
  staffId: 'S001',
  department: 'CAMT Administration',
  position: 'เจ้าหน้าที่บริหารทั่วไป',
  permissions: ['manage_users', 'manage_courses', 'manage_activities', 'view_reports'],
  createdAt: new Date(),
};

// Mock Company
export const mockCompany: Company = {
  id: '4',
  email: 'hr@techcompany.com',
  name: 'Tech Innovation Co., Ltd.',
  role: 'company',
  companyId: 'C001',
  companyName: 'Tech Innovation Co., Ltd.',
  industry: 'Technology',
  createdAt: new Date(),
  jobPostings: [],
};

// Mock Courses
export const mockCourses: Course[] = [
  {
    id: '1',
    code: 'DII201',
    name: 'การออกแบบ User Experience',
    credits: 3,
    semester: '1',
    year: 2567,
    instructor: 'ดร.สมศักดิ์ วิชาการ',
    students: 45,
    schedule: 'จ. 09:00-12:00',
  },
  {
    id: '2',
    code: 'DII202',
    name: 'การพัฒนา Web Application',
    credits: 3,
    semester: '1',
    year: 2567,
    instructor: 'ดร.สมศักดิ์ วิชาการ',
    students: 38,
    schedule: 'พ. 13:00-16:00',
  },
  {
    id: '3',
    code: 'DII301',
    name: 'Machine Learning พื้นฐาน',
    credits: 3,
    semester: '1',
    year: 2567,
    instructor: 'ดร.มานะ เก่งกาจ',
    students: 52,
    schedule: 'อ. 09:00-12:00',
  },
  {
    id: '4',
    code: 'DII302',
    name: 'Data Visualization',
    credits: 3,
    semester: '1',
    year: 2567,
    instructor: 'อ.สุดา วิเคราะห์',
    students: 40,
    schedule: 'พฤ. 13:00-16:00',
  },
];

// Mock Activities
export const mockActivities: Activity[] = [
  {
    id: '1',
    title: 'CAMT Hackathon 2024',
    type: 'hackathon',
    date: new Date('2024-03-15'),
    points: 50,
    hours: 24,
    status: 'completed',
  },
  {
    id: '2',
    title: 'AI Workshop',
    type: 'workshop',
    date: new Date('2024-04-20'),
    points: 20,
    hours: 6,
    status: 'completed',
  },
  {
    id: '3',
    title: 'Industry Talk: Future of Tech',
    type: 'seminar',
    date: new Date('2024-05-10'),
    points: 10,
    hours: 3,
    status: 'approved',
  },
  {
    id: '4',
    title: 'Summer Internship Program',
    type: 'internship',
    date: new Date('2024-06-01'),
    points: 100,
    hours: 320,
    status: 'pending',
  },
];

// Mock Job Postings
export const mockJobPostings: JobPosting[] = [
  {
    id: '1',
    title: 'Frontend Developer Intern',
    companyName: 'Tech Innovation Co., Ltd.',
    type: 'internship',
    location: 'กรุงเทพฯ',
    description: 'เปิดรับนักศึกษาฝึกงานตำแหน่ง Frontend Developer',
    requirements: ['กำลังศึกษาชั้นปีที่ 3-4', 'GPA 2.50 ขึ้นไป'],
    skills: ['React', 'TypeScript', 'CSS'],
    deadline: new Date('2024-05-31'),
    applicants: 12,
  },
  {
    id: '2',
    title: 'Data Analyst Intern',
    companyName: 'Data Insights Thailand',
    type: 'internship',
    location: 'เชียงใหม่',
    description: 'ฝึกงานด้าน Data Analysis',
    requirements: ['กำลังศึกษาชั้นปีที่ 3-4', 'สนใจด้าน Data'],
    skills: ['Python', 'SQL', 'Data Visualization'],
    deadline: new Date('2024-06-15'),
    applicants: 8,
  },
  {
    id: '3',
    title: 'UX/UI Designer',
    companyName: 'Creative Studio',
    type: 'full-time',
    location: 'Remote',
    description: 'รับสมัคร UX/UI Designer ประจำบริษัท',
    requirements: ['มีประสบการณ์ 0-2 ปี', 'มี Portfolio'],
    skills: ['Figma', 'Adobe XD', 'User Research'],
    deadline: new Date('2024-06-30'),
    applicants: 25,
  },
];

// Mock Notifications
export const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'เกรดออกแล้ว',
    message: 'เกรดวิชา DII201 ประกาศแล้ว',
    type: 'success',
    read: false,
    createdAt: new Date(),
  },
  {
    id: '2',
    title: 'กิจกรรมใหม่',
    message: 'เปิดรับสมัคร CAMT Hackathon 2024',
    type: 'info',
    read: false,
    createdAt: new Date(),
  },
  {
    id: '3',
    title: 'นัดพบอาจารย์',
    message: 'การนัดหมายของคุณได้รับการยืนยันแล้ว',
    type: 'success',
    read: true,
    createdAt: new Date(),
  },
];

// Mock Requests
export const mockRequests: StudentRequest[] = [
  {
    id: '1',
    type: 'certificate',
    title: 'ขอหนังสือรับรองการเป็นนักศึกษา',
    description: 'ขอหนังสือรับรองเพื่อใช้สมัครฝึกงาน',
    status: 'processing',
    createdAt: new Date('2024-04-01'),
    updatedAt: new Date('2024-04-02'),
  },
  {
    id: '2',
    type: 'scholarship',
    title: 'สมัครทุนการศึกษา',
    description: 'สมัครทุนเรียนดีประจำปี 2567',
    status: 'pending',
    createdAt: new Date('2024-04-05'),
    updatedAt: new Date('2024-04-05'),
  },
];

// Mock Appointments
export const mockAppointments: Appointment[] = [
  {
    id: '1',
    studentId: '650510001',
    teacherId: 'T001',
    date: new Date('2024-04-15'),
    time: '10:00',
    reason: 'ปรึกษาเรื่องการเลือกวิชาเลือก',
    status: 'confirmed',
  },
  {
    id: '2',
    studentId: '650510001',
    teacherId: 'T001',
    date: new Date('2024-04-20'),
    time: '14:00',
    reason: 'ปรึกษาเรื่องโปรเจค',
    status: 'pending',
  },
];

// Dashboard Stats
export const dashboardStats = {
  student: {
    totalCredits: 90,
    requiredCredits: 120,
    currentGPA: 3.45,
    activityPoints: 180,
    requiredPoints: 200,
    upcomingEvents: 3,
  },
  teacher: {
    totalCourses: 4,
    totalStudents: 175,
    pendingGrades: 12,
    advisees: 15,
    pendingAppointments: 5,
  },
  staff: {
    totalUsers: 1250,
    activeStudents: 850,
    pendingRequests: 24,
    systemHealth: 98,
  },
  company: {
    activePostings: 3,
    totalApplicants: 45,
    shortlisted: 12,
    interviews: 5,
  },
};
