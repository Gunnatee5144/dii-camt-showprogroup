import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, TrendingUp, TrendingDown, DollarSign, FileText, CreditCard, AlertCircle, Plus } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ThemedPageHeader } from '@/components/common/ThemedPageHeader';

export default function Budget() {
    const transactions = [
        { id: 1, type: 'expense', category: 'วัสดุสำนักงาน', amount: 5400, description: 'สั่งซื้อกระดาษ A4 40 รีม', date: '2024-03-15', status: 'approved' },
        { id: 2, type: 'expense', category: 'ครุภัณฑ์', amount: 25900, description: 'โปรเจคเตอร์ห้อง DII-302', date: '2024-03-12', status: 'pending' },
        { id: 3, type: 'income', category: 'งบประมาณ', amount: 500000, description: 'งบประมาณประจำภาคการศึกษา 1/2567', date: '2024-03-01', status: 'approved' },
        { id: 4, type: 'expense', category: 'ค่าจ้างบริการ', amount: 12000, description: 'ค่าทำความสะอาดเดือนกุมภาพันธ์', date: '2024-02-28', status: 'approved' },
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
        >
            <ThemedPageHeader
                title="งบประมาณและพัสดุ"
                subtitle="ติดตามการใช้งบประมาณและการเบิกจ่ายพัสดุ"
                icon={<CreditCard className="w-7 h-7" />}
                gradient="purple"
                actions={
                    <Button className="bg-purple-600 hover:bg-purple-700">
                        <Plus className="w-4 h-4 mr-2" />
                        ขอเบิกงบประมาณ
                    </Button>
                }
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white border-0 shadow-lg">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-white/90">
                            <DollarSign className="w-5 h-5" />
                            งบประมาณคงเหลือ
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold mb-2">฿456,700</div>
                        <p className="text-sm text-green-100 mb-4">จากทั้งหมด ฿1,000,000</p>
                        <Progress value={45.67} className="bg-green-800" />
                        <div className="flex justify-between items-center mt-2 text-xs text-green-100">
                            <span>ใช้ไป 54.33%</span>
                            <span>เหลือ 45.67%</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white border-0 shadow-lg">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-white/90">
                            <TrendingDown className="w-5 h-5" />
                            รายจ่ายเดือนนี้
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold mb-2">฿43,300</div>
                        <p className="text-sm text-blue-100 mb-4">+12.5% จากเดือนที่แล้ว</p>
                        <div className="grid grid-cols-2 gap-2 text-xs text-blue-100 mt-6">
                            <div className="bg-white/10 p-2 rounded">
                                <p>วัสดุ</p>
                                <p className="font-bold">฿12,500</p>
                            </div>
                            <div className="bg-white/10 p-2 rounded">
                                <p>ครุภัณฑ์</p>
                                <p className="font-bold">฿30,800</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-white shadow-lg">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-gray-700">
                            <PieChart className="w-5 h-5" />
                            สัดส่วนรายจ่าย
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[
                                { label: 'ครุภัณฑ์คอมพิวเตอร์', percent: 45, color: 'bg-blue-500' },
                                { label: 'วัสดุสำนักงาน', percent: 20, color: 'bg-green-500' },
                                { label: 'ค่าจ้างบริการ', percent: 15, color: 'bg-orange-500' },
                                { label: 'อื่นๆ', percent: 20, color: 'bg-gray-400' },
                            ].map((item, idx) => (
                                <div key={idx}>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-gray-600">{item.label}</span>
                                        <span className="font-bold">{item.percent}%</span>
                                    </div>
                                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                        <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.percent}%` }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>รายการล่าสุด</CardTitle>
                    <CardDescription>ประวัติการเบิกจ่ายและการอนุมัติงบประมาณ</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-1">
                        {transactions.map((transaction) => (
                            <div key={transaction.id} className="flex items-center justify-between p-4 border-b last:border-0 hover:bg-gray-50 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${transaction.type === 'expense' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
                                        }`}>
                                        {transaction.type === 'expense' ? <TrendingDown className="w-5 h-5" /> : <TrendingUp className="w-5 h-5" />}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900">{transaction.description}</h4>
                                        <p className="text-sm text-gray-500">{transaction.category} • {transaction.date}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className={`font-bold ${transaction.type === 'expense' ? 'text-red-600' : 'text-green-600'}`}>
                                        {transaction.type === 'expense' ? '-' : '+'}฿{transaction.amount.toLocaleString()}
                                    </div>
                                    <Badge variant={transaction.status === 'approved' ? 'default' : 'outline'} className={transaction.status === 'pending' ? 'text-orange-600 border-orange-200' : ''}>
                                        {transaction.status === 'approved' && 'อนุมัติแล้ว'}
                                        {transaction.status === 'pending' && 'รอตรวจสอบ'}
                                    </Badge>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
