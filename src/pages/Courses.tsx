import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { BookOpen, Users, Calendar, MapPin, Filter, Search } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PageHeader } from '@/components/common/PageHeader';
import { GlassCard } from '@/components/common/GlassCard';
import { mockCourses } from '@/lib/mockData';

export default function Courses() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredCourses = searchQuery
    ? mockCourses.filter(c =>
      c.code?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.nameThai?.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : mockCourses;

  if (user?.role === 'student') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-6"
      >
        <PageHeader
          title="ลงทะเบียนและรายวิชา"
          subtitle={`ภาคเรียนที่ 1/2568 • ลงทะเบียนแล้ว ${mockCourses.length} รายวิชา`}
          icon={<BookOpen className="w-7 h-7" />}
          gradient="blue"
        />

        <Tabs defaultValue="my-courses" className="space-y-6">
          <TabsList>
            <TabsTrigger value="my-courses">รายวิชาของฉัน</TabsTrigger>
            <TabsTrigger value="registration">ลงทะเบียนเรียน</TabsTrigger>
          </TabsList>

          <TabsContent value="my-courses" className="space-y-6">
            {/* Search */}
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="ค้นหารายวิชา..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                ตัวกรอง
              </Button>
            </div>

            {/* Courses Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.slice(0, 6).map((course) => (
                <motion.div
                  key={course.id}
                  whileHover={{ scale: 1.02 }}
                  className="cursor-pointer"
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant="outline">{course.code}</Badge>
                        <Badge className="bg-blue-600">A</Badge>
                      </div>
                      <CardTitle className="text-lg">{course.name}</CardTitle>
                      <CardDescription>{course.nameThai}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          <span>อาจารย์ผู้สอน</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>จ. 09:00-12:00</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>ห้อง 301 อาคาร DII</span>
                        </div>
                      </div>
                      <div className="mt-4">
                        <div className="flex justify-between text-xs mb-1">
                          <span>ความคืบหน้า</span>
                          <span>85%</span>
                        </div>
                        <Progress value={85} />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="registration" className="space-y-6">
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-800">
                  <BookOpen className="w-5 h-5" />
                  รายวิชาแนะนำสำหรับเทอมถัดไป
                </CardTitle>
                <CardDescription className="text-blue-600">
                  ตามแผนการเรียนหลักสูตร Digital Industry Integration ชั้นปีที่ {user.year || 3}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { code: 'DII302', name: 'Advanced AI', credit: 3, reason: 'วิชาบังคับเลือก' },
                    { code: 'DII305', name: 'Software Architecture', credit: 3, reason: 'วิชาแกน' },
                    { code: 'DII391', name: 'Pre-Cooperative Education', credit: 1, reason: 'เตรียมสหกิจ' },
                  ].map((rec, idx) => (
                    <Card key={idx} className="bg-white border-blue-100 shadow-sm hover:shadow-md transition-all">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between">
                          <Badge variant="outline" className="text-blue-700 bg-blue-50 border-blue-200">{rec.code}</Badge>
                          <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-0">{rec.reason}</Badge>
                        </div>
                        <CardTitle className="text-base mt-2">{rec.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-500 mb-4">{rec.credit} หน่วยกิต</p>
                        <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700" onClick={() => toast.success(`ลงทะเบียนวิชา ${rec.code} เรียบร้อยแล้ว`)}>ลงทะเบียน</Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="flex items-center justify-between mt-8 mb-4">
              <h3 className="text-lg font-semibold">รายวิชาอื่นๆ ที่เปิดสอน</h3>
              <div className="flex gap-2">
                <Input className="w-64" placeholder="ค้นหารหัสวิชา หรือชื่อวิชา..." />
                <Button variant="outline">ค้นหา</Button>
              </div>
            </div>

            {/* Placeholder for generic course list */}
            <div className="border rounded-xl p-8 text-center text-gray-500 bg-gray-50 border-dashed">
              <BookOpen className="w-10 h-10 mx-auto mb-3 text-gray-300" />
              <p>พิมพ์คำค้นหาเพื่อดูรายวิชาที่เปิดสอนเพิ่มเติม</p>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    );
  }

  // For lecturer
  if (user?.role === 'lecturer') {
    return (
      <div className="space-y-6">
        <PageHeader
          title="รายวิชาที่สอน"
          subtitle="ภาคเรียนที่ 1/2567"
          icon={<BookOpen className="w-7 h-7" />}
          gradient="green"
        />
        <GlassCard
          title="รายวิชาที่สอน"
          description="จัดการรายวิชาและเนื้อหาการสอน"
          icon={BookOpen}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockCourses.slice(0, 3).map((course) => (
              <Card key={course.id}>
                <CardHeader>
                  <CardTitle>{course.code}</CardTitle>
                  <CardDescription>{course.name}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">นักศึกษา</span>
                    <span className="font-bold">45 คน</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </GlassCard>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <PageHeader
        title="จัดการรายวิชา"
        subtitle={`ภาคเรียนที่ 1/2568 • ทั้งหมด ${mockCourses.length} รายวิชา`}
        icon={<BookOpen className="w-7 h-7" />}
        gradient="purple"
      />

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-4 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-lg"
        >
          <div className="text-sm opacity-80">รายวิชาทั้งหมด</div>
          <div className="text-3xl font-bold">{mockCourses.length}</div>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-4 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-lg"
        >
          <div className="text-sm opacity-80">เปิดสอนภาคนี้</div>
          <div className="text-3xl font-bold">{mockCourses.filter(c => c.semester === 1).length}</div>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-4 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-lg"
        >
          <div className="text-sm opacity-80">นักศึกษาลงทะเบียน</div>
          <div className="text-3xl font-bold">245</div>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-4 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg"
        >
          <div className="text-sm opacity-80">อาจารย์ผู้สอน</div>
          <div className="text-3xl font-bold">12</div>
        </motion.div>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="ค้นหารายวิชา..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          ตัวกรอง
        </Button>
        <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
          + เพิ่มรายวิชา
        </Button>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -4 }}
          >
            <Card className="h-full overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all">
              <div className="h-2 bg-gradient-to-r from-blue-500 to-cyan-500" />
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">{course.code}</Badge>
                  <Badge className="bg-emerald-100 text-emerald-700 border-0">{course.credits} หน่วยกิต</Badge>
                </div>
                <CardTitle className="text-lg">{course.name}</CardTitle>
                <CardDescription>{course.nameThai}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>นักศึกษา 45 คน</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>ภาคเรียน {course.semester}/{course.academicYear}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>ห้อง 301 อาคาร DII</span>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm" className="flex-1">ดูรายละเอียด</Button>
                  <Button variant="outline" size="sm" className="flex-1">แก้ไข</Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
