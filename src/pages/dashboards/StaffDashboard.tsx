import { motion } from 'framer-motion';
import { 
  Users, 
  BookOpen, 
  Trophy, 
  ClipboardList,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  Activity,
  Shield,
  Bell,
  BarChart3,
  UserPlus
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { StatsCard } from '@/components/common/StatsCard';
import { mockStaff, mockRequests, dashboardStats } from '@/lib/mockData';
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

// Mock system logs
const systemLogs = [
  { id: '1', action: 'เข้าสู่ระบบ', user: 'นักศึกษา 650510001', time: '5 นาทีที่แล้ว', type: 'info' },
  { id: '2', action: 'บันทึกเกรด DII201', user: 'ดร.สมศักดิ์ วิชาการ', time: '15 นาทีที่แล้ว', type: 'success' },
  { id: '3', action: 'ยื่นคำร้องขอหนังสือ', user: 'นักศึกษา 650510023', time: '30 นาทีที่แล้ว', type: 'warning' },
  { id: '4', action: 'สร้างกิจกรรมใหม่', user: 'เจ้าหน้าที่', time: '1 ชั่วโมงที่แล้ว', type: 'info' },
];

// Mock user stats
const userStats = {
  student: { total: 850, active: 720, new: 25 },
  teacher: { total: 45, active: 42, new: 2 },
  staff: { total: 15, active: 15, new: 0 },
  company: { total: 120, active: 85, new: 8 },
};

export default function StaffDashboard() {
  const { totalUsers, activeStudents, pendingRequests, systemHealth } = dashboardStats.staff;

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
            สวัสดี, {mockStaff.name}
          </h1>
          <p className="text-muted-foreground mt-1">
            {mockStaff.position} • {mockStaff.department}
          </p>
        </div>
        <Button variant="staff" asChild>
          <Link to="/users">
            <UserPlus className="mr-2 h-4 w-4" />
            เพิ่มผู้ใช้งาน
          </Link>
        </Button>
      </motion.div>

      {/* Stats Cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="ผู้ใช้งานทั้งหมด"
          value={totalUsers.toLocaleString()}
          subtitle="บัญชี"
          icon={Users}
          variant="staff"
          trend={{ value: 5.2, label: 'จากเดือนที่แล้ว', isPositive: true }}
        />
        <StatsCard
          title="นักศึกษา Active"
          value={activeStudents}
          subtitle="คนใช้งานเดือนนี้"
          icon={Activity}
          variant="default"
        />
        <StatsCard
          title="คำร้องรอดำเนินการ"
          value={pendingRequests}
          subtitle="รายการ"
          icon={ClipboardList}
          variant="warning"
        />
        <StatsCard
          title="สถานะระบบ"
          value={`${systemHealth}%`}
          subtitle="ปกติ"
          icon={Shield}
          variant="success"
        />
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
          {/* User Overview */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>ภาพรวมผู้ใช้งาน</CardTitle>
                <CardDescription>สถิติผู้ใช้งานแยกตามบทบาท</CardDescription>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/users">
                  จัดการ
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(userStats).map(([role, stats]) => (
                  <div key={role} className="p-4 rounded-xl bg-secondary/50 text-center">
                    <p className="text-2xl font-bold text-foreground">{stats.total}</p>
                    <p className="text-sm text-muted-foreground capitalize">
                      {role === 'student' ? 'นักศึกษา' :
                       role === 'teacher' ? 'อาจารย์' :
                       role === 'staff' ? 'เจ้าหน้าที่' : 'บริษัท'}
                    </p>
                    <div className="flex items-center justify-center gap-1 mt-2">
                      <span className="text-xs text-success">+{stats.new}</span>
                      <TrendingUp className="h-3 w-3 text-success" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pending Requests */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>คำร้องที่รอดำเนินการ</CardTitle>
                <CardDescription>คำร้องจากนักศึกษา</CardDescription>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/requests">
                  ดูทั้งหมด
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockRequests.map((request) => (
                  <div
                    key={request.id}
                    className="flex items-center justify-between p-4 rounded-xl border border-border hover:border-muted-foreground/30 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        request.status === 'processing' ? 'bg-role-staff/10' : 'bg-warning/10'
                      }`}>
                        <ClipboardList className={`h-5 w-5 ${
                          request.status === 'processing' ? 'text-role-staff' : 'text-warning'
                        }`} />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{request.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {request.type === 'certificate' ? 'หนังสือรับรอง' :
                           request.type === 'scholarship' ? 'ทุนการศึกษา' :
                           request.type === 'course_opening' ? 'เปิดรายวิชา' : 'อื่นๆ'}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={
                        request.status === 'processing' ? 'default' :
                        request.status === 'pending' ? 'secondary' : 'outline'
                      }>
                        {request.status === 'processing' ? 'กำลังดำเนินการ' :
                         request.status === 'pending' ? 'รอตรวจสอบ' : request.status}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">
                        {request.createdAt.toLocaleDateString('th-TH')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Right Column */}
        <motion.div variants={itemVariants} className="space-y-6">
          {/* System Activity */}
          <Card>
            <CardHeader>
              <CardTitle>กิจกรรมล่าสุด</CardTitle>
              <CardDescription>Log การใช้งานระบบ</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {systemLogs.map((log) => (
                  <div key={log.id} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      log.type === 'success' ? 'bg-success' :
                      log.type === 'warning' ? 'bg-warning' : 'bg-info'
                    }`} />
                    <div className="flex-1">
                      <p className="font-medium text-sm text-foreground">{log.action}</p>
                      <p className="text-xs text-muted-foreground">{log.user}</p>
                      <p className="text-xs text-muted-foreground">{log.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4" asChild>
                <Link to="/audit">ดู Audit Log ทั้งหมด</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>การดำเนินการด่วน</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link to="/users">
                  <Users className="mr-2 h-4 w-4" />
                  จัดการผู้ใช้งาน
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link to="/reports">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  ดูรายงาน
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link to="/notifications">
                  <Bell className="mr-2 h-4 w-4" />
                  ตั้งค่าการแจ้งเตือน
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link to="/activities">
                  <Trophy className="mr-2 h-4 w-4" />
                  จัดการกิจกรรม
                </Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
