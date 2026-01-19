import React from 'react';
import { motion } from 'framer-motion';
import { Users, Shield, Plus, Search, Edit, Trash2, Mail, UserCog, Building, GraduationCap } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ThemedPageHeader } from '@/components/common/ThemedPageHeader';
import { mockStudents, mockLecturers, mockStaffUsers, mockCompanies } from '@/lib/mockData';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

export default function UsersPage() {
    const [searchQuery, setSearchQuery] = React.useState('');
    const totalUsers = mockStudents.length + mockLecturers.length + mockStaffUsers.length + mockCompanies.length;

    const getRoleBadge = (role: string) => {
        switch (role) {
            case 'student': return <Badge className="bg-blue-100 text-blue-700">นักศึกษา</Badge>;
            case 'lecturer': return <Badge className="bg-emerald-100 text-emerald-700">อาจารย์</Badge>;
            case 'staff': return <Badge className="bg-purple-100 text-purple-700">เจ้าหน้าที่</Badge>;
            case 'company': return <Badge className="bg-orange-100 text-orange-700">บริษัท</Badge>;
            default: return <Badge>{role}</Badge>;
        }
    };

    return (
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
            <ThemedPageHeader
                title="จัดการผู้ใช้งาน"
                subtitle={`ผู้ใช้ทั้งหมด ${totalUsers} คน`}
                icon={<Users className="w-7 h-7" />}
                actions={
                    <Button className="bg-gradient-to-r from-purple-500 to-violet-500 shadow-lg">
                        <Plus className="w-4 h-4 mr-2" />เพิ่มผู้ใช้ใหม่
                    </Button>
                }
            />

            <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: 'นักศึกษา', value: mockStudents.length, gradient: 'from-blue-500 to-indigo-500', icon: GraduationCap },
                    { label: 'อาจารย์', value: mockLecturers.length, gradient: 'from-emerald-500 to-teal-500', icon: Users },
                    { label: 'เจ้าหน้าที่', value: mockStaffUsers.length, gradient: 'from-purple-500 to-pink-500', icon: UserCog },
                    { label: 'บริษัท', value: mockCompanies.length, gradient: 'from-orange-500 to-amber-500', icon: Building },
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
                <div className="flex gap-4 mb-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input placeholder="ค้นหาผู้ใช้..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
                    </div>
                </div>

                <Tabs defaultValue="students" className="space-y-4">
                    <TabsList className="bg-white/80 backdrop-blur-sm border shadow-sm">
                        <TabsTrigger value="students">นักศึกษา ({mockStudents.length})</TabsTrigger>
                        <TabsTrigger value="lecturers">อาจารย์ ({mockLecturers.length})</TabsTrigger>
                        <TabsTrigger value="staff">เจ้าหน้าที่ ({mockStaffUsers.length})</TabsTrigger>
                        <TabsTrigger value="companies">บริษัท ({mockCompanies.length})</TabsTrigger>
                    </TabsList>

                    <TabsContent value="students">
                        <Card><CardContent className="pt-6">
                            <div className="space-y-3">
                                {mockStudents.map((user) => (
                                    <div key={user.id} className="flex items-center justify-between p-4 border rounded-xl hover:shadow-md transition-all">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold">{user.nameThai.charAt(0)}</div>
                                            <div>
                                                <div className="font-semibold">{user.nameThai}</div>
                                                <div className="text-sm text-gray-600">{user.email}</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            {getRoleBadge(user.role)}
                                            <Badge variant={user.isActive ? 'default' : 'secondary'}>{user.isActive ? 'Active' : 'Inactive'}</Badge>
                                            <Button size="sm" variant="ghost"><Edit className="w-4 h-4" /></Button>
                                            <Button size="sm" variant="ghost"><Mail className="w-4 h-4" /></Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent></Card>
                    </TabsContent>

                    <TabsContent value="lecturers">
                        <Card><CardContent className="pt-6">
                            <div className="space-y-3">
                                {mockLecturers.map((user) => (
                                    <div key={user.id} className="flex items-center justify-between p-4 border rounded-xl hover:shadow-md transition-all">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold">{user.nameThai.charAt(0)}</div>
                                            <div>
                                                <div className="font-semibold">{user.nameThai}</div>
                                                <div className="text-sm text-gray-600">{user.department}</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            {getRoleBadge(user.role)}
                                            <Button size="sm" variant="ghost"><Edit className="w-4 h-4" /></Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent></Card>
                    </TabsContent>

                    <TabsContent value="staff">
                        <Card><CardContent className="pt-6">
                            <div className="space-y-3">
                                {mockStaffUsers.map((user) => (
                                    <div key={user.id} className="flex items-center justify-between p-4 border rounded-xl hover:shadow-md transition-all">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-white font-bold">{user.nameThai.charAt(0)}</div>
                                            <div>
                                                <div className="font-semibold">{user.nameThai}</div>
                                                <div className="text-sm text-gray-600">{user.position}</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            {getRoleBadge(user.role)}
                                            <Button size="sm" variant="ghost"><Shield className="w-4 h-4" /></Button>
                                            <Button size="sm" variant="ghost"><Edit className="w-4 h-4" /></Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent></Card>
                    </TabsContent>

                    <TabsContent value="companies">
                        <Card><CardContent className="pt-6">
                            <div className="space-y-3">
                                {mockCompanies.map((company) => (
                                    <div key={company.id} className="flex items-center justify-between p-4 border rounded-xl hover:shadow-md transition-all">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center text-white font-bold">{company.companyNameThai.charAt(0)}</div>
                                            <div>
                                                <div className="font-semibold">{company.companyNameThai}</div>
                                                <div className="text-sm text-gray-600">{company.industry}</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            {getRoleBadge(company.role)}
                                            <Button size="sm" variant="ghost"><Edit className="w-4 h-4" /></Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent></Card>
                    </TabsContent>
                </Tabs>
            </motion.div>
        </motion.div>
    );
}
