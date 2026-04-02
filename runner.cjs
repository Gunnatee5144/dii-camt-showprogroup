const fs = require("fs");
const file_path = "src/components/dashboard/CreditMatrixCard.tsx";
let content = fs.readFileSync(file_path, "utf-8");

content = content.replace(/status: 'registeredGraded'/g, "status: 'completed'");
content = content.replace(/status: 'registeredNoGrade'/g, "status: 'inProgress'");
content = content.replace(/status: 'studiedGraded'/g, "status: 'completed'");
content = content.replace(/status: 'studiedNoGrade'/g, "status: 'remaining'");
content = content.replace(/status: 'notStudied'/g, "status: 'remaining'");

const oldColsFull = `const COLS: { key: ColKey; labelTH: string; labelEN: string; color: string; badgeColor: string; icon: React.ReactNode }[] = [
    { key: 'registeredGraded',  labelTH: 'ลงทะเบียน\\n/ ออกเกรด',            labelEN: 'Registered\\n& Graded',         color: 'bg-emerald-50', badgeColor: 'bg-emerald-100 text-emerald-700 border-emerald-200', icon: <CheckCircle2 className="w-3 h-3 text-emerald-500" /> },
    { key: 'registeredNoGrade', labelTH: 'ลงทะเบียน\\n/ ยังไม่มีเกรด',        labelEN: 'Registered\\nNo Grade',          color: 'bg-sky-50',     badgeColor: 'bg-sky-100 text-sky-700 border-sky-200',             icon: <Clock        className="w-3 h-3 text-sky-500" />     },
    { key: 'studiedGraded',     labelTH: 'เรียนแต่ยังไม่ลง\\n/ ออกเกรด',      labelEN: 'Studied\\n(Not Reg.) Graded',    color: 'bg-amber-50',   badgeColor: 'bg-amber-100 text-amber-700 border-amber-200',       icon: <Star         className="w-3 h-3 text-amber-500" />   },
    { key: 'studiedNoGrade',    labelTH: 'เรียนแต่ยังไม่ลง\\n/ ยังไม่ออกเกรด', labelEN: 'Studied\\n(Not Reg.) No Grade',  color: 'bg-orange-50',  badgeColor: 'bg-orange-100 text-orange-700 border-orange-200',    icon: <AlertCircle  className="w-3 h-3 text-orange-500" />  },
    { key: 'notStudied',        labelTH: 'ยังไม่ได้เรียนเลย',                 labelEN: 'Not Studied Yet',               color: 'bg-slate-50',   badgeColor: 'bg-slate-100 text-slate-600 border-slate-200',       icon: <BookOpen     className="w-3 h-3 text-slate-400" />   },
];`;
const newCols = `const COLS: { key: ColKey; labelTH: string; labelEN: string; color: string; badgeColor: string; icon: React.ReactNode }[] = [
    { key: 'completed',  labelTH: 'สำเร็จแล้ว',            labelEN: 'Completed',         color: 'bg-emerald-50', badgeColor: 'bg-emerald-100 text-emerald-700 border-emerald-200', icon: <CheckCircle2 className="w-3 h-3 text-emerald-500" /> },
    { key: 'inProgress', labelTH: 'กำลังเรียน',        labelEN: 'In Progress',          color: 'bg-sky-50',     badgeColor: 'bg-sky-100 text-sky-700 border-sky-200',             icon: <Clock        className="w-3 h-3 text-sky-500" />     },
    { key: 'remaining',  labelTH: 'ยังไม่ได้เรียน',                 labelEN: 'Remaining',               color: 'bg-slate-50',   badgeColor: 'bg-slate-100 text-slate-600 border-slate-200',       icon: <BookOpen     className="w-3 h-3 text-slate-400" />   },
];`;
content = content.replace(oldColsFull, newCols);

content = content.replace("registeredGraded: 0, registeredNoGrade: 0, studiedGraded: 0, studiedNoGrade: 0, notStudied: 0", "completed: 0, inProgress: 0, remaining: 0");

const e1 = "CURRICULUM.filter(c => c.status === 'registeredGraded').reduce((s, c) => s + c.credits, 0);";
const e2 = "CURRICULUM.filter(c => c.status === 'registeredNoGrade').reduce((s, c) => s + c.credits, 0);";
content = content.replace(e1, "CURRICULUM.filter(c => c.status === 'completed').reduce((s, c) => s + c.credits, 0);");
content = content.replace(e2, "CURRICULUM.filter(c => c.status === 'inProgress').reduce((s, c) => s + c.credits, 0);");

content = content.replace(/gridTemplateColumns: '110px repeat\(5, 1fr\)'/g, "gridTemplateColumns: '120px repeat(3, 1fr)'");

content = content.replace("earned = matrix[row.key]['registeredGraded'];", "earned = matrix[row.key]['completed'];");

content = content.replace("c.status === 'registeredGraded' || c.status === 'registeredNoGrade'", "c.status === 'completed' || c.status === 'inProgress'");
content = content.replace("c.status !== 'registeredGraded' && c.status !== 'registeredNoGrade'", "c.status === 'remaining'");

const oldB = `const STATUS_BORDER: Record<ColKey, string> = {
    registeredGraded:  'border-l-emerald-400',
    registeredNoGrade: 'border-l-sky-400',
    studiedGraded:     'border-l-amber-400',
    studiedNoGrade:    'border-l-orange-400',
    notStudied:        'border-l-slate-300',
};`;
const newB = `const STATUS_BORDER: Record<ColKey, string> = {
    completed:  'border-l-emerald-400',
    inProgress: 'border-l-sky-400',
    remaining:  'border-l-slate-300',
};`;
content = content.replace(oldB, newB);

fs.writeFileSync(file_path, content, "utf-8");
