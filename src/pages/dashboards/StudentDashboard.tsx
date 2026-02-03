import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, Calendar, Trophy, TrendingUp, Clock, Award,
  AlertCircle, CheckCircle2, GraduationCap, Target, Activity as ActivityIcon,
  Sparkles, Flame, Star, Zap, ChevronRight, Bell, ArrowUpRight,
  MoreHorizontal
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Timetable } from '@/components/common/Timetable';
import { StudentTimeline } from '@/components/common/StudentTimeline';
import {
  mockStudent,
  mockCourses,
  mockActivities,
  mockTimelineEvents,
  mockGrades,
  getStudentTimeline,
  getStudentGrades,
} from '@/lib/mockData';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
};

export default function StudentDashboard() {
  const navigate = useNavigate();
  const student = mockStudent;
  const timeline = getStudentTimeline(student.id);
  const grades = getStudentGrades(student.id);
  const [activeTab, setActiveTab] = React.useState('overview');

  const currentCourses = mockCourses.filter(
    course => course.semester === student.semester &&
      course.academicYear === student.academicYear
  );

  const creditProgress = (student.earnedCredits / student.totalCredits) * 100;
  const upcomingActivities = mockActivities.filter(a => a.status === 'upcoming').slice(0, 3);

  // Time-based greeting
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'สวัสดีตอนเช้า' : hour < 18 ? 'สวัสดีตอนบ่าย' : 'สวัสดีตอนเย็น';

  const StatCard = ({ icon: Icon, label, value, subtext, gradient, delay, onClick }: any) => (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`relative overflow-hidden rounded-3xl p-6 cursor-pointer group shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/20 ${gradient}`}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-white/20 transition-colors" />
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div className="p-3 rounded-2xl bg-white/20 backdrop-blur-md shadow-sm border border-white/10">
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <ArrowUpRight className="w-4 h-4 text-white" />
          </div>
        </div>
        <div>
          <p className="text-white/80 text-sm font-medium mb-1">{label}</p>
          <h3 className="text-3xl font-bold text-white tracking-tight">{value}</h3>
          {subtext && <div className="mt-2">{subtext}</div>}
        </div>
      </div>
    </motion.div>
  );

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8 pb-10"
    >
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-slate-500 font-medium mb-2"
          >
            <Sparkles className="w-4 h-4 text-yellow-500" />
            <span>{greeting}, {student.nameThai}</span>
          </motion.div>
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            พร้อมลุยกับ<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">การเรียนวันนี้</span>หรือยัง? 🚀
          </motion.h1>
        </div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            className="h-12 px-6 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white shadow-xl shadow-slate-900/20 border border-slate-700"
            onClick={() => navigate('/portfolio')}
          >
            <Trophy className="w-4 h-4 mr-2 text-yellow-500" />
            ดู Portfolio ของฉัน
          </Button>
        </motion.div>
      </div>

      {/* Bento Grid Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={TrendingUp}
          label="เกรดเฉลี่ย (GPA)"
          value={student.gpa.toFixed(2)}
          gradient="bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600"
          subtext={
            <div className="flex items-center gap-1.5 text-xs text-blue-100 bg-blue-500/30 w-fit px-2 py-1 rounded-lg backdrop-blur-sm">
              <span className="font-semibold">GPAX: {student.gpax.toFixed(2)}</span>
            </div>
          }
          onClick={() => navigate('/grades')}
        />
        <StatCard
          icon={BookOpen}
          label="หน่วยกิตสะสม"
          value={`${student.earnedCredits}/${student.totalCredits}`}
          gradient="bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500"
          subtext={
            <div className="h-1.5 w-full bg-black/20 rounded-full mt-2 overflow-hidden">
              <div
                className="h-full bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                style={{ width: `${creditProgress}%` }}
              />
            </div>
          }
          onClick={() => navigate('/courses')}
        />
        <StatCard
          icon={Zap}
          label="คะแนนกิจกรรม"
          value={student.gamificationPoints}
          gradient="bg-gradient-to-br from-amber-400 via-orange-500 to-red-500"
          subtext={
            <div className="flex items-center gap-1 text-xs text-orange-100">
              <Flame className="w-3 h-3 fill-orange-100" /> Level 5 Explorer
            </div>
          }
          onClick={() => navigate('/activities')}
        />
        <StatCard
          icon={Clock}
          label="ชั่วโมงกิจกรรม"
          value={`${student.totalActivityHours} ชม.`}
          gradient="bg-gradient-to-br from-emerald-400 via-emerald-500 to-teal-600"
          subtext={<span className="text-emerald-100 text-xs">ครบตามเกณฑ์ขั้นต่ำแล้ว</span>}
          onClick={() => navigate('/activities')}
        />
      </div>

      {/* Main Content Area */}
      <Tabs defaultValue="overview" className="space-y-8" onValueChange={setActiveTab}>
        <div className="flex justify-center md:justify-start">
          <TabsList className="bg-white/40 backdrop-blur-xl border border-white/40 p-1.5 h-auto rounded-2xl shadow-sm">
            {[
              { id: 'overview', icon: Target, label: 'ภาพรวม' },
              { id: 'schedule', icon: Calendar, label: 'ตารางเรียน' },
              { id: 'grades', icon: TrendingUp, label: 'ผลการเรียน' },
              { id: 'timeline', icon: ActivityIcon, label: 'Timeline' },
            ].map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="rounded-xl px-6 py-3 data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-lg shadow-blue-500/10 transition-all duration-300 font-medium text-slate-600"
              >
                <tab.icon className="w-4 h-4 mr-2" />
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <TabsContent value="overview" className="mt-0" key="overview" forceMount>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column (2/3) */}
                <div className="lg:col-span-2 space-y-8">
                  {/* Current Courses - Glassmorphism */}
                  <motion.div variants={itemVariants} className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-purple-500" /> รายวิชาเทอมนี้
                      </h3>
                      <Button variant="ghost" className="text-slate-500 hover:text-purple-600" onClick={() => navigate('/courses')}>ดูทั้งหมด</Button>
                    </div>

                    <div className="grid gap-4">
                      {currentCourses.map((course, index) => (
                        <motion.div
                          key={course.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="group relative bg-white/60 backdrop-blur-xl border border-white/60 p-5 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                          <div className="relative flex items-center justify-between">
                            <div className="flex items-center gap-5">
                              <div className="w-14 h-14 rounded-2xl bg-white shadow-md flex items-center justify-center text-lg font-bold text-slate-700 border border-slate-100 group-hover:scale-110 transition-transform">
                                {course.code?.substring(0, 3)}
                              </div>
                              <div>
                                <h4 className="text-lg font-bold text-slate-800 group-hover:text-purple-600 transition-colors">{course.nameThai}</h4>
                                <div className="flex items-center gap-3 text-sm text-slate-500 mt-1">
                                  <span className="bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">{course.code}</span>
                                  <span>•</span>
                                  <span>{course.credits} หน่วยกิต</span>
                                  <span>•</span>
                                  <span className="flex items-center gap-1"><GraduationCap className="w-3 h-3" /> {course.lecturerName}</span>
                                </div>
                              </div>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-purple-100 group-hover:text-purple-600 transition-colors">
                              <ChevronRight className="w-5 h-5" />
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Progress Card */}
                  <motion.div variants={itemVariants} className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-blue-500/20 rounded-full blur-[80px]" />
                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                      <div className="relative w-40 h-40 flex-shrink-0">
                        {/* Circular Progress Placeholder - In real app use SVG circle */}
                        <div className="absolute inset-0 rounded-full border-[12px] border-slate-700" />
                        <div className="absolute inset-0 rounded-full border-[12px] border-blue-500 border-l-transparent border-b-transparent rotate-45" />
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-3xl font-bold">{creditProgress.toFixed(0)}%</span>
                          <span className="text-xs text-slate-400">Complete</span>
                        </div>
                      </div>
                      <div className="flex-1 text-center md:text-left">
                        <h3 className="text-2xl font-bold mb-2">เส้นทางสู่ความสำเร็จ 🎓</h3>
                        <p className="text-slate-300 mb-6">คุณมาไกลมากแล้ว! เหลืออีกเพียง {student.totalCredits - student.earnedCredits} หน่วยกิตก็จะจบการศึกษา รักษามาตรฐานนี้ไว้ คุณทำได้!</p>
                        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                          <div className="bg-slate-800/50 backdrop-blur-md px-4 py-3 rounded-xl border border-slate-700">
                            <div className="text-xs text-slate-400">เกรดเฉลี่ยสูงสุด</div>
                            <div className="text-xl font-bold text-emerald-400">3.95</div>
                          </div>
                          <div className="bg-slate-800/50 backdrop-blur-md px-4 py-3 rounded-xl border border-slate-700">
                            <div className="text-xs text-slate-400">วิชาที่ผ่านแล้ว</div>
                            <div className="text-xl font-bold text-blue-400">42 วิชา</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Right Column (1/3) */}
                <div className="space-y-8">
                  {/* Upcoming Events */}
                  <motion.div variants={itemVariants} className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-3xl p-6 shadow-sm">
                    <h3 className="text-lg font-bold text-slate-800 mb-5 flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-orange-500" /> กิจกรรมเร็วๆ นี้
                    </h3>
                    <div className="space-y-5">
                      {upcomingActivities.map((activity, i) => (
                        <div key={i} className="flex gap-4 relative">
                          <div className="flex-col items-center hidden sm:flex">
                            <div className="w-3 h-3 rounded-full bg-orange-500 ring-4 ring-orange-100" />
                            {i !== upcomingActivities.length - 1 && <div className="w-0.5 h-full bg-slate-200 my-1" />}
                          </div>
                          <div className="flex-1 bg-white p-4 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                            <div className="text-xs font-bold text-orange-500 mb-1">{new Date(activity.startDate).toLocaleDateString('th-TH')}</div>
                            <h4 className="font-bold text-slate-800 text-sm mb-1">{activity.titleThai}</h4>
                            <div className="flex gap-2 mt-2">
                              <Badge variant="secondary" className="text-[10px]">+{activity.gamificationPoints} XP</Badge>
                              <Badge variant="outline" className="text-[10px]">{activity.activityHours} ชม.</Badge>
                            </div>
                          </div>
                        </div>
                      ))}
                      <Button variant="outline" className="w-full rounded-xl border-dashed border-slate-300 text-slate-500 hover:text-orange-600 hover:border-orange-300" onClick={() => navigate('/activities')}>
                        ดูปฏิทินกิจกรรมทั้งหมด
                      </Button>
                    </div>
                  </motion.div>

                  {/* Quick Actions */}
                  <motion.div variants={itemVariants}>
                    <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 px-2">ทางลัด</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { icon: Calendar, label: 'นัดหมาย', color: 'bg-blue-100 text-blue-600', path: '/appointments' },
                        { icon: BookOpen, label: 'คำร้อง', color: 'bg-indigo-100 text-indigo-600', path: '/requests' },
                        { icon: Zap, label: 'สะสมแต้ม', color: 'bg-yellow-100 text-yellow-600', path: '/activities' },
                        { icon: MoreHorizontal, label: 'อื่นๆ', color: 'bg-slate-100 text-slate-600', path: '/settings' },
                      ].map((action, i) => (
                        <div
                          key={i}
                          onClick={() => navigate(action.path)}
                          className="flex flex-col items-center justify-center p-4 bg-white/60 backdrop-blur-md border border-white/60 rounded-2xl hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-sm hover:shadow-md"
                        >
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${action.color}`}>
                            <action.icon className="w-5 h-5" />
                          </div>
                          <span className="text-xs font-bold text-slate-600">{action.label}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </TabsContent>
          )}

          {activeTab === 'schedule' && (
            <TabsContent value="schedule" className="mt-0" key="schedule" forceMount>
              <motion.div variants={itemVariants} className="bg-white/80 backdrop-blur-xl border border-white/60 rounded-3xl p-6 shadow-sm">
                <Timetable
                  courses={currentCourses}
                  semester={student.semester}
                  academicYear={student.academicYear}
                />
              </motion.div>
            </TabsContent>
          )}

          {activeTab === 'grades' && (
            <TabsContent value="grades" className="mt-0" key="grades" forceMount>
              {/* Same logic as before but wrapped in new Card style */}
              <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {grades.map((grade, index) => {
                  const course = mockCourses.find(c => c.id === grade.courseId);
                  const isA = grade.letterGrade === 'A';
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className={`relative overflow-hidden p-6 rounded-3xl border ${isA ? 'bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-100' : 'bg-white border-slate-100'} shadow-sm hover:shadow-lg transition-all`}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center font-bold text-slate-700 text-sm border border-slate-100">
                          {course?.code?.substring(0, 3)}
                        </div>
                        <div className={`text-3xl font-black ${isA ? 'text-emerald-500' : 'text-slate-300'}`}>
                          {grade.letterGrade}
                        </div>
                      </div>
                      <h4 className="font-bold text-slate-800 text-lg mb-1">{course?.code}</h4>
                      <p className="text-slate-500 text-sm line-clamp-1">{course?.nameThai}</p>
                      <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center text-sm">
                        <span className="text-slate-400">หน่วยกิต: {course?.credits}</span>
                        <span className="font-bold text-slate-700">{grade.total} คะแนน</span>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </TabsContent>
          )}

          {activeTab === 'timeline' && (
            <TabsContent value="timeline" className="mt-0" key="timeline" forceMount>
              <motion.div variants={itemVariants} className="bg-white/80 backdrop-blur-xl border border-white/60 rounded-3xl p-6 shadow-sm">
                <StudentTimeline events={timeline} showFilters />
              </motion.div>
            </TabsContent>
          )}
        </AnimatePresence>
      </Tabs>
    </motion.div >
  );
}
