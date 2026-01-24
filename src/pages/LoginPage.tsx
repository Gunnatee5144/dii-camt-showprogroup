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
    color: 'bg-blue-600',
    gradient: 'from-blue-600 via-blue-500 to-cyan-400',
    bgClass: 'bg-gradient-to-br from-blue-600 to-cyan-500',
  },
  lecturer: {
    title: 'อาจารย์',
    icon: Users,
    color: 'bg-emerald-600',
    gradient: 'from-emerald-600 via-emerald-500 to-teal-400',
    bgClass: 'bg-gradient-to-br from-emerald-600 to-teal-500',
  },
  staff: {
    title: 'เจ้าหน้าที่',
    icon: ShieldCheck,
    color: 'bg-purple-600',
    gradient: 'from-purple-600 via-purple-500 to-violet-400',
    bgClass: 'bg-gradient-to-br from-purple-600 to-violet-500',
  },
  company: {
    title: 'บริษัท',
    icon: Building2,
    color: 'bg-orange-500',
    gradient: 'from-orange-500 via-amber-500 to-yellow-400',
    bgClass: 'bg-gradient-to-br from-orange-500 to-yellow-500',
  },
  admin: {
    title: 'ผู้ดูแลระบบ',
    icon: ShieldCheck,
    color: 'bg-slate-800',
    gradient: 'from-slate-800 via-slate-700 to-zinc-600',
    bgClass: 'bg-gradient-to-br from-slate-800 to-zinc-700',
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
      // Login without specifying role - let backend/mock determine it
      const success = await login(email, password);

      if (success) {
        toast({
          title: 'เข้าสู่ระบบสำเร็จ',
          description: `ยินดีต้อนรับกลับเข้าสู่ระบบ`,
        });
        navigate('/dashboard');
      } else {
        throw new Error('User not found');
      }
    } catch (error) {
      toast({
        title: 'เกิดข้อผิดพลาด',
        description: 'ไม่สามารถเข้าสู่ระบบได้ กรุณาตรวจสอบอีเมลและรหัสผ่าน',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Default theme properties since we don't have selectedRole anymore
  const pageTheme = {
    title: 'DII CAMT',
    gradient: 'from-blue-600 via-indigo-600 to-purple-600',
    icon: GraduationCap
  };

  return (
    <div className="min-h-screen flex relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

      {/* Left Panel - Form */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-8 bg-background relative z-10">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Button variant="ghost" asChild className="mb-8 hover:bg-accent/10 transition-colors">
              <Link to="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                กลับหน้าหลัก
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="flex items-center justify-center gap-3 mb-8"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <motion.div
                className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-hero shadow-lg"
                whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-xl font-bold text-accent">DII</span>
              </motion.div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">เข้าสู่ระบบ</h1>
                <p className="text-sm text-muted-foreground">ระบบบริหารข้อมูลสาขา DII</p>
              </div>
            </motion.div>



            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  อีเมล
                </Label>
                <div className="relative mt-1 group">
                  <motion.div
                    className="absolute left-3 top-1/2 -translate-y-1/2"
                    whileHover={{ scale: 1.1 }}
                  >
                    <Mail className="h-5 w-5 text-muted-foreground group-focus-within:text-accent transition-colors" />
                  </motion.div>
                  <Input
                    id="email"
                    type="email"
                    placeholder="example@cmu.ac.th"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 focus:ring-2 focus:ring-accent/20 transition-all"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Label htmlFor="password" className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-muted-foreground" />
                  รหัสผ่าน
                </Label>
                <div className="relative mt-1 group">
                  <motion.div
                    className="absolute left-3 top-1/2 -translate-y-1/2"
                    whileHover={{ scale: 1.1 }}
                  >
                    <Lock className="h-5 w-5 text-muted-foreground group-focus-within:text-accent transition-colors" />
                  </motion.div>
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 focus:ring-2 focus:ring-accent/20 transition-all"
                  />
                  <motion.button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </motion.button>
                </div>
              </motion.div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded border-border" />
                  <span className="text-muted-foreground">จดจำการเข้าสู่ระบบ</span>
                </label>
                <Link to="/forgot-password" className="text-primary hover:underline">
                  ลืมรหัสผ่าน?
                </Link>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    className={`w-full bg-gradient-to-r ${pageTheme.gradient} text-white relative overflow-hidden group`}
                    size="lg"
                    disabled={isLoading}
                  >
                    {/* Shimmer Effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.6 }}
                    />
                    <span className="relative z-10">
                      {isLoading ? (
                        <span className="flex items-center gap-2">
                          <motion.div
                            className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          />
                          กำลังเข้าสู่ระบบ...
                        </span>
                      ) : (
                        'เข้าสู่ระบบ'
                      )}
                    </span>
                  </Button>
                </motion.div>
              </motion.div>
            </form>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              ยังไม่มีบัญชี?{' '}
              <Link to="/register" className="text-primary font-medium hover:underline">
                สมัครสมาชิก
              </Link>
            </p>

            {/* Demo Hint */}
            <motion.div
              className="mt-8 p-4 rounded-xl bg-muted/50 border border-border backdrop-blur-sm relative overflow-hidden group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Gradient Border Effect on Hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/10 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity" />
              <p className="text-sm text-muted-foreground text-center relative z-10">
                <strong className="text-foreground">Demo Mode:</strong> กรอกอีเมลและรหัสผ่านใดก็ได้เพื่อเข้าสู่ระบบ
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Right Panel - Hero */}
      <div className={`hidden lg:flex lg:flex-1 bg-gradient-to-br ${pageTheme.gradient} relative overflow-hidden`}>
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating Particles */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full"
              initial={{
                x: Math.random() * 100 + '%',
                y: Math.random() * 100 + '%'
              }}
              animate={{
                x: [
                  Math.random() * 100 + '%',
                  Math.random() * 100 + '%',
                  Math.random() * 100 + '%',
                ],
                y: [
                  Math.random() * 100 + '%',
                  Math.random() * 100 + '%',
                  Math.random() * 100 + '%',
                ],
              }}
              transition={{
                duration: 15 + i * 2,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          ))}

          {/* Gradient Orbs */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 flex flex-col justify-center px-12 max-w-lg mx-auto text-white">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.div
              className="w-24 h-24 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-8 shadow-2xl border border-white/30"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <pageTheme.icon className="h-12 w-12 text-white" />
            </motion.div>
            <h2 className="text-5xl font-bold text-white mb-4 drop-shadow-lg leading-tight">
              ระบบบริหาร<br />การศึกษา
            </h2>
            <p className="text-lg text-white/90 mb-8 leading-relaxed">
              เชื่อมโยงการเรียนรู้สู่โลกอุตสาหกรรมดิจิทัล<br />
              Digital Industry Integration (DII)
            </p>
            <div className="flex gap-4">
              <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
                <span className="font-bold text-2xl">4</span>
                <span className="text-sm ml-2 opacity-80">User Roles</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
                <span className="font-bold text-2xl">30+</span>
                <span className="text-sm ml-2 opacity-80">Features</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
