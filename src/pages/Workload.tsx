import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import { BarChart3, Clock, Users, BookOpen, Search, Filter, Download } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ThemedPageHeader } from '@/components/common/ThemedPageHeader';
import { Progress } from '@/components/ui/progress';

export default function Workload() {
    const { user } = useAuth();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
        >
            <ThemedPageHeader
                title="รายงานภาระงาน"
                subtitle="สรุปภาระงานสอนและงานบริการวิชาการ ประจำภาคการศึกษา 1/2568"
                icon={<BarChart3 className="w-7 h-7" />}
                gradient="green"
            />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="md:col-span-1 bg-gradient-to-br from-green-500 to-emerald-600 text-white border-none shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-white/90 flex items-center gap-2">
                            <Clock className="w-5 h-5" />
                            ชั่วโมงสอน
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold mb-2">12</div>
                        <p className="text-green-100 text-sm">ชั่วโมง/สัปดาห์</p>
                        <div className="mt-4">
                            <div className="flex justify-between text-xs mb-1">
                                <span>เป้าหมายขั้นต่ำ</span>
                                <span>80%</span>
                            </div>
                            <Progress value={80} className="bg-green-800" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="md:col-span-1 bg-white shadow-md">
                    <CardHeader>
                        <CardTitle className="text-gray-700 flex items-center gap-2">
                            <Users className="w-5 h-5" />
                            ที่ปรึกษา
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold mb-2 text-gray-900">25</div>
                        <p className="text-gray-500 text-sm">นักศึกษาในความดูแล</p>
                    </CardContent>
                </Card>

                <Card className="md:col-span-1 bg-white shadow-md">
                    <CardHeader>
                        <CardTitle className="text-gray-700 flex items-center gap-2">
                            <BookOpen className="w-5 h-5" />
                            รายวิชา
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold mb-2 text-gray-900">3</div>
                        <p className="text-gray-500 text-sm">วิชาที่รับผิดชอบ</p>
                    </CardContent>
                </Card>

                <Card className="md:col-span-1 bg-white shadow-md">
                    <CardHeader>
                        <CardTitle className="text-gray-700 flex items-center gap-2">
                            <Search className="w-5 h-5" />
                            วิจัย
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold mb-2 text-gray-900">2</div>
                        <p className="text-gray-500 text-sm">งานวิจัยตีพิมพ์</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>ตารางสอนรายสัปดาห์</CardTitle>
                        <CardDescription>ภาคการศึกษา 1/2568</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[
                                { day: 'วันจันทร์', time: '09:00 - 12:00', code: 'DII302', name: 'Advanced AI', type: 'Lecture' },
                                { day: 'วันอังคาร', time: '13:00 - 16:00', code: 'DII305', name: 'Software Arch', type: 'Lab' },
                                { day: 'วันพฤหัสบดี', time: '09:00 - 12:00', code: 'DII101', name: 'Intro to CS', type: 'Lecture' },
                            ].map((slot, idx) => (
                                <div key={idx} className="flex justify-between items-center p-3 border rounded-lg bg-gray-50">
                                    <div>
                                        <div className="font-semibold text-gray-900">{slot.day}</div>
                                        <div className="text-sm text-gray-500">{slot.time}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-bold text-green-700">{slot.code}</div>
                                        <Badge variant="outline">{slot.type}</Badge>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>รายการภาระงานอื่นๆ</CardTitle>
                        <CardDescription>งานบริการวิชาการและงานบริหาร</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-2">
                                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                                <div>
                                    <p className="font-medium">กรรมการสอบโครงงาน</p>
                                    <p className="text-sm text-gray-500">สอบหัวข้อโครงงานนักศึกษาชั้นปีที่ 4 (15 คน)</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-2">
                                <div className="w-2 h-2 rounded-full bg-purple-500 mt-2"></div>
                                <div>
                                    <p className="font-medium">อาจารย์ที่ปรึกษาชมรม</p>
                                    <p className="text-sm text-gray-500">ชมรม AI & Robotics</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-2">
                                <div className="w-2 h-2 rounded-full bg-orange-500 mt-2"></div>
                                <div>
                                    <p className="font-medium">วิทยากรรับเชิญ</p>
                                    <p className="text-sm text-gray-500">งาน Open House 2024</p>
                                </div>
                            </li>
                        </ul>

                        <Button variant="outline" className="w-full mt-6">
                            <Download className="w-4 h-4 mr-2" />
                            ดาวน์โหลดรายงานภาระงาน (TOR)
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </motion.div>
    );
}
