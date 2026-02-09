import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Search, MapPin, Plus, Clock, Edit3, Save, AlertCircle, CheckCircle, XCircle, Bell } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { DraggableSchedule, ScheduleItem } from '@/components/schedule/DraggableSchedule';
import { toast } from 'sonner';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};
const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

const initialScheduleData: ScheduleItem[] = [
    { id: '1', day: 1, startTime: '09:00', endTime: '12:00', courseCode: 'DII302', courseName: 'Advanced AI', room: 'DII-301' },
    { id: '2', day: 2, startTime: '13:00', endTime: '16:00', courseCode: 'DII305', courseName: 'Software Arch', room: 'DII-302' },
    { id: '3', day: 4, startTime: '09:00', endTime: '12:00', courseCode: 'DII101', courseName: 'Intro to CS', room: 'CAMT-411' },
    { id: '4', day: 3, startTime: '13:00', endTime: '16:00', courseCode: 'DII202', courseName: 'Database', room: 'DII-301' },
    { id: '5', day: 5, startTime: '09:00', endTime: '12:00', courseCode: 'DII400', courseName: 'Senior Project', room: 'Meeting Room' },
];

const mockRequests = [
    { id: 101, lecturer: 'อ.สมชาย', courseCode: 'DII302', courseName: 'Advanced AI', oldTime: 'จันทร์ 09:00', newTime: 'อังคาร 13:00', reason: 'ติดภารกิจราชการ', type: 'one-time', targetDate: '28 ม.ค. 2026' },
    { id: 102, lecturer: 'อ.วิชัย', courseCode: 'DII101', courseName: 'Intro to CS', oldTime: 'พฤหัส 09:00', newTime: 'ศุกร์ 09:00', reason: 'ห้องเรียนแอร์เสีย', type: 'permanent' },
];

export default function ScheduleManagement() {
    const [isEditMode, setIsEditMode] = useState(false);
    const [schedule, setSchedule] = useState(initialScheduleData);
    const [requests, setRequests] = useState(mockRequests);

    const rooms = [
        { name: 'DII-301 (Lecture)', capacity: 60, status: 'available' },
        { name: 'DII-302 (Lab Mac)', capacity: 40, status: 'occupied' },
        { name: 'DII-303 (Meeting)', capacity: 20, status: 'available' },
        { name: 'CAMT-411 (Auditorium)', capacity: 150, status: 'maintenance' },
    ];

    const handleApprove = (req: any) => {
        toast.success(`อนุมัติคำขอของ ${req.lecturer} เรียบร้อยแล้ว`, {
            description: 'ระบบได้ทำการอัปเดตตารางและแจ้งเตือนนักศึกษาเรียบร้อยแล้ว'
        });
        setRequests(prev => prev.filter(r => r.id !== req.id));
    };

    const handleReject = (id: number) => {
        toast.error('ปฏิเสธคำขอเรียบร้อยแล้ว');
        setRequests(prev => prev.filter(r => r.id !== id));
    };

    return (
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8 pb-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                <div>
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2 text-slate-500 font-medium mb-2">
                        <Calendar className="w-4 h-4 text-purple-500" />
                        <span>ระบบจัดการตารางเรียน</span>
                    </motion.div>
                    <motion.h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                        จัดการ<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-violet-600">ตารางเรียนและห้อง</span>
                    </motion.h1>
                </div>
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                    <Button className="rounded-xl bg-purple-600 hover:bg-purple-700 shadow-lg shadow-purple-200 h-11">
                        <Plus className="w-4 h-4 mr-2" /> จองห้องเรียน
                    </Button>
                </motion.div>
            </div>

            {/* Pending Requests */}
            <AnimatePresence>
                {requests.length > 0 && (
                    <motion.div variants={itemVariants} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                        className="bg-amber-50/80 backdrop-blur-xl border border-amber-200 rounded-3xl p-6 shadow-sm">
                        <h3 className="text-lg font-bold text-amber-800 mb-4 flex items-center gap-2">
                            <Bell className="w-5 h-5 animate-pulse" /> คำขอแก้ไขตารางสอน ({requests.length})
                        </h3>
                        <div className="space-y-3">
                            {requests.map(req => (
                                <motion.div key={req.id} whileHover={{ x: 4 }} className="bg-white p-5 rounded-2xl border border-amber-100 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                                            <span className="font-bold text-slate-800">{req.lecturer}</span>
                                            <Badge variant="outline" className="rounded-lg text-xs">{req.courseCode}</Badge>
                                            <Badge className={`rounded-lg text-xs ${req.type === 'permanent' ? 'bg-purple-100 text-purple-700 border-purple-200' : 'bg-blue-100 text-blue-700 border-blue-200'}`}>
                                                {req.type === 'permanent' ? 'เปลี่ยนถาวร' : 'เฉพาะครั้งนี้'}
                                            </Badge>
                                        </div>
                                        <p className="text-sm text-slate-600">
                                            จาก <span className="text-red-500 font-medium">{req.oldTime}</span> เป็น <span className="text-emerald-600 font-medium">{req.newTime}</span>
                                        </p>
                                        <p className="text-sm text-slate-400 mt-1">เหตุผล: {req.reason}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button size="sm" variant="outline" className="text-red-500 hover:bg-red-50 border-red-200 rounded-xl" onClick={() => handleReject(req.id)}>
                                            <XCircle className="w-4 h-4 mr-1" /> ปฏิเสธ
                                        </Button>
                                        <Button size="sm" className="bg-emerald-500 hover:bg-emerald-600 rounded-xl shadow-lg shadow-emerald-200" onClick={() => handleApprove(req)}>
                                            <CheckCircle className="w-4 h-4 mr-1" /> อนุมัติ
                                        </Button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Room Cards */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {rooms.map((room, idx) => (
                    <motion.div key={idx} whileHover={{ scale: 1.02 }}
                        className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all">
                        <div className="flex justify-between items-start mb-3">
                            <h4 className="font-bold text-slate-800 text-sm">{room.name}</h4>
                            <div className={`w-3 h-3 rounded-full ${room.status === 'available' ? 'bg-emerald-500' : room.status === 'occupied' ? 'bg-red-500' : 'bg-amber-500'}`} />
                        </div>
                        <p className="text-sm text-slate-400 flex items-center gap-2 mb-4">
                            <MapPin className="w-3.5 h-3.5" /> ความจุ {room.capacity} ที่นั่ง
                        </p>
                        <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="flex-1 rounded-xl text-xs">ตาราง</Button>
                            <Button size="sm" className="flex-1 rounded-xl text-xs bg-purple-600 hover:bg-purple-700">จอง</Button>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Schedule */}
            <motion.div variants={itemVariants} className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-3xl p-6 shadow-sm min-h-[600px]">
                <div className="flex items-center justify-between mb-5">
                    <div>
                        <h3 className="text-lg font-bold text-slate-800">ตารางสอนรวม</h3>
                        <p className="text-sm text-slate-500">จัดการตารางสอนอาจารย์และห้องเรียน</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 bg-white/80 p-2.5 rounded-xl border border-slate-200">
                            <Switch id="edit-mode" checked={isEditMode} onCheckedChange={setIsEditMode} />
                            <Label htmlFor="edit-mode" className="cursor-pointer flex items-center gap-2 text-sm">
                                <Edit3 className="w-4 h-4" /> แก้ไขตาราง
                            </Label>
                        </div>
                    </div>
                </div>
                {isEditMode && (
                    <div className="mb-4 p-3.5 bg-blue-50 border border-blue-100 rounded-2xl text-sm text-blue-700 flex items-center gap-2">
                        <Edit3 className="w-4 h-4" /> คุณอยู่ในโหมดแก้ไข สามารถลากวิชาเพื่อเปลี่ยนเวลาได้
                    </div>
                )}
                <DraggableSchedule initialSchedule={schedule} editable={isEditMode} />
            </motion.div>
        </motion.div>
    );
}
