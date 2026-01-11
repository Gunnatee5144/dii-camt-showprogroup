import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Users, 
  ClipboardList, 
  Calendar,
  ChevronRight,
  AlertTriangle,
  CheckCircle2,
  Clock,
  GraduationCap
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { StatsCard } from '@/components/common/StatsCard';
import { mockLecturer, mockCourses, mockAppointments } from '@/lib/mockData';
import { Link } from 'react-router-dom';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// Mock at-risk students
const atRiskStudents = [
  { id: '1', name: 'นายสมศักดิ์ มานะ', studentId: '650510005', gpa: 1.85, issue: 'GPA ต่ำกว่าเกณฑ์' },
  { id: '2', name: 'นางสาวสมหญิง ใจดี', studentId: '650510012', gpa: 2.15, issue: 'ขาดเรียนบ่อย' },
  { id: '3', name: 'นายชัยวุฒิ พยายาม', studentId: '650510008', gpa: 2.25, issue: 'ไม่ส่งงานหลายวิชา' },
];

export default function TeacherDashboard() {
  const teacher = mockLecturer;
  const teacherCourses = mockCourses.filter(c => c.instructorId === teacher.id);
  const totalCourses = teacherCourses.length;
  const totalStudents = teacherCourses.reduce((sum, course) => sum + (course.enrolled || 0), 0);
  const teacherAppointments = mockAppointments.filter(apt => apt.lecturerId === teacher.id);
  const pendingAppointments = teacherAppointments.filter(apt => apt.status === 'pending').length;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Welcome Section */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            สวัสดี, {teacher.nameThai}
          </h1>
          <p className="text-muted-foreground mt-1">
            {teacher.position} • สาขา {teacher.department}
          </p>
        </div>
        <Button variant="teacher" asChild>
          <Link to="/grades">
            <GraduationCap className="mr-2 h-4 w-4" />
            บันทึกเกรด
          </Link>
        </Button>
      </motion.div>

      {/* Stats Cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="รายวิชาที่สอน"
          value={totalCourses}
          subtitle="วิชาในเทอมนี้"
          icon={<BookOpen className="w-5 h-5" />}
          variant="teacher"
        />
        <StatsCard
          title="นักศึกษาทั้งหมด"
          value={totalStudents}
          subtitle="คน"
          icon={<Users className="w-5 h-5" />}
          variant="default"
        />
        <StatsCard
          title="เกรดที่รอบันทึก"
          value={12}
          subtitle="รายการ"
          icon={<ClipboardList className="w-5 h-5" />}
          variant="warning"
        />
        <StatsCard
          title="นัดหมายรอยืนยัน"
          value={pendingAppointments}
          subtitle="นัดหมาย"
          icon={<Calendar className="w-5 h-5" />}
          variant="default"
        />
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
          {/* Courses */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>รายวิชาที่สอน</CardTitle>
                <CardDescription>ภาคเรียนที่ 1/2567</CardDescription>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/courses">
                  ดูทั้งหมด
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockCourses.slice(0, 3).map((course) => (
                  <div
                    key={course.id}
                    className="flex items-center justify-between p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-role-teacher/10 flex items-center justify-center">
                        <BookOpen className="h-6 w-6 text-role-teacher" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{course.name}</p>
                        <p className="text-sm text-muted-foreground">{course.code} • {course.schedule}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-foreground">{course.students}</p>
                      <p className="text-xs text-muted-foreground">นักศึกษา</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* At-Risk Students */}
          <Card className="border-warning/50">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-warning" />
                <div>
                  <CardTitle>นักศึกษาที่ต้องดูแล</CardTitle>
                  <CardDescription>นักศึกษาในที่ปรึกษาที่มีความเสี่ยง</CardDescription>
                </div>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/students">
                  ดูทั้งหมด
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {atRiskStudents.map((student) => (
                  <div
                    key={student.id}
                    className="flex items-center justify-between p-4 rounded-xl border border-warning/30 bg-warning/5 hover:bg-warning/10 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarFallback className="bg-warning/20 text-warning">
                          {student.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-foreground">{student.name}</p>
                        <p className="text-sm text-muted-foreground">{student.studentId}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className="bg-warning/10 border-warning/30 text-warning">
                        GPA {student.gpa.toFixed(2)}
                      </Badge>
                      <p className="text-xs text-warning mt-1">{student.issue}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Right Column */}
        <motion.div variants={itemVariants} className="space-y-6">
          {/* Upcoming Appointments */}
          <Card>
            <CardHeader>
              <CardTitle>นัดหมายที่จะถึง</CardTitle>
              <CardDescription>การนัดพบนักศึกษา</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockAppointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      appointment.status === 'confirmed' ? 'bg-success/10' : 'bg-warning/10'
                    }`}>
                      {appointment.status === 'confirmed' ? (
                        <CheckCircle2 className="h-5 w-5 text-success" />
                      ) : (
                        <Clock className="h-5 w-5 text-warning" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm text-foreground">{appointment.reason}</p>
                      <p className="text-xs text-muted-foreground">
                        {appointment.date.toLocaleDateString('th-TH')} • {appointment.time} น.
                      </p>
                      <Badge 
                        variant={appointment.status === 'confirmed' ? 'default' : 'outline'}
                        className="mt-1 text-xs"
                      >
                        {appointment.status === 'confirmed' ? 'ยืนยันแล้ว' : 'รอยืนยัน'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4" asChild>
                <Link to="/appointments">ดูนัดหมายทั้งหมด</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Advisees Summary */}
          <Card>
            <CardHeader>
              <CardTitle>สรุปนักศึกษาในที่ปรึกษา</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">นักศึกษาทั้งหมด</span>
                  <span className="font-semibold">{advisees}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">สถานะปกติ</span>
                  <span className="font-semibold text-success">{advisees - atRiskStudents.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">ต้องดูแลพิเศษ</span>
                  <span className="font-semibold text-warning">{atRiskStudents.length}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>การดำเนินการด่วน</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link to="/grades">
                  <ClipboardList className="mr-2 h-4 w-4" />
                  บันทึกเกรด
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link to="/assignments">
                  <BookOpen className="mr-2 h-4 w-4" />
                  สร้างงานใหม่
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link to="/students">
                  <Users className="mr-2 h-4 w-4" />
                  ดูรายชื่อนักศึกษา
                </Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
