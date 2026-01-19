import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Search, Filter, Eye, Mail, Star, Code, Award, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ThemedPageHeader } from '@/components/common/ThemedPageHeader';
import { mockStudents, mockCompany } from '@/lib/mockData';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

export default function StudentProfiles() {
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
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
            <ThemedPageHeader
                title="โปรไฟล์นักศึกษา"
                subtitle={`${accessibleStudents.length} คนที่อนุญาตให้ดูโปรไฟล์`}
                icon={<GraduationCap className="w-7 h-7" />}
            />

            <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: 'ดูได้ทั้งหมด', value: accessibleStudents.length, gradient: 'from-blue-500 to-indigo-500', icon: GraduationCap },
                    { label: 'GPA 3.5+', value: accessibleStudents.filter(s => s.gpa >= 3.5).length, gradient: 'from-emerald-500 to-teal-500', icon: Star },
                    { label: 'มี Skills', value: accessibleStudents.filter(s => s.skills.length >= 3).length, gradient: 'from-purple-500 to-pink-500', icon: Code },
                    { label: 'ได้รับ Badge', value: accessibleStudents.filter(s => s.badges.length > 0).length, gradient: 'from-orange-500 to-amber-500', icon: Award },
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
                <div className="flex flex-col sm:flex-row gap-4 mb-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input placeholder="ค้นหานักศึกษา..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
                    </div>
                    <Select value={yearFilter} onValueChange={setYearFilter}>
                        <SelectTrigger className="w-32"><SelectValue placeholder="ชั้นปี" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">ทุกชั้นปี</SelectItem>
                            <SelectItem value="3">ปี 3</SelectItem>
                            <SelectItem value="4">ปี 4</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select value={skillFilter} onValueChange={setSkillFilter}>
                        <SelectTrigger className="w-40"><SelectValue placeholder="ทักษะ" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">ทุกทักษะ</SelectItem>
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
                            <Card className="h-full hover:shadow-lg transition-all cursor-pointer group">
                                <CardContent className="pt-6">
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                                            {student.nameThai.charAt(0)}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">{student.nameThai}</h3>
                                            <p className="text-sm text-gray-600">{student.major}</p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <Badge variant="outline">ปี {student.year}</Badge>
                                                <Badge className={student.gpa >= 3.5 ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'}>
                                                    GPA {student.gpa.toFixed(2)}
                                                </Badge>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <div className="text-sm text-gray-600 mb-2">ทักษะ</div>
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
                                        <Button size="sm" className="flex-1"><Eye className="w-4 h-4 mr-1" />ดูโปรไฟล์</Button>
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
