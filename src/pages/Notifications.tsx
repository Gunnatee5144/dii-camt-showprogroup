import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Check, Trash2, Settings, Filter, Mail, Calendar, AlertTriangle, Info, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ThemedPageHeader } from '@/components/common/ThemedPageHeader';
import { mockNotifications } from '@/lib/mockData';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

export default function Notifications() {
    const unreadCount = mockNotifications.filter(n => !n.isRead).length;

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'success': return <CheckCircle className="w-5 h-5 text-emerald-600" />;
            case 'warning': return <AlertTriangle className="w-5 h-5 text-orange-600" />;
            case 'error': return <AlertTriangle className="w-5 h-5 text-red-600" />;
            case 'schedule_change': return <Calendar className="w-5 h-5 text-blue-600" />;
            default: return <Info className="w-5 h-5 text-blue-600" />;
        }
    };

    const getPriorityBadge = (priority: string) => {
        switch (priority) {
            case 'urgent': return <Badge className="bg-red-100 text-red-700">ด่วนมาก</Badge>;
            case 'high': return <Badge className="bg-orange-100 text-orange-700">ด่วน</Badge>;
            case 'medium': return <Badge className="bg-blue-100 text-blue-700">ปานกลาง</Badge>;
            default: return <Badge className="bg-gray-100 text-gray-700">ทั่วไป</Badge>;
        }
    };

    return (
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
            <ThemedPageHeader
                title="การแจ้งเตือน"
                subtitle={`${mockNotifications.length} การแจ้งเตือน • ${unreadCount} ยังไม่อ่าน`}
                icon={<Bell className="w-7 h-7" />}
                actions={
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm"><Check className="w-4 h-4 mr-2" />อ่านทั้งหมด</Button>
                        <Button variant="outline" size="sm"><Settings className="w-4 h-4" /></Button>
                    </div>
                }
            />

            <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: 'ทั้งหมด', value: mockNotifications.length, gradient: 'from-blue-500 to-indigo-500', icon: Bell },
                    { label: 'ยังไม่อ่าน', value: unreadCount, gradient: 'from-orange-500 to-amber-500', icon: Mail },
                    { label: 'ด่วน', value: mockNotifications.filter(n => n.priority === 'urgent' || n.priority === 'high').length, gradient: 'from-red-500 to-rose-500', icon: AlertTriangle },
                    { label: 'อ่านแล้ว', value: mockNotifications.filter(n => n.isRead).length, gradient: 'from-emerald-500 to-teal-500', icon: CheckCircle },
                ].map((stat, i) => (
                    <motion.div key={i} whileHover={{ scale: 1.02 }} className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${stat.gradient} p-6 text-white shadow-xl`}>
                        <div className="absolute -top-10 -right-10 w-28 h-28 bg-white/10 rounded-full blur-2xl" />
                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="p-2 rounded-xl bg-white/20"><stat.icon className="w-5 h-5" /></div>
                                <span className="font-medium text-white/90">{stat.label}</span>
                            </div>
                            <div className="text-4xl font-bold">{stat.value}</div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            <motion.div variants={itemVariants}>
                <Tabs defaultValue="all" className="space-y-4">
                    <TabsList className="bg-white/80 backdrop-blur-sm border shadow-sm">
                        <TabsTrigger value="all">ทั้งหมด</TabsTrigger>
                        <TabsTrigger value="unread">ยังไม่อ่าน</TabsTrigger>
                        <TabsTrigger value="urgent">ด่วน</TabsTrigger>
                    </TabsList>

                    <TabsContent value="all">
                        <Card><CardContent className="pt-6">
                            <div className="space-y-3">
                                {mockNotifications.map((notification, index) => (
                                    <motion.div
                                        key={notification.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.03 }}
                                        className={`flex items-start gap-4 p-4 border rounded-xl transition-all hover:shadow-md ${!notification.isRead ? 'bg-blue-50/50 border-blue-200' : 'bg-white'
                                            }`}
                                    >
                                        <div className="mt-1">{getTypeIcon(notification.type)}</div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="font-semibold text-gray-900">{notification.titleThai}</h3>
                                                {!notification.isRead && <div className="w-2 h-2 bg-blue-500 rounded-full" />}
                                            </div>
                                            <p className="text-sm text-gray-600 line-clamp-2">{notification.messageThai}</p>
                                            <div className="flex items-center gap-2 mt-2">
                                                <span className="text-xs text-gray-400">
                                                    {new Date(notification.createdAt).toLocaleDateString('th-TH', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                                {getPriorityBadge(notification.priority)}
                                            </div>
                                        </div>
                                        <div className="flex gap-1">
                                            {!notification.isRead && <Button size="sm" variant="ghost"><Check className="w-4 h-4" /></Button>}
                                            <Button size="sm" variant="ghost" className="text-gray-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></Button>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </CardContent></Card>
                    </TabsContent>

                    <TabsContent value="unread">
                        <Card><CardContent className="pt-6">
                            <div className="space-y-3">
                                {mockNotifications.filter(n => !n.isRead).map((notification) => (
                                    <div key={notification.id} className="flex items-start gap-4 p-4 border rounded-xl bg-blue-50/50 border-blue-200">
                                        <div className="mt-1">{getTypeIcon(notification.type)}</div>
                                        <div className="flex-1">
                                            <h3 className="font-semibold">{notification.titleThai}</h3>
                                            <p className="text-sm text-gray-600">{notification.messageThai}</p>
                                        </div>
                                        <Button size="sm" variant="outline"><Check className="w-4 h-4 mr-1" />อ่านแล้ว</Button>
                                    </div>
                                ))}
                            </div>
                        </CardContent></Card>
                    </TabsContent>

                    <TabsContent value="urgent">
                        <Card><CardContent className="pt-6">
                            <div className="space-y-3">
                                {mockNotifications.filter(n => n.priority === 'urgent' || n.priority === 'high').map((notification) => (
                                    <div key={notification.id} className="flex items-start gap-4 p-4 border rounded-xl bg-red-50/50 border-red-200">
                                        <div className="mt-1"><AlertTriangle className="w-5 h-5 text-red-600" /></div>
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-red-900">{notification.titleThai}</h3>
                                            <p className="text-sm text-red-700">{notification.messageThai}</p>
                                        </div>
                                        {getPriorityBadge(notification.priority)}
                                    </div>
                                ))}
                            </div>
                        </CardContent></Card>
                    </TabsContent>
                </Tabs>
            </motion.div>
        </motion.div>
    );
}
