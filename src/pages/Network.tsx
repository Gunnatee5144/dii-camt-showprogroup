import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Building, Search, MapPin, Users, Handshake, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ThemedPageHeader } from '@/components/common/ThemedPageHeader';
import { mockCompanies } from '@/lib/mockData';

export default function Network() {
    const [searchQuery, setSearchQuery] = React.useState('');

    const filteredCompanies = mockCompanies.filter(c =>
        c.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.companyNameThai.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
        >
            <ThemedPageHeader
                title="ฐานข้อมูลเครือข่าย"
                subtitle={`พันธมิตรและสถานประกอบการทั้งหมด ${mockCompanies.length} แห่ง`}
                icon={<Globe className="w-7 h-7" />}
                gradient="orange"
                actions={
                    <Button className="bg-orange-600 hover:bg-orange-700">
                        <Building className="w-4 h-4 mr-2" />
                        เพิ่มสถานประกอบการ
                    </Button>
                }
            />

            {/* Search */}
            <div className="flex gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                        placeholder="ค้นหาชื่อบริษัท, อุตสาหกรรม..."
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        className="pl-10"
                    />
                </div>
                <Button variant="outline">ตัวกรองอุตสาหกรรม</Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredCompanies.map((company, index) => (
                    <motion.div
                        key={company.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Card className="h-full hover:shadow-lg transition-shadow border-l-4 border-l-orange-500">
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <div className="flex gap-4">
                                        <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center text-2xl font-bold text-gray-400">
                                            {company.companyName.charAt(0)}
                                        </div>
                                        <div>
                                            <CardTitle className="text-xl">{company.companyName}</CardTitle>
                                            <CardDescription className="text-base mt-1">{company.companyNameThai}</CardDescription>
                                            <Badge variant="outline" className="mt-2">{company.industry}</Badge>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="icon">
                                        <ExternalLink className="w-4 h-4 text-gray-400" />
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <MapPin className="w-4 h-4" />
                                        <span className="truncate">{company.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <Users className="w-4 h-4" />
                                        <span>50-200 คน (ขนาดกลาง)</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <Handshake className="w-4 h-4" />
                                        <span>MOU: Active</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <Globe className="w-4 h-4" />
                                        <span className="truncate">{company.website}</span>
                                    </div>
                                </div>

                                <div className="flex gap-2 mt-4 pt-4 border-t">
                                    <Button size="sm" variant="outline" className="flex-1">ส่งนักศึกษาฝึกงาน</Button>
                                    <Button size="sm" variant="outline" className="flex-1">แก้ไขข้อมูล</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}
