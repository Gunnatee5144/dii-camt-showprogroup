import React from 'react';
import { motion } from 'framer-motion';
import { Handshake, FileText, CheckCircle, Clock, Calendar, Download } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ThemedPageHeader } from '@/components/common/ThemedPageHeader';

export default function Cooperation() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
        >
            <ThemedPageHeader
                title="สถานะความร่วมมือ"
                subtitle="จัดการข้อตกลงและบันทึกความเข้าใจ (MOU)"
                icon={<Handshake className="w-7 h-7" />}
                gradient="orange"
            />

            {/* MOU Status Card */}
            <Card className="border-l-4 border-l-emerald-500 shadow-lg">
                <CardHeader>
                    <div className="flex justify-between items-start">
                        <div>
                            <CardTitle className="text-xl flex items-center gap-2">
                                <CheckCircle className="w-5 h-5 text-emerald-500" />
                                สถานะ MOU: ใช้งานได้ (Active)
                            </CardTitle>
                            <CardDescription className="mt-2">
                                บันทึกข้อตกลงความร่วมมือทางวิชาการระหว่างมหาวิทยาลัยเชียงใหม่ และ บริษัท เทคอินโนเวชั่น จำกัด
                            </CardDescription>
                        </div>
                        <Badge className="bg-emerald-100 text-emerald-700 text-base py-1 px-3">Valid</Badge>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-2">
                        <div className="p-4 bg-gray-50 rounded-xl">
                            <p className="text-sm text-gray-500 mb-1">เลขที่สัญญา</p>
                            <p className="font-semibold text-lg">MOU-2567/042</p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-xl">
                            <p className="text-sm text-gray-500 mb-1">วันเริ่มสัญญา</p>
                            <p className="font-semibold text-lg">1 มกราคม 2567</p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-xl">
                            <p className="text-sm text-gray-500 mb-1">วันสิ้นสุดสัญญา</p>
                            <p className="font-semibold text-lg">31 ธันวาคม 2569</p>
                            <p className="text-xs text-orange-600 mt-1">เหลือเวลา 1 ปี 9 เดือน</p>
                        </div>
                    </div>

                    <div className="flex gap-3 mt-6">
                        <Button>
                            <Download className="w-4 h-4 mr-2" />
                            ดาวน์โหลดเอกสาร MOU
                        </Button>
                        <Button variant="outline">
                            ขอต่ออายุสัญญา
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Activities History */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Clock className="w-5 h-5" />
                            ประวัติกิจกรรมความร่วมมือ
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[
                                { title: 'รับนักศึกษาฝึกงาน', date: '1 มิ.ย. 2567', desc: 'รับนักศึกษาฝึกงานจำนวน 3 คน เข้าแผนก Software Development' },
                                { title: 'วิทยากรพิเศษ', date: '15 พ.ค. 2567', desc: 'บรรยายหัวข้อ Modern Web Architecture รายวิชา DII305' },
                                { title: 'สนับสนุนอุปกรณ์', date: '20 เม.ย. 2567', desc: 'บริจาคชุดอุปกรณ์ IoT Development Kit จำนวน 10 ชุด' },
                            ].map((item, idx) => (
                                <div key={idx} className="flex gap-4 pb-4 border-b last:border-0 last:pb-0">
                                    <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 flex-shrink-0">
                                        <Calendar className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">{item.title}</h4>
                                        <p className="text-sm text-gray-500">{item.date}</p>
                                        <p className="text-sm text-gray-700 mt-1">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Contact Person */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <FileText className="w-5 h-5" />
                            ผู้ประสานงานหลัก
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="p-4 border rounded-xl flex items-center gap-4 mb-4">
                            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xl font-bold">
                                อ
                            </div>
                            <div>
                                <p className="font-bold text-lg">อ.ดร. สมชาย ใจดี</p>
                                <p className="text-sm text-gray-600">หัวหน้าศูนย์ประสานงานอุตสาหกรรม</p>
                                <p className="text-sm text-gray-500 mt-1">โทร: 053-942-xxx</p>
                                <p className="text-sm text-gray-500">อีเมล: somchai@cmu.ac.th</p>
                            </div>
                        </div>
                        <Button className="w-full" variant="outline">ส่งข้อความติดต่อ</Button>
                    </CardContent>
                </Card>
            </div>
        </motion.div>
    );
}
