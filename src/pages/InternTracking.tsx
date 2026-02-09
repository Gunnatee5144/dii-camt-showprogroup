import React from 'react';
import { motion } from 'framer-motion';
import { Users, ClipboardList, CheckSquare, Briefcase, Clock, MapPin, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};
const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

export default function InternTracking() {
    const interns = [
        { name: 'นายณัฐพงษ์ ใจดี', position: 'Backend Developer', company: 'Tech Innovation Co.', progress: 60, weeks: 8, totalWeeks: 12, rating: 4.5 },
        { name: 'นางสาววิไลลักษณ์ สวยงาม', position: 'UX/UI Designer', company: 'Design Studio', progress: 45, weeks: 6, totalWeeks: 12, rating: 4.2 },
        { name: 'นายสมชาย ดีมาก', position: 'Data Analyst', company: 'DataSoft Co.', progress: 80, weeks: 10, totalWeeks: 12, rating: 4.8 },
    ];

    return (
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8 pb-10">
            {/* Header */}
            <div>
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2 text-slate-500 font-medium mb-2">
                    <Briefcase className="w-4 h-4 text-orange-500" />
                    <span>ระบบติดตามการฝึกงาน</span>
                </motion.div>
                <motion.h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                    ติดตามนักศึกษา<span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">ฝึกงาน</span>
                </motion.h1>
            </div>

            {/* Stats */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { icon: Users, label: 'นักศึกษาฝึกงาน', value: '3', gradient: 'from-orange-500 to-amber-500', shadow: 'shadow-orange-200' },
                    { icon: Briefcase, label: 'สถานประกอบการ', value: '3', gradient: 'from-blue-500 to-indigo-500', shadow: 'shadow-blue-200' },
                    { icon: Clock, label: 'ระยะเวลาเฉลี่ย', value: '12 สัปดาห์', gradient: 'from-purple-500 to-violet-500', shadow: 'shadow-purple-200' },
                    { icon: Star, label: 'คะแนนเฉลี่ย', value: '4.5', gradient: 'from-emerald-500 to-teal-500', shadow: 'shadow-emerald-200' },
                ].map((stat, i) => (
                    <motion.div key={i} whileHover={{ scale: 1.02 }} className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${stat.gradient} p-5 text-white shadow-xl ${stat.shadow}`}>
                        <div className="absolute -top-10 -right-10 w-28 h-28 bg-white/10 rounded-full blur-2xl" />
                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="p-2 rounded-xl bg-white/20 backdrop-blur-sm"><stat.icon className="w-4 h-4" /></div>
                                <span className="text-sm font-medium text-white/90">{stat.label}</span>
                            </div>
                            <div className="text-3xl font-bold">{stat.value}</div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Intern Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {interns.map((intern, idx) => (
                    <motion.div key={idx} variants={itemVariants} whileHover={{ y: -4 }}
                        className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-3xl p-6 shadow-sm hover:shadow-lg transition-all">
                        <div className="flex items-start gap-4 mb-5">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-orange-200">
                                {intern.name.charAt(0)}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-bold text-lg text-slate-800">{intern.name}</h3>
                                <p className="text-sm text-slate-500">{intern.position}</p>
                                <div className="flex items-center gap-1 mt-1 text-xs text-slate-400">
                                    <MapPin className="w-3 h-3" /> {intern.company}
                                </div>
                            </div>
                        </div>

                        <div className="mb-5">
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-slate-500">ความคืบหน้า</span>
                                <span className="font-bold text-slate-800">สัปดาห์ {intern.weeks}/{intern.totalWeeks}</span>
                            </div>
                            <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                                <motion.div initial={{ width: 0 }} animate={{ width: `${intern.progress}%` }} transition={{ delay: 0.5 + idx * 0.1, duration: 0.6 }}
                                    className="h-full bg-gradient-to-r from-orange-400 to-amber-500 rounded-full" />
                            </div>
                        </div>

                        <div className="flex items-center justify-between mb-5 p-3 rounded-xl bg-amber-50 border border-amber-100">
                            <span className="text-sm text-amber-700">คะแนนประเมิน</span>
                            <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                                <span className="font-bold text-amber-700">{intern.rating}/5.0</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            <Button variant="outline" className="w-full rounded-xl text-xs">
                                <ClipboardList className="w-3.5 h-3.5 mr-1.5" /> Time Sheet
                            </Button>
                            <Button className="w-full rounded-xl bg-orange-500 hover:bg-orange-600 text-xs shadow-lg shadow-orange-200">
                                <CheckSquare className="w-3.5 h-3.5 mr-1.5" /> ประเมินผล
                            </Button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}
