import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Users, BookOpen, Download, Calendar, PieChart, Activity, Sparkles } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockStudents, mockCourses, mockActivities } from '@/lib/mockData';
import { useLanguage } from '@/contexts/LanguageContext';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

export default function Reports() {
    const { t } = useLanguage();
    const avgGPA = (mockStudents.reduce((sum, s) => sum + s.gpa, 0) / mockStudents.length).toFixed(2);
    const atRiskCount = mockStudents.filter(s => s.academicStatus === 'probation' || s.academicStatus === 'risk').length;
    const yearDistribution = [
        { year: 1, count: mockStudents.filter(s => s.year === 1).length },
        { year: 2, count: mockStudents.filter(s => s.year === 2).length },
        { year: 3, count: mockStudents.filter(s => s.year === 3).length },
        { year: 4, count: mockStudents.filter(s => s.year === 4).length },
    ];

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
                        <BarChart3 className="w-4 h-4 text-emerald-500" />
                        <span>{t.reports.description}</span>
                    </motion.div>
                    <motion.h1
                        className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        {t.reports.title}<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500">{t.reports.titleHighlight}</span>
                    </motion.h1>
                </div>

                <motion.div className="flex gap-3" variants={itemVariants}>
                    <Button variant="outline" className="rounded-xl border-slate-200 hover:bg-white hover:text-emerald-600">
                        <Download className="w-4 h-4 mr-2" />{t.reports.downloadReport}
                    </Button>
                </motion.div>
            </div>

            {/* Stats Grid - Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <motion.div
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                    className="p-6 rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-xl shadow-emerald-500/20 relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2.5 rounded-xl bg-white/20 backdrop-blur-sm">
                                <Users className="w-6 h-6" />
                            </div>
                            <span className="font-medium text-white/90">{t.reports.totalStudents}</span>
                        </div>
                        <div className="text-5xl font-bold tracking-tight">{mockStudents.length}</div>
                        <div className="mt-3 text-sm text-emerald-100 flex items-center gap-1">
                            <Sparkles className="w-4 h-4" />
                            {t.reports.inSystemAll}
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
                            <div className="p-2.5 rounded-xl bg-slate-100 text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                                <TrendingUp className="w-6 h-6" />
                            </div>
                            <span className="font-medium text-slate-600">{t.reports.avgGPA}</span>
                        </div>
                        <div className="text-4xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{avgGPA}</div>
                        <div className="mt-3 text-sm text-slate-400">{t.reports.avgTotal}</div>
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
                            <div className="p-2.5 rounded-xl bg-slate-100 text-slate-600 group-hover:bg-purple-50 group-hover:text-purple-600 transition-colors">
                                <BookOpen className="w-6 h-6" />
                            </div>
                            <span className="font-medium text-slate-600">{t.reports.coursesLabel}</span>
                        </div>
                        <div className="text-4xl font-bold text-slate-900 group-hover:text-purple-600 transition-colors">{mockCourses.length}</div>
                        <div className="mt-3 text-sm text-slate-400">{t.reports.coursesInSystem}</div>
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
                            <div className="p-2.5 rounded-xl bg-slate-100 text-slate-600 group-hover:bg-orange-50 group-hover:text-orange-600 transition-colors">
                                <Activity className="w-6 h-6" />
                            </div>
                            <span className="font-medium text-slate-600">{t.reports.activitiesLabel}</span>
                        </div>
                        <div className="text-4xl font-bold text-slate-900 group-hover:text-orange-600 transition-colors">{mockActivities.length}</div>
                        <div className="mt-3 text-sm text-slate-400">{t.reports.allActivities}</div>
                        <div className="absolute bottom-0 right-0 w-24 h-12 bg-gradient-to-t from-orange-50 to-transparent" />
                    </div>
                </motion.div>
            </div>

            <motion.div variants={itemVariants}>
                <Tabs defaultValue="academic" className="space-y-4">
                    <TabsList className="bg-white/80 backdrop-blur-sm border shadow-sm">
                        <TabsTrigger value="academic">{t.reports.academicTab}</TabsTrigger>
                        <TabsTrigger value="students">{t.reports.studentsTab}</TabsTrigger>
                        <TabsTrigger value="activities">{t.reports.activitiesTab}</TabsTrigger>
                    </TabsList>

                    <TabsContent value="academic" className="space-y-4">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <Card className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-3xl shadow-sm">
                                <CardHeader><CardTitle>{t.reports.gpaDistribution}</CardTitle></CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {[
                                            { range: '3.50-4.00', count: mockStudents.filter(s => s.gpa >= 3.5).length, color: 'bg-emerald-500' },
                                            { range: '3.00-3.49', count: mockStudents.filter(s => s.gpa >= 3.0 && s.gpa < 3.5).length, color: 'bg-blue-500' },
                                            { range: '2.50-2.99', count: mockStudents.filter(s => s.gpa >= 2.5 && s.gpa < 3.0).length, color: 'bg-yellow-500' },
                                            { range: '2.00-2.49', count: mockStudents.filter(s => s.gpa >= 2.0 && s.gpa < 2.5).length, color: 'bg-orange-500' },
                                            { range: t.reports.gpaBelowTwo, count: mockStudents.filter(s => s.gpa < 2.0).length, color: 'bg-red-500' },
                                        ].map((item) => (
                                            <div key={item.range}>
                                                <div className="flex justify-between text-sm mb-1">
                                                    <span>{item.range}</span>
                                                    <span className="font-semibold">{item.count} {t.common.person}</span>
                                                </div>
                                                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                                                    <div className={`h-full ${item.color} rounded-full`} style={{ width: `${(item.count / mockStudents.length) * 100}%` }} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-3xl shadow-sm">
                                <CardHeader><CardTitle>{t.reports.studentStatus}</CardTitle></CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {[
                                            { label: t.reports.normal, count: mockStudents.filter(s => s.academicStatus === 'normal').length, color: 'bg-emerald-500' },
                                            { label: t.reports.probation, count: mockStudents.filter(s => s.academicStatus === 'probation').length, color: 'bg-orange-500' },
                                            { label: t.reports.risk, count: mockStudents.filter(s => s.academicStatus === 'risk').length, color: 'bg-red-500' },
                                        ].map((item) => (
                                            <div key={item.label} className="flex items-center justify-between p-4 border rounded-xl">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-3 h-3 rounded-full ${item.color}`} />
                                                    <span>{item.label}</span>
                                                </div>
                                                <span className="font-bold text-xl">{item.count}</span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    <TabsContent value="students">
                        <Card className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-3xl shadow-sm">
                            <CardHeader><CardTitle>{t.reports.studentsByYear}</CardTitle></CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-4 gap-4">
                                    {yearDistribution.map((item) => (
                                        <div key={item.year} className="text-center p-6 border rounded-xl">
                                            <div className="text-sm text-gray-600 mb-2">{t.reports.yearLabel} {item.year}</div>
                                            <div className="text-4xl font-bold text-primary">{item.count}</div>
                                            <div className="text-xs text-gray-500 mt-1">{t.common.person}</div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="activities">
                        <Card className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-3xl shadow-sm">
                            <CardHeader><CardTitle>{t.reports.activitySummary}</CardTitle></CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                    {[
                                        { label: t.reports.allActivitiesStat, value: mockActivities.length },
                                        { label: t.reports.upcoming, value: mockActivities.filter(a => a.status === 'upcoming').length },
                                        { label: t.reports.completed, value: mockActivities.filter(a => a.status === 'completed').length },
                                        { label: t.reports.totalHours, value: mockActivities.reduce((sum, a) => sum + a.activityHours, 0) },
                                    ].map((item) => (
                                        <div key={item.label} className="text-center p-4 bg-gray-50 rounded-xl">
                                            <div className="text-sm text-gray-600 mb-1">{item.label}</div>
                                            <div className="text-2xl font-bold">{item.value}</div>
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
