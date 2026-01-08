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
  X
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
        { icon: BookOpen, label: 'รายวิชา', href: '/courses' },
        { icon: Calendar, label: 'ตารางเรียน', href: '/schedule' },
        { icon: GraduationCap, label: 'ผลการเรียน', href: '/grades' },
        { icon: Trophy, label: 'กิจกรรม', href: '/activities', badge: 3 },
        { icon: FileText, label: 'Portfolio', href: '/portfolio' },
        { icon: Briefcase, label: 'ฝึกงาน', href: '/internships' },
        { icon: ClipboardList, label: 'คำร้อง', href: '/requests' },
        { icon: MessageSquare, label: 'ข้อความ', href: '/messages', badge: 2 },
        { icon: Settings, label: 'ตั้งค่า', href: '/settings' },
      ];
    case 'teacher':
      return [
        ...commonItems,
        { icon: BookOpen, label: 'รายวิชาที่สอน', href: '/courses' },
        { icon: Users, label: 'นักศึกษา', href: '/students' },
        { icon: ClipboardList, label: 'งานและกิจกรรม', href: '/assignments' },
        { icon: GraduationCap, label: 'บันทึกเกรด', href: '/grades' },
        { icon: Calendar, label: 'นัดหมาย', href: '/appointments', badge: 5 },
        { icon: MessageSquare, label: 'ข้อความ', href: '/messages' },
        { icon: Settings, label: 'ตั้งค่า', href: '/settings' },
      ];
    case 'staff':
      return [
        ...commonItems,
        { icon: Users, label: 'จัดการผู้ใช้', href: '/users' },
        { icon: BookOpen, label: 'จัดการวิชา', href: '/courses' },
        { icon: Trophy, label: 'กิจกรรม', href: '/activities' },
        { icon: ClipboardList, label: 'คำร้อง', href: '/requests', badge: 24 },
        { icon: BarChart3, label: 'รายงาน', href: '/reports' },
        { icon: Bell, label: 'ระบบแจ้งเตือน', href: '/notifications' },
        { icon: Shield, label: 'สิทธิ์และ Audit', href: '/audit' },
        { icon: Settings, label: 'ตั้งค่าระบบ', href: '/settings' },
      ];
    case 'company':
      return [
        ...commonItems,
        { icon: Briefcase, label: 'ประกาศรับสมัคร', href: '/job-postings' },
        { icon: Users, label: 'ผู้สมัคร', href: '/applicants' },
        { icon: GraduationCap, label: 'ดูโปรไฟล์', href: '/student-profiles' },
        { icon: MessageSquare, label: 'ข้อความ', href: '/messages' },
        { icon: Settings, label: 'ตั้งค่า', href: '/settings' },
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
      case 'teacher': return 'from-role-teacher to-green-600';
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
          "fixed top-0 left-0 z-50 h-full w-64 bg-sidebar text-sidebar-foreground shadow-xl transition-transform duration-300 md:relative md:translate-x-0",
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
