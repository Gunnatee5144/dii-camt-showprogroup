import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import {
  Briefcase, Award, Code, Download, Share2, Edit, Plus,
  Github, Linkedin, Globe, Mail, Phone, MapPin, Calendar,
  Trophy, GraduationCap, Target, Zap, ArrowUpRight, Layers
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  mockStudent,
  getProjectsByStudentId,
  getCertificatesByStudentId,
  getAchievementsByStudentId
} from '@/lib/mockData';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Portfolio() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = React.useState('projects');

  const projects = getProjectsByStudentId(mockStudent.id);
  const achievements = getAchievementsByStudentId(mockStudent.id);

  // Mock skills
  const skills = [
    { name: 'React', level: 85, icon: <Code className="w-4 h-4" /> },
    { name: 'TypeScript', level: 80, icon: <Code className="w-4 h-4" /> },
    { name: 'UI/UX Design', level: 75, icon: <Layers className="w-4 h-4" /> },
    { name: 'Python', level: 60, icon: <Code className="w-4 h-4" /> },
    { name: 'Data Analysis', level: 65, icon: <Zap className="w-4 h-4" /> },
  ];

  if (user?.role !== 'student') {
    return (
      <div className="p-8 text-center text-slate-500">
        Student view only
      </div>
    );
  }

  const StatCard = ({ icon: Icon, label, value, gradient, delay }: any) => (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -5, scale: 1.02 }}
      className={`relative overflow-hidden rounded-3xl p-6 shadow-lg border border-white/20 ${gradient}`}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div className="p-3 rounded-2xl bg-white/20 backdrop-blur-md shadow-sm border border-white/10">
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
            <ArrowUpRight className="w-4 h-4 text-white" />
          </div>
        </div>
        <div>
          <p className="text-white/80 text-sm font-medium mb-1">{label}</p>
          <h3 className="text-3xl font-bold text-white tracking-tight">{value}</h3>
        </div>
      </div>
    </motion.div>
  );

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8 pb-10"
    >
      {/* Header Section - Matching Dashboard/Courses/Schedule Style */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-slate-500 font-medium mb-2"
          >
            <Briefcase className="w-4 h-4 text-indigo-500" />
            <span>{t.portfolioPage.subtitle}</span>
          </motion.div>
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Portfolio<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600"> & CV</span>
          </motion.h1>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-xl border-slate-200">
            <Share2 className="w-4 h-4 mr-2" /> {t.portfolioPage.shareProfile}
          </Button>
          <Button className="rounded-xl bg-slate-900 text-white hover:bg-slate-800 shadow-lg shadow-slate-900/20">
            <Download className="w-4 h-4 mr-2" /> ดาวน์โหลด CV
          </Button>
        </div>
      </div>

      {/* Dashboard-style Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Code}
          label={t.portfolioPage.totalProjects}
          value={projects.length}
          gradient="bg-gradient-to-br from-indigo-500 via-indigo-600 to-purple-600"
        />
        <StatCard
          icon={Award}
          label={t.portfolioPage.achievements}
          value={achievements.length}
          gradient="bg-gradient-to-br from-amber-400 via-orange-500 to-red-500"
        />
        <StatCard
          icon={Zap}
          label={t.portfolioPage.skills}
          value={skills.length}
          gradient="bg-gradient-to-br from-emerald-400 via-emerald-500 to-teal-600"
        />
        <StatCard
          icon={Target}
          label={t.portfolioPage.completeness}
          value="95%"
          gradient="bg-gradient-to-br from-blue-500 via-blue-600 to-cyan-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Tabs defaultValue="projects" className="w-full">
            <TabsList className="bg-white/40 backdrop-blur-xl border border-white/40 p-1.5 h-auto rounded-2xl shadow-sm mb-6 w-full md:w-auto inline-flex">
              <TabsTrigger
                value="projects"
                className="rounded-xl px-6 py-3 data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-lg shadow-blue-500/10 transition-all duration-300 font-medium text-slate-600"
              >
                {t.portfolioPage.works} ({projects.length})
              </TabsTrigger>
              <TabsTrigger
                value="achievements"
                className="rounded-xl px-6 py-3 data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-lg shadow-blue-500/10 transition-all duration-300 font-medium text-slate-600"
              >
                {t.portfolioPage.awards}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="projects" className="space-y-6 mt-0">
              {/* Same project grid but with glassmorphic touch if needed */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="group bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm cursor-pointer hover:shadow-xl transition-all"
                  >
                    <div className="h-48 overflow-hidden relative">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <img
                        src={(project as any).images?.[0] || `https://placehold.co/600x400/indigo/white?text=${project.title}`}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute bottom-4 left-4 right-4 z-20 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                        <Button size="sm" className="w-full bg-white text-slate-900 hover:bg-slate-100">
                          {t.portfolioPage.viewDetails}
                        </Button>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">{project.title}</h3>
                      <p className="text-slate-500 text-sm line-clamp-2 mb-4">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <Badge key={tech} variant="secondary" className="bg-slate-50 text-slate-600 border border-slate-100">
                            {tech}
                          </Badge>
                        ))}
                        {project.technologies.length > 3 && (
                          <Badge variant="secondary" className="bg-slate-50 text-slate-600">
                            +{project.technologies.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02 }}
                  className="border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center p-8 text-slate-400 hover:border-indigo-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all cursor-pointer min-h-[300px]"
                >
                  <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-4 group-hover:bg-white">
                    <Plus className="w-8 h-8" />
                  </div>
                  <span className="font-bold">{t.portfolioPage.addProject}</span>
                </motion.div>
              </div>
            </TabsContent>

            <TabsContent value="achievements" className="mt-0">
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200 shadow-sm flex gap-4 items-center group hover:border-amber-200 transition-all"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center text-amber-600 shrink-0 group-hover:scale-110 transition-transform">
                      <Trophy className="w-8 h-8" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-slate-900 text-lg group-hover:text-amber-600 transition-colors">{achievement.title}</h3>
                      <p className="text-slate-500 text-sm">{achievement.description}</p>
                      <div className="text-xs text-slate-400 mt-2 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(achievement.date).toLocaleDateString('th-TH', { month: 'long', year: 'numeric' })}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-8">
          {/* Profile Card Replaced by Stats but kept for details */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm relative overflow-hidden"
          >
            <div className="h-24 bg-gradient-to-r from-blue-600 to-indigo-600 absolute top-0 left-0 right-0" />
            <div className="relative pt-10 text-center">
              <Avatar className="w-24 h-24 border-4 border-white shadow-xl rounded-2xl mx-auto mb-4">
                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${mockStudent.name}`} />
                <AvatarFallback className="text-2xl bg-indigo-100 text-indigo-600 rounded-3xl">
                  {mockStudent.nameThai.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-bold text-slate-900">{mockStudent.nameThai}</h2>
              <p className="text-slate-500 mb-4">{mockStudent.name}</p>

              <div className="flex flex-wrap gap-2 justify-center mb-6">
                <Badge variant="secondary" className="bg-slate-100">{mockStudent.major}</Badge>
                <Badge variant="secondary" className="bg-slate-100">{t.portfolioPage.year} {mockStudent.year}</Badge>
              </div>

              <div className="flex gap-2 justify-center">
                <Button variant="ghost" size="icon" className="text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl">
                  <Linkedin className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-xl">
                  <Github className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl">
                  <Globe className="w-5 h-5" />
                </Button>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-100 space-y-3">
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <Mail className="w-4 h-4 text-slate-400" />
                {mockStudent.email}
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <Phone className="w-4 h-4 text-slate-400" />
                +66 81 234 5678
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <MapPin className="w-4 h-4 text-slate-400" />
                Chiang Mai, Thailand
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm"
          >
            <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-500" />
              {t.portfolioPage.skills}
            </h3>
            <div className="space-y-5">
              {skills.map((skill, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium text-slate-700 flex items-center gap-2">
                      {skill.icon} {skill.name}
                    </span>
                    <span className="text-slate-500">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ delay: 0.5 + (idx * 0.1), duration: 1 }}
                      className="h-full bg-slate-900 rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
