import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Search, Filter, Eye, Mail, Star, Code, Award, ChevronRight, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockStudents, mockCompany } from '@/lib/mockData';
import { useLanguage } from '@/contexts/LanguageContext';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

export default function StudentProfiles() {
    const { t } = useLanguage();
    const [searchQuery, setSearchQuery] = React.useState('');
    const [yearFilter, setYearFilter] = React.useState('all');
    const [skillFilter, setSkillFilter] = React.useState('all');

    const accessibleStudents = mockStudents.filter(s =>
        s.dataConsent.allowPortfolioSharing &&
        (s.dataConsent.profileVisibility === 'public' ||
            s.dataConsent.profileVisibility === 'university' ||
            mockCompany.studentViewConsent.includes(s.id))
    );

    const filteredStudents = accessibleStudents.filter(student => {
        const matchesSearch = student.nameThai.includes(searchQuery) || student.name.includes(searchQuery);
        const matchesYear = yearFilter === 'all' || student.year.toString() === yearFilter;
        const matchesSkill = skillFilter === 'all' || student.skills.some(s => s.name.toLowerCase().includes(skillFilter.toLowerCase()));
        return matchesSearch && matchesYear && matchesSkill;
    });

    const allSkills = [...new Set(accessibleStudents.flatMap(s => s.skills.map(sk => sk.name)))];

    return (
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8 pb-10">
            {/* Header Section - Bento Grid Style */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                <div>
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-2 text-slate-500 font-medium mb-2"
                    >
                        <GraduationCap className="w-4 h-4 text-blue-500" />
                        <span>{accessibleStudents.length} {t.studentProfiles.allowedView}</span>
                    </motion.div>
                    <motion.h1
                        className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        {t.studentProfiles.title}<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">{t.studentProfiles.titleHighlight}</span>
                    </motion.h1>
                </div>
            </div>

            {/* Stats Grid - Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <motion.div
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                    className="p-6 rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-xl shadow-blue-500/20 relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2.5 rounded-xl bg-white/20 backdrop-blur-sm">
                                <GraduationCap className="w-6 h-6" />
                            </div>
                            <span className="font-medium text-white/90">{t.studentProfiles.totalAccessible}</span>
                        </div>
                        <div className="text-5xl font-bold tracking-tight">{accessibleStudents.length}</div>
                        <div className="mt-3 text-sm text-blue-100 flex items-center gap-1">
                            <Sparkles className="w-4 h-4" />
                            {t.studentProfiles.inSystem}
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                    className="p-6 rounded-3xl bg-white border border-slate-100 shadow-xl shadow-slate-100/50 relative overflow-hidden group"
                >
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2.5 rounded-xl bg-slate-100 text-slate-600 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
                                <Star className="w-6 h-6" />
                            </div>
                            <span className="font-medium text-slate-600">{t.studentProfiles.gpa35Plus}</span>
                        </div>
                        <div className="text-4xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">{accessibleStudents.filter(s => s.gpa >= 3.5).length}</div>
                        <div className="mt-3 text-sm text-slate-400">{t.studentProfiles.excellentGrades}</div>
                        <div className="absolute bottom-0 right-0 w-24 h-12 bg-gradient-to-t from-emerald-50 to-transparent" />
                    </div>
                </motion.div>

                <motion.div
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                    className="p-6 rounded-3xl bg-white border border-slate-100 shadow-xl shadow-slate-100/50 relative overflow-hidden group"
                >
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2.5 rounded-xl bg-slate-100 text-slate-600 group-hover:bg-purple-50 group-hover:text-purple-600 transition-colors">
                                <Code className="w-6 h-6" />
                            </div>
                            <span className="font-medium text-slate-600">{t.studentProfiles.hasSkills}</span>
                        </div>
                        <div className="text-4xl font-bold text-slate-900 group-hover:text-purple-600 transition-colors">{accessibleStudents.filter(s => s.skills.length >= 3).length}</div>
                        <div className="mt-3 text-sm text-slate-400">{t.studentProfiles.skills3Plus}</div>
                        <div className="absolute bottom-0 right-0 w-24 h-12 bg-gradient-to-t from-purple-50 to-transparent" />
                    </div>
                </motion.div>

                <motion.div
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                    className="p-6 rounded-3xl bg-white border border-slate-100 shadow-xl shadow-slate-100/50 relative overflow-hidden group"
                >
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2.5 rounded-xl bg-slate-100 text-slate-600 group-hover:bg-orange-50 group-hover:text-orange-600 transition-colors">
                                <Award className="w-6 h-6" />
                            </div>
                            <span className="font-medium text-slate-600">{t.studentProfiles.hasBadge}</span>
                        </div>
                        <div className="text-4xl font-bold text-slate-900 group-hover:text-orange-600 transition-colors">{accessibleStudents.filter(s => s.badges.length > 0).length}</div>
                        <div className="mt-3 text-sm text-slate-400">{t.studentProfiles.outstanding}</div>
                        <div className="absolute bottom-0 right-0 w-24 h-12 bg-gradient-to-t from-orange-50 to-transparent" />
                    </div>
                </motion.div>
            </div>

            <motion.div variants={itemVariants}>
                <div className="flex flex-col sm:flex-row gap-4 mb-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input placeholder={t.studentProfiles.searchPlaceholder} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
                    </div>
                    <Select value={yearFilter} onValueChange={setYearFilter}>
                        <SelectTrigger className="w-32"><SelectValue placeholder={t.studentProfiles.yearPlaceholder} /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">{t.studentProfiles.allYears}</SelectItem>
                            <SelectItem value="3">{t.studentProfiles.yearPrefix} 3</SelectItem>
                            <SelectItem value="4">{t.studentProfiles.yearPrefix} 4</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select value={skillFilter} onValueChange={setSkillFilter}>
                        <SelectTrigger className="w-40"><SelectValue placeholder={t.studentProfiles.skillsPlaceholder} /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">{t.studentProfiles.allSkills}</SelectItem>
                            {allSkills.slice(0, 10).map(skill => (
                                <SelectItem key={skill} value={skill}>{skill}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredStudents.map((student, index) => (
                        <motion.div
                            key={student.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ scale: 1.02 }}
                        >
                            <Card className="h-full hover:shadow-lg transition-all cursor-pointer group bg-white/60 backdrop-blur-xl border border-white/60 rounded-3xl shadow-sm">
                                <CardContent className="pt-6">
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                                            {student.nameThai.charAt(0)}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">{student.nameThai}</h3>
                                            <p className="text-sm text-gray-600">{student.major}</p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <Badge variant="outline">{t.studentProfiles.yearPrefix} {student.year}</Badge>
                                                <Badge className={student.gpa >= 3.5 ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'}>
                                                    {t.studentProfiles.gpa} {student.gpa.toFixed(2)}
                                                </Badge>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <div className="text-sm text-gray-600 mb-2">{t.studentProfiles.skillsLabel}</div>
                                        <div className="flex flex-wrap gap-1">
                                            {student.skills.slice(0, 4).map((skill, i) => (
                                                <Badge key={i} variant="secondary" className="text-xs">{skill.name}</Badge>
                                            ))}
                                            {student.skills.length > 4 && (
                                                <Badge variant="outline" className="text-xs">+{student.skills.length - 4}</Badge>
                                            )}
                                        </div>
                                    </div>

                                    {student.badges.length > 0 && (
                                        <div className="mb-4">
                                            <div className="text-sm text-gray-600 mb-2">Badges</div>
                                            <div className="flex gap-2">
                                                {student.badges.slice(0, 3).map((badge) => (
                                                    <span key={badge.id} className="text-xl" title={badge.nameThai}>{badge.icon}</span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex gap-2 pt-4 border-t">
                                        <Button size="sm" className="flex-1"><Eye className="w-4 h-4 mr-1" />{t.studentProfiles.viewProfile}</Button>
                                        <Button size="sm" variant="outline"><Mail className="w-4 h-4" /></Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </motion.div>
    );
}
