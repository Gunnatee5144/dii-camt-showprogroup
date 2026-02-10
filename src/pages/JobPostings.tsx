import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Briefcase, Plus, MapPin, Clock, Users, Edit, Trash2, Eye, Calendar, DollarSign, Save, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { mockJobPostings, mockCompany } from '@/lib/mockData';
import { toast } from 'sonner';
import { useLanguage } from '@/contexts/LanguageContext';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

export default function JobPostings() {
    const { user } = useAuth();
    const { t, language } = useLanguage();
    const isAdmin = user?.role === 'admin';
    const isCompany = user?.role === 'company';
    const canManage = isAdmin || isCompany;

    const [jobs, setJobs] = useState(mockJobPostings);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingJob, setEditingJob] = useState<any>(null);
    const [formData, setFormData] = useState<any>({ title: '', type: 'full-time', location: '', salary: '', positions: 1, deadline: '' });

    const companyJobPostings = isCompany ? jobs.filter(j => j.companyId === mockCompany.id) : jobs;
    const openJobs = companyJobPostings.filter(j => j.status === 'open').length;
    const totalApplicants = companyJobPostings.reduce((sum, j) => sum + j.applicants.length, 0);

    const handleAdd = () => {
        setEditingJob(null);
        setFormData({ title: '', type: 'full-time', location: 'เชียงใหม่', salary: '20,000+', positions: 1, deadline: new Date().toISOString().split('T')[0] });
        setIsDialogOpen(true);
    };

    const handleEdit = (job: any) => {
        setEditingJob(job);
        setFormData({
            title: job.title,
            type: job.type,
            location: job.location,
            salary: job.salary,
            positions: job.positions,
            deadline: new Date(job.deadline).toISOString().split('T')[0]
        });
        setIsDialogOpen(true);
    };

    const handleDelete = (id: string) => {
        if (confirm(t.jobPostings.deleteConfirm)) {
            setJobs(jobs.filter(j => j.id !== id));
            toast.success(t.jobPostings.deleteSuccess);
        }
    };

    const handleSave = () => {
        if (editingJob) {
            setJobs(jobs.map(j => j.id === editingJob.id ? { ...j, ...formData } : j));
            toast.success(t.jobPostings.editSuccess);
        } else {
            const newJob = {
                id: Math.random().toString(36).substr(2, 9),
                companyId: isCompany ? mockCompany.id : 'comp-new',
                companyName: isCompany ? mockCompany.companyNameThai : 'New Company',
                status: 'open',
                applicants: [],
                createdAt: new Date().toISOString(),
                ...formData
            };
            setJobs([newJob, ...jobs]);
            toast.success(t.jobPostings.createSuccess);
        }
        setIsDialogOpen(false);
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'open': return <Badge className="bg-emerald-100 text-emerald-700">{t.jobPostings.statusOpen}</Badge>;
            case 'closed': return <Badge className="bg-gray-100 text-gray-700">{t.jobPostings.statusClosed}</Badge>;
            case 'filled': return <Badge className="bg-blue-100 text-blue-700">{t.jobPostings.statusFilled}</Badge>;
            default: return <Badge>{status}</Badge>;
        }
    };

    const getTypeBadge = (type: string) => {
        switch (type) {
            case 'internship': return <Badge variant="outline" className="text-purple-700 border-purple-300">{t.jobPostings.internship}</Badge>;
            case 'full-time': return <Badge variant="outline" className="text-blue-700 border-blue-300">{t.jobPostings.fullTimeType}</Badge>;
            case 'part-time': return <Badge variant="outline" className="text-orange-700 border-orange-300">{t.jobPostings.partTime}</Badge>;
            default: return <Badge variant="outline">{type}</Badge>;
        }
    };

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
                        <Briefcase className="w-4 h-4 text-orange-500" />
                        <span>{companyJobPostings.length} {t.jobPostings.positionsCount} • {openJobs} {t.jobPostings.statusOpen}</span>
                    </motion.div>
                    <motion.h1
                        className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        {t.jobPostings.title}<span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">{t.jobPostings.titleHighlight}</span>
                    </motion.h1>
                </div>

                {canManage && (
                    <motion.div className="flex gap-3" variants={itemVariants}>
                        <Button onClick={handleAdd} className="rounded-xl bg-slate-900 text-white hover:bg-slate-800 shadow-lg shadow-slate-900/20">
                            <Plus className="w-4 h-4 mr-2" />{t.jobPostings.addNew}
                        </Button>
                    </motion.div>
                )}
            </div>

            {/* Stats Grid - Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <motion.div
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                    className="p-6 rounded-3xl bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-xl shadow-orange-500/20 relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2.5 rounded-xl bg-white/20 backdrop-blur-sm">
                                <Briefcase className="w-6 h-6" />
                            </div>
                            <span className="font-medium text-white/90">{t.jobPostings.allPositions}</span>
                        </div>
                        <div className="text-5xl font-bold tracking-tight">{companyJobPostings.length}</div>
                        <div className="mt-3 text-sm text-orange-100 flex items-center gap-1">
                            <Sparkles className="w-4 h-4" />
                            {t.jobPostings.inSystem}
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
                            <span className="font-medium text-slate-600">{t.jobPostings.openLabel}</span>
                        </div>
                        <div className="text-4xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">{openJobs}</div>
                        <div className="mt-3 text-sm text-slate-400">{t.jobPostings.openDesc}</div>
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
                                <Users className="w-6 h-6" />
                            </div>
                            <span className="font-medium text-slate-600">{t.jobPostings.totalApplicants}</span>
                        </div>
                        <div className="text-4xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{totalApplicants}</div>
                        <div className="mt-3 text-sm text-slate-400">{t.jobPostings.applicantsDesc}</div>
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
                            <div className="p-2.5 rounded-xl bg-slate-100 text-slate-600 group-hover:bg-red-50 group-hover:text-red-600 transition-colors">
                                <Clock className="w-6 h-6" />
                            </div>
                            <span className="font-medium text-slate-600">{t.jobPostings.closingSoon}</span>
                        </div>
                        <div className="text-4xl font-bold text-slate-900 group-hover:text-red-600 transition-colors">{companyJobPostings.filter(j => new Date(j.deadline) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)).length}</div>
                        <div className="mt-3 text-sm text-slate-400">{t.jobPostings.within7Days}</div>
                        <div className="absolute bottom-0 right-0 w-24 h-12 bg-gradient-to-t from-red-50 to-transparent" />
                    </div>
                </motion.div>
            </div>

            <motion.div variants={itemVariants}>
                <Card className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-3xl shadow-sm">
                    <CardHeader><CardTitle>{t.jobPostings.jobList}</CardTitle></CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <AnimatePresence>
                                {companyJobPostings.map((job, index) => (
                                    <motion.div
                                        key={job.id}
                                        layout
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="p-5 border rounded-xl hover:shadow-md transition-all bg-gradient-to-r from-gray-50/50 to-white"
                                    >
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h3 className="font-semibold text-lg">{job.title}</h3>
                                                    {getStatusBadge(job.status)}
                                                    {getTypeBadge(job.type)}
                                                </div>
                                                <p className="text-sm text-gray-600 mb-2">{job.companyName}</p>
                                                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                                                    <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{job.location}</span>
                                                    <span className="flex items-center gap-1"><DollarSign className="w-4 h-4" />{job.salary}</span>
                                                    <span className="flex items-center gap-1"><Users className="w-4 h-4" />{job.positions} {t.jobPostings.positionsUnit}</span>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-sm text-gray-600 mb-1">{t.jobPostings.closeDateLabel}</div>
                                                <div className="font-semibold">{new Date(job.deadline).toLocaleDateString(language === 'th' ? 'th-TH' : 'en-US', { day: 'numeric', month: 'short' })}</div>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between pt-4 border-t">
                                            <div className="flex-1 mr-6">
                                                <div className="flex items-center justify-between text-sm mb-2">
                                                    <span className="text-gray-600">{t.jobPostings.applicantsCount}</span>
                                                    <span className="font-semibold">{job.applicants.length} {t.common.person}</span>
                                                </div>
                                                <Progress value={job.maxApplicants ? (job.applicants.length / job.maxApplicants) * 100 : 50} className="h-2" />
                                            </div>
                                            <div className="flex gap-2">
                                                <Button size="sm" variant="outline"><Eye className="w-4 h-4 mr-1" />{t.jobPostings.viewApplicants}</Button>
                                                {canManage && (
                                                    <>
                                                        <Button size="sm" variant="ghost" onClick={() => handleEdit(job)}><Edit className="w-4 h-4" /></Button>
                                                        <Button size="sm" variant="ghost" className="text-red-600" onClick={() => handleDelete(job.id)}><Trash2 className="w-4 h-4" /></Button>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Job Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>{editingJob ? t.jobPostings.editJob : t.jobPostings.addNew}</DialogTitle>
                        <DialogDescription>{t.jobPostings.fillDetails}</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label>{t.jobPostings.jobTitle}</Label>
                            <Input value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label>{t.jobPostings.type}</Label>
                                <Select value={formData.type} onValueChange={v => setFormData({ ...formData, type: v })}>
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="full-time">Full-time</SelectItem>
                                        <SelectItem value="part-time">Part-time</SelectItem>
                                        <SelectItem value="internship">Internship</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-2">
                                <Label>{t.jobPostings.positions} ({t.jobPostings.positionsUnit})</Label>
                                <Input type="number" value={formData.positions} onChange={e => setFormData({ ...formData, positions: parseInt(e.target.value) })} />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label>{t.jobPostings.location}</Label>
                            <Input value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} />
                        </div>
                        <div className="grid gap-2">
                            <Label>{t.jobPostings.salary}</Label>
                            <Input value={formData.salary} onChange={e => setFormData({ ...formData, salary: e.target.value })} />
                        </div>
                        <div className="grid gap-2">
                            <Label>{t.jobPostings.deadline}</Label>
                            <Input type="date" value={formData.deadline} onChange={e => setFormData({ ...formData, deadline: e.target.value })} />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>{t.common.cancel}</Button>
                        <Button onClick={handleSave} className="bg-orange-500 hover:bg-orange-600">
                            <Save className="w-4 h-4 mr-2" />{t.common.save}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </motion.div>
    );
}
