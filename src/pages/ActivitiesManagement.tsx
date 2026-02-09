import React from 'react';
import { motion } from 'framer-motion';
import { Activity, CheckCircle, XCircle, Search, Calendar, Users, Star, Clock } from 'lucide-react';
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

export default function ActivitiesManagement() {
    return (
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8 pb-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                <div>
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2 text-slate-500 font-medium mb-2">
                        <Activity className="w-4 h-4 text-purple-500" />
                        <span>ระบบจัดการกิจกรรม</span>
                    </motion.div>
                    <motion.h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                        จัดการ<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-violet-600">กิจกรรม</span>
                    </motion.h1>
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-slate-500 mt-2">
                        อนุมัติและจัดการกิจกรรมนักศึกษา
                    </motion.p>
                </div>
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="relative w-full md:w-72">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input placeholder="ค้นหากิจกรรม..." className="pl-10 rounded-xl bg-white/80 border-slate-200" />
                </motion.div>
            </div>

            {/* Stats */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { icon: Clock, label: 'รออนุมัติ', value: '2', gradient: 'from-amber-500 to-orange-500', shadow: 'shadow-amber-200' },
                    { icon: CheckCircle, label: 'อนุมัติแล้ว', value: '15', gradient: 'from-emerald-500 to-teal-500', shadow: 'shadow-emerald-200' },
                    { icon: Calendar, label: 'กำลังดำเนินการ', value: '3', gradient: 'from-blue-500 to-indigo-500', shadow: 'shadow-blue-200' },
                    { icon: Star, label: 'เสร็จสิ้น', value: '12', gradient: 'from-purple-500 to-violet-500', shadow: 'shadow-purple-200' },
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
                {/* Pending Requests - 3 cols */}
                <motion.div variants={itemVariants} className="lg:col-span-3 bg-white/60 backdrop-blur-xl border border-white/60 rounded-3xl p-6 shadow-sm">
                    <div className="mb-5">
                        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                            <Clock className="w-5 h-5 text-amber-500" /> คำร้องขอกิจกรรมใหม่
                        </h3>
                        <p className="text-sm text-slate-500">รายการที่รอการอนุมัติจากผู้ดูแล</p>
                    </div>
                    <div className="space-y-3">
                        {[
                            { title: 'ค่ายอาสาพัฒนาชนบท', org: 'ชมรมอาสา', date: '20-22 ต.ค. 2567', participants: 45 },
                            { title: 'แข่งขันทักษะคอมพิวเตอร์', org: 'DII Club', date: '15 พ.ย. 2567', participants: 30 },
                        ].map((act, idx) => (
                            <motion.div key={idx} whileHover={{ x: 4 }} className="p-5 rounded-2xl border border-slate-100 bg-white/80 hover:shadow-md transition-all">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white shadow-lg shadow-amber-200">
                                            <Activity className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg text-slate-800">{act.title}</h4>
                                            <p className="text-sm text-slate-500 mt-0.5">{act.org} • {act.date}</p>
                                            <div className="flex items-center gap-1 mt-2 text-xs text-slate-400">
                                                <Users className="w-3.5 h-3.5" /> ผู้เข้าร่วม {act.participants} คน
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button className="bg-emerald-500 hover:bg-emerald-600 rounded-xl shadow-lg shadow-emerald-200">
                                            <CheckCircle className="w-4 h-4 mr-2" /> อนุมัติ
                                        </Button>
                                        <Button variant="outline" className="text-red-500 border-red-200 hover:bg-red-50 rounded-xl">
                                            <XCircle className="w-4 h-4 mr-2" /> ปฏิเสธ
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Approved Activities - 2 cols */}
                <motion.div variants={itemVariants} className="lg:col-span-2 bg-white/60 backdrop-blur-xl border border-white/60 rounded-3xl p-6 shadow-sm">
                    <h3 className="text-lg font-bold text-slate-800 mb-5 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-emerald-500" /> กิจกรรมที่อนุมัติแล้ว
                    </h3>
                    <div className="space-y-3">
                        {[
                            { title: 'Orientation Day 2026', status: 'completed', date: 'ส.ค. 2567' },
                            { title: 'Sports Day', status: 'active', date: 'ก.ย. 2567' },
                            { title: 'Tech Talk Series', status: 'active', date: 'ต.ค. 2567' },
                        ].map((act, idx) => (
                            <motion.div key={idx} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + idx * 0.1 }}
                                className="flex items-center justify-between p-3.5 rounded-2xl hover:bg-white transition-all">
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${act.status === 'completed' ? 'bg-slate-100 text-slate-400' : 'bg-emerald-50 text-emerald-500'}`}>
                                        {act.status === 'completed' ? <Star className="w-5 h-5" /> : <Activity className="w-5 h-5" />}
                                    </div>
                                    <div>
                                        <p className="font-medium text-slate-800">{act.title}</p>
                                        <p className="text-xs text-slate-400">{act.date}</p>
                                    </div>
                                </div>
                                <Badge variant="outline" className={`rounded-xl text-xs ${act.status === 'completed' ? 'border-slate-200 text-slate-500 bg-slate-50' : 'border-emerald-200 text-emerald-600 bg-emerald-50'}`}>
                                    {act.status === 'completed' ? 'เสร็จสิ้น' : 'กำลังดำเนินการ'}
                                </Badge>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}
