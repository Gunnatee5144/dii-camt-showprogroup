import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import { CalendarCheck, Users, Save, FileSpreadsheet, CheckCircle2, XCircle, Clock, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockCourses } from '@/lib/mockData';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

export default function Attendance() {
    const { user } = useAuth();
    const [selectedCourse, setSelectedCourse] = React.useState(mockCourses[0]?.id || '');
    const [date, setDate] = React.useState(new Date().toISOString().split('T')[0]);

    return (
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8 pb-10">
            {/* Header */}
            <div>
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2 text-slate-500 font-medium mb-2">
                    <CalendarCheck className="w-4 h-4 text-emerald-500" />
                    <span>ระบบเช็คชื่อเข้าเรียน</span>
                </motion.div>
                <motion.h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                    เช็คชื่อ<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">เข้าเรียน</span>
                </motion.h1>
            </div>

            {/* Stats */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { icon: Users, label: 'นักศึกษาทั้งหมด', value: '45', gradient: 'from-blue-500 to-indigo-500', shadow: 'shadow-blue-200' },
                    { icon: CheckCircle2, label: 'มาเรียน', value: '42', gradient: 'from-emerald-500 to-teal-500', shadow: 'shadow-emerald-200' },
                    { icon: Clock, label: 'มาสาย', value: '2', gradient: 'from-amber-500 to-orange-500', shadow: 'shadow-amber-200' },
                    { icon: XCircle, label: 'ขาดเรียน', value: '1', gradient: 'from-red-500 to-rose-500', shadow: 'shadow-red-200' },
                ].map((stat, i) => (
                    <motion.div key={i} whileHover={{ scale: 1.02 }} className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${stat.gradient} p-6 text-white shadow-xl ${stat.shadow}`}>
                        <div className="absolute -top-10 -right-10 w-28 h-28 bg-white/10 rounded-full blur-2xl" />
                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="p-2 rounded-xl bg-white/20 backdrop-blur-sm"><stat.icon className="w-5 h-5" /></div>
                                <span className="font-medium text-white/90">{stat.label}</span>
                            </div>
                            <div className="text-4xl font-bold">{stat.value}</div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Settings Panel */}
                <motion.div variants={itemVariants} className="lg:col-span-1 bg-white/60 backdrop-blur-xl border border-white/60 rounded-3xl p-6 shadow-sm h-fit">
                    <h3 className="text-lg font-bold text-slate-800 mb-5 flex items-center gap-2">
                        <CalendarCheck className="w-5 h-5 text-emerald-500" /> ตั้งค่า
                    </h3>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">รายวิชา</label>
                            <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                                <SelectTrigger className="rounded-xl"><SelectValue placeholder="เลือกรายวิชา" /></SelectTrigger>
                                <SelectContent>{mockCourses.slice(0, 3).map(c => (<SelectItem key={c.id} value={c.id}>{c.code} {c.name}</SelectItem>))}</SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">วันที่</label>
                            <Input type="date" value={date} onChange={e => setDate(e.target.value)} className="rounded-xl" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">คาบเรียน</label>
                            <Select defaultValue="1">
                                <SelectTrigger className="rounded-xl"><SelectValue placeholder="เลือกคาบ" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1">09:00 - 12:00 (Lecture)</SelectItem>
                                    <SelectItem value="2">13:00 - 16:00 (Lab)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Button className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-700 h-11 shadow-lg shadow-emerald-200">
                            <CalendarCheck className="w-4 h-4 mr-2" /> เริ่มเช็คชื่อ
                        </Button>
                        <Button variant="outline" className="w-full rounded-xl border-dashed">
                            <FileSpreadsheet className="w-4 h-4 mr-2" /> รายงานสรุป
                        </Button>
                    </div>
                </motion.div>

                {/* Student List */}
                <motion.div variants={itemVariants} className="lg:col-span-3 bg-white/60 backdrop-blur-xl border border-white/60 rounded-3xl p-6 shadow-sm">
                    <div className="flex justify-between items-center mb-5">
                        <div>
                            <h3 className="text-lg font-bold text-slate-800">รายชื่อนักศึกษา</h3>
                            <p className="text-sm text-slate-500">วิชา Advanced AI • Sec 001</p>
                        </div>
                        <div className="flex gap-3 text-sm">
                            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 rounded-xl"><div className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> มา 42</div>
                            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 rounded-xl"><div className="w-2.5 h-2.5 rounded-full bg-amber-500" /> สาย 2</div>
                            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 rounded-xl"><div className="w-2.5 h-2.5 rounded-full bg-red-500" /> ขาด 1</div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        {Array.from({ length: 10 }).map((_, i) => (
                            <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }}
                                className="flex items-center justify-between p-3 rounded-2xl hover:bg-white border border-transparent hover:border-slate-100 hover:shadow-sm transition-all">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white font-bold text-sm">{String.fromCharCode(65 + i)}</div>
                                    <div>
                                        <div className="font-medium text-slate-800">นักศึกษา {i + 1}</div>
                                        <div className="text-xs text-slate-400">642110{100 + i}</div>
                                    </div>
                                </div>
                                <div className="flex gap-1.5">
                                    <Button size="sm" className={i !== 5 ? "bg-emerald-500 hover:bg-emerald-600 h-8 px-3 rounded-xl text-xs" : "bg-transparent text-slate-400 h-8 px-3 rounded-xl text-xs hover:bg-slate-50"}>มา</Button>
                                    <Button size="sm" className={i === 5 ? "bg-amber-500 hover:bg-amber-600 h-8 px-3 rounded-xl text-xs" : "bg-transparent text-slate-400 h-8 px-3 rounded-xl text-xs hover:bg-slate-50"}>สาย</Button>
                                    <Button size="sm" className="bg-transparent text-slate-400 h-8 px-3 rounded-xl text-xs hover:bg-slate-50">ขาด</Button>
                                    <Button size="sm" className="bg-transparent text-slate-400 h-8 px-3 rounded-xl text-xs hover:bg-slate-50">ลา</Button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-100">
                        <span className="text-sm text-slate-400">บันทึกล่าสุด: วันนี้ 09:15 น.</span>
                        <Button className="rounded-xl bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-200">
                            <Save className="w-4 h-4 mr-2" /> บันทึกข้อมูล
                        </Button>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}
