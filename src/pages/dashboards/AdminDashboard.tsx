import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Users, BookOpen, Building, Activity, Settings, Database, Bell } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { StatsCard } from '@/components/common/StatsCard';
import { mockAdmin, mockStudents, mockCourses, mockLecturers, mockCompanies } from '@/lib/mockData';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function AdminDashboard() {
  const { t, language } = useLanguage();
  const admin = mockAdmin;

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6 p-6">
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t.adminDashboard.title}</h1>
          <p className="text-gray-600 mt-1">{t.adminDashboard.subtitle}</p>
        </div>
        <Button><Settings className="w-4 h-4 mr-2" />{t.adminDashboard.systemSettings}</Button>
      </motion.div>

      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title={t.adminDashboard.totalUsers} value={(mockStudents.length + mockLecturers.length + 1 + mockCompanies.length).toString()} icon={<Users className="w-5 h-5" />} description={t.adminDashboard.totalUsersDesc} />
        <StatsCard title={t.adminDashboard.courses} value={mockCourses.length.toString()} icon={<BookOpen className="w-5 h-5" />} description={t.adminDashboard.coursesDesc} />
        <StatsCard title={t.adminDashboard.companies} value={mockCompanies.length.toString()} icon={<Building className="w-5 h-5" />} description={t.adminDashboard.companiesDesc} />
        <StatsCard title={t.adminDashboard.system} value={t.adminDashboard.systemNormal} icon={<Activity className="w-5 h-5" />} description={t.adminDashboard.systemWorking} />
      </motion.div>

      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader><CardTitle>{t.adminDashboard.manageUsers}</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-start"><Users className="w-4 h-4 mr-2" />{t.adminDashboard.manageStudents} ({mockStudents.length})</Button>
            <Button variant="outline" className="w-full justify-start"><Users className="w-4 h-4 mr-2" />{t.adminDashboard.manageLecturers} ({mockLecturers.length})</Button>
            <Button variant="outline" className="w-full justify-start"><Building className="w-4 h-4 mr-2" />{t.adminDashboard.manageCompanies} ({mockCompanies.length})</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>{t.adminDashboard.systemAndSettings}</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-start"><Settings className="w-4 h-4 mr-2" />{t.adminDashboard.generalSettings}</Button>
            <Button variant="outline" className="w-full justify-start"><Bell className="w-4 h-4 mr-2" />{t.adminDashboard.autoNotifications}</Button>
            <Button variant="outline" className="w-full justify-start"><Database className="w-4 h-4 mr-2" />{t.adminDashboard.backup}</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>{t.adminDashboard.systemStatus}</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between"><span className="text-sm">Database</span><Badge variant="default">Online</Badge></div>
            <div className="flex items-center justify-between"><span className="text-sm">API Server</span><Badge variant="default">Running</Badge></div>
            <div className="flex items-center justify-between"><span className="text-sm">Backup</span><Badge variant="default">OK</Badge></div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
