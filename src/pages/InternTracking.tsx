import React from 'react';
import { motion } from 'framer-motion';
import { Users, ClipboardList, CheckSquare } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ThemedPageHeader } from '@/components/common/ThemedPageHeader';

export default function InternTracking() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
        >
            <ThemedPageHeader
                title="ติดตามนักศึกษาฝึกงาน"
                subtitle="บันทึกเวลาและประเมินผลการปฏิบัติงาน"
                icon={<Users className="w-7 h-7" />}
                gradient="orange"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                    { name: 'นายณัฐพงษ์ ใจดี', position: 'Backend Developer', progress: 60, weeks: 8, totalWeeks: 12 },
                    { name: 'นางสาววิไลลักษณ์ สวยงาม', position: 'UX/UI Designer', progress: 45, weeks: 6, totalWeeks: 12 },
                ].map((intern, idx) => (
                    <Card key={idx} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-lg">
                                        {intern.name.charAt(0)}
                                    </div>
                                    <div>
                                        <CardTitle className="text-lg">{intern.name}</CardTitle>
                                        <p className="text-sm text-gray-500">{intern.position}</p>
                                    </div>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="mb-4">
                                <div className="flex justify-between text-sm mb-1">
                                    <span>ความคืบหน้าการฝึกงาน</span>
                                    <span>สัปดาห์ที่ {intern.weeks}/{intern.totalWeeks}</span>
                                </div>
                                <Progress value={intern.progress} className="h-2 bg-orange-100">
                                    <div className="h-full bg-orange-500 rounded-full" style={{ width: `${intern.progress}%` }} />
                                </Progress>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                                <Button variant="outline" className="w-full">
                                    <ClipboardList className="w-4 h-4 mr-2" />
                                    อนุมัติ Time Sheet
                                </Button>
                                <Button className="w-full bg-orange-600 hover:bg-orange-700">
                                    <CheckSquare className="w-4 h-4 mr-2" />
                                    ประเมินผล
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </motion.div>
    );
}
