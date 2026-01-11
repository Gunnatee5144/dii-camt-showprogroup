import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import { 
  User, Briefcase, Award, Code, Download, Share2, Edit, Plus,
  Github, Linkedin, Globe, Mail, Phone, MapPin, Calendar,
  ExternalLink, Trophy, GraduationCap, Target, BookOpen
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  mockStudent, 
  mockProjects, 
  mockCertificates, 
  mockAchievements,
  getProjectsByStudentId, 
  getCertificatesByStudentId, 
  getAchievementsByStudentId 
} from '@/lib/mockData';

export default function Portfolio() {
  const { user } = useAuth();

  if (user?.role !== 'student') {
    return (
      <div className="p-6">
        <Card>
          <CardHeader>
            <CardTitle>Portfolio</CardTitle>
            <CardDescription>หน้านี้สำหรับนักศึกษาเท่านั้น</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  const projects = getProjectsByStudentId(mockStudent.id);
  const certificates = getCertificatesByStudentId(mockStudent.id);
  const achievements = getAchievementsByStudentId(mockStudent.id);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Portfolio & CV</h1>
          <p className="text-gray-600 mt-1">สร้างและจัดการโปรไฟล์ของคุณ</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Share2 className="w-4 h-4 mr-2" />
            แชร์
          </Button>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            ดาวน์โหลด CV
          </Button>
        </div>
      </div>

      {/* Profile Header Card */}
      <Card className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
              <AvatarFallback className="text-4xl bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                {mockStudent.nameThai.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-3xl font-bold">{mockStudent.nameThai}</h2>
                  <p className="text-lg text-gray-700 mt-1">{mockStudent.name}</p>
                  <p className="text-gray-600 mt-1">{mockStudent.major}</p>
                </div>
                <Button variant="outline" size="sm">
                  <Edit className="w-4 h-4 mr-2" />
                  แก้ไข
                </Button>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                <div>
                  <p className="text-sm text-gray-600">รหัสนักศึกษา</p>
                  <p className="font-semibold">{mockStudent.studentId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">ชั้นปีที่</p>
                  <p className="font-semibold">{mockStudent.year}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">GPAX</p>
                  <p className="font-semibold">{mockStudent.gpax.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">หน่วยกิต</p>
                  <p className="font-semibold">{mockStudent.earnedCredits}/{mockStudent.totalCredits}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                <Button variant="outline" size="sm">
                  <Mail className="w-4 h-4 mr-2" />
                  {mockStudent.email}
                </Button>
                <Button variant="outline" size="sm">
                  <Phone className="w-4 h-4 mr-2" />
                  {mockStudent.phone}
                </Button>
                <Button variant="outline" size="sm">
                  <Github className="w-4 h-4 mr-2" />
                  GitHub
                </Button>
                <Button variant="outline" size="sm">
                  <Linkedin className="w-4 h-4 mr-2" />
                  LinkedIn
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Code className="w-4 h-4" />
              โปรเจค
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{projects.length}</div>
            <p className="text-sm text-gray-600 mt-1">โปรเจคทั้งหมด</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Award className="w-4 h-4" />
              ใบรับรอง
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{certificates.length}</div>
            <p className="text-sm text-gray-600 mt-1">ใบรับรองทั้งหมด</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              ผลงาน
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{achievements.length}</div>
            <p className="text-sm text-gray-600 mt-1">ความสำเร็จ</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Target className="w-4 h-4" />
              ทักษะ
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{mockStudent.skills.length}</div>
            <p className="text-sm text-gray-600 mt-1">ทักษะทั้งหมด</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="about" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="about">เกี่ยวกับ</TabsTrigger>
          <TabsTrigger value="skills">ทักษะ</TabsTrigger>
          <TabsTrigger value="projects">โปรเจค</TabsTrigger>
          <TabsTrigger value="certificates">ใบรับรอง</TabsTrigger>
          <TabsTrigger value="achievements">ผลงาน</TabsTrigger>
        </TabsList>

        <TabsContent value="about">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>เกี่ยวกับฉัน</CardTitle>
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4 mr-2" />
                    แก้ไข
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    ชีวประวัติ
                  </h3>
                  <p className="text-gray-700">
                    นักศึกษาสาขา {mockStudent.major} ชั้นปีที่ {mockStudent.year} มหาวิทยาลัยเชียงใหม่ 
                    มีความสนใจในด้าน Software Development, UX/UI Design และ Data Analysis 
                    มุ่งมั่นที่จะพัฒนาทักษะและประสบการณ์เพื่อเป็นนักพัฒนาที่มีความสามารถรอบด้าน
                  </p>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <GraduationCap className="w-4 h-4" />
                    การศึกษา
                  </h3>
                  <div className="space-y-3">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <GraduationCap className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold">ปริญญาตรี - {mockStudent.major}</h4>
                        <p className="text-sm text-gray-600">มหาวิทยาลัยเชียงใหม่</p>
                        <p className="text-sm text-gray-500">2564 - ปัจจุบัน • GPAX: {mockStudent.gpax.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    เป้าหมาย
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>พัฒนาทักษะด้าน Full-Stack Development</li>
                    <li>ได้รับประสบการณ์ฝึกงานในบริษัทชั้นนำ</li>
                    <li>สร้างผลงานและ Portfolio ที่โดดเด่น</li>
                    <li>ศึกษาต่อระดับปริญญาโทในอนาคต</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="skills">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>ทักษะและความสามารถ</CardTitle>
                  <Button variant="outline" size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    เพิ่มทักษะ
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {['programming', 'framework', 'soft_skill'].map(category => {
                    const categorySkills = mockStudent.skills.filter(s => s.category === category);
                    if (categorySkills.length === 0) return null;
                    
                    const categoryName = {
                      programming: 'การเขียนโปรแกรม',
                      framework: 'Framework & Tools',
                      soft_skill: 'Soft Skills'
                    }[category];

                    return (
                      <div key={category}>
                        <h3 className="font-semibold mb-3">{categoryName}</h3>
                        <div className="space-y-3">
                          {categorySkills.map((skill, idx) => {
                            const levelPercentage = {
                              beginner: 33,
                              intermediate: 66,
                              advanced: 100
                            }[skill.level];

                            const levelColor = {
                              beginner: 'bg-orange-500',
                              intermediate: 'bg-blue-500',
                              advanced: 'bg-green-500'
                            }[skill.level];

                            const levelText = {
                              beginner: 'เริ่มต้น',
                              intermediate: 'ปานกลาง',
                              advanced: 'ขั้นสูง'
                            }[skill.level];

                            return (
                              <div key={idx}>
                                <div className="flex justify-between items-center mb-2">
                                  <div className="flex items-center gap-2">
                                    <span className="font-medium">{skill.name}</span>
                                    {skill.verifiedBy && (
                                      <Badge variant="outline" className="text-xs">
                                        <Award className="w-3 h-3 mr-1" />
                                        ยืนยันโดย {skill.verifiedBy}
                                      </Badge>
                                    )}
                                  </div>
                                  <Badge className={levelColor}>{levelText}</Badge>
                                </div>
                                <Progress value={levelPercentage} className="h-2" />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="projects">
          <div className="grid gap-4">
            {projects.map(project => (
              <Card key={project.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge>{project.type === 'course_project' ? 'โปรเจครายวิชา' : 
                               project.type === 'personal_project' ? 'โปรเจคส่วนตัว' : 
                               'Hackathon'}</Badge>
                        <Badge variant="outline">{project.status === 'completed' ? 'เสร็จสิ้น' : 'กำลังดำเนินการ'}</Badge>
                      </div>
                      <CardTitle className="text-xl">{project.titleThai}</CardTitle>
                      <CardDescription className="mt-2">{project.descriptionThai}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, idx) => (
                      <Badge key={idx} variant="outline">{tech}</Badge>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">บทบาท</p>
                      <p className="font-medium">{project.role}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">ทีม</p>
                      <p className="font-medium">{project.teamSize} คน</p>
                    </div>
                    <div>
                      <p className="text-gray-600">ระยะเวลา</p>
                      <p className="font-medium">
                        {project.startDate.toLocaleDateString('th-TH', { month: 'short', year: 'numeric' })} - 
                        {project.endDate.toLocaleDateString('th-TH', { month: 'short', year: 'numeric' })}
                      </p>
                    </div>
                  </div>

                  {project.achievements && project.achievements.length > 0 && (
                    <div className="bg-yellow-50 p-3 rounded-lg">
                      <p className="font-semibold text-sm mb-2 flex items-center gap-2">
                        <Trophy className="w-4 h-4 text-yellow-600" />
                        ความสำเร็จ
                      </p>
                      <ul className="list-disc list-inside text-sm space-y-1">
                        {project.achievements.map((ach, idx) => (
                          <li key={idx}>{ach}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="flex gap-2">
                    {project.githubUrl && (
                      <Button variant="outline" size="sm">
                        <Github className="w-4 h-4 mr-2" />
                        GitHub
                        <ExternalLink className="w-3 h-3 ml-1" />
                      </Button>
                    )}
                    {project.demoUrl && (
                      <Button variant="outline" size="sm">
                        <Globe className="w-4 h-4 mr-2" />
                        Demo
                        <ExternalLink className="w-3 h-3 ml-1" />
                      </Button>
                    )}
                    <Button variant="outline" size="sm" className="ml-auto">
                      <Edit className="w-4 h-4 mr-2" />
                      แก้ไข
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="certificates">
          <div className="grid md:grid-cols-2 gap-4">
            {certificates.map(cert => (
              <Card key={cert.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center flex-shrink-0">
                      <Award className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{cert.title}</CardTitle>
                      <CardDescription className="mt-1">{cert.issuer}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                      <span className="text-gray-600">วันที่ออก:</span>
                      <span className="font-medium">{cert.issueDate.toLocaleDateString('th-TH')}</span>
                    </div>
                    {cert.expiryDate && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">หมดอายุ:</span>
                        <span className="font-medium">{cert.expiryDate.toLocaleDateString('th-TH')}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-600">Credential ID:</span>
                      <span className="font-medium text-xs">{cert.credentialId}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {cert.skills.map((skill, idx) => (
                      <Badge key={idx} variant="outline">{skill}</Badge>
                    ))}
                  </div>

                  <Button variant="outline" className="w-full" size="sm">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    ดูใบรับรอง
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="achievements">
          <div className="grid gap-4">
            {achievements.map(achievement => (
              <Card key={achievement.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center flex-shrink-0">
                      <Trophy className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-xl font-bold">{achievement.titleThai}</h3>
                          <p className="text-gray-600 mt-1">{achievement.description}</p>
                        </div>
                        <Badge>{achievement.category === 'competition' ? 'แข่งขัน' : 
                               achievement.category === 'academic' ? 'วิชาการ' : 'โปรเจค'}</Badge>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-600 mt-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{achievement.date.toLocaleDateString('th-TH')}</span>
                        </div>
                        <div>
                          <span>จัดโดย: {achievement.organizer}</span>
                        </div>
                      </div>

                      {achievement.award && (
                        <div className="bg-yellow-50 p-3 rounded-lg mt-3">
                          <p className="font-semibold text-sm flex items-center gap-2">
                            <Award className="w-4 h-4 text-yellow-600" />
                            รางวัล: {achievement.award}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
