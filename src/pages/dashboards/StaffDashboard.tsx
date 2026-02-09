import React from 'react';
import { motion } from 'framer-motion';
import {
  Users, BookOpen, Calendar, TrendingUp, AlertTriangle,
  FileText, Settings, BarChart3, Clock, CheckCircle, XCircle
} from 'lucide-react';
import { toast } from 'sonner';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import {
  mockStaff,
  mockStudents,
  mockCourses,
  mockLecturers,
  mockLecturerWorkloads,
  mockRequests,
} from '@/lib/mockData';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function StaffDashboard() {
  const navigate = useNavigate();
  const staff = mockStaff;
  const totalStudents = mockStudents.length;
  const atRiskStudents = mockStudents.filter(
    s => s.academicStatus === 'probation' || s.academicStatus === 'risk'
  ).length;
  const totalCourses = mockCourses.length;
  const totalLecturers = mockLecturers.length;
  const pendingRequests = mockRequests.filter(r => r.status === 'pending');
  const overloadedLecturers = mockLecturerWorkloads.filter(w => w.workloadPercentage > 90);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <motion.div variants={itemVariants} className="relative">
        <div className="flex items-center gap-2 mb-2">
          <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500 to-violet-500 text-white shadow-lg">
            <Settings className="w-5 h-5" />
          </div>
          <span className="text-sm font-medium text-purple-600">แดชบอร์ดเจ้าหน้าที่</span>
        </div>
        <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-3xl font-bold text-gray-900">
          <span className="bg-gradient-to-r from-purple-500 to-violet-500 bg-clip-text text-transparent">{`สวัสดี, ${staff.nameThai} 👔`}</span>
        </motion.h1>
        <p className="text-gray-500 mt-1">{`${staff.department} • ${staff.position}`}</p>
      </motion.div>

      <motion.div variants={itemVariants} className="flex justify-end gap-2">
        <Button variant="outline" onClick={() => toast.info('ระบบจัดการตารางเรียนกำลังเปิดใช้งานเร็วๆนี้')}>
          <Calendar className="w-4 h-4 mr-2" />จัดการตารางเรียน
        </Button>
        <Button
          className="bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600 shadow-lg shadow-purple-200/50"
          onClick={() => toast.info('ระบบตั้งค่ากำลังเปิดใช้งานเร็วๆนี้')}
        >
          <Settings className="w-4 h-4 mr-2" />ตั้งค่าระบบ
        </Button>
      </motion.div>

      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          whileHover={{ scale: 1.02 }}
          onClick={() => navigate('/users')}
          className={`relative overflow-hidden rounded-2xl p-6 text-white shadow-xl cursor-pointer ${atRiskStudents > 0
            ? 'bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500 shadow-orange-200'
            : 'bg-gradient-to-br from-purple-500 via-violet-500 to-indigo-500 shadow-purple-200'
            }`}
        >
          <div className="absolute -top-10 -right-10 w-28 h-28 bg-white/10 rounded-full blur-2xl" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 rounded-xl bg-white/20 backdrop-blur-sm">
                <Users className="w-5 h-5" />
              </div>
              <span className="font-medium text-white/90">นักศึกษาทั้งหมด</span>
            </div>
            <div className="text-4xl font-bold">{totalStudents}</div>
            <div className="text-sm text-white/80 mt-2">เสี่ยง {atRiskStudents} คน</div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          onClick={() => navigate('/courses')}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 p-6 text-white shadow-xl shadow-blue-200 cursor-pointer"
        >
          <div className="absolute -top-10 -right-10 w-28 h-28 bg-white/10 rounded-full blur-2xl" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 rounded-xl bg-white/20 backdrop-blur-sm">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="font-medium text-white/90">รายวิชา</span>
            </div>
            <div className="text-4xl font-bold">{totalCourses}</div>
            <div className="text-sm text-white/80 mt-2">วิชาในเทอมนี้</div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          onClick={() => navigate('/users')}
          className={`relative overflow-hidden rounded-2xl p-6 text-white shadow-xl cursor-pointer ${overloadedLecturers.length > 0
            ? 'bg-gradient-to-br from-red-500 via-rose-500 to-pink-500 shadow-red-200'
            : 'bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 shadow-emerald-200'
            }`}
        >
          <div className="absolute -top-10 -right-10 w-28 h-28 bg-white/10 rounded-full blur-2xl" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 rounded-xl bg-white/20 backdrop-blur-sm">
                <Users className="w-5 h-5" />
              </div>
              <span className="font-medium text-white/90">อาจารย์</span>
            </div>
            <div className="text-4xl font-bold">{totalLecturers}</div>
            <div className="text-sm text-white/80 mt-2">โหลดเกิน {overloadedLecturers.length} คน</div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          onClick={() => navigate('/documents')}
          className={`relative overflow-hidden rounded-2xl p-6 text-white shadow-xl cursor-pointer ${pendingRequests.length > 5
            ? 'bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500 shadow-orange-200'
            : 'bg-gradient-to-br from-purple-500 via-pink-500 to-rose-500 shadow-purple-200'
            }`}
        >
          <div className="absolute -top-10 -right-10 w-28 h-28 bg-white/10 rounded-full blur-2xl" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 rounded-xl bg-white/20 backdrop-blur-sm">
                <FileText className="w-5 h-5" />
              </div>
              <span className="font-medium text-white/90">คำร้องรอดำเนินการ</span>
            </div>
            <div className="text-4xl font-bold">{pendingRequests.length}</div>
            <div className="text-sm text-white/80 mt-2">ต้องตรวจสอบ</div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-3xl shadow-sm">
          <CardHeader>
            <CardTitle>ภาพรวมระบบ DII CAMT</CardTitle>
            <CardDescription>ข้อมูลสรุปของระบบบริหารจัดการ</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {atRiskStudents > 0 && (
                <div className="border-l-4 border-red-500 bg-red-50 p-4 rounded">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                    <h3 className="font-semibold text-red-900">นักศึกษาเสี่ยง</h3>
                  </div>
                  <p className="text-sm text-red-700">พบนักศึกษาที่มีความเสี่ยง {atRiskStudents} คน ต้องติดตามและให้ความช่วยเหลือ</p>
                </div>
              )}
              <div className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                  <h3 className="font-semibold text-blue-900">ระบบพร้อมใช้งาน</h3>
                </div>
                <p className="text-sm text-blue-700">ระบบทั้งหมดทำงานปกติและพร้อมให้บริการ</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
