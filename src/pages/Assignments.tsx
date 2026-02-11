import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import {
    ClipboardList, Plus, Calendar, CheckCircle, Clock, AlertCircle,
    FileText, Users, Filter, Search, Upload, ChevronRight
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockCourses } from '@/lib/mockData';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

const mockAssignments = [
    {
        id: 'ASG001',
        title: 'Project UX Design',
        courseName: 'การออกแบบประสบการณ์ผู้ใช้',
        courseCode: 'DII201',
        dueDate: new Date('2026-02-15'),
        type: 'group',
        maxScore: 100,
        submissionCount: 35,
        totalStudents: 45,
        status: 'active',
    },
    {
        id: 'ASG002',
        title: 'React Portfolio',
        courseName: 'การพัฒนาเว็บแอปพลิเคชัน',
        courseCode: 'DII202',
        dueDate: new Date('2026-02-20'),
        type: 'individual',
        maxScore: 50,
        submissionCount: 28,
        totalStudents: 42,
        status: 'active',
    },
    {
        id: 'ASG003',
        title: 'ML Model Training',
        courseName: 'Machine Learning พื้นฐาน',
        courseCode: 'DII301',
        dueDate: new Date('2026-01-10'),
        type: 'individual',
        maxScore: 80,
        submissionCount: 38,
        totalStudents: 38,
        status: 'completed',
    },
    {
        id: 'ASG004',
        title: 'Wireframe Design',
        courseName: 'การออกแบบประสบการณ์ผู้ใช้',
        courseCode: 'DII201',
        dueDate: new Date('2026-02-28'),
        type: 'individual',
        maxScore: 30,
        submissionCount: 0,
        totalStudents: 45,
        status: 'draft',
    },
];

export default function Assignments() {
    const { t } = useLanguage();
    const { user } = useAuth();
    const [searchQuery, setSearchQuery] = React.useState('');
    const [statusFilter, setStatusFilter] = React.useState('all');

    const activeAssignments = mockAssignments.filter(a => a.status === 'active').length;
    const completedAssignments = mockAssignments.filter(a => a.status === 'completed').length;
    const draftAssignments = mockAssignments.filter(a => a.status === 'draft').length;

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'active': return <Badge className="bg-blue-100 text-blue-700">{t.assignmentsPage.inProgressTab}</Badge>;
            case 'completed': return <Badge className="bg-emerald-100 text-emerald-700">{t.assignmentsPage.completedTab}</Badge>;
            case 'draft': return <Badge className="bg-gray-100 text-gray-700">{t.assignmentsPage.draftTab}</Badge>;
            default: return <Badge>{status}</Badge>;
        }
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
        >
            {/* Header */}
            <div className="flex items-end justify-between">
                <div>
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2 text-slate-500 font-medium mb-2">
                        <ClipboardList className="w-4 h-4 text-blue-500" />
                        <span>{`${mockAssignments.length} ${t.assignmentsPage.titleHighlight} • ${activeAssignments} ${t.assignmentsPage.subtitle}`}</span>
                    </motion.div>
                    <motion.h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                        {t.assignmentsPage.title}<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">{t.assignmentsPage.titleHighlight}</span>
                    </motion.h1>
                </div>
                <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 shadow-lg">
                    <Plus className="w-4 h-4 mr-2" />
                    {t.assignmentsPage.createNew}
                </Button>
            </div>

            {/* Stats Cards */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 p-6 text-white shadow-xl shadow-blue-200"
                >
                    <div className="absolute -top-10 -right-10 w-28 h-28 bg-white/10 rounded-full blur-2xl" />
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="p-2 rounded-xl bg-white/20 backdrop-blur-sm">
                                <Clock className="w-5 h-5" />
                            </div>
                            <span className="font-medium text-white/90">{t.assignmentsPage.inProgressTab}</span>
                        </div>
                        <div className="text-4xl font-bold">{activeAssignments}</div>
                    </div>
                </motion.div>

                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 p-6 text-white shadow-xl shadow-emerald-200"
                >
                    <div className="absolute -top-10 -right-10 w-28 h-28 bg-white/10 rounded-full blur-2xl" />
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="p-2 rounded-xl bg-white/20 backdrop-blur-sm">
                                <CheckCircle className="w-5 h-5" />
                            </div>
                            <span className="font-medium text-white/90">{t.assignmentsPage.completedTab}</span>
                        </div>
                        <div className="text-4xl font-bold">{completedAssignments}</div>
                    </div>
                </motion.div>

                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500 p-6 text-white shadow-xl shadow-orange-200"
                >
                    <div className="absolute -top-10 -right-10 w-28 h-28 bg-white/10 rounded-full blur-2xl" />
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="p-2 rounded-xl bg-white/20 backdrop-blur-sm">
                                <FileText className="w-5 h-5" />
                            </div>
                            <span className="font-medium text-white/90">{t.assignmentsPage.draftTab}</span>
                        </div>
                        <div className="text-4xl font-bold">{draftAssignments}</div>
                    </div>
                </motion.div>

                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-rose-500 p-6 text-white shadow-xl shadow-purple-200"
                >
                    <div className="absolute -top-10 -right-10 w-28 h-28 bg-white/10 rounded-full blur-2xl" />
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="p-2 rounded-xl bg-white/20 backdrop-blur-sm">
                                <ClipboardList className="w-5 h-5" />
                            </div>
                            <span className="font-medium text-white/90">{t.assignmentsPage.allTab}</span>
                        </div>
                        <div className="text-4xl font-bold">{mockAssignments.length}</div>
                    </div>
                </motion.div>
            </motion.div>

            {/* Tabs */}
            <motion.div variants={itemVariants}>
                <Tabs defaultValue="all" className="space-y-4">
                    <TabsList className="bg-white/80 backdrop-blur-sm border shadow-sm">
                        <TabsTrigger value="all">{t.assignmentsPage.allTab}</TabsTrigger>
                        <TabsTrigger value="active">{t.assignmentsPage.inProgressTab}</TabsTrigger>
                        <TabsTrigger value="completed">{t.assignmentsPage.completedTab}</TabsTrigger>
                        <TabsTrigger value="draft">{t.assignmentsPage.draftTab}</TabsTrigger>
                    </TabsList>

                    <TabsContent value="all" className="space-y-4">
                        <div className="flex gap-4">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <Input
                                    placeholder={t.assignmentsPage.searchAssignment}
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                        </div>

                        <Card className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-3xl shadow-sm">
                            <CardContent className="pt-6">
                                <div className="space-y-4">
                                    {mockAssignments.map((assignment, index) => (
                                        <motion.div
                                            key={assignment.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                            whileHover={{ scale: 1.01, x: 4 }}
                                            className="p-5 border rounded-xl hover:border-primary/30 hover:shadow-md transition-all cursor-pointer group bg-gradient-to-r from-gray-50/50 to-white"
                                        >
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                                                            {assignment.title}
                                                        </h3>
                                                        {getStatusBadge(assignment.status)}
                                                        <Badge variant="outline">
                                                            {assignment.type === 'group' ? <Users className="w-3 h-3 mr-1" /> : null}
                                                            {assignment.type === 'group' ? t.assignmentsPage.group : t.assignmentsPage.individual}
                                                        </Badge>
                                                    </div>
                                                    <p className="text-sm text-gray-600">
                                                        {assignment.courseCode} • {assignment.courseName}
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-sm font-semibold text-gray-700">
                                                        {assignment.maxScore} {t.assignmentsPage.score}
                                                    </div>
                                                    <div className="text-xs text-gray-500 flex items-center justify-end gap-1">
                                                        <Calendar className="w-3 h-3" />
                                                        {t.assignmentsPage.deadline} {assignment.dueDate.toLocaleDateString('th-TH')}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <div className="flex-1 mr-6">
                                                    <div className="flex items-center justify-between text-sm mb-2">
                                                        <span className="text-gray-600">{t.assignmentsPage.submitted}</span>
                                                        <span className="font-semibold">{assignment.submissionCount}/{assignment.totalStudents} {t.assignmentsPage.people}</span>
                                                    </div>
                                                    <Progress
                                                        value={(assignment.submissionCount / assignment.totalStudents) * 100}
                                                        className="h-2"
                                                    />
                                                </div>
                                                <div className="flex gap-2">
                                                    <Button size="sm" variant="outline">{t.assignmentsPage.viewAssignment}</Button>
                                                    <Button size="sm" variant="outline">{t.assignmentsPage.gradeAssignment}</Button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="active">
                        <Card className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-3xl shadow-sm">
                            <CardContent className="pt-6">
                                <div className="space-y-4">
                                    {mockAssignments.filter(a => a.status === 'active').map((assignment, index) => (
                                        <motion.div
                                            key={assignment.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                            className="p-5 border rounded-xl hover:border-primary/30 hover:shadow-md transition-all cursor-pointer group bg-gradient-to-r from-blue-50/50 to-white"
                                        >
                                            <div className="flex items-start justify-between mb-4">
                                                <div>
                                                    <h3 className="font-semibold text-lg">{assignment.title}</h3>
                                                    <p className="text-sm text-gray-600">{assignment.courseCode} • {assignment.courseName}</p>
                                                </div>
                                                {getStatusBadge(assignment.status)}
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div className="flex-1 mr-6">
                                                    <Progress value={(assignment.submissionCount / assignment.totalStudents) * 100} className="h-2" />
                                                    <div className="text-sm text-gray-600 mt-1">{assignment.submissionCount}/{assignment.totalStudents} {t.assignmentsPage.submitted}</div>
                                                </div>
                                                <Button size="sm">{t.assignmentsPage.gradeAssignment}</Button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="completed">
                        <Card className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-3xl shadow-sm">
                            <CardContent className="pt-6">
                                <div className="space-y-4">
                                    {mockAssignments.filter(a => a.status === 'completed').map((assignment) => (
                                        <div key={assignment.id} className="p-5 border rounded-xl bg-emerald-50/50">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h3 className="font-semibold text-lg">{assignment.title}</h3>
                                                    <p className="text-sm text-gray-600">{assignment.courseCode}</p>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                                                    <span className="text-sm text-emerald-700">{t.assignmentsPage.gradedDone} {assignment.submissionCount} {t.assignmentsPage.people}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="draft">
                        <Card className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-3xl shadow-sm">
                            <CardContent className="pt-6">
                                <div className="space-y-4">
                                    {mockAssignments.filter(a => a.status === 'draft').map((assignment) => (
                                        <div key={assignment.id} className="p-5 border rounded-xl bg-gray-50/50">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h3 className="font-semibold text-lg">{assignment.title}</h3>
                                                    <p className="text-sm text-gray-600">{assignment.courseCode}</p>
                                                </div>
                                                <div className="flex gap-2">
                                                    <Button size="sm" variant="outline">{t.assignmentsPage.edit}</Button>
                                                    <Button size="sm">{t.assignmentsPage.publish}</Button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </motion.div>
        </motion.div>
    );
}
