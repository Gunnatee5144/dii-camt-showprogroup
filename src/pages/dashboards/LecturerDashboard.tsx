import React from 'react';
import { motion } from 'framer-motion';
import {
  BookOpen, Users, Calendar, TrendingUp, Clock,
  FileText, CheckCircle, AlertCircle, MessageSquare, Award,
  ChevronRight
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import {
  mockLecturer,
  mockCourses,
  mockStudents,
  mockAppointments,
  mockGrades,
  getLecturerAppointments,
} from '@/lib/mockData';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function LecturerDashboard() {
  const navigate = useNavigate();
  const lecturer = mockLecturer;
  const appointments = getLecturerAppointments(lecturer.id);
  const upcomingAppointments = appointments.filter(a => a.status === 'confirmed').slice(0, 3);

  // Lecturer's courses
  const lecturerCourses = mockCourses.filter(c => c.lecturerId === lecturer.id);
  const totalStudents = lecturerCourses.reduce((sum, course) => sum + course.enrolledStudents.length, 0);

  // Advisees
  const adviseesList = mockStudents.filter(s => lecturer.advisees.includes(s.id));
  const atRiskAdvisees = adviseesList.filter(s => s.academicStatus === 'probation' || s.academicStatus === 'risk');

  const workloadPercentage = (lecturer.teachingHours / lecturer.maxTeachingHours) * 100;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Welcome Header */}
      <div>
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2 text-slate-500 font-medium mb-2">
          <BookOpen className="w-4 h-4 text-emerald-500" />
          <span>{`${lecturer.department} • ${lecturer.position === 'assistant_professor' ? 'ผู้ช่วยศาสตราจารย์' :
            lecturer.position === 'associate_professor' ? 'รองศาสตราจารย์' :
              lecturer.position === 'professor' ? 'ศาสตราจารย์' : 'อาจารย์'
            }`}</span>
        </motion.div>
        <motion.h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          สวัสดี, <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">{lecturer.nameThai} 👨‍🏫</span>
        </motion.h1>
      </div>

      <motion.div variants={itemVariants} className="flex justify-end gap-2">
        <Link to="/schedule">
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            จัดการตารางสอน
          </Button>
        </Link>
        <Link to="/messages">
          <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 shadow-lg shadow-emerald-200/50">
            <MessageSquare className="w-4 h-4 mr-2" />
            ข้อความ
          </Button>
        </Link>
      </motion.div>

      {/* Key Stats */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          whileHover={{ scale: 1.02 }}
          onClick={() => navigate('/courses')}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 p-6 text-white shadow-xl shadow-emerald-200 cursor-pointer"
        >
          <div className="absolute -top-10 -right-10 w-28 h-28 bg-white/10 rounded-full blur-2xl" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 rounded-xl bg-white/20 backdrop-blur-sm">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="font-medium text-white/90">รายวิชาที่สอน</span>
            </div>
            <div className="text-4xl font-bold">{lecturerCourses.length}</div>
            <div className="text-sm text-white/80 mt-2">วิชาในเทอมนี้</div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          onClick={() => navigate('/students')}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 p-6 text-white shadow-xl shadow-blue-200 cursor-pointer"
        >
          <div className="absolute -top-10 -right-10 w-28 h-28 bg-white/10 rounded-full blur-2xl" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 rounded-xl bg-white/20 backdrop-blur-sm">
                <Users className="w-5 h-5" />
              </div>
              <span className="font-medium text-white/90">จำนวนนักศึกษา</span>
            </div>
            <div className="text-4xl font-bold">{totalStudents}</div>
            <div className="text-sm text-white/80 mt-2">นักศึกษาทั้งหมด</div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          onClick={() => navigate('/students')}
          className={`relative overflow-hidden rounded-2xl p-6 text-white shadow-xl cursor-pointer ${atRiskAdvisees.length > 0
            ? 'bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500 shadow-orange-200'
            : 'bg-gradient-to-br from-purple-500 via-pink-500 to-rose-500 shadow-purple-200'
            }`}
        >
          <div className="absolute -top-10 -right-10 w-28 h-28 bg-white/10 rounded-full blur-2xl" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 rounded-xl bg-white/20 backdrop-blur-sm">
                <Award className="w-5 h-5" />
              </div>
              <span className="font-medium text-white/90">นักศึกษาในที่ปรึกษา</span>
            </div>
            <div className="text-4xl font-bold">{adviseesList.length}/{lecturer.maxAdvisees}</div>
            <div className="text-sm text-white/80 mt-2">
              {atRiskAdvisees.length > 0 ? `เสี่ยง ${atRiskAdvisees.length} คน` : 'ทุกคนปกติ'}
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          onClick={() => navigate('/workload')}
          className={`relative overflow-hidden rounded-2xl p-6 text-white shadow-xl cursor-pointer ${workloadPercentage >= 80
            ? 'bg-gradient-to-br from-red-500 via-rose-500 to-pink-500 shadow-red-200'
            : 'bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 shadow-green-200'
            }`}
        >
          <div className="absolute -top-10 -right-10 w-28 h-28 bg-white/10 rounded-full blur-2xl" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 rounded-xl bg-white/20 backdrop-blur-sm">
                <Clock className="w-5 h-5" />
              </div>
              <span className="font-medium text-white/90">ภาระงาน</span>
            </div>
            <div className="text-3xl font-bold">{lecturer.teachingHours}/{lecturer.maxTeachingHours} ชม.</div>
            <div className="text-sm text-white/80 mt-2">{workloadPercentage.toFixed(0)}% ของเวลาทำงาน</div>
          </div>
        </motion.div>
      </motion.div>

      {/* Main Content */}
      <motion.div variants={itemVariants}>
        <Tabs defaultValue="courses" className="space-y-4">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto">
            <TabsTrigger value="courses">รายวิชา</TabsTrigger>
            <TabsTrigger value="students">นักศึกษา</TabsTrigger>
            <TabsTrigger value="advisees">ที่ปรึกษา</TabsTrigger>
            <TabsTrigger value="grades">เกรด</TabsTrigger>
            <TabsTrigger value="schedule">ตารางสอน</TabsTrigger>
          </TabsList>

          {/* Courses Tab */}
          <TabsContent value="courses" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Courses List */}
              <div className="lg:col-span-2 space-y-4">
                <Card className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-3xl shadow-sm">
                  <CardHeader>
                    <CardTitle>รายวิชาที่สอน</CardTitle>
                    <CardDescription>เทอม 1/2568 • {lecturerCourses.length} วิชา</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {lecturerCourses.map(course => (
                      <div key={course.id} className="border rounded-lg p-4 space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-lg">{course.code}</h3>
                              <Badge variant="secondary">{course.credits} หน่วยกิต</Badge>
                            </div>
                            <p className="text-gray-600">{course.nameThai}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 pt-3 border-t">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600">
                              {course.enrolledStudents.length}
                            </div>
                            <div className="text-xs text-gray-600">นักศึกษา</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-green-600">
                              {course.sections.length}
                            </div>
                            <div className="text-xs text-gray-600">Section</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-purple-600">
                              {course.assignments?.length || 0}
                            </div>
                            <div className="text-xs text-gray-600">งานที่มอบหมาย</div>
                          </div>
                        </div>

                        <div className="flex gap-2 pt-2">
                          <Button size="sm" variant="outline" className="flex-1" onClick={() => navigate('/courses')}>
                            <FileText className="w-4 h-4 mr-2" />
                            จัดการวิชา
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1" onClick={() => navigate('/students')}>
                            <Users className="w-4 h-4 mr-2" />
                            ดูนักศึกษา
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-4">
                {/* Workload */}
                <Card className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-3xl shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-sm">ภาระงานสอน</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm">ชั่วโมงสอน</span>
                        <span className="text-sm font-semibold">
                          {lecturer.teachingHours}/{lecturer.maxTeachingHours} ชม.
                        </span>
                      </div>
                      <Progress value={workloadPercentage} className="h-2" />
                      <p className="text-xs text-gray-500 mt-2">
                        {workloadPercentage < 80 ? 'ภาระงานปกติ' : 'ภาระงานใกล้เต็ม'}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Upcoming Appointments */}
                <Card className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-3xl shadow-sm">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm">นัดหมายที่กำลังมาถึง</CardTitle>
                      <Button variant="ghost" size="sm">ดูทั้งหมด</Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {upcomingAppointments.length > 0 ? (
                      upcomingAppointments.map(apt => (
                        <div key={apt.id} className="border rounded-lg p-3 space-y-2">
                          <div className="font-semibold text-sm">{apt.studentName}</div>
                          <div className="text-xs text-gray-600">{apt.purpose}</div>
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>{new Date(apt.date).toLocaleDateString('th-TH')}</span>
                            <span>{apt.startTime} - {apt.endTime}</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500 text-center py-4">
                        ไม่มีนัดหมาย
                      </p>
                    )}
                  </CardContent>
                </Card>

                {/* Office Hours */}
                <Card className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-3xl shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-sm">เวลาให้คำปรึกษา</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {lecturer.officeHours.map(hour => (
                      <div key={hour.id} className="flex items-center justify-between text-sm p-2 bg-gray-50 rounded">
                        <span className="font-medium capitalize">{hour.day}</span>
                        <span className="text-gray-600">{hour.startTime}-{hour.endTime}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Students Tab */}
          <TabsContent value="students">
            <Card className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-3xl shadow-sm">
              <CardHeader>
                <CardTitle>นักศึกษาทั้งหมด</CardTitle>
                <CardDescription>นักศึกษาในรายวิชาที่สอน</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {lecturerCourses.map(course => {
                    const courseStudents = mockStudents.filter(s =>
                      course.enrolledStudents.includes(s.id)
                    );
                    return (
                      <div key={course.id} className="border rounded-lg p-4">
                        <h3 className="font-semibold mb-3">{course.code} - {course.nameThai}</h3>
                        <div className="grid gap-2">
                          {courseStudents.map(student => (
                            <div key={student.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                  <span className="text-sm font-semibold text-blue-600">
                                    {student.nameThai.charAt(0)}
                                  </span>
                                </div>
                                <div>
                                  <div className="font-semibold text-sm">{student.nameThai}</div>
                                  <div className="text-xs text-gray-600">{student.studentId}</div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge variant="secondary">GPA {student.gpa.toFixed(2)}</Badge>
                                <Button size="sm" variant="ghost">ดูข้อมูล</Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Advisees Tab */}
          <TabsContent value="advisees" className="space-y-4">
            {atRiskAdvisees.length > 0 && (
              <Card className="bg-red-50/60 backdrop-blur-xl border border-red-200 rounded-3xl shadow-sm">
                <CardHeader>
                  <CardTitle className="text-red-900 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    นักศึกษาเสี่ยง ({atRiskAdvisees.length} คน)
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {atRiskAdvisees.map(student => (
                    <div key={student.id} className="bg-white border border-red-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold">{student.nameThai}</h3>
                          <p className="text-sm text-gray-600">{student.studentId}</p>
                        </div>
                        <Badge variant="destructive">{student.academicStatus}</Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4 mb-3">
                        <div>
                          <div className="text-xs text-gray-600">GPA</div>
                          <div className="font-semibold text-red-600">{student.gpa.toFixed(2)}</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-600">หน่วยกิต</div>
                          <div className="font-semibold">{student.earnedCredits}/{student.totalCredits}</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-600">ชั้นปี</div>
                          <div className="font-semibold">{student.year}</div>
                        </div>
                      </div>
                      <Link to={`/students`}>
                        <Button size="sm" className="w-full">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          ติดต่อและให้คำปรึกษา
                        </Button>
                      </Link>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            <Card className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-3xl shadow-sm">
              <CardHeader>
                <CardTitle>นักศึกษาในที่ปรึกษาทั้งหมด</CardTitle>
                <CardDescription>{adviseesList.length} คน</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  {adviseesList.map(student => (
                    <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                          <span className="text-lg font-bold text-white">
                            {student.nameThai.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-semibold">{student.nameThai}</h3>
                          <p className="text-sm text-gray-600">{student.studentId} • ชั้นปีที่ {student.year}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className="text-sm font-semibold">GPA {student.gpa.toFixed(2)}</div>
                          <Badge variant={student.academicStatus === 'normal' ? 'default' : 'destructive'}>
                            {student.academicStatus === 'normal' ? 'ปกติ' : 'เสี่ยง'}
                          </Badge>
                        </div>
                        <Button size="sm" variant="outline">ดูข้อมูล</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Grades Tab */}
          <TabsContent value="grades">
            <Card className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-3xl shadow-sm">
              <CardHeader>
                <CardTitle>การจัดการเกรด</CardTitle>
                <CardDescription>บันทึกและแก้ไขเกรดนักศึกษา</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {lecturerCourses.map(course => {
                    const courseGrades = mockGrades.filter(g => g.courseId === course.id);
                    return (
                      <div key={course.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="font-semibold">{course.code} - {course.nameThai}</h3>
                            <p className="text-sm text-gray-600">{courseGrades.length} คะแนน</p>
                          </div>
                          <Button size="sm">
                            <FileText className="w-4 h-4 mr-2" />
                            บันทึกเกรด
                          </Button>
                        </div>
                        {courseGrades.length > 0 && (
                          <div className="space-y-2">
                            {courseGrades.map((grade, index) => {
                              const student = mockStudents.find(s => s.id === grade.studentId);
                              return (
                                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                                  <span className="text-sm">{student?.nameThai}</span>
                                  <div className="flex items-center gap-2">
                                    <Badge>{grade.letterGrade}</Badge>
                                    <span className="text-sm text-gray-600">{grade.total?.toFixed(0)} คะแนน</span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Schedule Tab */}
          <TabsContent value="schedule">
            <Card className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-3xl shadow-sm">
              <CardHeader>
                <CardTitle>ตารางสอน</CardTitle>
                <CardDescription>ตารางสอนประจำสัปดาห์</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {lecturerCourses.map(course => (
                    <div key={course.id} className="border rounded-lg p-4">
                      <h3 className="font-semibold mb-3">{course.code} - {course.nameThai}</h3>
                      <div className="grid gap-2">
                        {course.schedule.map((schedule, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                            <div className="flex items-center gap-3">
                              <Calendar className="w-4 h-4 text-blue-600" />
                              <span className="font-medium">{schedule.dayThai}</span>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <span>{schedule.startTime} - {schedule.endTime}</span>
                              <span>ห้อง {schedule.room}</span>
                              <Badge variant="secondary">{schedule.type}</Badge>
                            </div>
                          </div>
                        ))}
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
