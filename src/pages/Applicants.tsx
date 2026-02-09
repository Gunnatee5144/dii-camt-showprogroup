import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Users, Search, Filter, Eye, Mail, CheckCircle, XCircle, Clock, Star, FileText, MoreHorizontal } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { mockJobPostings, mockStudents, mockCompany } from '@/lib/mockData';
import { toast } from 'sonner';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

const initialApplicants = mockJobPostings.flatMap(job =>
    job.applicants.map(app => ({
        ...app,
        jobTitle: job.title,
        companyId: job.companyId,
        student: mockStudents.find(s => s.id === app.studentId),
    }))
);

export default function Applicants() {
    const { user } = useAuth();
    const isAdmin = user?.role === 'admin';
    const isCompany = user?.role === 'company';
    const canManage = isAdmin || isCompany;

    const [applicants, setApplicants] = useState(initialApplicants);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    // Filter logic: Admin sees all, Company sees only their jobs' applicants
    const visibleApplicants = applicants.filter(app => {
        if (isCompany && app.companyId !== mockCompany.id) return false;
        return true;
    });

    const pendingCount = visibleApplicants.filter(a => a.status === 'pending').length;
    const shortlistedCount = visibleApplicants.filter(a => a.status === 'shortlisted').length;

    const handleStatusChange = (id: string, newStatus: string) => {
        setApplicants(applicants.map(app => app.id === id ? { ...app, status: newStatus as any } : app));

        const statusMap: Record<string, string> = {
            'shortlisted': 'คัดเลือก',
            'interviewed': 'นัดสัมภาษณ์',
            'accepted': 'ตอบรับเข้าทำงาน',
            'rejected': 'ปฏิเสธ'
        };

        toast.success(`อัปเดตสถานะเป็น "${statusMap[newStatus]}" เรียบร้อยแล้ว`);
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'pending': return <Badge className="bg-orange-100 text-orange-700">รอพิจารณา</Badge>;
            case 'reviewed': return <Badge className="bg-blue-100 text-blue-700">ตรวจสอบแล้ว</Badge>;
            case 'shortlisted': return <Badge className="bg-purple-100 text-purple-700">คัดเลือก</Badge>;
            case 'interviewed': return <Badge className="bg-cyan-100 text-cyan-700">สัมภาษณ์แล้ว</Badge>;
            case 'accepted': return <Badge className="bg-emerald-100 text-emerald-700">ตอบรับ</Badge>;
            case 'rejected': return <Badge className="bg-red-100 text-red-700">ปฏิเสธ</Badge>;
            default: return <Badge>{status}</Badge>;
        }
    };

    const filteredApplicants = visibleApplicants.filter(app => {
        const matchesSearch = app.student?.nameThai.includes(searchQuery) || app.jobTitle.includes(searchQuery);
        const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
            {/* Animated Header */}
            <motion.div variants={itemVariants} className="relative">
                <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 text-white shadow-lg">
                        <Users className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-medium text-blue-600">ผู้สมัครงาน</span>
                </div>
                <div className="flex items-center justify-between">
                    <div>
                        <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-3xl font-bold text-gray-900">
                            <span className="bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">ผู้สมัครงาน</span>
                        </motion.h1>
                        <p className="text-gray-500 mt-1">{`${visibleApplicants.length} คน • ${pendingCount} รอพิจารณา`}</p>
                    </div>
                </div>
            </motion.div>

            <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: 'ทั้งหมด', value: visibleApplicants.length, gradient: 'from-blue-500 to-indigo-500', icon: Users },
                    { label: 'รอพิจารณา', value: pendingCount, gradient: 'from-orange-500 to-amber-500', icon: Clock },
                    { label: 'คัดเลือกแล้ว', value: shortlistedCount, gradient: 'from-purple-500 to-pink-500', icon: Star },
                    { label: 'ตอบรับ', value: visibleApplicants.filter(a => a.status === 'accepted').length, gradient: 'from-emerald-500 to-teal-500', icon: CheckCircle },
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
                        <Input placeholder="ค้นหาผู้สมัคร..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-40"><SelectValue placeholder="สถานะ" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">ทุกสถานะ</SelectItem>
                            <SelectItem value="pending">รอพิจารณา</SelectItem>
                            <SelectItem value="shortlisted">คัดเลือก</SelectItem>
                            <SelectItem value="accepted">ตอบรับ</SelectItem>
                            <SelectItem value="rejected">ปฏิเสธ</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <Card className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-3xl shadow-sm">
                    <CardContent className="pt-6">
                        <div className="space-y-3">
                            <AnimatePresence>
                                {filteredApplicants.map((applicant, index) => (
                                    <motion.div
                                        layout
                                        key={applicant.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ delay: index * 0.03 }}
                                        className="flex items-center justify-between p-4 border rounded-xl hover:shadow-md transition-all bg-white"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                                                {applicant.student?.nameThai.charAt(0) || 'N'}
                                            </div>
                                            <div>
                                                <div className="font-semibold">{applicant.student?.nameThai || 'Unknown'}</div>
                                                <div className="text-sm text-gray-600">{applicant.jobTitle}</div>
                                                <div className="text-xs text-gray-400 mt-1">
                                                    สมัครเมื่อ {new Date(applicant.appliedAt).toLocaleDateString('th-TH')}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="text-right hidden sm:block">
                                                <div className="text-sm font-semibold">GPA {applicant.student?.gpa.toFixed(2)}</div>
                                                <div className="text-xs text-gray-500">ปี {applicant.student?.year}</div>
                                            </div>
                                            {getStatusBadge(applicant.status)}

                                            <div className="flex gap-1">
                                                <Button size="sm" variant="ghost"><Eye className="w-4 h-4" /></Button>
                                                <Button size="sm" variant="ghost"><FileText className="w-4 h-4" /></Button>
                                            </div>

                                            {canManage && (
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button size="sm" variant="ghost"><MoreHorizontal className="w-4 h-4" /></Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuLabel>การจัดการ</DropdownMenuLabel>
                                                        <DropdownMenuItem onClick={() => handleStatusChange(applicant.id, 'shortlisted')}>
                                                            <Star className="w-4 h-4 mr-2" /> คัดเลือก (Shortlist)
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => handleStatusChange(applicant.id, 'interviewed')}>
                                                            <Users className="w-4 h-4 mr-2" /> นัดสัมภาษณ์
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem onClick={() => handleStatusChange(applicant.id, 'accepted')} className="text-green-600">
                                                            <CheckCircle className="w-4 h-4 mr-2" /> ตอบรับเข้าทำงาน
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => handleStatusChange(applicant.id, 'rejected')} className="text-red-600">
                                                            <XCircle className="w-4 h-4 mr-2" /> ปฏิเสธ
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                            {filteredApplicants.length === 0 && (
                                <div className="text-center py-8 text-gray-500">
                                    ไม่พบรายชื่อผู้สมัคร
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </motion.div>
    );
}
