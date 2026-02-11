import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, BookOpen, CheckCircle2, Clock } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface DegreeProgressProps {
    totalCredits: number;
    earnedCredits: number;
    registeredCredits: number;
    requiredCredits: number;
}

export function DegreeProgressCard({
    totalCredits,
    earnedCredits,
    registeredCredits,
    requiredCredits,
}: DegreeProgressProps) {
    const { t } = useLanguage();
    const remainingCredits = requiredCredits - earnedCredits;
    const progressPercent = Math.min((earnedCredits / requiredCredits) * 100, 100);

    const stats = [
        {
            label: t.degreeProgress.registeredCredits,
            value: registeredCredits,
            icon: BookOpen,
            color: 'text-blue-600',
            bgColor: 'bg-blue-50',
        },
        {
            label: t.degreeProgress.completedCredits,
            value: earnedCredits,
            icon: CheckCircle2,
            color: 'text-emerald-600',
            bgColor: 'bg-emerald-50',
        },
        {
            label: t.degreeProgress.remainingCredits,
            value: remainingCredits,
            icon: Clock,
            color: 'text-orange-600',
            bgColor: 'bg-orange-50',
        },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-3xl p-6 shadow-sm"
        >
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-lg shadow-purple-500/20">
                    <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-slate-800">ความก้าวหน้าของหลักสูตร</h3>
                    <p className="text-sm text-slate-500">Degree Tracking</p>
                </div>
            </div>

            {/* Circular Progress */}
            <div className="flex items-center justify-center mb-6">
                <div className="relative w-40 h-40">
                    <svg className="w-full h-full transform -rotate-90">
                        <circle
                            cx="80"
                            cy="80"
                            r="70"
                            stroke="currentColor"
                            strokeWidth="12"
                            fill="none"
                            className="text-slate-100"
                        />
                        <motion.circle
                            cx="80"
                            cy="80"
                            r="70"
                            stroke="url(#progressGradient)"
                            strokeWidth="12"
                            fill="none"
                            strokeLinecap="round"
                            initial={{ strokeDasharray: `0 440` }}
                            animate={{ strokeDasharray: `${(progressPercent / 100) * 440} 440` }}
                            transition={{ duration: 1.5, ease: 'easeOut' }}
                        />
                        <defs>
                            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#8B5CF6" />
                                <stop offset="100%" stopColor="#D946EF" />
                            </linearGradient>
                        </defs>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-3xl font-bold text-slate-900">{progressPercent.toFixed(0)}%</span>
                        <span className="text-sm text-slate-500">สำเร็จแล้ว</span>
                    </div>
                </div>
            </div>

            {/* Credits Display */}
            <div className="text-center mb-6">
                <div className="text-2xl font-bold text-slate-900">
                    <span className="text-violet-600">{earnedCredits}</span>
                    <span className="text-slate-400 mx-1">/</span>
                    <span>{requiredCredits}</span>
                </div>
                <p className="text-sm text-slate-500">หน่วยกิตทั้งหมดของหลักสูตร</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-3">
                {stats.map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 + 0.3 }}
                        className={`${stat.bgColor} rounded-2xl p-3 text-center`}
                    >
                        <stat.icon className={`w-5 h-5 mx-auto mb-2 ${stat.color}`} />
                        <div className={`text-xl font-bold ${stat.color}`}>{stat.value}</div>
                        <div className="text-xs text-slate-500 mt-1 line-clamp-2">{stat.label}</div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}
