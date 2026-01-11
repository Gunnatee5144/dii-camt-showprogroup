import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import { User, Bell, Lock, Globe, Palette, LogOut, Settings as SettingsIcon, Shield, Moon, Languages, Clock, Save, AlertTriangle, ChevronRight, Sparkles } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { ThemedPageHeader } from '@/components/common/ThemedPageHeader';
import { ThemedCard } from '@/components/common/ThemedCard';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Settings() {
  const { user, logout } = useAuth();

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <ThemedPageHeader
        title="ตั้งค่า"
        subtitle="จัดการบัญชีและการตั้งค่าของคุณ"
        icon={<SettingsIcon className="w-7 h-7" />}
      />

      <motion.div variants={itemVariants}>
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="bg-white/80 backdrop-blur-sm border shadow-sm p-1 h-auto grid w-full grid-cols-4">
            <TabsTrigger value="profile" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2.5">
              <User className="w-4 h-4 mr-2" />
              โปรไฟล์
            </TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2.5">
              <Bell className="w-4 h-4 mr-2" />
              การแจ้งเตือน
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2.5">
              <Shield className="w-4 h-4 mr-2" />
              ความปลอดภัย
            </TabsTrigger>
            <TabsTrigger value="preferences" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2.5">
              <Palette className="w-4 h-4 mr-2" />
              ความชอบ
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  ข้อมูลโปรไฟล์
                </CardTitle>
                <CardDescription>จัดการข้อมูลส่วนตัวของคุณ</CardDescription>
              </CardHeader>
              <CardContent>
              <div className="space-y-6">
                <div className="flex items-center gap-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-blue-200/50">
                    {user?.nameThai?.charAt(0) || 'U'}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{user?.nameThai || 'ผู้ใช้'}</h3>
                    <p className="text-gray-600">{user?.email}</p>
                    <Button variant="outline" size="sm" className="mt-2">
                      <Sparkles className="w-4 h-4 mr-2" />
                      เปลี่ยนรูปโปรไฟล์
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-700 font-medium">ชื่อ-นามสกุล</Label>
                    <Input id="name" defaultValue={user?.nameThai} className="bg-white border-gray-200 focus:border-blue-400" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-700 font-medium">อีเมล</Label>
                    <Input id="email" type="email" defaultValue={user?.email} className="bg-white border-gray-200 focus:border-blue-400" />
                  </div>
                  {user?.role === 'student' && (
                    <div className="space-y-2">
                      <Label htmlFor="studentId" className="text-gray-700 font-medium">รหัสนักศึกษา</Label>
                      <Input id="studentId" defaultValue={(user as any).studentId} disabled className="bg-gray-50" />
                    </div>
                  )}
                </div>
                
                <Button className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 shadow-lg shadow-blue-200/50">
                  <Save className="w-4 h-4 mr-2" />
                  บันทึกการเปลี่ยนแปลง
                </Button>
              </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  การแจ้งเตือน
                </CardTitle>
                <CardDescription>เลือกประเภทการแจ้งเตือนที่ต้องการรับ</CardDescription>
              </CardHeader>
              <CardContent>
              <div className="space-y-4">
                {[
                  { title: 'การแจ้งเตือนทางอีเมล', desc: 'รับการแจ้งเตือนสำคัญทางอีเมล', default: true, color: 'from-blue-500 to-indigo-500' },
                  { title: 'การแจ้งเตือนเกรด', desc: 'แจ้งเตือนเมื่อมีการประกาศเกรด', default: true, color: 'from-green-500 to-emerald-500' },
                  { title: 'การแจ้งเตือนกิจกรรม', desc: 'แจ้งเตือนเกี่ยวกับกิจกรรมใหม่', default: true, color: 'from-orange-500 to-amber-500' },
                  { title: 'การแจ้งเตือนข้อความ', desc: 'แจ้งเตือนเมื่อมีข้อความใหม่', default: false, color: 'from-purple-500 to-pink-500' },
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white shadow-lg`}>
                        <Bell className="w-5 h-5" />
                      </div>
                      <div>
                        <Label className="font-semibold text-gray-800">{item.title}</Label>
                        <p className="text-sm text-gray-600">{item.desc}</p>
                      </div>
                    </div>
                    <Switch defaultChecked={item.default} />
                  </motion.div>
                ))}
              </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  ความปลอดภัย
                </CardTitle>
                <CardDescription>จัดการรหัสผ่านและความปลอดภัยบัญชี</CardDescription>
              </CardHeader>
              <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password" className="text-gray-700 font-medium flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      รหัสผ่านปัจจุบัน
                    </Label>
                    <Input id="current-password" type="password" className="bg-white border-gray-200" />
                  </div>
                  <div></div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password" className="text-gray-700 font-medium">รหัสผ่านใหม่</Label>
                    <Input id="new-password" type="password" className="bg-white border-gray-200" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password" className="text-gray-700 font-medium">ยืนยันรหัสผ่านใหม่</Label>
                    <Input id="confirm-password" type="password" className="bg-white border-gray-200" />
                  </div>
                </div>
                
                <Button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-lg shadow-green-200/50">
                  <Lock className="w-4 h-4 mr-2" />
                  เปลี่ยนรหัสผ่าน
                </Button>
                
                <Separator className="my-6" />
                
                <motion.div 
                  whileHover={{ scale: 1.01 }}
                  className="flex items-center justify-between p-5 bg-gradient-to-r from-red-50 to-rose-50 rounded-2xl border border-red-200"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-rose-500 flex items-center justify-center text-white shadow-lg shadow-red-200/50">
                      <AlertTriangle className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-red-900">ลบบัญชี</h4>
                      <p className="text-sm text-red-700">การลบบัญชีจะไม่สามารถย้อนกลับได้</p>
                    </div>
                  </div>
                  <Button variant="destructive" className="shadow-lg shadow-red-200/50">
                    ลบบัญชี
                  </Button>
                </motion.div>
              </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preferences" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  ความชอบ
                </CardTitle>
                <CardDescription>ปรับแต่งประสบการณ์การใช้งาน</CardDescription>
              </CardHeader>
              <CardContent>
              <div className="space-y-4">
                {[
                  { icon: Moon, title: 'ธีมมืด', desc: 'ใช้ธีมสีมืดในระบบ', type: 'switch' },
                  { icon: Languages, title: 'ภาษา', desc: 'เลือกภาษาที่ต้องการใช้งาน', type: 'select', options: ['ไทย', 'English'] },
                  { icon: Clock, title: 'เขตเวลา', desc: 'ตั้งค่าเขตเวลาของคุณ', type: 'select', options: ['GMT+7 (Bangkok)'] },
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-purple-200/50">
                        <item.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <Label className="font-semibold text-gray-800">{item.title}</Label>
                        <p className="text-sm text-gray-600">{item.desc}</p>
                      </div>
                    </div>
                    {item.type === 'switch' ? (
                      <Switch />
                    ) : (
                      <select className="border border-gray-200 rounded-xl px-4 py-2 bg-white focus:border-purple-400 focus:ring-2 focus:ring-purple-200 transition-all">
                        {item.options?.map((opt, i) => <option key={i}>{opt}</option>)}
                      </select>
                    )}
                  </motion.div>
                ))}
              </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="border-0 shadow-lg overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-red-500 via-rose-500 to-pink-500" />
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-rose-500 flex items-center justify-center text-white shadow-lg shadow-red-200/50">
                  <LogOut className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">ออกจากระบบ</h3>
                  <p className="text-sm text-gray-600">ออกจากระบบบัญชีปัจจุบัน</p>
                </div>
              </div>
              <Button 
                variant="destructive" 
                onClick={logout}
                className="bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 shadow-lg shadow-red-200/50"
              >
                <LogOut className="w-4 h-4 mr-2" />
                ออกจากระบบ
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
