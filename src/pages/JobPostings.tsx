import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Briefcase, Plus, MapPin, Clock, Users, Edit, Trash2, Eye, Calendar, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ThemedPageHeader } from '@/components/common/ThemedPageHeader';
import { mockJobPostings, mockCompany } from '@/lib/mockData';

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
    const companyJobPostings = user?.role === 'company' ? mockJobPostings.filter(j => j.companyId === mockCompany.id) : mockJobPostings;
    const openJobs = companyJobPostings.filter(j => j.status === 'open').length;
    const totalApplicants = companyJobPostings.reduce((sum, j) => sum + j.applicants.length, 0);

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
                    user?.role === 'company' && (
                        <Button className="bg-gradient-to-r from-orange-500 to-amber-500 shadow-lg">
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
                            {companyJobPostings.map((job, index) => (
                                <motion.div
                                    key={job.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
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
                                            {user?.role === 'company' && (
                                                <>
                                                    <Button size="sm" variant="ghost"><Edit className="w-4 h-4" /></Button>
                                                    <Button size="sm" variant="ghost" className="text-red-600"><Trash2 className="w-4 h-4" /></Button>
                                                </>
                                            )}
                                        </div>
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
