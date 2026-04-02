import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { FileText, Printer, File, Download, CheckCircle, Search, Clock, Plus, FolderOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};
const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

export default function Documents() {
    const { t } = useLanguage();
    const [searchQuery, setSearchQuery] = React.useState('');

    const pendingRequests = [
        { id: 1, name: 'นายทดสอบ นักศึกษา', studentId: '642110001', type: 'ใบรับรองสถานภาพ', time: '2 ชั่วโมงที่แล้ว' },
        { id: 2, name: 'นายทดสอบ นักศึกษา', studentId: '642110002', type: 'Transcript', time: '3 ชั่วโมงที่แล้ว' },
        { id: 3, name: 'นายทดสอบ นักศึกษา', studentId: '642110003', type: 'หนังสือขอฝึกงาน', time: '5 ชั่วโมงที่แล้ว' },
    ];

    const filteredRequests = searchQuery.trim()
        ? pendingRequests.filter(r =>
            r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            r.studentId.includes(searchQuery) ||
            r.type.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : pendingRequests;

    const docTemplates = [
        { title: t.documentsPage.statusCert, desc: t.documentsPage.statusCertDesc, icon: FileText, color: 'from-blue-500 to-indigo-500' },
        { title: 'Transcript', desc: t.documentsPage.transcript, icon: FileText, color: 'from-emerald-500 to-teal-500' },
        { title: t.documentsPage.courtesyLetter, desc: t.documentsPage.courtesyLetterDesc, icon: File, color: 'from-amber-500 to-orange-500' },
        { title: t.documentsPage.leaveLetter, desc: t.documentsPage.leaveLetterDesc, icon: FileText, color: 'from-purple-500 to-violet-500' },
    ];

    return (
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8 pb-10">
            {/* Header */}
            <div>
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2 text-slate-500 dark:text-slate-400 font-medium mb-2">
                    <Printer className="w-4 h-4 text-blue-500 dark:text-slate-400" />
                    <span>{t.documentsPage.subtitle}</span>
                </motion.div>
                <motion.h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                    {t.documentsPage.title}<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">{t.documentsPage.titleHighlight}</span>
                </motion.h1>
            </div>

            {/* Document Templates Grid */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {docTemplates.map((doc, idx) => (
                    <motion.div key={idx} whileHover={{ scale: 1.03, y: -4 }} className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${doc.color} p-6 text-white shadow-xl cursor-pointer group`}>
                        <div className="absolute -top-8 -right-8 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500 dark:bg-slate-900/50" />
                        <div className="relative z-10">
                            <div className="p-2.5 rounded-xl bg-white/20 backdrop-blur-sm w-fit mb-4 dark:bg-slate-900/50">
                                <doc.icon className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-lg mb-1">{doc.title}</h3>
                            <p className="text-sm text-white/80">{doc.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Bento Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                {/* Pending Requests - 3 cols */}
                <motion.div variants={itemVariants} className="lg:col-span-3 bg-white/60 backdrop-blur-xl border border-white/60 dark:border-slate-800/60 rounded-3xl p-6 shadow-sm dark:bg-slate-900/50">
                    <div className="flex justify-between items-center mb-5">
                        <div>
                            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">{t.documentsPage.pendingRequests}</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400">{t.documentsPage.pendingDesc}</p>
                        </div>
                        <div className="relative w-56">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <Input
                                placeholder={t.documentsPage.searchRequests}
                                className="pl-9 rounded-xl bg-white/80 dark:bg-slate-900/50"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        {filteredRequests.length === 0 ? (
                            <div className="text-center py-8 text-slate-400">{t.documentsPage.searchRequests}</div>
                        ) : filteredRequests.map((req) => (
                            <motion.div key={req.id} whileHover={{ x: 4 }} className="flex items-center justify-between p-4 rounded-2xl hover:bg-white border border-transparent hover:border-slate-100 hover:shadow-sm transition-all dark:bg-slate-900 dark:border-slate-700">
                                <div className="flex items-center gap-4">
                                    <div className="w-11 h-11 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500">
                                        <Clock className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-slate-800 dark:text-slate-200">{req.name} ({req.studentId})</p>
                                        <p className="text-sm text-slate-400">ขอ{req.type} • {req.time}</p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Button size="sm" variant="outline" className="rounded-xl text-xs">{t.documentsPage.viewDetails}</Button>
                                    <Button size="sm" className="rounded-xl bg-blue-600 hover:bg-blue-700 text-xs shadow-lg shadow-blue-200">
                                        <Printer className="w-3.5 h-3.5 mr-1.5" /> {t.documentsPage.issueDoc}
                                    </Button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* History - 2 cols */}
                <motion.div variants={itemVariants} className="lg:col-span-2 bg-white/60 backdrop-blur-xl border border-white/60 dark:border-slate-800/60 rounded-3xl p-6 shadow-sm dark:bg-slate-900/50">
                    <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-5 flex items-center gap-2">
                        <FolderOpen className="w-5 h-5 text-emerald-500 dark:text-slate-400" /> {t.documentsPage.history}
                    </h3>
                    <div className="space-y-3">
                        {[
                            { name: 'นายตัวอย่าง สุขใจ', doc: 'Transcript', date: '15 มี.ค. 2567' },
                            { name: 'นางสาวทดสอบ ระบบ', doc: 'ใบรับรองสถานภาพ', date: '12 มี.ค. 2567' },
                            { name: 'นายพัฒนา ซอฟต์แวร์', doc: 'หนังสือขอฝึกงาน', date: '10 มี.ค. 2567' },
                        ].map((item, i) => (
                            <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.1 }}
                                className="flex items-center justify-between p-3 rounded-2xl hover:bg-white transition-all dark:bg-slate-900">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-500 dark:text-slate-400 dark:bg-slate-800">
                                        <CheckCircle className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-slate-800 dark:text-slate-200 text-sm">{item.name}</p>
                                        <p className="text-xs text-slate-400">{item.doc} • {item.date}</p>
                                    </div>
                                </div>
                                <Button size="sm" variant="ghost" className="text-slate-400 hover:text-blue-500 rounded-xl dark:text-slate-400">
                                    <Download className="w-4 h-4" />
                                </Button>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}
