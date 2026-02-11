import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { BarChart3, Clock, Users, BookOpen, Search, Download, Briefcase, FlaskConical, CalendarDays } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

export default function Workload() {
    const { t } = useLanguage();
    const { user } = useAuth();

    const scheduleSlots = [
        { day: 'วันจันทร์', time: '09:00 - 12:00', code: 'DII302', name: 'Advanced AI', type: 'Lecture' },
        { day: 'วันอังคาร', time: '13:00 - 16:00', code: 'DII305', name: 'Software Arch', type: 'Lab' },
        { day: 'วันพฤหัสบดี', time: '09:00 - 12:00', code: 'DII101', name: 'Intro to CS', type: 'Lecture' },
    ];

    const otherTasks = [
        { title: 'กรรมการสอบโครงงาน', desc: 'สอบหัวข้อโครงงานนักศึกษาชั้นปีที่ 4 (15 คน)', color: 'from-blue-500 to-cyan-500' },
        { title: 'อาจารย์ที่ปรึกษาชมรม', desc: 'ชมรม AI & Robotics', color: 'from-purple-500 to-pink-500' },
        { title: 'วิทยากรรับเชิญ', desc: 'งาน Open House 2026', color: 'from-orange-500 to-amber-500' },
    ];

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
        >
            <div>
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2 text-slate-500 font-medium mb-2">
                    <BarChart3 className="w-4 h-4 text-emerald-500" />
                    <span>{t.workloadPage.subtitle} 1/2568</span>
                </motion.div>
                <motion.h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                    {t.workloadPage.title}<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">{t.workloadPage.titleHighlight}</span>
                </motion.h1>
            </div>

            {/* Bento Stats Grid */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 p-6 text-white shadow-xl shadow-green-200"
                >
                    <div className="absolute -top-10 -right-10 w-28 h-28 bg-white/10 rounded-full blur-2xl" />
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="p-2 rounded-xl bg-white/20 backdrop-blur-sm">
                                <Clock className="w-5 h-5" />
                            </div>
                            <span className="font-medium text-white/90">{t.workloadPage.teachingHours}</span>
                        </div>
                        <div className="text-4xl font-bold">12</div>
                        <p className="text-white/70 text-sm mt-1">{t.workloadPage.hoursPerWeek}</p>
                        <div className="mt-3">
                            <div className="flex justify-between text-xs mb-1 text-white/80">
                                <span>{t.workloadPage.target}</span>
                                <span>80%</span>
                            </div>
                            <Progress value={80} className="bg-white/20 h-1.5" />
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 p-6 text-white shadow-xl shadow-blue-200"
                >
                    <div className="absolute -top-10 -right-10 w-28 h-28 bg-white/10 rounded-full blur-2xl" />
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="p-2 rounded-xl bg-white/20 backdrop-blur-sm">
                                <Users className="w-5 h-5" />
                            </div>
                            <span className="font-medium text-white/90">{t.workloadPage.advisees}</span>
                        </div>
                        <div className="text-4xl font-bold">25</div>
                        <p className="text-white/70 text-sm mt-1">{t.workloadPage.adviseesDesc}</p>
                    </div>
                </motion.div>

                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500 p-6 text-white shadow-xl shadow-orange-200"
                >
                    <div className="absolute -top-10 -right-10 w-28 h-28 bg-white/10 rounded-full blur-2xl" />
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="p-2 rounded-xl bg-white/20 backdrop-blur-sm">
                                <BookOpen className="w-5 h-5" />
                            </div>
                            <span className="font-medium text-white/90">{t.workloadPage.coursesLabel}</span>
                        </div>
                        <div className="text-4xl font-bold">3</div>
                        <p className="text-white/70 text-sm mt-1">{t.workloadPage.coursesDesc}</p>
                    </div>
                </motion.div>

                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-rose-500 p-6 text-white shadow-xl shadow-purple-200"
                >
                    <div className="absolute -top-10 -right-10 w-28 h-28 bg-white/10 rounded-full blur-2xl" />
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="p-2 rounded-xl bg-white/20 backdrop-blur-sm">
                                <FlaskConical className="w-5 h-5" />
                            </div>
                            <span className="font-medium text-white/90">{t.workloadPage.research}</span>
                        </div>
                        <div className="text-4xl font-bold">2</div>
                        <p className="text-white/70 text-sm mt-1">{t.workloadPage.researchDesc}</p>
                    </div>
                </motion.div>
            </motion.div>

            {/* Bento Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                {/* Weekly Schedule - spans 3 columns */}
                <motion.div
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                    className="lg:col-span-3 rounded-3xl bg-white/60 backdrop-blur-xl border border-white/60 shadow-xl p-6 transition-all"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2.5 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 text-white shadow-lg">
                            <CalendarDays className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">{t.workloadPage.weeklySchedule}</h3>
                            <p className="text-sm text-gray-500">ภาคการศึกษา 1/2568</p>
                        </div>
                    </div>
                    <div className="space-y-3">
                        {scheduleSlots.map((slot, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                whileHover={{ scale: 1.01, x: 4 }}
                                className="flex justify-between items-center p-4 bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-100 hover:border-green-200 hover:shadow-md transition-all cursor-pointer group"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                                        {slot.day.slice(3, 5)}
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-900 group-hover:text-green-700 transition-colors">{slot.day}</div>
                                        <div className="text-sm text-gray-500">{slot.time}</div>
                                    </div>
                                </div>
                                <div className="text-right flex items-center gap-3">
                                    <div>
                                        <div className="font-bold text-green-700">{slot.code}</div>
                                        <div className="text-xs text-gray-500">{slot.name}</div>
                                    </div>
                                    <Badge className={slot.type === 'Lecture'
                                        ? 'bg-blue-100 text-blue-700 hover:bg-blue-100'
                                        : 'bg-amber-100 text-amber-700 hover:bg-amber-100'
                                    }>
                                        {slot.type}
                                    </Badge>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Other Tasks - spans 2 columns */}
                <motion.div
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                    className="lg:col-span-2 rounded-3xl bg-white/60 backdrop-blur-xl border border-white/60 shadow-xl p-6 transition-all"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2.5 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg">
                            <Briefcase className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">{t.workloadPage.otherWork}</h3>
                            <p className="text-sm text-gray-500">{t.workloadPage.otherWorkDesc}</p>
                        </div>
                    </div>
                    <div className="space-y-3">
                        {otherTasks.map((task, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                whileHover={{ scale: 1.02 }}
                                className="flex items-start gap-3 p-4 bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-100 hover:shadow-md transition-all cursor-pointer"
                            >
                                <div className={`w-2 h-full min-h-[40px] rounded-full bg-gradient-to-b ${task.color}`} />
                                <div>
                                    <p className="font-semibold text-gray-900">{task.title}</p>
                                    <p className="text-sm text-gray-500 mt-0.5">{task.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div whileHover={{ scale: 1.02 }} className="mt-6">
                        <Button
                            variant="outline"
                            className="w-full rounded-2xl h-12 border-dashed border-2 hover:border-green-300 hover:bg-green-50 transition-all"
                        >
                            <Download className="w-4 h-4 mr-2" />
                            {t.workloadPage.downloadTOR}
                        </Button>
                    </motion.div>
                </motion.div>
            </div>
        </motion.div>
    );
}
