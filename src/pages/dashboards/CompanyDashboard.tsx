import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Users, FileText, Building, Send } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ThemedPageHeader } from '@/components/common/ThemedPageHeader';
import { mockCompany, mockJobPostings, mockStudents } from '@/lib/mockData';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function CompanyDashboard() {
  const navigate = useNavigate();
  const company = mockCompany;
  const companyJobPostings = mockJobPostings.filter(j => j.companyId === company.id);
  const totalApplications = companyJobPostings.reduce((sum, job) => sum + job.applicants.length, 0);
  const accessibleStudents = mockStudents.filter(s => company.studentViewConsent.includes(s.id));

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
      <ThemedPageHeader
        title={`สวัสดี, ${company.companyNameThai} 🏢`}
        subtitle={`${company.industry} • ${company.size === 'medium' ? 'ขนาดกลาง' : company.size}`}
        icon={<Building className="w-7 h-7" />}
      />

      <motion.div variants={itemVariants} className="flex justify-end">
        <Link to="/job-postings">
          <Button className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-lg shadow-orange-200/50">
            <Send className="w-4 h-4 mr-2" />ลงประกาศงาน
          </Button>
        </Link>
      </motion.div>

      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          whileHover={{ scale: 1.02 }}
          onClick={() => navigate('/job-postings')}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500 p-6 text-white shadow-xl shadow-orange-200 cursor-pointer"
        >
          <div className="absolute -top-10 -right-10 w-28 h-28 bg-white/10 rounded-full blur-2xl" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 rounded-xl bg-white/20 backdrop-blur-sm">
                <Briefcase className="w-5 h-5" />
              </div>
              <span className="font-medium text-white/90">ตำแหน่งงาน</span>
            </div>
            <div className="text-4xl font-bold">{companyJobPostings.length}</div>
            <div className="text-sm text-white/80 mt-2">ประกาศที่เปิดรับ</div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          onClick={() => navigate('/applicants')}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 p-6 text-white shadow-xl shadow-blue-200 cursor-pointer"
        >
          <div className="absolute -top-10 -right-10 w-28 h-28 bg-white/10 rounded-full blur-2xl" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 rounded-xl bg-white/20 backdrop-blur-sm">
                <Users className="w-5 h-5" />
              </div>
              <span className="font-medium text-white/90">ผู้สมัคร</span>
            </div>
            <div className="text-4xl font-bold">{totalApplications}</div>
            <div className="text-sm text-white/80 mt-2">ผู้สมัครทั้งหมด</div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          onClick={() => navigate('/student-profiles')}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 p-6 text-white shadow-xl shadow-emerald-200 cursor-pointer"
        >
          <div className="absolute -top-10 -right-10 w-28 h-28 bg-white/10 rounded-full blur-2xl" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 rounded-xl bg-white/20 backdrop-blur-sm">
                <FileText className="w-5 h-5" />
              </div>
              <span className="font-medium text-white/90">นักศึกษาที่ดูได้</span>
            </div>
            <div className="text-4xl font-bold">{accessibleStudents.length}</div>
            <div className="text-sm text-white/80 mt-2">ตาม Consent</div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          onClick={() => navigate('/intern-tracking')}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-rose-500 p-6 text-white shadow-xl shadow-purple-200 cursor-pointer"
        >
          <div className="absolute -top-10 -right-10 w-28 h-28 bg-white/10 rounded-full blur-2xl" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 rounded-xl bg-white/20 backdrop-blur-sm">
                <Building className="w-5 h-5" />
              </div>
              <span className="font-medium text-white/90">นักศึกษาฝึกงาน</span>
            </div>
            <div className="text-3xl font-bold">{company.currentInterns}/{company.internshipSlots}</div>
            <div className="text-sm text-white/80 mt-2">ปัจจุบัน</div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Tabs defaultValue="jobs" className="space-y-4">
          <TabsList>
            <TabsTrigger value="jobs">ประกาศงาน</TabsTrigger>
            <TabsTrigger value="students">นักศึกษา</TabsTrigger>
          </TabsList>

          <TabsContent value="jobs">
            <Card>
              <CardHeader>
                <CardTitle>ประกาศงานของเรา</CardTitle>
                <CardDescription>{companyJobPostings.length} ตำแหน่ง</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {companyJobPostings.map(job => (
                  <div key={job.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-lg">{job.title}</h3>
                        <p className="text-sm text-gray-600">{job.type === 'internship' ? 'ฝึกงาน' : 'งานเต็มเวลา'} • {job.location}</p>
                      </div>
                      <Badge variant={job.status === 'open' ? 'default' : 'secondary'}>{job.status === 'open' ? 'เปิดรับ' : 'ปิดรับ'}</Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mb-3">
                      <div><div className="text-xs text-gray-600">ตำแหน่ง</div><div className="font-semibold">{job.positions} อัตรา</div></div>
                      <div><div className="text-xs text-gray-600">ผู้สมัคร</div><div className="font-semibold">{job.applicants.length} คน</div></div>
                      <div><div className="text-xs text-gray-600">ปิดรับ</div><div className="font-semibold">{new Date(job.deadline).toLocaleDateString('th-TH', { month: 'short', day: 'numeric' })}</div></div>
                    </div>
                    <Button size="sm" variant="outline" className="w-full" onClick={() => navigate('/applicants')}>ดูผู้สมัครทั้งหมด</Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="students">
            <Card>
              <CardHeader>
                <CardTitle>นักศึกษาที่สามารถดูได้</CardTitle>
                <CardDescription>{accessibleStudents.length} คน (ตาม Consent)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {accessibleStudents.map(student => (
                  <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                        <span className="text-lg font-bold text-white">{student.nameThai.charAt(0)}</span>
                      </div>
                      <div>
                        <div className="font-semibold">{student.nameThai}</div>
                        <div className="text-sm text-gray-600">ชั้นปี {student.year} • GPA {student.gpa.toFixed(2)}</div>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" onClick={() => navigate('/student-profiles')}>ดูโปรไฟล์</Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  );
}
