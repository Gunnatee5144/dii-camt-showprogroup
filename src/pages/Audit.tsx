import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Search, Filter, Download, User, Clock, Activity, Eye, AlertCircle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

const mockAuditLogs = [
    { id: 'LOG001', userId: 'STU001', userName: 'สมชาย ใจดี', userRole: 'student', action: 'login', resource: 'auth', timestamp: new Date('2026-01-09T08:30:00'), status: 'success' },
    { id: 'LOG002', userId: 'LEC001', userName: 'ดร.สมศักดิ์ วิชาการ', userRole: 'lecturer', action: 'update_grade', resource: 'grades', timestamp: new Date('2026-01-09T09:15:00'), status: 'success' },
    { id: 'LOG003', userId: 'STA001', userName: 'สมหญิง รักงาน', userRole: 'staff', action: 'approve_request', resource: 'requests', timestamp: new Date('2026-01-09T10:00:00'), status: 'success' },
    { id: 'LOG004', userId: 'COM001', userName: 'Tech Innovation', userRole: 'company', action: 'view_student', resource: 'students', timestamp: new Date('2026-01-09T11:30:00'), status: 'success' },
    { id: 'LOG005', userId: 'ADM001', userName: 'ผู้ดูแลระบบ', userRole: 'admin', action: 'create_user', resource: 'users', timestamp: new Date('2026-01-09T14:00:00'), status: 'success' },
    { id: 'LOG006', userId: 'STU002', userName: 'สุดา มณี', userRole: 'student', action: 'login', resource: 'auth', timestamp: new Date('2026-01-09T14:30:00'), status: 'failed' },
];

export default function Audit() {
    const [searchQuery, setSearchQuery] = React.useState('');
    const [roleFilter, setRoleFilter] = React.useState('all');

    const getActionBadge = (action: string) => {
        switch (action) {
            case 'login': return <Badge className="bg-blue-100 text-blue-700">เข้าสู่ระบบ</Badge>;
            case 'update_grade': return <Badge className="bg-purple-100 text-purple-700">แก้ไขเกรด</Badge>;
            case 'approve_request': return <Badge className="bg-emerald-100 text-emerald-700">อนุมัติคำร้อง</Badge>;
            case 'view_student': return <Badge className="bg-orange-100 text-orange-700">ดูข้อมูลนักศึกษา</Badge>;
            case 'create_user': return <Badge className="bg-pink-100 text-pink-700">สร้างผู้ใช้</Badge>;
            default: return <Badge>{action}</Badge>;
        }
    };

    const getRoleBadge = (role: string) => {
        switch (role) {
            case 'student': return <Badge variant="outline" className="text-blue-700 border-blue-300">นักศึกษา</Badge>;
            case 'lecturer': return <Badge variant="outline" className="text-emerald-700 border-emerald-300">อาจารย์</Badge>;
            case 'staff': return <Badge variant="outline" className="text-purple-700 border-purple-300">เจ้าหน้าที่</Badge>;
            case 'company': return <Badge variant="outline" className="text-orange-700 border-orange-300">บริษัท</Badge>;
            case 'admin': return <Badge variant="outline" className="text-red-700 border-red-300">แอดมิน</Badge>;
            default: return <Badge variant="outline">{role}</Badge>;
        }
    };

    const filteredLogs = mockAuditLogs.filter(log => {
        const matchesSearch = log.userName.includes(searchQuery) || log.action.includes(searchQuery);
        const matchesRole = roleFilter === 'all' || log.userRole === roleFilter;
        return matchesSearch && matchesRole;
    });

    return (
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
            <motion.div variants={itemVariants} className="relative">
                <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 text-white shadow-lg">
                        <Shield className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-medium text-indigo-600">ระบบตรวจสอบ</span>
                </div>
                <div className="flex items-center justify-between">
                    <div>
                        <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-3xl font-bold text-gray-900">
                            <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">Audit Log</span>
                        </motion.h1>
                        <p className="text-gray-500 mt-1">ประวัติการใช้งานระบบ</p>
                    </div>
                    <Button variant="outline"><Download className="w-4 h-4 mr-2" />ส่งออก</Button>
                </div>
            </motion.div>

            <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: 'ทั้งหมด', value: mockAuditLogs.length, gradient: 'from-blue-500 to-indigo-500', icon: Activity },
                    { label: 'สำเร็จ', value: mockAuditLogs.filter(l => l.status === 'success').length, gradient: 'from-emerald-500 to-teal-500', icon: CheckCircle },
                    { label: 'ล้มเหลว', value: mockAuditLogs.filter(l => l.status === 'failed').length, gradient: 'from-red-500 to-rose-500', icon: AlertCircle },
                    { label: 'วันนี้', value: mockAuditLogs.length, gradient: 'from-purple-500 to-pink-500', icon: Clock },
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
                        <Input placeholder="ค้นหา..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
                    </div>
                    <Select value={roleFilter} onValueChange={setRoleFilter}>
                        <SelectTrigger className="w-40"><SelectValue placeholder="บทบาท" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">ทุกบทบาท</SelectItem>
                            <SelectItem value="student">นักศึกษา</SelectItem>
                            <SelectItem value="lecturer">อาจารย์</SelectItem>
                            <SelectItem value="staff">เจ้าหน้าที่</SelectItem>
                            <SelectItem value="company">บริษัท</SelectItem>
                            <SelectItem value="admin">แอดมิน</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <Card className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-3xl shadow-sm">
                    <CardContent className="pt-6">
                        <div className="space-y-3">
                            {filteredLogs.map((log, index) => (
                                <motion.div
                                    key={log.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.03 }}
                                    className="flex items-center justify-between p-4 border rounded-xl hover:shadow-md transition-all"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${log.status === 'success' ? 'bg-emerald-100' : 'bg-red-100'}`}>
                                            {log.status === 'success' ? <CheckCircle className="w-5 h-5 text-emerald-600" /> : <AlertCircle className="w-5 h-5 text-red-600" />}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className="font-semibold">{log.userName}</span>
                                                {getRoleBadge(log.userRole)}
                                            </div>
                                            <div className="text-sm text-gray-600">
                                                {log.timestamp.toLocaleString('th-TH')}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        {getActionBadge(log.action)}
                                        <Badge variant="outline">{log.resource}</Badge>
                                        <Button size="sm" variant="ghost"><Eye className="w-4 h-4" /></Button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </motion.div>
    );
}
