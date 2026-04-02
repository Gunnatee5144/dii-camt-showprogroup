import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Users, FileText, Building, Send, Sparkles, BrainCircuit, Bookmark, PlusCircle, CheckCircle2, TrendingUp, BellRing, Target, Trophy, Flame } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { mockCompany, mockJobPostings, mockStudents } from '@/lib/mockData';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';

const mockRequirements = [
  { id: 'req-1', title: 'Frontend Developer (React/Vue)', skills: ['React', 'TypeScript', 'Tailwind CSS'], type: 'Internship', status: 'Active', matchCount: 12 },
  { id: 'req-2', title: 'Data Scientist for ML Project', skills: ['Python', 'Machine Learning', 'SQL'], type: 'Project-based', status: 'Active', matchCount: 5 },
];

const mockFollowedStudents = mockStudents.slice(0, 2).map(s => ({ ...s, followDate: '2026-03-28', thresholdMet: true }));
const mockAiMatchedStudents = mockStudents.slice(1, 4).map((s, idx) => ({ ...s, matchScore: [95, 88, 82][idx], matchedSkills: ['React', 'TypeScript', 'Node.js'].slice(0, idx + 1), interested: idx === 0, exclusiveAccess: idx === 0 }));

const mockNotifications = [
  { id: 1, type: 'interest', message: 'พีรดนย์ ศรีประเสริฐ (Year 3) has expressed interest in your Data Scientist requirement.', time: '2 hours ago', read: false },
  { id: 2, type: 'threshold', message: 'THRESHOLD MET: สมใจ รักดี (Followed) has just reached the required 3.5 GPA criteria.', time: '5 hours ago', read: false },
  { id: 3, type: 'competition', message: 'COMPETITION ALERT: Another company is viewing your top matched talent. Send an early offer now!', time: '1 day ago', read: true }
];

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
  const { toast } = useToast();
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
            className="flex items-center gap-2 text-slate-500 dark:text-slate-400 font-medium mb-2"
          >
            <Building className="w-4 h-4 text-orange-500 dark:text-slate-400" />
            <span>{company.industry} • {company.size}</span>
          </motion.div>
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {t.companyDashboard.hello} <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">{company.companyNameThai}</span> 🏢
          </motion.h1>
        </div>

        <motion.div className="flex gap-3" variants={itemVariants}>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="rounded-xl border-orange-200 text-orange-600 hover:bg-orange-50 dark:border-orange-900 dark:text-orange-400 dark:hover:bg-orange-950">
                <PlusCircle className="w-4 h-4 mr-2" />
                Submit Requirement
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Submit New Requirement</DialogTitle>
                <DialogDescription>
                  Post a specific request (skills, project, stack) to let our AI match you with the best talents.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">Project/Role</Label>
                  <Input id="title" placeholder="e.g. Frontend Intern" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="skills" className="text-right">Key Skills</Label>
                  <Input id="skills" placeholder="React, Node, etc." className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="desc" className="text-right">Details</Label>
                  <Textarea id="desc" placeholder="Briefly describe what you are looking for..." className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <DialogTrigger asChild>
                  <Button type="button" className="bg-orange-500 hover:bg-orange-600 text-white">Submit to AI Match</Button>
                </DialogTrigger>
              </DialogFooter>
            </DialogContent>
          </Dialog>

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
          <div className="absolute top-0 right-0 w-32 h-32 bg-white dark:bg-slate-900/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900/20 backdrop-blur-sm">
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
          className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-100/50 relative overflow-hidden group cursor-pointer"
        >
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                <Users className="w-6 h-6" />
              </div>
              <span className="font-medium text-slate-600 dark:text-slate-400">{t.companyDashboard.applicantsLabel}</span>
            </div>
            <div className="text-4xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">{totalApplications}</div>
            <div className="mt-3 text-sm text-slate-400">
              {t.companyDashboard.totalApplicants}
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          whileHover={{ y: -5 }}
          onClick={() => navigate('/student-profiles')}
          className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-100/50 relative overflow-hidden group cursor-pointer"
        >
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 group-hover:bg-purple-50 group-hover:text-purple-600 transition-colors">
                <FileText className="w-6 h-6" />
              </div>
              <span className="font-medium text-slate-600 dark:text-slate-400">{t.companyDashboard.accessibleStudents}</span>
            </div>
            <div className="text-4xl font-bold text-slate-900 dark:text-white group-hover:text-purple-600 transition-colors">{accessibleStudents.length}</div>
            <div className="mt-3 text-sm text-slate-400">
              {t.companyDashboard.byConsent}
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          whileHover={{ y: -5 }}
          onClick={() => navigate('/intern-tracking')}
          className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-100/50 relative overflow-hidden group cursor-pointer"
        >
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
                <Building className="w-6 h-6" />
              </div>
              <span className="font-medium text-slate-600 dark:text-slate-400">{t.companyDashboard.interns}</span>
            </div>
            <div className="text-4xl font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors">{company.currentInterns}/{company.internshipSlots}</div>
            <div className="mt-3 text-sm text-slate-400">
              {t.companyDashboard.current}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Threshold Notifications & Alerts Section */}
      <motion.div variants={itemVariants} className="bg-slate-900/5 dark:bg-slate-900/40 rounded-3xl p-6 border border-slate-200/50 dark:border-slate-800/50 backdrop-blur-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <BellRing className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100">Live Recruiting Alerts</h3>
            <Badge variant="secondary" className="bg-rose-100 text-rose-700 hover:bg-rose-100 dark:bg-rose-900/30 dark:text-rose-400">{mockNotifications.filter(n => !n.read).length} New</Badge>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {mockNotifications.map(notification => (
            <div key={notification.id} className={`relative p-4 border rounded-2xl ${notification.read ? 'bg-white/40 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800' : 'bg-white dark:bg-slate-900 border-purple-200 dark:border-purple-800/50 shadow-sm'} ${notification.type === 'threshold' ? 'ring-1 ring-emerald-400/50' : ''}`}>
              {!notification.read && <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-rose-500 animate-pulse" />}
              <div className="flex gap-3 mb-2">
                 {notification.type === 'interest' ? <Target className="w-5 h-5 text-blue-500" /> : notification.type === 'threshold' ? <Trophy className="w-5 h-5 text-emerald-500" /> : <Flame className="w-5 h-5 text-orange-500" />}
                 <span className={`text-xs font-semibold uppercase tracking-wider ${notification.type === 'interest' ? 'text-blue-500' : notification.type === 'threshold' ? 'text-emerald-500' : 'text-orange-500'}`}>{notification.type}</span>
              </div>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300 leading-snug">{notification.message}</p>
              <div className="mt-4 flex justify-between items-center text-xs text-slate-500 dark:text-slate-400">
                <span>{notification.time}</span>
                <button className="font-semibold text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300">{t.common?.viewDetails || 'View Details'}</button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Tabs defaultValue="requirements" className="space-y-4">
          <TabsList className="flex flex-wrap h-auto gap-2 p-1">
            <TabsTrigger value="jobs">{t.companyDashboard.ourJobs}</TabsTrigger>
            <TabsTrigger value="requirements">Requirements & AI Matches</TabsTrigger>
            <TabsTrigger value="students">{t.companyDashboard.accessibleStudentsTab}</TabsTrigger>
            <TabsTrigger value="followed">Followed Talents</TabsTrigger>
          </TabsList>

          <TabsContent value="jobs">
            <Card className="bg-white/6 dark:bg-slate-900/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/60 dark:border-slate-800/60 rounded-3xl shadow-sm">
              <CardHeader>
                <CardTitle>{t.companyDashboard.ourJobs}</CardTitle>
                <CardDescription>{companyJobPostings.length} {t.companyDashboard.positions}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {companyJobPostings.map(job => (
                  <div key={job.id} className="border border-slate-200 dark:border-slate-800 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-lg">{job.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{job.type === 'internship' ? t.companyDashboard.internship : t.companyDashboard.fullTime} • {job.location}</p>
                      </div>
                      <Badge variant={job.status === 'open' ? 'default' : 'secondary'}>{job.status === 'open' ? t.companyDashboard.open : t.companyDashboard.closed}</Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mb-3">
                      <div><div className="text-xs text-gray-600 dark:text-gray-400">{t.common.position}</div><div className="font-semibold">{job.positions} {t.companyDashboard.positionsCount}</div></div>
                      <div><div className="text-xs text-gray-600 dark:text-gray-400">{t.companyDashboard.applicantsLabel}</div><div className="font-semibold">{job.applicants.length} {t.common.person}</div></div>
                      <div><div className="text-xs text-gray-600 dark:text-gray-400">{t.companyDashboard.closeDate}</div><div className="font-semibold">{new Date(job.deadline).toLocaleDateString(language === 'th' ? 'th-TH' : 'en-US', { month: 'short', day: 'numeric' })}</div></div>
                    </div>
                    <Button size="sm" variant="outline" className="w-full" onClick={() => navigate('/applicants')}>{t.companyDashboard.viewApplicants}</Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="students">
            <Card className="bg-white/6 dark:bg-slate-900/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/60 dark:border-slate-800/60 rounded-3xl shadow-sm">
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
                        <div className="text-sm text-gray-600 dark:text-gray-400">{t.companyDashboard.year} {student.year} • GPA {student.gpa.toFixed(2)}</div>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" onClick={() => navigate('/student-profiles')}>{t.companyDashboard.viewProfile}</Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="requirements">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="space-y-4 lg:col-span-1">
                <Card className="bg-white/6 dark:bg-slate-900/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/60 dark:border-slate-800/60 rounded-3xl shadow-sm h-full">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>Active Requirements</CardTitle>
                      <Badge variant="outline" className="bg-orange-50 text-orange-600 border-none px-2 dark:text-slate-300">{mockRequirements.length} Total</Badge>
                    </div>
                    <CardDescription>Your posted criteria for talent matching.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {mockRequirements.map(req => (
                      <div key={req.id} className="p-4 border rounded-xl hover:bg-slate-50 dark:bg-slate-900 transition-colors cursor-pointer group dark:hover:bg-slate-800">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-slate-800 dark:text-slate-100 group-hover:text-orange-600 transition-colors">{req.title}</h4>
                          <Badge className="bg-green-100 text-green-700 hover:bg-green-200">{req.status}</Badge>
                        </div>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {req.skills.map(s => <Badge key={s} variant="secondary" className="px-1.5 py-0 text-xs">{s}</Badge>)}
                        </div>
                        <div className="flex justify-between text-sm text-slate-500 dark:text-slate-400">
                          <span className="flex items-center gap-1"><BrainCircuit className="w-3.5 h-3.5" /> {req.matchCount} Matches</span>
                          <span>{req.type}</span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              <div className="lg:col-span-2">
                <Card className="bg-white/6 dark:bg-slate-900/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/60 dark:border-slate-800/60 rounded-3xl shadow-sm h-full">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-orange-500 dark:text-slate-400" />
                      <CardTitle>AI Talent Matching</CardTitle>
                    </div>
                    <CardDescription>Best matching students based on your active requirements.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {mockAiMatchedStudents.map(student => (
                      <div key={student.id} className="flex flex-col sm:flex-row gap-4 p-4 border rounded-xl items-center sm:items-start bg-gradient-to-r from-transparent to-orange-50/30 dark:to-orange-950/20">
                        <div className="relative">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center shadow-lg">
                            <span className="text-xl font-bold text-white">{student.nameThai.charAt(0)}</span>
                          </div>
                          <div className="absolute -bottom-2 -right-2 bg-white dark:bg-slate-900 rounded-full p-1 shadow">
                            <Badge className="bg-orange-500 hover:bg-orange-600 border-none text-xs">{student.matchScore}%</Badge>
                          </div>
                        </div>
                        <div className="flex-1 text-center sm:text-left">
                          <div className="flex flex-col sm:flex-row items-center sm:justify-start gap-2 mb-1">
                            <h4 className="font-semibold text-lg text-slate-800 dark:text-white">{student.nameThai}</h4>
                            {student.exclusiveAccess && <Badge variant="outline" className="bg-amber-100/50 text-amber-700 border-amber-300 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-700 text-[10px] shadow-sm py-0"><Flame className="w-3 h-3 mr-1 text-orange-500" /> Exclusive Access</Badge>}
                          </div>
                          <p className="text-sm border-b pb-2 mb-2 text-slate-500 dark:text-slate-400">Year {student.year} • GPA {student.gpa.toFixed(2)} • {student.faculty}</p>
                          <div className="flex items-center justify-center sm:justify-start gap-2 text-sm text-green-600 dark:text-green-500 mt-2 font-medium">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Matched skills: {student.matchedSkills.join(', ')}</span>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                          {student.exclusiveAccess ? (
                             <Button size="sm" className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg shadow-amber-500/30 group border-0">
                               <Send className="w-3.5 h-3.5 mr-1.5 group-hover:scale-110 transition-transform" /> Fast-track Offer
                             </Button>
                          ) : (
                             <Button size="sm" className="bg-slate-900 dark:bg-slate-800 group hover:bg-slate-800 dark:hover:bg-slate-700">
                               <Bookmark className="w-3.5 h-3.5 mr-1.5 group-hover:fill-current" /> Follow
                             </Button>
                          )}
                          <Button size="sm" variant="outline" className="dark:border-slate-700 dark:text-slate-300" onClick={() => navigate('/student-profiles')}>
                            View Profile
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="followed">
            <Card className="bg-white/6 dark:bg-slate-900/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/60 dark:border-slate-800/60 rounded-3xl shadow-sm">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Bookmark className="w-5 h-5 text-blue-500 fill-blue-500/20 dark:text-slate-400" />
                  <CardTitle>Followed Talents</CardTitle>
                </div>
                <CardDescription>Track the long-term progress of promising students.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mockFollowedStudents.map(student => (
                    <div key={student.id} className="border border-slate-200 dark:border-slate-800 rounded-xl p-5 hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                          <span className="text-lg font-bold text-slate-700 dark:text-slate-300">{student.nameThai.charAt(0)}</span>
                        </div>
                        <div>
                          <div className="font-semibold">{student.nameThai}</div>
                          <div className="text-sm text-slate-500 dark:text-slate-400">Year {student.year}</div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center text-sm border-t pt-3 mt-3 border-slate-100 dark:border-slate-800">
                        <span className="text-slate-400">Followed</span>
                        <span className="font-medium text-slate-700 dark:text-slate-300">{student.followDate}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm mt-2">
                        <span className="text-slate-400">Current GPA</span>
                        <div className="flex items-center gap-1 font-medium text-emerald-600 dark:text-slate-300">
                          <TrendingUp className="w-3.5 h-3.5" />
                          {student.gpa.toFixed(2)}
                        </div>
                      </div>
                      <Button className="w-full mt-4" variant="secondary" size="sm" onClick={() => navigate('/student-profiles')}>Profile Overview</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

        </Tabs>
      </motion.div>
    </motion.div>
  );
}
