import type {
  Student,
  Lecturer,
  Staff,
  Company,
  Admin,
  Course,
  Activity,
  JobPosting,
  Notification,
  TimelineEvent,
  InternshipRecord,
  Appointment,
  Request,
  Schedule,
  Grade,
  Skill,
  Badge,
  Section,
  LecturerWorkload,
} from '@/types';

// ================================
// MOCK STUDENTS
// ================================
export const mockStudents: Student[] = [
  {
    id: 'STU001',
    email: 'somchai.j@cmu.ac.th',
    name: 'Somchai Jaidee',
    nameThai: 'สมชาย ใจดี',
    role: 'student',
    studentId: '650510001',
    major: 'Digital Industry Integration',
    program: 'bachelor',
    year: 3,
    semester: 1,
    academicYear: '2568',

    gpa: 3.45,
    gpax: 3.52,
    totalCredits: 130,
    earnedCredits: 90,
    requiredCredits: 130,
    academicStatus: 'normal',

    advisorId: 'LEC001',
    advisorName: 'ดร.สมศักดิ์ วิชาการ',

    skills: [
      { name: 'Python', category: 'programming', level: 'advanced', verifiedBy: 'DII201' },
      { name: 'React', category: 'framework', level: 'intermediate', verifiedBy: 'DII202' },
      { name: 'Machine Learning', category: 'programming', level: 'intermediate', verifiedBy: 'DII301' },
      { name: 'UI/UX Design', category: 'soft_skill', level: 'advanced' },
      { name: 'Data Analysis', category: 'programming', level: 'advanced', verifiedBy: 'DII302' },
    ],

    activities: [],
    totalActivityHours: 48,
    gamificationPoints: 250,
    badges: [
      {
        id: 'BADGE001',
        name: 'Early Bird',
        nameThai: 'นกเจาะจง',
        description: 'สมัครกิจกรรมก่อนใครๆ',
        icon: '🐦',
        earnedAt: new Date('2024-01-15'),
        criteria: 'สมัครกิจกรรมภายใน 24 ชั่วโมงแรก',
      },
      {
        id: 'BADGE002',
        name: 'Team Player',
        nameThai: 'ผู้เล่นทีม',
        description: 'ทำงานเป็นทีมได้ดีเยี่ยม',
        icon: '🤝',
        earnedAt: new Date('2024-03-20'),
        criteria: 'ได้รับคะแนนการประเมินเพื่อนร่วมงาน 4.5+',
      },
    ],

    dataConsent: {
      studentId: 'STU001',
      allowDataSharing: true,
      allowPortfolioSharing: true,
      sharedWithCompanies: ['COM001', 'COM002'],
      emailNotifications: true,
      smsNotifications: false,
      inAppNotifications: true,
      showInLeaderboard: true,
      profileVisibility: 'university',
      consentDate: new Date('2024-01-01'),
      lastModified: new Date('2024-01-01'),
      history: [],
    },

    timeline: [],

    phone: '081-234-5678',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=somchai',
    createdAt: new Date('2021-06-01'),
    lastLogin: new Date('2024-01-09'),
    isActive: true,
  },
  {
    id: 'STU002',
    email: 'suda.m@cmu.ac.th',
    name: 'Suda Manee',
    nameThai: 'สุดา มณี',
    role: 'student',
    studentId: '650510002',
    major: 'Digital Industry Integration',
    program: 'bachelor',
    year: 2,
    semester: 1,
    academicYear: '2568',

    gpa: 3.78,
    gpax: 3.75,
    totalCredits: 130,
    earnedCredits: 60,
    requiredCredits: 130,
    academicStatus: 'normal',

    advisorId: 'LEC001',
    advisorName: 'ดร.สมศักดิ์ วิชาการ',

    skills: [
      { name: 'JavaScript', category: 'programming', level: 'advanced' },
      { name: 'Vue.js', category: 'framework', level: 'intermediate' },
      { name: 'Node.js', category: 'framework', level: 'intermediate' },
    ],

    activities: [],
    totalActivityHours: 36,
    gamificationPoints: 180,
    badges: [],

    dataConsent: {
      studentId: 'STU002',
      allowDataSharing: true,
      allowPortfolioSharing: true,
      sharedWithCompanies: [],
      emailNotifications: true,
      smsNotifications: true,
      inAppNotifications: true,
      showInLeaderboard: true,
      profileVisibility: 'university',
      consentDate: new Date('2022-06-01'),
      lastModified: new Date('2022-06-01'),
      history: [],
    },

    timeline: [],

    phone: '082-345-6789',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=suda',
    createdAt: new Date('2022-06-01'),
    lastLogin: new Date('2024-01-09'),
    isActive: true,
  },
  {
    id: 'STU003',
    email: 'chai.k@cmu.ac.th',
    name: 'Chai Kulap',
    nameThai: 'ชัย กุหลาบ',
    role: 'student',
    studentId: '650510003',
    major: 'Digital Industry Integration',
    program: 'bachelor',
    year: 4,
    semester: 1,
    academicYear: '2568',

    gpa: 2.15,
    gpax: 2.45,
    totalCredits: 130,
    earnedCredits: 105,
    requiredCredits: 130,
    academicStatus: 'probation',

    advisorId: 'LEC001',
    advisorName: 'ดร.สมศักดิ์ วิชาการ',

    skills: [
      { name: 'HTML', category: 'programming', level: 'intermediate' },
      { name: 'CSS', category: 'programming', level: 'beginner' },
    ],

    activities: [],
    totalActivityHours: 12,
    gamificationPoints: 50,
    badges: [],

    dataConsent: {
      studentId: 'STU003',
      allowDataSharing: false,
      allowPortfolioSharing: false,
      sharedWithCompanies: [],
      emailNotifications: true,
      smsNotifications: false,
      inAppNotifications: true,
      showInLeaderboard: false,
      profileVisibility: 'private',
      consentDate: new Date('2020-06-01'),
      lastModified: new Date('2023-08-15'),
      history: [],
    },

    timeline: [],

    phone: '083-456-7890',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=chai',
    createdAt: new Date('2020-06-01'),
    lastLogin: new Date('2024-01-08'),
    isActive: true,
  },
];

export const mockStudent = mockStudents[0];

// ================================
// MOCK LECTURERS
// ================================
export const mockLecturers: Lecturer[] = [
  {
    id: 'LEC001',
    email: 'somsak.w@cmu.ac.th',
    name: 'Dr. Somsak Vichakan',
    nameThai: 'ดร.สมศักดิ์ วิชาการ',
    role: 'lecturer',
    lecturerId: 'L001',
    department: 'Digital Industry Integration',
    position: 'assistant_professor',

    courses: [],
    teachingHours: 12,
    maxTeachingHours: 18,

    advisees: ['STU001', 'STU002', 'STU003'],
    maxAdvisees: 15,

    officeHours: [
      {
        id: 'OH001',
        lecturerId: 'LEC001',
        day: 'monday',
        startTime: '13:00',
        endTime: '15:00',
        location: 'ห้อง 501 อาคาร CAMT',
        isAvailable: true,
      },
      {
        id: 'OH002',
        lecturerId: 'LEC001',
        day: 'wednesday',
        startTime: '13:00',
        endTime: '15:00',
        location: 'ห้อง 501 อาคาร CAMT',
        isAvailable: true,
      },
    ],
    appointments: [],

    specialization: ['Machine Learning', 'Data Science', 'AI'],
    researchInterests: ['Deep Learning', 'Computer Vision', 'NLP'],

    phone: '053-943-000',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=somsak',
    createdAt: new Date('2015-01-01'),
    lastLogin: new Date('2024-01-09'),
    isActive: true,
  },
  {
    id: 'LEC002',
    email: 'mana.k@cmu.ac.th',
    name: 'Dr. Mana Kaengkaj',
    nameThai: 'ดร.มานะ เก่งกาจ',
    role: 'lecturer',
    lecturerId: 'L002',
    department: 'Digital Industry Integration',
    position: 'associate_professor',

    courses: [],
    teachingHours: 15,
    maxTeachingHours: 18,

    advisees: ['STU004', 'STU005'],
    maxAdvisees: 15,

    officeHours: [
      {
        id: 'OH003',
        lecturerId: 'LEC002',
        day: 'tuesday',
        startTime: '10:00',
        endTime: '12:00',
        location: 'ห้อง 502 อาคาร CAMT',
        isAvailable: true,
      },
    ],
    appointments: [],

    specialization: ['Software Engineering', 'Web Development'],
    researchInterests: ['Cloud Computing', 'DevOps', 'Microservices'],

    phone: '053-943-001',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mana',
    createdAt: new Date('2010-01-01'),
    lastLogin: new Date('2024-01-09'),
    isActive: true,
  },
];

export const mockLecturer = mockLecturers[0];
export const mockTeacher = mockLecturer; // Alias for compatibility

// ================================
// MOCK STAFF
// ================================
export const mockStaffUsers: Staff[] = [
  {
    id: 'STA001',
    email: 'somying.r@cmu.ac.th',
    name: 'Somying Rakngan',
    nameThai: 'สมหญิง รักงาน',
    role: 'staff',
    staffId: 'S001',
    department: 'CAMT Administration',
    position: 'เจ้าหน้าที่บริหารทั่วไป',

    permissions: [
      { resource: 'students', actions: ['read', 'update'] },
      { resource: 'courses', actions: ['create', 'read', 'update', 'delete'] },
      { resource: 'schedules', actions: ['create', 'read', 'update', 'delete'] },
      { resource: 'reports', actions: ['read'] },
    ],
    canManageUsers: true,
    canManageCourses: true,
    canManageSchedules: true,
    canViewReports: true,
    canManageInternships: true,

    activityLogs: [],

    phone: '053-943-100',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=somying',
    createdAt: new Date('2018-01-01'),
    lastLogin: new Date('2024-01-09'),
    isActive: true,
  },
];

export const mockStaff = mockStaffUsers[0];

// ================================
// MOCK COMPANIES
// ================================
export const mockCompanies: Company[] = [
  {
    id: 'COM001',
    email: 'hr@techinnovation.co.th',
    name: 'Tech Innovation Co., Ltd.',
    nameThai: 'บริษัท เทค อินโนเวชั่น จำกัด',
    role: 'company',
    companyId: 'C001',
    companyName: 'Tech Innovation Co., Ltd.',
    companyNameThai: 'บริษัท เทค อินโนเวชั่น จำกัด',
    industry: 'Technology',
    size: 'medium',
    website: 'https://techinnovation.co.th',
    address: '123 ถ.นิมมานเหมินทร์ เชียงใหม่ 50200',

    jobPostings: [],
    internshipSlots: 10,
    currentInterns: 3,

    studentViewConsent: ['STU001'],

    canContactStudents: true,
    messages: [],

    phone: '052-123-456',
    avatar: 'https://api.dicebear.com/7.x/shapes/svg?seed=techinnovation',
    createdAt: new Date('2023-01-01'),
    lastLogin: new Date('2024-01-09'),
    isActive: true,
  },
  {
    id: 'COM002',
    email: 'hr@datainsights.co.th',
    name: 'Data Insights Thailand',
    nameThai: 'บริษัท ดาต้า อินไซต์ (ประเทศไทย) จำกัด',
    role: 'company',
    companyId: 'C002',
    companyName: 'Data Insights Thailand',
    companyNameThai: 'บริษัท ดาต้า อินไซต์ (ประเทศไทย) จำกัด',
    industry: 'Data Analytics',
    size: 'small',
    website: 'https://datainsights.co.th',
    address: '456 ถ.ห้วยแก้ว เชียงใหม่ 50300',

    jobPostings: [],
    internshipSlots: 5,
    currentInterns: 2,

    studentViewConsent: ['STU001', 'STU002'],

    canContactStudents: true,
    messages: [],

    phone: '052-234-567',
    avatar: 'https://api.dicebear.com/7.x/shapes/svg?seed=datainsights',
    createdAt: new Date('2023-06-01'),
    lastLogin: new Date('2024-01-08'),
    isActive: true,
  },
];

export const mockCompany = mockCompanies[0];

// ================================
// MOCK ADMIN
// ================================
export const mockAdmin: Admin = {
  id: 'ADM001',
  email: 'admin@cmu.ac.th',
  name: 'System Administrator',
  nameThai: 'ผู้ดูแลระบบ',
  role: 'admin',
  adminId: 'A001',
  isSuperAdmin: true,

  permissions: ['*'],

  systemLogs: [],
  automationRules: [],

  phone: '053-943-999',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
  createdAt: new Date('2020-01-01'),
  lastLogin: new Date('2024-01-09'),
  isActive: true,
};

// ================================
// MOCK COURSES
// ================================
const scheduleMonWed9to12: Schedule[] = [
  {
    id: 'SCH001',
    day: 'monday',
    dayThai: 'จันทร์',
    startTime: '09:00',
    endTime: '12:00',
    room: '301',
    building: 'อาคาร CAMT',
    type: 'lecture',
  },
  {
    id: 'SCH002',
    day: 'wednesday',
    dayThai: 'พุธ',
    startTime: '09:00',
    endTime: '12:00',
    room: '301',
    building: 'อาคาร CAMT',
    type: 'lecture',
  },
];

const scheduleTueThu13to16: Schedule[] = [
  {
    id: 'SCH003',
    day: 'tuesday',
    dayThai: 'อังคาร',
    startTime: '13:00',
    endTime: '16:00',
    room: '302',
    building: 'อาคาร CAMT',
    type: 'lecture',
  },
  {
    id: 'SCH004',
    day: 'thursday',
    dayThai: 'พฤหัสบดี',
    startTime: '13:00',
    endTime: '16:00',
    room: '302',
    building: 'อาคาร CAMT',
    type: 'lecture',
  },
];

export const mockCourses: Course[] = [
  {
    id: 'CRS001',
    code: 'DII201',
    name: 'User Experience Design',
    nameThai: 'การออกแบบประสบการณ์ผู้ใช้',
    credits: 3,
    semester: 1,
    academicYear: '2568',
    year: 2,

    lecturerId: 'LEC001',
    lecturerName: 'ดร.สมศักดิ์ วิชาการ',
    sections: [
      {
        id: 'SEC001',
        sectionNumber: '01',
        room: '301',
        maxStudents: 50,
        enrolledStudents: ['STU001', 'STU002'],
        schedule: scheduleMonWed9to12,
      },
    ],

    description: 'ศึกษาหลักการและกระบวนการออกแบบประสบการณ์ผู้ใช้งาน',
    prerequisites: ['DII101'],
    learningOutcomes: [
      'เข้าใจหลักการ UX Design',
      'สามารถทำ User Research',
      'สร้าง Prototype ได้',
    ],

    schedule: scheduleMonWed9to12,

    enrolledStudents: ['STU001', 'STU002'],
    maxStudents: 50,
    minStudents: 20,

    materials: [],
    assignments: [],
    grades: [],
  },
  {
    id: 'CRS002',
    code: 'DII202',
    name: 'Web Application Development',
    nameThai: 'การพัฒนาเว็บแอปพลิเคชัน',
    credits: 3,
    semester: 1,
    academicYear: '2568',
    year: 2,

    lecturerId: 'LEC002',
    lecturerName: 'ดร.มานะ เก่งกาจ',
    sections: [
      {
        id: 'SEC002',
        sectionNumber: '01',
        room: '302',
        maxStudents: 45,
        enrolledStudents: ['STU001', 'STU002'],
        schedule: scheduleTueThu13to16,
      },
    ],

    description: 'ศึกษาการพัฒนาเว็บแอปพลิเคชันด้วย Modern Framework',
    prerequisites: ['DII102'],
    learningOutcomes: [
      'เข้าใจ Frontend Framework',
      'พัฒนา Full-Stack Application',
      'Deploy Application',
    ],

    schedule: scheduleTueThu13to16,

    enrolledStudents: ['STU001', 'STU002'],
    maxStudents: 45,
    minStudents: 20,

    materials: [],
    assignments: [],
    grades: [],
  },
  {
    id: 'CRS003',
    code: 'DII301',
    name: 'Introduction to Machine Learning',
    nameThai: 'Machine Learning พื้นฐาน',
    credits: 3,
    semester: 1,
    academicYear: '2568',
    year: 3,

    lecturerId: 'LEC001',
    lecturerName: 'ดร.สมศักดิ์ วิชาการ',
    sections: [
      {
        id: 'SEC003',
        sectionNumber: '01',
        room: '401',
        maxStudents: 55,
        enrolledStudents: ['STU001'],
        schedule: [
          {
            id: 'SCH005',
            day: 'tuesday',
            dayThai: 'อังคาร',
            startTime: '09:00',
            endTime: '12:00',
            room: '401',
            building: 'อาคาร CAMT',
            type: 'lecture',
          },
        ],
      },
    ],

    description: 'ศึกษาพื้นฐาน Machine Learning และการประยุกต์ใช้',
    prerequisites: ['DII201', 'MATH201'],
    learningOutcomes: [
      'เข้าใจ ML Algorithms',
      'สร้าง ML Model',
      'Evaluate และ Deploy Model',
    ],

    schedule: [
      {
        id: 'SCH005',
        day: 'tuesday',
        dayThai: 'อังคาร',
        startTime: '09:00',
        endTime: '12:00',
        room: '401',
        building: 'อาคาร CAMT',
        type: 'lecture',
      },
    ],

    enrolledStudents: ['STU001'],
    maxStudents: 55,
    minStudents: 20,

    materials: [],
    assignments: [],
    grades: [],
  },
];

// ================================
// MOCK ACTIVITIES
// ================================
export const mockActivities: Activity[] = [
  {
    id: 'ACT001',
    title: 'CAMT Hackathon 2024',
    titleThai: 'แข่งขัน Hackathon CAMT 2024',
    description: 'การแข่งขันพัฒนาโปรเจคภายใน 48 ชั่วโมง',
    type: 'hackathon',
    startDate: new Date('2024-03-15T09:00:00'),
    endDate: new Date('2024-03-17T18:00:00'),
    location: 'อาคาร CAMT',
    organizer: 'สาขา DII',
    activityHours: 48,
    gamificationPoints: 100,
    maxParticipants: 100,
    enrolledStudents: ['STU001', 'STU002'],
    attendedStudents: ['STU001', 'STU002'],
    isGroupActivity: true,
    teamSize: 4,
    qrCode: 'QR_HACK2024',
    checkInEnabled: true,
    status: 'completed',
    registrationStatus: 'closed',
    requiresPeerEvaluation: true,
    evaluations: [],
  },
  {
    id: 'ACT002',
    title: 'AI Workshop Series',
    titleThai: 'เวิร์คช็อป AI ซีรีส์',
    description: 'เรียนรู้ AI และ Machine Learning',
    type: 'workshop',
    startDate: new Date('2024-04-20T13:00:00'),
    endDate: new Date('2024-04-20T18:00:00'),
    location: 'ห้องประชุม 501',
    organizer: 'ดร.สมศักดิ์ วิชาการ',
    activityHours: 5,
    gamificationPoints: 30,
    maxParticipants: 50,
    enrolledStudents: ['STU001'],
    attendedStudents: ['STU001'],
    isGroupActivity: false,
    checkInEnabled: true,
    status: 'completed',
    registrationStatus: 'closed',
    requiresPeerEvaluation: false,
  },
  {
    id: 'ACT003',
    title: 'Industry Talk: Future of Technology',
    titleThai: 'เสวนาอุตสาหกรรม: อนาคตของเทคโนโลยี',
    description: 'พูดคุยกับผู้เชี่ยวชาญจากอุตสาหกรรม',
    type: 'seminar',
    startDate: new Date('2024-05-10T14:00:00'),
    endDate: new Date('2024-05-10T17:00:00'),
    location: 'หอประชุม CAMT',
    organizer: 'คณะ CAMT',
    activityHours: 3,
    gamificationPoints: 20,
    maxParticipants: 200,
    enrolledStudents: ['STU001', 'STU002'],
    attendedStudents: ['STU001'],
    isGroupActivity: false,
    checkInEnabled: true,
    status: 'completed',
    registrationStatus: 'closed',
    requiresPeerEvaluation: false,
  },
  {
    id: 'ACT004',
    title: 'Code Competition 2024',
    titleThai: 'การแข่งขันเขียนโปรแกรม 2024',
    description: 'แข่งขันแก้โจทย์ Algorithm',
    type: 'competition',
    startDate: new Date('2024-06-15T09:00:00'),
    endDate: new Date('2024-06-15T17:00:00'),
    location: 'ห้องปฏิบัติการคอมพิวเตอร์',
    organizer: 'สาขา DII',
    activityHours: 8,
    gamificationPoints: 50,
    maxParticipants: 80,
    enrolledStudents: ['STU001'],
    attendedStudents: [],
    isGroupActivity: false,
    checkInEnabled: true,
    status: 'upcoming',
    registrationStatus: 'open',
    requiresPeerEvaluation: false,
  },
];

// ================================
// MOCK JOB POSTINGS
// ================================
export const mockJobPostings: JobPosting[] = [
  {
    id: 'JOB001',
    companyId: 'COM001',
    companyName: 'Tech Innovation Co., Ltd.',
    title: 'Frontend Developer Intern',
    type: 'internship',
    positions: 2,
    description: 'เปิดรับนักศึกษาฝึกงานตำแหน่ง Frontend Developer ทำงานกับทีมพัฒนาผลิตภัณฑ์',
    responsibilities: [
      'พัฒนา Web Application ด้วย React',
      'ทำงานร่วมกับ Designer และ Backend Team',
      'เขียน Unit Tests',
    ],
    requirements: [
      'กำลังศึกษาชั้นปีที่ 3-4 สาขาที่เกี่ยวข้อง',
      'GPA 2.50 ขึ้นไป',
      'มีความรับผิดชอบสูง',
    ],
    preferredSkills: ['React', 'TypeScript', 'Tailwind CSS', 'Git'],
    salary: '10,000 - 15,000 บาท/เดือน',
    benefits: ['ค่าเดินทาง', 'อาหารกลางวัน', 'ประกันอุบัติเหตุ'],
    location: 'เชียงใหม่',
    workType: 'onsite',
    startDate: new Date('2024-06-01'),
    deadline: new Date('2024-05-15'),
    applicants: [
      {
        id: 'APP001',
        jobPostingId: 'JOB001',
        studentId: 'STU001',
        appliedAt: new Date('2024-01-05'),
        status: 'pending',
        coverLetter: 'สนใจตำแหน่งนี้มากครับ มีประสบการณ์ทำโปรเจค React',
      },
    ],
    status: 'open',
    isActive: true,
    postedAt: new Date('2024-01-01'),
  },
  {
    id: 'JOB002',
    companyId: 'COM002',
    companyName: 'Data Insights Thailand',
    title: 'Data Analyst Intern',
    type: 'internship',
    positions: 1,
    description: 'ฝึกงานด้าน Data Analysis ทำงานกับข้อมูลจริง',
    responsibilities: [
      'วิเคราะห์ข้อมูลด้วย Python',
      'สร้าง Dashboard และ Report',
      'ทำ Data Cleaning',
    ],
    requirements: [
      'กำลังศึกษาชั้นปีที่ 3-4',
      'สนใจด้าน Data Science',
    ],
    preferredSkills: ['Python', 'SQL', 'Pandas', 'Tableau'],
    salary: '12,000 บาท/เดือน',
    benefits: ['ค่าเดินทาง', 'ประกันอุบัติเหตุ'],
    location: 'เชียงใหม่',
    workType: 'hybrid',
    startDate: new Date('2024-06-01'),
    deadline: new Date('2024-05-20'),
    applicants: [],
    status: 'open',
    isActive: true,
    postedAt: new Date('2024-01-02'),
  },
];

// ================================
// MOCK NOTIFICATIONS
// ================================
export const mockNotifications: Notification[] = [
  {
    id: 'NOT001',
    recipientId: 'STU001',
    recipientRole: 'student',
    title: 'Grade Released',
    titleThai: 'เกรดประกาศแล้ว',
    message: 'Your grade for DII201 has been released',
    messageThai: 'เกรดวิชา DII201 ประกาศแล้ว คุณได้เกรด A',
    type: 'grade',
    priority: 'high',
    channels: ['in-app', 'email'],
    isRead: false,
    actionUrl: '/grades',
    actionLabel: 'ดูเกรด',
    createdAt: new Date('2024-01-09T10:00:00'),
  },
  {
    id: 'NOT002',
    recipientId: 'STU001',
    recipientRole: 'student',
    title: 'Schedule Change',
    titleThai: 'เปลี่ยนแปลงตารางเรียน',
    message: 'DII202 schedule has been changed',
    messageThai: 'ตารางเรียนวิชา DII202 มีการเปลี่ยนแปลง ย้ายเป็นวันพฤหัสบดี',
    type: 'schedule_change',
    priority: 'urgent',
    channels: ['in-app', 'email'],
    isRead: false,
    actionUrl: '/schedule',
    actionLabel: 'ดูตารางเรียน',
    createdAt: new Date('2024-01-08T15:30:00'),
  },
  {
    id: 'NOT003',
    recipientId: 'STU001',
    recipientRole: 'student',
    title: 'New Activity',
    titleThai: 'กิจกรรมใหม่',
    message: 'New hackathon event is now open for registration',
    messageThai: 'เปิดรับสมัครกิจกรรม Hackathon ใหม่แล้ว',
    type: 'info',
    priority: 'medium',
    channels: ['in-app'],
    isRead: true,
    readAt: new Date('2024-01-08T16:00:00'),
    actionUrl: '/activities',
    actionLabel: 'ดูรายละเอียด',
    createdAt: new Date('2024-01-07T09:00:00'),
  },
];

// ================================
// MOCK TIMELINE EVENTS
// ================================
export const mockTimelineEvents: TimelineEvent[] = [
  {
    id: 'TIME001',
    studentId: 'STU001',
    type: 'enrollment',
    title: 'Enrolled in DII Program',
    titleThai: 'เข้าศึกษาหลักสูตร DII',
    description: 'Started Bachelor of Digital Industry Integration',
    date: new Date('2021-06-01'),
    semester: 1,
    academicYear: '2564',
    isImportant: true,
    tags: ['enrollment', 'start'],
  },
  {
    id: 'TIME002',
    studentId: 'STU001',
    type: 'achievement',
    title: 'Won Hackathon',
    titleThai: 'ชนะการแข่งขัน Hackathon',
    description: 'First place in CAMT Hackathon 2024',
    date: new Date('2024-03-17'),
    semester: 2,
    academicYear: '2567',
    relatedId: 'ACT001',
    relatedType: 'activity',
    isImportant: true,
    tags: ['achievement', 'hackathon'],
  },
  {
    id: 'TIME003',
    studentId: 'STU001',
    type: 'grade',
    title: 'Excellent GPA',
    titleThai: 'เกรดเฉลี่ยดีเยี่ยม',
    description: 'Achieved GPA 3.75 in Semester 2/2567',
    date: new Date('2024-05-31'),
    semester: 2,
    academicYear: '2567',
    isImportant: false,
    tags: ['academic', 'gpa'],
  },
];

// ================================
// MOCK APPOINTMENTS
// ================================
export const mockAppointments: Appointment[] = [
  {
    id: 'APT001',
    studentId: 'STU001',
    studentName: 'สมชาย ใจดี',
    lecturerId: 'LEC001',
    lecturerName: 'ดร.สมศักดิ์ วิชาการ',
    date: new Date('2024-01-10'),
    startTime: '13:00',
    endTime: '14:00',
    location: 'ห้อง 501 อาคาร CAMT',
    purpose: 'ปรึกษาเรื่องแผนการเรียน',
    status: 'confirmed',
    createdAt: new Date('2024-01-05'),
  },
  {
    id: 'APT002',
    studentId: 'STU003',
    studentName: 'ชัย กุหลาบ',
    lecturerId: 'LEC001',
    lecturerName: 'ดร.สมศักดิ์ วิชาการ',
    date: new Date('2024-01-11'),
    startTime: '13:00',
    endTime: '14:00',
    location: 'ห้อง 501 อาคาร CAMT',
    purpose: 'ปรึกษาเรื่องการเรียนซ่อม',
    notes: 'นักศึกษามีปัญหาเรื่อง GPA ต่ำ',
    status: 'confirmed',
    createdAt: new Date('2024-01-06'),
  },
];

// ================================
// MOCK GRADES
// ================================
export const mockGrades: Grade[] = [
  {
    studentId: 'STU001',
    courseId: 'CRS001',
    midterm: 85,
    final: 90,
    assignments: 88,
    participation: 95,
    total: 89,
    letterGrade: 'A',
    gradedBy: 'LEC001',
    gradedAt: new Date('2024-05-31'),
    history: [],
  },
  {
    studentId: 'STU001',
    courseId: 'CRS002',
    midterm: 80,
    final: 85,
    assignments: 90,
    participation: 85,
    total: 85,
    letterGrade: 'A',
    gradedBy: 'LEC002',
    gradedAt: new Date('2024-05-31'),
    history: [],
  },
  {
    studentId: 'STU003',
    courseId: 'CRS001',
    midterm: 55,
    final: 60,
    assignments: 58,
    participation: 70,
    total: 58,
    letterGrade: 'D+',
    gradedBy: 'LEC001',
    gradedAt: new Date('2024-05-31'),
    remarks: 'ควรพยายามมากขึ้น',
    history: [],
  },
];

// ================================
// MOCK INTERNSHIP RECORDS
// ================================
export const mockInternships: InternshipRecord[] = [
  {
    id: 'INT001',
    studentId: 'STU001',
    startMonth: '2024-06',
    endMonth: '2024-08',
    duration: 3,
    companyId: 'COM001',
    companyName: 'Tech Innovation Co., Ltd.',
    position: 'Frontend Developer Intern',
    supervisor: 'คุณสมชาย ผู้จัดการ',
    supervisorContact: 'manager@techinnovation.co.th',
    status: 'not_started',
    documents: [],
    logs: [],
  },
];

// ================================
// MOCK REQUESTS
// ================================
export const mockRequests: Request[] = [
  {
    id: 'REQ001',
    studentId: 'STU003',
    studentName: 'ชัย กุหลาบ',
    type: 'course_override',
    title: 'ขอเปิดรายวิชา DII401',
    description: 'ขอเปิดรายวิชา DII401 เนื่องจากจำเป็นต้องเรียนเพื่อให้ครบตามแผน',
    documents: [],
    status: 'pending',
    submittedAt: new Date('2024-01-05'),
  },
  {
    id: 'REQ002',
    studentId: 'STU001',
    studentName: 'สมชาย ใจดี',
    type: 'certificate',
    title: 'ขอหนังสือรับรองการเป็นนักศึกษา',
    description: 'ใช้สำหรับสมัครทุน',
    documents: [],
    status: 'approved',
    assignedTo: 'STA001',
    reviewedBy: 'STA001',
    reviewNotes: 'อนุมัติแล้ว',
    submittedAt: new Date('2024-01-03'),
    reviewedAt: new Date('2024-01-04'),
    completedAt: new Date('2024-01-05'),
  },
];

// ================================
// MOCK LECTURER WORKLOAD
// ================================
export const mockLecturerWorkloads: LecturerWorkload[] = [
  {
    lecturerId: 'LEC001',
    lecturerName: 'ดร.สมศักดิ์ วิชาการ',
    totalCourses: 2,
    totalStudents: 107,
    teachingHours: 12,
    maxHours: 18,
    advisees: 3,
    workloadPercentage: 67,
  },
  {
    lecturerId: 'LEC002',
    lecturerName: 'ดร.มานะ เก่งกาจ',
    totalCourses: 1,
    totalStudents: 45,
    teachingHours: 6,
    maxHours: 18,
    advisees: 2,
    workloadPercentage: 33,
  },
];

// ================================
// HELPER FUNCTIONS
// ================================
export function getMockUserByRole(role: string) {
  switch (role) {
    case 'student':
      return mockStudent;
    case 'lecturer':
    case 'teacher':
      return mockLecturer;
    case 'staff':
      return mockStaff;
    case 'company':
      return mockCompany;
    case 'admin':
      return mockAdmin;
    default:
      return mockStudent;
  }
}

export function getStudentTimeline(studentId: string): TimelineEvent[] {
  return mockTimelineEvents.filter(event => event.studentId === studentId);
}

export function getStudentGrades(studentId: string): Grade[] {
  return mockGrades.filter(grade => grade.studentId === studentId);
}

export function getStudentAppointments(studentId: string): Appointment[] {
  return mockAppointments.filter(apt => apt.studentId === studentId);
}

export function getLecturerAppointments(lecturerId: string): Appointment[] {
  return mockAppointments.filter(apt => apt.lecturerId === lecturerId);
}

// ================================
// MOCK MESSAGES
// ================================
export const mockMessages = [
  {
    id: 'MSG001',
    from: 'ดร.สมศักดิ์ วิชาการ',
    fromId: 'LEC001',
    to: 'สมชาย ใจดี',
    toId: 'STU001',
    subject: 'แจ้งเตือนการส่งงาน Assignment 3',
    preview: 'กรุณาส่งงาน Assignment 3 ภายในวันศุกร์นี้...',
    body: 'เรียน นักศึกษาทุกท่าน\n\nกรุณาส่งงาน Assignment 3 วิชา DII201 ภายในวันศุกร์ที่ 12 มกราคม 2567 เวลา 23:59 น. \n\nงานชิ้นนี้มีค่าน้ำหนัก 20% ของคะแนนรวม\n\nขอบคุณครับ\nดร.สมศักดิ์',
    date: new Date('2024-01-10T09:00:00'),
    read: false,
    starred: true,
    hasAttachment: true,
    attachments: [{ name: 'assignment3.pdf', size: '2.5 MB', url: '#' }],
    category: 'academic',
  },
  {
    id: 'MSG002',
    from: 'เจ้าหน้าที่สาขา DII',
    fromId: 'STA001',
    to: 'สมชาย ใจดี',
    toId: 'STU001',
    subject: 'ประกาศลงทะเบียนเรียนภาคการศึกษาที่ 2/2568',
    preview: 'เปิดให้ลงทะเบียนวันที่ 15 มกราคม 2568...',
    body: 'ประกาศ\n\nเปิดให้ลงทะเบียนเรียนภาคการศึกษาที่ 2/2568 \nวันที่ 15-20 มกราคม 2568\n\nกรุณาตรวจสอบแผนการเรียนกับอาจารย์ที่ปรึกษาก่อนลงทะเบียน',
    date: new Date('2024-01-09T14:30:00'),
    read: false,
    starred: false,
    hasAttachment: false,
    category: 'announcement',
  },
  {
    id: 'MSG003',
    from: 'Tech Innovation Co., Ltd.',
    fromId: 'COM001',
    to: 'สมชาย ใจดี',
    toId: 'STU001',
    subject: 'เชิญสัมภาษณ์งาน Frontend Developer Intern',
    preview: 'ขอเชิญสัมภาษณ์ในวันที่ 20 มกราคม 2568...',
    body: 'เรียน คุณสมชาย\n\nเราดีใจที่จะแจ้งให้ทราบว่า เราสนใจในใบสมัครของคุณสำหรับตำแหน่ง Frontend Developer Intern\n\nขอเชิญสัมภาษณ์:\nวันที่: 20 มกราคม 2568\nเวลา: 14:00 น.\nสถานที่: บริษัท เทค อินโนเวชั่น จำกัด\n\nกรุณายืนยันการเข้าสัมภาษณ์ภายในวันที่ 15 มกราคม\n\nขอแสดงความนับถือ\nฝ่ายทรัพยากรบุคคล',
    date: new Date('2024-01-08T10:15:00'),
    read: true,
    starred: true,
    hasAttachment: false,
    category: 'internship',
  },
  {
    id: 'MSG004',
    from: 'ดร.วิชัย สมบูรณ์',
    fromId: 'LEC002',
    to: 'สมชาย ใจดี',
    toId: 'STU001',
    subject: 'ตารางนัดหมายปรึกษาโปรเจค',
    preview: 'ยืนยันการนัดหมายในวันพุธ เวลา 14:00 น...',
    body: 'สวัสดีครับ\n\nยืนยันการนัดหมายปรึกษาโปรเจค\nวันพุธที่ 10 มกราคม 2568\nเวลา 14:00-15:00 น.\nห้อง 502 อาคาร CAMT\n\nกรุณาเตรียมเอกสาร:\n- รายงานความก้าวหน้า\n- Design mockup\n- Timeline\n\nหากมีข้อสงสัยแจ้งได้นะครับ',
    date: new Date('2024-01-07T16:20:00'),
    read: true,
    starred: false,
    hasAttachment: false,
    category: 'academic',
  },
  {
    id: 'MSG005',
    from: 'ระบบอัตโนมัติ',
    fromId: 'SYSTEM',
    to: 'สมชาย ใจดี',
    toId: 'STU001',
    subject: 'แจ้งเตือน: ประกาศผลการเรียน',
    preview: 'ผลการเรียนภาคการศึกษาที่ 1/2568 ประกาศแล้ว',
    body: 'เรียน นักศึกษา\n\nผลการเรียนภาคการศึกษาที่ 1/2568 ประกาศแล้ว\n\nGPA: 3.45\nGPAX: 3.52\n\nสามารถดูรายละเอียดได้ที่เมนู "เกรดและผลการเรียน"',
    date: new Date('2024-01-06T08:00:00'),
    read: true,
    starred: false,
    hasAttachment: false,
    category: 'system',
  },
  {
    id: 'MSG006',
    from: 'คณะกรรมการกิจกรรม',
    fromId: 'STA001',
    to: 'สมชาย ใจดี',
    toId: 'STU001',
    subject: 'ขอบคุณที่เข้าร่วมกิจกรรม CAMT Hackathon 2024',
    preview: 'ยินดีกับความสำเร็จในการแข่งขัน...',
    body: 'เรียน คุณสมชาย\n\nขอขอบคุณและแสดงความยินดีที่ท่านได้รับรางวัลชนะเลิศ CAMT Hackathon 2024\n\nได้รับคะแนนกิจกรรม: 100 คะแนน\nชั่วโมงกิจกรรม: 48 ชั่วโมง\nได้รับ Badge: "Hackathon Champion"\n\nประกาศนียบัตรจะจัดส่งภายใน 2 สัปดาห์',
    date: new Date('2024-03-18T10:00:00'),
    read: true,
    starred: false,
    hasAttachment: true,
    attachments: [{ name: 'certificate_preview.pdf', size: '1.2 MB', url: '#' }],
    category: 'activity',
  },
];

// ================================
// MOCK STUDENT PROJECTS
// ================================
export const mockProjects = [
  {
    id: 'PROJ001',
    studentId: 'STU001',
    title: 'E-Commerce Platform with AI Recommendation',
    titleThai: 'แพลตฟอร์มอีคอมเมิร์ซพร้อมระบบแนะนำด้วย AI',
    description: 'Full-stack e-commerce platform with personalized product recommendations using machine learning',
    descriptionThai: 'แพลตฟอร์มอีคอมเมิร์ซแบบเต็มรูปแบบพร้อมระบบแนะนำสินค้าเฉพาะบุคคลด้วย Machine Learning',
    type: 'course_project',
    courseId: 'CRS002',
    courseName: 'Web Application Development',
    technologies: ['React', 'Node.js', 'MongoDB', 'Python', 'TensorFlow'],
    role: 'Full-Stack Developer',
    teamSize: 4,
    startDate: new Date('2023-08-15'),
    endDate: new Date('2023-12-15'),
    status: 'completed',
    githubUrl: 'https://github.com/username/ecommerce-ai',
    demoUrl: 'https://ecommerce-demo.vercel.app',
    images: [],
    achievements: ['รางวัลชนะเลิศโปรเจคดีเด่น', 'ได้คะแนน 95/100'],
    skills: ['React', 'Node.js', 'MongoDB', 'Machine Learning', 'REST API'],
  },
  {
    id: 'PROJ002',
    studentId: 'STU001',
    title: 'Smart Home Automation System',
    titleThai: 'ระบบควบคุมบ้านอัจฉริยะ',
    description: 'IoT-based smart home system with mobile app control',
    descriptionThai: 'ระบบบ้านอัจฉริยะด้วย IoT พร้อมแอปมือถือควบคุม',
    type: 'personal_project',
    technologies: ['React Native', 'Arduino', 'Firebase', 'MQTT'],
    role: 'Lead Developer',
    teamSize: 2,
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-03-31'),
    status: 'in_progress',
    githubUrl: 'https://github.com/username/smart-home',
    images: [],
    skills: ['React Native', 'IoT', 'Firebase', 'Hardware Integration'],
  },
  {
    id: 'PROJ003',
    studentId: 'STU001',
    title: 'Student Portal Mobile App',
    titleThai: 'แอปพลิเคชันพอร์ทัลนักศึกษา',
    description: 'Mobile app for students to check grades, schedules, and activities',
    descriptionThai: 'แอปพลิเคชันมือถือสำหรับนักศึกษาตรวจสอบเกรด ตารางเรียน และกิจกรรม',
    type: 'hackathon_project',
    activityId: 'ACT001',
    technologies: ['Flutter', 'Firebase', 'REST API'],
    role: 'Mobile Developer',
    teamSize: 4,
    startDate: new Date('2024-03-15'),
    endDate: new Date('2024-03-17'),
    status: 'completed',
    githubUrl: 'https://github.com/username/student-portal',
    demoUrl: 'https://student-portal-demo.web.app',
    images: [],
    achievements: ['รางวัลชนะเลิศ CAMT Hackathon 2024', 'Best UX Design Award'],
    skills: ['Flutter', 'Firebase', 'UX Design', 'API Integration'],
  },
];

// ================================
// MOCK SKILLS & CERTIFICATES
// ================================
export const mockCertificates = [
  {
    id: 'CERT001',
    studentId: 'STU001',
    title: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services',
    issueDate: new Date('2023-06-15'),
    expiryDate: new Date('2026-06-15'),
    credentialId: 'AWS-123456',
    credentialUrl: 'https://aws.amazon.com/verification/123456',
    skills: ['AWS', 'Cloud Computing', 'Infrastructure'],
  },
  {
    id: 'CERT002',
    studentId: 'STU001',
    title: 'Google UX Design Professional Certificate',
    issuer: 'Google',
    issueDate: new Date('2023-09-20'),
    credentialId: 'GOOGLE-UX-789',
    credentialUrl: 'https://coursera.org/verify/professional-cert/789',
    skills: ['UX Design', 'UI Design', 'Prototyping', 'User Research'],
  },
  {
    id: 'CERT003',
    studentId: 'STU001',
    title: 'Machine Learning Specialization',
    issuer: 'Stanford University (Coursera)',
    issueDate: new Date('2024-01-10'),
    credentialId: 'ML-SPEC-456',
    credentialUrl: 'https://coursera.org/verify/specialization/456',
    skills: ['Machine Learning', 'Python', 'TensorFlow', 'Deep Learning'],
  },
];

// ================================
// MOCK ACHIEVEMENTS
// ================================
export const mockAchievements = [
  {
    id: 'ACH001',
    studentId: 'STU001',
    title: 'CAMT Hackathon 2024 Champion',
    titleThai: 'แชมป์แข่งขัน Hackathon CAMT 2024',
    description: 'First place winner in 48-hour hackathon competition',
    category: 'competition',
    date: new Date('2024-03-17'),
    organizerisOrganizer: 'CAMT',
    award: 'รางวัลชนะเลิศ + 20,000 บาท',
    certificateUrl: '#',
  },
  {
    id: 'ACH002',
    studentId: 'STU001',
    title: "Dean's List 2023",
    titleThai: 'นักศึกษาเกียรตินิยม ปี 2023',
    description: 'Achieved GPA above 3.50 for academic year 2023',
    category: 'academic',
    date: new Date('2023-05-31'),
    organizer: 'CAMT',
  },
  {
    id: 'ACH003',
    studentId: 'STU001',
    title: 'Best UX Design Award',
    titleThai: 'รางวัลออกแบบ UX ดีเด่น',
    description: 'Best user experience design in capstone project',
    category: 'project',
    date: new Date('2023-12-15'),
    organizer: 'DII Program',
  },
];

// ================================
// MOCK COURSE MATERIALS
// ================================
export const mockCourseMaterials = [
  {
    id: 'MAT001',
    courseId: 'CRS001',
    title: 'Week 1: Introduction to UX Design',
    type: 'lecture',
    fileUrl: '#',
    fileName: 'week1_intro.pdf',
    fileSize: '5.2 MB',
    uploadedBy: 'LEC001',
    uploadedAt: new Date('2024-01-01'),
    description: 'Introduction slides and reading materials',
  },
  {
    id: 'MAT002',
    courseId: 'CRS001',
    title: 'Assignment 1: User Research',
    type: 'assignment',
    fileUrl: '#',
    fileName: 'assignment1.pdf',
    fileSize: '1.8 MB',
    uploadedBy: 'LEC001',
    uploadedAt: new Date('2024-01-05'),
    dueDate: new Date('2024-01-20'),
    maxScore: 20,
    description: 'Conduct user research and create personas',
  },
  {
    id: 'MAT003',
    courseId: 'CRS002',
    title: 'Week 3: React State Management',
    type: 'lecture',
    fileUrl: '#',
    fileName: 'react_state.pdf',
    fileSize: '3.5 MB',
    uploadedBy: 'LEC002',
    uploadedAt: new Date('2024-01-15'),
    description: 'React hooks and state management patterns',
  },
];

export function getMessagesByUserId(userId: string) {
  return mockMessages.filter(msg => msg.toId === userId || msg.fromId === userId);
}

export function getProjectsByStudentId(studentId: string) {
  return mockProjects.filter(proj => proj.studentId === studentId);
}

export function getCertificatesByStudentId(studentId: string) {
  return mockCertificates.filter(cert => cert.studentId === studentId);
}

export function getAchievementsByStudentId(studentId: string) {
  return mockAchievements.filter(ach => ach.studentId === studentId);
}

export function getMaterialsByCourseId(courseId: string) {
  return mockCourseMaterials.filter(mat => mat.courseId === courseId);
}
