// User Role Types
export type UserRole = 'student' | 'teacher' | 'staff' | 'company';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  createdAt: Date;
}

// Student Types
export interface Student extends User {
  role: 'student';
  studentId: string;
  major: string;
  year: number;
  gpa: number;
  credits: number;
  advisor?: string;
  skills: string[];
  activities: Activity[];
}

// Teacher Types
export interface Teacher extends User {
  role: 'teacher';
  teacherId: string;
  department: string;
  position: string;
  courses: Course[];
  advisees: string[];
}

// Staff Types
export interface Staff extends User {
  role: 'staff';
  staffId: string;
  department: string;
  position: string;
  permissions: string[];
}

// Company Types
export interface Company extends User {
  role: 'company';
  companyId: string;
  companyName: string;
  industry: string;
  jobPostings: JobPosting[];
}

// Course Types
export interface Course {
  id: string;
  code: string;
  name: string;
  credits: number;
  semester: string;
  year: number;
  instructor: string;
  students: number;
  schedule?: string;
}

// Activity Types
export interface Activity {
  id: string;
  title: string;
  type: 'event' | 'hackathon' | 'internship' | 'workshop' | 'seminar';
  date: Date;
  points: number;
  hours: number;
  status: 'pending' | 'approved' | 'completed';
}

// Job Posting Types
export interface JobPosting {
  id: string;
  title: string;
  companyName: string;
  type: 'internship' | 'full-time' | 'part-time';
  location: string;
  description: string;
  requirements: string[];
  skills: string[];
  deadline: Date;
  applicants: number;
}

// Notification Types
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: Date;
}

// Request Types
export interface StudentRequest {
  id: string;
  type: 'course_opening' | 'certificate' | 'scholarship' | 'other';
  title: string;
  description: string;
  status: 'pending' | 'processing' | 'approved' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}

// Appointment Types
export interface Appointment {
  id: string;
  studentId: string;
  teacherId: string;
  date: Date;
  time: string;
  reason: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}
