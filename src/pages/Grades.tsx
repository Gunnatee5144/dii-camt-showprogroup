import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Award, AlertCircle, Download, Filter, BarChart3, PieChart, FileText, GraduationCap, BookOpen, Target, Star, Sparkles, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { ThemedPageHeader } from '@/components/common/ThemedPageHeader';
import { ThemedCard } from '@/components/common/ThemedCard';
import { mockStudent, mockGrades, getStudentGrades, mockCourses } from '@/lib/mockData';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Grades() {
  const { user } = useAuth();

  if (user?.role === 'student') {
    const studentGrades = getStudentGrades(mockStudent.id);
    const currentTermGrades = studentGrades.filter(g => {
      const course = mockCourses.find(c => c.id === g.courseId);
      return course?.semester === mockStudent.semester;
    });

    const gpa = mockStudent.gpa;
    const gpax = mockStudent.gpax;

    // คำนวณเกรดเฉลี่ยแต่ละภาค
    const semesterGrades = {
      '1/2567': { gpa: 3.65, credits: 18 },
      '2/2566': { gpa: 3.52, credits: 21 },
      '1/2566': { gpa: 3.48, credits: 18 },
      '2/2565': { gpa: 3.35, credits: 21 },
    };

    const gradeDistribution = {
      'A': studentGrades.filter(g => g.letterGrade === 'A').length,
      'B+': studentGrades.filter(g => g.letterGrade === 'B+').length,
      'B': studentGrades.filter(g => g.letterGrade === 'B').length,
      'C+': studentGrades.filter(g => g.letterGrade === 'C+').length,
      'C': studentGrades.filter(g => g.letterGrade === 'C').length,
      'D+': studentGrades.filter(g => g.letterGrade === 'D+').length,
      'D': studentGrades.filter(g => g.letterGrade === 'D').length,
      'F': studentGrades.filter(g => g.letterGrade === 'F').length,
    };

    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        <ThemedPageHeader
          title="ผลการเรียน"
          subtitle={`GPAX: ${mockStudent.gpax.toFixed(2)} • หน่วยกิตสะสม: ${mockStudent.earnedCredits}/${mockStudent.totalCredits}`}
          icon={<GraduationCap className="w-8 h-8 text-white" />}
        />  <motion.div variants={itemVariants} className="flex justify-end">
          <div className="flex gap-2">
            <Button variant="outline" className="bg-white/80 hover:bg-white">
              <Filter className="w-4 h-4 mr-2" />
              กรอง
            </Button>
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 border-0 shadow-lg shadow-purple-200/50">
              <Download className="w-4 h-4 mr-2" />
              ดาวน์โหลด Transcript
            </Button>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* GPA Card */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 p-6 text-white shadow-xl shadow-blue-200"
          >
            <div className="absolute -top-10 -right-10 w-28 h-28 bg-white/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-white/10 rounded-full blur-xl" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 rounded-xl bg-white/20 backdrop-blur-sm">
                  <Award className="w-5 h-5" />
                </div>
                <span className="font-medium text-white/90">GPA ภาคนี้</span>
              </div>
              <div className="text-5xl font-bold">{gpa.toFixed(2)}</div>
              <div className="flex items-center gap-1 mt-2 text-sm">
                {gpa >= 3.5 ? (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span className="text-white/90">ดีเยี่ยม</span>
                  </>
                ) : gpa >= 3.0 ? (
                  <>
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-white/90">ดี</span>
                  </>
                ) : (
                  <>
                    <TrendingDown className="w-4 h-4" />
                    <span className="text-white/90">ควรพัฒนา</span>
                  </>
                )}
              </div>
            </div>
          </motion.div>

          {/* GPAX Card */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-rose-500 p-6 text-white shadow-xl shadow-purple-200"
          >
            <div className="absolute -top-10 -right-10 w-28 h-28 bg-white/10 rounded-full blur-2xl" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 rounded-xl bg-white/20 backdrop-blur-sm">
                  <Star className="w-5 h-5" />
                </div>
                <span className="font-medium text-white/90">GPAX สะสม</span>
              </div>
              <div className="text-5xl font-bold">{gpax.toFixed(2)}</div>
              <div className="text-sm text-white/80 mt-2">เกรดเฉลี่ยสะสม</div>
            </div>
          </motion.div>

          {/* Credits Card */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 p-6 text-white shadow-xl shadow-emerald-200"
          >
            <div className="absolute -top-10 -right-10 w-28 h-28 bg-white/10 rounded-full blur-2xl" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 rounded-xl bg-white/20 backdrop-blur-sm">
                  <BookOpen className="w-5 h-5" />
                </div>
                <span className="font-medium text-white/90">หน่วยกิตสะสม</span>
              </div>
              <div className="text-5xl font-bold">{mockStudent.earnedCredits}</div>
              <div className="text-sm text-white/80 mt-2">จาก {mockStudent.totalCredits} หน่วยกิต</div>
              <div className="mt-3 h-2 bg-white/20 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(mockStudent.earnedCredits / mockStudent.totalCredits) * 100}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className="h-full bg-white rounded-full"
                />
              </div>
            </div>
          </motion.div>

          {/* Status Card */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className={`relative overflow-hidden rounded-2xl p-6 text-white shadow-xl ${mockStudent.academicStatus === 'normal'
              ? 'bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 shadow-green-200'
              : 'bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500 shadow-orange-200'
              }`}
          >
            <div className="absolute -top-10 -right-10 w-28 h-28 bg-white/10 rounded-full blur-2xl" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 rounded-xl bg-white/20 backdrop-blur-sm">
                  <Target className="w-5 h-5" />
                </div>
                <span className="font-medium text-white/90">สถานะการเรียน</span>
              </div>
              <div className="text-4xl font-bold">
                {mockStudent.academicStatus === 'normal' ? 'ปกติ' : 'เสี่ยง'}
              </div>
              <div className="text-sm text-white/80 mt-2">
                {mockStudent.academicStatus === 'normal' ? 'ผลการเรียนดี 🎉' : 'ควรพบอาจารย์ที่ปรึกษา'}
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Tabs defaultValue="current" className="space-y-6">
            <TabsList className="bg-white/80 backdrop-blur-sm border shadow-sm p-1 h-auto grid w-full grid-cols-4">
              <TabsTrigger value="current" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2.5">
                <BookOpen className="w-4 h-4 mr-2" />
                ภาคปัจจุบัน
              </TabsTrigger>
              <TabsTrigger value="all" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2.5">
                <BarChart3 className="w-4 h-4 mr-2" />
                ทุกภาค
              </TabsTrigger>
              <TabsTrigger value="analysis" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2.5">
                <PieChart className="w-4 h-4 mr-2" />
                วิเคราะห์
              </TabsTrigger>
              <TabsTrigger value="transcript" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2.5">
                <FileText className="w-4 h-4 mr-2" />
                Transcript
              </TabsTrigger>
            </TabsList>

            <TabsContent value="current" className="space-y-4 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    เกรดภาคเรียนที่ {mockStudent.semester}/{mockStudent.academicYear}
                  </CardTitle>
                  <CardDescription>{currentTermGrades.length} รายวิชา</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {currentTermGrades.map((grade, index) => {
                      const course = mockCourses.find(c => c.id === grade.courseId);
                      if (!course) return null;

                      return (
                        <motion.div
                          key={grade.courseId}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.01 }}
                          className="border-0 rounded-2xl p-5 bg-gradient-to-r from-white to-gray-50 shadow-sm hover:shadow-md transition-all"
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <h3 className="font-bold text-lg flex items-center gap-2">
                                <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white text-sm">
                                  {course.code?.slice(-2) || 'XX'}
                                </span>
                                {course.code}
                              </h3>
                              <p className="text-gray-600 mt-1">{course.nameThai}</p>
                              <div className="flex gap-2 mt-2">
                                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                  {course.credits} หน่วยกิต
                                </Badge>
                                <Badge variant="outline" className="bg-gray-50 text-gray-700">
                                  {course.lecturerName}
                                </Badge>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl text-2xl font-bold text-white shadow-lg ${grade.letterGrade === 'A' ? 'bg-gradient-to-br from-green-500 to-emerald-500 shadow-green-200' :
                                grade.letterGrade === 'B+' || grade.letterGrade === 'B' ? 'bg-gradient-to-br from-blue-500 to-indigo-500 shadow-blue-200' :
                                  grade.letterGrade === 'C+' || grade.letterGrade === 'C' ? 'bg-gradient-to-br from-orange-500 to-amber-500 shadow-orange-200' :
                                    'bg-gradient-to-br from-red-500 to-rose-500 shadow-red-200'
                                }`}>
                                {grade.letterGrade}
                              </div>
                              <p className="text-sm text-gray-600 mt-2 font-medium">{grade.total} คะแนน</p>
                            </div>
                          </div>

                          <Separator className="my-4" />

                          <div className="grid grid-cols-4 gap-4">
                            {[
                              { label: 'สอบกลางภาค', value: grade.midterm, icon: '📝' },
                              { label: 'สอบปลายภาค', value: grade.final, icon: '📋' },
                              { label: 'งานที่มอบหมาย', value: grade.assignments, icon: '📚' },
                              { label: 'การเข้าร่วม', value: grade.participation, icon: '✋' },
                            ].map((item, idx) => (
                              <div key={idx} className="text-center p-3 bg-gray-50 rounded-xl">
                                <div className="text-lg mb-1">{item.icon}</div>
                                <p className="text-xs text-gray-600">{item.label}</p>
                                <p className="font-bold text-sm">{item.value || '-'}/100</p>
                              </div>
                            ))}
                          </div>

                          {grade.remarks && (
                            <div className="mt-4 p-4 bg-amber-50 rounded-xl border border-amber-200">
                              <p className="text-sm flex items-start gap-2">
                                <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                                <span className="text-amber-800">{grade.remarks}</span>
                              </p>
                            </div>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>สรุปผลการเรียนภาคนี้</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-gray-600">วิชาทั้งหมด</p>
                      <p className="text-2xl font-bold text-blue-600">{currentTermGrades.length}</p>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <p className="text-sm text-gray-600">หน่วยกิตภาคนี้</p>
                      <p className="text-2xl font-bold text-purple-600">{currentTermGrades.reduce((sum, g) => {
                        const course = mockCourses.find(c => c.id === g.courseId);
                        return sum + (course?.credits || 0);
                      }, 0)}</p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <p className="text-sm text-gray-600">คะแนนเฉลี่ย</p>
                      <p className="text-2xl font-bold text-green-600">{(currentTermGrades.reduce((sum, g) => sum + g.total, 0) / currentTermGrades.length).toFixed(1)}</p>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <p className="text-sm text-gray-600">GPA ภาคนี้</p>
                      <p className="text-2xl font-bold text-orange-600">{gpa.toFixed(2)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="all" className="space-y-4 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    ผลการเรียนทุกภาค
                  </CardTitle>
                  <CardDescription>แสดงเกรดเฉลี่ยแต่ละภาคการศึกษา</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(semesterGrades).map(([semester, data], index) => (
                      <motion.div
                        key={semester}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.01, x: 4 }}
                        className="flex items-center justify-between p-5 rounded-2xl bg-gradient-to-r from-white to-gray-50 shadow-sm hover:shadow-md transition-all cursor-pointer border border-gray-100"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold shadow-lg shadow-purple-200/50">
                            {semester.split('/')[0]}
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">ภาคเรียนที่ {semester}</h3>
                            <p className="text-sm text-gray-600">{data.credits} หน่วยกิต</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{data.gpa.toFixed(2)}</div>
                            <p className="text-xs text-gray-500">GPA</p>
                          </div>
                          <ChevronRight className="w-5 h-5 text-gray-400" />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analysis" className="space-y-4 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>กราฟแสดงผลการเรียน</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {Object.entries(gradeDistribution).map(([grade, count]) => {
                        if (count === 0) return null;
                        const percentage = (count / studentGrades.length) * 100;
                        const colors: Record<string, string> = {
                          'A': 'from-green-500 to-emerald-500',
                          'B+': 'from-blue-500 to-indigo-500',
                          'B': 'from-blue-400 to-cyan-500',
                          'C+': 'from-orange-400 to-amber-500',
                          'C': 'from-orange-500 to-yellow-500',
                          'D+': 'from-red-400 to-orange-400',
                          'D': 'from-red-500 to-rose-500',
                          'F': 'from-red-600 to-red-700',
                        };
                        return (
                          <div key={grade}>
                            <div className="flex justify-between text-sm mb-2">
                              <span className="font-semibold flex items-center gap-2">
                                <span className={`w-3 h-3 rounded-full bg-gradient-to-r ${colors[grade]}`}></span>
                                เกรด {grade}
                              </span>
                              <span className="text-gray-600">{count} วิชา ({percentage.toFixed(0)}%)</span>
                            </div>
                            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${percentage}%` }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className={`h-full rounded-full bg-gradient-to-r ${colors[grade]}`}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5" />
                      แนวโน้ม GPA
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
                          <TrendingUp className="w-5 h-5 mx-auto text-green-600 mb-2" />
                          <div className="text-2xl font-bold text-green-600">3.78</div>
                          <p className="text-xs text-gray-600">สูงสุด</p>
                        </div>
                        <div className="text-center p-4 bg-gradient-to-br from-red-50 to-rose-50 rounded-xl">
                          <TrendingDown className="w-5 h-5 mx-auto text-red-600 mb-2" />
                          <div className="text-2xl font-bold text-red-600">3.35</div>
                          <p className="text-xs text-gray-600">ต่ำสุด</p>
                        </div>
                        <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
                          <Award className="w-5 h-5 mx-auto text-blue-600 mb-2" />
                          <div className="text-2xl font-bold text-blue-600">{gpax.toFixed(2)}</div>
                          <p className="text-xs text-gray-600">เฉลี่ย</p>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-5 rounded-xl border border-blue-100">
                        <p className="text-sm font-semibold text-blue-900 mb-2 flex items-center gap-2">
                          <Sparkles className="w-4 h-4" />
                          การประเมิน
                        </p>
                        <p className="text-sm text-blue-800">
                          ผลการเรียนของคุณอยู่ในเกณฑ์ดีมาก รักษาระดับคะแนนนี้ไว้ต่อไป 🎉
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    สถิติการเรียน
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      className="text-center p-6 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl text-white shadow-lg shadow-green-200/50"
                    >
                      <div className="text-4xl font-bold">
                        {gradeDistribution['A'] + gradeDistribution['B+']}
                      </div>
                      <p className="text-sm text-white/80 mt-2">วิชาที่ได้ A/B+</p>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      className="text-center p-6 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl text-white shadow-lg shadow-blue-200/50"
                    >
                      <div className="text-4xl font-bold">
                        {studentGrades.length}
                      </div>
                      <p className="text-sm text-white/80 mt-2">วิชาทั้งหมด</p>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      className="text-center p-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl text-white shadow-lg shadow-purple-200/50"
                    >
                      <div className="text-4xl font-bold">
                        {mockStudent.earnedCredits}
                      </div>
                      <p className="text-sm text-white/80 mt-2">หน่วยกิตสะสม</p>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      className="text-center p-6 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl text-white shadow-lg shadow-orange-200/50"
                    >
                      <div className="text-4xl font-bold">
                        {Math.ceil((mockStudent.totalCredits - mockStudent.earnedCredits) / 18)}
                      </div>
                      <p className="text-sm text-white/80 mt-2">ภาคที่เหลือ</p>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="transcript" className="space-y-4 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Transcript (ใบรายงานผลการศึกษา)
                  </CardTitle>
                  <CardDescription>ใบแสดงผลการเรียนฉบับเต็ม</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border-2 border-dashed border-gray-200">
                    <div className="text-center mb-8">
                      <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-purple-200/50 mb-4">
                        CMU
                      </div>
                      <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">มหาวิทยาลัยเชียงใหม่</h2>
                      <p className="text-gray-600 mt-1">ใบแสดงผลการเรียน (Transcript)</p>
                    </div>

                    <div className="grid grid-cols-2 gap-6 mb-8">
                      {[
                        { label: 'ชื่อ-สกุล:', value: mockStudent.nameThai },
                        { label: 'รหัสนักศึกษา:', value: mockStudent.studentId },
                        { label: 'สาขาวิชา:', value: mockStudent.major },
                        { label: 'คณะ:', value: 'วิทยาลัยศิลปะ สื่อ และเทคโนโลยี' },
                      ].map((item, idx) => (
                        <div key={idx} className="p-4 bg-white rounded-xl shadow-sm">
                          <p className="text-xs text-gray-500 mb-1">{item.label}</p>
                          <p className="font-semibold text-gray-800">{item.value}</p>
                        </div>
                      ))}
                    </div>

                    <Separator className="my-6" />

                    <div className="space-y-4">
                      {Object.entries(semesterGrades).map(([semester, data], idx) => (
                        <motion.div
                          key={semester}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center font-semibold text-purple-600">
                              {semester.split('/')[0]}
                            </div>
                            <span className="font-medium">ภาคเรียนที่ {semester}</span>
                          </div>
                          <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
                            GPA {data.gpa.toFixed(2)}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>

                    <Separator className="my-6" />

                    <div className="grid grid-cols-2 gap-6">
                      <div className="p-5 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl">
                        <p className="text-sm text-gray-600 mb-1">หน่วยกิตสะสม</p>
                        <p className="text-3xl font-bold text-emerald-600">{mockStudent.earnedCredits} <span className="text-lg font-normal text-gray-500">หน่วยกิต</span></p>
                      </div>
                      <div className="p-5 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
                        <p className="text-sm text-gray-600 mb-1">เกรดเฉลี่ยสะสม (GPAX)</p>
                        <p className="text-3xl font-bold text-purple-600">{gpax.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <Button className="flex-1 h-12 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg shadow-purple-200/50">
                      <Download className="w-4 h-4 mr-2" />
                      ดาวน์โหลด Transcript (PDF)
                    </Button>
                    <Button variant="outline" className="flex-1 h-12 border-purple-200 text-purple-700 hover:bg-purple-50">
                      <FileText className="w-4 h-4 mr-2" />
                      ดาวน์โหลด Transcript (ไทย)
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </motion.div>
    );
  }

  if (user?.role === 'lecturer') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-6"
      >
        <ThemedPageHeader
          title="บันทึกผลการเรียน"
          subtitle="จัดการคะแนนและตัดเกรดรายวิชา"
          icon={<GraduationCap className="w-7 h-7" />}
          gradient="green"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Course Selection */}
          <Card className="md:col-span-1 h-fit">
            <CardHeader>
              <CardTitle>รายวิชาที่สอน</CardTitle>
              <CardDescription>เลือกรายวิชาเพื่อบันทึกคะแนน</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockCourses.slice(0, 3).map(course => (
                <div key={course.id} className="p-3 rounded-lg border hover:border-green-500 cursor-pointer hover:bg-green-50 transition-all group">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-bold text-green-700">{course.code}</div>
                      <div className="text-sm font-medium">{course.name}</div>
                    </div>
                    <Badge variant="outline" className="group-hover:bg-green-200">Sec 001</Badge>
                  </div>
                  <div className="flex justify-between items-center mt-2 text-sm text-gray-500">
                    <span>45 คน</span>
                    <span>ส่งแล้ว 0/45</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Grading Table */}
          <Card className="md:col-span-2">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>DII302 Advanced AI</CardTitle>
                  <CardDescription>Section 001 • ภาคเรียนที่ 1/2568</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Import CSV
                  </Button>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    <Award className="w-4 h-4 mr-2" />
                    ตัดเกรด
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Input placeholder="ค้นหานักศึกษา..." className="max-w-[200px]" />
                  <Button variant="ghost" size="icon"><Filter className="w-4 h-4" /></Button>
                </div>

                <div className="rounded-md border">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="h-10 px-4 text-left font-medium text-gray-600">รหัสนักศึกษา</th>
                        <th className="h-10 px-4 text-left font-medium text-gray-600">ชื่อ-สกุล</th>
                        <th className="h-10 px-4 text-center font-medium text-gray-600">Midterm (30)</th>
                        <th className="h-10 px-4 text-center font-medium text-gray-600">Final (40)</th>
                        <th className="h-10 px-4 text-center font-medium text-gray-600">Total</th>
                        <th className="h-10 px-4 text-center font-medium text-gray-600">Grade</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[1, 2, 3, 4, 5].map((i) => (
                        <tr key={i} className="border-b hover:bg-gray-50/50">
                          <td className="p-4 font-medium">64211000{i}</td>
                          <td className="p-4">นักศึกษา ทดสอบ {i}</td>
                          <td className="p-4 text-center">
                            <Input className="w-16 h-8 mx-auto text-center" defaultValue={Math.floor(Math.random() * 10) + 20} />
                          </td>
                          <td className="p-4 text-center">
                            <Input className="w-16 h-8 mx-auto text-center" defaultValue={Math.floor(Math.random() * 10) + 25} />
                          </td>
                          <td className="p-4 text-center font-bold text-gray-700">85</td>
                          <td className="p-4 text-center">
                            <Badge className={i % 2 === 0 ? "bg-green-500" : "bg-blue-500"}>{i % 2 === 0 ? "A" : "B+"}</Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex justify-end mt-4">
                  <Button onClick={() => toast.success('บันทึกคะแนนเรียบร้อยแล้ว')}>บันทึกคะแนน</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    );
  }

  return null;
}
