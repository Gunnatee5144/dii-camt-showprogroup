import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User, Bell, Lock, Palette, LogOut, Settings as SettingsIcon, Shield,
  Moon, Smartphone, ChevronRight, Sparkles, Save, Mail, ExternalLink,
  ShieldCheck, Eye, Zap, ArrowUpRight
} from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useLanguage } from '@/contexts/LanguageContext';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export default function Settings() {
  const { t } = useLanguage();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = React.useState('profile');

  const handleSave = () => {
    toast.success(t.settingsPage.savedSuccess);
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8 pb-10"
    >
      {/* Header */}
      <div>
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2 text-slate-500 font-medium mb-2">
          <SettingsIcon className="w-4 h-4 text-indigo-500" />
          <span>{t.settingsPage.systemSettings}</span>
        </motion.div>
        <motion.h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          {t.settingsPage.settingsTitle}<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">{t.settingsPage.system}</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-slate-500 mt-2">
          {t.settingsPage.settingsDesc}
        </motion.p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar - Bento Style */}
        <motion.div variants={itemVariants} className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-white/60 backdrop-blur-xl rounded-[2.5rem] p-6 shadow-sm border border-white/60 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl group-hover:bg-indigo-500/10 transition-colors" />

            <div className="flex items-center gap-4 p-5 mb-8 bg-slate-900 text-white rounded-[2rem] shadow-xl relative z-10">
              <div className="relative">
                <Avatar className="w-16 h-16 border-2 border-white/20 shadow-md rounded-2xl">
                  <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name}`} />
                  <AvatarFallback className="bg-white/10 text-white font-bold rounded-2xl">{user?.nameThai?.[0] || 'U'}</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 bg-emerald-500 w-5 h-5 rounded-lg border-2 border-slate-900 flex items-center justify-center">
                  <ShieldCheck className="w-3 h-3 text-white" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-lg truncate tracking-tight">{user?.nameThai}</div>
                <div className="text-xs text-slate-400 truncate font-medium">{user?.email}</div>
              </div>
            </div>

            <nav className="space-y-2 relative z-10 px-2">
              {[
                { id: 'profile', label: t.settingsPage.profileInfo, icon: User, color: 'text-blue-500', bg: 'bg-blue-50' },
                { id: 'notifications', label: t.settingsPage.notificationsTitle, icon: Bell, color: 'text-amber-500', bg: 'bg-amber-50' },
                { id: 'security', label: t.settingsPage.security, icon: Shield, color: 'text-indigo-500', bg: 'bg-indigo-50' },
                { id: 'preferences', label: t.settingsPage.display, icon: Palette, color: 'text-purple-500', bg: 'bg-purple-50' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-sm font-bold transition-all duration-300 ${activeTab === item.id
                    ? 'bg-white text-indigo-600 shadow-lg border border-indigo-50 translate-x-1'
                    : 'text-slate-500 hover:bg-white/50 hover:translate-x-1'
                    }`}
                >
                  <div className={`p-2.5 rounded-xl transition-colors ${activeTab === item.id ? 'bg-indigo-600 text-white shadow-indigo-500/20' : `bg-slate-100/50 text-slate-400`}`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  {item.label}
                  {activeTab === item.id && <ChevronRight className="w-4 h-4 ml-auto opacity-100" />}
                </button>
              ))}
            </nav>

            <div className="mt-10 pt-6 border-t border-slate-100 px-4">
              <Button
                variant="ghost"
                className="w-full justify-start text-red-500 font-bold hover:text-red-600 hover:bg-red-50 rounded-2xl h-14"
                onClick={logout}
              >
                <div className="p-2.5 rounded-xl bg-red-50 text-red-500 mr-4 shadow-sm">
                  <LogOut className="w-5 h-5" />
                </div>
                {t.settingsPage.logout}
              </Button>
            </div>
          </div>

          {/* Quick Info Bento Box */}
          <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-[60px]" />
            <div className="relative z-10">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-300" />
                {t.settingsPage.accountStatus}
              </h3>
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-md">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] font-black tracking-widest text-slate-400 uppercase">Verification</span>
                    <Badge className="bg-emerald-500 text-[10px] h-5">Verified</Badge>
                  </div>
                  <div className="text-sm font-bold">{t.settingsPage.verifiedNormal}</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Content Area - Bento Style */}
        <motion.div variants={itemVariants} className="lg:col-span-8">
          <div className="bg-white/70 backdrop-blur-xl rounded-[3rem] shadow-sm border border-white flex flex-col min-h-[600px] overflow-hidden">
            <AnimatePresence mode="wait">
              {activeTab === 'profile' && (
                <motion.div
                  key="profile"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="p-10 space-y-10"
                >
                  <div className="flex flex-col md:flex-row justify-between items-start gap-4 border-b border-slate-100 pb-8">
                    <div>
                      <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">{t.settingsPage.personalInfo}</h2>
                      <p className="text-slate-500 font-medium">{t.settingsPage.personalInfoDesc}</p>
                    </div>
                    <Button onClick={handleSave} className="rounded-2xl h-12 px-8 bg-slate-900 text-white hover:bg-slate-800 shadow-xl shadow-slate-900/20 font-bold transform active:scale-95 transition-all">
                      <Save className="w-4 h-4 mr-2" /> {t.settingsPage.saveData}
                    </Button>
                  </div>

                  <div className="p-8 bg-slate-50/50 rounded-[2.5rem] border border-slate-100 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-[80px] pointer-events-none" />
                    <div className="relative group/avatar cursor-pointer">
                      <Avatar className="w-32 h-32 border-4 border-white shadow-2xl rounded-[2rem]">
                        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name}`} />
                        <AvatarFallback className="text-3xl bg-indigo-100 text-indigo-600 font-black">{user?.nameThai?.[0]}</AvatarFallback>
                      </Avatar>
                      <div className="absolute inset-0 bg-slate-900/60 rounded-[2rem] opacity-0 group-hover/avatar:opacity-100 flex items-center justify-center transition-all duration-300">
                        <Smartphone className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <div className="flex-1 text-center md:text-left relative z-10">
                      <h3 className="font-black text-2xl text-slate-900 mb-2 tracking-tight">{t.settingsPage.profilePhoto}</h3>
                      <p className="text-sm text-slate-500 mb-6 font-medium">{t.settingsPage.profilePhotoDesc}</p>
                      <div className="flex justify-center md:justify-start gap-3">
                        <Button className="rounded-xl h-11 bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 shadow-sm px-6">{t.settingsPage.uploadNew}</Button>
                        <Button variant="ghost" className="rounded-xl h-11 text-red-500 font-bold hover:bg-red-50 px-6">{t.settingsPage.deletePhoto}</Button>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <Label className="ml-1 text-slate-700 font-bold">{t.settingsPage.nameThai}</Label>
                      <Input defaultValue={user?.nameThai} className="h-14 rounded-2xl bg-white border-slate-100 shadow-inner px-5 font-medium focus-visible:ring-indigo-500" />
                    </div>
                    <div className="space-y-2">
                      <Label className="ml-1 text-slate-700 font-bold">{t.settingsPage.nameEnglish}</Label>
                      <Input defaultValue={user?.name} className="h-14 rounded-2xl bg-white border-slate-100 shadow-inner px-5 font-medium focus-visible:ring-indigo-500" />
                    </div>
                    <div className="space-y-2">
                      <Label className="ml-1 text-slate-700 font-bold">{t.settingsPage.emailAddress}</Label>
                      <Input defaultValue={user?.email} className="h-14 rounded-2xl bg-white border-slate-100 shadow-inner px-5 font-medium focus-visible:ring-indigo-500" />
                    </div>
                    <div className="space-y-2">
                      <Label className="ml-1 text-slate-700 font-bold">{t.settingsPage.phoneNumber}</Label>
                      <Input placeholder="+66 XX XXX XXXX" className="h-14 rounded-2xl bg-white border-slate-100 shadow-inner px-5 font-medium focus-visible:ring-indigo-500" />
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'notifications' && (
                <motion.div
                  key="notifications"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="p-10 space-y-10"
                >
                  <div className="border-b border-slate-100 pb-8">
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">{t.settingsPage.notificationsTitle}</h2>
                    <p className="text-slate-500 font-medium">{t.settingsPage.notificationsDesc}</p>
                  </div>

                  <div className="space-y-10">
                    <div className="space-y-6">
                      <h3 className="font-black text-xl text-slate-900 flex items-center gap-3 tracking-tight">
                        <div className="p-2 rounded-xl bg-amber-50 text-amber-500 shadow-sm"><Bell className="w-5 h-5" /></div>
                        {t.settingsPage.application}
                      </h3>
                      <div className="space-y-3">
                        {[
                          { label: t.settingsPage.newsAnnouncements, desc: t.settingsPage.newsAnnouncementsDesc },
                          { label: t.settingsPage.newActivities, desc: t.settingsPage.newActivitiesDesc },
                          { label: t.settingsPage.requestProgress, desc: t.settingsPage.requestProgressDesc }
                        ].map((pref, i) => (
                          <div key={i} className="flex items-center justify-between p-6 rounded-[2rem] bg-white border border-slate-100 hover:border-amber-200 transition-all shadow-sm">
                            <div className="space-y-1">
                              <Label className="text-lg font-bold text-slate-800">{pref.label}</Label>
                              <p className="text-sm text-slate-500 font-medium">{pref.desc}</p>
                            </div>
                            <Switch defaultChecked className="data-[state=checked]:bg-amber-500" />
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator className="bg-slate-100" />

                    <div className="space-y-6">
                      <h3 className="font-black text-xl text-slate-900 flex items-center gap-3 tracking-tight">
                        <div className="p-2 rounded-xl bg-purple-50 text-purple-500 shadow-sm"><Mail className="w-5 h-5" /></div>
                        {t.settingsPage.emailDirect}
                      </h3>
                      <div className="flex items-center justify-between p-6 rounded-[2rem] bg-white border border-slate-100 hover:border-purple-200 transition-all shadow-sm">
                        <div className="space-y-1">
                          <Label className="text-lg font-bold text-slate-800">{t.settingsPage.weeklySummary}</Label>
                          <p className="text-sm text-slate-500 font-medium">{t.settingsPage.weeklySummaryDesc}</p>
                        </div>
                        <Switch className="data-[state=checked]:bg-purple-500" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'security' && (
                <motion.div
                  key="security"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="p-10 space-y-10"
                >
                  <div className="border-b border-slate-100 pb-8">
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">{t.settingsPage.accountStrength}</h2>
                    <p className="text-slate-500 font-medium">{t.settingsPage.securityDesc}</p>
                  </div>

                  <div className="space-y-8">
                    <div className="p-10 rounded-[2.5rem] bg-slate-900 text-white shadow-2xl relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-500/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 transition-all duration-1000 group-hover:bg-indigo-500/30" />
                      <h3 className="font-black text-2xl mb-8 flex items-center gap-3 relative z-10 tracking-tight">
                        <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20"><Lock className="w-7 h-7 text-indigo-300" /></div>
                        {t.settingsPage.changePassword}
                      </h3>
                      <div className="grid gap-6 relative z-10">
                        <div className="space-y-3">
                          <Label className="text-slate-300 font-bold ml-1">{t.settingsPage.currentPassword}</Label>
                          <Input type="password" placeholder="••••••••" className="bg-white/5 border-white/10 text-white placeholder:text-white/20 h-14 rounded-2xl focus:bg-white/10 transition-all px-6 text-lg" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <Label className="text-slate-300 font-bold ml-1">{t.settingsPage.newPassword}</Label>
                            <Input type="password" placeholder="••••••••" className="bg-white/5 border-white/10 text-white placeholder:text-white/20 h-14 rounded-2xl focus:bg-white/10 transition-all px-6 text-lg" />
                          </div>
                          <div className="space-y-3">
                            <Label className="text-slate-300 font-bold ml-1">{t.settingsPage.confirmNewPassword}</Label>
                            <Input type="password" placeholder="••••••••" className="bg-white/5 border-white/10 text-white placeholder:text-white/20 h-14 rounded-2xl focus:bg-white/10 transition-all px-6 text-lg" />
                          </div>
                        </div>
                      </div>
                      <Button className="mt-10 w-full bg-white text-slate-900 hover:bg-slate-100 rounded-[1.5rem] h-14 font-black text-base shadow-xl transform active:scale-[0.98] transition-all relative z-10">
                        {t.settingsPage.updatePassword}
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex items-center justify-between p-8 rounded-[2rem] bg-white border border-slate-100 shadow-sm group hover:border-indigo-200 transition-all">
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-xl bg-orange-50 text-orange-500"><Smartphone className="w-5 h-5" /></div>
                            <Label className="text-xl font-black text-slate-800 tracking-tight leading-none">2FA Verification</Label>
                          </div>
                          <p className="text-sm text-slate-500 font-medium">{t.settingsPage.smsVerification}</p>
                        </div>
                        <Button variant="outline" className="rounded-xl h-12 border-slate-200 font-bold px-6">{t.settingsPage.enable}</Button>
                      </div>
                      <div className="flex items-center justify-between p-8 rounded-[2rem] bg-white border border-slate-100 shadow-sm group hover:border-slate-300 transition-all">
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-xl bg-slate-50 text-slate-600"><Eye className="w-5 h-5" /></div>
                            <Label className="text-xl font-black text-slate-800 tracking-tight leading-none">{t.settingsPage.loginHistory}</Label>
                          </div>
                          <p className="text-sm text-slate-500 font-medium">{t.settingsPage.loginHistoryDesc}</p>
                        </div>
                        <Button variant="ghost" className="rounded-xl h-12 text-slate-500 font-bold px-4">{t.settingsPage.viewData}</Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'preferences' && (
                <motion.div
                  key="preferences"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="p-10 space-y-12"
                >
                  <div className="border-b border-slate-100 pb-8">
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">{t.settingsPage.displayUI}</h2>
                    <p className="text-slate-500 font-medium">{t.settingsPage.displayDesc}</p>
                  </div>

                  <div className="space-y-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="cursor-pointer group">
                        <div className="aspect-[16/10] rounded-[2rem] bg-slate-50 border-4 border-indigo-600 mb-4 relative overflow-hidden shadow-2xl scale-[1.05]">
                          <div className="absolute inset-4 bg-white rounded-[1.25rem] border border-slate-100 shadow-inner" />
                          <div className="absolute top-10 left-10 w-2/3 h-4 bg-slate-50 rounded-full" />
                          <div className="absolute top-18 left-10 w-1/3 h-24 bg-slate-50 rounded-2xl" />
                        </div>
                        <p className="text-center font-black text-slate-900 text-sm tracking-tight">{t.settingsPage.lightTheme}</p>
                      </div>
                      <div className="cursor-pointer group opacity-60 hover:opacity-100 transition-all">
                        <div className="aspect-[16/10] rounded-[2rem] bg-slate-900 border-4 border-transparent group-hover:border-slate-300 mb-4 relative overflow-hidden shadow-sm">
                          <div className="absolute inset-4 bg-slate-800 rounded-[1.25rem] border border-slate-700" />
                          <div className="absolute top-10 left-10 w-2/3 h-4 bg-slate-700 rounded-full" />
                          <div className="absolute top-18 left-10 w-1/3 h-24 bg-slate-700 rounded-2xl" />
                        </div>
                        <p className="text-center font-bold text-slate-500 text-sm tracking-tight">{t.settingsPage.darkTheme}</p>
                      </div>
                      <div className="cursor-pointer group opacity-60 hover:opacity-100 transition-all">
                        <div className="aspect-[16/10] rounded-[2rem] bg-gradient-to-br from-indigo-100 to-indigo-900 border-4 border-transparent group-hover:border-slate-300 mb-4 relative overflow-hidden shadow-sm flex items-center justify-center">
                          <Smartphone className="w-12 h-12 text-white/50" />
                        </div>
                        <p className="text-center font-bold text-slate-500 text-sm tracking-tight">{t.settingsPage.autoTheme}</p>
                      </div>
                    </div>

                    <Separator className="bg-slate-100" />

                    <div className="space-y-6">
                      <h3 className="font-black text-xl text-slate-900 flex items-center gap-3 tracking-tight">
                        <div className="p-2 rounded-xl bg-indigo-50 text-indigo-500 shadow-sm"><Palette className="w-5 h-5" /></div>
                        {t.settingsPage.languageSettings}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-6 rounded-[2rem] border-4 border-indigo-600 bg-white flex items-center justify-between cursor-pointer shadow-lg transform active:scale-[0.98] transition-all">
                          <div className="flex items-center gap-6">
                            <span className="text-4xl filter drop-shadow-md">🇹🇭</span>
                            <div className="flex flex-col">
                              <span className="font-black text-xl text-slate-900 leading-tight">{t.settingsPage.thai}</span>
                              <span className="text-xs font-bold text-indigo-500 uppercase tracking-widest">Selected</span>
                            </div>
                          </div>
                          <div className="w-6 h-6 rounded-full bg-indigo-600 border-4 border-white shadow-md" />
                        </div>
                        <div className="p-6 rounded-[2rem] border-2 border-slate-100 bg-white/50 hover:bg-white flex items-center justify-between cursor-pointer transition-all hover:border-slate-200">
                          <div className="flex items-center gap-6">
                            <span className="text-4xl filter drop-shadow-sm opacity-60">🇬🇧</span>
                            <div className="flex flex-col">
                              <span className="font-black text-xl text-slate-400 group-hover:text-slate-900 transition-colors leading-tight">English</span>
                              <span className="text-[10px] font-bold text-slate-400 tracking-tight">EN-US / EN-GB</span>
                            </div>
                          </div>
                          <div className="w-6 h-6 rounded-full border-2 border-slate-200 group-hover:border-slate-300 transition-colors" />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
