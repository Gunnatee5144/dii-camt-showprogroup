import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import { 
  Briefcase, Building, MapPin, Calendar, Clock, Send, FileText, CheckCircle,
  DollarSign, Users, TrendingUp, Filter, Search, ExternalLink, Heart,
  Bookmark, AlertCircle, Upload, Eye
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { mockJobPostings, mockStudent, mockInternships } from '@/lib/mockData';

export default function Internships() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedJob, setSelectedJob] = React.useState<string | null>(null);
  const [savedJobs, setSavedJobs] = React.useState<string[]>([]);

  const appliedJobs = mockJobPostings.filter(job => 
    job.applicants && job.applicants.some(app => app.studentId === mockStudent.id)
  );

  const filteredJobs = searchQuery
    ? mockJobPostings.filter(job =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : mockJobPostings;

  const toggleSaveJob = (jobId: string) => {
    setSavedJobs(prev => 
      prev.includes(jobId) ? prev.filter(id => id !== jobId) : [...prev, jobId]
    );
  };

  if (selectedJob) {
    const job = mockJobPostings.find(j => j.id === selectedJob);
    if (!job) return null;

    const hasApplied = job.applicants?.some(app => app.studentId === mockStudent.id);
    const isSaved = savedJobs.includes(job.id);

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-6 space-y-6"
      >
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => setSelectedJob(null)}>
            ← กลับ
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{job.title}</h1>
            <p className="text-gray-600">{job.companyName}</p>
          </div>
          <Button
            variant="outline"
            onClick={() => toggleSaveJob(job.id)}
          >
            <Bookmark className={`w-4 h-4 mr-2 ${isSaved ? 'fill-current' : ''}`} />
            {isSaved ? 'บันทึกแล้ว' : 'บันทึก'}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                    <Building className="w-10 h-10 text-white" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-2xl">{job.title}</CardTitle>
                    <CardDescription className="text-lg mt-1">{job.companyName}</CardDescription>
                    <div className="flex gap-2 mt-3">
                      <Badge>{job.type === 'internship' ? 'ฝึกงาน' : 'งานเต็มเวลา'}</Badge>
                      <Badge variant="outline">{job.workType === 'onsite' ? 'ทำงานที่สำนักงาน' : job.workType === 'remote' ? 'ทำงานที่บ้าน' : 'แบบผสม'}</Badge>
                      <Badge variant={job.status === 'open' ? 'default' : 'secondary'}>
                        {job.status === 'open' ? 'เปิดรับ' : 'ปิดรับ'}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-2">เกี่ยวกับตำแหน่ง</h3>
                  <p className="text-gray-700">{job.description}</p>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold text-lg mb-3">หน้าที่ความรับผิดชอบ</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    {job.responsibilities.map((resp, idx) => (
                      <li key={idx}>{resp}</li>
                    ))}
                  </ul>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold text-lg mb-3">คุณสมบัติที่ต้องการ</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    {job.requirements.map((req, idx) => (
                      <li key={idx}>{req}</li>
                    ))}
                  </ul>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold text-lg mb-3">ทักษะที่ต้องการ</h3>
                  <div className="flex flex-wrap gap-2">
                    {job.preferredSkills.map((skill, idx) => (
                      <Badge key={idx} variant="outline">{skill}</Badge>
                    ))}
                  </div>
                </div>

                {job.benefits && job.benefits.length > 0 && (
                  <>
                    <Separator />
                    <div>
                      <h3 className="font-semibold text-lg mb-3">สวัสดิการ</h3>
                      <ul className="list-disc list-inside space-y-2 text-gray-700">
                        {job.benefits.map((benefit, idx) => (
                          <li key={idx}>{benefit}</li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {!hasApplied && (
              <Card>
                <CardHeader>
                  <CardTitle>สมัครงาน</CardTitle>
                  <CardDescription>กรอกข้อมูลเพื่อสมัครตำแหน่งนี้</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">จดหมายสมัครงาน</label>
                    <Textarea placeholder="เขียนจดหมายสมัครงาน..." rows={6} className="mt-2" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">แนบเอกสาร (Resume, Portfolio)</label>
                    <Input type="file" className="mt-2" />
                  </div>
                  <Button className="w-full" size="lg">
                    <Send className="w-4 h-4 mr-2" />
                    ส่งใบสมัคร
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">รายละเอียดเพิ่มเติม</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">สถานที่</p>
                    <p className="text-gray-600">{job.location}</p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">วันที่เริ่มงาน</p>
                    <p className="text-gray-600">{job.startDate.toLocaleDateString('th-TH')}</p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">ปิดรับสมัคร</p>
                    <p className="text-gray-600">{job.deadline.toLocaleDateString('th-TH')}</p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">จำนวนที่รับ</p>
                    <p className="text-gray-600">{job.positions} ตำแหน่ง</p>
                  </div>
                </div>
                {job.salary && (
                  <>
                    <Separator />
                    <div className="flex items-start gap-3">
                      <DollarSign className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">ค่าตอบแทน</p>
                        <p className="font-semibold text-green-600">{job.salary}</p>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {hasApplied && (
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-3">
                    <CheckCircle className="w-6 h-6 text-blue-600" />
                    <p className="font-semibold text-blue-900">คุณได้สมัครแล้ว</p>
                  </div>
                  <p className="text-sm text-blue-800">สถานะ: รอการพิจารณา</p>
                  <Button variant="outline" className="w-full mt-4" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    ดูใบสมัคร
                  </Button>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle className="text-base">ผู้สมัครอื่นๆ</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">จำนวนผู้สมัคร</span>
                    <span className="font-semibold">{job.applicants?.length || 0} คน</span>
                  </div>
                  <Progress value={((job.applicants?.length || 0) / job.positions) * 100} />
                  <p className="text-xs text-gray-500 mt-2">
                    {job.positions - (job.applicants?.length || 0)} ตำแหน่งที่เหลือ
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">การฝึกงาน</h1>
          <p className="text-gray-600 mt-1">ค้นหาและสมัครฝึกงาน</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            กรอง
          </Button>
        </div>
      </div>

      {user?.role === 'student' && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                ตำแหน่งทั้งหมด
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{mockJobPostings.length}</div>
              <p className="text-sm text-gray-600 mt-1">ตำแหน่งเปิดรับ</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-600" />
                สมัครแล้ว
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">{appliedJobs.length}</div>
              <p className="text-sm text-gray-600 mt-1">ตำแหน่ง</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Clock className="w-4 h-4 text-orange-600" />
                รอผล
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600">
                {appliedJobs.filter(j => j.applicants?.some(a => a.status === 'pending')).length}
              </div>
              <p className="text-sm text-gray-600 mt-1">ตำแหน่ง</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                ได้รับ
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                {appliedJobs.filter(j => j.applicants?.some(a => a.status === 'approved')).length}
              </div>
              <p className="text-sm text-gray-600 mt-1">ตำแหน่ง</p>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          placeholder="ค้นหาตำแหน่งงาน, บริษัท, หรือสถานที่..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      <Tabs defaultValue="available" className="space-y-4">
        <TabsList>
          <TabsTrigger value="available">ตำแหน่งเปิดรับ ({filteredJobs.length})</TabsTrigger>
          <TabsTrigger value="applied">ที่สมัครแล้ว ({appliedJobs.length})</TabsTrigger>
          <TabsTrigger value="saved">บันทึกไว้ ({savedJobs.length})</TabsTrigger>
          {user?.role === 'student' && <TabsTrigger value="my-internship">การฝึกงานของฉัน</TabsTrigger>}
        </TabsList>

        <TabsContent value="available" className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {filteredJobs.map(job => {
              const hasApplied = job.applicants?.some(app => app.studentId === mockStudent.id);
              const isSaved = savedJobs.includes(job.id);
              
              return (
                <Card key={job.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                          <Building className="w-8 h-8 text-white" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-xl">{job.title}</CardTitle>
                          <CardDescription className="mt-1 text-base">{job.companyName}</CardDescription>
                          <div className="flex gap-2 mt-2">
                            <Badge>{job.type === 'internship' ? 'ฝึกงาน' : 'งานเต็มเวลา'}</Badge>
                            <Badge variant="outline">{job.workType === 'onsite' ? 'ที่สำนักงาน' : job.workType === 'remote' ? 'ทำงานที่บ้าน' : 'แบบผสม'}</Badge>
                            {hasApplied && <Badge className="bg-blue-600">สมัครแล้ว</Badge>}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Badge variant={job.status === 'open' ? 'default' : 'secondary'}>
                          {job.status === 'open' ? 'เปิดรับ' : 'ปิดรับ'}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleSaveJob(job.id)}
                        >
                          <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current text-yellow-500' : ''}`} />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-700 line-clamp-2">{job.description}</p>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>เริ่ม {job.startDate.toLocaleDateString('th-TH', { month: 'short', year: 'numeric' })}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>{job.positions} อัตรา</span>
                      </div>
                      {job.salary && (
                        <div className="flex items-center gap-2 text-green-600 font-semibold">
                          <DollarSign className="w-4 h-4" />
                          <span>{job.salary}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {job.preferredSkills.slice(0, 5).map((skill, idx) => (
                        <Badge key={idx} variant="outline">{skill}</Badge>
                      ))}
                      {job.preferredSkills.length > 5 && (
                        <Badge variant="outline">+{job.preferredSkills.length - 5}</Badge>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        className="flex-1"
                        onClick={() => setSelectedJob(job.id)}
                      >
                        ดูรายละเอียด
                      </Button>
                      {!hasApplied && job.status === 'open' && (
                        <Button variant="outline">
                          <Send className="w-4 h-4 mr-2" />
                          สมัครเลย
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="applied" className="space-y-4">
          {appliedJobs.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {appliedJobs.map(job => {
                const application = job.applicants?.find(app => app.studentId === mockStudent.id);
                return (
                  <Card key={job.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle>{job.title}</CardTitle>
                          <CardDescription className="mt-1">{job.companyName}</CardDescription>
                        </div>
                        <Badge 
                          variant={
                            application?.status === 'approved' ? 'default' :
                            application?.status === 'rejected' ? 'destructive' :
                            'secondary'
                          }
                        >
                          {application?.status === 'approved' ? 'ผ่าน' :
                           application?.status === 'rejected' ? 'ไม่ผ่าน' :
                           'รอผล'}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="text-sm space-y-1">
                        <div className="flex justify-between">
                          <span className="text-gray-600">วันที่สมัคร:</span>
                          <span className="font-medium">
                            {application?.appliedAt.toLocaleDateString('th-TH')}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">สถานะ:</span>
                          <span className="font-medium">
                            {application?.status === 'pending' ? 'กำลังพิจารณา' :
                             application?.status === 'approved' ? 'ผ่านการพิจารณา' :
                             'ไม่ผ่านการพิจารณา'}
                          </span>
                        </div>
                      </div>
                      <Button variant="outline" className="w-full" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        ดูรายละเอียด
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <Card>
              <CardContent className="py-12 text-center text-gray-500">
                <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>ยังไม่มีการสมัครงาน</p>
                <Button className="mt-4" onClick={() => {}}>
                  เริ่มค้นหาตำแหน่งงาน
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="saved" className="space-y-4">
          {savedJobs.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {mockJobPostings.filter(j => savedJobs.includes(j.id)).map(job => (
                <Card key={job.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>{job.title}</CardTitle>
                        <CardDescription className="mt-1">{job.companyName}</CardDescription>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleSaveJob(job.id)}
                      >
                        <Bookmark className="w-4 h-4 fill-current text-yellow-500" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => setSelectedJob(job.id)}
                    >
                      ดูรายละเอียด
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-12 text-center text-gray-500">
                <Bookmark className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>ยังไม่มีตำแหน่งที่บันทึกไว้</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {user?.role === 'student' && (
          <TabsContent value="my-internship" className="space-y-4">
            {mockInternships.length > 0 ? (
              mockInternships.map(internship => (
                <Card key={internship.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>{internship.position}</CardTitle>
                        <CardDescription className="mt-1">{internship.companyName}</CardDescription>
                      </div>
                      <Badge variant={
                        internship.status === 'completed' ? 'default' :
                        internship.status === 'in_progress' ? 'secondary' :
                        'outline'
                      }>
                        {internship.status === 'completed' ? 'เสร็จสิ้น' :
                         internship.status === 'in_progress' ? 'กำลังฝึกงาน' :
                         'ยังไม่เริ่ม'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">ระยะเวลา</p>
                        <p className="font-medium">{internship.duration} เดือน</p>
                      </div>
                      <div>
                        <p className="text-gray-600">เริ่มต้น</p>
                        <p className="font-medium">{internship.startMonth}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">พี่เลี้ยง</p>
                        <p className="font-medium">{internship.supervisor}</p>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full">
                      ดูรายละเอียด
                    </Button>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="py-12 text-center text-gray-500">
                  <Briefcase className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>ยังไม่มีข้อมูลการฝึกงาน</p>
                  <p className="text-sm mt-2">เมื่อคุณได้รับการตอบรับจากบริษัท ข้อมูลจะปรากฏที่นี่</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        )}
      </Tabs>
    </motion.div>
  );
}
