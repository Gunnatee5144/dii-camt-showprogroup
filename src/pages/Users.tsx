import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Shield, Plus, Search, Edit, Trash2, Mail, UserCog, Building, GraduationCap, Save, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockStudents, mockLecturers, mockStaffUsers, mockCompanies } from '@/lib/mockData';
import { toast } from 'sonner';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

export default function UsersPage() {
    const [searchQuery, setSearchQuery] = useState('');
    // Merge all mock users into one state for CRUD simulation
    const [users, setUsers] = useState([
        ...mockStudents.map(u => ({ ...u, type: 'student', name: u.nameThai, roleLabel: 'นักศึกษา' })),
        ...mockLecturers.map(u => ({ ...u, type: 'lecturer', name: u.nameThai, roleLabel: 'อาจารย์' })),
        ...mockStaffUsers.map(u => ({ ...u, type: 'staff', name: u.nameThai, roleLabel: 'เจ้าหน้าที่' })),
        ...mockCompanies.map(u => ({ ...u, type: 'company', name: u.companyNameThai, roleLabel: 'บริษัท' })),
    ]);

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<any>(null);
    const [formData, setFormData] = useState<any>({ name: '', email: '', role: 'student', status: 'active' });

    const totalUsers = users.length;

    const handleAdd = () => {
        setEditingUser(null);
        setFormData({ name: '', email: '', role: 'student', status: 'active' });
        setIsDialogOpen(true);
    };

    const handleEdit = (user: any) => {
        setEditingUser(user);
        setFormData({ name: user.name, email: user.email || '', role: user.type, status: 'active' });
        setIsDialogOpen(true);
    };

    const handleDelete = (id: string) => {
        if (confirm('คุณแน่ใจหรือไม่ที่จะลบผู้ใช้นี้?')) {
            setUsers(users.filter(u => u.id !== id));
            toast.success('ลบผู้ใช้งานเรียบร้อยแล้ว');
        }
    };

    const handleSave = () => {
        if (editingUser) {
            setUsers(users.map(u => u.id === editingUser.id ? { ...u, ...formData, type: formData.role } : u));
            toast.success('แก้ไขข้อมูลผู้ใช้เรียบร้อยแล้ว');
        } else {
            const newUser = {
                id: Math.random().toString(36).substr(2, 9),
                ...formData,
                type: formData.role,
                image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop',
            };
            setUsers([...users, newUser]);
            toast.success('เพิ่มผู้ใช้ใหม่เรียบร้อยแล้ว');
        }
        setIsDialogOpen(false);
    };

    const getRoleBadge = (role: string) => {
        switch (role) {
            case 'student': return <Badge className="bg-blue-100 text-blue-700">นักศึกษา</Badge>;
            case 'lecturer': return <Badge className="bg-emerald-100 text-emerald-700">อาจารย์</Badge>;
            case 'staff': return <Badge className="bg-purple-100 text-purple-700">เจ้าหน้าที่</Badge>;
            case 'company': return <Badge className="bg-orange-100 text-orange-700">บริษัท</Badge>;
            default: return <Badge>{role}</Badge>;
        }
    };

    const filteredUsers = users.filter(u =>
    (u.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email?.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
            <motion.div variants={itemVariants} className="relative">
                <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500 to-violet-500 text-white shadow-lg">
                        <Users className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-medium text-purple-600">จัดการผู้ใช้งาน</span>
                </div>
                <div className="flex items-center justify-between">
                    <div>
                        <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-3xl font-bold text-gray-900">
                            <span className="bg-gradient-to-r from-purple-500 to-violet-500 bg-clip-text text-transparent">จัดการผู้ใช้งาน</span>
                        </motion.h1>
                        <p className="text-gray-500 mt-1">{`ผู้ใช้ทั้งหมด ${totalUsers} คน`}</p>
                    </div>
                    <Button onClick={handleAdd} className="bg-gradient-to-r from-purple-500 to-violet-500 shadow-lg">
                        <Plus className="w-4 h-4 mr-2" />เพิ่มผู้ใช้ใหม่
                    </Button>
                </div>
            </motion.div>

            <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: 'นักศึกษา', value: users.filter(u => u.type === 'student').length, gradient: 'from-blue-500 to-indigo-500', icon: GraduationCap },
                    { label: 'อาจารย์', value: users.filter(u => u.type === 'lecturer').length, gradient: 'from-emerald-500 to-teal-500', icon: Users },
                    { label: 'เจ้าหน้าที่', value: users.filter(u => u.type === 'staff').length, gradient: 'from-purple-500 to-pink-500', icon: UserCog },
                    { label: 'บริษัท', value: users.filter(u => u.type === 'company').length, gradient: 'from-orange-500 to-amber-500', icon: Building },
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
                        <Input placeholder="ค้นหาชื่อ, อีเมล..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
                    </div>
                </div>

                <Tabs defaultValue="all" className="space-y-4">
                    <TabsList className="bg-white/80 backdrop-blur-sm border shadow-sm">
                        <TabsTrigger value="all">ทั้งหมด</TabsTrigger>
                        <TabsTrigger value="student">นักศึกษา</TabsTrigger>
                        <TabsTrigger value="lecturer">อาจารย์</TabsTrigger>
                        <TabsTrigger value="staff">เจ้าหน้าที่</TabsTrigger>
                        <TabsTrigger value="company">บริษัท</TabsTrigger>
                    </TabsList>

                    {['all', 'student', 'lecturer', 'staff', 'company'].map(tab => (
                        <TabsContent key={tab} value={tab}>
                            <Card className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-3xl shadow-sm"><CardContent className="pt-6">
                                <div className="space-y-3">
                                    <AnimatePresence>
                                        {filteredUsers.filter(u => tab === 'all' || u.type === tab).map((user) => (
                                            <motion.div
                                                layout
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                key={user.id}
                                                className="flex items-center justify-between p-4 border rounded-xl hover:shadow-md transition-all bg-white"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br flex items-center justify-center text-white font-bold text-lg
                                                        ${user.type === 'student' ? 'from-blue-400 to-blue-600' :
                                                            user.type === 'lecturer' ? 'from-green-400 to-green-600' :
                                                                user.type === 'staff' ? 'from-purple-400 to-purple-600' : 'from-orange-400 to-orange-600'}`}
                                                    >
                                                        {user.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <div className="font-semibold text-gray-900">{user.name}</div>
                                                        <div className="text-sm text-gray-500">{user.email || 'No email'}</div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    {getRoleBadge(user.type)}
                                                    <div className="flex gap-1">
                                                        <Button size="sm" variant="ghost" onClick={() => handleEdit(user)}>
                                                            <Edit className="w-4 h-4 text-gray-500" />
                                                        </Button>
                                                        <Button size="sm" variant="ghost" onClick={() => handleDelete(user.id)} className="text-red-500 hover:text-red-600 hover:bg-red-50">
                                                            <Trash2 className="w-4 h-4" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                    {filteredUsers.filter(u => tab === 'all' || u.type === tab).length === 0 && (
                                        <div className="text-center py-12 text-gray-500">
                                            ไม่พบข้อมูลผู้ใช้งาน
                                        </div>
                                    )}
                                </div>
                            </CardContent></Card>
                        </TabsContent>
                    ))}
                </Tabs>
            </motion.div>

            {/* User Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{editingUser ? 'แก้ไขผู้ใช้งาน' : 'เพิ่มผู้ใช้ใหม่'}</DialogTitle>
                        <DialogDescription>กรอกข้อมูลผู้ใช้งานด้านล่าง</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label>ชื่อ-นามสกุล / ชื่อบริษัท</Label>
                            <Input
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="เช่น สมชาย ใจดี"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>อีเมล</Label>
                            <Input
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="email@example.com"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>บทบาท</Label>
                            <Select
                                value={formData.role}
                                onValueChange={(val) => setFormData({ ...formData, role: val })}
                                disabled={!!editingUser} // Prevent role change on edit for simplicity
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="student">นักศึกษา</SelectItem>
                                    <SelectItem value="lecturer">อาจารย์</SelectItem>
                                    <SelectItem value="staff">เจ้าหน้าที่</SelectItem>
                                    <SelectItem value="company">บริษัท</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>ยกเลิก</Button>
                        <Button onClick={handleSave} className="bg-purple-600 hover:bg-purple-700">
                            <Save className="w-4 h-4 mr-2" />
                            บันทึก
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </motion.div>
    );
}
