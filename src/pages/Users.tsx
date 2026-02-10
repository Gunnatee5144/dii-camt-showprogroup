import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Shield, Plus, Search, Edit, Trash2, Mail, UserCog, Building, GraduationCap, Save, X, Sparkles } from 'lucide-react';
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
import { useLanguage } from '@/contexts/LanguageContext';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

export default function UsersPage() {
    const { t } = useLanguage();
    const [searchQuery, setSearchQuery] = useState('');
    // Merge all mock users into one state for CRUD simulation
    const [users, setUsers] = useState([
        ...mockStudents.map(u => ({ ...u, type: 'student', name: u.nameThai, roleLabel: t.roles.student })),
        ...mockLecturers.map(u => ({ ...u, type: 'lecturer', name: u.nameThai, roleLabel: t.roles.lecturer })),
        ...mockStaffUsers.map(u => ({ ...u, type: 'staff', name: u.nameThai, roleLabel: t.roles.staff })),
        ...mockCompanies.map(u => ({ ...u, type: 'company', name: u.companyNameThai, roleLabel: t.roles.company })),
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
        if (confirm(t.users.deleteConfirm)) {
            setUsers(users.filter(u => u.id !== id));
            toast.success(t.users.deleteSuccess);
        }
    };

    const handleSave = () => {
        if (editingUser) {
            setUsers(users.map(u => u.id === editingUser.id ? { ...u, ...formData, type: formData.role } : u));
            toast.success(t.users.editSuccess);
        } else {
            const newUser = {
                id: Math.random().toString(36).substr(2, 9),
                ...formData,
                type: formData.role,
                image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop',
            };
            setUsers([...users, newUser]);
            toast.success(t.users.addSuccess);
        }
        setIsDialogOpen(false);
    };

    const getRoleBadge = (role: string) => {
        switch (role) {
            case 'student': return <Badge className="bg-blue-100 text-blue-700">{t.roles.student}</Badge>;
            case 'lecturer': return <Badge className="bg-emerald-100 text-emerald-700">{t.roles.lecturer}</Badge>;
            case 'staff': return <Badge className="bg-purple-100 text-purple-700">{t.roles.staff}</Badge>;
            case 'company': return <Badge className="bg-orange-100 text-orange-700">{t.roles.company}</Badge>;
            default: return <Badge>{role}</Badge>;
        }
    };

    const filteredUsers = users.filter(u =>
    (u.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email?.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8 pb-10">
            {/* Header Section - Bento Grid Style */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                <div>
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-2 text-slate-500 font-medium mb-2"
                    >
                        <Users className="w-4 h-4 text-purple-500" />
                        <span>{t.users.totalUsers} {totalUsers} {t.common.person}</span>
                    </motion.div>
                    <motion.h1
                        className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        {t.users.title}<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-violet-500">{t.users.titleHighlight}</span>
                    </motion.h1>
                </div>

                <motion.div className="flex gap-3" variants={itemVariants}>
                    <Button onClick={handleAdd} className="rounded-xl bg-slate-900 text-white hover:bg-slate-800 shadow-lg shadow-slate-900/20">
                        <Plus className="w-4 h-4 mr-2" />{t.users.addNew}
                    </Button>
                </motion.div>
            </div>

            {/* Stats Grid - Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <motion.div
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                    className="p-6 rounded-3xl bg-gradient-to-br from-purple-500 to-violet-600 text-white shadow-xl shadow-purple-500/20 relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2.5 rounded-xl bg-white/20 backdrop-blur-sm">
                                <GraduationCap className="w-6 h-6" />
                            </div>
                            <span className="font-medium text-white/90">{t.users.studentsLabel}</span>
                        </div>
                        <div className="text-5xl font-bold tracking-tight">{users.filter(u => u.type === 'student').length}</div>
                        <div className="mt-3 text-sm text-purple-100 flex items-center gap-1">
                            <Sparkles className="w-4 h-4" />
                            {t.users.inSystem}
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                    className="p-6 rounded-3xl bg-white border border-slate-100 shadow-xl shadow-slate-100/50 relative overflow-hidden group"
                >
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2.5 rounded-xl bg-slate-100 text-slate-600 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
                                <Users className="w-6 h-6" />
                            </div>
                            <span className="font-medium text-slate-600">{t.users.lecturersLabel}</span>
                        </div>
                        <div className="text-4xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">{users.filter(u => u.type === 'lecturer').length}</div>
                        <div className="mt-3 text-sm text-slate-400">{t.users.teachingStaff}</div>
                        <div className="absolute bottom-0 right-0 w-24 h-12 bg-gradient-to-t from-emerald-50 to-transparent" />
                    </div>
                </motion.div>

                <motion.div
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                    className="p-6 rounded-3xl bg-white border border-slate-100 shadow-xl shadow-slate-100/50 relative overflow-hidden group"
                >
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2.5 rounded-xl bg-slate-100 text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                                <UserCog className="w-6 h-6" />
                            </div>
                            <span className="font-medium text-slate-600">{t.users.staffLabel}</span>
                        </div>
                        <div className="text-4xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{users.filter(u => u.type === 'staff').length}</div>
                        <div className="mt-3 text-sm text-slate-400">{t.users.supportStaff}</div>
                        <div className="absolute bottom-0 right-0 w-24 h-12 bg-gradient-to-t from-blue-50 to-transparent" />
                    </div>
                </motion.div>

                <motion.div
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                    className="p-6 rounded-3xl bg-white border border-slate-100 shadow-xl shadow-slate-100/50 relative overflow-hidden group"
                >
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2.5 rounded-xl bg-slate-100 text-slate-600 group-hover:bg-orange-50 group-hover:text-orange-600 transition-colors">
                                <Building className="w-6 h-6" />
                            </div>
                            <span className="font-medium text-slate-600">{t.users.companiesLabel}</span>
                        </div>
                        <div className="text-4xl font-bold text-slate-900 group-hover:text-orange-600 transition-colors">{users.filter(u => u.type === 'company').length}</div>
                        <div className="mt-3 text-sm text-slate-400">{t.users.businessPartners}</div>
                        <div className="absolute bottom-0 right-0 w-24 h-12 bg-gradient-to-t from-orange-50 to-transparent" />
                    </div>
                </motion.div>
            </div>

            <motion.div variants={itemVariants}>
                <div className="flex gap-4 mb-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input placeholder={t.users.searchPlaceholder} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
                    </div>
                </div>

                <Tabs defaultValue="all" className="space-y-4">
                    <TabsList className="bg-white/80 backdrop-blur-sm border shadow-sm">
                        <TabsTrigger value="all">{t.users.allTab}</TabsTrigger>
                        <TabsTrigger value="student">{t.roles.student}</TabsTrigger>
                        <TabsTrigger value="lecturer">{t.roles.lecturer}</TabsTrigger>
                        <TabsTrigger value="staff">{t.roles.staff}</TabsTrigger>
                        <TabsTrigger value="company">{t.roles.company}</TabsTrigger>
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
                                            {t.users.noUsers}
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
                        <DialogTitle>{editingUser ? t.users.editUser : t.users.addUser}</DialogTitle>
                        <DialogDescription>{t.users.formDescription}</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label>{t.users.nameLabel}</Label>
                            <Input
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder={t.users.namePlaceholder}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>{t.users.emailLabel}</Label>
                            <Input
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder={t.users.emailPlaceholder}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>{t.users.roleLabel}</Label>
                            <Select
                                value={formData.role}
                                onValueChange={(val) => setFormData({ ...formData, role: val })}
                                disabled={!!editingUser} // Prevent role change on edit for simplicity
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="student">{t.roles.student}</SelectItem>
                                    <SelectItem value="lecturer">{t.roles.lecturer}</SelectItem>
                                    <SelectItem value="staff">{t.roles.staff}</SelectItem>
                                    <SelectItem value="company">{t.roles.company}</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>{t.common.cancel}</Button>
                        <Button onClick={handleSave} className="bg-purple-600 hover:bg-purple-700">
                            <Save className="w-4 h-4 mr-2" />
                            {t.common.save}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </motion.div>
    );
}
