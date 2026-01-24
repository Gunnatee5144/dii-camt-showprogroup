import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Briefcase, Plus, MapPin, Clock, Users, Edit, Trash2, Eye, Calendar, DollarSign, Save } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ThemedPageHeader } from '@/components/common/ThemedPageHeader';
import { mockJobPostings, mockCompany } from '@/lib/mockData';
import { toast } from 'sonner';

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
        if (confirm('ยืนยันเพื่อลบประกาศนี้?')) {
            setJobs(jobs.filter(j => j.id !== id));
            toast.success('ลบประกาศเรียบร้อยแล้ว');
        }
    };

    const handleSave = () => {
        if (editingJob) {
            setJobs(jobs.map(j => j.id === editingJob.id ? { ...j, ...formData } : j));
            toast.success('แก้ไขประกาศเรียบร้อยแล้ว');
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
            toast.success('สร้างประกาศใหม่เรียบร้อยแล้ว');
        }
        setIsDialogOpen(false);
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'open': return <Badge className="bg-emerald-100 text-emerald-700">เปิดรับ</Badge>;
            case 'closed': return <Badge className="bg-gray-100 text-gray-700">ปิดรับ</Badge>;
            case 'filled': return <Badge className="bg-blue-100 text-blue-700">ครบแล้ว</Badge>;
            default: return <Badge>{status}</Badge>;
        }
    };

    const getTypeBadge = (type: string) => {
        switch (type) {
            case 'internship': return <Badge variant="outline" className="text-purple-700 border-purple-300">ฝึกงาน</Badge>;
            case 'full-time': return <Badge variant="outline" className="text-blue-700 border-blue-300">เต็มเวลา</Badge>;
            case 'part-time': return <Badge variant="outline" className="text-orange-700 border-orange-300">พาร์ทไทม์</Badge>;
            default: return <Badge variant="outline">{type}</Badge>;
        }
    };

    return (
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
            <ThemedPageHeader
                title="ประกาศรับสมัครงาน"
                subtitle={`${companyJobPostings.length} ตำแหน่ง • ${openJobs} เปิดรับ`}
                icon={<Briefcase className="w-7 h-7" />}
                actions={
                    canManage && (
                        <Button onClick={handleAdd} className="bg-gradient-to-r from-orange-500 to-amber-500 shadow-lg">
                            <Plus className="w-4 h-4 mr-2" />ลงประกาศใหม่
                        </Button>
                    )
                }
            />

            <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: 'ตำแหน่งงาน', value: companyJobPostings.length, gradient: 'from-orange-500 to-amber-500', icon: Briefcase },
                    { label: 'เปิดรับ', value: openJobs, gradient: 'from-emerald-500 to-teal-500', icon: Users },
                    { label: 'ผู้สมัครรวม', value: totalApplicants, gradient: 'from-blue-500 to-indigo-500', icon: Users },
                    { label: 'ใกล้ปิดรับ', value: companyJobPostings.filter(j => new Date(j.deadline) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)).length, gradient: 'from-red-500 to-rose-500', icon: Clock },
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
                <Card>
                    <CardHeader><CardTitle>รายการประกาศงาน</CardTitle></CardHeader>
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
                                                    <span className="flex items-center gap-1"><Users className="w-4 h-4" />{job.positions} อัตรา</span>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-sm text-gray-600 mb-1">ปิดรับ</div>
                                                <div className="font-semibold">{new Date(job.deadline).toLocaleDateString('th-TH', { day: 'numeric', month: 'short' })}</div>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between pt-4 border-t">
                                            <div className="flex-1 mr-6">
                                                <div className="flex items-center justify-between text-sm mb-2">
                                                    <span className="text-gray-600">ผู้สมัคร</span>
                                                    <span className="font-semibold">{job.applicants.length} คน</span>
                                                </div>
                                                <Progress value={job.maxApplicants ? (job.applicants.length / job.maxApplicants) * 100 : 50} className="h-2" />
                                            </div>
                                            <div className="flex gap-2">
                                                <Button size="sm" variant="outline"><Eye className="w-4 h-4 mr-1" />ดูผู้สมัคร</Button>
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
                        <DialogTitle>{editingJob ? 'แก้ไขประกาศงาน' : 'ลงประกาศใหม่'}</DialogTitle>
                        <DialogDescription>กรอกรายละเอียดตำแหน่งงาน</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label>ชื่อตำแหน่ง</Label>
                            <Input value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label>ประเภท</Label>
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
                                <Label>จำนวนรับ (อัตรา)</Label>
                                <Input type="number" value={formData.positions} onChange={e => setFormData({ ...formData, positions: parseInt(e.target.value) })} />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label>สถานที่ทำงาน</Label>
                            <Input value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} />
                        </div>
                        <div className="grid gap-2">
                            <Label>เงินเดือน</Label>
                            <Input value={formData.salary} onChange={e => setFormData({ ...formData, salary: e.target.value })} />
                        </div>
                        <div className="grid gap-2">
                            <Label>วันปิดรับสมัคร</Label>
                            <Input type="date" value={formData.deadline} onChange={e => setFormData({ ...formData, deadline: e.target.value })} />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>ยกเลิก</Button>
                        <Button onClick={handleSave} className="bg-orange-500 hover:bg-orange-600">
                            <Save className="w-4 h-4 mr-2" />บันทึก
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </motion.div>
    );
}
