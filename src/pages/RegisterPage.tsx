import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Building2, User, Mail, Lock, CheckCircle, ArrowRight, ArrowLeft, BookOpen, UserCog } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';

export default function RegisterPage() {
    const navigate = useNavigate();
    const { login } = useAuth(); // Assuming we auto-login or just use this for potential future direct register hook
    const [step, setStep] = useState(1);
    const [role, setRole] = useState<'student' | 'company' | 'lecturer' | 'staff' | null>(null);
    const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });

    const handleRoleSelect = (selectedRole: 'student' | 'company' | 'lecturer' | 'staff') => {
        setRole(selectedRole);
        setStep(2);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            toast.error('รหัสผ่านไม่ตรงกัน');
            return;
        }

        // Mock registration
        toast.success('สมัครสมาชิกสำเร็จ', { description: 'กรุณาเข้าสู่ระบบ' });
        navigate('/login');
    };

    return (

        <div className="min-h-screen flex font-sans bg-white selection:bg-blue-100 selection:text-blue-900 overflow-hidden">
            {/* Left Side: Information - Premium Dark */}
            <div className="hidden lg:flex w-1/2 bg-slate-900 relative overflow-hidden flex-col justify-between p-12">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
                        alt="Team"
                        className="w-full h-full object-cover opacity-20 mix-blend-overlay"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 to-slate-900/80" />
                    {/* Animated particles */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-20"></div>
                </div>

                <div className="relative z-10 w-full max-w-lg mx-auto">
                    <Link to="/" className="inline-block p-3 bg-white/10 rounded-2xl mb-8 backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-colors">
                        <ArrowLeft className="w-6 h-6 text-white" />
                    </Link>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl font-bold mb-6 text-white leading-tight"
                    >
                        เริ่มต้นการเดินทาง<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400">สู่ความสำเร็จกับ DII</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-slate-300 text-lg leading-relaxed mb-12"
                    >
                        ไม่ว่าคุณจะเป็นนักศึกษาที่กำลังมองหาโอกาส หรือบริษัทที่ต้องการคนรุ่นใหม่ไฟแรง ระบบของเราพร้อมสนับสนุนทุกก้าวของคุณให้มั่นคงและยั่งยืน
                    </motion.p>

                    <div className="space-y-6">
                        {[
                            { text: 'เข้าถึงแหล่งข้อมูลการเรียนรู้ครบวงจร', color: 'text-emerald-400' },
                            { text: 'เชื่อมต่อกับบริษัทชั้นนำมากมาย', color: 'text-blue-400' },
                            { text: 'ระบบติดตามผลการเรียนและฝึกงาน', color: 'text-purple-400' }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 + (i * 0.1) }}
                                className="flex items-center gap-4 text-slate-300 bg-white/5 p-4 rounded-xl border border-white/5"
                            >
                                <CheckCircle className={`w-6 h-6 ${item.color}`} />
                                <span className="font-medium">{item.text}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="relative z-10 text-center text-slate-500 text-sm mt-12">
                    © 2026 DII CAMT. All rights reserved.
                </div>
            </div>

            {/* Right Side: Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 relative bg-slate-50">
                <div className="absolute inset-0 bg-white/40 backdrop-blur-3xl z-0"></div>
                {/* Background blobs */}
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-emerald-100 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

                <div className="w-full max-w-md relative z-10 bg-white/80 p-6 md:p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-white min-h-[600px] flex flex-col justify-center">
                    <AnimatePresence mode="wait">
                        {step === 1 ? (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-8"
                            >
                                <div className="text-center">
                                    <h2 className="text-3xl font-bold text-slate-900 mb-2">เลือกประเภทบัญชี</h2>
                                    <p className="text-slate-500">คุณต้องการสมัครสมาชิกในฐานะอะไร?</p>
                                </div>

                                <div className="grid gap-4">
                                    <Card
                                        className="p-5 cursor-pointer hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/10 transition-all group border-2 border-slate-100 hover:scale-[1.02] bg-white"
                                        onClick={() => handleRoleSelect('student')}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                                                <GraduationCap className="w-6 h-6 text-blue-600 group-hover:text-white" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-bold text-slate-900 text-lg group-hover:text-blue-600 transition-colors">นักศึกษา</h3>
                                                <p className="text-slate-500 text-sm">สำหรับนักศึกษาที่ต้องการใช้งานระบบ</p>
                                            </div>
                                            <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                                        </div>
                                    </Card>

                                    <Card
                                        className="p-5 cursor-pointer hover:border-orange-500 hover:shadow-xl hover:shadow-orange-500/10 transition-all group border-2 border-slate-100 hover:scale-[1.02] bg-white"
                                        onClick={() => handleRoleSelect('company')}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center group-hover:bg-orange-600 group-hover:text-white transition-all duration-300">
                                                <Building2 className="w-6 h-6 text-orange-600 group-hover:text-white" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-bold text-slate-900 text-lg group-hover:text-orange-600 transition-colors">บริษัท / องค์กร</h3>
                                                <p className="text-slate-500 text-sm">สำหรับบริษัทที่ต้องการรับนักศึกษา</p>
                                            </div>
                                            <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-orange-500 group-hover:translate-x-1 transition-all" />
                                        </div>
                                    </Card>

                                    <Card
                                        className="p-5 cursor-pointer hover:border-emerald-500 hover:shadow-xl hover:shadow-emerald-500/10 transition-all group border-2 border-slate-100 hover:scale-[1.02] bg-white"
                                        onClick={() => handleRoleSelect('lecturer')}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                                                <BookOpen className="w-6 h-6 text-emerald-600 group-hover:text-white" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-bold text-slate-900 text-lg group-hover:text-emerald-600 transition-colors">อาจารย์</h3>
                                                <p className="text-slate-500 text-sm">สำหรับอาจารย์ผู้สอน</p>
                                            </div>
                                            <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
                                        </div>
                                    </Card>

                                    <Card
                                        className="p-5 cursor-pointer hover:border-purple-500 hover:shadow-xl hover:shadow-purple-500/10 transition-all group border-2 border-slate-100 hover:scale-[1.02] bg-white"
                                        onClick={() => handleRoleSelect('staff')}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-all duration-300">
                                                <UserCog className="w-6 h-6 text-purple-600 group-hover:text-white" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-bold text-slate-900 text-lg group-hover:text-purple-600 transition-colors">เจ้าหน้าที่</h3>
                                                <p className="text-slate-500 text-sm">สำหรับเจ้าหน้าที่คณะ</p>
                                            </div>
                                            <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-purple-500 group-hover:translate-x-1 transition-all" />
                                        </div>
                                    </Card>
                                </div>

                                <div className="text-center pt-4">
                                    <Link to="/login" className="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors">มีบัญชีอยู่แล้ว? เข้าสู่ระบบ</Link>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <div>
                                    <Button variant="ghost" className="pl-0 hover:bg-transparent text-slate-500 hover:text-slate-900 mb-2 group" onClick={() => setStep(1)}>
                                        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> ย้อนกลับ
                                    </Button>
                                    <h2 className="text-3xl font-bold text-slate-900 mb-2 tracking-tight">ข้อมูลส่วนตัว</h2>
                                    <p className="text-slate-500">
                                        สมัครสมาชิกในฐานะ <span className="font-bold text-blue-600 px-2 py-1 bg-blue-50 rounded-lg">
                                            {role === 'student' ? 'นักศึกษา' :
                                                role === 'company' ? 'บริษัท' :
                                                    role === 'lecturer' ? 'อาจารย์' : 'เจ้าหน้าที่'}
                                        </span>
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label>ชื่อ-นามสกุล / ชื่อบริษัท</Label>
                                        <div className="relative group">
                                            <User className="absolute left-3 top-3 h-5 w-5 text-slate-400 group-hover:text-blue-500 transition-colors" />
                                            <Input className="pl-10 h-12 bg-slate-50 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl transition-all" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>อีเมล</Label>
                                        <div className="relative group">
                                            <Mail className="absolute left-3 top-3 h-5 w-5 text-slate-400 group-hover:text-blue-500 transition-colors" />
                                            <Input type="email" className="pl-10 h-12 bg-slate-50 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl transition-all" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>รหัสผ่าน</Label>
                                        <div className="relative group">
                                            <Lock className="absolute left-3 top-3 h-5 w-5 text-slate-400 group-hover:text-blue-500 transition-colors" />
                                            <Input type="password" className="pl-10 h-12 bg-slate-50 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl transition-all" required value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>ยืนยันรหัสผ่าน</Label>
                                        <div className="relative group">
                                            <Lock className="absolute left-3 top-3 h-5 w-5 text-slate-400 group-hover:text-blue-500 transition-colors" />
                                            <Input type="password" className="pl-10 h-12 bg-slate-50 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl transition-all" required value={formData.confirmPassword} onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })} />
                                        </div>
                                    </div>

                                    <Button type="submit" className="w-full h-12 text-lg font-semibold mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/30 rounded-xl transition-all hover:scale-[1.01]">สมัครสมาชิก</Button>
                                </form>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );

}
