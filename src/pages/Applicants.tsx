import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Users, Search, Filter, Eye, Mail, CheckCircle, XCircle, Clock, Star, FileText, MoreHorizontal, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { mockJobPostings, mockStudents, mockCompany } from '@/lib/mockData';
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
    const { t } = useLanguage();
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
            'shortlisted': t.applicants.shortlistAction,
            'interviewed': t.applicants.interviewAction,
            'accepted': t.applicants.acceptAction,
            'rejected': t.applicants.rejectAction
        };

        toast.success(`${t.applicants.updateSuccess}: "${statusMap[newStatus]}"`);
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'pending': return <Badge className="bg-orange-100 text-orange-700">{t.applicants.statusPending}</Badge>;
            case 'reviewed': return <Badge className="bg-blue-100 text-blue-700">{t.applicants.statusReviewed}</Badge>;
            case 'shortlisted': return <Badge className="bg-purple-100 text-purple-700">{t.applicants.statusShortlisted}</Badge>;
            case 'interviewed': return <Badge className="bg-cyan-100 text-cyan-700">{t.applicants.statusInterviewed}</Badge>;
            case 'accepted': return <Badge className="bg-emerald-100 text-emerald-700">{t.applicants.statusAccepted}</Badge>;
            case 'rejected': return <Badge className="bg-red-100 text-red-700">{t.applicants.statusRejected}</Badge>;
            default: return <Badge>{status}</Badge>;
        }
    };

    const filteredApplicants = visibleApplicants.filter(app => {
        const matchesSearch = app.student?.nameThai.includes(searchQuery) || app.jobTitle.includes(searchQuery);
        const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

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
                        <Users className="w-4 h-4 text-blue-500" />
                        <span>{visibleApplicants.length} {t.common.person} • {pendingCount} {t.applicants.pending}</span>
                    </motion.div>
                    <motion.h1
                        className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        {t.applicants.title}<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">{t.applicants.titleHighlight}</span>
                    </motion.h1>
                </div>
            </div>

            {/* Stats Grid - Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <motion.div
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                    className="p-6 rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-xl shadow-blue-500/20 relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2.5 rounded-xl bg-white/20 backdrop-blur-sm">
                                <Users className="w-6 h-6" />
                            </div>
                            <span className="font-medium text-white/90">{t.applicants.totalLabel}</span>
                        </div>
                        <div className="text-5xl font-bold tracking-tight">{visibleApplicants.length}</div>
                        <div className="mt-3 text-sm text-blue-100 flex items-center gap-1">
                            <Sparkles className="w-4 h-4" />
                            {t.applicants.inSystem}
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
                            <div className="p-2.5 rounded-xl bg-slate-100 text-slate-600 group-hover:bg-orange-50 group-hover:text-orange-600 transition-colors">
                                <Clock className="w-6 h-6" />
                            </div>
                            <span className="font-medium text-slate-600">{t.applicants.pending}</span>
                        </div>
                        <div className="text-4xl font-bold text-slate-900 group-hover:text-orange-600 transition-colors">{pendingCount}</div>
                        <div className="mt-3 text-sm text-slate-400">{t.applicants.pendingDesc}</div>
                        <div className="absolute bottom-0 right-0 w-24 h-12 bg-gradient-to-t from-orange-50 to-transparent" />
                    </div>
                </motion.div>

                <motion.div
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                    className="p-6 rounded-3xl bg-white border border-slate-100 shadow-xl shadow-slate-100/50 relative overflow-hidden group"
                >
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2.5 rounded-xl bg-slate-100 text-slate-600 group-hover:bg-purple-50 group-hover:text-purple-600 transition-colors">
                                <Star className="w-6 h-6" />
                            </div>
                            <span className="font-medium text-slate-600">{t.applicants.shortlisted}</span>
                        </div>
                        <div className="text-4xl font-bold text-slate-900 group-hover:text-purple-600 transition-colors">{shortlistedCount}</div>
                        <div className="mt-3 text-sm text-slate-400">{t.applicants.shortlistedDesc}</div>
                        <div className="absolute bottom-0 right-0 w-24 h-12 bg-gradient-to-t from-purple-50 to-transparent" />
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
                                <CheckCircle className="w-6 h-6" />
                            </div>
                            <span className="font-medium text-slate-600">{t.applicants.accepted}</span>
                        </div>
                        <div className="text-4xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">{visibleApplicants.filter(a => a.status === 'accepted').length}</div>
                        <div className="mt-3 text-sm text-slate-400">{t.applicants.acceptedDesc}</div>
                        <div className="absolute bottom-0 right-0 w-24 h-12 bg-gradient-to-t from-emerald-50 to-transparent" />
                    </div>
                </motion.div>
            </div>

            <motion.div variants={itemVariants}>
                <div className="flex gap-4 mb-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input placeholder={t.common.search} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-40"><SelectValue placeholder={t.common.status} /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">{t.common.all}</SelectItem>
                            <SelectItem value="pending">{t.applicants.statusPending}</SelectItem>
                            <SelectItem value="shortlisted">{t.applicants.statusShortlisted}</SelectItem>
                            <SelectItem value="accepted">{t.applicants.statusAccepted}</SelectItem>
                            <SelectItem value="rejected">{t.applicants.statusRejected}</SelectItem>
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
                                                    {t.applicants.appliedOn} {new Date(applicant.appliedAt).toLocaleDateString('th-TH')}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="text-right hidden sm:block">
                                                <div className="text-sm font-semibold">GPA {applicant.student?.gpa.toFixed(2)}</div>
                                                <div className="text-xs text-gray-500">{t.studentProfiles.yearPrefix} {applicant.student?.year}</div>
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
                                                        <DropdownMenuLabel>{t.applicants.manageStatus}</DropdownMenuLabel>
                                                        <DropdownMenuItem onClick={() => handleStatusChange(applicant.id, 'shortlisted')}>
                                                            <Star className="w-4 h-4 mr-2" /> {t.applicants.shortlistAction}
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => handleStatusChange(applicant.id, 'interviewed')}>
                                                            <Users className="w-4 h-4 mr-2" /> {t.applicants.interviewAction}
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem onClick={() => handleStatusChange(applicant.id, 'accepted')} className="text-green-600">
                                                            <CheckCircle className="w-4 h-4 mr-2" /> {t.applicants.acceptAction}
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => handleStatusChange(applicant.id, 'rejected')} className="text-red-600">
                                                            <XCircle className="w-4 h-4 mr-2" /> {t.applicants.rejectAction}
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
                                    {t.common.noData}
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </motion.div>
    );
}
