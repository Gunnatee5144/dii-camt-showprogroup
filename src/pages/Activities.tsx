import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import { Trophy, Calendar, Users, CheckCircle, Clock, MapPin, Star, Award, Sparkles, Zap, Target, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { ThemedPageHeader } from '@/components/common/ThemedPageHeader';
import { ThemedCard } from '@/components/common/ThemedCard';
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

  const upcomingActivities = mockActivities.filter(a => a.status === 'upcoming');
  const completedActivities = mockActivities.filter(a => a.status === 'completed');
  const studentPoints = mockStudent.activityPoints;
  const studentHours = mockStudent.activityHours;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <ThemedPageHeader
        title="กิจกรรมและแต้มสะสม"
        subtitle="เก็บแต้ม สะสมชั่วโมง รับ Badge"
        icon={<Trophy className="w-7 h-7" />}
      />

      {user?.role === 'student' && (
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Points Card */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 p-6 text-white shadow-xl shadow-orange-200"
          >
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-white/10 rounded-full blur-xl" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 rounded-xl bg-white/20 backdrop-blur-sm">
                  <Trophy className="w-5 h-5" />
                </div>
                <span className="font-semibold">แต้มสะสม</span>
              </div>
              <div className="text-5xl font-bold">{studentPoints}</div>
              <div className="text-white/80 text-sm mt-1">คะแนนทั้งหมด</div>
              <div className="mt-4 h-2 bg-white/20 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(studentPoints / 1000) * 100}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className="h-full bg-white rounded-full"
                />
              </div>
              <div className="text-xs text-white/70 mt-1">เป้าหมาย 1,000 คะแนน</div>
            </div>
          </motion.div>

          {/* Hours Card */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 p-6 text-white shadow-xl shadow-blue-200"
          >
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 rounded-xl bg-white/20 backdrop-blur-sm">
                  <Clock className="w-5 h-5" />
                </div>
                <span className="font-semibold">ชั่วโมงกิจกรรม</span>
              </div>
              <div className="text-5xl font-bold">{studentHours}</div>
              <div className="text-white/80 text-sm mt-1">ชั่วโมง</div>
              <div className="mt-4 h-2 bg-white/20 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(studentHours / 100) * 100}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className="h-full bg-white rounded-full"
                />
              </div>
              <div className="text-xs text-white/70 mt-1">เป้าหมาย 100 ชั่วโมง</div>
            </div>
          </motion.div>

          {/* Badges Card */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-rose-500 p-6 text-white shadow-xl shadow-purple-200"
          >
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 rounded-xl bg-white/20 backdrop-blur-sm">
                  <Award className="w-5 h-5" />
                </div>
                <span className="font-semibold">Badge ที่ได้รับ</span>
              </div>
              <div className="text-5xl font-bold">{mockStudent.badges?.length || 0}</div>
              <div className="text-white/80 text-sm mt-1">เหรียญที่สะสม</div>
              <div className="flex gap-2 mt-4">
                {mockStudent.badges?.slice(0, 4).map((badge, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: idx * 0.1, type: 'spring' }}
                    className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-lg"
                  >
                    {badge.icon || '⭐'}
                  </motion.div>
                ))}
                {(mockStudent.badges?.length || 0) > 4 && (
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-sm font-bold">
                    +{(mockStudent.badges?.length || 0) - 4}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      <motion.div variants={itemVariants}>
        <Tabs defaultValue="upcoming" className="space-y-6">
          <TabsList className="bg-white/80 backdrop-blur-sm border shadow-sm p-1 h-auto">
            <TabsTrigger value="upcoming" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-6 py-2.5">
              <Zap className="w-4 h-4 mr-2" />
              กิจกรรมที่กำลังเปิดรับ
            </TabsTrigger>
            <TabsTrigger value="completed" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-6 py-2.5">
              <CheckCircle className="w-4 h-4 mr-2" />
              กิจกรรมที่เข้าร่วมแล้ว
            </TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-6 py-2.5">
              <Target className="w-4 h-4 mr-2" />
              ประวัติการเข้าร่วม
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {upcomingActivities.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                >
                  <Card className="h-full overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all bg-gradient-to-br from-white to-gray-50">
                    <div className="h-2 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500" />
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <CardTitle className="text-lg">{activity.activityName}</CardTitle>
                          <div className="mt-2">
                            <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                              {activity.category}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <Badge className="bg-gradient-to-r from-orange-500 to-amber-500 text-white border-0 shadow-lg shadow-orange-200/50">
                            <Sparkles className="w-3 h-3 mr-1" />
                            {activity.points} แต้ม
                          </Badge>
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            <Clock className="w-3 h-3 mr-1" />
                            {activity.hours} ชม.
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3 text-sm p-2 rounded-lg bg-gray-50">
                          <Calendar className="w-4 h-4 text-primary" />
                          <span className="text-gray-700">{new Date(activity.date).toLocaleDateString('th-TH', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}</span>
                        </div>

                        {activity.location && (
                          <div className="flex items-center gap-3 text-sm p-2 rounded-lg bg-gray-50">
                            <MapPin className="w-4 h-4 text-rose-500" />
                            <span className="text-gray-700">{activity.location}</span>
                          </div>
                        )}

                        <div className="flex items-center gap-3 text-sm p-2 rounded-lg bg-gray-50">
                          <Users className="w-4 h-4 text-emerald-500" />
                          <span className="text-gray-700">{activity.participants?.length || 0}/{activity.maxParticipants} คน</span>
                          <div className="flex-1">
                            <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
                                style={{ width: `${((activity.participants?.length || 0) / (activity.maxParticipants || 1)) * 100}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {activity.description && (
                        <p className="text-sm text-gray-600 line-clamp-2 bg-gray-50 p-3 rounded-lg">{activity.description}</p>
                      )}

                      <Button className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-lg shadow-orange-200/50 group">
                        ลงทะเบียนเข้าร่วม
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="space-y-4 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {completedActivities.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-br from-emerald-50 to-white">
                    <div className="h-2 bg-gradient-to-r from-emerald-500 to-teal-500" />
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg">{activity.activityName}</CardTitle>
                          <CardDescription className="mt-1">{activity.category}</CardDescription>
                        </div>
                        <Badge className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-0">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          เสร็จสิ้น
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-white rounded-xl border">
                        <span className="text-gray-600 flex items-center gap-2">
                          <Trophy className="w-4 h-4 text-orange-500" />
                          ได้รับแต้ม
                        </span>
                        <span className="font-bold text-orange-600">+{activity.points} แต้ม</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-white rounded-xl border">
                        <span className="text-gray-600 flex items-center gap-2">
                          <Clock className="w-4 h-4 text-blue-500" />
                          ชั่วโมง
                        </span>
                        <span className="font-bold text-blue-600">+{activity.hours} ชม.</span>
                      </div>
                      <Button variant="outline" className="w-full border-emerald-200 text-emerald-700 hover:bg-emerald-50">
                        <Award className="w-4 h-4 mr-2" />
                        ดูใบประกาศนียบัตร
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="history" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  ประวัติการเข้าร่วมกิจกรรม
                </CardTitle>
                <CardDescription>รายการกิจกรรมทั้งหมดที่เคยเข้าร่วม</CardDescription>
              </CardHeader>
              <CardContent>
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center mb-4">
                  <Target className="w-8 h-8 text-purple-500" />
                </div>
                <p className="text-gray-500">กำลังพัฒนา...</p>
              </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  );
}
