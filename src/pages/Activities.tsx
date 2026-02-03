import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Trophy, Calendar, Users, CheckCircle, Clock, MapPin,
  Star, Award, Sparkles, Zap, Target, ArrowRight, Hourglass,
  ArrowUpRight, Flame
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { ThemedPageHeader } from '@/components/common/ThemedPageHeader';
import { mockActivities, mockStudent } from '@/lib/mockData';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Activities() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = React.useState('upcoming');

  const upcomingActivities = mockActivities.filter(a => a.status === 'upcoming');
  const studentPoints = mockStudent.gamificationPoints;
  const studentHours = mockStudent.totalActivityHours;

  // Fake leaderboard data
  const leaderboard = [
    { rank: 1, name: 'Gunna T.', points: 1250, badge: '🏆' },
    { rank: 2, name: 'Sarah W.', points: 1180, badge: '🥈' },
    { rank: 3, name: 'Mike R.', points: 1050, badge: '🥉' },
    { rank: 4, name: 'Jenny K.', points: 980, badge: '' },
    { rank: 5, name: 'Tom H.', points: 920, badge: '' },
  ];

  if (user?.role !== 'student') {
    return (
      <div className="p-8 text-center text-slate-500">
        Student view only
      </div>
    );
  }

  const StatCard = ({ icon: Icon, label, value, subtext, gradient, delay, onClick }: any) => (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`relative overflow-hidden rounded-3xl p-6 cursor-pointer group shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/20 ${gradient}`}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-white/20 transition-colors" />
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div className="p-3 rounded-2xl bg-white/20 backdrop-blur-md shadow-sm border border-white/10">
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <ArrowUpRight className="w-4 h-4 text-white" />
          </div>
        </div>
        <div>
          <p className="text-white/80 text-sm font-medium mb-1">{label}</p>
          <h3 className="text-3xl font-bold text-white tracking-tight">{value}</h3>
          {subtext && <div className="mt-2">{subtext}</div>}
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
      <ThemedPageHeader
        title="กิจกรรมและแต้มสะสม"
        subtitle="เข้าร่วมกิจกรรม สะสมแต้ม และแลกรับของรางวัลพิเศษ"
        icon={<Trophy className="w-7 h-7" />}
      />

      {/* Bento Grid Stats - Matching Dashboard Theme */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Trophy}
          label="แต้มสะสมทั้งหมด"
          value={studentPoints}
          gradient="bg-gradient-to-br from-amber-400 via-orange-500 to-red-500"
          subtext={
            <div className="flex items-center gap-1.5 text-xs text-orange-100 bg-orange-500/30 w-fit px-2 py-1 rounded-lg backdrop-blur-sm">
              <Flame className="w-3 h-3 fill-orange-100" />
              <span>Level 12 Explorer</span>
            </div>
          }
        />
        <StatCard
          icon={Clock}
          label="ชั่วโมงกิจกรรม"
          value={`${studentHours} ชม.`}
          gradient="bg-gradient-to-br from-emerald-400 via-emerald-500 to-teal-600"
          subtext={
            <div className="h-1.5 w-full bg-black/20 rounded-full mt-2 overflow-hidden">
              <div
                className="h-full bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                style={{ width: `${Math.min((studentHours / 100) * 100, 100)}%` }}
              />
            </div>
          }
        />
        <StatCard
          icon={Star}
          label="Badges ที่ได้รับ"
          value="8"
          gradient="bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600"
          subtext={<span className="text-blue-100 text-xs">เหลืออีก 2 เพื่อปลดล็อคเลเวลถัดไป</span>}
        />
        <StatCard
          icon={Target}
          label="เป้าหมายเทอมนี้"
          value="4/5"
          gradient="bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500"
          subtext={<span className="text-purple-100 text-xs text-right block">80% สำเร็จ</span>}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Activity Feed */}
        <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="upcoming" onValueChange={setActiveTab} className="w-full space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">รายการกิจกรรม</h2>
              <TabsList className="bg-white/40 backdrop-blur-xl border border-white/40 p-1.5 h-auto rounded-2xl shadow-sm">
                <TabsTrigger
                  value="upcoming"
                  className="rounded-xl px-6 py-2.5 data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-lg shadow-blue-500/10 transition-all duration-300 font-medium text-slate-600"
                >
                  กำลังจะมาถึง
                </TabsTrigger>
                <TabsTrigger
                  value="history"
                  className="rounded-xl px-6 py-2.5 data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-lg shadow-blue-500/10 transition-all duration-300 font-medium text-slate-600"
                >
                  ประวัติกิจกรรม
                </TabsTrigger>
              </TabsList>
            </div>

            <AnimatePresence mode="wait">
              {activeTab === 'upcoming' && (
                <TabsContent value="upcoming" className="space-y-4 mt-0" key="upcoming" forceMount>
                  {upcomingActivities.map((activity, index) => (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: index * 0.1 }}
                      className="group bg-white/60 backdrop-blur-xl border border-white/60 rounded-[2rem] p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden"
                    >
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="relative shrink-0 w-full md:w-52 h-36 md:h-auto rounded-2xl overflow-hidden shadow-md">
                          <img
                            src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=400&h=300"
                            alt="Activity cover"
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2.5 py-1 rounded-xl text-xs font-bold text-indigo-600 shadow-sm border border-white/50">
                            {activity.gamificationPoints} XP
                          </div>
                        </div>
                        <div className="flex-1 flex flex-col justify-between py-1">
                          <div>
                            <div className="flex gap-2 mb-3">
                              <Badge variant="secondary" className="bg-indigo-50 text-indigo-600 hover:bg-indigo-100 border-0 rounded-lg px-2.5">{activity.type}</Badge>
                              {index === 0 && <Badge className="bg-orange-500 hover:bg-orange-600 border-0 rounded-lg px-2.5 shadow-lg shadow-orange-500/20">HOT กิจกรรมแนะนำ</Badge>}
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors mb-2 tracking-tight">{activity.title}</h3>
                            <div className="flex flex-wrap gap-4 text-sm text-slate-500 font-medium">
                              <div className="flex items-center gap-1.5">
                                <Calendar className="w-4 h-4 text-slate-400" />
                                {new Date(activity.startDate).toLocaleDateString('th-TH', { day: 'numeric', month: 'long', year: 'numeric' })}
                              </div>
                              <div className="flex items-center gap-1.5">
                                <MapPin className="w-4 h-4 text-slate-400" />
                                {activity.location}
                              </div>
                              <div className="flex items-center gap-1.5">
                                <Users className="w-4 h-4 text-slate-400" />
                                {activity.enrolledStudents.length}/{activity.maxParticipants || '-'} คน
                              </div>
                            </div>
                          </div>
                          <div className="mt-6 flex gap-3">
                            <Button className="rounded-xl h-11 bg-slate-900 hover:bg-slate-800 text-white shadow-xl shadow-slate-900/20 px-8 font-bold border border-slate-700">
                              ลงทะเบียนเข้าร่วม
                            </Button>
                            <Button variant="ghost" className="rounded-xl h-11 border border-slate-200 hover:bg-slate-100 font-medium px-6">
                              รายละเอียด
                            </Button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </TabsContent>
              )}

              {activeTab === 'history' && (
                <TabsContent value="history" className="mt-0" key="history" forceMount>
                  <div className="bg-white/40 backdrop-blur-xl rounded-[2rem] p-12 text-center text-slate-400 border border-dashed border-slate-300">
                    <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-200">
                      <Hourglass className="w-10 h-10 opacity-30" />
                    </div>
                    <p className="text-lg font-medium">ยังไม่มีประวัติกิจกรรมสะสม</p>
                    <p className="text-sm">เข้าร่วมกิจกรรมวันนี้เพื่อเริ่มสะสมแต้ม!</p>
                  </div>
                </TabsContent>
              )}
            </AnimatePresence>
          </Tabs>
        </motion.div>

        {/* Right Column: Gamification & Leaderboard */}
        <motion.div variants={itemVariants} className="space-y-6">
          <div className="bg-white/60 backdrop-blur-xl rounded-[2rem] border border-white/60 shadow-sm p-6">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-500" />
                อันดับผู้นำ (Leaderboard)
              </h3>
              <Badge variant="outline" className="rounded-full border-slate-200 text-slate-400 text-[10px] uppercase tracking-wider">เทอมนี้</Badge>
            </div>
            <div className="space-y-4">
              {leaderboard.map((user, idx) => (
                <div key={idx} className={`flex items-center gap-4 p-3.5 rounded-2xl transition-all duration-300 ${user.rank === 1 ? 'bg-amber-400/10 border border-amber-200/50 shadow-inner' : 'hover:bg-white/50'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${user.rank === 1 ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/30 ring-2 ring-white/50' :
                    user.rank === 2 ? 'bg-slate-300 text-slate-600' :
                      user.rank === 3 ? 'bg-orange-200 text-orange-700' :
                        'bg-slate-100 text-slate-400'
                    }`}>
                    {user.rank}
                  </div>
                  <Avatar className="w-11 h-11 border-2 border-white shadow-md">
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} />
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="font-bold text-slate-800 flex items-center gap-1.5">
                      {user.name} <span className="text-lg">{user.badge}</span>
                    </div>
                    <div className="text-xs text-slate-500 font-medium">{user.points} XP</div>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-8 rounded-xl border-dashed border-slate-300 text-slate-500 hover:text-indigo-600 hover:border-indigo-300 h-11 font-medium">ดูอันดับทั้งหมด</Button>
          </div>

          <div className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-slate-900 to-black rounded-[2rem] shadow-2xl p-7 text-white">
            <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/20 rounded-full blur-[60px]" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-[50px]" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-300" />
                  Badges สะสม
                </h3>
                <div className="text-[10px] text-slate-400 font-bold tracking-widest uppercase">8 Unlocked</div>
              </div>

              <div className="grid grid-cols-4 gap-3">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div key={i} className="aspect-square rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-white/15 transition-all cursor-pointer group shadow-sm">
                    {i <= 3 ? (
                      <div className="text-2xl group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
                        {i === 1 ? '🚀' : i === 2 ? '🎯' : '💎'}
                      </div>
                    ) : (
                      <div className="w-2.5 h-2.5 rounded-full bg-white/20 group-hover:bg-white/40 transition-colors" />
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <div className="flex justify-between items-end mb-2">
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Badge ถัดไป</p>
                    <p className="text-sm font-bold text-purple-200">Activity Master</p>
                  </div>
                  <div className="text-xs font-bold text-white">60%</div>
                </div>
                <Progress value={60} className="h-2 bg-white/10" indicatorClassName="bg-gradient-to-r from-purple-400 to-indigo-400" />
                <p className="text-[10px] text-slate-500 mt-2 text-center font-medium">เข้าร่วมกิจกรรมให้ครบ 10 ครั้งเพื่อปลดล็อค</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
