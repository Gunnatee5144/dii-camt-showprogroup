import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Palette, Server, Users, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { Skill } from '@/types';

interface CareerPath {
    id: string;
    name: string;
    nameThai: string;
    icon: React.ElementType;
    color: string;
    bgColor: string;
    gradientFrom: string;
    gradientTo: string;
}

interface TechnicalSkillsProps {
    skills: Skill[];
    activities?: {
        name: string;
        type: string;
        date: string;
    }[];
}

const careerPaths: CareerPath[] = [
    {
        id: 'uiux',
        name: 'UI/UX',
        nameThai: 'UI/UX Design',
        icon: Palette,
        color: 'text-pink-600',
        bgColor: 'bg-pink-50',
        gradientFrom: 'from-pink-500',
        gradientTo: 'to-rose-500',
    },
    {
        id: 'frontend',
        name: 'Frontend',
        nameThai: 'Frontend Development',
        icon: Code2,
        color: 'text-blue-600',
        bgColor: 'bg-blue-50',
        gradientFrom: 'from-blue-500',
        gradientTo: 'to-indigo-500',
    },
    {
        id: 'backend',
        name: 'Backend',
        nameThai: 'Backend Development',
        icon: Server,
        color: 'text-emerald-600',
        bgColor: 'bg-emerald-50',
        gradientFrom: 'from-emerald-500',
        gradientTo: 'to-teal-500',
    },
    {
        id: 'pm',
        name: 'PM',
        nameThai: 'Project Management',
        icon: Users,
        color: 'text-violet-600',
        bgColor: 'bg-violet-50',
        gradientFrom: 'from-violet-500',
        gradientTo: 'to-purple-500',
    },
];

const skillToCareerPath: Record<string, string[]> = {
    'uiux': ['UI/UX Design', 'Figma', 'Adobe XD', 'Design Thinking', 'User Research'],
    'frontend': ['React', 'Vue.js', 'JavaScript', 'TypeScript', 'HTML', 'CSS', 'Tailwind CSS'],
    'backend': ['Python', 'Node.js', 'Java', 'SQL', 'MongoDB', 'API Design', 'Machine Learning'],
    'pm': ['Agile', 'Scrum', 'JIRA', 'Communication', 'Leadership'],
};

const getLevelColor = (level: string) => {
    switch (level) {
        case 'expert': return 'bg-violet-100 text-violet-700 border-violet-200';
        case 'advanced': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
        case 'intermediate': return 'bg-blue-100 text-blue-700 border-blue-200';
        default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
};

const getLevelLabel = (level: string) => {
    switch (level) {
        case 'expert': return 'Expert';
        case 'advanced': return 'Advanced';
        case 'intermediate': return 'Intermediate';
        default: return 'Beginner';
    }
};

export function TechnicalSkillsCard({ skills, activities = [] }: TechnicalSkillsProps) {
    // Group skills by career path
    const groupedSkills = careerPaths.map(path => ({
        ...path,
        skills: skills.filter(skill =>
            skillToCareerPath[path.id]?.some(s =>
                skill.name.toLowerCase().includes(s.toLowerCase())
            )
        ),
    }));

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-3xl p-6 shadow-sm"
        >
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-lg shadow-orange-500/20">
                    <Code2 className="w-5 h-5" />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-slate-800">Technical Skills</h3>
                    <p className="text-sm text-slate-500">ทักษะตามสายงาน</p>
                </div>
            </div>

            {/* Career Path Sections */}
            <div className="space-y-4">
                {groupedSkills.map((path, pathIndex) => (
                    <motion.div
                        key={path.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: pathIndex * 0.1 }}
                        className={`p-4 rounded-2xl ${path.bgColor} border border-white/50`}
                    >
                        <div className="flex items-center gap-2 mb-3">
                            <path.icon className={`w-4 h-4 ${path.color}`} />
                            <span className={`font-semibold text-sm ${path.color}`}>{path.nameThai}</span>
                        </div>

                        {path.skills.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                                {path.skills.map((skill, skillIndex) => (
                                    <motion.div
                                        key={skill.name}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: pathIndex * 0.1 + skillIndex * 0.05 }}
                                    >
                                        <Badge
                                            variant="outline"
                                            className={`${getLevelColor(skill.level)} px-3 py-1 font-medium`}
                                        >
                                            {skill.name}
                                            <span className="ml-1.5 text-[10px] opacity-75">
                                                {getLevelLabel(skill.level)}
                                            </span>
                                        </Badge>
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-xs text-slate-400">ยังไม่มีทักษะในหมวดนี้</p>
                        )}
                    </motion.div>
                ))}
            </div>

            {/* Experience & Activities */}
            {activities.length > 0 && (
                <div className="mt-6 pt-6 border-t border-slate-100">
                    <div className="flex items-center gap-2 mb-4">
                        <Sparkles className="w-4 h-4 text-amber-500" />
                        <span className="font-semibold text-slate-700 text-sm">ประสบการณ์และกิจกรรม</span>
                    </div>
                    <div className="space-y-2">
                        {activities.slice(0, 3).map((activity, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between p-3 rounded-xl bg-slate-50"
                            >
                                <div>
                                    <div className="font-medium text-slate-800 text-sm">{activity.name}</div>
                                    <div className="text-xs text-slate-500">{activity.type}</div>
                                </div>
                                <span className="text-xs text-slate-400">{activity.date}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </motion.div>
    );
}
