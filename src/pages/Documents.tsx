import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Printer, File, Download, CheckCircle, Search, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ThemedPageHeader } from '@/components/common/ThemedPageHeader';

export default function Documents() {
    const docTemplates = [
        { title: 'หนังสือรับรองสถานภาพ', desc: 'ใบรับรองการเป็นนักศึกษา (ภาษาไทย/อังกฤษ)', icon: FileText },
        { title: 'Transcript', desc: 'ใบแสดงผลการเรียน (อย่างไม่เป็นทางการ)', icon: FileText },
        { title: 'หนังสือขอความอนุเคราะห์', desc: 'หนังสือขอความอนุเคราะห์ฝึกงาน/สหกิจ', icon: File },
        { title: 'หนังสือลากิจ/ลาป่วย', desc: 'แบบฟอร์มการลาสำหรับนักศึกษา', icon: FileText },
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
        >
            <ThemedPageHeader
                title="ออกเอกสารสำคัญ"
                subtitle="ระบบสร้างเอกสารราชการและหนังสือรับรองอัตโนมัติ"
                icon={<Printer className="w-7 h-7" />}
                gradient="blue"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {docTemplates.map((doc, idx) => (
                    <Card key={idx} className="hover:shadow-lg transition-all cursor-pointer border-l-4 border-l-blue-500">
                        <CardHeader>
                            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center mb-2">
                                <doc.icon className="w-6 h-6 text-blue-600" />
                            </div>
                            <CardTitle className="text-lg">{doc.title}</CardTitle>
                            <CardDescription>{doc.desc}</CardDescription>
                        </CardHeader>
                    </Card>
                ))}
            </div>

            <div className="space-y-4">
                <h3 className="text-lg font-semibold">รายการขอเอกสารล่าสุด</h3>

                <Card>
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <CardTitle className="text-base">คำร้องที่รอดำเนินการ</CardTitle>
                            <div className="relative w-64">
                                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                                <Input placeholder="ค้นหาคำร้อง..." className="pl-8" />
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                                            <Clock className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="font-semibold">นายทดสอบ นักศึกษา ({642110000 + i})</p>
                                            <p className="text-sm text-gray-500">ขอใบรับรองสถานภาพ • ยื่นเมื่อ 2 ชั่วโมงที่แล้ว</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button size="sm" variant="outline">ดูรายละเอียด</Button>
                                        <Button size="sm" className="bg-blud-600">
                                            <Printer className="w-4 h-4 mr-2" />
                                            ออกเอกสาร
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">ประวัติการออกเอกสาร</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            {[1, 2].map((i) => (
                                <div key={i} className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50 bg-gray-50/50">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                            <CheckCircle className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-700">นายตัวอย่าง สุขใจ ({642110010 + i})</p>
                                            <p className="text-sm text-gray-500">Transcript • ออกเมื่อ 15 มี.ค. 2567</p>
                                        </div>
                                    </div>
                                    <Button size="sm" variant="outline" className="text-gray-500">
                                        <Download className="w-4 h-4 mr-2" />
                                        ดาวน์โหลดซ้ำ
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </motion.div>
    );
}
