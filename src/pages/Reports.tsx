import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Users, BookOpen, Download, Calendar, PieChart, Activity } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockStudents, mockCourses, mockActivities } from '@/lib/mockData';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

export default function Reports() {
    const avgGPA = (mockStudents.reduce((sum, s) => sum + s.gpa, 0) / mockStudents.length).toFixed(2);
    const atRiskCount = mockStudents.filter(s => s.academicStatus === 'probation' || s.academicStatus === 'risk').length;
    const yearDistribution = [
        { year: 1, count: mockStudents.filter(s => s.year === 1).length },
        { year: 2, count: mockStudents.filter(s => s.year === 2).length },
        { year: 3, count: mockStudents.filter(s => s.year === 3).length },
        { year: 4, count: mockStudents.filter(s => s.year === 4).length },
    ];

    return (
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
            <motion.div variants={itemVariants} className="relative">
                <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-lg">
                        <BarChart3 className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-medium text-emerald-600">รายงานและสถิติ</span>
                </div>
                <div className="flex items-center justify-between">
                    <div>
                        <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-3xl font-bold text-gray-900">
                            <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">รายงานและสถิติ</span>
                        </motion.h1>
                        <p className="text-gray-500 mt-1">วิเคราะห์ข้อมูลภาพรวมของระบบ</p>
                    </div>
                    <Button variant="outline">
                        <Download className="w-4 h-4 mr-2" />ดาวน์โหลดรายงาน
                    </Button>
                </div>
            </motion.div>

            <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: 'นักศึกษาทั้งหมด', value: mockStudents.length, gradient: 'from-blue-500 to-indigo-500', icon: Users },
                    { label: 'GPA เฉลี่ย', value: avgGPA, gradient: 'from-emerald-500 to-teal-500', icon: TrendingUp },
                    { label: 'รายวิชา', value: mockCourses.length, gradient: 'from-purple-500 to-pink-500', icon: BookOpen },
                    { label: 'กิจกรรม', value: mockActivities.length, gradient: 'from-orange-500 to-amber-500', icon: Activity },
                ].map((stat, i) => (
                    <motion.div key={i} whileHover={{ scale: 1.02 }} className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${stat.gradient} p-6 text-white shadow-xl`}>
                        <div className="absolute -top-10 -right-10 w-28 h-28 bg-white/10 rounded-full blur-2xl" />
                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="p-2 rounded-xl bg-white/20"><stat.icon className="w-5 h-5" /></div>
                                <span className="font-medium text-white/90">{stat.label}</span>
                            </div>
                            <div className="text-4xl font-bold">{stat.value}</div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            <motion.div variants={itemVariants}>
                <Tabs defaultValue="academic" className="space-y-4">
                    <TabsList className="bg-white/80 backdrop-blur-sm border shadow-sm">
                        <TabsTrigger value="academic">ผลการเรียน</TabsTrigger>
                        <TabsTrigger value="students">นักศึกษา</TabsTrigger>
                        <TabsTrigger value="activities">กิจกรรม</TabsTrigger>
                    </TabsList>

                    <TabsContent value="academic" className="space-y-4">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <Card className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-3xl shadow-sm">
                                <CardHeader><CardTitle>การกระจายตัวของ GPA</CardTitle></CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {[
                                            { range: '3.50-4.00', count: mockStudents.filter(s => s.gpa >= 3.5).length, color: 'bg-emerald-500' },
                                            { range: '3.00-3.49', count: mockStudents.filter(s => s.gpa >= 3.0 && s.gpa < 3.5).length, color: 'bg-blue-500' },
                                            { range: '2.50-2.99', count: mockStudents.filter(s => s.gpa >= 2.5 && s.gpa < 3.0).length, color: 'bg-yellow-500' },
                                            { range: '2.00-2.49', count: mockStudents.filter(s => s.gpa >= 2.0 && s.gpa < 2.5).length, color: 'bg-orange-500' },
                                            { range: 'ต่ำกว่า 2.00', count: mockStudents.filter(s => s.gpa < 2.0).length, color: 'bg-red-500' },
                                        ].map((item) => (
                                            <div key={item.range}>
                                                <div className="flex justify-between text-sm mb-1">
                                                    <span>{item.range}</span>
                                                    <span className="font-semibold">{item.count} คน</span>
                                                </div>
                                                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                                                    <div className={`h-full ${item.color} rounded-full`} style={{ width: `${(item.count / mockStudents.length) * 100}%` }} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-3xl shadow-sm">
                                <CardHeader><CardTitle>สถานะนักศึกษา</CardTitle></CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {[
                                            { label: 'สถานะปกติ', count: mockStudents.filter(s => s.academicStatus === 'normal').length, color: 'bg-emerald-500' },
                                            { label: 'ทดลอง', count: mockStudents.filter(s => s.academicStatus === 'probation').length, color: 'bg-orange-500' },
                                            { label: 'เสี่ยง', count: mockStudents.filter(s => s.academicStatus === 'risk').length, color: 'bg-red-500' },
                                        ].map((item) => (
                                            <div key={item.label} className="flex items-center justify-between p-4 border rounded-xl">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-3 h-3 rounded-full ${item.color}`} />
                                                    <span>{item.label}</span>
                                                </div>
                                                <span className="font-bold text-xl">{item.count}</span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    <TabsContent value="students">
                        <Card className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-3xl shadow-sm">
                            <CardHeader><CardTitle>จำนวนนักศึกษาแยกตามชั้นปี</CardTitle></CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-4 gap-4">
                                    {yearDistribution.map((item) => (
                                        <div key={item.year} className="text-center p-6 border rounded-xl">
                                            <div className="text-sm text-gray-600 mb-2">ชั้นปีที่ {item.year}</div>
                                            <div className="text-4xl font-bold text-primary">{item.count}</div>
                                            <div className="text-xs text-gray-500 mt-1">คน</div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="activities">
                        <Card className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-3xl shadow-sm">
                            <CardHeader><CardTitle>สรุปกิจกรรม</CardTitle></CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                    {[
                                        { label: 'กิจกรรมทั้งหมด', value: mockActivities.length },
                                        { label: 'กำลังจะมาถึง', value: mockActivities.filter(a => a.status === 'upcoming').length },
                                        { label: 'เสร็จสิ้นแล้ว', value: mockActivities.filter(a => a.status === 'completed').length },
                                        { label: 'ชั่วโมงรวม', value: mockActivities.reduce((sum, a) => sum + a.activityHours, 0) },
                                    ].map((item) => (
                                        <div key={item.label} className="text-center p-4 bg-gray-50 rounded-xl">
                                            <div className="text-sm text-gray-600 mb-1">{item.label}</div>
                                            <div className="text-2xl font-bold">{item.value}</div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </motion.div>
        </motion.div>
    );
}
