import React from 'react';
import { motion } from 'framer-motion';
import { Activity, CheckCircle, XCircle, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ThemedPageHeader } from '@/components/common/ThemedPageHeader';

export default function ActivitiesManagement() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
        >
            <ThemedPageHeader
                title="จัดการกิจกรรม"
                subtitle="อนุมัติและจัดการกิจกรรมนักศึกษา"
                icon={<Activity className="w-7 h-7" />}
                gradient="purple"
            />

            <div className="flex gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input placeholder="ค้นหากิจกรรม..." className="pl-10" />
                </div>
            </div>

            <Card>
                <CardHeader><CardTitle>คำร้องขอกิจกรรมใหม่</CardTitle></CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {[
                            { title: 'ค่ายอาสาพัฒนาชนบท', org: 'ชมรมอาสา', date: '20-22 ต.ค. 2567', status: 'pending' },
                            { title: 'แข่งขันทักษะคอมพิวเตอร์', org: 'DII Club', date: '15 พ.ย. 2567', status: 'pending' },
                        ].map((act, idx) => (
                            <div key={idx} className="p-4 border rounded-xl flex items-center justify-between hover:bg-gray-50 transition-colors">
                                <div>
                                    <h4 className="font-semibold text-lg">{act.title}</h4>
                                    <p className="text-sm text-gray-600">{act.org} • {act.date}</p>
                                </div>
                                <div className="flex gap-2">
                                    <Button className="bg-emerald-500 hover:bg-emerald-600">
                                        <CheckCircle className="w-4 h-4 mr-2" />
                                        อนุมัติ
                                    </Button>
                                    <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                                        <XCircle className="w-4 h-4 mr-2" />
                                        ปฏิเสธ
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader><CardTitle>กิจกรรมที่อนุมัติแล้ว</CardTitle></CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        {[
                            { title: 'Orientation Day 2024', status: 'completed' },
                            { title: 'Sports Day', status: 'active' },
                        ].map((act, idx) => (
                            <div key={idx} className="flex justify-between p-3 border-b last:border-0 items-center">
                                <span className="font-medium">{act.title}</span>
                                <Badge variant={act.status === 'completed' ? 'secondary' : 'default'}>
                                    {act.status === 'completed' ? 'เสร็จสิ้น' : 'กำลังดำเนินการ'}
                                </Badge>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
