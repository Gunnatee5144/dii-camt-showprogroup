import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Student } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import {
  BookOpen, Users, Calendar, MapPin, Filter, Search,
  GraduationCap, Clock, AlertCircle, ChevronRight,
  MoreHorizontal, Plus, Sparkles, BookMarked
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
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Courses() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredCourses = searchQuery
    ? mockCourses.filter(c =>
      c.code?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.nameThai?.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : mockCourses;

  if (user?.role === 'student') {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8 pb-10"
      >
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 text-slate-500 font-medium mb-2"
            >
              <BookOpen className="w-4 h-4 text-blue-500" />
              <span>{t.coursesPage.semester}</span>
            </motion.div>
            <motion.h1
              className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {t.coursesPage.title}<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">{t.coursesPage.titleHighlight}</span>
            </motion.h1>
          </div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              className="h-12 px-6 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white shadow-xl shadow-slate-900/20 border border-slate-700"
              onClick={() => toast.info(t.coursesPage.registrationClosed)}
            >
              <Plus className="w-4 h-4 mr-2" />
              {t.coursesPage.addCourse}
            </Button>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="p-6 rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/20 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-white/20 backdrop-blur-sm">
                  <BookMarked className="w-6 h-6" />
                </div>
                <span className="font-medium text-white/90">{t.coursesPage.registeredCourses}</span>
              </div>
              <div className="text-4xl font-bold">{mockCourses.length}</div>
              <div className="mt-2 text-sm text-blue-100 flex items-center gap-1">
                <Sparkles className="w-4 h-4" /> {t.coursesPage.regularSemester}
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="p-6 rounded-3xl bg-gradient-to-br from-purple-500 to-pink-600 text-white shadow-lg shadow-purple-500/20 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-white/20 backdrop-blur-sm">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <span className="font-medium text-white/90">{t.coursesPage.totalCredits}</span>
              </div>
              <div className="text-4xl font-bold">19</div>
              <div className="mt-2 text-sm text-purple-100">
                {t.coursesPage.maxCredits}
              </div>
              {/* Mini Progress Bar */}
              <div className="mt-4 h-1.5 w-full bg-black/20 rounded-full overflow-hidden">
                <div className="h-full bg-white/90 w-[86%]" />
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
                  <Calendar className="w-6 h-6" />
                </div>
                <span className="font-medium text-slate-600">{t.coursesPage.registrationStatus}</span>
              </div>
              <div className="text-2xl font-bold text-slate-800">{t.coursesPage.confirmed}</div>
              <div className="mt-2 text-sm text-green-600 flex items-center gap-1 bg-green-50 w-fit px-2 py-1 rounded-lg">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                {t.coursesPage.paid}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="my-courses" className="space-y-8">
          <TabsList className="bg-white/40 backdrop-blur-xl border border-white/40 p-1.5 h-auto rounded-2xl shadow-sm w-full md:w-auto flex overflow-x-auto">
            <TabsTrigger value="my-courses" className="rounded-xl px-6 py-2.5 data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-md font-medium text-slate-600 flex-1 md:flex-none">
              {t.coursesPage.myCourses}
            </TabsTrigger>
            <TabsTrigger value="registration" className="rounded-xl px-6 py-2.5 data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-md font-medium text-slate-600 flex-1 md:flex-none">
              {t.coursesPage.registerTab}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="my-courses" className="space-y-6">
            {/* Search Bar */}
            <motion.div variants={itemVariants} className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  placeholder={t.coursesPage.searchCourses}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 rounded-2xl border-slate-200 bg-white/60 focus:bg-white transition-all shadow-sm focus:ring-2 focus:ring-blue-100"
                />
              </div>
              <Button variant="outline" className="h-12 px-6 rounded-2xl border-slate-200 bg-white/60 hover:bg-white text-slate-600">
                <Filter className="w-4 h-4 mr-2" />
                {t.coursesPage.filter}
              </Button>
            </motion.div>

            {/* Courses Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.slice(0, 6).map((course, index) => (
                <motion.div
                  key={course.id}
                  variants={itemVariants}
                  whileHover={{ y: -8, scale: 1.01 }}
                  className="group relative bg-white/70 backdrop-blur-xl border border-white/60 p-6 rounded-3xl shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 cursor-pointer overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-blue-50/50 opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-6">
                      <Badge variant="outline" className="bg-white/50 backdrop-blur border-slate-200 text-slate-600 px-3 py-1 text-xs font-bold rounded-lg group-hover:bg-blue-50 group-hover:text-blue-600 group-hover:border-blue-100 transition-colors">
                        {(user as unknown as Student).year || 3}
                      </Badge>
                      <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                        <MoreHorizontal className="w-5 h-5" />
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-slate-800 mb-1 group-hover:text-blue-600 transition-colors line-clamp-1">{course.name}</h3>
                    <p className="text-slate-500 text-sm mb-6 line-clamp-1">{course.nameThai}</p>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-3 text-sm text-slate-600">
                        <Users className="w-4 h-4 text-slate-400" />
                        <span className="truncate">{course.lecturerName || t.coursesPage.instructorTBA}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-slate-600">
                        <Clock className="w-4 h-4 text-slate-400" />
                        <span>{t.coursesPage.lecturerSchedule}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-slate-600">
                        <MapPin className="w-4 h-4 text-slate-400" />
                        <span>{t.coursesPage.room}</span>
                      </div>
                    </div>

                    {/* Progress */}
                    <div className="pt-4 border-t border-slate-100">
                      <div className="flex justify-between text-xs font-medium mb-2">
                        <span className="text-slate-500">{t.coursesPage.progress}</span>
                        <span className="text-blue-600">85%</span>
                      </div>
                      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: '85%' }}
                          className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="registration" className="space-y-6">
            <motion.div variants={itemVariants} className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10">
                <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
                  <Sparkles className="w-6 h-6 text-yellow-300" />
                  {t.coursesPage.recommended}
                </h2>
                <p className="text-indigo-100 mb-8 max-w-2xl">
                  {t.coursesPage.recommendedDesc}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { code: 'DII302', name: 'Advanced AI', credit: 3, reason: `❤️ ${t.coursesPage.required}` },
                    { code: 'DII305', name: 'Software Arch.', credit: 3, reason: `⭐ ${t.coursesPage.core}` },
                    { code: 'DII391', name: 'Pre-Coop', credit: 1, reason: `🎯 ${t.coursesPage.preIntern}` },
                  ].map((rec, idx) => (
                    <div key={idx} className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl hover:bg-white/20 transition-colors cursor-pointer">
                      <div className="flex justify-between items-start mb-3">
                        <Badge className="bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur">{rec.code}</Badge>
                        <span className="text-xs font-medium text-indigo-100 bg-indigo-500/30 px-2 py-1 rounded-lg">{rec.reason}</span>
                      </div>
                      <h3 className="font-bold text-lg mb-1">{rec.name}</h3>
                      <p className="text-sm text-indigo-200">{rec.credit} {t.coursesPage.credits}</p>
                      <Button size="sm" className="w-full mt-4 bg-white text-indigo-600 hover:bg-indigo-50 border-0 font-bold">
                        {t.coursesPage.viewDetails}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* General Search Placeholder */}
            <motion.div variants={itemVariants} className="border-2 border-dashed border-slate-200 rounded-3xl p-12 flex flex-col items-center justify-center text-slate-400 bg-slate-50/50">
              <Search className="w-12 h-12 mb-4 opacity-50" />
              <h3 className="text-lg font-bold text-slate-600">{t.coursesPage.searchOther}</h3>
              <p className="text-sm mb-6">{t.coursesPage.searchDesc}</p>
              <div className="flex gap-2 w-full max-w-md">
                <Input placeholder={t.coursesPage.searchPlaceholder} className="bg-white" />
                <Button>{t.coursesPage.searchButton}</Button>
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </motion.div>
    );
  }

  // Lecturer View (Simplified but Styled)
  if (user?.role === 'lecturer') {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        <div className="flex items-end justify-between">
          <div>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2 text-slate-500 font-medium mb-2">
              <BookOpen className="w-4 h-4 text-blue-500" />
              <span>{t.coursesPage.semesterLabel}</span>
            </motion.div>
            <motion.h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              {t.coursesPage.manageCourses}<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">{t.coursesPage.manageCoursesHighlight}</span>
            </motion.h1>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockCourses.slice(0, 3).map((course) => (
            <motion.div variants={itemVariants} key={course.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-lg transition-all">
              <div className="flex justify-between items-start mb-4">
                <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-0">{course.code}</Badge>
                <Button variant="ghost" size="icon" className="-mr-2 -mt-2"><MoreHorizontal className="w-4 h-4" /></Button>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">{course.name}</h3>
              <p className="text-sm text-slate-500 mb-6">{course.nameThai}</p>
              <div className="flex items-center justify-between text-sm py-3 border-t border-slate-100">
                <span className="text-slate-500">{t.coursesPage.studentsRegistered}</span>
                <span className="font-bold text-slate-900">45 {t.coursesPage.studentsCount}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  }

  // Fallback / Admin
  return (
    <div className="p-8 text-center text-slate-500">
      Coming soon for role: {user?.role}
    </div>
  );
}
