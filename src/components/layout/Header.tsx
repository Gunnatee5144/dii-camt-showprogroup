import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bell,
  Menu,
  X,
  Users,
  LogOut,
  Settings,
  ChevronDown,
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuPortal,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { mockNotifications } from '@/lib/mockData';

interface HeaderProps {
  onMenuToggle?: () => void;
  isSidebarOpen?: boolean;
}

export function Header({ onMenuToggle, isSidebarOpen }: HeaderProps) {
  const { user, logout, switchRole } = useAuth();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);

  const unreadCount = mockNotifications.filter(n => !n.isRead).length;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getRoleBadgeClass = (role: string) => {
    switch (role) {
      case 'student': return 'bg-role-student';
      case 'teacher': return 'bg-role-teacher';
      case 'staff': return 'bg-role-staff';
      case 'company': return 'bg-role-company';
      default: return 'bg-primary';
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'student': return 'นักศึกษา';
      case 'teacher': return 'อาจารย์';
      case 'staff': return 'เจ้าหน้าที่';
      case 'company': return 'บริษัท';
      default: return role;
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/50 bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60">
      <div className="flex h-20 items-center px-6 md:px-8 justify-between">
        <div className="flex items-center gap-4">
          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-slate-500 hover:text-slate-900"
            onClick={onMenuToggle}
          >
            {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>

          {/* Breadcrumbs or Page Title (Placeholder for now, or just Welcome text) */}
          <div className="hidden md:flex flex-col">
            <h1 className="text-xl font-bold text-slate-800 tracking-tight">Dashboard</h1>
            <p className="text-xs text-slate-500 font-medium">Overview & Statistics</p>
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-3">
          {/* Notifications */}
          <DropdownMenu open={showNotifications} onOpenChange={setShowNotifications}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative h-10 w-10 rounded-full hover:bg-slate-100 text-slate-500 data-[state=open]:bg-slate-100">
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-2 right-2 h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-white shadow-sm" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 p-0 rounded-2xl shadow-xl border-slate-200">
              <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/50 rounded-t-2xl">
                <h3 className="font-semibold text-slate-900">การแจ้งเตือน</h3>
              </div>
              <div className="max-h-[300px] overflow-y-auto p-2">
                {mockNotifications.map((notification) => (
                  <DropdownMenuItem key={notification.id} className="flex flex-col items-start p-3 cursor-pointer rounded-xl focus:bg-slate-50 mb-1">
                    <div className="flex items-center gap-2 w-full">
                      <span className={`w-2 h-2 rounded-full ${notification.isRead ? 'bg-slate-300' : 'bg-blue-500'}`} />
                      <span className={`font-medium text-sm ${notification.isRead ? 'text-slate-600' : 'text-slate-900'}`}>{notification.title}</span>
                      <span className="ml-auto text-[10px] text-slate-400">2m</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1 ml-4 line-clamp-2">{notification.message}</p>
                  </DropdownMenuItem>
                ))}
              </div>
              <div className="p-2 border-t border-slate-100">
                <Button variant="ghost" size="sm" className="w-full text-blue-600 font-medium hover:bg-blue-50 hover:text-blue-700 rounded-xl h-9">
                  ดูทั้งหมด
                </Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-3 pl-1 pr-2 h-12 rounded-full hover:bg-slate-100 border border-transparent hover:border-slate-200 transition-all">
                  <Avatar className="h-9 w-9 border-2 border-white shadow-sm">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white text-sm font-bold">
                      {user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden md:flex flex-col items-start">
                    <span className="text-sm font-bold text-slate-700 leading-none">{user.name}</span>
                    <span className="text-[11px] text-slate-400 font-medium capitalize mt-0.5">{user.role}</span>
                  </div>
                  <ChevronDown className="h-4 w-4 text-slate-400" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 p-2 rounded-2xl shadow-xl border-slate-200">
                <DropdownMenuLabel className="p-2">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-bold text-slate-900">{user.name}</p>
                    <p className="text-xs text-slate-500 font-medium">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="rounded-xl cursor-pointer py-2.5">
                  <User className="mr-2 h-4 w-4 text-slate-500" />
                  <span className="font-medium">โปรไฟล์ของฉัน</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="rounded-xl cursor-pointer py-2.5">
                  <Settings className="mr-2 h-4 w-4 text-slate-500" />
                  <span className="font-medium">ตั้งค่าระบบ</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger className="rounded-xl cursor-pointer py-2.5">
                    <Users className="mr-2 h-4 w-4 text-slate-500" />
                    <span className="font-medium">เปลี่ยนบทบาท (Demo)</span>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent className="p-1 rounded-xl shadow-xl border-slate-200">
                      {['Student', 'Lecturer', 'Staff', 'Company', 'Admin'].map(role => (
                        <DropdownMenuItem
                          key={role}
                          onClick={() => switchRole(role.toLowerCase())}
                          className="rounded-lg cursor-pointer font-medium"
                        >
                          {role}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="rounded-xl cursor-pointer py-2.5 text-red-600 focus:text-red-700 focus:bg-red-50"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span className="font-medium">ออกจากระบบ</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
}
