import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Calendar, Clock, MapPin, ChevronLeft, ChevronRight,
  BookOpen, GraduationCap, GripVertical, Info
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
  const { t } = useLanguage();
  const [currentWeek, setCurrentWeek] = React.useState(0);
  const [isEditMode, setIsEditMode] = React.useState(false);

  // Transform courses to schedule items
  const scheduleItems: any[] = React.useMemo(() => {
    return mockCourses.flatMap(course =>
      (course.schedule || []).map((slot, idx) => ({
        id: `${course.id}-${idx}`,
        courseCode: course.code,
        courseName: course.name,
        day: ['mon', 'tue', 'wed', 'thu', 'fri'].indexOf(slot.day.toLowerCase()) + 1,
        startTime: slot.startTime,
        endTime: slot.endTime,
        room: slot.room
      }))
    ).filter(item => item.day > 0);
  }, []);

  const handleRequestMove = (item: any, targetDay: number, targetTime: string, mode: string) => {
    toast.success(t.schedulePage.editSuccess, {
      description: `${t.schedulePage.editSuccessDesc} (${mode === 'permanent' ? t.schedulePage.permanent : t.schedulePage.todayOnly})`
    });
    setIsEditMode(false);
  };

  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + (currentWeek * 7));

  // Format week range
  const startOfWeek = new Date(currentDate);
  const day = startOfWeek.getDay();
  const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
  startOfWeek.setDate(diff);
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 4);

  if (user?.role === 'student') {
    // Correctly filter courses for the student
    const studentCourses = mockCourses.filter(c =>
      c.enrolledStudents.includes(mockStudent.id)
    );

    const totalCredits = studentCourses.reduce((sum, c) => sum + c.credits, 0);
    const totalHours = studentCourses.length * 3;

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
              <Calendar className="w-4 h-4 text-purple-500" />
              <span>{t.schedulePage.semester}</span>
            </motion.div>
            <motion.h1
              className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {t.schedulePage.title}<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">{t.schedulePage.titleHighlight}</span>
            </motion.h1>
          </div>

          <motion.div
            className="flex items-center gap-2 bg-white rounded-2xl p-1.5 shadow-sm border border-slate-200"
            whileHover={{ scale: 1.02 }}
          >
            <Button variant="ghost" size="icon" onClick={() => setCurrentWeek(currentWeek - 1)} className="rounded-xl hover:bg-slate-100">
              <ChevronLeft className="w-5 h-5 text-slate-600" />
            </Button>
            <div className="px-4 text-sm font-bold text-slate-700">
              {startOfWeek.getDate()} {startOfWeek.toLocaleDateString('th-TH', { month: 'short' })} - {endOfWeek.getDate()} {endOfWeek.toLocaleDateString('th-TH', { month: 'short' })}
            </div>
            <Button variant="ghost" size="icon" onClick={() => setCurrentWeek(currentWeek + 1)} className="rounded-xl hover:bg-slate-100">
              <ChevronRight className="w-5 h-5 text-slate-600" />
            </Button>
          </motion.div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="p-5 rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/20"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-xl bg-white/20 backdrop-blur-sm">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="font-medium text-white/90 text-sm">{t.schedulePage.totalCourses}</span>
            </div>
            <div className="text-3xl font-bold">{studentCourses.length}</div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="p-5 rounded-3xl bg-gradient-to-br from-purple-500 to-pink-600 text-white shadow-lg shadow-purple-500/20"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-xl bg-white/20 backdrop-blur-sm">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="font-medium text-white/90 text-sm">{t.schedulePage.totalCredits}</span>
            </div>
            <div className="text-3xl font-bold">{totalCredits}</div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="p-5 rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/20"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-xl bg-white/20 backdrop-blur-sm">
                <Clock className="w-5 h-5" />
              </div>
              <span className="font-medium text-white/90 text-sm">{t.schedulePage.hoursPerWeek}</span>
            </div>
            <div className="text-3xl font-bold">{totalHours}</div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm text-slate-700"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-xl bg-slate-100">
                <Calendar className="w-5 h-5 text-slate-500" />
              </div>
              <span className="font-medium text-slate-500 text-sm">{t.schedulePage.studyDays}</span>
            </div>
            <div className="text-3xl font-bold">{t.schedulePage.monFri}</div>
          </motion.div>
        </div>

        {/* Timetable Card */}
        <motion.div variants={itemVariants} className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-3xl p-6 shadow-sm">
          <Timetable
            courses={studentCourses}
            semester={mockStudent.semester}
            academicYear={mockStudent.academicYear}
          />
        </motion.div>

        {/* Today's Classes */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-500" /> {t.schedulePage.todayClasses}
            </h3>
            <div className="space-y-3">
              {studentCourses.slice(0, 3).map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all cursor-pointer group"
                >
                  <div className="flex flex-col items-center justify-center bg-purple-50 text-purple-700 rounded-xl px-4 py-2 min-w-[80px] group-hover:bg-purple-500 group-hover:text-white transition-colors">
                    <div className="text-sm font-bold">09:00</div>
                    <div className="text-xs opacity-75">12:00</div>
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-slate-800 group-hover:text-purple-600 transition-colors">{course.name}</div>
                    <div className="text-xs text-slate-500 flex items-center gap-2 mt-1">
                      <MapPin className="w-3 h-3" />
                      ห้อง 301 อาคาร DII
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-purple-100 text-purple-600 group-hover:bg-white group-hover:text-purple-600">
                    {t.schedulePage.inClass}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 rounded-full blur-[80px]" />
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Info className="w-5 h-5 text-purple-400" /> {t.schedulePage.warnings}
              </h3>
              <ul className="space-y-4 text-slate-300 text-sm">
                <li className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold shrink-0">1</div>
                  {t.schedulePage.warningLate}
                </li>
                <li className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold shrink-0">2</div>
                  {t.schedulePage.warningLeave}
                </li>
                <li className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold shrink-0">3</div>
                  {t.schedulePage.warningDress}
                </li>
              </ul>
              <Button className="w-full mt-8 bg-purple-600 hover:bg-purple-500 text-white border-0">
                {t.schedulePage.viewRules}
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  // Lecturer View
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
            <Calendar className="w-4 h-4 text-purple-500" />
            <span>{t.schedulePage.lecturerSubtitle}</span>
          </motion.div>
          <motion.h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              {t.schedulePage.lecturerTitle}<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">{t.schedulePage.lecturerHighlight}</span>
          </motion.h1>
        </div>
        <Button
          variant={isEditMode ? "secondary" : "default"}
          onClick={() => setIsEditMode(!isEditMode)}
          className="rounded-xl px-6"
        >
          {isEditMode ? t.schedulePage.saveChanges : t.schedulePage.editSchedule}
        </Button>
      </div>

      {isEditMode && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-orange-50 border border-orange-200 text-orange-800 p-4 rounded-xl flex items-center gap-3"
        >
          <Clock className="w-5 h-5" />
          <span className="font-medium">Complete editing mode enabled. Drag and drop slots to reschedule.</span>
        </motion.div>
      )}

      <motion.div variants={itemVariants} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
        {isEditMode ? (
          <DraggableSchedule
            initialSchedule={scheduleItems}
            editable={true}
            onRequestMove={handleRequestMove}
          />
        ) : (
          <Timetable
            courses={mockCourses.slice(0, 3)}
            semester={1}
            academicYear="2568"
          />
        )}
      </motion.div>
    </motion.div>
  );
}
