import React, { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
    Search, BookOpen, CheckCircle2, Clock, AlertCircle,
    BookMarked, Star, ChevronRight, GraduationCap, Filter,
    X, ListChecks, TrendingUp,
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

// ─── Types ───────────────────────────────────────────────────────────────────
type ColKey = 'registeredGraded' | 'registeredNoGrade' | 'studiedGraded' | 'studiedNoGrade' | 'notStudied';
type RowKey = 'required' | 'ge' | 'free';

interface CurriculumCourse {
    id: string;
    code: string;
    nameTH: string;
    nameEN: string;
    credits: number;
    year: number;
    semester: number;
    category: RowKey;
    status: ColKey;
    grade?: string;
    prerequisites: string[];
    description: string;
}

// ─── Mock Curriculum ─────────────────────────────────────────────────────────
const CURRICULUM: CurriculumCourse[] = [
    // ── วิชาบังคับ 72 cr ──
    { id: 'c01', code: 'DII101', nameTH: 'คณิตศาสตร์สำหรับอุตสาหกรรมดิจิทัล',      nameEN: 'Mathematics for Digital Industry',      credits: 3, year: 1, semester: 1, category: 'required', status: 'registeredGraded',  grade: 'A',  prerequisites: [],              description: 'ฟังก์ชัน แคลคูลัส ความน่าจะเป็น และสถิติพื้นฐาน' },
    { id: 'c02', code: 'DII102', nameTH: 'การเขียนโปรแกรมขั้นพื้นฐาน',             nameEN: 'Fundamentals of Programming',           credits: 3, year: 1, semester: 1, category: 'required', status: 'registeredGraded',  grade: 'B+', prerequisites: [],              description: 'ตรรกะการคิด อัลกอริทึม ภาษา Python พื้นฐาน' },
    { id: 'c03', code: 'DII103', nameTH: 'ระบบสารสนเทศและดิจิทัล',                 nameEN: 'Information Systems & Digital',         credits: 3, year: 1, semester: 1, category: 'required', status: 'registeredGraded',  grade: 'A',  prerequisites: [],              description: 'องค์ประกอบระบบสารสนเทศ ดิจิทัลทรานส์ฟอร์เมชัน' },
    { id: 'c04', code: 'DII104', nameTH: 'โครงสร้างข้อมูลและอัลกอริทึม',           nameEN: 'Data Structures & Algorithms',          credits: 3, year: 1, semester: 2, category: 'required', status: 'registeredGraded',  grade: 'A-', prerequisites: ['DII102'],       description: 'อาร์เรย์ ลิงก์ลิสต์ ต้นไม้ กราฟ การเรียงลำดับ' },
    { id: 'c05', code: 'DII105', nameTH: 'ฐานข้อมูลสำหรับอุตสาหกรรม',             nameEN: 'Industrial Database Systems',            credits: 3, year: 1, semester: 2, category: 'required', status: 'registeredGraded',  grade: 'B+', prerequisites: ['DII101'],       description: 'ออกแบบ ER Diagram, SQL, ฐานข้อมูลเชิงสัมพันธ์' },
    { id: 'c06', code: 'DII106', nameTH: 'เครือข่ายคอมพิวเตอร์พื้นฐาน',           nameEN: 'Computer Networks Fundamentals',         credits: 3, year: 1, semester: 2, category: 'required', status: 'registeredGraded',  grade: 'B',  prerequisites: [],              description: 'TCP/IP, OSI model, Subnetting, เครือข่ายไร้สาย' },
    { id: 'c07', code: 'DII201', nameTH: 'การออกแบบประสบการณ์ผู้ใช้',             nameEN: 'User Experience Design',                credits: 3, year: 2, semester: 1, category: 'required', status: 'registeredGraded',  grade: 'A',  prerequisites: ['DII103'],       description: 'UX Research, Wireframing, Prototyping, Usability Testing' },
    { id: 'c08', code: 'DII202', nameTH: 'การพัฒนาเว็บแอปพลิเคชัน',               nameEN: 'Web Application Development',           credits: 3, year: 2, semester: 1, category: 'required', status: 'registeredGraded',  grade: 'A-', prerequisites: ['DII102','DII105'], description: 'HTML/CSS/JS, React, Node.js, REST API, Full-Stack' },
    { id: 'c09', code: 'DII203', nameTH: 'Machine Learning พื้นฐาน',               nameEN: 'Introduction to Machine Learning',       credits: 3, year: 2, semester: 1, category: 'required', status: 'registeredGraded',  grade: 'B+', prerequisites: ['DII101','DII104'], description: 'Supervised/Unsupervised Learning, Neural Networks, Model Evaluation' },
    { id: 'c10', code: 'DII204', nameTH: 'ความปลอดภัยในไซเบอร์',                  nameEN: 'Cybersecurity Fundamentals',             credits: 3, year: 2, semester: 2, category: 'required', status: 'registeredGraded',  grade: 'A',  prerequisites: ['DII106'],       description: 'Cryptography, Authentication, Threat Analysis, Penetration Testing' },
    { id: 'c11', code: 'DII205', nameTH: 'การวิเคราะห์ข้อมูลธุรกิจ',              nameEN: 'Business Data Analytics',               credits: 3, year: 2, semester: 2, category: 'required', status: 'registeredNoGrade', prerequisites: ['DII105','DII203'], description: 'BI Tools, Tableau, Power BI, Data Storytelling, Dashboard Design' },
    { id: 'c12', code: 'DII206', nameTH: 'วิศวกรรมซอฟต์แวร์',                    nameEN: 'Software Engineering',                  credits: 3, year: 2, semester: 2, category: 'required', status: 'registeredNoGrade', prerequisites: ['DII202'],       description: 'Agile, Scrum, Requirements Engineering, Testing, DevOps, CICD' },
    { id: 'c13', code: 'DII301', nameTH: 'การพัฒนาแอปพลิเคชันมือถือ',             nameEN: 'Mobile Application Development',         credits: 3, year: 3, semester: 1, category: 'required', status: 'studiedNoGrade',    prerequisites: ['DII202'],       description: 'React Native, Flutter, Cross-Platform Development, App Store Deployment' },
    { id: 'c14', code: 'DII302', nameTH: 'Cloud Computing และ DevOps',             nameEN: 'Cloud Computing & DevOps',               credits: 3, year: 3, semester: 1, category: 'required', status: 'notStudied',        prerequisites: ['DII206'],       description: 'AWS, Azure, GCP, Docker, Kubernetes, CI/CD Pipeline' },
    { id: 'c15', code: 'DII303', nameTH: 'Internet of Things',                     nameEN: 'Internet of Things',                    credits: 3, year: 3, semester: 1, category: 'required', status: 'notStudied',        prerequisites: ['DII106'],       description: 'Embedded Systems, Sensors, MQTT Protocol, Edge Computing' },
    { id: 'c16', code: 'DII304', nameTH: 'Blockchain Technology',                  nameEN: 'Blockchain Technology',                 credits: 3, year: 3, semester: 2, category: 'required', status: 'notStudied',        prerequisites: ['DII204'],       description: 'Distributed Ledger, Smart Contracts, DeFi, Ethereum' },
    { id: 'c17', code: 'DII305', nameTH: 'พัฒนาการประดิษฐ์ชั้นสูง',               nameEN: 'Advanced Artificial Intelligence',       credits: 3, year: 3, semester: 2, category: 'required', status: 'notStudied',        prerequisites: ['DII203'],       description: 'Deep Learning, Transformer, NLP, Computer Vision, Generative AI' },
    { id: 'c18', code: 'DII306', nameTH: 'การจัดการนวัตกรรมดิจิทัล',              nameEN: 'Digital Innovation Management',          credits: 3, year: 3, semester: 2, category: 'required', status: 'notStudied',        prerequisites: ['DII103'],       description: 'Design Thinking, Lean Startup, OKR, Innovation Framework' },
    { id: 'c19', code: 'DII401', nameTH: 'โครงงานดิจิทัลอุตสาหกรรม 1',            nameEN: 'Digital Industry Project I',             credits: 3, year: 4, semester: 1, category: 'required', status: 'notStudied',        prerequisites: ['DII301','DII302'], description: 'กำหนดหัวข้อ วิเคราะห์ ออกแบบ พัฒนา Prototype โครงงาน' },
    { id: 'c20', code: 'DII402', nameTH: 'โครงงานดิจิทัลอุตสาหกรรม 2',            nameEN: 'Digital Industry Project II',            credits: 3, year: 4, semester: 1, category: 'required', status: 'notStudied',        prerequisites: ['DII401'],       description: 'พัฒนา ทดสอบ และนำเสนอโครงงานต่อคณะกรรมการ' },
    { id: 'c21', code: 'DII403', nameTH: 'สหกิจศึกษา / ฝึกงาน',                   nameEN: 'Cooperative Education / Internship',     credits: 6, year: 4, semester: 2, category: 'required', status: 'notStudied',        prerequisites: ['DII401'],       description: 'ฝึกปฏิบัติงานในองค์กรอุตสาหกรรมอย่างน้อย 1 ภาคเรียน' },
    { id: 'c22', code: 'DII404', nameTH: 'กฎหมายดิจิทัลและจริยธรรม',              nameEN: 'Digital Law & Ethics',                  credits: 3, year: 4, semester: 1, category: 'required', status: 'notStudied',        prerequisites: [],              description: 'PDPA พ.ร.บ.คอมพิวเตอร์ Intellectual Property จริยธรรม AI' },
    { id: 'c23', code: 'DII405', nameTH: 'การเป็นผู้ประกอบการดิจิทัล',             nameEN: 'Digital Entrepreneurship',               credits: 3, year: 4, semester: 2, category: 'required', status: 'notStudied',        prerequisites: ['DII306'],       description: 'Business Model Canvas, Pitch Deck, Startup Ecosystem, Funding' },
    { id: 'c24', code: 'DII406', nameTH: 'สัมมนาอุตสาหกรรมดิจิทัล',               nameEN: 'Digital Industry Seminar',               credits: 3, year: 4, semester: 2, category: 'required', status: 'notStudied',        prerequisites: ['DII403'],       description: 'บรรยายพิเศษ Case Study จากผู้เกี่ยวข้องอุตสาหกรรม' },
    // ── GE คณะ 9 cr ──
    { id: 'g01', code: 'GE601', nameTH: 'ภาษาอังกฤษสำหรับนักวิทยาการ',            nameEN: 'English for Data Scientists',            credits: 3, year: 1, semester: 1, category: 'ge',       status: 'registeredGraded',  grade: 'B+', prerequisites: [],              description: 'Reading, Writing, Speaking เชิงวิทยาศาสตร์และเทคโนโลยี' },
    { id: 'g02', code: 'GE602', nameTH: 'ทักษะชีวิตและความเป็นผู้นำ',             nameEN: 'Life Skills & Leadership',               credits: 3, year: 2, semester: 1, category: 'ge',       status: 'registeredNoGrade', prerequisites: [],              description: 'Growth Mindset, EQ, Teamwork, Leadership, Communication Skills' },
    { id: 'g03', code: 'GE603', nameTH: 'สุขภาพและสุขภาวะดิจิทัล',                nameEN: 'Health & Digital Wellness',              credits: 3, year: 3, semester: 1, category: 'ge',       status: 'notStudied',        prerequisites: [],              description: 'Screen Time, Well-being, Mental Health, Work-Life Balance' },
    // ── ตัวฟรี 6 cr ──
    { id: 'f01', code: 'FREE01', nameTH: 'วิชาเลือกเสรี 1 (ยังไม่ได้เลือก)',       nameEN: 'Free Elective I (Not Selected)',         credits: 3, year: 3, semester: 2, category: 'free',     status: 'registeredNoGrade', prerequisites: [],              description: 'เลือกได้จากทุกคณะ ตามความสนใจของนักศึกษา' },
    { id: 'f02', code: 'FREE02', nameTH: 'วิชาเลือกเสรี 2 (ยังไม่ได้เลือก)',       nameEN: 'Free Elective II (Not Selected)',        credits: 3, year: 4, semester: 1, category: 'free',     status: 'notStudied',        prerequisites: [],              description: 'เลือกได้จากทุกคณะ ตามความสนใจของนักศึกษา' },
];

const GPAX_VALUE = 3.42;

// ─── Column / Row Definitions ─────────────────────────────────────────────────
const COLS: { key: ColKey; labelTH: string; labelEN: string; color: string; badgeColor: string; icon: React.ReactNode }[] = [
    { key: 'registeredGraded',  labelTH: 'ลงทะเบียน\n/ ออกเกรด',            labelEN: 'Registered\n& Graded',         color: 'bg-emerald-50', badgeColor: 'bg-emerald-100 text-emerald-700 border-emerald-200', icon: <CheckCircle2 className="w-3 h-3 text-emerald-500" /> },
    { key: 'registeredNoGrade', labelTH: 'ลงทะเบียน\n/ ยังไม่มีเกรด',        labelEN: 'Registered\nNo Grade',          color: 'bg-sky-50',     badgeColor: 'bg-sky-100 text-sky-700 border-sky-200',             icon: <Clock        className="w-3 h-3 text-sky-500" />     },
    { key: 'studiedGraded',     labelTH: 'เรียนแต่ยังไม่ลง\n/ ออกเกรด',      labelEN: 'Studied\n(Not Reg.) Graded',    color: 'bg-amber-50',   badgeColor: 'bg-amber-100 text-amber-700 border-amber-200',       icon: <Star         className="w-3 h-3 text-amber-500" />   },
    { key: 'studiedNoGrade',    labelTH: 'เรียนแต่ยังไม่ลง\n/ ยังไม่ออกเกรด', labelEN: 'Studied\n(Not Reg.) No Grade',  color: 'bg-orange-50',  badgeColor: 'bg-orange-100 text-orange-700 border-orange-200',    icon: <AlertCircle  className="w-3 h-3 text-orange-500" />  },
    { key: 'notStudied',        labelTH: 'ยังไม่ได้เรียนเลย',                 labelEN: 'Not Studied Yet',               color: 'bg-slate-50',   badgeColor: 'bg-slate-100 text-slate-600 border-slate-200',       icon: <BookOpen     className="w-3 h-3 text-slate-400" />   },
];

const ROWS: { key: RowKey; labelTH: string; labelEN: string; total: number }[] = [
    { key: 'required', labelTH: 'วิชาบังคับ',    labelEN: 'Required',      total: 72 },
    { key: 'ge',       labelTH: 'GE คณะ',        labelEN: 'Faculty GE',    total: 9  },
    { key: 'free',     labelTH: 'ตัวฟรี',         labelEN: 'Free Elective', total: 6  },
];

// ─── Grade color helper ───────────────────────────────────────────────────────
function gradeColor(grade?: string) {
    if (!grade) return 'bg-slate-100 text-slate-500';
    if (['A', 'A+'].includes(grade)) return 'bg-emerald-100 text-emerald-700';
    if (['A-', 'B+'].includes(grade)) return 'bg-teal-100 text-teal-700';
    if (['B', 'B-'].includes(grade)) return 'bg-sky-100 text-sky-700';
    if (['C+', 'C'].includes(grade)) return 'bg-amber-100 text-amber-700';
    return 'bg-red-100 text-red-700';
}

// ─── Status left-border colors for sheet cards ────────────────────────────────
const STATUS_BORDER: Record<ColKey, string> = {
    registeredGraded:  'border-l-emerald-400',
    registeredNoGrade: 'border-l-sky-400',
    studiedGraded:     'border-l-amber-400',
    studiedNoGrade:    'border-l-orange-400',
    notStudied:        'border-l-slate-300',
};

// ─── Main Component ───────────────────────────────────────────────────────────
export function CreditMatrixCard() {
    const { language } = useLanguage();
    const isTH = language !== 'en';

    const [sheetOpen, setSheetOpen] = useState(false);
    const [sheetMode, setSheetMode] = useState<'cell' | 'row' | 'all'>('all');
    const [selectedCell, setSelectedCell] = useState<{ row: RowKey; col: ColKey } | null>(null);
    const [selectedRow, setSelectedRow] = useState<RowKey | null>(null);
    const [search, setSearch] = useState('');
    const [yearFilter, setYearFilter] = useState<number | 'all'>('all');
    const [listTab, setListTab] = useState<'all' | 'planned' | 'registered' | 'remaining'>('all');
    const [planned, setPlanned] = useState<Set<string>>(() => new Set());

    const matrix = useMemo(() => {
        const counts = {} as Record<RowKey, Record<ColKey, number>>;
        ROWS.forEach(r => { counts[r.key] = { registeredGraded: 0, registeredNoGrade: 0, studiedGraded: 0, studiedNoGrade: 0, notStudied: 0 }; });
        CURRICULUM.forEach(c => { counts[c.category][c.status] += c.credits; });
        return counts;
    }, []);

    const sheetCourses = useMemo(() => {
        let base = [...CURRICULUM];
        if (sheetMode === 'cell' && selectedCell) base = base.filter(c => c.category === selectedCell.row && c.status === selectedCell.col);
        else if (sheetMode === 'row' && selectedRow) base = base.filter(c => c.category === selectedRow);
        if (yearFilter !== 'all') base = base.filter(c => c.year === yearFilter);
        if (search.trim()) {
            const q = search.toLowerCase();
            base = base.filter(c => c.code.toLowerCase().includes(q) || c.nameTH.includes(q) || c.nameEN.toLowerCase().includes(q));
        }
        if (listTab === 'planned') base = base.filter(c => planned.has(c.id));
        else if (listTab === 'registered') base = base.filter(c => c.status === 'registeredGraded' || c.status === 'registeredNoGrade');
        else if (listTab === 'remaining') base = base.filter(c => c.status !== 'registeredGraded' && c.status !== 'registeredNoGrade');
        return base;
    }, [sheetMode, selectedCell, selectedRow, yearFilter, search, listTab, planned]);

    const totalEarned      = CURRICULUM.filter(c => c.status === 'registeredGraded').reduce((s, c) => s + c.credits, 0);
    const totalRegistering = CURRICULUM.filter(c => c.status === 'registeredNoGrade').reduce((s, c) => s + c.credits, 0);
    const totalRequired    = ROWS.reduce((s, r) => s + r.total, 0);
    const totalRemaining   = totalRequired - totalEarned - totalRegistering;
    const overallPct       = Math.round((totalEarned / totalRequired) * 100);
    const sheetCredits     = sheetCourses.reduce((s, c) => s + c.credits, 0);

    const coursesByYear = useMemo(() => {
        const map: Record<number, CurriculumCourse[]> = {};
        sheetCourses.forEach(c => { (map[c.year] ??= []).push(c); });
        return Object.entries(map).sort(([a], [b]) => Number(a) - Number(b)) as [string, CurriculumCourse[]][];
    }, [sheetCourses]);

    const sheetTitle = useMemo(() => {
        if (sheetMode === 'all') return isTH ? 'หลักสูตรทั้งหมด' : 'Full Curriculum';
        if (sheetMode === 'row' && selectedRow) { const r = ROWS.find(r => r.key === selectedRow)!; return isTH ? r.labelTH : r.labelEN; }
        if (sheetMode === 'cell' && selectedCell) {
            const r = ROWS.find(r => r.key === selectedCell.row)!;
            const c = COLS.find(c => c.key === selectedCell.col)!;
            return `${isTH ? r.labelTH : r.labelEN} · ${(isTH ? c.labelTH : c.labelEN).replace('\n', ' ')}`;
        }
        return '';
    }, [sheetMode, selectedCell, selectedRow, isTH]);

    const openCell = useCallback((row: RowKey, col: ColKey) => { setSelectedCell({ row, col }); setSheetMode('cell'); setSearch(''); setYearFilter('all'); setListTab('all'); setSheetOpen(true); }, []);
    const openRow  = useCallback((row: RowKey) => { setSelectedRow(row); setSheetMode('row'); setSearch(''); setYearFilter('all'); setListTab('all'); setSheetOpen(true); }, []);
    const openAll  = useCallback(() => { setSheetMode('all'); setSearch(''); setYearFilter('all'); setListTab('all'); setSheetOpen(true); }, []);
    const togglePlanned = useCallback((id: string) => {
        setPlanned(prev => {
            const n = new Set(prev);
            if (n.has(id)) n.delete(id);
            else n.add(id);
            return n;
        });
    }, []);

    return (
        <>
            {/* ═══ MAIN CARD ══════════════════════════════════════════════════ */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}
                className="bg-white/80 backdrop-blur-xl border border-white/60 rounded-3xl p-6 shadow-sm"
            >
                {/* ── Header ── */}
                <div className="flex items-start justify-between mb-5 gap-3">
                    <div className="flex items-center gap-3">
                        <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-400/30">
                            <TrendingUp className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="text-base font-bold text-slate-800">{isTH ? 'ตารางหน่วยกิต' : 'Credit Matrix'}</h3>
                            <p className="text-xs text-slate-400 mt-0.5">{isTH ? 'ความก้าวหน้าตามหมวดหมู่วิชา' : 'Progress by course category'}</p>
                        </div>
                    </div>
                    <Button size="sm" variant="outline" onClick={openAll}
                        className="shrink-0 rounded-xl text-xs gap-1.5 border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-400 h-8"
                    >
                        <ListChecks className="w-3.5 h-3.5" />
                        {isTH ? 'ดูรายวิชา' : 'View Courses'}
                    </Button>
                </div>

                {/* ── Overall progress bar ── */}
                <div className="mb-5">
                    <div className="flex justify-between items-baseline mb-2">
                        <span className="text-xs font-medium text-slate-600">{isTH ? 'ความก้าวหน้าโดยรวม' : 'Overall Progress'}</span>
                        <span className="text-xs font-bold text-blue-600">{totalEarned} / {totalRequired} {isTH ? 'หน่วยกิต' : 'credits'} · {overallPct}%</span>
                    </div>
                    <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"
                            initial={{ width: 0 }}
                            animate={{ width: `${overallPct}%` }}
                            transition={{ duration: 1.4, ease: 'easeOut', delay: 0.2 }}
                        />
                    </div>
                </div>

                {/* ── Stats pills ── */}
                <div className="grid grid-cols-4 gap-2 mb-6">
                    {[
                        { label: isTH ? 'สำเร็จแล้ว' : 'Earned',    val: String(totalEarned),      sub: isTH ? 'หน่วยกิต' : 'credits', color: 'text-emerald-600', bg: 'bg-emerald-50',  border: 'border-emerald-100', icon: <CheckCircle2 className="w-4 h-4 text-emerald-500" /> },
                        { label: isTH ? 'กำลังเรียน' : 'Ongoing',   val: String(totalRegistering), sub: isTH ? 'หน่วยกิต' : 'credits', color: 'text-sky-600',     bg: 'bg-sky-50',      border: 'border-sky-100',     icon: <Clock        className="w-4 h-4 text-sky-500" />     },
                        { label: isTH ? 'คงเหลือ' : 'Remaining',    val: String(totalRemaining),   sub: isTH ? 'หน่วยกิต' : 'credits', color: 'text-slate-500',   bg: 'bg-slate-50',    border: 'border-slate-100',   icon: <BookOpen     className="w-4 h-4 text-slate-400" />   },
                        { label: 'GPAX',                              val: GPAX_VALUE.toFixed(2),    sub: '/ 4.00',                       color: 'text-indigo-600',  bg: 'bg-indigo-50',   border: 'border-indigo-100',  icon: <Star         className="w-4 h-4 text-indigo-400" />   },
                    ].map((s, i) => (
                        <div key={i} className={`${s.bg} border ${s.border} rounded-2xl p-3 flex flex-col items-center text-center gap-1`}>
                            {s.icon}
                            <span className={`text-lg font-black leading-none ${s.color}`}>{s.val}</span>
                            <span className="text-[9px] text-slate-400 leading-tight">{s.sub}</span>
                            <span className="text-[9px] font-medium text-slate-500">{s.label}</span>
                        </div>
                    ))}
                </div>

                {/* ── Visual Matrix ── */}
                <div className="space-y-1.5">
                    {/* Column header row */}
                    <div className="grid gap-1.5" style={{ gridTemplateColumns: '110px repeat(5, 1fr)' }}>
                        <div />
                        {COLS.map(col => (
                            <div key={col.key} className={`${col.color} rounded-xl px-1.5 py-2 flex flex-col items-center gap-1 border border-slate-100`}>
                                {col.icon}
                                <span className="text-[9px] font-semibold text-slate-600 text-center leading-tight">
                                    {(isTH ? col.labelTH : col.labelEN).split('\n').map((ln, i) => <span key={i} className="block">{ln}</span>)}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Data rows */}
                    {ROWS.map((row, ri) => {
                        const earned = matrix[row.key]['registeredGraded'];
                        const rowPct = Math.round((earned / row.total) * 100);
                        return (
                            <motion.div key={row.key}
                                initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: ri * 0.07 + 0.3 }}
                                className="grid gap-1.5" style={{ gridTemplateColumns: '110px repeat(5, 1fr)' }}
                            >
                                {/* Row label */}
                                <div onClick={() => openRow(row.key)}
                                    className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-2.5 cursor-pointer hover:from-blue-100 hover:to-indigo-100 transition-colors group"
                                >
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-xs font-bold text-blue-900 leading-tight">{isTH ? row.labelTH : row.labelEN}</span>
                                        <ChevronRight className="w-3 h-3 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                                    </div>
                                    <div className="text-[10px] text-blue-500 mb-1.5">{row.total} {isTH ? 'หน่วยกิต' : 'cr.'}</div>
                                    <div className="h-1 bg-blue-100 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full"
                                            initial={{ width: 0 }} animate={{ width: `${rowPct}%` }}
                                            transition={{ duration: 1, ease: 'easeOut', delay: ri * 0.1 + 0.5 }}
                                        />
                                    </div>
                                    <div className="text-[9px] text-blue-400 mt-0.5 text-right">{rowPct}%</div>
                                </div>

                                {/* Data cells */}
                                {COLS.map(col => {
                                    const val = matrix[row.key][col.key];
                                    const count = CURRICULUM.filter(c => c.category === row.key && c.status === col.key).length;
                                    const active = val > 0;
                                    return (
                                        <div key={col.key}
                                            onClick={() => active && openCell(row.key, col.key)}
                                            className={`${col.color} border border-slate-100 rounded-xl flex flex-col items-center justify-center py-3 px-1 text-center transition-all
                                                ${active ? 'cursor-pointer hover:shadow-md hover:scale-[1.03] hover:border-slate-200 active:scale-100' : 'opacity-30'}`}
                                        >
                                            {active ? (
                                                <>
                                                    <span className="text-base font-black text-slate-700 leading-none">{val}</span>
                                                    <span className="text-[9px] text-slate-400 mt-0.5 leading-none">{count} {isTH ? 'วิชา' : 'crs'}</span>
                                                </>
                                            ) : (
                                                <span className="text-slate-300 text-sm font-light">—</span>
                                            )}
                                        </div>
                                    );
                                })}
                            </motion.div>
                        );
                    })}

                    {/* GPAX row */}
                    <div className="grid gap-1.5" style={{ gridTemplateColumns: '110px repeat(5, 1fr)' }}>
                        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100 rounded-xl flex flex-col items-center justify-center py-2.5 px-2">
                            <GraduationCap className="w-4 h-4 text-indigo-400 mb-0.5" />
                            <span className="text-[11px] font-bold text-indigo-700">GPAX</span>
                        </div>
                        <div className="col-span-5 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 rounded-xl flex items-center justify-center gap-2 py-2.5">
                            <span className="text-2xl font-black text-indigo-600">{GPAX_VALUE.toFixed(2)}</span>
                            <span className="text-slate-400 text-sm">/ 4.00</span>
                            <div className="ml-2 bg-indigo-100 text-indigo-600 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                                {GPAX_VALUE >= 3.5 ? '🏆 เกียรตินิยม' : GPAX_VALUE >= 3.0 ? '⭐ ดีมาก' : '✅ ปกติ'}
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Legend ── */}
                <div className="mt-5 pt-4 border-t border-slate-100">
                    <div className="flex flex-wrap gap-2">
                        {COLS.map(col => (
                            <span key={col.key} className={`flex items-center gap-1.5 ${col.color} border border-slate-100 rounded-full px-2.5 py-1 text-[10px] font-medium text-slate-600`}>
                                {col.icon}
                                {(isTH ? col.labelTH : col.labelEN).replace('\n', ' ')}
                            </span>
                        ))}
                    </div>
                    <p className="mt-2 text-[10px] text-slate-400">
                        💡 {isTH ? 'กดที่เซลล์หรือชื่อหมวดเพื่อดูรายวิชาพร้อมติ้กวางแผน' : 'Click any cell or category to view & plan courses'}
                    </p>
                </div>
            </motion.div>

            {/* ═══ DETAIL SHEET ═══════════════════════════════════════════════ */}
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                <SheetContent side="right" className="w-full sm:max-w-lg p-0 flex flex-col bg-slate-50">
                    {/* Sheet header */}
                    <SheetHeader className="px-5 pt-5 pb-4 bg-white border-b border-slate-100 shrink-0">
                        <SheetTitle className="text-base font-bold text-slate-800 flex items-center gap-2">
                            <BookMarked className="w-4 h-4 text-blue-500" />
                            {sheetTitle}
                        </SheetTitle>
                        <div className="flex items-center gap-2 mt-2 flex-wrap">
                            <span className="bg-blue-500 text-white px-2.5 py-0.5 rounded-full text-xs font-semibold shadow-sm">
                                {sheetCourses.length} {isTH ? 'วิชา' : 'courses'}
                            </span>
                            <span className="bg-indigo-100 text-indigo-700 px-2.5 py-0.5 rounded-full text-xs font-semibold">
                                {sheetCredits} {isTH ? 'หน่วยกิต' : 'cr.'}
                            </span>
                            {planned.size > 0 && (
                                <span className="bg-emerald-100 text-emerald-700 px-2.5 py-0.5 rounded-full text-xs font-semibold">
                                    🔖 {isTH ? `วางแผน ${planned.size} วิชา` : `${planned.size} planned`}
                                </span>
                            )}
                        </div>
                    </SheetHeader>

                    {/* Filters */}
                    <div className="px-5 py-3 bg-white border-b border-slate-100 shrink-0 space-y-2.5">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                            <Input value={search} onChange={e => setSearch(e.target.value)}
                                placeholder={isTH ? 'ค้นหารหัส / ชื่อวิชา...' : 'Search code / name...'}
                                className="pl-8 h-9 text-xs rounded-xl border-slate-200 bg-slate-50 focus:bg-white"
                            />
                            {search && (
                                <button onClick={() => setSearch('')} className="absolute right-2.5 top-1/2 -translate-y-1/2">
                                    <X className="w-3.5 h-3.5 text-slate-400 hover:text-slate-700" />
                                </button>
                            )}
                        </div>

                        <div className="flex gap-1.5 flex-wrap">
                            {(['all', 1, 2, 3, 4] as const).map(y => (
                                <button key={y} onClick={() => setYearFilter(y)}
                                    className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-all ${yearFilter === y ? 'bg-blue-600 text-white shadow-sm shadow-blue-200' : 'bg-slate-100 text-slate-500 hover:bg-blue-50 hover:text-blue-600'}`}
                                >
                                    {y === 'all' ? (isTH ? 'ทุกปี' : 'All') : (isTH ? `ชั้นปีที่ ${y}` : `Year ${y}`)}
                                </button>
                            ))}
                        </div>

                        <Tabs value={listTab} onValueChange={v => setListTab(v as typeof listTab)}>
                            <TabsList className="h-8 w-full rounded-xl bg-slate-100 p-0.5">
                                <TabsTrigger value="all"        className="flex-1 rounded-lg text-[10px] font-semibold h-7 data-[state=active]:bg-white data-[state=active]:shadow-sm">{isTH ? 'ทั้งหมด' : 'All'}</TabsTrigger>
                                <TabsTrigger value="registered" className="flex-1 rounded-lg text-[10px] font-semibold h-7 data-[state=active]:bg-white data-[state=active]:shadow-sm">✅ {isTH ? 'ลงแล้ว' : 'Done'}</TabsTrigger>
                                <TabsTrigger value="remaining"  className="flex-1 rounded-lg text-[10px] font-semibold h-7 data-[state=active]:bg-white data-[state=active]:shadow-sm">📚 {isTH ? 'เหลือ' : 'Left'}</TabsTrigger>
                                <TabsTrigger value="planned"    className="flex-1 rounded-lg text-[10px] font-semibold h-7 data-[state=active]:bg-white data-[state=active]:shadow-sm">🔖 {planned.size > 0 ? planned.size : (isTH ? 'แผน' : 'Plan')}</TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </div>

                    {/* Course list — grouped by year */}
                    <ScrollArea className="flex-1">
                        {sheetCourses.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-16 text-slate-400 gap-3">
                                <BookOpen className="w-10 h-10 opacity-40" />
                                <p className="text-sm">{isTH ? 'ไม่พบรายวิชา' : 'No courses found'}</p>
                            </div>
                        ) : (
                            <div className="px-4 py-4 space-y-5 pb-8">
                                {coursesByYear.map(([year, courses]) => {
                                    const yearEarned = courses.filter(c => c.status === 'registeredGraded').reduce((s, c) => s + c.credits, 0);
                                    const yearTotal  = courses.reduce((s, c) => s + c.credits, 0);
                                    return (
                                        <div key={year}>
                                            <div className="flex items-center justify-between mb-2.5">
                                                <div className="flex items-center gap-2">
                                                    <span className="bg-blue-600 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
                                                        {isTH ? `ชั้นปีที่ ${year}` : `Year ${year}`}
                                                    </span>
                                                    <span className="text-[11px] text-slate-400">{yearEarned}/{yearTotal} {isTH ? 'หน่วยกิต' : 'cr.'}</span>
                                                </div>
                                                <span className="text-[11px] font-semibold text-slate-500">{courses.length} {isTH ? 'วิชา' : 'courses'}</span>
                                            </div>

                                            <div className="space-y-2">
                                                {courses.map((course, ci) => {
                                                    const col = COLS.find(c => c.key === course.status)!;
                                                    const row = ROWS.find(r => r.key === course.category)!;
                                                    const isPlanned    = planned.has(course.id);
                                                    const isRegistered = course.status === 'registeredGraded' || course.status === 'registeredNoGrade';
                                                    const isGraded     = course.status === 'registeredGraded';
                                                    return (
                                                        <motion.div key={course.id}
                                                            initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                                                            transition={{ delay: ci * 0.04 }}
                                                            className={`bg-white rounded-2xl border-l-4 shadow-sm ${STATUS_BORDER[course.status]} ${isPlanned && !isRegistered ? 'ring-1 ring-emerald-200' : ''}`}
                                                        >
                                                            <div className="flex items-start gap-3 p-3.5">
                                                                <div className="mt-0.5 shrink-0">
                                                                    <Checkbox
                                                                        id={`chk-${course.id}`}
                                                                        checked={isRegistered || isPlanned}
                                                                        disabled={isRegistered}
                                                                        onCheckedChange={() => !isRegistered && togglePlanned(course.id)}
                                                                        className="rounded-md w-4 h-4"
                                                                    />
                                                                </div>
                                                                <div className="flex-1 min-w-0">
                                                                    <div className="flex items-start justify-between gap-2 mb-1">
                                                                        <div className="flex items-center gap-1.5 flex-wrap">
                                                                            <span className={`font-mono font-black text-xs px-1.5 py-0.5 rounded-lg ${isGraded ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
                                                                                {course.code}
                                                                            </span>
                                                                            {course.grade && (
                                                                                <span className={`text-[11px] font-black px-1.5 py-0.5 rounded-lg ${gradeColor(course.grade)}`}>
                                                                                    {course.grade}
                                                                                </span>
                                                                            )}
                                                                            {isPlanned && !isRegistered && (
                                                                                <span className="text-[10px] bg-emerald-100 text-emerald-600 px-1.5 py-0.5 rounded-lg font-semibold">🔖</span>
                                                                            )}
                                                                        </div>
                                                                        <span className="shrink-0 text-[10px] font-bold text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded-lg">
                                                                            {course.credits} {isTH ? 'หน่วยกิต' : 'cr.'}
                                                                        </span>
                                                                    </div>
                                                                    <p className="text-sm font-semibold text-slate-800 leading-snug">{isTH ? course.nameTH : course.nameEN}</p>
                                                                    <p className="text-[11px] text-slate-400 leading-snug mt-0.5">{isTH ? course.nameEN : course.nameTH}</p>
                                                                    <p className="text-[11px] text-slate-400 mt-1.5 leading-relaxed line-clamp-2 italic">{course.description}</p>
                                                                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2.5">
                                                                        <Badge variant="outline" className={`text-[10px] h-5 px-2 border font-medium ${col.badgeColor}`}>
                                                                            <span className="mr-1">{col.icon}</span>
                                                                            {(isTH ? col.labelTH : col.labelEN).replace('\n', ' ')}
                                                                        </Badge>
                                                                        {(sheetMode === 'row' || sheetMode === 'all') && (
                                                                            <Badge variant="outline" className="text-[10px] h-5 px-2 border-blue-200 text-blue-600 font-medium">
                                                                                {isTH ? row.labelTH : row.labelEN}
                                                                            </Badge>
                                                                        )}
                                                                        <span className="flex items-center gap-1 text-[10px] text-slate-400">
                                                                            <Filter className="w-2.5 h-2.5" />
                                                                            {isTH ? `เทอม ${course.semester}` : `Sem ${course.semester}`}
                                                                        </span>
                                                                        {course.prerequisites.length > 0 && (
                                                                            <span className="flex items-center gap-1 text-[10px] text-amber-500">
                                                                                <AlertCircle className="w-2.5 h-2.5" />
                                                                                {course.prerequisites.join(', ')}
                                                                            </span>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </motion.div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </ScrollArea>

                    {/* Footer */}
                    <div className="px-5 py-3 border-t border-slate-200 bg-white shrink-0">
                        <div className="flex items-center justify-between text-[11px]">
                            <span className="text-slate-400">{isTH ? '☑ ลงทะเบียนแล้ว · 🔖 ติ้กเพื่อวางแผน' : '☑ Registered · 🔖 Tick to plan'}</span>
                            <span className="font-bold text-blue-600">{sheetCourses.length} {isTH ? 'วิชา' : 'courses'} · {sheetCredits} {isTH ? 'หน่วยกิต' : 'cr.'}</span>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </>
    );
}
