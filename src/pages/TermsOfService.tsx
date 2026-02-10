import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Scale, ArrowLeft, FileText, AlertCircle, ShieldCheck, Ban, RefreshCw, Gavel, BookOpen, Users, Mail, HelpCircle } from 'lucide-react';
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
    icon: FileText,
    title: 'การยอมรับเงื่อนไข',
    color: 'from-blue-600 to-indigo-600',
    bg: 'bg-blue-50',
    iconColor: 'text-blue-600',
    items: [
      { subtitle: 'การเข้าใช้งาน', desc: 'การลงทะเบียนและเข้าใช้งานระบบ DII CAMT ถือว่าคุณได้อ่านและยอมรับข้อกำหนดและเงื่อนไขทั้งหมดที่ระบุไว้ในเอกสารนี้' },
      { subtitle: 'อายุขั้นต่ำ', desc: 'ผู้ใช้งานต้องมีอายุไม่ต่ำกว่า 16 ปี หรือได้รับความยินยอมจากผู้ปกครองตามกฎหมาย PDPA' },
      { subtitle: 'การเปลี่ยนแปลง', desc: 'เราขอสงวนสิทธิ์ในการแก้ไขเงื่อนไขการให้บริการ โดยจะแจ้งให้ทราบล่วงหน้าผ่านอีเมลและระบบแจ้งเตือน' },
    ],
  },
  {
    icon: Users,
    title: 'บัญชีผู้ใช้งาน',
    color: 'from-emerald-600 to-teal-600',
    bg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    items: [
      { subtitle: 'การลงทะเบียน', desc: 'คุณต้องให้ข้อมูลที่ถูกต้อง ครบถ้วน และเป็นปัจจุบันในการลงทะเบียน หากพบว่าข้อมูลไม่ถูกต้อง อาจส่งผลให้บัญชีถูกระงับ' },
      { subtitle: 'ความรับผิดชอบ', desc: 'คุณเป็นผู้รับผิดชอบในการรักษาความลับของรหัสผ่าน และกิจกรรมทั้งหมดที่เกิดขึ้นภายใต้บัญชีของคุณ' },
      { subtitle: 'ประเภทบัญชี', desc: 'ระบบรองรับผู้ใช้ 5 ประเภท: นักศึกษา, อาจารย์, เจ้าหน้าที่, ผู้บริหาร และภาคอุตสาหกรรม แต่ละประเภทมีสิทธิ์และข้อจำกัดที่แตกต่างกัน' },
    ],
  },
  {
    icon: ShieldCheck,
    title: 'การใช้งานที่อนุญาต',
    color: 'from-violet-600 to-purple-600',
    bg: 'bg-violet-50',
    iconColor: 'text-violet-600',
    items: [
      { subtitle: 'วัตถุประสงค์ทางการศึกษา', desc: 'ระบบนี้ออกแบบมาเพื่อใช้ในวัตถุประสงค์ทางการศึกษาและการบริหารจัดการของหลักสูตร DII วิทยาลัยศิลปะ สื่อ และเทคโนโลยี' },
      { subtitle: 'การเข้าถึงข้อมูล', desc: 'คุณสามารถเข้าถึงเฉพาะข้อมูลที่เกี่ยวข้องกับบทบาทของคุณในระบบ ห้ามพยายามเข้าถึงข้อมูลของผู้อื่นโดยไม่ได้รับอนุญาต' },
      { subtitle: 'ทรัพย์สินทางปัญญา', desc: 'เนื้อหา, การออกแบบ, โค้ด และทรัพย์สินทางปัญญาทั้งหมดของระบบเป็นของ DII CAMT มหาวิทยาลัยเชียงใหม่' },
    ],
  },
  {
    icon: Ban,
    title: 'การใช้งานที่ห้าม',
    color: 'from-red-600 to-rose-600',
    bg: 'bg-red-50',
    iconColor: 'text-red-600',
    items: [
      { subtitle: 'การกระทำที่ผิดกฎหมาย', desc: 'ห้ามใช้ระบบเพื่อกิจกรรมที่ผิดกฎหมาย หลอกลวง หรือละเมิดสิทธิ์ของผู้อื่น' },
      { subtitle: 'การโจมตีระบบ', desc: 'ห้ามพยายาม hack, reverse engineer, หรือโจมตีระบบในทุกรูปแบบ รวมถึง DDoS, SQL Injection หรือ XSS' },
      { subtitle: 'การใช้งานเชิงพาณิชย์', desc: 'ห้ามนำข้อมูลจากระบบไปใช้เพื่อวัตถุประสงค์เชิงพาณิชย์โดยไม่ได้รับอนุญาตเป็นลายลักษณ์อักษร' },
      { subtitle: 'การแชร์บัญชี', desc: 'ห้ามแชร์บัญชีหรือรหัสผ่านกับบุคคลอื่น แต่ละบัญชีสามารถใช้ได้โดยเจ้าของบัญชีเท่านั้น' },
    ],
  },
  {
    icon: BookOpen,
    title: 'เนื้อหาและข้อมูล',
    color: 'from-amber-600 to-orange-600',
    bg: 'bg-amber-50',
    iconColor: 'text-amber-600',
    items: [
      { subtitle: 'เนื้อหาของผู้ใช้', desc: 'ข้อมูลที่คุณอัปโหลด เช่น รายงาน, พอร์ตโฟลิโอ หรือเอกสาร ยังคงเป็นทรัพย์สินของคุณ แต่คุณให้สิทธิ์แก่ระบบในการจัดเก็บและแสดงผลตามฟังก์ชันที่กำหนด' },
      { subtitle: 'ความถูกต้อง', desc: 'เราพยายามอย่างดีที่สุดเพื่อให้ข้อมูลในระบบ (เกรด, ตารางเรียน, สถิติ) มีความถูกต้อง แต่ข้อมูลอย่างเป็นทางการยังคงอ้างอิงจากระบบสารสนเทศของมหาวิทยาลัย' },
      { subtitle: 'การสำรองข้อมูล', desc: 'เราทำการสำรองข้อมูลอัตโนมัติทุกวัน แต่แนะนำให้ผู้ใช้สำรองข้อมูลสำคัญของตนเองไว้ด้วย' },
    ],
  },
  {
    icon: RefreshCw,
    title: 'การระงับและยกเลิกบริการ',
    color: 'from-cyan-600 to-teal-600',
    bg: 'bg-cyan-50',
    iconColor: 'text-cyan-600',
    items: [
      { subtitle: 'การระงับบัญชี', desc: 'เราอาจระงับบัญชีชั่วคราวหากตรวจพบกิจกรรมที่ผิดปกติ หรือการละเมิดข้อกำหนดการใช้งาน โดยจะแจ้งเหตุผลให้ทราบ' },
      { subtitle: 'การยกเลิกโดยผู้ใช้', desc: 'คุณสามารถยกเลิกบัญชีได้ตลอดเวลาผ่านหน้าตั้งค่า ข้อมูลจะถูกเก็บไว้ 90 วันก่อนลบถาวร' },
      { subtitle: 'การบำรุงรักษา', desc: 'เราอาจหยุดให้บริการชั่วคราวเพื่อการบำรุงรักษาหรืออัปเกรดระบบ โดยจะแจ้งล่วงหน้าเมื่อเป็นไปได้' },
    ],
  },
  {
    icon: Gavel,
    title: 'การจำกัดความรับผิดชอบ',
    color: 'from-slate-600 to-gray-600',
    bg: 'bg-slate-100',
    iconColor: 'text-slate-600',
    items: [
      { subtitle: 'การให้บริการ', desc: 'ระบบให้บริการ "ตามสภาพ" (as is) เราไม่รับประกันว่าบริการจะปราศจากข้อผิดพลาดหรือหยุดชะงัก 100%' },
      { subtitle: 'ความเสียหาย', desc: 'เราจะไม่รับผิดชอบต่อความเสียหายทางอ้อม, ความเสียหายจากการสูญเสียข้อมูล หรือการหยุดชะงักของธุรกิจที่เกิดจากการใช้งานระบบ' },
      { subtitle: 'กฎหมายที่ใช้บังคับ', desc: 'ข้อกำหนดนี้อยู่ภายใต้กฎหมายแห่งราชอาณาจักรไทย รวมถึง พ.ร.บ.คุ้มครองข้อมูลส่วนบุคคล (PDPA) และ พ.ร.บ.คอมพิวเตอร์' },
    ],
  },
];

export default function TermsOfService() {
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
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-600/15 rounded-full blur-[120px]" />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
          <FadeIn>
            <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 bg-blue-500/10 backdrop-blur-md rounded-full border border-blue-500/20">
              <Scale className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium text-blue-300">Legal Agreement</span>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="text-4xl lg:text-7xl font-bold text-white mb-6 tracking-tight leading-[1.1]">
              ข้อกำหนด<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400">การให้บริการ</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-lg text-slate-400 mb-6 max-w-2xl mx-auto leading-relaxed font-light">
              กรุณาอ่านข้อกำหนดการให้บริการอย่างละเอียดก่อนเริ่มใช้งานระบบ DII CAMT
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
            <div className="max-w-4xl mx-auto bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-8 lg:p-12 border border-blue-100">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">ข้อควรรู้ก่อนใช้งาน</h2>
                  <p className="text-slate-600 leading-relaxed">
                    การลงทะเบียนและใช้งานระบบ DII CAMT หมายความว่าคุณยอมรับข้อกำหนดเหล่านี้ หากไม่เห็นด้วยกับข้อกำหนดใดๆ 
                    กรุณาอย่าใช้บริการ ข้อกำหนดนี้ครอบคลุมสิทธิ์และหน้าที่ของผู้ใช้ทุกประเภท
                  </p>
                </div>
              </div>
              <div className="grid sm:grid-cols-4 gap-3">
                {[
                  { label: 'นักศึกษา', icon: '🎓' },
                  { label: 'อาจารย์', icon: '📚' },
                  { label: 'เจ้าหน้าที่', icon: '🏢' },
                  { label: 'ภาคอุตสาหกรรม', icon: '🏭' },
                ].map((role, i) => (
                  <div key={i} className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm text-center">
                    <div className="text-2xl mb-2">{role.icon}</div>
                    <span className="text-xs font-semibold text-slate-600">{role.label}</span>
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
                      <div key={iIdx} className="relative pl-6">
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

      {/* Questions CTA */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <FadeIn>
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950 rounded-[2.5rem] p-12 lg:p-16 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]" />
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[120px]" />
                <div className="relative z-10 space-y-6">
                  <HelpCircle className="w-12 h-12 text-blue-400 mx-auto" />
                  <h2 className="text-3xl lg:text-4xl font-bold">มีข้อสงสัยเกี่ยวกับเงื่อนไขการใช้งาน?</h2>
                  <p className="text-slate-300 text-lg max-w-xl mx-auto">
                    ทีมกฎหมายของเราพร้อมให้คำอธิบายเพิ่มเติมเกี่ยวกับข้อกำหนดการให้บริการ
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                    <a href="mailto:legal@camt.cmu.ac.th">
                      <Button size="lg" className="h-14 px-8 bg-white text-blue-700 hover:bg-blue-50 rounded-full text-lg font-semibold shadow-lg">
                        <Mail className="w-5 h-5 mr-2" /> legal@camt.cmu.ac.th
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
            <Link to="/privacy-policy" className="hover:text-slate-600">Privacy Policy</Link>
            <Link to="/terms-of-service" className="text-slate-600 font-medium">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
