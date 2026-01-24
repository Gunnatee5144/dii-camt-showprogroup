import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Check, Shield, Zap, Star } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ThemedPageHeader } from '@/components/common/ThemedPageHeader';

export default function Subscription() {
    const plans = [
        {
            name: 'Basic',
            price: 'ฟรี',
            description: 'สำหรับเริ่มต้นใช้งาน',
            features: ['ลงประกาศงานฟรี 1 ตำแหน่ง', 'ดูโปรไฟล์นักศึกษา (จำกัดข้อมูล)', 'ไม่มีตราสัญลักษณ์ Verified'],
            current: false,
        },
        {
            name: 'Professional',
            price: '฿5,000 / ปี',
            description: 'สำหรับบริษัทที่ต้องการหาบุคลากร',
            features: ['ลงประกาศงานได้ 5 ตำแหน่ง', 'ดูโปรไฟล์นักศึกษาได้ไม่จำกัด', 'ตราสัญลักษณ์ Verified', 'แนะนำผู้สมัครที่ตรงเงื่อนไข'],
            current: true,
            highlight: true,
        },
        {
            name: 'Enterprise',
            price: '฿15,000 / ปี',
            description: 'สำหรับองค์กรขนาดใหญ่',
            features: ['ลงประกาศงานไม่จำกัด', 'ระบบคัดกรองผู้สมัคร AI', 'Priority Support', 'เข้าร่วม Job Fair ฟรี', 'เข้าถึงฐานข้อมูลศิษย์เก่า'],
            current: false,
        },
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
        >
            <ThemedPageHeader
                title="แพ็คเกจสมาชิก"
                subtitle="เลือกแพ็คเกจที่เหมาะสมกับองค์กรของคุณ"
                icon={<CreditCard className="w-7 h-7" />}
                gradient="orange"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {plans.map((plan, index) => (
                    <Card
                        key={index}
                        className={`relative flex flex-col ${plan.highlight ? 'border-orange-500 shadow-xl scale-105 z-10' : 'hover:shadow-lg transition-all'}`}
                    >
                        {plan.current && (
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-sm">
                                แพ็คเกจปัจจุบัน
                            </div>
                        )}
                        <CardHeader>
                            <CardTitle className="flex justify-between items-center">
                                {plan.name}
                                {plan.highlight && <Star className="w-5 h-5 text-orange-500 fill-orange-500" />}
                            </CardTitle>
                            <CardDescription>{plan.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1">
                            <div className="mb-6">
                                <span className="text-4xl font-bold">{plan.price}</span>
                            </div>
                            <ul className="space-y-3">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                                        <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Button
                                className={`w-full ${plan.highlight ? 'bg-orange-600 hover:bg-orange-700' : ''}`}
                                variant={plan.highlight ? 'default' : 'outline'}
                                disabled={plan.current}
                            >
                                {plan.current ? 'ใช้งานอยู่' : 'เลือกแพ็คเกจนี้'}
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>ประวัติการชำระเงิน</CardTitle>
                </CardHeader>
                <CardContent>
                    <table className="w-full text-sm text-left">
                        <thead className="text-gray-500 border-b">
                            <tr>
                                <th className="pb-3 font-medium">วันที่</th>
                                <th className="pb-3 font-medium">รายการ</th>
                                <th className="pb-3 font-medium">จำนวนเงิน</th>
                                <th className="pb-3 font-medium">สถานะ</th>
                                <th className="pb-3 font-medium text-right">ใบเสร็จ</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            <tr>
                                <td className="py-4">1 ม.ค. 2567</td>
                                <td>Professional Plan (1 ปี)</td>
                                <td>฿5,000</td>
                                <td><Badge className="bg-green-100 text-green-700 hover:bg-green-100">ชำระแล้ว</Badge></td>
                                <td className="text-right text-blue-600 hover:underline cursor-pointer">ดาวน์โหลด</td>
                            </tr>
                        </tbody>
                    </table>
                </CardContent>
            </Card>
        </motion.div>
    );
}
