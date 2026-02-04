import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, Calendar, Trophy, TrendingUp, Clock, Award,
  AlertCircle, CheckCircle2, GraduationCap, Target, Activity as ActivityIcon,
  Sparkles, Flame, Star, Zap, ChevronRight, Bell, ArrowUpRight,
  MoreHorizontal, User
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Timetable } from '@/components/common/Timetable';
import { StudentTimeline } from '@/components/common/StudentTimeline';
import { DegreeProgressCard } from '@/components/dashboard/DegreeProgressCard';
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
    { projectName: 'Hackathon 2024', date: '10 มี.ค. 67', communicationScore: 4.2, opennessScore: 4.5, comments: 15 },
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
      semester: `${course?.semester}/${course?.academicYear}` || '1/2568',
      total: grade.total,
    };
  });
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

  const studentCourses = mockCourses.filter(c => c.enrolledStudents.includes(student.id));
  const courseGrades = transformGradesForCard();

  const creditProgress = (student.earnedCredits / student.totalCredits) * 100;
  const upcomingActivities = mockActivities.filter(a => a.status === 'upcoming').slice(0, 3);

  // Time-based greeting
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'สวัสดีตอนเช้า' : hour < 18 ? 'สวัสดีตอนบ่าย' : 'สวัสดีตอนเย็น';

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
                <span>ภาคเรียน {student.semester}/{student.academicYear}</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-yellow-400" />
                <span>{student.gamificationPoints} XP</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mt-4">
              <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                รหัส: {student.studentId}
              </Badge>
              <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
                GPAX: {student.gpax.toFixed(2)}
              </Badge>
              {student.academicStatus === 'normal' && (
                <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                  สถานะ: ปกติ
                </Badge>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-col gap-3">
            <Button
              onClick={() => navigate('/portfolio')}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl"
            >
              <Trophy className="w-4 h-4 mr-2 text-yellow-500" />
              ดู Portfolio
            </Button>
            <Button
              onClick={() => navigate('/settings')}
              variant="ghost"
              className="text-slate-300 hover:text-white hover:bg-white/10 rounded-xl"
            >
              แก้ไขโปรไฟล์
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-8" onValueChange={setActiveTab}>
        <div className="flex justify-center md:justify-start">
          <TabsList className="bg-white/40 backdrop-blur-xl border border-white/40 p-1.5 h-auto rounded-2xl shadow-sm flex-wrap">
            {[
              { id: 'overview', icon: Target, label: 'ภาพรวม' },
              { id: 'schedule', icon: Calendar, label: 'ตารางเรียน' },
              { id: 'grades', icon: TrendingUp, label: 'ผลการเรียน' },
              { id: 'skills', icon: Zap, label: 'ทักษะ' },
              { id: 'timeline', icon: ActivityIcon, label: 'Timeline' },
            ].map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="rounded-xl px-4 lg:px-6 py-2.5 data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-lg shadow-blue-500/10 transition-all duration-300 font-medium text-slate-600"
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
                      <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-purple-500" />
                        ตารางเรียนสัปดาห์นี้
                      </h2>
                      <Button
                        variant="ghost"
                        onClick={() => navigate('/schedule')}
                        className="text-slate-500 hover:text-purple-600"
                      >
                        ดูเต็มจอ <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                    <div className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-3xl p-6 shadow-sm">
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
                      <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-purple-500" /> รายวิชาเทอมนี้
                      </h3>
                      <Button variant="ghost" className="text-slate-500 hover:text-purple-600" onClick={() => navigate('/courses')}>ดูทั้งหมด</Button>
                    </div>

                    <div className="grid gap-4">
                      {currentCourses.slice(0, 3).map((course, index) => (
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
                </div>
              </div>
            </TabsContent>
          )}

          {/* Schedule Tab */}
          {activeTab === 'schedule' && (
            <TabsContent value="schedule" className="mt-0" key="schedule" forceMount>
              <motion.div variants={itemVariants} className="bg-white/80 backdrop-blur-xl border border-white/60 rounded-3xl p-6 shadow-sm">
                <Timetable
                  courses={studentCourses}
                  semester={student.semester}
                  academicYear={student.academicYear}
                />
              </motion.div>
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
              <motion.div variants={itemVariants} className="bg-white/80 backdrop-blur-xl border border-white/60 rounded-3xl p-6 shadow-sm">
                <StudentTimeline events={timeline} showFilters />
              </motion.div>
            </TabsContent>
          )}
        </AnimatePresence>
      </Tabs>
    </motion.div>
  );
}
