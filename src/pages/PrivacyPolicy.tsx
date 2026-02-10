import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, ArrowLeft, Lock, Eye, Database, UserCheck, Globe, Bell, FileText, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

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

const sections = [
  {
    icon: Database,
    title: 'ข้อมูลที่เราเก็บรวบรวม',
    color: 'from-blue-600 to-indigo-600',
    bg: 'bg-blue-50',
    iconColor: 'text-blue-600',
    items: [
      { subtitle: 'ข้อมูลส่วนบุคคล', desc: 'ชื่อ-นามสกุล, อีเมล, หมายเลขโทรศัพท์, รหัสนักศึกษา/พนักงาน และข้อมูลที่จำเป็นสำหรับการลงทะเบียนเข้าใช้งานระบบ' },
      { subtitle: 'ข้อมูลการศึกษา', desc: 'ผลการเรียน, ตารางเรียน, กิจกรรม, ข้อมูลฝึกงาน และข้อมูลทางวิชาการอื่นๆ ที่เกี่ยวข้อง' },
      { subtitle: 'ข้อมูลการใช้งาน', desc: 'Log การเข้าสู่ระบบ, ประวัติการใช้งานฟีเจอร์ต่างๆ, IP Address และข้อมูล Device เพื่อปรับปรุงคุณภาพบริการ' },
    ],
  },
  {
    icon: Eye,
    title: 'วัตถุประสงค์ในการใช้ข้อมูล',
    color: 'from-emerald-600 to-teal-600',
    bg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    items: [
      { subtitle: 'การให้บริการ', desc: 'ใช้ข้อมูลเพื่อให้บริการระบบบริหารการศึกษา รวมถึงการจัดตารางเรียน, ประมวลผลเกรด, และการติดต่อสื่อสาร' },
      { subtitle: 'การพัฒนาระบบ', desc: 'วิเคราะห์พฤติกรรมการใช้งานเพื่อปรับปรุง UX/UI และเพิ่มฟีเจอร์ที่ตอบโจทย์ผู้ใช้มากยิ่งขึ้น' },
      { subtitle: 'การเชื่อมต่อพันธมิตร', desc: 'แชร์ข้อมูลโปรไฟล์กับองค์กรพันธมิตรเฉพาะเมื่อได้รับความยินยอมจากผู้ใช้เท่านั้น' },
    ],
  },
  {
    icon: Lock,
    title: 'การรักษาความปลอดภัยข้อมูล',
    color: 'from-purple-600 to-pink-600',
    bg: 'bg-purple-50',
    iconColor: 'text-purple-600',
    items: [
      { subtitle: 'การเข้ารหัส', desc: 'ข้อมูลทั้งหมดถูกเข้ารหัสด้วย AES-256 ทั้งขณะจัดเก็บ (at rest) และขณะส่งผ่าน (in transit) ผ่าน TLS 1.3' },
      { subtitle: 'การควบคุมการเข้าถึง', desc: 'ใช้ระบบ Role-Based Access Control (RBAC) เพื่อให้แน่ใจว่าผู้ใช้เข้าถึงเฉพาะข้อมูลที่เกี่ยวข้องกับตนเท่านั้น' },
      { subtitle: 'การตรวจสอบ', desc: 'ระบบ Audit Log บันทึกทุกการเข้าถึงและการเปลี่ยนแปลงข้อมูล เพื่อความโปร่งใสและตรวจสอบย้อนกลับได้' },
    ],
  },
  {
    icon: UserCheck,
    title: 'สิทธิ์ของเจ้าของข้อมูล',
    color: 'from-orange-600 to-amber-600',
    bg: 'bg-orange-50',
    iconColor: 'text-orange-600',
    items: [
      { subtitle: 'สิทธิ์ในการเข้าถึง', desc: 'คุณสามารถขอดูข้อมูลส่วนบุคคลทั้งหมดที่เราจัดเก็บเกี่ยวกับคุณได้ตลอดเวลาผ่านหน้าตั้งค่าในระบบ' },
      { subtitle: 'สิทธิ์ในการแก้ไข', desc: 'คุณสามารถแก้ไข อัปเดต หรือเปลี่ยนแปลงข้อมูลส่วนบุคคลของคุณได้ทุกเมื่อ' },
      { subtitle: 'สิทธิ์ในการลบ', desc: 'คุณสามารถขอลบข้อมูลส่วนบุคคลได้ โดยเราจะดำเนินการภายใน 30 วันนับจากวันที่ได้รับคำขอ' },
      { subtitle: 'สิทธิ์ในการโอนย้าย', desc: 'คุณสามารถขอรับข้อมูลในรูปแบบที่อ่านได้ด้วยเครื่อง เพื่อนำไปใช้กับบริการอื่น' },
    ],
  },
  {
    icon: Globe,
    title: 'คุกกี้และเทคโนโลยีติดตาม',
    color: 'from-cyan-600 to-blue-600',
    bg: 'bg-cyan-50',
    iconColor: 'text-cyan-600',
    items: [
      { subtitle: 'คุกกี้ที่จำเป็น', desc: 'ใช้เพื่อให้ระบบทำงานได้อย่างถูกต้อง เช่น การรักษา session และการตั้งค่าภาษา ไม่สามารถปิดได้' },
      { subtitle: 'คุกกี้วิเคราะห์', desc: 'ช่วยให้เราเข้าใจวิธีการใช้งานเว็บไซต์ เพื่อปรับปรุงประสบการณ์ สามารถเลือกปิดได้ในหน้าตั้งค่า' },
    ],
  },
  {
    icon: Bell,
    title: 'การเปลี่ยนแปลงนโยบาย',
    color: 'from-rose-600 to-pink-600',
    bg: 'bg-rose-50',
    iconColor: 'text-rose-600',
    items: [
      { subtitle: 'การแจ้งเตือน', desc: 'เราจะแจ้งให้ทราบล่วงหน้าอย่างน้อย 30 วันก่อนการเปลี่ยนแปลงนโยบายความเป็นส่วนตัวที่สำคัญ ผ่านอีเมลและการแจ้งเตือนในระบบ' },
      { subtitle: 'การยินยอม', desc: 'การเปลี่ยนแปลงที่กระทบสิทธิ์ของผู้ใช้จะต้องได้รับความยินยอมใหม่ก่อนมีผลบังคับใช้' },
    ],
  },
];

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-blue-200">
              DII
            </div>
            <div>
              <div className="font-bold text-xl tracking-tight text-slate-900">DII CAMT</div>
              <div className="text-xs text-slate-500 font-medium tracking-wide">Digital Industry Integration</div>
            </div>
          </Link>
          <Link to="/">
            <Button variant="ghost" className="font-medium hover:text-blue-600 hover:bg-blue-50">
              <ArrowLeft className="w-4 h-4 mr-2" /> กลับหน้าหลัก
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-purple-600/15 rounded-full blur-[120px]" />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
          <FadeIn>
            <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 bg-purple-500/10 backdrop-blur-md rounded-full border border-purple-500/20">
              <Shield className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-medium text-purple-300">Privacy & Security</span>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="text-4xl lg:text-7xl font-bold text-white mb-6 tracking-tight leading-[1.1]">
              นโยบาย<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400">ความเป็นส่วนตัว</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-lg text-slate-400 mb-6 max-w-2xl mx-auto leading-relaxed font-light">
              เราให้ความสำคัญกับความเป็นส่วนตัวและความปลอดภัยของข้อมูลของคุณเป็นอันดับสูงสุด
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="flex items-center justify-center gap-6 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                <span>อัปเดตล่าสุด: 1 กุมภาพันธ์ 2026</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-slate-600" />
              <div className="flex items-center gap-2">
                <span>เวอร์ชัน 2.0</span>
              </div>
            </div>
          </FadeIn>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />
      </section>

      {/* Quick Summary */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <FadeIn>
            <div className="max-w-4xl mx-auto bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 lg:p-12 border border-purple-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">สรุปสาระสำคัญ</h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                DII CAMT เก็บรวบรวมข้อมูลเท่าที่จำเป็นสำหรับการให้บริการระบบบริหารการศึกษา ข้อมูลของคุณจะถูกเข้ารหัส 
                จัดเก็บอย่างปลอดภัย และจะไม่ถูกแบ่งปันกับบุคคลที่สามโดยไม่ได้รับความยินยอมจากคุณ คุณมีสิทธิ์เข้าถึง 
                แก้ไข และลบข้อมูลของคุณได้ตลอดเวลา
              </p>
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { icon: Lock, label: 'เข้ารหัส AES-256', color: 'text-purple-600 bg-purple-100' },
                  { icon: UserCheck, label: 'PDPA Compliant', color: 'text-pink-600 bg-pink-100' },
                  { icon: Shield, label: 'ISO 27001', color: 'text-indigo-600 bg-indigo-100' },
                ].map((badge, i) => (
                  <div key={i} className="flex items-center gap-3 bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${badge.color}`}>
                      <badge.icon className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-semibold text-slate-700">{badge.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-6 max-w-4xl space-y-8">
          {sections.map((section, sIdx) => (
            <FadeIn key={sIdx} delay={sIdx * 0.05}>
              <div className="group bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500 overflow-hidden">
                <div className="p-8 lg:p-10">
                  <div className="flex items-center gap-5 mb-8">
                    <div className={`w-14 h-14 ${section.bg} rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                      <section.icon className={`w-7 h-7 ${section.iconColor}`} />
                    </div>
                    <div>
                      <span className={`text-xs font-bold uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r ${section.color}`}>
                        Section {sIdx + 1}
                      </span>
                      <h3 className="text-xl font-bold text-slate-900">{section.title}</h3>
                    </div>
                  </div>
                  <div className="space-y-6 pl-0 lg:pl-[4.75rem]">
                    {section.items.map((item, iIdx) => (
                      <div key={iIdx} className="relative pl-6 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:rounded-full before:bg-gradient-to-br before:opacity-60" style={{ ['--tw-gradient-from' as string]: '', ['--tw-gradient-to' as string]: '' }}>
                        <div className={`absolute left-0 top-2 w-2 h-2 rounded-full bg-gradient-to-br ${section.color}`} />
                        <h4 className="text-base font-semibold text-slate-800 mb-1">{item.subtitle}</h4>
                        <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Contact for Privacy */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <FadeIn>
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-purple-950 rounded-[2.5rem] p-12 lg:p-16 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]" />
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[120px]" />
                <div className="relative z-10 space-y-6">
                  <Mail className="w-12 h-12 text-purple-400 mx-auto" />
                  <h2 className="text-3xl lg:text-4xl font-bold">มีคำถามเกี่ยวกับความเป็นส่วนตัว?</h2>
                  <p className="text-slate-300 text-lg max-w-xl mx-auto">
                    ทีม Data Protection Officer ของเราพร้อมตอบทุกคำถามเกี่ยวกับการจัดการข้อมูลส่วนบุคคล
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                    <a href="mailto:dpo@camt.cmu.ac.th">
                      <Button size="lg" className="h-14 px-8 bg-white text-purple-700 hover:bg-purple-50 rounded-full text-lg font-semibold shadow-lg">
                        <Mail className="w-5 h-5 mr-2" /> dpo@camt.cmu.ac.th
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-50 py-10 border-t border-slate-200">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400">
          <div>© 2026 DII CAMT. All rights reserved.</div>
          <div className="flex gap-6">
            <Link to="/privacy-policy" className="text-slate-600 font-medium">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-slate-600">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
