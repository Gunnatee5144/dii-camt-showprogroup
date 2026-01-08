import { useAuth } from '@/contexts/AuthContext';
import StudentDashboard from './dashboards/StudentDashboard';
import TeacherDashboard from './dashboards/TeacherDashboard';
import StaffDashboard from './dashboards/StaffDashboard';
import CompanyDashboard from './dashboards/CompanyDashboard';

export default function Dashboard() {
  const { user } = useAuth();

  if (!user) return null;

  switch (user.role) {
    case 'student':
      return <StudentDashboard />;
    case 'teacher':
      return <TeacherDashboard />;
    case 'staff':
      return <StaffDashboard />;
    case 'company':
      return <CompanyDashboard />;
    default:
      return <StudentDashboard />;
  }
}
