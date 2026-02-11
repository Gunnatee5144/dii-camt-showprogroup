import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { BarChart3, Users, Clock, AlertTriangle, TrendingUp, BookOpen } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { mockLecturers } from '@/lib/mockData';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};
const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

export default function WorkloadTracking() {
    const { t } = useLanguage();
    const lecturerData = mockLecturers.map((l, i) => ({
        ...l,
        workload: [12, 16, 10, 18, 14, 8, 15][i % 7],
    }));
    const avgWorkload = (lecturerData.reduce((sum, l) => sum + l.workload, 0) / lecturerData.length).toFixed(1);
    const overloaded = lecturerData.filter(l => l.workload > 15).length;

    return (
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8 pb-10">
            {/* Header */}
            <div>
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2 text-slate-500 font-medium mb-2">
                    <BarChart3 className="w-4 h-4 text-purple-500" />
                    <span>{t.workloadTrackingPage.subtitle}</span>
                </motion.div>
                <motion.h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                    {t.workloadTrackingPage.title}<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-violet-600">{t.workloadTrackingPage.titleHighlight}</span>
                </motion.h1>
            </div>

            {/* Stats */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { icon: Users, label: t.workloadTrackingPage.totalLecturers, value: String(lecturerData.length), gradient: 'from-blue-500 to-indigo-500', shadow: 'shadow-blue-200' },
                    { icon: Clock, label: t.workloadTrackingPage.avgWorkload, value: `${avgWorkload} ${t.workloadTrackingPage.hours}`, gradient: 'from-purple-500 to-violet-500', shadow: 'shadow-purple-200' },
                    { icon: AlertTriangle, label: t.workloadTrackingPage.overLimit, value: String(overloaded), gradient: 'from-red-500 to-rose-500', shadow: 'shadow-red-200' },
                    { icon: TrendingUp, label: t.workloadTrackingPage.normalStatus, value: String(lecturerData.length - overloaded), gradient: 'from-emerald-500 to-teal-500', shadow: 'shadow-emerald-200' },
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

            {/* Bento Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                {/* Summary Panel - 2 cols */}
                <motion.div variants={itemVariants} className="lg:col-span-2 bg-white/60 backdrop-blur-xl border border-white/60 rounded-3xl p-6 shadow-sm h-fit space-y-6">
                    <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-purple-500" /> {t.workloadTrackingPage.statusOverview}
                    </h3>
                    <div className="space-y-5">
                        <div>
                            <p className="text-sm text-slate-500 mb-1">{t.workloadTrackingPage.avgTeaching}</p>
                            <div className="flex items-end gap-2">
                                <span className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-violet-600">{avgWorkload}</span>
                                <span className="text-slate-400 mb-1.5">{t.workloadTrackingPage.hoursPerWeek}</span>
                            </div>
                        </div>
                        <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                            <motion.div initial={{ width: 0 }} animate={{ width: `${(parseFloat(avgWorkload) / 20) * 100}%` }} transition={{ delay: 0.5, duration: 0.8 }} className="h-full bg-gradient-to-r from-purple-500 to-violet-500 rounded-full" />
                        </div>
                        <div className="p-4 rounded-2xl bg-red-50 border border-red-100">
                            <div className="flex items-center gap-2 text-red-600 mb-1">
                                <AlertTriangle className="w-5 h-5" />
                                <span className="font-bold">{t.workloadTrackingPage.overLimitLecturers}</span>
                            </div>
                            <span className="text-3xl font-bold text-red-600">{overloaded} {t.workloadTrackingPage.persons}</span>
                            <p className="text-sm text-red-400 mt-1">{t.workloadTrackingPage.threshold}</p>
                        </div>
                    </div>
                </motion.div>

                {/* Lecturer List - 3 cols */}
                <motion.div variants={itemVariants} className="lg:col-span-3 bg-white/60 backdrop-blur-xl border border-white/60 rounded-3xl p-6 shadow-sm">
                    <div className="mb-5">
                        <h3 className="text-lg font-bold text-slate-800">{t.workloadTrackingPage.individualDetails}</h3>
                        <p className="text-sm text-slate-500">{t.workloadTrackingPage.individualDesc}</p>
                    </div>
                    <div className="space-y-3">
                        {lecturerData.map((lecturer, idx) => {
                            const percentage = (lecturer.workload / 20) * 100;
                            const isOver = lecturer.workload > 15;
                            return (
                                <motion.div key={idx} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.05 }}
                                    className="flex items-center gap-4 p-3 rounded-2xl hover:bg-white transition-all">
                                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-white font-bold shadow-lg ${isOver ? 'bg-gradient-to-br from-red-400 to-rose-500 shadow-red-200' : 'bg-gradient-to-br from-purple-400 to-violet-500 shadow-purple-200'}`}>
                                        {lecturer.nameThai.charAt(0)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between mb-1.5">
                                            <h4 className="font-medium text-slate-800 truncate">{lecturer.nameThai}</h4>
                                            <div className="flex items-center gap-2">
                                                <span className={`text-sm font-bold ${isOver ? 'text-red-500' : 'text-slate-600'}`}>{lecturer.workload} {t.workloadTrackingPage.hours}</span>
                                                {isOver && <Badge className="bg-red-50 text-red-500 text-[10px] border-red-200">{t.workloadTrackingPage.overLimit}</Badge>}
                                            </div>
                                        </div>
                                        <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                                            <motion.div initial={{ width: 0 }} animate={{ width: `${Math.min(percentage, 100)}%` }} transition={{ delay: 0.3 + idx * 0.05, duration: 0.5 }}
                                                className={`h-full rounded-full ${isOver ? 'bg-gradient-to-r from-red-400 to-rose-500' : 'bg-gradient-to-r from-emerald-400 to-teal-500'}`} />
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}
