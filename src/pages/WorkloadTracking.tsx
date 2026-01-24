import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Users, Clock, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ThemedPageHeader } from '@/components/common/ThemedPageHeader';
import { mockLecturers } from '@/lib/mockData';

export default function WorkloadTracking() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
        >
            <ThemedPageHeader
                title="ติดตามภาระงานอาจารย์"
                subtitle="ภาพรวมภาระงานสอนและงานวิชาการของคณาจารย์"
                icon={<BarChart3 className="w-7 h-7" />}
                gradient="purple"
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Overall Status */}
                <Card className="lg:col-span-1 bg-purple-50 border-purple-200">
                    <CardHeader><CardTitle>สถานะภาพรวม</CardTitle></CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            <div>
                                <p className="text-sm text-gray-600 mb-2">ภาระงานสอนเฉลี่ย</p>
                                <div className="flex items-end gap-2">
                                    <span className="text-4xl font-bold text-purple-700">14.5</span>
                                    <span className="text-sm text-gray-500 mb-1">ชม./สัปดาห์</span>
                                </div>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 mb-2">อาจารย์ที่มีภาระงานเกินเกณฑ์</p>
                                <div className="flex items-center gap-2 text-red-600">
                                    <AlertTriangle className="w-5 h-5" />
                                    <span className="font-bold">3 ท่าน</span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Lecturer List */}
                <Card className="lg:col-span-2">
                    <CardHeader><CardTitle>รายละเอียดรายบุคคล</CardTitle></CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {mockLecturers.map((lecturer, idx) => {
                                const workload = Math.floor(Math.random() * 10) + 8; // Random 8-18 hours
                                const percentage = (workload / 15) * 100;
                                return (
                                    <div key={idx} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold">
                                            {lecturer.nameThai.charAt(0)}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between mb-1">
                                                <h4 className="font-medium text-gray-900">{lecturer.nameThai}</h4>
                                                <span className="text-sm font-medium text-gray-600">{workload} ชม.</span>
                                            </div>
                                            <Progress value={percentage} className={`h-2 ${percentage > 100 ? 'bg-red-100' : 'bg-gray-100'}`}>
                                                <div className={`h-full rounded-full ${percentage > 100 ? 'bg-red-500' : 'bg-green-500'}`} style={{ width: `${Math.min(percentage, 100)}%` }} />
                                            </Progress>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </motion.div>
    );
}
