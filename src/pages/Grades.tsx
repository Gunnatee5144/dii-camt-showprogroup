import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import {
  TrendingUp, TrendingDown, Award, AlertCircle, Download,
  Filter, BarChart3, PieChart, FileText, GraduationCap, BookOpen, Target,
  Star, Sparkles, ChevronRight, Share2, Printer
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
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
              <GraduationCap className="w-4 h-4 text-emerald-500" />
              <span>ผลการเรียนภาคเรียนที่ 1/2568</span>
            </motion.div>
            <motion.h1
              className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              สรุป<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">ผลการเรียน</span>
            </motion.h1>
          </div>

          <motion.div className="flex gap-3" variants={itemVariants}>
            <Button variant="outline" className="rounded-xl border-slate-200 hover:bg-white hover:text-emerald-600">
              <Share2 className="w-4 h-4 mr-2" />
              แชร์ผลการเรียน
            </Button>
            <Button className="rounded-xl bg-slate-900 text-white hover:bg-slate-800 shadow-lg shadow-slate-900/20">
              <Download className="w-4 h-4 mr-2" />
              Transcript (PDF)
            </Button>
          </motion.div>
        </div>

        {/* Stats Grid */}
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
                  <Star className="w-6 h-6" />
                </div>
                <span className="font-medium text-white/90">GPAX สะสม</span>
              </div>
              <div className="text-5xl font-bold tracking-tight">{mockStudent.gpax.toFixed(2)}</div>
              <div className="mt-3 text-sm text-emerald-100 flex items-center gap-1">
                {mockStudent.gpax >= 3.5 ? <Sparkles className="w-4 h-4" /> : null}
                {mockStudent.gpax >= 3.5 ? 'ผลการเรียนดีเยี่ยม' : 'อยู่ในเกณฑ์ปกติ'}
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
                  <Award className="w-6 h-6" />
                </div>
                <span className="font-medium text-slate-600">GPA ภาคนี้</span>
              </div>
              <div className="text-4xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{gpa.toFixed(2)}</div>
              <div className="mt-3 text-sm text-slate-400">
                เป้าหมาย: <span className="text-slate-600 font-semibold">3.80</span>
              </div>
              {/* Mini chart placeholder */}
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
                <span className="font-medium text-slate-600">หน่วยกิตสะสม</span>
              </div>
              <div className="text-4xl font-bold text-slate-900 group-hover:text-purple-600 transition-colors">{mockStudent.earnedCredits}</div>
              <div className="mt-3 flex items-center justify-between text-sm text-slate-400">
                <span>จาก {mockStudent.totalCredits}</span>
                <span>{(mockStudent.earnedCredits / mockStudent.totalCredits * 100).toFixed(0)}%</span>
              </div>
              <div className="mt-2 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(mockStudent.earnedCredits / mockStudent.totalCredits) * 100}%` }}
                  className="h-full bg-purple-500 rounded-full"
                />
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
                <div className="p-2.5 rounded-xl bg-slate-100 text-slate-600 group-hover:bg-orange-50 group-hover:text-orange-600 transition-colors">
                  <Target className="w-6 h-6" />
                </div>
                <span className="font-medium text-slate-600">สถานะ</span>
              </div>
              <div className="text-4xl font-bold text-slate-900 group-hover:text-orange-600 transition-colors">ปกติ</div>
              <div className="mt-3 text-sm text-green-600 font-medium bg-green-50 w-fit px-2 py-1 rounded-lg">
                ไม่มีความเสี่ยง
              </div>
            </div>
          </motion.div>
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="current" className="space-y-8">
          <TabsList className="bg-white/40 backdrop-blur-xl border border-white/40 p-1.5 h-auto rounded-2xl shadow-sm w-full md:w-auto flex overflow-x-auto">
            <TabsTrigger value="current" className="rounded-xl px-6 py-2.5 data-[state=active]:bg-white data-[state=active]:text-emerald-600 data-[state=active]:shadow-md font-medium text-slate-600 flex-1 md:flex-none">
              <BookOpen className="w-4 h-4 mr-2" />
              ภาคปัจจุบัน
            </TabsTrigger>
            <TabsTrigger value="all" className="rounded-xl px-6 py-2.5 data-[state=active]:bg-white data-[state=active]:text-emerald-600 data-[state=active]:shadow-md font-medium text-slate-600 flex-1 md:flex-none">
              <BarChart3 className="w-4 h-4 mr-2" />
              ทุกภาค
            </TabsTrigger>
            <TabsTrigger value="analysis" className="rounded-xl px-6 py-2.5 data-[state=active]:bg-white data-[state=active]:text-emerald-600 data-[state=active]:shadow-md font-medium text-slate-600 flex-1 md:flex-none">
              <PieChart className="w-4 h-4 mr-2" />
              วิเคราะห์
            </TabsTrigger>
            <TabsTrigger value="transcript" className="rounded-xl px-6 py-2.5 data-[state=active]:bg-white data-[state=active]:text-emerald-600 data-[state=active]:shadow-md font-medium text-slate-600 flex-1 md:flex-none">
              <FileText className="w-4 h-4 mr-2" />
              Transcript
            </TabsTrigger>
          </TabsList>

          <TabsContent value="current" className="space-y-6">
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentTermGrades.map((grade, index) => {
                const course = mockCourses.find(c => c.id === grade.courseId);
                if (!course) return null;

                const getGradeColor = (g: string) => {
                  if (g === 'A') return 'bg-emerald-500 text-white shadow-emerald-200';
                  if (g.startsWith('B')) return 'bg-blue-500 text-white shadow-blue-200';
                  if (g.startsWith('C')) return 'bg-orange-500 text-white shadow-orange-200';
                  return 'bg-red-500 text-white shadow-red-200';
                };

                return (
                  <motion.div
                    key={grade.courseId}
                    whileHover={{ y: -4 }}
                    className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all"
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center font-bold text-slate-700 border border-slate-100">
                          {course.code?.slice(-2) || 'XX'}
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-slate-900">{course.code}</h3>
                          <p className="text-slate-500 text-sm line-clamp-1">{course.name}</p>
                        </div>
                      </div>
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-bold shadow-lg ${getGradeColor(grade.letterGrade)}`}>
                        {grade.letterGrade}
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-2 mb-6">
                      <div className="text-center p-2 rounded-xl bg-slate-50">
                        <div className="text-xs text-slate-400 mb-1">Mid</div>
                        <div className="font-bold text-slate-700">{grade.midterm || '-'}</div>
                      </div>
                      <div className="text-center p-2 rounded-xl bg-slate-50">
                        <div className="text-xs text-slate-400 mb-1">Final</div>
                        <div className="font-bold text-slate-700">{grade.final || '-'}</div>
                      </div>
                      <div className="text-center p-2 rounded-xl bg-slate-50">
                        <div className="text-xs text-slate-400 mb-1">Assign</div>
                        <div className="font-bold text-slate-700">{grade.assignments || '-'}</div>
                      </div>
                      <div className="text-center p-2 rounded-xl bg-emerald-50 border border-emerald-100">
                        <div className="text-xs text-emerald-600 mb-1">Total</div>
                        <div className="font-bold text-emerald-700">{grade.total}</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <Badge variant="outline" className="text-slate-500 border-slate-200 font-normal">{course.credits} หน่วยกิต</Badge>
                      {grade.remarks && <span className="text-orange-500 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {grade.remarks}</span>}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </TabsContent>

          <TabsContent value="all" className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
              {Object.entries(semesterGrades).map(([semester, data], index) => (
                <motion.div
                  key={semester}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.01 }}
                  className="group flex items-center justify-between p-6 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform">
                      {data.gpa.toFixed(2)}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-1">ภาคเรียนที่ {semester}</h3>
                      <p className="text-slate-500">{data.credits} หน่วยกิต • {data.gpa >= 3.0 ? 'ผ่านเกณฑ์ดี' : 'ต้องพยายามเพิ่ม'}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-6 h-6 text-slate-300 group-hover:text-emerald-500 transition-colors" />
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analysis" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div variants={itemVariants} className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
                <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-emerald-500" />
                  การกระจายเกรด
                </h3>
                <div className="space-y-4">
                  {Object.entries(gradeDistribution).map(([grade, count]) => {
                    if (count === 0) return null;
                    const percentage = (count / studentGrades.length) * 100;
                    return (
                      <div key={grade}>
                        <div className="flex justify-between text-sm mb-2 font-medium">
                          <span className="text-slate-700">เกรด {grade}</span>
                          <span className="text-slate-500">{count} วิชา ({percentage.toFixed(0)}%)</span>
                        </div>
                        <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${percentage}%` }}
                            transition={{ duration: 1 }}
                            className={`h-full rounded-full ${grade === 'A' ? 'bg-emerald-500' : grade.startsWith('B') ? 'bg-blue-500' : 'bg-orange-500'}`}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex flex-col justify-center items-center text-center">
                <div className="w-32 h-32 rounded-full bg-emerald-50 flex items-center justify-center mb-6">
                  <TrendingUp className="w-12 h-12 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">แนวโน้มดีเยี่ยม!</h3>
                <p className="text-slate-500 max-w-xs mx-auto">
                  ผลการเรียนของคุณมีแนวโน้มสูงขึ้นเรื่อยๆ รักษามาตรฐานนี้ไว้เพื่อเกียรตินิยมอันดับ 1
                </p>
              </motion.div>
            </div>
          </TabsContent>

          <TabsContent value="transcript" className="space-y-6">
            <motion.div variants={itemVariants} className="bg-white rounded-3xl p-10 shadow-lg border border-slate-100 max-w-4xl mx-auto">
              <div className="text-center mb-10 border-b border-slate-100 pb-8">
                <div className="w-20 h-20 bg-purple-600 rounded-2xl mx-auto flex items-center justify-center text-white text-2xl font-bold mb-4 shadow-xl shadow-purple-500/30">
                  CMU
                </div>
                <h2 className="text-2xl font-bold text-slate-900">มหาวิทยาลัยเชียงใหม่</h2>
                <p className="text-slate-500">Official Transcript of Records</p>
              </div>

              <div className="grid grid-cols-2 gap-y-4 gap-x-12 mb-10 text-sm">
                <div className="flex justify-between border-b border-slate-50 py-2">
                  <span className="text-slate-500">Name</span>
                  <span className="font-bold text-slate-900">{mockStudent.nameThai}</span>
                </div>
                <div className="flex justify-between border-b border-slate-50 py-2">
                  <span className="text-slate-500">Student ID</span>
                  <span className="font-bold text-slate-900">{mockStudent.studentId}</span>
                </div>
                <div className="flex justify-between border-b border-slate-50 py-2">
                  <span className="text-slate-500">Faculty</span>
                  <span className="font-bold text-slate-900">CAMT</span>
                </div>
                <div className="flex justify-between border-b border-slate-50 py-2">
                  <span className="text-slate-500">Major</span>
                  <span className="font-bold text-slate-900">{mockStudent.major}</span>
                </div>
              </div>

              <div className="md:flex gap-4 justify-center">
                <Button className="w-full md:w-auto bg-slate-900 text-white hover:bg-slate-800 h-12 px-8 rounded-xl">
                  <Download className="w-4 h-4 mr-2" /> Download PDF
                </Button>
                <Button variant="outline" className="w-full md:w-auto h-12 px-8 rounded-xl">
                  <Printer className="w-4 h-4 mr-2" /> Print
                </Button>
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </motion.div>
    );
  }

  // Lecturer View Placeholder
  return (
    <div className="p-8 text-center text-slate-500">
      Lecturer/Staff View Coming Soon
    </div>
  );
}
