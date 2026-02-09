import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, BookOpen, Users, Building2, Briefcase, GraduationCap, Trophy, Globe, CheckCircle2, Star, ChevronRight, Play, Mail, Phone, MapPin, Send, Sparkles, Shield, Zap, BarChart3, Handshake, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className={className}
  >
    {children}
  </motion.div>
);

export default function LandingPage() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <div className="min-h-screen bg-white overflow-hidden font-sans text-slate-900">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-blue-200">
              DII
            </div>
            <div>
              <div className="font-bold text-xl tracking-tight text-slate-900">DII CAMT</div>
              <div className="text-xs text-slate-500 font-medium tracking-wide">Digital Industry Integration</div>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#features" className="hover:text-blue-600 transition-colors">คุณสมบัติระบบ</a>
            <a href="#stats" className="hover:text-blue-600 transition-colors">สถิติ</a>
            <a href="#partners" className="hover:text-blue-600 transition-colors">พันธมิตร</a>
            <a href="#contact" className="hover:text-blue-600 transition-colors">ติดต่อเรา</a>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost" className="font-medium hover:text-blue-600 hover:bg-blue-50">เข้าสู่ระบบ</Button>
            </Link>
            <Link to="/register">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200 rounded-full px-6">
                สมัครสมาชิก
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section - Premium Dark Mode */}
      <section className="relative pt-32 pb-40 overflow-hidden bg-slate-950">
        {/* Abstract Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-1/2 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-blue-600/20 rounded-full blur-[120px]"
          />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[120px]"
          />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <FadeIn>
              <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 bg-slate-900/80 backdrop-blur-md rounded-full border border-slate-700/50 animate-fade-in hover:border-blue-500/50 transition-colors cursor-default group shadow-lg shadow-blue-900/10">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                <span className="text-sm font-medium text-slate-300 group-hover:text-blue-200 transition-colors font-sans tracking-wide">DII Ecosystem 2026</span>
              </div>
            </FadeIn>

            <FadeIn delay={0.1} className="relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] bg-blue-500/20 blur-[100px] rounded-full -z-10 pointer-events-none"></div>
              <h1 className="text-5xl lg:text-8xl font-bold tracking-tight text-white mb-8 leading-[1.1] text-balance font-sans drop-shadow-lg">
                ระบบบริหารการศึกษา<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 font-sans animate-gradient-x bg-[length:200%_auto]">
                  ที่เหนือกว่าทุกจินตนาการ
                </span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="text-lg lg:text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed text-balance font-light font-sans">
                เชื่อมต่อทุกความเป็นไปได้ในรั้วมหาวิทยาลัย ด้วยเทคโนโลยีที่ทันสมัยที่สุด ออกแบบเพื่อประสบการณ์การใช้งานระดับ world-class
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/register">
                  <Button size="lg" className="h-16 px-10 bg-blue-600 hover:bg-blue-500 text-white rounded-full text-lg font-semibold shadow-lg shadow-blue-900/20 hover:shadow-blue-600/30 hover:-translate-y-1 transition-all duration-300 font-sans">
                    เริ่มต้นใช้งานฟรี <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/features">
                  <Button size="lg" variant="outline" className="h-16 px-10 bg-transparent border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 rounded-full text-lg font-medium transition-all duration-300 font-sans">
                    <Play className="mr-2 w-5 h-5" /> ดูตัวอย่างระบบ
                  </Button>
                </Link>
              </div>
            </FadeIn>

            {/* Ultra-Premium Glass UI Mockup */}
            <FadeIn delay={0.5} className="mt-32 relative z-10 max-w-6xl mx-auto">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative rounded-2xl border border-slate-800 bg-slate-950/80 backdrop-blur-xl shadow-2xl overflow-hidden ring-1 ring-white/10">

                  {/* Window Controls */}
                  <div className="h-12 border-b border-slate-800 flex items-center px-6 gap-2 bg-slate-900/50">
                    <div className="w-3 h-3 rounded-full bg-slate-700" />
                    <div className="w-3 h-3 rounded-full bg-slate-700" />
                    <div className="w-3 h-3 rounded-full bg-slate-700" />
                    <div className="ml-4 h-6 px-3 rounded-full bg-slate-800 text-xs text-slate-500 flex items-center font-mono">dii-platform.cmu.ac.th</div>
                  </div>

                  {/* Dashboard Content */}
                  <div className="p-8 grid grid-cols-12 gap-8">
                    {/* Sidebar Mock */}
                    <div className="col-span-12 md:col-span-3 space-y-4">
                      {[1, 2, 3, 4, 5].map(i => (
                        <div key={i} className="h-10 w-full rounded-lg bg-slate-900/50 border border-slate-800/50 hover:bg-white/5 transition-colors flex items-center px-3 gap-3">
                          <div className={`w-5 h-5 rounded ${i === 1 ? 'bg-blue-500/20' : 'bg-slate-800'}`}></div>
                          <div className="h-2 w-20 bg-slate-800 rounded-full"></div>
                        </div>
                      ))}
                    </div>

                    {/* Main Content Mock */}
                    <div className="col-span-12 md:col-span-9 grid grid-cols-3 gap-6">
                      {/* Top Cards */}
                      {[1, 2, 3].map(i => (
                        <div key={i} className="h-32 rounded-xl bg-gradient-to-br from-slate-900 to-slate-900/50 border border-slate-800 p-5 relative overflow-hidden group/card hover:border-slate-700 transition-colors">
                          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover/card:opacity-20 transition-opacity">
                            <div className="w-16 h-16 rounded-full bg-blue-500 blur-2xl"></div>
                          </div>
                          <div className="h-8 w-8 rounded-lg bg-slate-800 mb-4"></div>
                          <div className="h-3 w-16 bg-slate-800 rounded-full mb-2"></div>
                          <div className="h-6 w-24 bg-slate-700/50 rounded-full"></div>
                        </div>
                      ))}

                      {/* Large Chart Area */}
                      <div className="col-span-3 h-64 rounded-xl bg-slate-900/50 border border-slate-800 p-6 flex items-end justify-between gap-4 relative overflow-hidden">
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:16px_16px]"></div>
                        {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95].map((h, i) => (
                          <motion.div
                            key={i}
                            initial={{ height: 0 }}
                            whileInView={{ height: `${h}%` }}
                            transition={{ duration: 1, delay: i * 0.1, ease: "backOut" }}
                            className="w-full bg-gradient-to-t from-blue-600/20 to-blue-500 rounded-t-sm relative group/bar"
                          >
                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover/bar:opacity-100 transition-opacity bg-slate-800 text-white text-xs py-1 px-2 rounded">
                              {h}%
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Bottom Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
      </section>

      {/* Features Grid - Bento Style */}
      <section id="features" className="py-32 bg-slate-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-24 max-w-3xl mx-auto">
            <FadeIn>
              <Badge variant="outline" className="mb-6 py-2 px-6 border-blue-200 bg-blue-50 text-blue-700 text-sm font-medium rounded-full">
                <Sparkles className="w-3.5 h-3.5 mr-1.5" /> Professional Features
              </Badge>
              <h2 className="text-4xl lg:text-6xl font-bold mb-6 text-slate-900 tracking-tight font-sans">
                ฟีเจอร์ที่ออกแบบมาเพื่อ<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">ความเป็นเลิศทางวิชาการ</span>
              </h2>
              <p className="text-slate-500 text-xl font-light leading-relaxed font-sans">
                ครบครันด้วยเครื่องมือที่ทันสมัย ตอบโจทย์ทุกบทบาทในสถาบันการศึกษา
              </p>
            </FadeIn>
          </div>

          {/* Highlight Features Row */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {[
              { icon: Zap, title: 'ประมวลผลรวดเร็ว', desc: 'ระบบตอบสนองภายใน 0.1 วินาที', color: 'from-amber-500 to-orange-600', bg: 'bg-amber-50', text: 'text-amber-700' },
              { icon: Shield, title: 'ปลอดภัยสูงสุด', desc: 'เข้ารหัสข้อมูลระดับ Enterprise', color: 'from-emerald-500 to-teal-600', bg: 'bg-emerald-50', text: 'text-emerald-700' },
              { icon: BarChart3, title: 'รายงานอัจฉริยะ', desc: 'วิเคราะห์ข้อมูลเชิงลึกแบบเรียลไทม์', color: 'from-blue-500 to-indigo-600', bg: 'bg-blue-50', text: 'text-blue-700' },
            ].map((feat, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="group relative overflow-hidden rounded-2xl bg-white border border-slate-200 p-8 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500 hover:-translate-y-1">
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feat.color} opacity-5 rounded-full blur-2xl translate-x-8 -translate-y-8 group-hover:opacity-10 transition-opacity`} />
                  <div className={`w-12 h-12 ${feat.bg} rounded-xl flex items-center justify-center ${feat.text} mb-5 group-hover:scale-110 transition-transform duration-300`}>
                    <feat.icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2 font-sans">{feat.title}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed font-sans">{feat.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Student Card - Large */}
            <FadeIn delay={0.1} className="md:col-span-2">
              <div className="group relative overflow-hidden rounded-[2rem] bg-white border border-slate-200 p-12 h-full shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 flex flex-col md:flex-row items-center gap-10">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="flex-1 space-y-6 relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-lg shadow-blue-500/25">
                    <GraduationCap className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 font-sans">สำหรับนักศึกษา</h3>
                  <p className="text-slate-500 text-lg leading-relaxed font-sans">
                    จัดการชีวิตการเรียนได้ง่ายเพียงปลายนิ้ว ตั้งแต่ลงทะเบียน ตรวจสอบเกรด จนถึงการสร้างพอร์ตโฟลิโอเพื่อเข้าสู่ตลาดงาน
                  </p>
                  <ul className="grid grid-cols-2 gap-3 pt-4">
                    {['Dashboard ส่วนตัว', 'แจ้งเตือนเรียลไทม์', 'Transcript ออนไลน์', 'ระบบแนะนำอาชีพ'].map((item, i) => (
                      <li key={i} className="flex items-center text-slate-600 text-sm font-medium">
                        <CheckCircle2 className="w-4 h-4 mr-2 text-blue-500 flex-shrink-0" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="w-full md:w-1/2 relative z-10">
                  {/* Abstract Visual */}
                  <div className="relative aspect-square bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl overflow-hidden border border-blue-100/50 group-hover:scale-[1.02] transition-transform duration-500">
                    <div className="absolute inset-2 bg-white rounded-xl shadow-sm p-4 space-y-3">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500" />
                        <div className="h-2 w-20 bg-slate-200 rounded-full" />
                      </div>
                      <div className="h-8 w-full bg-blue-50 rounded-lg flex items-center px-3">
                        <div className="h-2 w-2/3 bg-blue-200 rounded-full" />
                      </div>
                      <div className="h-8 w-full bg-slate-50 rounded-lg flex items-center px-3">
                        <div className="h-2 w-1/2 bg-slate-200 rounded-full" />
                      </div>
                      <div className="grid grid-cols-2 gap-2 mt-4">
                        <div className="h-16 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-100" />
                        <div className="h-16 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg border border-indigo-100" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Teacher Card */}
            <FadeIn delay={0.2} className="md:col-span-1">
              <div className="group relative overflow-hidden rounded-[2rem] bg-slate-900 text-white p-10 h-full shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
                <div className="relative z-10 h-full flex flex-col">
                  <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-emerald-500/25">
                    <BookOpen className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 font-sans">สำหรับอาจารย์</h3>
                  <p className="text-slate-400 mb-8 leading-relaxed font-sans flex-grow">
                    ลดภาระงานเอกสาร โฟกัสกับการสอนได้เต็มที่ ด้วยเครื่องมือตัดเกรดและเช็คชื่ออัตโนมัติ
                  </p>
                  <div className="space-y-3">
                    {['จัดการรายวิชา', 'ตัดเกรดออนไลน์', 'เช็คชื่ออัตโนมัติ'].map((item, i) => (
                      <div key={i} className="p-3.5 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer flex items-center justify-between group/item">
                        <span className="text-sm font-medium">{item}</span>
                        <ChevronRight className="w-4 h-4 text-slate-500 group-hover/item:text-emerald-400 group-hover/item:translate-x-1 transition-all" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Staff Card */}
            <FadeIn delay={0.3} className="md:col-span-1">
              <div className="group relative overflow-hidden rounded-[2rem] bg-white border border-slate-200 p-10 h-full shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500">
                <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/5 rounded-full blur-3xl" />
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl flex items-center justify-center mb-8 text-white group-hover:rotate-12 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-purple-500/25">
                  <Building2 className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4 font-sans">สำหรับเจ้าหน้าที่</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6 font-sans">
                  บริหารจัดการข้อมูลบุคลากรและงบประมาณได้อย่างแม่นยำ รวดเร็ว และตรวจสอบได้
                </p>
                <div className="space-y-2 mb-6">
                  {[{ label: 'ประสิทธิภาพ', w: 'w-[85%]', color: 'bg-purple-500' }, { label: 'ความพึงพอใจ', w: 'w-[92%]', color: 'bg-violet-500' }].map((bar, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-500 font-medium">{bar.label}</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: '100%' }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.5, delay: i * 0.2 }}
                          className={`h-full ${bar.w} ${bar.color} rounded-full`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className={`w-10 h-10 rounded-full border-2 border-white bg-gradient-to-br ${i % 2 === 0 ? 'from-purple-200 to-violet-200' : 'from-slate-200 to-slate-300'}`} />
                  ))}
                  <div className="w-10 h-10 rounded-full border-2 border-white bg-purple-50 flex items-center justify-center text-xs font-bold text-purple-500">+12</div>
                </div>
              </div>
            </FadeIn>

            {/* Company Card - Large */}
            <FadeIn delay={0.4} className="md:col-span-2">
              <div className="group relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 text-white p-12 h-full shadow-xl transition-all duration-500">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]" />
                <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                  <div className="flex-1">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-orange-500/30 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500">
                      <Briefcase className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 font-sans">สำหรับภาคอุตสาหกรรม</h3>
                    <p className="text-slate-300 text-lg leading-relaxed mb-8 font-sans">
                      เข้าถึงฐานข้อมูล Talent Pool คุณภาพ ค้นหานักศึกษาฝึกงานและพนักงานที่ตรงโจทย์ธุรกิจของคุณที่สุด
                    </p>
                    <Button variant="outline" className="border-orange-500/30 text-orange-300 hover:bg-orange-500 hover:text-white hover:border-orange-500 rounded-full px-8 transition-all duration-300">
                      ดูรายละเอียดความร่วมมือ <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                  <div className="w-full md:w-1/3">
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { value: '96%', label: 'ได้งาน' },
                        { value: '200+', label: 'พันธมิตร' },
                        { value: '4.9', label: 'คะแนน' },
                        { value: '500+', label: 'ฝึกงาน' },
                      ].map((stat, i) => (
                        <div key={i} className="bg-white/5 backdrop-blur-sm border border-white/10 p-4 rounded-xl text-center hover:bg-white/10 hover:border-orange-500/30 transition-all duration-300 group/stat">
                          <div className="text-2xl font-bold text-orange-400 mb-1 group-hover/stat:scale-110 transition-transform">{stat.value}</div>
                          <div className="text-xs text-slate-400">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Stats Section - Clean & Minimal */}
      <section id="stats" className="py-24 bg-white relative">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 divide-x divide-slate-100">
            {[
              { label: 'Active Users', value: '5K+', icon: Users, color: 'text-blue-600' },
              { label: 'Partners', value: '200+', icon: Globe, color: 'text-indigo-600' },
              { label: 'Employment Rate', value: '98%', icon: Trophy, color: 'text-purple-600' },
              { label: 'Satisfaction', value: '4.9', icon: Star, color: 'text-orange-500' },
            ].map((stat, i) => (
              <FadeIn key={i} delay={i * 0.1} className="text-center px-4 group cursor-default">
                <div className={`text-5xl lg:text-6xl font-bold tracking-tighter mb-2 ${stat.color} drop-shadow-sm font-sans`}>
                  {stat.value}
                </div>
                <div className="text-slate-500 font-medium tracking-wide uppercase text-sm font-sans group-hover:text-slate-900 transition-colors">
                  {stat.label}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section id="partners" className="py-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-50 rounded-full blur-[150px] opacity-50" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-indigo-50 rounded-full blur-[120px] opacity-50" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <FadeIn>
              <Badge variant="outline" className="mb-6 py-2 px-6 border-indigo-200 bg-indigo-50 text-indigo-700 text-sm font-medium rounded-full">
                <Handshake className="w-3.5 h-3.5 mr-1.5" /> Trusted Partners
              </Badge>
              <h2 className="text-4xl lg:text-6xl font-bold mb-6 text-slate-900 tracking-tight font-sans">
                พันธมิตรที่ร่วมสร้าง<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600">อนาคตการศึกษา</span>
              </h2>
              <p className="text-slate-500 text-xl font-light leading-relaxed font-sans">
                เชื่อมต่อกับองค์กรชั้นนำทั่วประเทศ เพื่อโอกาสที่ดีที่สุดสำหรับนักศึกษา
              </p>
            </FadeIn>
          </div>

          {/* Partner Logo Marquee */}
          <FadeIn delay={0.1}>
            <div className="relative mb-16">
              <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
              <div className="flex gap-8 overflow-hidden py-8">
                <motion.div
                  animate={{ x: ['0%', '-50%'] }}
                  transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                  className="flex gap-8 shrink-0"
                >
                  {[...Array(2)].map((_, setIdx) => (
                    <React.Fragment key={setIdx}>
                      {[
                        { name: 'Google', color: 'from-blue-500 to-green-500' },
                        { name: 'Microsoft', color: 'from-blue-600 to-cyan-500' },
                        { name: 'SCB', color: 'from-purple-600 to-purple-500' },
                        { name: 'PTT', color: 'from-blue-700 to-blue-500' },
                        { name: 'AIS', color: 'from-green-600 to-emerald-500' },
                        { name: 'True', color: 'from-red-600 to-orange-500' },
                        { name: 'KBANK', color: 'from-green-700 to-green-500' },
                        { name: 'CP', color: 'from-red-700 to-red-500' },
                        { name: 'Agoda', color: 'from-blue-500 to-indigo-500' },
                        { name: 'LINE', color: 'from-green-500 to-green-400' },
                      ].map((partner, i) => (
                        <div key={`${setIdx}-${i}`} className="group flex-shrink-0 w-48 h-24 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 flex items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:border-slate-200">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${partner.color} flex items-center justify-center text-white font-bold text-lg shadow-sm mr-3`}>
                            {partner.name[0]}
                          </div>
                          <span className="text-slate-700 font-semibold text-lg tracking-tight">{partner.name}</span>
                        </div>
                      ))}
                    </React.Fragment>
                  ))}
                </motion.div>
              </div>
            </div>
          </FadeIn>

          {/* Partner Stats & Benefits */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: Handshake,
                value: '200+',
                label: 'องค์กรพันธมิตร',
                desc: 'บริษัทชั้นนำทั้งในและต่างประเทศ',
                gradient: 'from-blue-600 to-indigo-600',
                bg: 'bg-blue-50',
              },
              {
                icon: Users,
                value: '5,000+',
                label: 'ตำแหน่งงานต่อปี',
                desc: 'โอกาสฝึกงานและงานประจำ',
                gradient: 'from-indigo-600 to-purple-600',
                bg: 'bg-indigo-50',
              },
              {
                icon: Trophy,
                value: '98%',
                label: 'อัตราการจ้างงาน',
                desc: 'ของนักศึกษาที่สำเร็จการศึกษา',
                gradient: 'from-purple-600 to-pink-600',
                bg: 'bg-purple-50',
              },
            ].map((stat, i) => (
              <FadeIn key={i} delay={i * 0.15}>
                <div className="group relative overflow-hidden rounded-3xl bg-white border border-slate-100 p-10 text-center shadow-sm hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 hover:-translate-y-2">
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`} />
                  <div className={`w-16 h-16 ${stat.bg} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className={`w-8 h-8 text-transparent bg-clip-text bg-gradient-to-br ${stat.gradient}`} style={{ color: `var(--tw-gradient-from)` }} />
                  </div>
                  <div className={`text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${stat.gradient} mb-2 font-sans`}>{stat.value}</div>
                  <div className="text-lg font-bold text-slate-900 mb-2 font-sans">{stat.label}</div>
                  <p className="text-slate-500 text-sm font-sans">{stat.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Testimonial / Partnership Highlight */}
          <FadeIn delay={0.3}>
            <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 p-12 lg:p-16 text-white">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]" />
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
              <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3" />
              
              <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
                <div className="flex-1 space-y-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map(i => (
                      <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <blockquote className="text-2xl lg:text-3xl font-light leading-relaxed text-slate-200 font-sans">
                    "ระบบ DII CAMT ช่วยให้เราเข้าถึง Talent Pool คุณภาพสูง ลดเวลาการสรรหาบุคลากรลง 60% และเพิ่มคุณภาพการจ้างงานอย่างเห็นได้ชัด"
                  </blockquote>
                  <div className="flex items-center gap-4 pt-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      K
                    </div>
                    <div>
                      <div className="font-semibold text-lg">คุณสมศักดิ์ พรมจันทร์</div>
                      <div className="text-slate-400 text-sm">HR Director, บริษัทชั้นนำด้านเทคโนโลยี</div>
                    </div>
                  </div>
                </div>
                <div className="w-full lg:w-1/3 grid grid-cols-2 gap-4">
                  {[
                    { icon: Clock, label: 'ลดเวลาสรรหา', value: '60%' },
                    { icon: Users, label: 'Talent Pool', value: '2K+' },
                    { icon: CheckCircle2, label: 'Match Rate', value: '95%' },
                    { icon: Star, label: 'ความพึงพอใจ', value: '4.9' },
                  ].map((item, i) => (
                    <div key={i} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 text-center hover:bg-white/10 transition-all duration-300">
                      <item.icon className="w-5 h-5 text-blue-400 mx-auto mb-2" />
                      <div className="text-xl font-bold text-white mb-0.5">{item.value}</div>
                      <div className="text-xs text-slate-400">{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 bg-slate-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <FadeIn>
              <Badge variant="outline" className="mb-6 py-2 px-6 border-emerald-200 bg-emerald-50 text-emerald-700 text-sm font-medium rounded-full">
                <Send className="w-3.5 h-3.5 mr-1.5" /> Get In Touch
              </Badge>
              <h2 className="text-4xl lg:text-6xl font-bold mb-6 text-slate-900 tracking-tight font-sans">
                พร้อมให้บริการ<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600">ทุกคำถามของคุณ</span>
              </h2>
              <p className="text-slate-500 text-xl font-light leading-relaxed font-sans">
                ติดต่อทีมงานของเราได้ทุกช่องทาง เรายินดีให้คำปรึกษาและสาธิตระบบ
              </p>
            </FadeIn>
          </div>

          <div className="grid lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
            {/* Contact Info Cards */}
            <div className="lg:col-span-2 space-y-6">
              {[
                {
                  icon: MapPin,
                  title: 'ที่ตั้ง',
                  info: 'วิทยาลัยศิลปะ สื่อ และเทคโนโลยี',
                  detail: 'มหาวิทยาลัยเชียงใหม่ 239 ถ.ห้วยแก้ว ต.สุเทพ อ.เมือง จ.เชียงใหม่ 50200',
                  gradient: 'from-blue-600 to-indigo-600',
                  bg: 'bg-blue-50',
                  iconColor: 'text-blue-600',
                },
                {
                  icon: Phone,
                  title: 'โทรศัพท์',
                  info: '053-942-110',
                  detail: 'จันทร์ - ศุกร์ 08:30 - 16:30 น.',
                  gradient: 'from-emerald-600 to-teal-600',
                  bg: 'bg-emerald-50',
                  iconColor: 'text-emerald-600',
                },
                {
                  icon: Mail,
                  title: 'อีเมล',
                  info: 'dii@camt.cmu.ac.th',
                  detail: 'ตอบกลับภายใน 24 ชั่วโมง',
                  gradient: 'from-purple-600 to-pink-600',
                  bg: 'bg-purple-50',
                  iconColor: 'text-purple-600',
                },
              ].map((contact, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="group relative overflow-hidden rounded-2xl bg-white border border-slate-100 p-6 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500 hover:-translate-y-1">
                    <div className={`absolute inset-0 bg-gradient-to-br ${contact.gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`} />
                    <div className="flex items-start gap-5">
                      <div className={`w-14 h-14 ${contact.bg} rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                        <contact.icon className={`w-6 h-6 ${contact.iconColor}`} />
                      </div>
                      <div>
                        <div className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">{contact.title}</div>
                        <div className="text-lg font-bold text-slate-900 mb-1 font-sans">{contact.info}</div>
                        <p className="text-sm text-slate-500 leading-relaxed">{contact.detail}</p>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>

            {/* Contact Form */}
            <FadeIn delay={0.2} className="lg:col-span-3">
              <div className="relative overflow-hidden rounded-[2rem] bg-white border border-slate-100 p-10 lg:p-12 shadow-xl shadow-slate-200/50">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 opacity-50" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-50 rounded-full blur-[60px] translate-y-1/2 -translate-x-1/2 opacity-50" />
                
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2 font-sans">ส่งข้อความถึงเรา</h3>
                  <p className="text-slate-500 mb-8 font-sans">กรอกข้อมูลด้านล่าง เราจะติดต่อกลับโดยเร็วที่สุด</p>
                  
                  <div className="space-y-5">
                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">ชื่อ-นามสกุล</label>
                        <input
                          type="text"
                          placeholder="กรอกชื่อ-นามสกุล"
                          className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all font-sans"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">อีเมล</label>
                        <input
                          type="email"
                          placeholder="example@email.com"
                          className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all font-sans"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">หัวข้อ</label>
                      <select className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all font-sans appearance-none">
                        <option value="">เลือกหัวข้อที่ต้องการ</option>
                        <option value="demo">ขอนัดสาธิตระบบ</option>
                        <option value="partnership">สนใจเป็นพันธมิตร</option>
                        <option value="support">ขอความช่วยเหลือ</option>
                        <option value="other">อื่นๆ</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">ข้อความ</label>
                      <textarea
                        rows={4}
                        placeholder="พิมพ์ข้อความของคุณที่นี่..."
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all resize-none font-sans"
                      />
                    </div>
                    <Button className="w-full h-14 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-lg font-semibold shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 font-sans">
                      <Send className="w-5 h-5 mr-2" /> ส่งข้อความ
                    </Button>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[3rem] p-12 lg:p-24 text-center relative overflow-hidden shadow-2xl shadow-blue-200">
            {/* Animated background elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 animate-pulse" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10 max-w-3xl mx-auto space-y-8">
              <h2 className="text-3xl lg:text-5xl font-bold text-white tracking-tight font-sans">พร้อมก้าวสู่โลกการศึกษายุคใหม่?</h2>
              <p className="text-blue-100 text-lg lg:text-xl font-light font-sans">
                เข้าร่วมกับเราวันนี้เพื่อสัมผัสประสบการณ์การบริหารจัดการการศึกษาที่ทันสมัย ครบวงจร และตอบโจทย์ทุกความต้องการ
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link to="/register">
                  <Button size="lg" className="h-14 px-8 bg-white text-blue-600 hover:bg-blue-50 border-0 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 font-sans">
                    สมัครสมาชิกเลย
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button size="lg" variant="outline" className="h-14 px-8 bg-white/10 border-2 border-white/30 text-white hover:bg-white hover:text-blue-600 rounded-full text-lg font-semibold backdrop-blur-sm transition-all font-sans">
                    ติดต่อสอบถาม
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-50 pt-20 pb-10 border-t border-slate-200">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">D</div>
                <span className="font-bold text-xl text-slate-900">DII CAMT</span>
              </div>
              <p className="text-slate-500 leading-relaxed">
                หลักสูตรบูรณาการอุตสาหกรรมดิจิทัล<br />
                วิทยาลัยศิลปะ สื่อ และเทคโนโลยี<br />
                มหาวิทยาลัยเชียงใหม่
              </p>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-6">เมนูหลัก</h4>
              <ul className="space-y-3 text-slate-500">
                <li><a href="#" className="hover:text-blue-600 transition-colors">หน้าหลัก</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">เกี่ยวกับเรา</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">หลักสูตร</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">ข่าวสาร</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-6">สำหรับผู้ใช้งาน</h4>
              <ul className="space-y-3 text-slate-500">
                <li><Link to="/login" className="hover:text-blue-600 transition-colors">เข้าสู่ระบบ</Link></li>
                <li><Link to="/register" className="hover:text-blue-600 transition-colors">สมัครสมาชิก</Link></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">คู่มือการใช้งาน</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">แจ้งปัญหา</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-6">ติดต่อเรา</h4>
              <ul className="space-y-3 text-slate-500">
                <li className="flex items-center gap-2"><Globe className="w-4 h-4" /> www.camt.cmu.ac.th</li>
                <li className="flex items-center gap-2"><Trophy className="w-4 h-4" /> 053-942110</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400">
            <div>© 2026 DII CAMT. All rights reserved.</div>
            <div className="flex gap-6">
              <Link to="/privacy-policy" className="hover:text-slate-600">Privacy Policy</Link>
              <Link to="/terms-of-service" className="hover:text-slate-600">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

