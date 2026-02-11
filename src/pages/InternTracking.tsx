import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Users, ClipboardList, CheckSquare, Briefcase, Clock, MapPin, Star,
  ArrowLeft, FileText, TrendingUp, Target, Eye
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const internsData = [
  {
    id: '1',
    name: 'นายณัฐพงษ์ ใจดี', nameEn: 'Nattapong Jaidee',
    position: 'Backend Developer',
    company: 'Tech Innovation Co.', companyEn: 'Tech Innovation Co.',
    progress: 60, weeks: 8, totalWeeks: 12, rating: 4.5, avatar: 'ณ',
    performance: {
      technical: 85, communication: 78, teamwork: 90, punctuality: 95, initiative: 72,
      weeklyReports: [
        { week: 1, submitted: true, score: 80, summary: 'ทำความเข้าใจ codebase', summaryEn: 'Understanding the codebase' },
        { week: 2, submitted: true, score: 85, summary: 'สร้าง REST API 3 endpoints', summaryEn: 'Built 3 REST API endpoints' },
        { week: 3, submitted: true, score: 88, summary: 'เขียน Unit Tests', summaryEn: 'Wrote Unit Tests' },
        { week: 4, submitted: true, score: 82, summary: 'ปรับปรุง Database Schema', summaryEn: 'Improved Database Schema' },
        { week: 5, submitted: true, score: 90, summary: 'Integrate third-party API', summaryEn: 'Integrated third-party API' },
        { week: 6, submitted: true, score: 87, summary: 'Code Review & Refactoring', summaryEn: 'Code Review & Refactoring' },
        { week: 7, submitted: true, score: 92, summary: 'Deploy to staging', summaryEn: 'Deployed to staging' },
        { week: 8, submitted: false, score: 0, summary: 'รอส่ง', summaryEn: 'Pending' },
      ]
    }
  },
  {
    id: '2',
    name: 'นางสาววิไลลักษณ์ สวยงาม', nameEn: 'Wilailak Suayngam',
    position: 'UX/UI Designer',
    company: 'Design Studio', companyEn: 'Design Studio',
    progress: 45, weeks: 6, totalWeeks: 12, rating: 4.2, avatar: 'ว',
    performance: {
      technical: 80, communication: 92, teamwork: 88, punctuality: 85, initiative: 90,
      weeklyReports: [
        { week: 1, submitted: true, score: 78, summary: 'ศึกษา Design System', summaryEn: 'Studied Design System' },
        { week: 2, submitted: true, score: 82, summary: 'สร้าง Wireframe', summaryEn: 'Created Wireframes' },
        { week: 3, submitted: true, score: 85, summary: 'User Research & Interview', summaryEn: 'User Research & Interviews' },
        { week: 4, submitted: true, score: 88, summary: 'Hi-Fi Prototype', summaryEn: 'Created Hi-Fi Prototype' },
        { week: 5, submitted: true, score: 90, summary: 'Usability Testing', summaryEn: 'Conducted Usability Testing' },
        { week: 6, submitted: false, score: 0, summary: 'รอส่ง', summaryEn: 'Pending' },
      ]
    }
  },
  {
    id: '3',
    name: 'นายสมชาย ดีมาก', nameEn: 'Somchai Deemak',
    position: 'Data Analyst',
    company: 'DataSoft Co.', companyEn: 'DataSoft Co.',
    progress: 80, weeks: 10, totalWeeks: 12, rating: 4.8, avatar: 'ส',
    performance: {
      technical: 95, communication: 82, teamwork: 85, punctuality: 92, initiative: 88,
      weeklyReports: [
        { week: 1, submitted: true, score: 85, summary: 'Data Cleaning Pipeline', summaryEn: 'Built Data Cleaning Pipeline' },
        { week: 2, submitted: true, score: 88, summary: 'EDA & Visualization', summaryEn: 'EDA & Visualization' },
        { week: 3, submitted: true, score: 90, summary: 'ML Model v1', summaryEn: 'Built ML Model v1' },
        { week: 4, submitted: true, score: 92, summary: 'Feature Engineering', summaryEn: 'Feature Engineering' },
        { week: 5, submitted: true, score: 88, summary: 'Model Optimization', summaryEn: 'Model Optimization' },
        { week: 6, submitted: true, score: 95, summary: 'Dashboard สำหรับ Stakeholder', summaryEn: 'Built Stakeholder Dashboard' },
        { week: 7, submitted: true, score: 90, summary: 'A/B Testing Framework', summaryEn: 'A/B Testing Framework' },
        { week: 8, submitted: true, score: 93, summary: 'Automated Reports', summaryEn: 'Created Automated Reports' },
        { week: 9, submitted: true, score: 91, summary: 'Knowledge Transfer', summaryEn: 'Knowledge Transfer' },
        { week: 10, submitted: false, score: 0, summary: 'รอส่ง', summaryEn: 'Pending' },
      ]
    }
  },
];

export default function InternTracking() {
  const { t, language } = useLanguage();
  const tr = t.internTracking;
  const [selectedIntern, setSelectedIntern] = useState<typeof internsData[0] | null>(null);

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-emerald-600';
    if (score >= 75) return 'text-blue-600';
    if (score >= 60) return 'text-amber-600';
    return 'text-red-600';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 90) return tr.excellent;
    if (score >= 75) return tr.good;
    if (score >= 60) return tr.fair;
    return tr.needsImprovement;
  };

  const getScoreBg = (score: number) => {
    if (score >= 90) return 'bg-emerald-50 border-emerald-100';
    if (score >= 75) return 'bg-blue-50 border-blue-100';
    if (score >= 60) return 'bg-amber-50 border-amber-100';
    return 'bg-red-50 border-red-100';
  };

  // Performance detail view
  if (selectedIntern) {
    const perf = selectedIntern.performance;
    const submittedReports = perf.weeklyReports.filter(r => r.submitted);
    const avgScore = Math.round(submittedReports.reduce((s, r) => s + r.score, 0) / submittedReports.length);

    return (
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6 pb-10">
        <motion.div variants={itemVariants}>
          <Button variant="ghost" size="sm" onClick={() => setSelectedIntern(null)} className="gap-2">
            <ArrowLeft className="w-4 h-4" /> {tr.backToList}
          </Button>
        </motion.div>

        <motion.div variants={itemVariants} className="p-6 rounded-3xl bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:20px_20px]" />
          <div className="relative z-10 flex items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-3xl font-bold border border-white/20">
              {selectedIntern.avatar}
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold">{language === 'th' ? selectedIntern.name : selectedIntern.nameEn}</h1>
              <p className="text-white/80">{selectedIntern.position}</p>
              <div className="flex items-center gap-2 mt-1 text-white/70">
                <MapPin className="w-4 h-4" />
                <span>{language === 'th' ? selectedIntern.company : selectedIntern.companyEn}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-white/70">{tr.overallScore}</div>
              <div className="text-4xl font-bold">{avgScore}</div>
              <Badge className="bg-white/20 text-white border-white/20 mt-1">{getScoreLabel(avgScore)}</Badge>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { label: tr.technicalSkills, value: perf.technical, icon: Target },
            { label: tr.communication, value: perf.communication, icon: Users },
            { label: tr.teamwork, value: perf.teamwork, icon: Users },
            { label: tr.punctuality, value: perf.punctuality, icon: Clock },
            { label: tr.initiative, value: perf.initiative, icon: TrendingUp },
          ].map((metric, i) => (
            <Card key={i} className={`border ${getScoreBg(metric.value)}`}>
              <CardContent className="p-4 text-center">
                <metric.icon className={`w-5 h-5 mx-auto mb-2 ${getScoreColor(metric.value)}`} />
                <div className={`text-2xl font-bold ${getScoreColor(metric.value)}`}>{metric.value}%</div>
                <div className="text-xs text-slate-500 mt-1">{metric.label}</div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-orange-500" /> {tr.weeklyReport}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {perf.weeklyReports.map((report) => (
                <div key={report.week} className={`flex items-center gap-4 p-4 rounded-xl border transition-colors ${report.submitted ? 'bg-white border-slate-100' : 'bg-slate-50 border-slate-100 opacity-60'}`}>
                  <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center font-bold text-orange-600">
                    W{report.week}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm">{tr.weekLabel} {report.week}</div>
                    <div className="text-xs text-slate-500 truncate">
                      {language === 'th' ? report.summary : report.summaryEn}
                    </div>
                  </div>
                  <div className="text-right">
                    {report.submitted ? (
                      <>
                        <div className={`text-lg font-bold ${getScoreColor(report.score)}`}>{report.score}</div>
                        <Badge variant="outline" className="text-emerald-600 border-emerald-200 text-xs">{tr.submitted}</Badge>
                      </>
                    ) : (
                      <Badge variant="outline" className="text-slate-400 border-slate-200 text-xs">{tr.pending}</Badge>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    );
  }

  // List view
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8 pb-10">
      <div>
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2 text-slate-500 font-medium mb-2">
          <Briefcase className="w-4 h-4 text-orange-500" />
          <span>{tr.subtitle}</span>
        </motion.div>
        <motion.h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          {tr.title}<span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">{tr.titleHighlight}</span>
        </motion.h1>
      </div>

      <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Users, label: tr.totalInterns, value: '3', gradient: 'from-orange-500 to-amber-500', shadow: 'shadow-orange-200' },
          { icon: Briefcase, label: tr.companies, value: '3', gradient: 'from-blue-500 to-indigo-500', shadow: 'shadow-blue-200' },
          { icon: Clock, label: tr.avgDuration, value: `12 ${tr.weeks}`, gradient: 'from-purple-500 to-violet-500', shadow: 'shadow-purple-200' },
          { icon: Star, label: tr.avgRating, value: '4.5', gradient: 'from-emerald-500 to-teal-500', shadow: 'shadow-emerald-200' },
        ].map((stat, i) => (
          <motion.div key={i} whileHover={{ scale: 1.02 }} className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${stat.gradient} p-5 text-white shadow-xl ${stat.shadow}`}>
            <div className="absolute -top-10 -right-10 w-28 h-28 bg-white/10 rounded-full blur-2xl" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 rounded-xl bg-white/20 backdrop-blur-sm"><stat.icon className="w-4 h-4" /></div>
                <span className="text-sm font-medium text-white/90">{stat.label}</span>
              </div>
              <div className="text-3xl font-bold">{stat.value}</div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {internsData.map((intern, idx) => (
          <motion.div key={idx} variants={itemVariants} whileHover={{ y: -4 }}
            className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-3xl p-6 shadow-sm hover:shadow-lg transition-all">
            <div className="flex items-start gap-4 mb-5">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-orange-200">
                {intern.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-lg text-slate-800">{language === 'th' ? intern.name : intern.nameEn}</h3>
                <p className="text-sm text-slate-500">{intern.position}</p>
                <div className="flex items-center gap-1 mt-1 text-xs text-slate-400">
                  <MapPin className="w-3 h-3" /> {language === 'th' ? intern.company : intern.companyEn}
                </div>
              </div>
            </div>

            <div className="mb-5">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-500">{tr.progressLabel}</span>
                <span className="font-bold text-slate-800">{tr.weekLabel} {intern.weeks}/{intern.totalWeeks}</span>
              </div>
              <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: `${intern.progress}%` }} transition={{ delay: 0.5 + idx * 0.1, duration: 0.6 }}
                  className="h-full bg-gradient-to-r from-orange-400 to-amber-500 rounded-full" />
              </div>
            </div>

            <div className="flex items-center justify-between mb-5 p-3 rounded-xl bg-amber-50 border border-amber-100">
              <span className="text-sm text-amber-700">{tr.rating}</span>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span className="font-bold text-amber-700">{intern.rating}/5.0</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <Button variant="outline" className="w-full rounded-xl text-xs" size="sm">
                <ClipboardList className="w-3.5 h-3.5 mr-1" /> {tr.timesheet}
              </Button>
              <Button className="w-full rounded-xl bg-orange-500 hover:bg-orange-600 text-xs shadow-lg shadow-orange-200" size="sm">
                <CheckSquare className="w-3.5 h-3.5 mr-1" /> {tr.evaluate}
              </Button>
              <Button variant="outline" className="w-full rounded-xl text-xs border-blue-200 text-blue-600 hover:bg-blue-50" size="sm"
                onClick={() => setSelectedIntern(intern)}>
                <Eye className="w-3.5 h-3.5 mr-1" /> {tr.viewPerformance}
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
