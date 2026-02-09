import React from 'react';
import { motion } from 'framer-motion';
import { Users, UserPlus, Phone, Mail, FileText, Search, Briefcase, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { mockLecturers, mockStaffUsers } from '@/lib/mockData';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};
const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

export default function Personnel() {
    const allPersonnel = [...mockLecturers, ...mockStaffUsers];

    return (
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8 pb-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                <div>
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2 text-slate-500 font-medium mb-2">
                        <Users className="w-4 h-4 text-purple-500" />
                        <span>ระบบบริหารงานบุคคล</span>
                    </motion.div>
                    <motion.h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                        บริหารงาน<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-violet-600">บุคคล</span>
                    </motion.h1>
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-slate-500 mt-2">
                        บุคลากรทั้งหมด {allPersonnel.length} คน
                    </motion.p>
                </div>
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                    <Button className="rounded-xl bg-purple-600 hover:bg-purple-700 shadow-lg shadow-purple-200 h-11">
                        <UserPlus className="w-4 h-4 mr-2" /> เพิ่มบุคลากร
                    </Button>
                </motion.div>
            </div>

            {/* Stats */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { icon: GraduationCap, label: 'อาจารย์', value: String(mockLecturers.length), gradient: 'from-blue-500 to-indigo-500', shadow: 'shadow-blue-200' },
                    { icon: Briefcase, label: 'เจ้าหน้าที่', value: String(mockStaffUsers.length), gradient: 'from-emerald-500 to-teal-500', shadow: 'shadow-emerald-200' },
                    { icon: Users, label: 'ทั้งหมด', value: String(allPersonnel.length), gradient: 'from-purple-500 to-violet-500', shadow: 'shadow-purple-200' },
                    { icon: Mail, label: 'ออนไลน์', value: String(Math.floor(allPersonnel.length * 0.7)), gradient: 'from-amber-500 to-orange-500', shadow: 'shadow-amber-200' },
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

            {/* Search bar */}
            <motion.div variants={itemVariants} className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row gap-3">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input placeholder="ค้นหาชื่อ, ตำแหน่ง, สังกัด..." className="pl-10 rounded-xl bg-white/80 border-slate-200" />
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="rounded-xl">ส่งออก Excel</Button>
                    <Button variant="outline" className="rounded-xl">พิมพ์รายงาน</Button>
                </div>
            </motion.div>

            {/* Personnel Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {allPersonnel.map((person, idx) => (
                    <motion.div key={person.id} variants={itemVariants} whileHover={{ y: -4 }}
                        className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-3xl p-6 shadow-sm hover:shadow-lg transition-all group">
                        <div className="flex gap-4 mb-4">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-400 to-violet-500 flex items-center justify-center text-xl font-bold text-white shadow-lg shadow-purple-200">
                                {person.nameThai.charAt(0)}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-bold text-slate-800 text-lg truncate">{person.nameThai}</h3>
                                <p className="text-sm text-slate-500 mt-0.5">
                                    {person.role === 'lecturer' ? 'อาจารย์' : 'เจ้าหน้าที่'} • {person.department || (person as any).position || 'CAMT'}
                                </p>
                            </div>
                        </div>
                        <div className="space-y-2 text-sm mb-4">
                            <div className="flex items-center gap-2 text-slate-500">
                                <Mail className="w-4 h-4" /><span className="truncate">{person.email}</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-500">
                                <Phone className="w-4 h-4" /><span>053-942-xxx</span>
                            </div>
                        </div>
                        <div className="flex gap-2 pt-4 border-t border-slate-100">
                            <Button size="sm" variant="outline" className="flex-1 rounded-xl text-xs">
                                <FileText className="w-3.5 h-3.5 mr-1.5" /> ประวัติ
                            </Button>
                            <Button size="sm" className="flex-1 rounded-xl bg-purple-600 hover:bg-purple-700 text-xs shadow-lg shadow-purple-200">
                                จัดการ
                            </Button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}
