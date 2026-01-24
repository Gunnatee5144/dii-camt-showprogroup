import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import { CalendarCheck, Users, Clock, Save, FileSpreadsheet, Percent } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ThemedPageHeader } from '@/components/common/ThemedPageHeader';
import { mockCourses } from '@/lib/mockData';

export default function Attendance() {
    const { user } = useAuth();
    const [selectedCourse, setSelectedCourse] = React.useState(mockCourses[0]?.id || '');
    const [date, setDate] = React.useState(new Date().toISOString().split('T')[0]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
        >
            <ThemedPageHeader
                title="เช็คชื่อเข้าเรียน"
                subtitle="บันทึกการเข้าเรียนและดูสถิติการมาเรียนของนักศึกษา"
                icon={<CalendarCheck className="w-7 h-7" />}
                gradient="green"
            />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="md:col-span-1 h-fit">
                    <CardHeader>
                        <CardTitle>ตั้งค่าการเช็คชื่อ</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">รายวิชา</label>
                            <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                                <SelectTrigger>
                                    <SelectValue placeholder="เลือกรายวิชา" />
                                </SelectTrigger>
                                <SelectContent>
                                    {mockCourses.slice(0, 3).map(c => (
                                        <SelectItem key={c.id} value={c.id}>{c.code} {c.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">วันที่</label>
                            <Input type="date" value={date} onChange={e => setDate(e.target.value)} />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">คาบเรียน</label>
                            <Select defaultValue="1">
                                <SelectTrigger>
                                    <SelectValue placeholder="เลือกคาบ" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1">09:00 - 12:00 (Lecture)</SelectItem>
                                    <SelectItem value="2">13:00 - 16:00 (Lab)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <Button className="w-full bg-green-600 hover:bg-green-700">
                            <CalendarCheck className="w-4 h-4 mr-2" />
                            เริ่มเช็คชื่อ
                        </Button>

                        <Button variant="outline" className="w-full">
                            <FileSpreadsheet className="w-4 h-4 mr-2" />
                            รายงานสรุป
                        </Button>
                    </CardContent>
                </Card>

                <Card className="md:col-span-3">
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <div>
                                <CardTitle>รายชื่อนักศึกษา</CardTitle>
                                <CardDescription>วิชา Advanced AI • Sec 001</CardDescription>
                            </div>
                            <div className="flex gap-2 text-sm text-gray-500">
                                <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-green-500"></div> มา 42</div>
                                <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-yellow-500"></div> สาย 2</div>
                                <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-red-500"></div> ขาด 1</div>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-md border">
                            <table className="w-full text-sm">
                                <thead className="bg-gray-50 border-b">
                                    <tr>
                                        <th className="h-10 px-4 text-left font-medium">รหัสนักศึกษา</th>
                                        <th className="h-10 px-4 text-left font-medium">ชื่อ-สกุล</th>
                                        <th className="h-10 px-4 text-center font-medium">สถานะ</th>
                                        <th className="h-10 px-4 text-left font-medium">หมายเหตุ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.from({ length: 15 }).map((_, i) => (
                                        <tr key={i} className="border-b hover:bg-gray-50/50">
                                            <td className="p-4 font-medium">642110{100 + i}</td>
                                            <td className="p-4">นักศึกษา {i + 1}</td>
                                            <td className="p-4 text-center">
                                                <div className="flex justify-center gap-1">
                                                    <Button size="sm" variant={i === 5 ? "ghost" : "default"} className={i === 5 ? "text-gray-400" : "bg-green-500 hover:bg-green-600 h-8 px-2"}>มา</Button>
                                                    <Button size="sm" variant={i === 5 ? "default" : "ghost"} className={i === 5 ? "bg-yellow-500 hover:bg-yellow-600 h-8 px-2" : "text-gray-400"}>สาย</Button>
                                                    <Button size="sm" variant="ghost" className="text-gray-400 h-8 px-2">ขาด</Button>
                                                    <Button size="sm" variant="ghost" className="text-gray-400 h-8 px-2">ลา</Button>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <Input className="h-8" placeholder="ระบุเหตุผล..." />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="flex justify-between items-center mt-6">
                            <div className="text-sm text-gray-500">
                                บันทึกล่าสุด: วันนี้ 09:15 น.
                            </div>
                            <Button className="bg-green-600 hover:bg-green-700">
                                <Save className="w-4 h-4 mr-2" />
                                บันทึกข้อมูล
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </motion.div>
    );
}
