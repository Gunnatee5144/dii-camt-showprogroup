import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GraduationCap, Users, Building2, ShieldCheck, ArrowRight, ChevronRight, BookOpen, Trophy, Briefcase, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RoleCard } from '@/components/common/RoleCard';
import { UserRole } from '@/types';

const features = [
  {
    icon: BookOpen,
    title: 'จัดการหลักสูตร',
    description: 'ระบบบริหารรายวิชา ตารางเรียน และการลงทะเบียน',
  },
  {
    icon: Trophy,
    title: 'กิจกรรมและ Gamification',
    description: 'สะสมแต้ม เก็บชั่วโมง รับ Badge จากกิจกรรมต่างๆ',
  },
  {
    icon: Briefcase,
    title: 'ฝึกงานและ Portfolio',
    description: 'สร้าง CV อัตโนมัติ จับคู่กับบริษัท และสมัครฝึกงาน',
  },
  {
    icon: BarChart3,
    title: 'Dashboard & รายงาน',
    description: 'วิเคราะห์ข้อมูลและติดตามความก้าวหน้า',
  },
];

const roles = [
  {
    role: 'student' as UserRole,
    title: 'นักศึกษา',
    description: 'เข้าถึงตารางเรียน เกรด กิจกรรม และ Portfolio',
    icon: GraduationCap,
  },
  {
    role: 'teacher' as UserRole,
    title: 'อาจารย์',
    description: 'จัดการรายวิชา ให้เกรด และดูแลนักศึกษาในที่ปรึกษา',
    icon: Users,
  },
  {
    role: 'staff' as UserRole,
    title: 'เจ้าหน้าที่',
    description: 'บริหารระบบ จัดการผู้ใช้ และดูรายงานภาพรวม',
    icon: ShieldCheck,
  },
  {
    role: 'company' as UserRole,
    title: 'บริษัท',
    description: 'ดูโปรไฟล์นักศึกษา ลงประกาศรับสมัครงาน',
    icon: Building2,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function LandingPage() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

  const handleGetStarted = () => {
    navigate('/login', { state: { role: selectedRole } });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-hero">
              <span className="text-lg font-bold text-accent">DII</span>
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">DII CAMT</h1>
              <p className="text-xs text-muted-foreground hidden sm:block">มหาวิทยาลัยเชียงใหม่</p>
            </div>
          </Link>
          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild>
              <Link to="/login">เข้าสู่ระบบ</Link>
            </Button>
            <Button variant="hero" asChild className="hidden sm:flex">
              <Link to="/login">
                เริ่มต้นใช้งาน
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 bg-gradient-hero opacity-5" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-accent/5 to-transparent" />

        {/* Floating Orbs */}
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Floating Particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-accent/30 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * 600
            }}
            animate={{
              y: [null, -100, null],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent mb-6 border border-accent/20 shadow-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className="w-2 h-2 bg-accent rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-sm font-medium">ระบบบริหารข้อมูลสาขา Digital Industry Integration</span>
            </motion.div>
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              ศูนย์กลางการเรียนรู้และพัฒนา
              <motion.span
                className="text-accent block mt-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                สำหรับทุกคน
              </motion.span>
            </motion.h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              เชื่อมต่อนักศึกษา อาจารย์ เจ้าหน้าที่ และภาคอุตสาหกรรม
              บนแพลตฟอร์มเดียวที่ครบครัน ใช้งานง่าย และปลอดภัย
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="xl" onClick={() => navigate('/login')}>
                เริ่มต้นใช้งาน
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="xl">
                เรียนรู้เพิ่มเติม
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              ฟีเจอร์หลักของระบบ
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              ออกแบบมาเพื่อตอบโจทย์ทุกความต้องการของสาขา DII
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                  rotateX: 5,
                }}
                className="bg-card rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 border border-border relative overflow-hidden group"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Gradient Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <motion.div
                  className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center mb-4 relative z-10"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <feature.icon className="h-6 w-6 text-accent" />
                </motion.div>
                <h3 className="text-lg font-semibold text-foreground mb-2 relative z-10">{feature.title}</h3>
                <p className="text-sm text-muted-foreground relative z-10">{feature.description}</p>

                {/* Shine Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Role Selection Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              เลือกบทบาทของคุณ
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              ระบบรองรับผู้ใช้งาน 4 บทบาท พร้อมฟีเจอร์และสิทธิ์ที่แตกต่างกัน
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto mb-8"
          >
            {roles.map((role) => (
              <motion.div key={role.role} variants={itemVariants}>
                <RoleCard
                  role={role.role}
                  title={role.title}
                  description={role.description}
                  icon={role.icon}
                  onClick={() => setSelectedRole(role.role)}
                  isSelected={selectedRole === role.role}
                />
              </motion.div>
            ))}
          </motion.div>

          {selectedRole && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <Button variant="hero" size="lg" onClick={handleGetStarted}>
                เข้าสู่ระบบในฐานะ{roles.find(r => r.role === selectedRole)?.title}
                <ChevronRight className="ml-1 h-5 w-5" />
              </Button>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 bg-gradient-hero overflow-hidden">
        {/* Animated Background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-accent/20 via-primary/20 to-accent/20"
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* Floating Elements */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 border border-white/10 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4"
              whileInView={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              พร้อมเริ่มต้นใช้งานแล้วหรือยัง?
            </motion.h2>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              เข้าสู่ระบบเพื่อเริ่มใช้งานฟีเจอร์ทั้งหมดของระบบบริหารข้อมูลสาขา DII
            </p>
            <Button
              variant="hero"
              size="xl"
              onClick={() => navigate('/login')}
              className="bg-accent text-accent-foreground hover:bg-accent/90"
            >
              เริ่มต้นใช้งานเลย
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-hero">
                <span className="text-sm font-bold text-accent">DII</span>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">DII CAMT</p>
                <p className="text-xs text-muted-foreground">College of Arts, Media and Technology</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 สาขา Digital Industry Integration, มหาวิทยาลัยเชียงใหม่
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
