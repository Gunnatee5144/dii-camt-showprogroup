import React from 'react';
import { motion } from 'framer-motion';
import { Users, MessageSquare, RefreshCcw, FileText, GitPullRequest, BookOpen } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

// Soft Skills based on AAC&U Value Rubrics
interface SoftSkillCriteria {
    id: string;
    name: string;
    nameThai: string;
    description: string;
    score: number;
    maxScore: number;
    icon: React.ElementType;
    color: string;
    bgColor: string;
    rubricLevels: {
        level: number;
        description: string;
    }[];
}

interface SoftSkillsRubricProps {
    communication: number;
    openness: number;
    professorWeight?: number;
    peerWeight?: number;
    professorScore?: number;
    peerScore?: number;
    feedbackHistory?: {
        projectName: string;
        date: string;
        communicationScore: number;
        opennessScore: number;
        comments: number;
    }[];
}

export function SoftSkillsRubricCard({
    communication,
    openness,
    professorWeight = 60,
    peerWeight = 40,
    professorScore = 0,
    peerScore = 0,
    feedbackHistory = [],
}: SoftSkillsRubricProps) {
    const softSkillCriteria: SoftSkillCriteria[] = [
        {
            id: 'communication',
            name: 'Communication',
            nameThai: 'การสื่อสาร',
            description: 'เขียน README/Document อธิบายได้ชัดเจน ครบถ้วน เข้าใจง่าย',
            score: communication,
            maxScore: 5,
            icon: FileText,
            color: 'text-blue-600',
            bgColor: 'bg-blue-50',
            rubricLevels: [
                { level: 5, description: 'Excellent: Documentation ครบถ้วน ชัดเจน มีตัวอย่าง' },
                { level: 4, description: 'Good: README ดี มีการอธิบายการใช้งาน' },
                { level: 3, description: 'Satisfactory: มี Documentation พื้นฐาน' },
                { level: 2, description: 'Developing: Documentation ไม่ครบถ้วน' },
                { level: 1, description: 'Beginning: แทบไม่มี Documentation' },
            ],
        },
        {
            id: 'openness',
            name: 'Openness',
            nameThai: 'ความเปิดกว้าง',
            description: 'ตอบกลับ Comment รวดเร็ว ยอมรับข้อเสนอแนะ แก้ไขตาม Feedback',
            score: openness,
            maxScore: 5,
            icon: GitPullRequest,
            color: 'text-emerald-600',
            bgColor: 'bg-emerald-50',
            rubricLevels: [
                { level: 5, description: 'Excellent: ตอบกลับทันที แก้ไขครบ ยอมรับทุกข้อเสนอ' },
                { level: 4, description: 'Good: ตอบกลับภายใน 24 ชม. แก้ไขส่วนใหญ่' },
                { level: 3, description: 'Satisfactory: ตอบกลับบ้าง แก้ไขบางส่วน' },
                { level: 2, description: 'Developing: ตอบกลับช้า ไม่ค่อยแก้ไข' },
                { level: 1, description: 'Beginning: ไม่ตอบกลับ ไม่รับ Feedback' },
            ],
        },
    ];

    // Calculate weighted score
    const avgScore = (communication + openness) / 2;
    const weightedScore = professorScore > 0 || peerScore > 0
        ? (professorScore * professorWeight / 100) + (peerScore * peerWeight / 100)
        : avgScore;

    const getScoreLevel = (score: number) => {
        if (score >= 4.5) return { label: 'Excellent', color: 'text-emerald-600', bg: 'bg-emerald-50' };
        if (score >= 3.5) return { label: 'Good', color: 'text-blue-600', bg: 'bg-blue-50' };
        if (score >= 2.5) return { label: 'Fair', color: 'text-amber-600', bg: 'bg-amber-50' };
        return { label: 'Needs Improvement', color: 'text-red-600', bg: 'bg-red-50' };
    };

    const getCurrentLevel = (score: number, levels: { level: number; description: string }[]) => {
        return levels.find(l => l.level === Math.round(score)) || levels[levels.length - 1];
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-3xl p-6 shadow-sm"
        >
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 text-white shadow-lg shadow-pink-500/20">
                        <Users className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-slate-800">Soft Skills</h3>
                        <p className="text-sm text-slate-500">ตาม AAC&U Value Rubrics</p>
                    </div>
                </div>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <div className={`px-3 py-1.5 rounded-xl ${getScoreLevel(weightedScore).bg}`}>
                                <span className={`text-xl font-bold ${getScoreLevel(weightedScore).color}`}>
                                    {weightedScore.toFixed(1)}
                                </span>
                                <span className="text-xs text-slate-500 ml-1">/ 5</span>
                            </div>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>คะแนนถ่วงน้ำหนัก: อาจารย์ {professorWeight}% / เพื่อน {peerWeight}%</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>

            {/* Rubric Criteria */}
            <div className="space-y-4 mb-6">
                {softSkillCriteria.map((criteria, index) => (
                    <motion.div
                        key={criteria.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`p-4 rounded-2xl ${criteria.bgColor} border border-white/50`}
                    >
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <criteria.icon className={`w-4 h-4 ${criteria.color}`} />
                                <span className={`font-semibold text-sm ${criteria.color}`}>
                                    {criteria.name}
                                </span>
                                <span className="text-xs text-slate-500">({criteria.nameThai})</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <span className={`text-lg font-bold ${criteria.color}`}>{criteria.score}</span>
                                <span className="text-xs text-slate-400">/ {criteria.maxScore}</span>
                            </div>
                        </div>
                        <p className="text-xs text-slate-600 mb-2">{criteria.description}</p>
                        <div className="h-2 bg-white/60 rounded-full overflow-hidden mb-3">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${(criteria.score / criteria.maxScore) * 100}%` }}
                                transition={{ duration: 1, delay: index * 0.1 }}
                                className="h-full rounded-full"
                                style={{
                                    background: criteria.color.includes('blue')
                                        ? 'linear-gradient(to right, #3B82F6, #60A5FA)'
                                        : 'linear-gradient(to right, #10B981, #34D399)',
                                }}
                            />
                        </div>

                        {/* Current Level Description */}
                        <div className="p-2 rounded-lg bg-white/60 border border-white/50">
                            <div className="flex items-center gap-1 mb-1">
                                <Badge variant="outline" className={`${criteria.color} bg-white font-bold text-xs`}>
                                    Level {Math.round(criteria.score)}
                                </Badge>
                            </div>
                            <p className="text-xs text-slate-600">
                                {getCurrentLevel(criteria.score, criteria.rubricLevels).description}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Reference */}
            <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 mb-4">
                <BookOpen className="w-4 h-4 text-slate-400" />
                <span className="text-xs text-slate-500">
                    อ้างอิง: AAC&U Valid Assessment of Learning in Undergraduate Education (VALUE) Rubrics
                </span>
            </div>

            {/* Weight Info */}
            <div className="flex items-center justify-center gap-6 p-3 rounded-xl bg-gradient-to-r from-indigo-50 to-pink-50">
                <div className="text-center">
                    <div className="text-lg font-bold text-indigo-600">{professorWeight}%</div>
                    <div className="text-xs text-slate-500">อาจารย์</div>
                </div>
                <div className="w-px h-8 bg-slate-200" />
                <div className="text-center">
                    <div className="text-lg font-bold text-pink-600">{peerWeight}%</div>
                    <div className="text-xs text-slate-500">เพื่อนร่วมทีม</div>
                </div>
            </div>

            {/* Feedback History */}
            {feedbackHistory.length > 0 && (
                <div className="pt-4 mt-4 border-t border-slate-100">
                    <h4 className="text-sm font-semibold text-slate-700 mb-3">ประวัติ Feedback</h4>
                    <div className="space-y-2">
                        {feedbackHistory.slice(0, 3).map((feedback, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 + index * 0.1 }}
                                className="flex items-center justify-between p-3 rounded-xl bg-slate-50"
                            >
                                <div>
                                    <div className="font-medium text-slate-800 text-sm">{feedback.projectName}</div>
                                    <div className="text-xs text-slate-500">{feedback.date}</div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="text-center">
                                        <div className="text-sm font-bold text-blue-600">{feedback.communicationScore}</div>
                                        <div className="text-[10px] text-slate-400">Com.</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-sm font-bold text-emerald-600">{feedback.opennessScore}</div>
                                        <div className="text-[10px] text-slate-400">Open.</div>
                                    </div>
                                    <Badge variant="secondary" className="text-xs">
                                        💬 {feedback.comments}
                                    </Badge>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}
        </motion.div>
    );
}
