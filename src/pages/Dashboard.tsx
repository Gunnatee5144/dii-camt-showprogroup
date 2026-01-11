import { useAuth } from '@/contexts/AuthContext';
import StudentDashboard from './dashboards/StudentDashboard';
import LecturerDashboard from './dashboards/LecturerDashboard';
import TeacherDashboard from './dashboards/TeacherDashboard';
import StaffDashboard from './dashboards/StaffDashboard';
import CompanyDashboard from './dashboards/CompanyDashboard';
import AdminDashboard from './dashboards/AdminDashboard';

export default function Dashboard() {
  const { user } = useAuth();

  if (!user) return null;

  switch (user.role) {
    case 'student':
      return <StudentDashboard />;
    case 'lecturer':
      return <LecturerDashboard />;
    case 'teacher':
      return <TeacherDashboard />;
    case 'staff':
      return <StaffDashboard />;
    case 'company':
      return <CompanyDashboard />;
    case 'admin':
      return <AdminDashboard />;
    default:
      return <StudentDashboard />;
  }
}
