import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    User, Calendar, GraduationCap, Sparkles, ChevronRight,
    Mail, Phone, MapPin, Award
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Timetable } from '@/components/common/Timetable';
import { DegreeProgressCard } from '@/components/dashboard/DegreeProgressCard';
import { GPAHistoryCard } from '@/components/dashboard/GPAHistoryCard';
import { TechnicalSkillsCard } from '@/components/dashboard/TechnicalSkillsCard';
import { SoftSkillsCard } from '@/components/dashboard/SoftSkillsCard';
import { CourseGradesCard } from '@/components/dashboard/CourseGradesCard';
import { mockStudent, mockCourses, mockGrades, getStudentGrades } from '@/lib/mockData';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 100 } },
};

// Mock data for GPA History
const semesterGPAHistory = [
    { semester: '1/2565', gpa: 3.25, credits: 18 },
    { semester: '2/2565', gpa: 3.35, credits: 21 },
    { semester: '1/2566', gpa: 3.48, credits: 18 },
    { semester: '2/2566', gpa: 3.52, credits: 21 },
    { semester: '1/2567', gpa: 3.65, credits: 18 },
    { semester: '2/2567', gpa: 3.45, credits: 21 },
];

// Mock data for Soft Skills (from Peer Feedback)
const softSkillScores = {
    leadership: 4.2,
    discipline: 4.5,
    responsibility: 4.8,
    communication: 4.0,
};

const peerFeedbacks = [
    { projectName: 'Capstone Project', teamSize: 5, averageScore: 4.6, date: '15 ม.ค. 68' },
    { projectName: 'UX Design Workshop', teamSize: 4, averageScore: 4.3, date: '20 พ.ย. 67' },
    { projectName: 'Hackathon 2026', teamSize: 4, averageScore: 4.8, date: '10 มี.ค. 67' },
];

// Mock data for Technical Skills Activities
const technicalActivities = [
    { name: 'CAMT Hackathon 2026', type: 'แข่งขัน', date: 'มี.ค. 67' },
    { name: 'React Workshop', type: 'อบรม', date: 'ก.พ. 67' },
    { name: 'UX Design Bootcamp', type: 'อบรม', date: 'ม.ค. 67' },
];

// Transform grades for CourseGradesCard
const transformGradesForCard = () => {
    const studentGrades = getStudentGrades(mockStudent.id);
    return studentGrades.map(grade => {
        const course = mockCourses.find(c => c.id === grade.courseId);
        return {
            courseId: grade.courseId,
            courseCode: course?.code || '',
            courseName: course?.nameThai || course?.name || '',
            credits: course?.credits || 0,
            letterGrade: grade.letterGrade || 'I',
            semester: `${course?.semester}/${course?.academicYear}` || '1/2568',
            total: grade.total,
        };
    });
};

export default function PersonalDashboard() {
    const navigate = useNavigate();
    const student = mockStudent;
    const studentCourses = mockCourses.filter(c => c.enrolledStudents.includes(student.id));
    const courseGrades = transformGradesForCard();

    // Time-based greeting
    const hour = new Date().getHours();
    const greeting = hour < 12 ? 'สวัสดีตอนเช้า' : hour < 18 ? 'สวัสดีตอนบ่าย' : 'สวัสดีตอนเย็น';

    const yearLabel = ['', 'ปี 1', 'ปี 2', 'ปี 3', 'ปี 4'][student.year] || `ปี ${student.year}`;

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8 pb-10"
        >
            {/* Profile Header */}
            <motion.div
                variants={itemVariants}
                className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 text-white shadow-2xl"
            >
                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-emerald-500/10 to-teal-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

                <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8">
                    {/* Avatar */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="relative"
                    >
                        <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 p-1 shadow-xl shadow-blue-500/30">
                            <div className="w-full h-full rounded-[22px] bg-slate-800 flex items-center justify-center overflow-hidden">
                                {student.avatar ? (
                                    <img src={student.avatar} alt={student.name} className="w-full h-full object-cover" />
                                ) : (
                                    <User className="w-16 h-16 text-slate-400" />
                                )}
                            </div>
                        </div>
                        <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                            {yearLabel}
                        </div>
                    </motion.div>

                    {/* Info */}
                    <div className="flex-1 text-center lg:text-left">
                        <div className="flex items-center justify-center lg:justify-start gap-2 text-slate-400 text-sm mb-2">
                            <Sparkles className="w-4 h-4 text-yellow-500" />
                            <span>{greeting}</span>
                        </div>
                        <h1 className="text-3xl lg:text-4xl font-bold mb-2">{student.nameThai}</h1>
                        <p className="text-slate-400 mb-4">{student.name}</p>

                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm text-slate-300">
                            <div className="flex items-center gap-2">
                                <GraduationCap className="w-4 h-4 text-blue-400" />
                                <span>{student.major}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-emerald-400" />
                                <span>ภาคเรียน {student.semester}/{student.academicYear}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Award className="w-4 h-4 text-yellow-400" />
                                <span>{student.gamificationPoints} XP</span>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mt-4">
                            <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                                รหัสนักศึกษา: {student.studentId}
                            </Badge>
                            <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
                                GPAX: {student.gpax.toFixed(2)}
                            </Badge>
                            {student.academicStatus === 'normal' && (
                                <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                                    สถานะ: ปกติ
                                </Badge>
                            )}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="flex flex-col gap-3">
                        <Button
                            onClick={() => navigate('/portfolio')}
                            className="bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl"
                        >
                            <User className="w-4 h-4 mr-2" />
                            ดู Portfolio
                        </Button>
                        <Button
                            onClick={() => navigate('/settings')}
                            variant="ghost"
                            className="text-slate-300 hover:text-white hover:bg-white/10 rounded-xl"
                        >
                            แก้ไขโปรไฟล์
                        </Button>
                    </div>
                </div>
            </motion.div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - 2/3 */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Class Schedule */}
                    <motion.div variants={itemVariants}>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-purple-500" />
                                ตารางเรียน
                            </h2>
                            <Button
                                variant="ghost"
                                onClick={() => navigate('/schedule')}
                                className="text-slate-500 hover:text-purple-600"
                            >
                                ดูเต็มจอ <ChevronRight className="w-4 h-4 ml-1" />
                            </Button>
                        </div>
                        <div className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-3xl p-6 shadow-sm">
                            <Timetable
                                courses={studentCourses}
                                semester={student.semester}
                                academicYear={student.academicYear}
                            />
                        </div>
                    </motion.div>

                    {/* GPA History */}
                    <motion.div variants={itemVariants}>
                        <GPAHistoryCard
                            semesterHistory={semesterGPAHistory}
                            currentGPA={student.gpa}
                            gpax={student.gpax}
                        />
                    </motion.div>

                    {/* Course Grades */}
                    <motion.div variants={itemVariants}>
                        <CourseGradesCard
                            grades={courseGrades}
                            currentSemester={`${student.semester}/${student.academicYear}`}
                        />
                    </motion.div>
                </div>

                {/* Right Column - 1/3 */}
                <div className="space-y-8">
                    {/* Degree Progress */}
                    <motion.div variants={itemVariants}>
                        <DegreeProgressCard
                            totalCredits={student.totalCredits}
                            earnedCredits={student.earnedCredits}
                            registeredCredits={studentCourses.reduce((sum, c) => sum + c.credits, 0)}
                            requiredCredits={student.requiredCredits || student.totalCredits}
                        />
                    </motion.div>

                    {/* Technical Skills */}
                    <motion.div variants={itemVariants}>
                        <TechnicalSkillsCard
                            skills={student.skills}
                            activities={technicalActivities}
                        />
                    </motion.div>

                    {/* Soft Skills */}
                    <motion.div variants={itemVariants}>
                        <SoftSkillsCard
                            leadership={softSkillScores.leadership}
                            discipline={softSkillScores.discipline}
                            responsibility={softSkillScores.responsibility}
                            communication={softSkillScores.communication}
                            peerFeedbacks={peerFeedbacks}
                        />
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}
