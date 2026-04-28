import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, Calendar, Trophy, TrendingUp, Clock, Award,
  AlertCircle, CheckCircle2, GraduationCap, Target, Activity as ActivityIcon,
  Sparkles, Flame, Star, Zap, ChevronRight, Bell, ArrowUpRight,
  MoreHorizontal, User, Briefcase
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Timetable } from '@/components/common/Timetable';
import { StudentTimeline } from '@/components/common/StudentTimeline';
import { DegreeProgressCard } from '@/components/dashboard/DegreeProgressCard';
import { CreditMatrixCard } from '@/components/dashboard/CreditMatrixCard';
import { GPAHistoryCard } from '@/components/dashboard/GPAHistoryCard';
import { TechnicalSkillsRubricCard } from '@/components/dashboard/TechnicalSkillsRubricCard';
import { SoftSkillsRubricCard } from '@/components/dashboard/SoftSkillsRubricCard';
import { SkillsRadarCard } from '@/components/dashboard/SkillsRadarCard';
import { CourseGradesCard } from '@/components/dashboard/CourseGradesCard';
import {
  mockStudent,
  mockCourses,
  mockActivities,
  mockTimelineEvents,
  mockGrades,
  getStudentTimeline,
  getStudentGrades,
  getStudentAppointments,
} from '@/lib/mockData';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 100 } },
};

// Mock data for GPA History
const semesterGPAHistory = [
  { semester: '1/2565', gpa: 3.25, credits: 18 },
  { semester: '2/2565', gpa: 3.35, credits: 21 },
  { semester: '1/2566', gpa: 3.48, credits: 18 },
  { semester: '2/2566', gpa: 3.52, credits: 21 },
  { semester: '1/2567', gpa: 3.65, credits: 18 },
  { semester: '2/2567', gpa: 3.45, credits: 21 },
];

// Mock data for Technical Skills (Rubric-based)
const technicalSkillScores = {
  functionality: 4.2, // โค้ดทำงานได้จริง
  readability: 3.8, // โค้ดอ่านง่าย
  bestPractice: 4.0, // โครงสร้างถูกต้อง
  professorWeight: 60,
  peerWeight: 40,
  professorScore: 4.1,
  peerScore: 3.9,
  commentTags: {
    bug: 2,
    suggestion: 8,
    goodJob: 15,
  },
};

// Mock data for Soft Skills (AAC&U Value Rubrics)
const softSkillScores = {
  communication: 4.0, // การสื่อสาร (README/Document)
  openness: 4.3, // ความเปิดกว้าง (การตอบกลับคอมเมนต์)
  professorWeight: 60,
  peerWeight: 40,
  professorScore: 4.2,
  peerScore: 4.0,
  feedbackHistory: [
    { projectName: 'Capstone Project', date: '15 ม.ค. 68', communicationScore: 4.5, opennessScore: 4.3, comments: 12 },
    { projectName: 'UX Design Workshop', date: '20 พ.ย. 67', communicationScore: 3.8, opennessScore: 4.1, comments: 8 },
    { projectName: 'Hackathon 2026', date: '10 มี.ค. 67', communicationScore: 4.2, opennessScore: 4.5, comments: 15 },
  ],
};

// Transform grades for CourseGradesCard
const transformGradesForCard = () => {
  const studentGrades = getStudentGrades(mockStudent.id);
  return studentGrades.map(grade => {
    const course = mockCourses.find(c => c.id === grade.courseId);
    return {
      courseId: grade.courseId,
      courseCode: course?.code || '',
      courseName: course?.nameThai || course?.name || '',
      credits: course?.credits || 0,
      letterGrade: grade.letterGrade || 'I',
      semester: course ? `${course.semester}/${course.academicYear}` : '1/2568',
      total: grade.total,
    };
  });
};

const mockCompanyTargets = [
  {
    id: 1,
    name: 'TechFlow Solutions',
    role: 'Frontend Developer',
    requirements: {
      gpa: 3.5,
      technicalSkills: { functionality: 4.0, readability: 3.5, bestPractice: 4.0 },
      softSkills: { communication: 3.5, openness: 4.0 }
    }
  },
  {
    id: 2,
    name: 'DataNex Systems',
    role: 'Full Stack Engineer',
    requirements: {
      gpa: 3.2,
      technicalSkills: { functionality: 3.8, readability: 3.8, bestPractice: 3.8 },
      softSkills: { communication: 4.0, openness: 3.5 }
    }
  }
];

export default function StudentDashboard() {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();
  const student = mockStudent;
  const timeline = getStudentTimeline(student.id);
  const grades = getStudentGrades(student.id);
  const [activeTab, setActiveTab] = React.useState('overview');
  const appointments = getStudentAppointments(student.id);

  const currentCourses = mockCourses.filter(
    course => course.semester === student.semester &&
      course.academicYear === student.academicYear
  );

  const studentCourses = mockCourses.filter(c => c.enrolledStudents.includes(student.id));
  const courseGrades = transformGradesForCard();

  const creditProgress = (student.earnedCredits / student.totalCredits) * 100;
  
  const today = new Date();
  const nextMonth = new Date();
  nextMonth.setMonth(today.getMonth() + 1);
  
  const upcomingActivities = mockActivities.filter(a => {
    if (a.status !== 'upcoming') return false;
    const actDate = new Date(a.startDate);
    return actDate >= today && actDate <= nextMonth;
  }).sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()).slice(0, 3);


  // Time-based greeting
  const hour = new Date().getHours();
  const greeting = hour < 12 ? t.studentDashboard.goodMorning : hour < 18 ? t.studentDashboard.goodAfternoon : t.studentDashboard.goodEvening;

  const yearLabel = ['', 'ปี 1', 'ปี 2', 'ปี 3', 'ปี 4'][student.year] || `ปี ${student.year}`;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8 pb-10"
    >
      {/* Profile Header with Year */}
      <motion.div
        variants={itemVariants}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 text-white shadow-2xl"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-emerald-500/10 to-teal-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8">
          {/* Avatar */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative"
          >
            <div className="w-28 h-28 lg:w-32 lg:h-32 rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 p-1 shadow-xl shadow-blue-500/30">
              <div className="w-full h-full rounded-[22px] bg-slate-800 flex items-center justify-center overflow-hidden">
                {student.avatar ? (
                  <img src={student.avatar} alt={student.name} className="w-full h-full object-cover" />
                ) : (
                  <User className="w-16 h-16 text-slate-400" />
                )}
              </div>
            </div>
            <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
              {yearLabel}
            </div>
          </motion.div>

          {/* Info */}
          <div className="flex-1 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2 text-slate-400 text-sm mb-2">
              <Sparkles className="w-4 h-4 text-yellow-500" />
              <span>{greeting}</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold mb-2">{student.nameThai}</h1>
            <p className="text-slate-400 mb-4">{student.name}</p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm text-slate-300">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-blue-400" />
                <span>{student.major}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-emerald-400" />
                <span>{t.studentDashboard.semester} {student.semester}/{student.academicYear}</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-yellow-400" />
                <span>{student.gamificationPoints} XP</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mt-4">
              <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                {t.studentDashboard.studentId} {student.studentId}
              </Badge>
              <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
                GPAX: {student.gpax.toFixed(2)}
              </Badge>
              {student.academicStatus === 'normal' && (
                <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                  {t.studentDashboard.statusNormal}
                </Badge>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-col gap-3">
            <Button
              onClick={() => navigate('/portfolio')}
              className="bg-white dark:bg-slate-900/10 hover:bg-white dark:bg-slate-900/20 text-white border border-white/20 rounded-xl"
            >
              <Trophy className="w-4 h-4 mr-2 text-yellow-500" />
              {t.studentDashboard.viewPortfolio}
            </Button>
            <Button
              onClick={() => navigate('/settings')}
              variant="ghost"
              className="text-slate-300 hover:text-white hover:bg-white dark:bg-slate-900/10 rounded-xl"
            >
              {t.studentDashboard.editProfile}
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-8" onValueChange={setActiveTab}>
        <div className="flex justify-center md:justify-start">
          <TabsList className="bg-white dark:bg-slate-900/40 backdrop-blur-xl border border-white/40 p-1.5 h-auto rounded-2xl shadow-sm flex-wrap">
            {[
              { id: 'overview', icon: Target, label: t.studentDashboard.overview },
              { id: 'schedule', icon: Calendar, label: t.studentDashboard.schedule },
              { id: 'grades', icon: TrendingUp, label: t.studentDashboard.grades },
              { id: 'skills', icon: Zap, label: t.studentDashboard.skills },
              { id: 'timeline', icon: ActivityIcon, label: 'Timeline' },
              { id: 'careers', icon: Briefcase, label: 'Company Targets' },
            ].map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="rounded-xl px-4 lg:px-6 py-2.5 data-[state=active]:bg-white dark:bg-slate-900 data-[state=active]:text-blue-600 data-[state=active]:shadow-lg shadow-blue-500/10 transition-all duration-300 font-medium text-slate-600 dark:text-slate-400"
              >
                <tab.icon className="w-4 h-4 mr-2" />
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <AnimatePresence mode="wait">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <TabsContent value="overview" className="mt-0" key="overview" forceMount>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - 2/3 */}
                <div className="lg:col-span-2 space-y-8">
                  {/* Class Schedule */}
                  <motion.div variants={itemVariants}>
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-purple-500 dark:text-slate-400" />
                        {t.studentDashboard.weeklySchedule}
                      </h2>
                      <Button
                        variant="ghost"
                        onClick={() => navigate('/schedule')}
                        className="text-slate-500 dark:text-slate-400 hover:text-purple-600"
                      >
                        {t.studentDashboard.fullscreen} <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                    <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/60 dark:border-slate-800/60 rounded-3xl p-6 shadow-sm">
                      <Timetable
                        courses={studentCourses}
                        semester={student.semester}
                        academicYear={student.academicYear}
                      />
                    </div>
                  </motion.div>

                  {/* Current Courses */}
                  <motion.div variants={itemVariants} className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-purple-500 dark:text-slate-400" /> {t.studentDashboard.coursesThisSem}
                      </h3>
                      <Button variant="ghost" className="text-slate-500 dark:text-slate-400 hover:text-purple-600" onClick={() => navigate('/courses')}>{t.studentDashboard.viewAll}</Button>
                    </div>

                    <div className="grid gap-3">
                      {currentCourses.slice(0, 3).map((course, index) => (
                        <motion.div
                          key={course.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="group relative bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/60 dark:border-slate-800/60 p-4 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                          <div className="relative flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-900 shadow-md flex items-center justify-center text-sm font-bold text-slate-700 dark:text-slate-300 border border-slate-100 dark:border-slate-800 group-hover:scale-110 transition-transform flex-shrink-0">
                              {course.code?.substring(0, 3)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-purple-600 transition-colors truncate">{course.nameThai}</h4>
                              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                <span className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded-md">{course.code}</span>
                                <span>{course.credits} หน่วย</span>
                              </div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-purple-500 transition-colors flex-shrink-0" />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Right Column - 1/3 */}
                <div className="space-y-8">
                  {/* Degree Progress */}
                  <motion.div variants={itemVariants}>
                    <DegreeProgressCard
                      totalCredits={student.totalCredits}
                      earnedCredits={student.earnedCredits}
                      registeredCredits={studentCourses.reduce((sum, c) => sum + c.credits, 0)}
                      requiredCredits={student.requiredCredits || student.totalCredits}
                    />
                  </motion.div>

                  {/* Upcoming Activities - Clean List */}
                  <motion.div variants={itemVariants} className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/60 dark:border-slate-800/60 rounded-3xl p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-5">
                      <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-orange-500 dark:text-slate-400" /> {t.studentDashboard.upcomingActivities}
                      </h3>
                      <Badge variant="secondary" className="bg-orange-100 text-orange-700 hover:bg-orange-100 shadow-sm border-orange-200 dark:bg-orange-500/10 dark:text-orange-300 dark:border-orange-500/20">ใน 1 เดือน</Badge>
                    </div>

                    <div className="space-y-3">
                      {upcomingActivities.length > 0 ? upcomingActivities.map((activity, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.08 }}
                          className="flex items-start gap-3 p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:border-orange-200 dark:hover:border-orange-500/30 hover:shadow-md transition-all cursor-pointer group"
                        >
                          <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-500/10 flex flex-col items-center justify-center">
                            <span className="text-xs font-bold text-orange-600 dark:text-orange-400 leading-none">
                              {new Date(activity.startDate).toLocaleDateString('th-TH', { day: 'numeric' })}
                            </span>
                            <span className="text-[9px] text-orange-400 leading-none">
                              {new Date(activity.startDate).toLocaleDateString('th-TH', { month: 'short' })}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200 group-hover:text-orange-600 transition-colors line-clamp-2 leading-tight">{activity.titleThai}</h4>
                            <div className="flex gap-1.5 mt-1.5">
                              <Badge variant="secondary" className="text-[10px] bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-1.5">+{activity.gamificationPoints} XP</Badge>
                              <Badge variant="outline" className="text-[10px] border-slate-200 dark:border-slate-700 px-1.5">{activity.activityHours} ชม.</Badge>
                            </div>
                          </div>
                        </motion.div>
                      )) : (
                        <div className="text-center py-8">
                          <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-3">
                            <Calendar className="w-6 h-6 text-slate-400" />
                          </div>
                          <p className="text-sm text-slate-500 dark:text-slate-400">ไม่มีกิจกรรมเร็วๆนี้</p>
                        </div>
                      )}
                    </div>

                    <Button variant="outline" className="w-full mt-4 rounded-xl border-dashed border-slate-300 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:text-orange-600 hover:border-orange-300" onClick={() => navigate('/activities')}>
                      {t.studentDashboard.viewCalendar}
                    </Button>
                  </motion.div>

                  {/* Advisor Appointments */}
                  {appointments.length > 0 && (
                    <motion.div variants={itemVariants} className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/60 dark:border-slate-800/60 rounded-3xl p-6 shadow-sm">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                          <Clock className="w-5 h-5 text-indigo-500 dark:text-slate-400" /> นัดหมายอาจารย์
                        </h3>
                        <Badge variant="secondary" className="bg-indigo-100 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300 border-indigo-200 dark:border-indigo-500/20">
                          {appointments.length} รายการ
                        </Badge>
                      </div>
                      <div className="space-y-3">
                        {appointments.slice(0, 2).map((apt, i) => (
                          <div key={apt.id} className="flex items-start gap-3 p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:border-indigo-200 dark:hover:border-indigo-500/30 transition-all cursor-pointer group">
                            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 flex flex-col items-center justify-center">
                              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 leading-none">
                                {new Date(apt.date).toLocaleDateString('th-TH', { day: 'numeric' })}
                              </span>
                              <span className="text-[9px] text-indigo-400 leading-none">
                                {new Date(apt.date).toLocaleDateString('th-TH', { month: 'short' })}
                              </span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 transition-colors truncate">{apt.purpose}</h4>
                              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{apt.lecturerName} • {apt.startTime}–{apt.endTime}</p>
                              <p className="text-xs text-slate-400 truncate mt-0.5">{apt.location}</p>
                            </div>
                            <Badge className={`flex-shrink-0 text-[10px] border-0 ${
                              apt.status === 'confirmed' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300' : 'bg-amber-100 text-amber-700'
                            }`}>
                              {apt.status === 'confirmed' ? 'ยืนยัน' : 'รอยืนยัน'}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </TabsContent>
          )}


          {/* Schedule Tab */}
          {activeTab === 'schedule' && (
            <TabsContent value="schedule" className="mt-0" key="schedule" forceMount>
              <div className="space-y-6">
                {/* Credit matrix table */}
                <motion.div variants={itemVariants}>
                  <CreditMatrixCard />
                </motion.div>

                {/* Weekly timetable */}
                <motion.div variants={itemVariants} className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/60 dark:border-slate-800/60 rounded-3xl p-6 shadow-sm">
                  <Timetable
                    courses={studentCourses}
                    semester={student.semester}
                    academicYear={student.academicYear}
                  />
                </motion.div>
              </div>
            </TabsContent>
          )}

          {/* Grades Tab */}
          {activeTab === 'grades' && (
            <TabsContent value="grades" className="mt-0" key="grades" forceMount>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* GPA History */}
                <motion.div variants={itemVariants}>
                  <GPAHistoryCard
                    semesterHistory={semesterGPAHistory}
                    currentGPA={student.gpa}
                    gpax={student.gpax}
                  />
                </motion.div>

                {/* Course Grades */}
                <motion.div variants={itemVariants}>
                  <CourseGradesCard
                    grades={courseGrades}
                    currentSemester={`${student.semester}/${student.academicYear}`}
                  />
                </motion.div>
              </div>
            </TabsContent>
          )}

          {/* Skills Tab */}
          {activeTab === 'skills' && (
            <TabsContent value="skills" className="mt-0" key="skills" forceMount>
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Technical Skills - Rubric Based */}
                <motion.div variants={itemVariants}>
                  <TechnicalSkillsRubricCard
                    functionality={technicalSkillScores.functionality}
                    readability={technicalSkillScores.readability}
                    bestPractice={technicalSkillScores.bestPractice}
                    professorWeight={technicalSkillScores.professorWeight}
                    peerWeight={technicalSkillScores.peerWeight}
                    professorScore={technicalSkillScores.professorScore}
                    peerScore={technicalSkillScores.peerScore}
                    commentTags={technicalSkillScores.commentTags}
                  />
                </motion.div>

                {/* Soft Skills - AAC&U Value Rubrics Based */}
                <motion.div variants={itemVariants}>
                  <SoftSkillsRubricCard
                    communication={softSkillScores.communication}
                    openness={softSkillScores.openness}
                    professorWeight={softSkillScores.professorWeight}
                    peerWeight={softSkillScores.peerWeight}
                    professorScore={softSkillScores.professorScore}
                    peerScore={softSkillScores.peerScore}
                    feedbackHistory={softSkillScores.feedbackHistory}
                  />
                </motion.div>

                {/* Skills Radar Chart */}
                <motion.div variants={itemVariants}>
                  <SkillsRadarCard
                    technicalSkills={{
                      functionality: technicalSkillScores.functionality,
                      readability: technicalSkillScores.readability,
                      bestPractice: technicalSkillScores.bestPractice,
                    }}
                    softSkills={{
                      communication: softSkillScores.communication,
                      openness: softSkillScores.openness,
                    }}
                  />
                </motion.div>
              </div>
            </TabsContent>
          )}

          {/* Timeline Tab */}
          {activeTab === 'timeline' && (
            <TabsContent value="timeline" className="mt-0" key="timeline" forceMount>
              <motion.div variants={itemVariants} className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/60 dark:border-slate-800/60 rounded-3xl p-6 shadow-sm">
                <StudentTimeline events={timeline} showFilters />
              </motion.div>
            </TabsContent>
          )}

          {/* Careers Tab */}
          {activeTab === 'careers' && (
            <TabsContent value="careers" className="mt-0" key="careers" forceMount>
              <div className="grid gap-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Company Targets & Requirements</h2>
                    <p className="text-slate-500 dark:text-slate-400">See what skills you need to develop to meet recruiter expectations.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {mockCompanyTargets.map((company, idx) => {
                    const isGpaMet = student.gpa >= company.requirements.gpa;
                    const isTechMet = (
                      technicalSkillScores.functionality >= company.requirements.technicalSkills.functionality &&
                      technicalSkillScores.readability >= company.requirements.technicalSkills.readability &&
                      technicalSkillScores.bestPractice >= company.requirements.technicalSkills.bestPractice
                    );
                    const isSoftMet = (
                      softSkillScores.communication >= company.requirements.softSkills.communication &&
                      softSkillScores.openness >= company.requirements.softSkills.openness
                    );
                    const isAllMet = isGpaMet && isTechMet && isSoftMet;

                    return (
                      <motion.div
                          key={company.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="group relative bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl border border-white/60 dark:border-slate-700/50 rounded-3xl p-8 shadow-xl shadow-slate-200/20 dark:shadow-black/40 flex flex-col justify-between overflow-hidden"
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-900/10 dark:to-purple-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                          <div className="relative z-10">
                            <div className="flex items-start justify-between mb-6">
                              <div className="flex gap-4 items-center">
                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
                                  <Briefcase className="w-6 h-6" />
                                </div>
                                <div>
                                  <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{company.name}</h3>
                                  <div className="inline-flex px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs font-semibold tracking-wide uppercase">
                                    {company.role}
                                  </div>
                                </div>
                              </div>
                              {isAllMet ? (
                                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-emerald-400 to-green-500 text-white text-xs font-bold shadow-md shadow-emerald-500/20">
                                  <CheckCircle2 className="w-4 h-4" />
                                  <span>Ready</span>
                                </div>
                              ) : (
                                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 text-xs font-semibold">
                                  <AlertCircle className="w-4 h-4" />
                                  <span>Skill Gap</span>
                                </div>
                              )}
                            </div>
                            <div className="space-y-4 text-sm mt-6">
                            <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-slate-600 dark:text-slate-400">GPA Minimum</span>
                                <span className={`font-semibold ${isGpaMet ? 'text-emerald-600' : 'text-rose-500'}`}>
                                  {student.gpa.toFixed(2)} / {company.requirements.gpa.toFixed(2)}
                                </span>
                              </div>
                            </div>
                            <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800 space-y-2">
                              <span className="text-slate-600 dark:text-slate-400 block mb-1">Technical Skills Required</span>
                              <div className="flex justify-between items-center">
                                <span>Functionality</span>
                                <span className={technicalSkillScores.functionality >= company.requirements.technicalSkills.functionality ? 'text-emerald-600' : 'text-rose-500'}>
                                  {technicalSkillScores.functionality.toFixed(1)} / {company.requirements.technicalSkills.functionality.toFixed(1)}
                                </span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span>Readability</span>
                                <span className={technicalSkillScores.readability >= company.requirements.technicalSkills.readability ? 'text-emerald-600' : 'text-rose-500'}>
                                  {technicalSkillScores.readability.toFixed(1)} / {company.requirements.technicalSkills.readability.toFixed(1)}
                                </span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span>Best Practices</span>
                                <span className={technicalSkillScores.bestPractice >= company.requirements.technicalSkills.bestPractice ? 'text-emerald-600' : 'text-rose-500'}>
                                  {technicalSkillScores.bestPractice.toFixed(1)} / {company.requirements.technicalSkills.bestPractice.toFixed(1)}
                                </span>
                              </div>
                            </div>
                            <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800 space-y-2">
                              <span className="text-slate-600 dark:text-slate-400 block mb-1">Soft Skills Required</span>
                              <div className="flex justify-between items-center">
                                <span>Communication</span>
                                <span className={softSkillScores.communication >= company.requirements.softSkills.communication ? 'text-emerald-600' : 'text-rose-500'}>
                                  {softSkillScores.communication.toFixed(1)} / {company.requirements.softSkills.communication.toFixed(1)}
                                </span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span>Openness to Feedback</span>
                                <span className={softSkillScores.openness >= company.requirements.softSkills.openness ? 'text-emerald-600' : 'text-rose-500'}>
                                  {softSkillScores.openness.toFixed(1)} / {company.requirements.softSkills.openness.toFixed(1)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="mt-6">
                          <Button
                            className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-xl"
                            onClick={() => {
                              toast({
                                title: "Interest Expressed!",
                                description: `HR at ${company.name} has been notified of your interest.`,
                                duration: 3000,
                              });
                            }}
                          >
                            <Trophy className="w-4 h-4 mr-2" />
                            I'm Interested
                          </Button>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </TabsContent>
          )}
        </AnimatePresence>
      </Tabs>
    </motion.div>
  );
}
