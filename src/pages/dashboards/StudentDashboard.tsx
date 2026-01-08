import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Calendar, 
  Trophy, 
  FileText, 
  TrendingUp, 
  Clock, 
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  Star
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { StatsCard } from '@/components/common/StatsCard';
import { ProgressRing } from '@/components/common/ProgressRing';
import { mockStudent, mockCourses, mockActivities, dashboardStats } from '@/lib/mockData';
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

export default function StudentDashboard() {
  const { totalCredits, requiredCredits, currentGPA, activityPoints, requiredPoints, upcomingEvents } = dashboardStats.student;
  const creditProgress = (totalCredits / requiredCredits) * 100;
  const pointProgress = (activityPoints / requiredPoints) * 100;

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
            สวัสดี, {mockStudent.name}
          </h1>
          <p className="text-muted-foreground mt-1">
            นักศึกษาชั้นปีที่ {mockStudent.year} • รหัสนักศึกษา {mockStudent.studentId}
          </p>
        </div>
        <Button variant="student" asChild>
          <Link to="/portfolio">
            <FileText className="mr-2 h-4 w-4" />
            ดู Portfolio
          </Link>
        </Button>
      </motion.div>

      {/* Stats Cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="เกรดเฉลี่ยสะสม"
          value={currentGPA.toFixed(2)}
          subtitle="GPA"
          icon={Star}
          variant="student"
        />
        <StatsCard
          title="หน่วยกิตสะสม"
          value={`${totalCredits}/${requiredCredits}`}
          subtitle="หน่วยกิต"
          icon={BookOpen}
          variant="default"
        />
        <StatsCard
          title="แต้มกิจกรรม"
          value={`${activityPoints}/${requiredPoints}`}
          subtitle="แต้ม"
          icon={Trophy}
          variant="success"
        />
        <StatsCard
          title="กิจกรรมที่รอ"
          value={upcomingEvents}
          subtitle="กิจกรรม"
          icon={Calendar}
          variant="warning"
        />
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
          {/* Current Courses */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>รายวิชาในเทอมนี้</CardTitle>
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
                {mockCourses.slice(0, 4).map((course) => (
                  <div
                    key={course.id}
                    className="flex items-center justify-between p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-role-student/10 flex items-center justify-center">
                        <BookOpen className="h-6 w-6 text-role-student" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{course.name}</p>
                        <p className="text-sm text-muted-foreground">{course.code} • {course.credits} หน่วยกิต</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-foreground">{course.schedule}</p>
                      <p className="text-xs text-muted-foreground">{course.instructor}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>กิจกรรมล่าสุด</CardTitle>
                <CardDescription>สะสมแต้มและ Badge จากกิจกรรม</CardDescription>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/activities">
                  ดูทั้งหมด
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center justify-between p-4 rounded-xl border border-border hover:border-muted-foreground/30 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        activity.status === 'completed' ? 'bg-success/10' :
                        activity.status === 'approved' ? 'bg-role-student/10' :
                        'bg-warning/10'
                      }`}>
                        {activity.status === 'completed' ? (
                          <CheckCircle2 className="h-5 w-5 text-success" />
                        ) : activity.status === 'approved' ? (
                          <Clock className="h-5 w-5 text-role-student" />
                        ) : (
                          <AlertCircle className="h-5 w-5 text-warning" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{activity.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {activity.type} • {activity.hours} ชั่วโมง
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={
                        activity.status === 'completed' ? 'default' :
                        activity.status === 'approved' ? 'secondary' :
                        'outline'
                      }>
                        {activity.status === 'completed' ? 'เสร็จสิ้น' :
                         activity.status === 'approved' ? 'อนุมัติแล้ว' :
                         'รอดำเนินการ'}
                      </Badge>
                      <p className="text-sm font-medium text-accent mt-1">+{activity.points} แต้ม</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Right Column */}
        <motion.div variants={itemVariants} className="space-y-6">
          {/* Degree Progress */}
          <Card>
            <CardHeader>
              <CardTitle>ความก้าวหน้าหลักสูตร</CardTitle>
              <CardDescription>การสะสมหน่วยกิตและแต้มกิจกรรม</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <ProgressRing
                progress={creditProgress}
                size={140}
                variant="student"
                label="หน่วยกิต"
                sublabel={`${totalCredits}/${requiredCredits}`}
              />
              <div className="w-full mt-6 space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">หน่วยกิตสะสม</span>
                    <span className="font-medium">{creditProgress.toFixed(0)}%</span>
                  </div>
                  <Progress value={creditProgress} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">แต้มกิจกรรม</span>
                    <span className="font-medium">{pointProgress.toFixed(0)}%</span>
                  </div>
                  <Progress value={pointProgress} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Skills */}
          <Card>
            <CardHeader>
              <CardTitle>ทักษะของฉัน</CardTitle>
              <CardDescription>จากรายวิชาและกิจกรรม</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {mockStudent.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="px-3 py-1">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Links */}
          <Card>
            <CardHeader>
              <CardTitle>ลิงก์ด่วน</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link to="/schedule">
                  <Calendar className="mr-2 h-4 w-4" />
                  ดูตารางเรียน
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link to="/grades">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  ดูผลการเรียน
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link to="/requests">
                  <FileText className="mr-2 h-4 w-4" />
                  ยื่นคำร้อง
                </Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
