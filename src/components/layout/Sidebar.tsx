import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  BookOpen,
  Calendar,
  FileText,
  Users,
  Building2,
  Trophy,
  MessageSquare,
  Settings,
  GraduationCap,
  ClipboardList,
  BarChart3,
  Briefcase,
  UserCog,
  Shield,
  Bell,
  Folder,
  X,
  DollarSign,
  Search,
  Clock,
  Building,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface NavItem {
  icon: React.ElementType;
  label: string;
  href: string;
  badge?: number;
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const getNavItems = (role: UserRole): NavItem[] => {
  const commonItems: NavItem[] = [
    { icon: LayoutDashboard, label: 'แดชบอร์ด', href: '/dashboard' },
  ];

  switch (role) {
    case 'student':
      return [
        ...commonItems,
        { icon: BookOpen, label: 'ลงทะเบียนเรียน', href: '/courses' },
        { icon: Calendar, label: 'ตารางเรียน', href: '/schedule' },
        { icon: GraduationCap, label: 'ผลการเรียน', href: '/grades' },
        { icon: Trophy, label: 'กิจกรรม & สะสมแต้ม', href: '/activities' },
        { icon: FileText, label: 'Portfolio & CV', href: '/portfolio' },
        { icon: Briefcase, label: 'ฝึกงาน', href: '/internships' },
        { icon: ClipboardList, label: 'คำร้อง/ฟอร์ม', href: '/requests' },
        { icon: MessageSquare, label: 'ข้อความ', href: '/messages' },
        { icon: Settings, label: 'ตั้งค่า', href: '/settings' },
      ];
    case 'lecturer':
      return [
        ...commonItems,
        { icon: Calendar, label: 'ตารางสอน', href: '/schedule' },
        { icon: Users, label: 'นักศึกษาในที่ปรึกษา', href: '/students' },
        { icon: BookOpen, label: 'จัดการรายวิชา', href: '/courses' },
        { icon: ClipboardList, label: 'การเข้าเรียน/พฤติกรรม', href: '/attendance' },
        { icon: GraduationCap, label: 'ตัดเกรด', href: '/grades' },
        { icon: FileText, label: 'นัดหมาย', href: '/appointments' },
        { icon: BarChart3, label: 'รายงานภาระงาน', href: '/workload' },
        { icon: MessageSquare, label: 'ข้อความ', href: '/messages' },
        { icon: Settings, label: 'ตั้งค่า', href: '/settings' },
      ];
    case 'staff':
      return [
        ...commonItems,
        { icon: Users, label: 'ผู้ใช้งาน', href: '/users' },
        { icon: DollarSign, label: 'งบประมาณ & พัสดุ', href: '/budget' },
        { icon: Building2, label: 'เครือข่ายความร่วมมือ', href: '/network' },
        { icon: FileText, label: 'ออกเอกสารสำคัญ', href: '/documents' },
        { icon: UserCog, label: 'บริหารงานบุคคล', href: '/personnel' },
        { icon: Calendar, label: 'ตารางเรียนและห้อง', href: '/schedule-management' },
        { icon: Trophy, label: 'จัดการกิจกรรม', href: '/activities-management' },
        { icon: Clock, label: 'ติดตามภาระงาน', href: '/workload-tracking' },
        { icon: BarChart3, label: 'รายงานและสถิติ', href: '/reports' },
        { icon: Shield, label: 'ตรวจสอบ (Audit)', href: '/audit' },
        { icon: Bell, label: 'จัดการประกาศ', href: '/notifications' },
        { icon: Settings, label: 'ตั้งค่า', href: '/settings' },
      ];
    case 'company':
      return [
        ...commonItems,
        { icon: Briefcase, label: 'ประกาศรับสมัครงาน', href: '/job-postings' },
        { icon: Search, label: 'ค้นหานักศึกษา', href: '/student-profiles' },
        { icon: Users, label: 'ผู้สมัครงาน', href: '/applicants' },
        { icon: UserCog, label: 'ติดตามนักศึกษาฝึกงาน', href: '/intern-tracking' },
        { icon: Building2, label: 'ความร่วมมือ (MOU)', href: '/cooperation' },
        { icon: DollarSign, label: 'แพ็คเกจสมาชิก', href: '/subscription' },
        { icon: Settings, label: 'ตั้งค่า', href: '/settings' },
      ];
    case 'admin':
      return [
        ...commonItems,
        { icon: Shield, label: 'ภาพรวมระบบ (Admin)', href: '/dashboard' },
        { icon: Users, label: 'จัดการผู้ใช้งาน', href: '/users' },
        // Academic
        { icon: BookOpen, label: 'หลักสูตร & รายวิชา', href: '/courses' },
        { icon: Calendar, label: 'ตารางเรียน/สอน', href: '/schedule-management' },
        // Staff Functions
        { icon: DollarSign, label: 'งบประมาณ & พัสดุ', href: '/budget' },
        { icon: UserCog, label: 'บริหารงานบุคคล', href: '/personnel' },
        { icon: FileText, label: 'เอกสาร & คำร้อง', href: '/documents' },
        { icon: Building2, label: 'เครือข่ายความร่วมมือ', href: '/network' },
        { icon: Trophy, label: 'กิจกรรม', href: '/activities-management' },
        // Company Functions
        { icon: Briefcase, label: 'งาน & ฝึกงาน', href: '/job-postings' },
        { icon: Search, label: 'ฐานข้อมูลนักศึกษา', href: '/student-profiles' },
        { icon: Building, label: 'บริษัทพันธมิตร', href: '/cooperation' },
        // System
        { icon: Bell, label: 'ประกาศ & แจ้งเตือน', href: '/notifications' },
        { icon: BarChart3, label: 'รายงาน & สถิติ', href: '/reports' },
        { icon: Shield, label: 'Audit Logs', href: '/audit' },
        { icon: Settings, label: 'ตั้งค่าระบบ', href: '/settings' },
      ];
    default:
      return commonItems;
  }
};

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation();
  const { user } = useAuth();

  if (!user) return null;

  const navItems = getNavItems(user.role);

  const getRoleGradient = (role: UserRole) => {
    switch (role) {
      case 'student': return 'from-role-student to-blue-600';
      case 'lecturer': return 'from-role-teacher to-green-600';
      case 'staff': return 'from-role-staff to-purple-600';
      case 'company': return 'from-role-company to-yellow-600';
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-foreground/50 md:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-64 bg-sidebar text-sidebar-foreground shadow-xl transition-transform duration-300 md:sticky md:top-0 md:h-screen md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className={cn("w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center", getRoleGradient(user.role))}>
              <span className="text-lg font-bold text-white">DII</span>
            </div>
            <div>
              <h2 className="font-semibold text-sidebar-foreground">DII CAMT</h2>
              <p className="text-xs text-sidebar-foreground/60">ระบบบริหารข้อมูล</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="md:hidden text-sidebar-foreground" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation */}
        <ScrollArea className="h-[calc(100vh-80px)] py-4">
          <nav className="px-3 space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={onClose}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-md"
                      : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="flex-1 font-medium">{item.label}</span>
                  {item.badge && (
                    <span className={cn(
                      "px-2 py-0.5 text-xs rounded-full",
                      isActive
                        ? "bg-sidebar-primary-foreground/20 text-sidebar-primary-foreground"
                        : "bg-sidebar-primary text-sidebar-primary-foreground"
                    )}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </ScrollArea>
      </aside>
    </>
  );
}
