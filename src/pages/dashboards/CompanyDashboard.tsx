import { motion } from 'framer-motion';
import { 
  Briefcase, 
  Users, 
  FileText,
  MessageSquare,
  ChevronRight,
  MapPin,
  Calendar,
  Eye,
  Send,
  Plus
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { StatsCard } from '@/components/common/StatsCard';
import { mockCompany, mockJobPostings, dashboardStats } from '@/lib/mockData';
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

// Mock recommended students
const recommendedStudents = [
  { 
    id: '1', 
    name: 'สมชาย ใจดี', 
    major: 'DII', 
    year: 3, 
    gpa: 3.45, 
    skills: ['React', 'Python', 'UX Design'],
    matchScore: 95 
  },
  { 
    id: '2', 
    name: 'สมหญิง เก่งมาก', 
    major: 'DII', 
    year: 4, 
    gpa: 3.78, 
    skills: ['Machine Learning', 'Python', 'Data Analysis'],
    matchScore: 88 
  },
  { 
    id: '3', 
    name: 'วิชัย พยายาม', 
    major: 'DII', 
    year: 3, 
    gpa: 3.25, 
    skills: ['React', 'Node.js', 'TypeScript'],
    matchScore: 82 
  },
];

export default function CompanyDashboard() {
  const { activePostings, totalApplicants, shortlisted, interviews } = dashboardStats.company;

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
            สวัสดี, {mockCompany.companyName}
          </h1>
          <p className="text-muted-foreground mt-1">
            อุตสาหกรรม: {mockCompany.industry}
          </p>
        </div>
        <Button variant="company" asChild>
          <Link to="/job-postings">
            <Plus className="mr-2 h-4 w-4" />
            สร้างประกาศใหม่
          </Link>
        </Button>
      </motion.div>

      {/* Stats Cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="ประกาศที่เปิดรับ"
          value={activePostings}
          subtitle="ตำแหน่ง"
          icon={Briefcase}
          variant="company"
        />
        <StatsCard
          title="ผู้สมัครทั้งหมด"
          value={totalApplicants}
          subtitle="คน"
          icon={Users}
          variant="default"
        />
        <StatsCard
          title="ผ่านการคัดเลือก"
          value={shortlisted}
          subtitle="คน"
          icon={FileText}
          variant="success"
        />
        <StatsCard
          title="นัดสัมภาษณ์"
          value={interviews}
          subtitle="นัด"
          icon={Calendar}
          variant="default"
        />
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
          {/* Active Job Postings */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>ประกาศรับสมัครงาน</CardTitle>
                <CardDescription>ประกาศที่กำลังเปิดรับ</CardDescription>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/job-postings">
                  ดูทั้งหมด
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockJobPostings.map((job) => (
                  <div
                    key={job.id}
                    className="flex items-center justify-between p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-role-company/10 flex items-center justify-center">
                        <Briefcase className="h-6 w-6 text-role-company" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{job.title}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          <span>{job.location}</span>
                          <Badge variant="outline" className="text-xs">
                            {job.type === 'internship' ? 'ฝึกงาน' :
                             job.type === 'full-time' ? 'ประจำ' : 'Part-time'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-foreground">{job.applicants}</p>
                      <p className="text-xs text-muted-foreground">ผู้สมัคร</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recommended Students */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>นักศึกษาที่แนะนำ</CardTitle>
                <CardDescription>จับคู่ตามทักษะที่ต้องการ</CardDescription>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/student-profiles">
                  ดูทั้งหมด
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recommendedStudents.map((student) => (
                  <div
                    key={student.id}
                    className="flex items-center justify-between p-4 rounded-xl border border-border hover:border-role-company/30 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-role-company/10 text-role-company font-semibold">
                          {student.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-foreground">{student.name}</p>
                        <p className="text-sm text-muted-foreground">
                          ชั้นปีที่ {student.year} • GPA {student.gpa.toFixed(2)}
                        </p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {student.skills.slice(0, 3).map((skill, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-role-company text-white">
                        {student.matchScore}% Match
                      </Badge>
                      <div className="flex gap-1 mt-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Right Column */}
        <motion.div variants={itemVariants} className="space-y-6">
          {/* Applicant Pipeline */}
          <Card>
            <CardHeader>
              <CardTitle>Pipeline ผู้สมัคร</CardTitle>
              <CardDescription>สถานะการคัดเลือก</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                  <span className="text-sm">สมัครใหม่</span>
                  <span className="font-semibold">{totalApplicants - shortlisted - interviews}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-role-company/10">
                  <span className="text-sm">คัดเลือกแล้ว</span>
                  <span className="font-semibold text-role-company">{shortlisted}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-success/10">
                  <span className="text-sm">นัดสัมภาษณ์</span>
                  <span className="font-semibold text-success">{interviews}</span>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4" asChild>
                <Link to="/applicants">จัดการผู้สมัคร</Link>
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
                <Link to="/job-postings">
                  <Briefcase className="mr-2 h-4 w-4" />
                  สร้างประกาศใหม่
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link to="/student-profiles">
                  <Users className="mr-2 h-4 w-4" />
                  ค้นหานักศึกษา
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link to="/messages">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  ส่งข้อความ
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Skill Requirements */}
          <Card>
            <CardHeader>
              <CardTitle>ทักษะที่ต้องการ</CardTitle>
              <CardDescription>ตามประกาศที่เปิดรับ</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {['React', 'TypeScript', 'Python', 'SQL', 'Figma', 'Node.js', 'Data Analysis'].map((skill, i) => (
                  <Badge key={i} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
