import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BookOpen, Calendar, Trophy, TrendingUp, Clock, Award,
  AlertCircle, CheckCircle2, GraduationCap, Target, Activity as ActivityIcon,
  Sparkles, Flame, Star, Zap, ChevronRight, Bell, ArrowUpRight
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ThemedPageHeader } from '@/components/common/ThemedPageHeader';
import { ThemedCard } from '@/components/common/ThemedCard';
import { Timetable } from '@/components/common/Timetable';
import { StudentTimeline } from '@/components/common/StudentTimeline';
import {
  mockStudent,
  mockCourses,
  mockActivities,
  mockNotifications,
  mockTimelineEvents,
  mockGrades,
  getStudentTimeline,
  getStudentGrades,
} from '@/lib/mockData';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function StudentDashboard() {
  const navigate = useNavigate();
  const student = mockStudent;
  const timeline = getStudentTimeline(student.id);
  const grades = getStudentGrades(student.id);

  const currentCourses = mockCourses.filter(
    course => course.semester === student.semester &&
      course.academicYear === student.academicYear
  );

  const creditProgress = (student.earnedCredits / student.totalCredits) * 100;
  const upcomingActivities = mockActivities.filter(a => a.status === 'upcoming').slice(0, 3);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Welcome Header with Gradient */}
      <ThemedPageHeader
        title={`สวัสดี, ${student.nameThai} 👋`}
        subtitle={`${student.major} • ชั้นปีที่ ${student.year} • เทอม ${student.semester}/${student.academicYear}`}
        icon={<GraduationCap className="w-7 h-7" />}
      />

      {/* Quick Stats Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          whileHover={{ scale: 1.02 }}
          onClick={() => navigate('/grades')}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 p-6 text-white shadow-xl shadow-blue-200 cursor-pointer"
        >
          <div className="absolute -top-10 -right-10 w-28 h-28 bg-white/10 rounded-full blur-2xl" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 rounded-xl bg-white/20 backdrop-blur-sm">
                <TrendingUp className="w-5 h-5" />
              </div>
              <span className="font-medium text-white/90">GPA / GPAX</span>
            </div>
            <div className="text-4xl font-bold">{student.gpa.toFixed(2)} / {student.gpax.toFixed(2)}</div>
            <div className="flex items-center gap-1 mt-2 text-sm">
              {student.gpa >= 3.0 ? (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span className="text-white/90">ดีเยี่ยม</span>
                </>
              ) : (
                <>
                  <Target className="w-4 h-4" />
                  <span className="text-white/90">ควรพัฒนา</span>
                </>
              )}
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          onClick={() => navigate('/courses')}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-rose-500 p-6 text-white shadow-xl shadow-purple-200 cursor-pointer"
        >
          <div className="absolute -top-10 -right-10 w-28 h-28 bg-white/10 rounded-full blur-2xl" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 rounded-xl bg-white/20 backdrop-blur-sm">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="font-medium text-white/90">หน่วยกิต</span>
            </div>
            <div className="text-4xl font-bold">{student.earnedCredits}/{student.totalCredits}</div>
            <div className="mt-3 h-2 bg-white/20 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${creditProgress}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="h-full bg-white rounded-full"
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          onClick={() => navigate('/activities')}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500 p-6 text-white shadow-xl shadow-orange-200 cursor-pointer"
        >
          <div className="absolute -top-10 -right-10 w-28 h-28 bg-white/10 rounded-full blur-2xl" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 rounded-xl bg-white/20 backdrop-blur-sm">
                <Trophy className="w-5 h-5" />
              </div>
              <span className="font-medium text-white/90">คะแนนกิจกรรม</span>
            </div>
            <div className="text-4xl font-bold">{student.gamificationPoints}</div>
            <div className="flex items-center gap-1 mt-2 text-sm">
              <Zap className="w-4 h-4" />
              <span className="text-white/90">+12 คะแนน</span>
            </div>
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
                <Clock className="w-5 h-5" />
              </div>
              <span className="font-medium text-white/90">ชั่วโมงกิจกรรม</span>
            </div>
            <div className="text-4xl font-bold">{student.totalActivityHours}</div>
            <div className="text-sm text-white/80 mt-2">ชั่วโมงสะสม</div>
          </div>
        </motion.div>
      </motion.div>

      {/* Main Content Tabs */}
      <motion.div variants={itemVariants}>
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-white/80 backdrop-blur-sm border shadow-sm p-1 h-auto">
            <TabsTrigger value="overview" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-6 py-2.5">
              <Target className="w-4 h-4 mr-2" />
              ภาพรวม
            </TabsTrigger>
            <TabsTrigger value="schedule" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-6 py-2.5">
              <Calendar className="w-4 h-4 mr-2" />
              ตารางเรียน
            </TabsTrigger>
            <TabsTrigger value="grades" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-6 py-2.5">
              <TrendingUp className="w-4 h-4 mr-2" />
              เกรด
            </TabsTrigger>
            <TabsTrigger value="timeline" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-6 py-2.5">
              <ActivityIcon className="w-4 h-4 mr-2" />
              Timeline
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-6">
                {/* Academic Progress Card */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <GraduationCap className="w-5 h-5" />
                      ความก้าวหน้าการเรียน
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm font-medium text-gray-700">หน่วยกิตสะสม</span>
                          <span className="text-sm font-semibold text-primary">
                            {student.earnedCredits}/{student.totalCredits} หน่วยกิต
                          </span>
                        </div>
                        <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${creditProgress}%` }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                            className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                          เหลืออีก {student.totalCredits - student.earnedCredits} หน่วยกิตเพื่อจบการศึกษา
                        </p>
                      </div>

                      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className="text-center p-4 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200"
                        >
                          <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                            {student.gpa.toFixed(2)}
                          </div>
                          <div className="text-xs text-blue-600 font-medium mt-1">GPA เทอมนี้</div>
                        </motion.div>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className="text-center p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200"
                        >
                          <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                            {student.gpax.toFixed(2)}
                          </div>
                          <div className="text-xs text-emerald-600 font-medium mt-1">GPAX สะสม</div>
                        </motion.div>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className="text-center p-4 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200"
                        >
                          <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                            ปี {student.year}
                          </div>
                          <div className="text-xs text-purple-600 font-medium mt-1">ชั้นปี</div>
                        </motion.div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Current Courses */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5" />
                      รายวิชาในเทอมนี้
                    </CardTitle>
                    <CardDescription>เทอม {student.semester}/{student.academicYear} • {currentCourses.length} วิชา</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {currentCourses.map((course, index) => (
                        <motion.div
                          key={course.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.01, x: 4 }}
                          className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 hover:border-primary/30 hover:shadow-md transition-all cursor-pointer group"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center text-primary font-bold text-sm">
                              {course.code?.substring(0, 3) || 'CS'}
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900 group-hover:text-primary transition-colors">
                                {course.code}
                              </div>
                              <div className="text-sm text-gray-600">{course.nameThai}</div>
                              <div className="text-xs text-gray-400 mt-0.5">
                                {course.lecturerName}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge variant="secondary" className="bg-primary/10 text-primary">
                              {course.credits} หน่วยกิต
                            </Badge>
                            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Upcoming Activities */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      กิจกรรมที่กำลังจะมาถึง
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <div />
                      <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80" onClick={() => navigate('/activities')}>
                        ดูทั้งหมด
                        <ArrowUpRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                    {upcomingActivities.length > 0 ? (
                      <div className="space-y-3">
                        {upcomingActivities.map((activity, index) => (
                          <motion.div
                            key={activity.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start gap-4 p-4 bg-gradient-to-r from-orange-50 via-amber-50 to-yellow-50 rounded-xl border border-orange-100 hover:shadow-md transition-all"
                          >
                            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-200">
                              <Zap className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-semibold text-gray-900">{activity.titleThai}</div>
                              <div className="text-sm text-gray-600 mt-1 line-clamp-1">{activity.description}</div>
                              <div className="flex items-center flex-wrap gap-3 mt-3">
                                <Badge variant="outline" className="bg-white text-orange-600 border-orange-200">
                                  <Calendar className="w-3 h-3 mr-1" />
                                  {new Date(activity.startDate).toLocaleDateString('th-TH')}
                                </Badge>
                                <Badge variant="outline" className="bg-white text-emerald-600 border-emerald-200">
                                  <Star className="w-3 h-3 mr-1" />
                                  {activity.gamificationPoints} คะแนน
                                </Badge>
                                <Badge variant="outline" className="bg-white text-blue-600 border-blue-200">
                                  <Clock className="w-3 h-3 mr-1" />
                                  {activity.activityHours} ชั่วโมง
                                </Badge>
                              </div>
                            </div>
                            <Button size="sm" className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-lg shadow-orange-200/50">
                              ลงทะเบียน
                            </Button>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <div className="w-16 h-16 mx-auto rounded-full bg-gray-100 flex items-center justify-center mb-4">
                          <Calendar className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="text-gray-500">ยังไม่มีกิจกรรมที่กำลังจะมาถึง</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Achievements & Badges */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="w-5 h-5" />
                      ทักษะและรางวัล
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {/* Badges */}
                    {student.badges.length > 0 && (
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                          <Flame className="w-4 h-4 text-orange-500" />
                          Badges ที่ได้รับ
                        </h4>
                        <div className="grid grid-cols-3 gap-2">
                          {student.badges.map((badge, index) => (
                            <motion.div
                              key={badge.id}
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: index * 0.1, type: 'spring' }}
                              whileHover={{ scale: 1.1, rotate: 5 }}
                              className="flex flex-col items-center p-3 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl border border-yellow-200 cursor-pointer hover:shadow-lg transition-shadow"
                              title={badge.description}
                            >
                              <span className="text-2xl">{badge.icon}</span>
                              <span className="text-xs text-center mt-1 font-medium text-gray-700">
                                {badge.nameThai}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Top Skills */}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-purple-500" />
                        ทักษะยอดนิยม
                      </h4>
                      <div className="space-y-2">
                        {student.skills.slice(0, 5).map((skill, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <span className="text-sm font-medium text-gray-700">{skill.name}</span>
                            <Badge
                              variant="secondary"
                              className="text-xs"
                            >
                              {skill.level === 'expert' ? 'ผู้เชี่ยวชาญ' :
                                skill.level === 'advanced' ? 'ขั้นสูง' :
                                  skill.level === 'intermediate' ? 'ปานกลาง' : 'เริ่มต้น'}
                            </Badge>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>การดำเนินการด่วน</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {[
                        { icon: Calendar, label: 'นัดหมายอาจารย์ที่ปรึกษา', color: 'blue', action: () => navigate('/appointments') },
                        { icon: BookOpen, label: 'ยื่นคำร้องออนไลน์', color: 'purple', action: () => navigate('/requests') },
                        { icon: Trophy, label: 'ดู Portfolio', color: 'orange', action: () => navigate('/portfolio') },
                      ].map((action, index) => (
                        <motion.div
                          key={action.label}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Button
                            variant="outline"
                            className="w-full justify-start h-auto py-3 hover:bg-primary/5 hover:border-primary/30 group transition-all"
                            size="sm"
                            onClick={action.action}
                          >
                            <div className="p-2 rounded-lg bg-gray-100 text-gray-600 mr-3 group-hover:scale-110 transition-transform">
                              <action.icon className="w-4 h-4" />
                            </div>
                            <span className="font-medium">{action.label}</span>
                            <ChevronRight className="w-4 h-4 ml-auto text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                          </Button>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Advisor Contact */}
                {student.advisorName && (
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-blue-200 mb-3">
                          {student.advisorName.charAt(0)}
                        </div>
                        <h4 className="font-semibold text-gray-900">อาจารย์ที่ปรึกษา</h4>
                        <p className="text-sm text-gray-600 mt-1">{student.advisorName}</p>
                        <Button className="w-full mt-4 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
                          ติดต่ออาจารย์
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Schedule Tab */}
          <TabsContent value="schedule" className="mt-6">
            <Card>
              <CardContent className="pt-6">
                <Timetable
                  courses={currentCourses}
                  semester={student.semester}
                  academicYear={student.academicYear}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Grades Tab */}
          <TabsContent value="grades" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  เกรดของฉัน
                </CardTitle>
                <CardDescription>ผลการเรียนทั้งหมด</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {grades.length > 0 ? (
                    grades.map((grade, index) => {
                      const course = mockCourses.find(c => c.id === grade.courseId);
                      const gradeColors: Record<string, string> = {
                        'A': 'from-emerald-500 to-teal-500',
                        'B+': 'from-blue-500 to-cyan-500',
                        'B': 'from-blue-400 to-blue-500',
                        'C+': 'from-amber-400 to-orange-500',
                        'C': 'from-orange-400 to-orange-500',
                        'D+': 'from-rose-400 to-rose-500',
                        'D': 'from-rose-500 to-red-500',
                        'F': 'from-red-500 to-red-600',
                      };
                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100 hover:shadow-md hover:border-primary/20 transition-all"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center font-bold text-gray-600 text-sm">
                              {course?.code?.substring(0, 3) || 'N/A'}
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900">{course?.code}</div>
                              <div className="text-sm text-gray-600">{course?.nameThai}</div>
                            </div>
                          </div>
                          <div className="text-right flex items-center gap-4">
                            <div className="text-sm text-gray-500">
                              {grade.total?.toFixed(0)} คะแนน
                            </div>
                            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradeColors[grade.letterGrade] || 'from-gray-400 to-gray-500'} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                              {grade.letterGrade}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 mx-auto rounded-full bg-gray-100 flex items-center justify-center mb-4">
                        <TrendingUp className="w-8 h-8 text-gray-400" />
                      </div>
                      <p className="text-gray-500">ยังไม่มีเกรดที่ประกาศ</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Timeline Tab */}
          <TabsContent value="timeline" className="mt-6">
            <StudentTimeline events={timeline} showFilters />
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  );
}
