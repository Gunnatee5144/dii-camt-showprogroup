import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Users, FileText, Building, Send, Sparkles } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockCompany, mockJobPostings, mockStudents } from '@/lib/mockData';
import { useLanguage } from '@/contexts/LanguageContext';

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
  const { t, language } = useLanguage();
  const company = mockCompany;
  const companyJobPostings = mockJobPostings.filter(j => j.companyId === company.id);
  const totalApplications = companyJobPostings.reduce((sum, job) => sum + job.applicants.length, 0);
  const accessibleStudents = mockStudents.filter(s => company.studentViewConsent.includes(s.id));

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8 pb-10">
      {/* Header Section - Bento Grid Style */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-slate-500 font-medium mb-2"
          >
            <Building className="w-4 h-4 text-orange-500" />
            <span>{company.industry} • {company.size}</span>
          </motion.div>
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {t.companyDashboard.hello} <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">{company.companyNameThai}</span> 🏢
          </motion.h1>
        </div>

        <motion.div className="flex gap-3" variants={itemVariants}>
          <Link to="/job-postings">
            <Button className="rounded-xl bg-slate-900 text-white hover:bg-slate-800 shadow-lg shadow-slate-900/20">
              <Send className="w-4 h-4 mr-2" />{t.companyDashboard.postJob}
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Stats Grid - Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -5 }}
          onClick={() => navigate('/job-postings')}
          className="p-6 rounded-3xl bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-xl shadow-orange-500/20 relative overflow-hidden cursor-pointer"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-white/20 backdrop-blur-sm">
                <Briefcase className="w-6 h-6" />
              </div>
              <span className="font-medium text-white/90">{t.companyDashboard.jobPositions}</span>
            </div>
            <div className="text-5xl font-bold tracking-tight">{companyJobPostings.length}</div>
            <div className="mt-3 text-sm text-orange-100 flex items-center gap-1">
              <Sparkles className="w-4 h-4" />
              {t.companyDashboard.openPositions}
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          whileHover={{ y: -5 }}
          onClick={() => navigate('/applicants')}
          className="p-6 rounded-3xl bg-white border border-slate-100 shadow-xl shadow-slate-100/50 relative overflow-hidden group cursor-pointer"
        >
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-slate-100 text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                <Users className="w-6 h-6" />
              </div>
              <span className="font-medium text-slate-600">{t.companyDashboard.applicantsLabel}</span>
            </div>
            <div className="text-4xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{totalApplications}</div>
            <div className="mt-3 text-sm text-slate-400">
              {t.companyDashboard.totalApplicants}
            </div>
            <div className="absolute bottom-0 right-0 w-24 h-12 bg-gradient-to-t from-blue-50 to-transparent" />
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          whileHover={{ y: -5 }}
          onClick={() => navigate('/student-profiles')}
          className="p-6 rounded-3xl bg-white border border-slate-100 shadow-xl shadow-slate-100/50 relative overflow-hidden group cursor-pointer"
        >
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-slate-100 text-slate-600 group-hover:bg-purple-50 group-hover:text-purple-600 transition-colors">
                <FileText className="w-6 h-6" />
              </div>
              <span className="font-medium text-slate-600">{t.companyDashboard.accessibleStudents}</span>
            </div>
            <div className="text-4xl font-bold text-slate-900 group-hover:text-purple-600 transition-colors">{accessibleStudents.length}</div>
            <div className="mt-3 text-sm text-slate-400">
              {t.companyDashboard.byConsent}
            </div>
            <div className="absolute bottom-0 right-0 w-24 h-12 bg-gradient-to-t from-purple-50 to-transparent" />
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          whileHover={{ y: -5 }}
          onClick={() => navigate('/intern-tracking')}
          className="p-6 rounded-3xl bg-white border border-slate-100 shadow-xl shadow-slate-100/50 relative overflow-hidden group cursor-pointer"
        >
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-slate-100 text-slate-600 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
                <Building className="w-6 h-6" />
              </div>
              <span className="font-medium text-slate-600">{t.companyDashboard.interns}</span>
            </div>
            <div className="text-4xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">{company.currentInterns}/{company.internshipSlots}</div>
            <div className="mt-3 text-sm text-slate-400">
              {t.companyDashboard.current}
            </div>
            <div className="absolute bottom-0 right-0 w-24 h-12 bg-gradient-to-t from-emerald-50 to-transparent" />
          </div>
        </motion.div>
      </div>

      <motion.div variants={itemVariants}>
        <Tabs defaultValue="jobs" className="space-y-4">
          <TabsList>
            <TabsTrigger value="jobs">{t.companyDashboard.ourJobs}</TabsTrigger>
            <TabsTrigger value="students">{t.companyDashboard.accessibleStudentsTab}</TabsTrigger>
          </TabsList>

          <TabsContent value="jobs">
            <Card className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-3xl shadow-sm">
              <CardHeader>
                <CardTitle>{t.companyDashboard.ourJobs}</CardTitle>
                <CardDescription>{companyJobPostings.length} {t.companyDashboard.positions}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {companyJobPostings.map(job => (
                  <div key={job.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-lg">{job.title}</h3>
                        <p className="text-sm text-gray-600">{job.type === 'internship' ? t.companyDashboard.internship : t.companyDashboard.fullTime} • {job.location}</p>
                      </div>
                      <Badge variant={job.status === 'open' ? 'default' : 'secondary'}>{job.status === 'open' ? t.companyDashboard.open : t.companyDashboard.closed}</Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mb-3">
                      <div><div className="text-xs text-gray-600">{t.common.position}</div><div className="font-semibold">{job.positions} {t.companyDashboard.positionsCount}</div></div>
                      <div><div className="text-xs text-gray-600">{t.companyDashboard.applicantsLabel}</div><div className="font-semibold">{job.applicants.length} {t.common.person}</div></div>
                      <div><div className="text-xs text-gray-600">{t.companyDashboard.closeDate}</div><div className="font-semibold">{new Date(job.deadline).toLocaleDateString(language === 'th' ? 'th-TH' : 'en-US', { month: 'short', day: 'numeric' })}</div></div>
                    </div>
                    <Button size="sm" variant="outline" className="w-full" onClick={() => navigate('/applicants')}>{t.companyDashboard.viewApplicants}</Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="students">
            <Card className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-3xl shadow-sm">
              <CardHeader>
                <CardTitle>{t.companyDashboard.accessibleStudentsTab}</CardTitle>
                <CardDescription>{accessibleStudents.length} {t.common.person} ({t.companyDashboard.byConsent})</CardDescription>
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
                        <div className="text-sm text-gray-600">{t.companyDashboard.year} {student.year} • GPA {student.gpa.toFixed(2)}</div>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" onClick={() => navigate('/student-profiles')}>{t.companyDashboard.viewProfile}</Button>
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
