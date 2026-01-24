
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, ArrowLeft, GraduationCap, Building2, ShieldCheck, Users, Briefcase, ChevronRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { UserRole } from '@/types';
import { useToast } from '@/hooks/use-toast';

const roleInfo = {
    student: {
        title: 'นักศึกษา',
        icon: GraduationCap,
        description: 'สำหรับนักศึกษาปัจจุบัน',
        gradient: 'from-blue-600 via-blue-500 to-cyan-400',
    },
    company: {
        title: 'บริษัท',
        icon: Building2,
        description: 'สำหรับสถานประกอบการ',
        gradient: 'from-orange-500 via-amber-500 to-yellow-400',
    },
    lecturer: {
        title: 'อาจารย์',
        icon: Users,
        description: 'สำหรับอาจารย์ผู้สอน',
        gradient: 'from-emerald-600 via-emerald-500 to-teal-400',
    },
    staff: {
        title: 'เจ้าหน้าที่',
        icon: ShieldCheck,
        description: 'สำหรับเจ้าหน้าที่ดูแลระบบ',
        gradient: 'from-purple-600 via-purple-500 to-violet-400',
    }
};

export default function RegisterPage() {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [step, setStep] = useState(1);
    const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

    // Form State
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        studentId: '', // For Student
        companyName: '', // For Company
    });

    // Derived State for Student
    const [studentYearInfo, setStudentYearInfo] = useState<{ year: number; generation: string } | null>(null);

    const calculateStudentYear = (id: string) => {
        if (id.length < 2) {
            setStudentYearInfo(null);
            return;
        }

        // Logic: First 2 digits = Academic Year (e.g. 68)
        const yearPrefix = parseInt(id.substring(0, 2));
        if (isNaN(yearPrefix)) return;

        // Current Context (Simulated as per user request context: Year 68 is Year 1)
        // Actually, normally: Current Year (Thai) - Start Year + 1 => Student Year.
        // Example: Now is 2568 (2025). Student ID 68... is entering 2568. So Year 1.
        // Login 67... is Year 2.

        // We'll use a fixed reference based on the prompt "68... รุ่นปีการศึกษา 68 ปี 1"
        // Let's assume the current Academic Year is 68 (2568).
        const currentAcademicYear = 68; // Based on prompt context
        const studentYear = currentAcademicYear - yearPrefix + 1;

        setStudentYearInfo({
            year: studentYear > 0 ? studentYear : 0,
            generation: yearPrefix.toString()
        });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));

        if (id === 'studentId') {
            calculateStudentYear(value);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            toast({
                title: "รหัสผ่านไม่ตรงกัน",
                description: "กรุณาตรวจสอบรหัสผ่านอีกครั้ง",
                variant: "destructive"
            });
            return;
        }

        // Process Registration (Mock)
        toast({
            title: "ลงทะเบียนสำเร็จ",
            description: "กำลังนำท่านเข้าสู่ระบบ...",
        });

        setTimeout(() => {
            navigate('/login', { state: { role: selectedRole } });
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-blue-400/20 to-purple-400/20 blur-3xl" />
                <div className="absolute top-[40%] -left-[10%] w-[40%] h-[40%] rounded-full bg-gradient-to-br from-rose-400/20 to-orange-400/20 blur-3xl" />
            </div>

            <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
                <Link to="/login" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    กลับไปหน้าเข้าสู่ระบบ
                </Link>

                <div className="text-center mb-8">
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="mx-auto h-16 w-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg mb-4"
                    >
                        <User className="h-8 w-8 text-white" />
                    </motion.div>
                    <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">สมัครสมาชิกใหม่</h2>
                    <p className="mt-2 text-sm text-gray-600">
                        {step === 1 ? 'เลือกประเภทบัญชีของคุณเพื่อเริ่มต้น' : 'กรอกข้อมูลส่วนตัวเพื่อสร้างบัญชี'}
                    </p>
                </div>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
                <div className="bg-white py-8 px-4 shadow-xl sm:rounded-2xl sm:px-10 border border-gray-100">

                    {step === 1 ? (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="space-y-4"
                        >
                            {(Object.keys(roleInfo) as UserRole[]).filter(r => r !== 'admin').map((role, index) => {
                                const info = roleInfo[role as keyof typeof roleInfo];
                                const Icon = info.icon;
                                return (
                                    <motion.button
                                        key={role}
                                        onClick={() => { setSelectedRole(role); setStep(2); }}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="w-full flex items-center p-4 border-2 border-transparent rounded-xl hover:border-blue-100 hover:bg-blue-50/50 bg-white shadow-sm hover:shadow-md transition-all group relative overflow-hidden"
                                    >
                                        <div className={`p-3 rounded-lg bg-gradient-to-br ${info.gradient} text-white mr-4 shadow-md group-hover:scale-110 transition-transform`}>
                                            <Icon className="w-6 h-6" />
                                        </div>
                                        <div className="text-left flex-1 relative z-10">
                                            <h3 className="font-bold text-gray-900 group-hover:text-blue-700 transition-colors">{info.title}</h3>
                                            <p className="text-sm text-gray-500">{info.description}</p>
                                        </div>
                                        <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-blue-500 transition-colors relative z-10" />
                                    </motion.button>
                                );
                            })}
                        </motion.div>
                    ) : (
                        <motion.form
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            onSubmit={handleSubmit}
                            className="space-y-6"
                        >
                            <div className="flex items-center gap-3 mb-6 p-3 bg-blue-50 rounded-lg text-blue-800 border border-blue-100">
                                <div className={`p-2 rounded-full bg-white shadow-sm`}>
                                    {selectedRole && React.createElement(roleInfo[selectedRole as keyof typeof roleInfo].icon, { className: "w-4 h-4" })}
                                </div>
                                <span className="font-semibold text-sm">สมัครสมาชิก: {selectedRole && roleInfo[selectedRole as keyof typeof roleInfo].title}</span>
                                <button type="button" onClick={() => setStep(1)} className="ml-auto text-xs underline text-blue-600 hover:text-blue-800">เปลี่ยน</button>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="firstName">ชื่อจริง</Label>
                                    <Input id="firstName" required className="mt-1" placeholder="สมชาย" value={formData.firstName} onChange={handleInputChange} />
                                </div>
                                <div>
                                    <Label htmlFor="lastName">นามสกุล</Label>
                                    <Input id="lastName" required className="mt-1" placeholder="ใจดี" value={formData.lastName} onChange={handleInputChange} />
                                </div>
                            </div>

                            {/* Conditional Fields based on Role */}
                            {selectedRole === 'student' && (
                                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                                    <Label htmlFor="studentId">รหัสนักศึกษา</Label>
                                    <div className="mt-1 relative">
                                        <GraduationCap className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                                        <Input
                                            id="studentId"
                                            required
                                            className="pl-10"
                                            placeholder="682110xxx"
                                            maxLength={9}
                                            value={formData.studentId}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    {studentYearInfo && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="mt-2 p-3 bg-emerald-50 rounded-lg flex items-start gap-3 border border-emerald-100"
                                        >
                                            <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5" />
                                            <div>
                                                <p className="text-sm font-semibold text-emerald-800">
                                                    รุ่นปีการศึกษา {studentYearInfo.generation}
                                                </p>
                                                <p className="text-xs text-emerald-600">
                                                    กำลังศึกษาชั้นปีที่ {studentYearInfo.year} (เทอม 2)
                                                </p>
                                            </div>
                                        </motion.div>
                                    )}
                                    {!studentYearInfo && formData.studentId.length >= 2 && (
                                        <p className="text-xs text-gray-500 mt-1 ml-1">* กรอกรหัสนักศึกษาเพื่อคำนวณรุ่นและชั้นปี</p>
                                    )}
                                </motion.div>
                            )}

                            {selectedRole === 'company' && (
                                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                                    <Label htmlFor="companyName">ชื่อบริษัท</Label>
                                    <div className="mt-1 relative">
                                        <Building2 className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                                        <Input
                                            id="companyName"
                                            required
                                            className="pl-10"
                                            placeholder="Tech Innovation Co., Ltd."
                                            value={formData.companyName}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </motion.div>
                            )}

                            <div>
                                <Label htmlFor="email">อีเมล</Label>
                                <div className="mt-1 relative">
                                    <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                                    <Input id="email" type="email" required className="pl-10" placeholder="name@example.com" value={formData.email} onChange={handleInputChange} />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="password">รหัสผ่าน</Label>
                                    <div className="mt-1 relative">
                                        <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                                        <Input id="password" type="password" required className="pl-10" placeholder="••••••" value={formData.password} onChange={handleInputChange} />
                                    </div>
                                </div>
                                <div>
                                    <Label htmlFor="confirmPassword">ยืนยันรหัสผ่าน</Label>
                                    <div className="mt-1 relative">
                                        <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                                        <Input id="confirmPassword" type="password" required className="pl-10" placeholder="••••••" value={formData.confirmPassword} onChange={handleInputChange} />
                                    </div>
                                </div>
                            </div>

                            <Button type="submit" className="w-full h-11 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg text-lg font-medium">
                                ลงทะเบียน
                            </Button>
                        </motion.form>
                    )}
                </div>
            </div>
        </div>
    );
}
