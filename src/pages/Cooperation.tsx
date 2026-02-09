import React from 'react';
import { motion } from 'framer-motion';
import { Handshake, FileText, CheckCircle, Clock, Calendar, Download, Shield, Users } from 'lucide-react';
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

export default function Cooperation() {
    return (
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8 pb-10">
            {/* Header */}
            <div>
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2 text-slate-500 font-medium mb-2">
                    <Handshake className="w-4 h-4 text-orange-500" />
                    <span>ระบบจัดการความร่วมมือ</span>
                </motion.div>
                <motion.h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                    สถานะ<span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">ความร่วมมือ</span>
                </motion.h1>
            </div>

            {/* MOU Status Card - Full Width */}
            <motion.div variants={itemVariants} whileHover={{ scale: 1.005 }}
                className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-600 p-8 text-white shadow-xl shadow-emerald-200">
                <div className="absolute -top-20 -right-20 w-60 h-60 bg-white/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full blur-2xl" />
                <div className="relative z-10">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                        <div>
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2.5 rounded-xl bg-white/20 backdrop-blur-sm"><Shield className="w-6 h-6" /></div>
                                <div>
                                    <h2 className="text-2xl font-bold">สถานะ MOU: Active</h2>
                                    <p className="text-emerald-100 text-sm mt-0.5">บันทึกข้อตกลงความร่วมมือทางวิชาการ</p>
                                </div>
                            </div>
                            <p className="text-emerald-100 text-sm max-w-2xl">
                                ระหว่างมหาวิทยาลัยเชียงใหม่ และ บริษัท เทคอินโนเวชั่น จำกัด
                            </p>
                        </div>
                        <Badge className="bg-white/20 text-white border-white/30 text-base px-4 py-1.5 backdrop-blur-sm self-start">Valid</Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                        {[
                            { label: 'เลขที่สัญญา', value: 'MOU-2567/042' },
                            { label: 'วันเริ่มสัญญา', value: '1 มกราคม 2567' },
                            { label: 'วันสิ้นสุดสัญญา', value: '31 ธันวาคม 2569', sub: 'เหลือเวลา 1 ปี 9 เดือน' },
                        ].map((item, i) => (
                            <div key={i} className="p-4 rounded-2xl bg-white/10 backdrop-blur-sm">
                                <p className="text-sm text-emerald-200">{item.label}</p>
                                <p className="font-bold text-lg mt-1">{item.value}</p>
                                {item.sub && <p className="text-xs text-amber-200 mt-1">{item.sub}</p>}
                            </div>
                        ))}
                    </div>
                    <div className="flex gap-3 mt-6">
                        <Button className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm rounded-xl border border-white/20">
                            <Download className="w-4 h-4 mr-2" /> ดาวน์โหลด MOU
                        </Button>
                        <Button className="bg-white text-emerald-700 hover:bg-emerald-50 rounded-xl shadow-lg">
                            ขอต่ออายุสัญญา
                        </Button>
                    </div>
                </div>
            </motion.div>

            {/* Bento Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                {/* Activity History - 3 cols */}
                <motion.div variants={itemVariants} className="lg:col-span-3 bg-white/60 backdrop-blur-xl border border-white/60 rounded-3xl p-6 shadow-sm">
                    <h3 className="text-lg font-bold text-slate-800 mb-5 flex items-center gap-2">
                        <Clock className="w-5 h-5 text-orange-500" /> ประวัติกิจกรรมความร่วมมือ
                    </h3>
                    <div className="space-y-3">
                        {[
                            { title: 'รับนักศึกษาฝึกงาน', date: '1 มิ.ย. 2567', desc: 'รับนักศึกษาฝึกงานจำนวน 3 คน เข้าแผนก Software Development', icon: Users },
                            { title: 'วิทยากรพิเศษ', date: '15 พ.ค. 2567', desc: 'บรรยายหัวข้อ Modern Web Architecture รายวิชา DII305', icon: Calendar },
                            { title: 'สนับสนุนอุปกรณ์', date: '20 เม.ย. 2567', desc: 'บริจาคชุดอุปกรณ์ IoT Development Kit จำนวน 10 ชุด', icon: Handshake },
                        ].map((item, idx) => (
                            <motion.div key={idx} whileHover={{ x: 4 }} className="flex items-start gap-4 p-4 rounded-2xl hover:bg-white border border-transparent hover:border-slate-100 hover:shadow-sm transition-all">
                                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center text-white flex-shrink-0 shadow-lg shadow-orange-200">
                                    <item.icon className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-slate-800">{item.title}</h4>
                                    <p className="text-xs text-slate-400 mb-1">{item.date}</p>
                                    <p className="text-sm text-slate-600">{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Contact Person - 2 cols */}
                <motion.div variants={itemVariants} className="lg:col-span-2 bg-white/60 backdrop-blur-xl border border-white/60 rounded-3xl p-6 shadow-sm">
                    <h3 className="text-lg font-bold text-slate-800 mb-5 flex items-center gap-2">
                        <FileText className="w-5 h-5 text-blue-500" /> ผู้ประสานงานหลัก
                    </h3>
                    <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 mb-5">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-blue-200">
                                อ
                            </div>
                            <div>
                                <p className="font-bold text-lg text-slate-800">อ.ดร. สมชาย ใจดี</p>
                                <p className="text-sm text-slate-500">หัวหน้าศูนย์ประสานงานอุตสาหกรรม</p>
                            </div>
                        </div>
                        <div className="space-y-2 text-sm text-slate-600">
                            <p>📞 053-942-xxx</p>
                            <p>✉️ somchai@cmu.ac.th</p>
                        </div>
                    </div>
                    <Button className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200 h-11">
                        ส่งข้อความติดต่อ
                    </Button>
                </motion.div>
            </div>
        </motion.div>
    );
}
