import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Calendar, Clock, MapPin, ChevronLeft, ChevronRight, BookOpen, GraduationCap } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ThemedPageHeader } from '@/components/common/ThemedPageHeader';
import { ThemedCard } from '@/components/common/ThemedCard';
import { Timetable } from '@/components/common/Timetable';
import { DraggableSchedule } from '@/components/schedule/DraggableSchedule';
import { mockStudent, mockCourses } from '@/lib/mockData';
import { toast } from 'sonner';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Schedule() {
  const { user } = useAuth();
  const [currentWeek, setCurrentWeek] = React.useState(0);

  // Hooks for Lecturer role - MUST be called unconditionally
  const [isEditMode, setIsEditMode] = React.useState(false);

  // Transform courses to schedule items - MUST be called unconditionally
  const scheduleItems: any[] = React.useMemo(() => {
    return mockCourses.flatMap(course =>
      (course.schedule || []).map((slot, idx) => ({
        id: `${course.id}-${idx}`,
        courseCode: course.courseCode,
        courseName: course.courseName,
        day: ['mon', 'tue', 'wed', 'thu', 'fri'].indexOf(slot.day.toLowerCase()) + 1,
        startTime: slot.startTime,
        endTime: slot.endTime,
        room: slot.room
      }))
    ).filter(item => item.day > 0);
  }, []);

  const handleRequestMove = (item: any, targetDay: number, targetTime: string, mode: string) => {
    toast.success('ส่งคำขอแก้ไขตารางสอนเรียบร้อยแล้ว', {
      description: `ระบบได้ส่งแจ้งเตือนไปยังเจ้าหน้าที่เพื่อตรวจสอบและอนุมัติ (${mode === 'permanent' ? 'ถาวร' : 'เฉพาะวันนี้'})`
    });
    setIsEditMode(false);
  };

  if (user?.role === 'student') {
    const studentCourses = mockCourses.filter(c =>
      mockStudent.courses?.some(sc => sc.courseId === c.id)
    );

    const totalCredits = studentCourses.reduce((sum, c) => sum + c.credits, 0);
    const totalHours = studentCourses.length * 3; // Approximate

    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        <ThemedPageHeader
          title="ตารางเรียน"
          subtitle="ภาคเรียนที่ 1/2567"
          icon={<Calendar className="w-7 h-7" />}
          actions={
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg p-1">
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20"
                onClick={() => setCurrentWeek(currentWeek - 1)}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="text-sm font-medium text-white px-3">สัปดาห์นี้</span>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20"
                onClick={() => setCurrentWeek(currentWeek + 1)}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          }
        />

        {/* Stats Row */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 p-6 text-white shadow-xl shadow-blue-200"
          >
            <div className="absolute -top-10 -right-10 w-28 h-28 bg-white/10 rounded-full blur-2xl" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 rounded-xl bg-white/20 backdrop-blur-sm">
                  <BookOpen className="w-5 h-5" />
                </div>
                <span className="font-medium text-white/90">วิชาทั้งหมด</span>
              </div>
              <div className="text-4xl font-bold">{studentCourses.length} วิชา</div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-rose-500 p-6 text-white shadow-xl shadow-purple-200"
          >
            <div className="absolute -top-10 -right-10 w-28 h-28 bg-white/10 rounded-full blur-2xl" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 rounded-xl bg-white/20 backdrop-blur-sm">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <span className="font-medium text-white/90">หน่วยกิตรวม</span>
              </div>
              <div className="text-4xl font-bold">{totalCredits} หน่วยกิต</div>
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
                <span className="font-medium text-white/90">ชั่วโมงต่อสัปดาห์</span>
              </div>
              <div className="text-4xl font-bold">{totalHours} ชั่วโมง</div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500 p-6 text-white shadow-xl shadow-orange-200"
          >
            <div className="absolute -top-10 -right-10 w-28 h-28 bg-white/10 rounded-full blur-2xl" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 rounded-xl bg-white/20 backdrop-blur-sm">
                  <Calendar className="w-5 h-5" />
                </div>
                <span className="font-medium text-white/90">วันเรียน</span>
              </div>
              <div className="text-4xl font-bold">จ-ศ</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Timetable */}
        <motion.div variants={itemVariants}>
          <Card>
            <CardContent className="pt-6">
              <Timetable courses={studentCourses} />
            </CardContent>
          </Card>
        </motion.div>

        {/* Today's Classes & Summary */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                คลาสวันนี้
              </CardTitle>
              <CardDescription>
                {new Date().toLocaleDateString('th-TH', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {studentCourses.slice(0, 3).map((course, index) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-4 p-4 bg-gradient-to-r from-blue-50 to-white rounded-xl border border-blue-100 hover:shadow-md transition-all"
                  >
                    <div className="flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-cyan-500 text-white rounded-xl px-3 py-2 min-w-[70px] shadow-lg shadow-blue-200">
                      <div className="text-sm font-bold">08:00</div>
                      <div className="text-xs opacity-75">ถึง</div>
                      <div className="text-sm font-bold">11:00</div>
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">{course.courseCode}</div>
                      <div className="text-sm text-gray-600">{course.courseName}</div>
                      <div className="flex items-center gap-2 text-xs text-gray-500 mt-2">
                        <MapPin className="w-3 h-3" />
                        <span>ห้อง {course.schedule?.[0]?.room || '301'}</span>
                        <span className="text-gray-300">•</span>
                        <span>{course.schedule?.[0]?.building || 'อาคาร DII'}</span>
                      </div>
                    </div>
                    <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                      กำลังเรียน
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                สรุปตารางเรียน
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gradient-to-r from-gray-50 to-white rounded-xl border">
                  <span className="text-gray-600">วิชาทั้งหมด</span>
                  <span className="font-bold text-lg text-primary">{studentCourses.length} วิชา</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gradient-to-r from-gray-50 to-white rounded-xl border">
                  <span className="text-gray-600">หน่วยกิตรวม</span>
                  <span className="font-bold text-lg text-purple-600">{totalCredits} หน่วยกิต</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gradient-to-r from-gray-50 to-white rounded-xl border">
                  <span className="text-gray-600">ชั่วโมงต่อสัปดาห์</span>
                  <span className="font-bold text-lg text-emerald-600">{totalHours} ชั่วโมง</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gradient-to-r from-gray-50 to-white rounded-xl border">
                  <span className="text-gray-600">วันเรียน</span>
                  <span className="font-bold text-lg text-orange-600">จันทร์ - ศุกร์</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    );
  }

  // For other roles (Lecturer)
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <ThemedPageHeader
        title="ตารางสอน"
        subtitle="ภาคเรียนที่ 1/2567"
        icon={<Calendar className="w-7 h-7" />}
        actions={
          <Button
            variant={isEditMode ? "secondary" : "default"}
            onClick={() => setIsEditMode(!isEditMode)}
            className="bg-white/20 hover:bg-white/30 text-white border-0"
          >
            {isEditMode ? 'ปิดโหมดแก้ไข' : 'ขอแก้ไขตาราง'}
          </Button>
        }
      />

      <motion.div variants={itemVariants}>
        <Card>
          {isEditMode && (
            <div className="p-4 bg-orange-50 border-b border-orange-100 text-orange-700 text-sm flex items-center gap-2">
              <Clock className="w-4 h-4" />
              โหมดขอแก้ไขตารางสอน: ลากวิชาไปยังเวลาที่ต้องการ เมื่อยืนยันระบบจะส่งคำขอไปยังเจ้าหน้าที่
            </div>
          )}
          <CardContent className="pt-6">
            {isEditMode ? (
              <DraggableSchedule
                initialSchedule={scheduleItems}
                editable={true}
                onRequestMove={handleRequestMove}
              />
            ) : (
              <Timetable courses={mockCourses.slice(0, 3)} />
            )}
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
