import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, ArrowLeft, GraduationCap, Users, ShieldCheck, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types';
import { useToast } from '@/hooks/use-toast';

const roleInfo = {
  student: {
    title: 'นักศึกษา',
    icon: GraduationCap,
    color: 'bg-role-student',
    gradient: 'from-role-student to-blue-600',
  },
  teacher: {
    title: 'อาจารย์',
    icon: Users,
    color: 'bg-role-teacher',
    gradient: 'from-role-teacher to-green-600',
  },
  staff: {
    title: 'เจ้าหน้าที่',
    icon: ShieldCheck,
    color: 'bg-role-staff',
    gradient: 'from-role-staff to-purple-600',
  },
  company: {
    title: 'บริษัท',
    icon: Building2,
    color: 'bg-role-company',
    gradient: 'from-role-company to-yellow-600',
  },
};

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const { toast } = useToast();
  
  const initialRole = (location.state as { role?: UserRole })?.role || 'student';
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>(initialRole);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: 'กรุณากรอกข้อมูลให้ครบ',
        description: 'กรุณากรอกอีเมลและรหัสผ่าน',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    try {
      const success = await login(email, password, selectedRole);
      if (success) {
        toast({
          title: 'เข้าสู่ระบบสำเร็จ',
          description: `ยินดีต้อนรับ ${roleInfo[selectedRole].title}`,
        });
        navigate('/dashboard');
      }
    } catch (error) {
      toast({
        title: 'เกิดข้อผิดพลาด',
        description: 'ไม่สามารถเข้าสู่ระบบได้ กรุณาลองอีกครั้ง',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const RoleIcon = roleInfo[selectedRole].icon;

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Form */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-8 bg-background">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Button variant="ghost" asChild className="mb-8">
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              กลับหน้าหลัก
            </Link>
          </Button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-hero">
                <span className="text-xl font-bold text-accent">DII</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">เข้าสู่ระบบ</h1>
                <p className="text-sm text-muted-foreground">ระบบบริหารข้อมูลสาขา DII</p>
              </div>
            </div>

            {/* Role Selector */}
            <div className="mb-6">
              <Label className="text-sm font-medium mb-3 block">เลือกบทบาท</Label>
              <div className="grid grid-cols-4 gap-2">
                {(Object.keys(roleInfo) as UserRole[]).map((role) => {
                  const Icon = roleInfo[role].icon;
                  const isSelected = selectedRole === role;
                  return (
                    <button
                      key={role}
                      type="button"
                      onClick={() => setSelectedRole(role)}
                      className={`flex flex-col items-center gap-1 p-3 rounded-xl border-2 transition-all ${
                        isSelected
                          ? `border-current ${roleInfo[role].color} text-white`
                          : 'border-border bg-card hover:border-muted-foreground/30'
                      }`}
                    >
                      <Icon className={`h-5 w-5 ${isSelected ? 'text-white' : 'text-muted-foreground'}`} />
                      <span className={`text-xs font-medium ${isSelected ? 'text-white' : 'text-foreground'}`}>
                        {roleInfo[role].title}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email">อีเมล</Label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="example@cmu.ac.th"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password">รหัสผ่าน</Label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded border-border" />
                  <span className="text-muted-foreground">จดจำการเข้าสู่ระบบ</span>
                </label>
                <Link to="/forgot-password" className="text-primary hover:underline">
                  ลืมรหัสผ่าน?
                </Link>
              </div>

              <Button
                type="submit"
                className={`w-full bg-gradient-to-r ${roleInfo[selectedRole].gradient} text-white`}
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              ยังไม่มีบัญชี?{' '}
              <Link to="/register" className="text-primary font-medium hover:underline">
                สมัครสมาชิก
              </Link>
            </p>

            {/* Demo Hint */}
            <div className="mt-8 p-4 rounded-xl bg-muted/50 border border-border">
              <p className="text-sm text-muted-foreground text-center">
                <strong>Demo Mode:</strong> กรอกอีเมลและรหัสผ่านใดก็ได้เพื่อเข้าสู่ระบบ
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Panel - Hero */}
      <div className="hidden lg:flex lg:flex-1 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
        <div className="absolute bottom-0 right-0 w-3/4 h-3/4 bg-accent/10 rounded-tl-[200px]" />
        
        <div className="relative z-10 flex flex-col justify-center px-12 max-w-lg mx-auto">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${roleInfo[selectedRole].gradient} flex items-center justify-center mb-8 shadow-xl`}>
              <RoleIcon className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-primary-foreground mb-4">
              ยินดีต้อนรับ
              <br />
              {roleInfo[selectedRole].title}
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8">
              {selectedRole === 'student' && 'เข้าถึงตารางเรียน ผลการเรียน กิจกรรม และสร้าง Portfolio ของคุณ'}
              {selectedRole === 'teacher' && 'จัดการรายวิชา ให้เกรด และดูแลนักศึกษาในที่ปรึกษา'}
              {selectedRole === 'staff' && 'บริหารระบบ จัดการผู้ใช้งาน และดูรายงานภาพรวม'}
              {selectedRole === 'company' && 'ค้นหานักศึกษาที่ตรงใจ ลงประกาศรับสมัครงานและฝึกงาน'}
            </p>
            <div className="flex gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full ${i === (Object.keys(roleInfo).indexOf(selectedRole) + 1) ? 'bg-accent' : 'bg-primary-foreground/30'}`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
