import React from 'react';
import { motion } from 'framer-motion';
import { Users, UserPlus, Phone, Mail, FileText, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ThemedPageHeader } from '@/components/common/ThemedPageHeader';
import { mockLecturers, mockStaffUsers } from '@/lib/mockData';

export default function Personnel() {
    const allPersonnel = [...mockLecturers, ...mockStaffUsers];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
        >
            <ThemedPageHeader
                title="บริหารงานบุคคล"
                subtitle={`บุคลากรทั้งหมด ${allPersonnel.length} คน`}
                icon={<Users className="w-7 h-7" />}
                gradient="purple"
                actions={
                    <Button className="bg-purple-600 hover:bg-purple-700">
                        <UserPlus className="w-4 h-4 mr-2" />
                        เพิ่มบุคลากร
                    </Button>
                }
            />

            <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border">
                <div className="relative w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input placeholder="ค้นหาชื่อ, ตำแหน่ง, สังกัด..." className="pl-10" />
                </div>
                <div className="flex gap-2">
                    <Button variant="outline">ส่งออก Excel</Button>
                    <Button variant="outline">พิมพ์รายงาน</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allPersonnel.map((person, idx) => (
                    <motion.div
                        key={person.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                    >
                        <Card className="hover:shadow-lg transition-all border-t-4 border-t-purple-500">
                            <CardHeader className="pb-2">
                                <div className="flex justify-between items-start">
                                    <div className="flex gap-4">
                                        <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center text-xl font-bold text-gray-500">
                                            {person.nameThai.charAt(0)}
                                        </div>
                                        <div>
                                            <CardTitle className="text-lg">{person.nameThai}</CardTitle>
                                            <div className="text-sm text-gray-500 mt-1">
                                                {person.role === 'lecturer' ? 'อาจารย์' : 'เจ้าหน้าที่'} • {person.department || (person as any).position || 'CAMT'}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2 mt-2 text-sm">
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <Mail className="w-4 h-4" />
                                        {person.email}
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <Phone className="w-4 h-4" />
                                        053-942-xxx
                                    </div>
                                </div>

                                <div className="flex gap-2 mt-4 pt-4 border-t">
                                    <Button size="sm" variant="outline" className="flex-1">
                                        <FileText className="w-4 h-4 mr-2" />
                                        ประวัติ
                                    </Button>
                                    <Button size="sm" variant="outline" className="flex-1 text-purple-600 border-purple-200 hover:bg-purple-50">
                                        จัดการ
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}
