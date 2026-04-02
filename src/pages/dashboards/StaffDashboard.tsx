import React from 'react';
import { motion } from 'framer-motion';
import {
  Users, BookOpen, Calendar, TrendingUp, AlertTriangle,
  FileText, Settings, BarChart3, Clock, CheckCircle, XCircle
} from 'lucide-react';
import { toast } from 'sonner';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import {
  mockStaff,
  mockStudents,
  mockCourses,
  mockLecturers,
  mockLecturerWorkloads,
  mockRequests,
} from '@/lib/mockData';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function StaffDashboard() {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const staff = mockStaff;
  const totalStudents = mockStudents.length;
  const atRiskStudents = mockStudents.filter(
    s => s.academicStatus === 'probation' || s.academicStatus === 'risk'
  ).length;
  const totalCourses = mockCourses.length;
  const totalLecturers = mockLecturers.length;
  const pendingRequests = mockRequests.filter(r => r.status === 'pending');
  const overloadedLecturers = mockLecturerWorkloads.filter(w => w.workloadPercentage > 90);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8 relative pb-10"
    >
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-[300px] overflow-hidden -z-10 pointer-events-none rounded-3xl">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[150%] rounded-full bg-purple-400/20 dark:bg-purple-900/20 blur-[100px]" />
        <div className="absolute top-[10%] -right-[10%] w-[40%] h-[120%] rounded-full bg-violet-400/20 dark:bg-violet-900/20 blur-[120px]" />
      </div>

      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-4">
        <motion.div variants={itemVariants}>
          <div className="flex items-center gap-2 mb-3 text-slate-500 dark:text-slate-400 font-medium">
            <div className="p-2 rounded-xl bg-purple-100 dark:bg-purple-900/50 shadow-sm">
              <Settings className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <span className="tracking-wide uppercase text-sm font-semibold">{t.staffDashboard.title} • {staff.department}</span>
          </div>
          <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            {t.staffDashboard.hello} <span className="bg-gradient-to-r from-purple-500 to-violet-500 bg-clip-text text-transparent">{staff.nameThai}</span> 👔
          </motion.h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">{staff.position}</p>
        </motion.div>

        <motion.div variants={itemVariants} className="flex items-center gap-3">
          <Button variant="outline" className="rounded-full px-6 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border-slate-200/60 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm" onClick={() => toast.info(t.staffDashboard.scheduleComingSoon)}>
            <Calendar className="w-4 h-4 mr-2" />{t.staffDashboard.manageSchedule}
          </Button>
          <Button
            className="rounded-full px-6 bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600 shadow-lg shadow-purple-200/50 dark:shadow-purple-900/50 text-white transition-all hover:scale-105 border-0"
            onClick={() => toast.info(t.staffDashboard.settingsComingSoon)}
          >
            <Settings className="w-4 h-4 mr-2" />{t.staffDashboard.systemSettings}
          </Button>
        </motion.div>
      </div>

      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          whileHover={{ scale: 1.02 }}
          onClick={() => navigate('/users')}
          className={`relative overflow-hidden rounded-2xl p-6 text-white shadow-xl cursor-pointer ${atRiskStudents > 0
            ? 'bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500 shadow-orange-200'
            : 'bg-gradient-to-br from-purple-500 via-violet-500 to-indigo-500 shadow-purple-200'
            }`}
        >
          <div className="absolute -top-10 -right-10 w-28 h-28 bg-white/10 rounded-full blur-2xl dark:bg-slate-900/50" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 rounded-xl bg-white/20 backdrop-blur-sm dark:bg-slate-900/50">
                <Users className="w-5 h-5" />
              </div>
              <span className="font-medium text-white/90">{t.staffDashboard.totalStudents}</span>
            </div>
            <div className="text-4xl font-bold">{totalStudents}</div>
            <div className="text-sm text-white/80 mt-2">{t.staffDashboard.atRisk} {atRiskStudents} {t.lecturerDashboard.people}</div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          onClick={() => navigate('/courses')}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 p-6 text-white shadow-xl shadow-blue-200 cursor-pointer"
        >
          <div className="absolute -top-10 -right-10 w-28 h-28 bg-white/10 rounded-full blur-2xl dark:bg-slate-900/50" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 rounded-xl bg-white/20 backdrop-blur-sm dark:bg-slate-900/50">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="font-medium text-white/90">{t.staffDashboard.courses}</span>
            </div>
            <div className="text-4xl font-bold">{totalCourses}</div>
            <div className="text-sm text-white/80 mt-2">{t.staffDashboard.coursesThisSem}</div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          onClick={() => navigate('/users')}
          className={`relative overflow-hidden rounded-2xl p-6 text-white shadow-xl cursor-pointer ${overloadedLecturers.length > 0
            ? 'bg-gradient-to-br from-red-500 via-rose-500 to-pink-500 shadow-red-200'
            : 'bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 shadow-emerald-200'
            }`}
        >
          <div className="absolute -top-10 -right-10 w-28 h-28 bg-white/10 rounded-full blur-2xl dark:bg-slate-900/50" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 rounded-xl bg-white/20 backdrop-blur-sm dark:bg-slate-900/50">
                <Users className="w-5 h-5" />
              </div>
              <span className="font-medium text-white/90">{t.staffDashboard.lecturers}</span>
            </div>
            <div className="text-4xl font-bold">{totalLecturers}</div>
            <div className="text-sm text-white/80 mt-2">{t.staffDashboard.overloaded} {overloadedLecturers.length} {t.lecturerDashboard.people}</div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          onClick={() => navigate('/documents')}
          className={`relative overflow-hidden rounded-2xl p-6 text-white shadow-xl cursor-pointer ${pendingRequests.length > 5
            ? 'bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500 shadow-orange-200'
            : 'bg-gradient-to-br from-purple-500 via-pink-500 to-rose-500 shadow-purple-200'
            }`}
        >
          <div className="absolute -top-10 -right-10 w-28 h-28 bg-white/10 rounded-full blur-2xl dark:bg-slate-900/50" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 rounded-xl bg-white/20 backdrop-blur-sm dark:bg-slate-900/50">
                <FileText className="w-5 h-5" />
              </div>
              <span className="font-medium text-white/90">{t.staffDashboard.pendingRequests}</span>
            </div>
            <div className="text-4xl font-bold">{pendingRequests.length}</div>
            <div className="text-sm text-white/80 mt-2">{t.staffDashboard.needsReview}</div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div variants={itemVariants} className="mt-8">
        <Card className="bg-white/60 backdrop-blur-xl border border-white/60 dark:border-slate-800/60 rounded-3xl shadow-lg dark:bg-slate-900/50 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-400/10 dark:bg-purple-900/10 rounded-full blur-3xl" />
          <CardHeader className="relative z-10 border-b border-slate-100/50 dark:border-slate-800/50 pb-6 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/50 rounded-xl">
                <BarChart3 className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-slate-800 dark:text-slate-100">{t.staffDashboard.systemOverview}</CardTitle>
                <CardDescription className="text-slate-500 dark:text-slate-400">{t.staffDashboard.systemOverviewDesc}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {atRiskStudents > 0 && (
                <div className="relative overflow-hidden border border-red-200 dark:border-red-900/50 bg-gradient-to-br from-red-50 to-orange-50 p-6 rounded-2xl dark:from-red-950/20 dark:to-orange-950/20 shadow-sm transition-all hover:shadow-md">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/10 dark:bg-red-500/5 rounded-full blur-xl" />
                  <div className="flex items-center gap-3 mb-3 relative z-10">
                    <div className="p-2 bg-white/80 dark:bg-slate-900/50 rounded-lg shadow-sm border border-red-100 dark:border-red-900/50">
                      <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
                    </div>
                    <h3 className="font-bold text-red-900 dark:text-red-400 text-lg">{t.staffDashboard.atRiskStudents}</h3>
                  </div>
                  <p className="text-sm text-red-700/80 dark:text-red-300/80 relative z-10 font-medium">
                    {t.staffDashboard.atRiskDesc} <span className="font-bold text-red-600 dark:text-red-400">({atRiskStudents})</span>
                  </p>
                </div>
              )}
              <div className="relative overflow-hidden border border-blue-200 dark:border-blue-900/50 bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl dark:from-blue-950/20 dark:to-indigo-950/20 shadow-sm transition-all hover:shadow-md">
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-xl" />
                <div className="flex items-center gap-3 mb-3 relative z-10">
                  <div className="p-2 bg-white/80 dark:bg-slate-900/50 rounded-lg shadow-sm border border-blue-100 dark:border-blue-900/50">
                    <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="font-bold text-blue-900 dark:text-blue-400 text-lg">{t.staffDashboard.systemReady}</h3>
                </div>
                <p className="text-sm text-blue-700/80 dark:text-blue-300/80 relative z-10 font-medium">
                  {t.staffDashboard.systemReadyDesc}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
