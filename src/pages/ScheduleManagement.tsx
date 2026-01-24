import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Search, MapPin, Plus, Clock, Edit3, Save, AlertCircle, CheckCircle, XCircle, Bell } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ThemedPageHeader } from '@/components/common/ThemedPageHeader';
import { DraggableSchedule, ScheduleItem } from '@/components/schedule/DraggableSchedule';
import { toast } from 'sonner';

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
        // Simulate updating the schedule
        toast.success(`อนุมัติคำขอของ ${req.lecturer} เรียบร้อยแล้ว`, {
            description: 'ระบบได้ทำการอัปเดตตารางและแจ้งเตือนนักศึกษาเรียบร้อยแล้ว'
        });
        setRequests(prev => prev.filter(r => r.id !== req.id));

        // In a real app, we would merge the change into 'schedule' state here
    };

    const handleReject = (id: number) => {
        toast.error('ปฏิเสธคำขอเรียบร้อยแล้ว');
        setRequests(prev => prev.filter(r => r.id !== id));
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
        >
            <ThemedPageHeader
                title="จัดการตารางเรียนและห้อง"
                subtitle="บริหารจัดการการใช้ห้องเรียนและตารางสอน"
                icon={<Calendar className="w-7 h-7" />}
                gradient="purple"
                actions={
                    <Button className="bg-purple-600 hover:bg-purple-700">
                        <Plus className="w-4 h-4 mr-2" />
                        จองห้องเรียน
                    </Button>
                }
            />

            {/* Pending Requests Section */}
            <AnimatePresence>
                {requests.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                    >
                        <Card className="border-orange-200 bg-orange-50/50">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-lg flex items-center gap-2 text-orange-800">
                                    <Bell className="w-5 h-5 animate-pulse" />
                                    คำขอแก้ไขตารางสอน ({requests.length})
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {requests.map(req => (
                                        <div key={req.id} className="bg-white p-4 rounded-xl border shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="font-bold text-gray-800">{req.lecturer}</span>
                                                    <Badge variant="outline">{req.courseCode}</Badge>
                                                    <Badge className={req.type === 'permanent' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}>
                                                        {req.type === 'permanent' ? 'เปลี่ยนถาวร' : 'เฉพาะครั้งนี้'}
                                                    </Badge>
                                                </div>
                                                <p className="text-sm text-gray-600">
                                                    ขอเปลี่ยนจาก <span className="text-red-500 font-medium">{req.oldTime}</span> เป็น <span className="text-green-600 font-medium">{req.newTime}</span>
                                                </p>
                                                <p className="text-sm text-gray-500 mt-1">เหตุผล: {req.reason}</p>
                                            </div>
                                            <div className="flex gap-2">
                                                <Button size="sm" variant="outline" className="text-red-500 hover:text-red-600 hover:bg-red-50" onClick={() => handleReject(req.id)}>
                                                    <XCircle className="w-4 h-4 mr-1" />
                                                    ปฏิเสธ
                                                </Button>
                                                <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => handleApprove(req)}>
                                                    <CheckCircle className="w-4 h-4 mr-1" />
                                                    อนุมัติ & แจ้งนักศึกษา
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="flex gap-4 mb-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input placeholder="ค้นหาห้องเรียน..." className="pl-10" />
                </div>
                <Button variant="outline">ตรวจสอบตารางว่าง</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {rooms.map((room, idx) => (
                    <Card key={idx} className="hover:shadow-md transition-shadow">
                        <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                                <CardTitle className="text-base">{room.name}</CardTitle>
                                <div className={`w-3 h-3 rounded-full ${room.status === 'available' ? 'bg-green-500' :
                                    room.status === 'occupied' ? 'bg-red-500' : 'bg-yellow-500'
                                    }`} />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-500 flex items-center gap-2 mb-4">
                                <MapPin className="w-4 h-4" />
                                ความจุ {room.capacity} ที่นั่ง
                            </p>
                            <div className="flex gap-2">
                                <Button size="sm" variant="outline" className="flex-1 w-full">ตาราง</Button>
                                <Button size="sm" className="flex-1 w-full">จอง</Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Card className="min-h-[600px]">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>ตารางสอนรวม</CardTitle>
                            <p className="text-sm text-gray-500">จัดการตารางสอนอาจารย์และห้องเรียน</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center space-x-2 bg-gray-50 p-2 rounded-lg border">
                                <Switch id="edit-mode" checked={isEditMode} onCheckedChange={setIsEditMode} />
                                <Label htmlFor="edit-mode" className="cursor-pointer flex items-center gap-2">
                                    <Edit3 className="w-4 h-4" />
                                    แก้ไขตาราง
                                </Label>
                            </div>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    {isEditMode && (
                        <div className="mb-4 p-3 bg-blue-50 border border-blue-100 rounded-lg text-sm text-blue-700 flex items-center gap-2">
                            <Edit3 className="w-4 h-4" />
                            คุณอยู่ในโหมดแก้ไข สามารถลากวิชาเพื่อเปลี่ยนเวลาได้
                        </div>
                    )}
                    <DraggableSchedule
                        initialSchedule={schedule}
                        editable={isEditMode}
                    />
                </CardContent>
            </Card>
        </motion.div>
    );
}
