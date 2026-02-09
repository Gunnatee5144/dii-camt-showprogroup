import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Users, Search, Filter, GraduationCap, AlertTriangle, 
  Eye, Mail, TrendingUp, ChevronRight, Award, BookOpen
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockStudents } from '@/lib/mockData';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Students() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [yearFilter, setYearFilter] = React.useState('all');
  const [statusFilter, setStatusFilter] = React.useState('all');

  const filteredStudents = mockStudents.filter(student => {
    const matchesSearch = 
      student.nameThai.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.studentId.includes(searchQuery);
    const matchesYear = yearFilter === 'all' || student.year.toString() === yearFilter;
    const matchesStatus = statusFilter === 'all' || student.academicStatus === statusFilter;
    return matchesSearch && matchesYear && matchesStatus;
  });

  const atRiskCount = mockStudents.filter(s => s.academicStatus === 'probation' || s.academicStatus === 'risk').length;
  const avgGPA = (mockStudents.reduce((sum, s) => sum + s.gpa, 0) / mockStudents.length).toFixed(2);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'normal': return <Badge className="bg-emerald-100 text-emerald-700">ปกติ</Badge>;
      case 'probation': return <Badge className="bg-orange-100 text-orange-700">ทดลอง</Badge>;
      case 'risk': return <Badge className="bg-red-100 text-red-700">เสี่ยง</Badge>;
      case 'dropped': return <Badge className="bg-gray-100 text-gray-700">พ้นสภาพ</Badge>;
      default: return <Badge>{status}</Badge>;
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <div>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2 text-slate-500 font-medium mb-2">
              <Users className="w-4 h-4 text-blue-500" />
              <span>{`ทั้งหมด ${mockStudents.length} คน • เสี่ยง ${atRiskCount} คน`}</span>
          </motion.div>
          <motion.h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              จัดการ<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">นักศึกษา</span>
          </motion.h1>
      </div>

      {/* Stats Cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 p-6 text-white shadow-xl shadow-blue-200"
        >
          <div className="absolute -top-10 -right-10 w-28 h-28 bg-white/10 rounded-full blur-2xl" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 rounded-xl bg-white/20 backdrop-blur-sm">
                <Users className="w-5 h-5" />
              </div>
              <span className="font-medium text-white/90">นักศึกษาทั้งหมด</span>
            </div>
            <div className="text-4xl font-bold">{mockStudents.length}</div>
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
                <TrendingUp className="w-5 h-5" />
              </div>
              <span className="font-medium text-white/90">GPA เฉลี่ย</span>
            </div>
            <div className="text-4xl font-bold">{avgGPA}</div>
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
                <AlertTriangle className="w-5 h-5" />
              </div>
              <span className="font-medium text-white/90">นักศึกษาเสี่ยง</span>
            </div>
            <div className="text-4xl font-bold">{atRiskCount}</div>
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
                <Award className="w-5 h-5" />
              </div>
              <span className="font-medium text-white/90">สถานะปกติ</span>
            </div>
            <div className="text-4xl font-bold">{mockStudents.filter(s => s.academicStatus === 'normal').length}</div>
          </div>
        </motion.div>
      </motion.div>

      {/* Filters */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="ค้นหาชื่อ, รหัสนักศึกษา..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={yearFilter} onValueChange={setYearFilter}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="ชั้นปี" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">ทุกชั้นปี</SelectItem>
            <SelectItem value="1">ชั้นปี 1</SelectItem>
            <SelectItem value="2">ชั้นปี 2</SelectItem>
            <SelectItem value="3">ชั้นปี 3</SelectItem>
            <SelectItem value="4">ชั้นปี 4</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="สถานะ" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">ทุกสถานะ</SelectItem>
            <SelectItem value="normal">ปกติ</SelectItem>
            <SelectItem value="probation">ทดลอง</SelectItem>
            <SelectItem value="risk">เสี่ยง</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      {/* Student List */}
      <motion.div variants={itemVariants}>
        <Card className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-3xl shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5" />
              รายชื่อนักศึกษา
            </CardTitle>
            <CardDescription>แสดง {filteredStudents.length} จาก {mockStudents.length} คน</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredStudents.map((student, index) => (
                <motion.div
                  key={student.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.01, x: 4 }}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 hover:border-primary/30 hover:shadow-md transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      {student.nameThai.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 group-hover:text-primary transition-colors">
                        {student.nameThai}
                      </div>
                      <div className="text-sm text-gray-600">{student.studentId}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">ปี {student.year}</Badge>
                        <span className="text-xs text-gray-500">{student.major}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right hidden sm:block">
                      <div className="text-sm font-semibold">GPA {student.gpa.toFixed(2)}</div>
                      <div className="text-xs text-gray-500">{student.earnedCredits}/{student.totalCredits} หน่วยกิต</div>
                    </div>
                    {getStatusBadge(student.academicStatus)}
                    <div className="flex gap-1">
                      <Button size="sm" variant="ghost">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Mail className="w-4 h-4" />
                      </Button>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
