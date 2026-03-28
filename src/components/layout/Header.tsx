import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bell,
  Menu,
  X,
  Users,
  LogOut,
  Settings,
  ChevronDown,
  User,
  Globe,
  Search,
  Sparkles
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
import { useLanguage } from '@/contexts/LanguageContext';
import { mockNotifications } from '@/lib/mockData';
import type { UserRole } from '@/types';

interface HeaderProps {
  onMenuToggle?: () => void;
  isSidebarOpen?: boolean;
}

export function Header({ onMenuToggle, isSidebarOpen }: HeaderProps) {
  const { user, logout, switchRole } = useAuth();
  const { language, toggleLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [showNotifications, setShowNotifications] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const unreadCount = mockNotifications.filter(n => !n.isRead).length;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes('dashboard')) return t.header?.dashboard || 'Dashboard';
    if (path.includes('profile')) return t.header?.profile || 'Profile';
    if (path.includes('settings')) return t.header?.systemSettings || 'Settings';
    return t.header?.dashboard || 'Workspace';
  };

  return (
    <header className={`sticky top-0 z-40 w-full transition-all duration-500 ${
      scrolled 
        ? 'py-2 bg-white/70 backdrop-blur-2xl border-b border-white/20 shadow-[0_4px_30px_rgba(0,0,0,0.03)]' 
        : 'py-0 bg-transparent border-b border-transparent'
    }`}>
      <div className={`mx-auto px-4 md:px-8 transition-all duration-500 ${scrolled ? 'h-16' : 'h-24'} flex items-center justify-between gap-4`}>
        
        <div className="flex items-center gap-4 md:gap-6 shrink-0">
          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-slate-500 hover:text-slate-900 bg-white/50 border border-slate-200/50 backdrop-blur-md rounded-2xl"
            onClick={onMenuToggle}
          >
            {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>

          {/* Dynamic Breadcrumb / Title with macOS feel */}
          <div className="hidden md:flex items-center gap-3">
             <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100/50 flex items-center justify-center shadow-inner">
               <Sparkles className="w-4 h-4 text-blue-600" />
             </div>
             <div className="flex flex-col justify-center">
               <div className="flex items-center gap-2">
                 <h1 className="text-[15px] font-bold text-slate-800 tracking-tight leading-none min-w-max">{getPageTitle()}</h1>
                 <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-500 text-[10px] font-bold uppercase tracking-widest min-w-max">{user?.role || 'Guest'}</span>
               </div>
               <p className="text-[11px] text-slate-400 font-medium mt-1 leading-none">{t.header?.overview || 'System Overview'}</p>
             </div>
          </div>
        </div>

        {/* Global Search Bar (Mac Spotlight Style) */}
        <div className="hidden lg:flex flex-1 max-w-[400px] justify-center ml-auto mr-4 md:mr-8 transition-all">
          <div className={`w-full flex items-center gap-3 px-4 rounded-full border bg-white/40 backdrop-blur-xl transition-all duration-300 ${scrolled ? 'h-10 border-slate-200/60 shadow-sm' : 'h-12 border-slate-200/40 shadow-[inset_0_2px_10px_rgba(255,255,255,1),0_2px_15px_rgba(0,0,0,0.02)]'}`}>
             <Search className="w-4 h-4 text-slate-400 shrink-0" />
             <input 
               type="text" 
               placeholder="Search anywhere..." 
               className="bg-transparent border-none outline-none w-full text-sm text-slate-700 placeholder:text-slate-400 font-medium"
             />
             <div className="flex items-center gap-1 shrink-0">
               <kbd className="hidden sm:inline-flex items-center justify-center h-5 px-1.5 rounded border border-slate-200 bg-slate-100/50 text-[10px] font-sans font-medium text-slate-400">⌘</kbd>
               <kbd className="hidden sm:inline-flex items-center justify-center h-5 px-1.5 rounded border border-slate-200 bg-slate-100/50 text-[10px] font-sans font-medium text-slate-400">K</kbd>
             </div>
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2 md:gap-3 shrink-0">
          {/* Glassy Language Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleLanguage}
            className="h-10 px-4 rounded-2xl bg-white/30 hover:bg-white/60 border border-white/40 shadow-sm backdrop-blur-md text-slate-600 gap-2 font-bold transition-all"
          >
            <Globe className="h-4 w-4" />
            <span className="text-xs uppercase tracking-wider">{language === 'th' ? 'EN' : 'TH'}</span>
          </Button>

          {/* Premium Notifications */}
          <DropdownMenu open={showNotifications} onOpenChange={setShowNotifications}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative h-10 w-10 rounded-2xl bg-white/30 hover:bg-white/60 border border-white/40 shadow-sm backdrop-blur-md text-slate-600 transition-all data-[state=open]:bg-white/80">
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 border-2 border-white"></span>
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[340px] p-0 rounded-3xl shadow-2xl border-white/60 bg-white/80 backdrop-blur-2xl overflow-hidden mt-2">
              <div className="px-5 py-4 border-b border-slate-100/50 bg-gradient-to-b from-slate-50/50 to-transparent">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 tracking-tight">{t.header?.notifications || 'Notifications'}</h3>
                  <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-none font-bold">{unreadCount} New</Badge>
                </div>
              </div>
              <div className="max-h-[320px] overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-slate-200">
                {mockNotifications.map((notification) => (
                  <DropdownMenuItem key={notification.id} className="flex flex-col items-start p-3.5 cursor-pointer rounded-2xl focus:bg-slate-50/80 mb-1 transition-colors">
                    <div className="flex items-start gap-3 w-full">
                      <div className={`mt-1 shrink-0 w-2 h-2 rounded-full ${notification.isRead ? 'bg-slate-200' : 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]'}`} />
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className={`font-bold text-sm leading-none ${notification.isRead ? 'text-slate-600' : 'text-slate-900'}`}>{notification.title}</span>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">2m ago</span>
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 pr-4">{notification.message}</p>
                      </div>
                    </div>
                  </DropdownMenuItem>
                ))}
              </div>
              <div className="p-3 border-t border-slate-100/50 bg-slate-50/30">
                <Button variant="ghost" className="w-full text-blue-600 font-bold hover:bg-white hover:text-blue-700 rounded-xl h-10 shadow-sm border border-slate-200/50 transition-all">
                  {t.common?.viewAll || 'View All Activity'}
                </Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu Profile */}
          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="relative group cursor-pointer">
                  <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <Button variant="ghost" className="relative flex items-center gap-3 pl-1.5 pr-3 h-11 rounded-full bg-white/40 hover:bg-white/80 border border-white/60 shadow-sm backdrop-blur-md transition-all">
                    <Avatar className="h-8 w-8 border-2 border-white shadow-sm ring-1 ring-slate-100">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-xs font-bold">
                        {user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden md:flex flex-col items-start pr-1">
                      <span className="text-sm font-bold text-slate-800 leading-none">{user.name}</span>
                    </div>
                    <ChevronDown className="h-4 w-4 text-slate-400" />
                  </Button>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-72 p-2 rounded-3xl shadow-2xl border-white/60 bg-white/90 backdrop-blur-2xl mt-2">
                <div className="p-4 bg-gradient-to-br from-slate-50 to-slate-100/50 rounded-2xl mb-2 border border-slate-200/50">
                   <div className="flex items-center gap-3">
                     <Avatar className="h-12 w-12 border-2 border-white shadow-sm ring-1 ring-slate-200">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback className="bg-blue-600 text-white font-bold">{user.name.charAt(0)}</AvatarFallback>
                     </Avatar>
                     <div className="flex flex-col">
                        <span className="text-base font-bold text-slate-900 tracking-tight">{user.name}</span>
                        <span className="text-xs font-medium text-slate-500">{user.email}</span>
                     </div>
                   </div>
                </div>
                
                <DropdownMenuItem className="rounded-xl cursor-pointer py-3 focus:bg-slate-100/80 transition-colors" onClick={() => navigate('/personal-dashboard')}>
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mr-3">
                    <User className="h-4 w-4" />
                  </div>
                  <span className="font-bold text-slate-700">{t.header?.profile || 'My Profile'}</span>
                </DropdownMenuItem>
                
                <DropdownMenuItem className="rounded-xl cursor-pointer py-3 focus:bg-slate-100/80 transition-colors" onClick={() => navigate('/settings')}>
                  <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center mr-3">
                    <Settings className="h-4 w-4" />
                  </div>
                  <span className="font-bold text-slate-700">{t.header?.systemSettings || 'Preferences'}</span>
                </DropdownMenuItem>
                
                <DropdownMenuSeparator className="my-2 bg-slate-100" />
                
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger className="rounded-xl cursor-pointer py-3 focus:bg-slate-100/80 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mr-3">
                      <Users className="h-4 w-4" />
                    </div>
                    <span className="font-bold text-slate-700">{t.header?.switchRole || 'Switch Account'}</span>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent className="p-2 rounded-2xl shadow-xl border-white/60 bg-white/90 backdrop-blur-2xl">
                      {(
                        [
                          { label: 'Student Portal', value: 'student' },
                          { label: 'Lecturer Portal', value: 'lecturer' },
                          { label: 'Staff Portal', value: 'staff' },
                          { label: 'Company Portal', value: 'company' },
                          { label: 'Admin Root', value: 'admin' },
                        ] as const
                      ).map(({ label, value }) => (
                        <DropdownMenuItem
                          key={value}
                          onClick={() => switchRole(value)}
                          className="rounded-xl cursor-pointer py-2.5 font-bold text-slate-600 focus:bg-indigo-50 focus:text-indigo-700 transition-colors"
                        >
                          {label}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
                
                <DropdownMenuSeparator className="my-2 bg-slate-100" />
                
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="rounded-xl cursor-pointer py-3 text-red-600 focus:text-red-700 focus:bg-red-50 transition-colors mt-1"
                >
                  <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center mr-3">
                    <LogOut className="h-4 w-4" />
                  </div>
                  <span className="font-bold">{t.header?.logout || 'Log Out'}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
}
