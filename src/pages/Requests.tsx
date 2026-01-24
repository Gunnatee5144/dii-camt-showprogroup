import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import { FileText, Clock, CheckCircle, XCircle, Plus, Filter, Send, Upload, FileBox, X, AlertCircle, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ThemedPageHeader } from '@/components/common/ThemedPageHeader';
import { ThemedCard } from '@/components/common/ThemedCard';

import { toast } from 'sonner';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const initialRequests = [
  {
    id: 1,
    type: 'ลงทะเบียนเรียนเกิน',
    title: 'ขอลงทะเบียนเรียนเกิน 22 หน่วยกิต',
    status: 'pending',
    createdAt: '2024-01-08',
    description: 'ขอลงทะเบียนเรียนเกินเนื่องจากต้องการจบการศึกษาตามกำหนด',
  },
  {
    id: 2,
    type: 'ขอใบรับรอง',
    title: 'ขอใบรับรองนักศึกษา',
    status: 'approved',
    createdAt: '2024-01-05',
    description: 'สำหรับใช้ในการทำวีซ่า',
  },
  {
    id: 3,
    type: 'ขอเปลี่ยนกลุ่ม',
    title: 'ขอเปลี่ยนกลุ่มเรียน DII345',
    status: 'rejected',
    createdAt: '2024-01-03',
    description: 'ขอเปลี่ยนจากกลุ่ม 01 เป็นกลุ่ม 02',
  },
];

export default function Requests() {
  const { user } = useAuth();
  const [showNewRequestForm, setShowNewRequestForm] = React.useState(false);
  const [requests, setRequests] = React.useState<any[]>(initialRequests);
  const [formData, setFormData] = React.useState({
    type: '',
    title: '',
    description: ''
  });

  const pendingCount = requests.filter(r => r.status === 'pending').length;
  const approvedCount = requests.filter(r => r.status === 'approved').length;
  const rejectedCount = requests.filter(r => r.status === 'rejected').length;

  const handleSubmit = () => {
    if (!formData.type || !formData.title || !formData.description) {
      toast.error('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }

    const newRequest = {
      id: requests.length + 1,
      type: formData.type,
      title: formData.title,
      description: formData.description,
      status: 'pending',
      createdAt: new Date().toISOString().split('T')[0],
    };

    setRequests([newRequest, ...requests]);
    setShowNewRequestForm(false);
    setFormData({ type: '', title: '', description: '' });
    toast.success('ยื่นคำร้องเรียบร้อยแล้ว');
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <ThemedPageHeader
        title="คำร้องและฟอร์ม"
        subtitle="จัดการคำร้องต่างๆ ของคุณ"
        icon={<FileBox className="w-7 h-7" />}
      />

      <motion.div variants={itemVariants} className="flex justify-end">
        <Button
          onClick={() => setShowNewRequestForm(true)}
          className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 shadow-lg shadow-rose-200/50"
        >
          <Plus className="w-4 h-4 mr-2" />
          ยื่นคำร้องใหม่
        </Button>
      </motion.div>

      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 p-6 text-white shadow-xl shadow-blue-200"
        >
          <div className="absolute -top-10 -right-10 w-28 h-28 bg-white/10 rounded-full blur-2xl" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 rounded-xl bg-white/20 backdrop-blur-sm">
                <FileText className="w-5 h-5" />
              </div>
              <span className="font-medium text-white/90">คำร้องทั้งหมด</span>
            </div>
            <div className="text-4xl font-bold">{requests.length}</div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500 p-6 text-white shadow-xl shadow-orange-200"
        >
          <div className="absolute -top-10 -right-10 w-28 h-28 bg-white/10 rounded-full blur-2xl" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 rounded-xl bg-white/20 backdrop-blur-sm">
                <Clock className="w-5 h-5" />
              </div>
              <span className="font-medium text-white/90">รอดำเนินการ</span>
            </div>
            <div className="text-4xl font-bold">{pendingCount}</div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 p-6 text-white shadow-xl shadow-emerald-200"
        >
          <div className="absolute -top-10 -right-10 w-28 h-28 bg-white/10 rounded-full blur-2xl" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 rounded-xl bg-white/20 backdrop-blur-sm">
                <CheckCircle className="w-5 h-5" />
              </div>
              <span className="font-medium text-white/90">อนุมัติแล้ว</span>
            </div>
            <div className="text-4xl font-bold">{approvedCount}</div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-rose-500 via-pink-500 to-red-500 p-6 text-white shadow-xl shadow-rose-200"
        >
          <div className="absolute -top-10 -right-10 w-28 h-28 bg-white/10 rounded-full blur-2xl" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 rounded-xl bg-white/20 backdrop-blur-sm">
                <XCircle className="w-5 h-5" />
              </div>
              <span className="font-medium text-white/90">ไม่อนุมัติ</span>
            </div>
            <div className="text-4xl font-bold">{rejectedCount}</div>
          </div>
        </motion.div>
      </motion.div>

      {showNewRequestForm && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="border-0 shadow-xl overflow-hidden">
            <div className="h-1.5 bg-gradient-to-r from-rose-500 via-pink-500 to-fuchsia-500" />
            <CardHeader className="bg-gradient-to-br from-rose-50 to-pink-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-rose-200/50">
                    <Send className="w-6 h-6" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">ยื่นคำร้องใหม่</CardTitle>
                    <CardDescription>กรอกข้อมูลให้ครบถ้วนเพื่อยื่นคำร้อง</CardDescription>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setShowNewRequestForm(false)}>
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-5 pt-6">
              <div className="space-y-2">
                <Label className="text-gray-700 font-medium">ประเภทคำร้อง</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => setFormData({ ...formData, type: value })}
                >
                  <SelectTrigger className="bg-white border-gray-200 focus:border-rose-400">
                    <SelectValue placeholder="เลือกประเภทคำร้อง" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ลงทะเบียนเรียนเกิน">ลงทะเบียนเรียนเกิน/ขาด</SelectItem>
                    <SelectItem value="ขอใบรับรอง">ขอใบรับรอง</SelectItem>
                    <SelectItem value="ขอเปลี่ยนกลุ่ม">ขอเปลี่ยนกลุ่มเรียน</SelectItem>
                    <SelectItem value="ขอถอนรายวิชา">ขอถอนรายวิชา</SelectItem>
                    <SelectItem value="ลาพักการศึกษา">ขอลาพักการศึกษา</SelectItem>
                    <SelectItem value="อื่นๆ">อื่นๆ</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-700 font-medium">หัวข้อคำร้อง</Label>
                <Input
                  placeholder="กรอกหัวข้อคำร้อง"
                  className="bg-white border-gray-200 focus:border-rose-400"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-gray-700 font-medium">รายละเอียด</Label>
                <Textarea
                  placeholder="กรอกรายละเอียดคำร้อง"
                  rows={5}
                  className="bg-white border-gray-200 focus:border-rose-400"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-gray-700 font-medium">แนบเอกสาร (ถ้ามี)</Label>
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-rose-300 transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">คลิกเพื่ออัพโหลด หรือลากไฟล์มาวาง</p>
                  <p className="text-xs text-gray-400 mt-1">รองรับไฟล์ PDF, DOC, JPG ขนาดไม่เกิน 10MB</p>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  className="flex-1 h-11 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 shadow-lg shadow-rose-200/50"
                  onClick={handleSubmit}
                >
                  <Send className="w-4 h-4 mr-2" />
                  ยื่นคำร้อง
                </Button>
                <Button variant="outline" className="h-11" onClick={() => setShowNewRequestForm(false)}>
                  ยกเลิก
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      <motion.div variants={itemVariants}>
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="bg-white/80 backdrop-blur-sm border shadow-sm p-1 h-auto">
            <TabsTrigger value="all" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-6 py-2.5">
              <FileText className="w-4 h-4 mr-2" />
              ทั้งหมด
            </TabsTrigger>
            <TabsTrigger value="pending" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-6 py-2.5">
              <Clock className="w-4 h-4 mr-2" />
              รอดำเนินการ
            </TabsTrigger>
            <TabsTrigger value="approved" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-6 py-2.5">
              <CheckCircle className="w-4 h-4 mr-2" />
              อนุมัติแล้ว
            </TabsTrigger>
            <TabsTrigger value="rejected" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-6 py-2.5">
              <XCircle className="w-4 h-4 mr-2" />
              ไม่อนุมัติ
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4 mt-6">
            {requests.map((request, index) => (
              <motion.div
                key={request.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -2 }}
              >
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all overflow-hidden">
                  <div className={`h-1 ${request.status === 'approved' ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                    request.status === 'pending' ? 'bg-gradient-to-r from-orange-500 to-amber-500' :
                      'bg-gradient-to-r from-red-500 to-rose-500'
                    }`} />
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className="bg-gray-50">{request.type}</Badge>
                          <Badge className={
                            request.status === 'approved'
                              ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0' :
                              request.status === 'pending'
                                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white border-0' :
                                'bg-gradient-to-r from-red-500 to-rose-500 text-white border-0'
                          }>
                            {request.status === 'approved' ? (
                              <><CheckCircle className="w-3 h-3 mr-1" />อนุมัติ</>
                            ) : request.status === 'pending' ? (
                              <><Clock className="w-3 h-3 mr-1" />รอดำเนินการ</>
                            ) : (
                              <><XCircle className="w-3 h-3 mr-1" />ไม่อนุมัติ</>
                            )}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg">{request.title}</CardTitle>
                        <CardDescription className="mt-2">{request.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        ยื่นเมื่อ: {new Date(request.createdAt).toLocaleDateString('th-TH', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="group">
                          ดูรายละเอียด
                          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </Button>
                        {request.status === 'pending' && (
                          <Button size="sm" variant="destructive">ยกเลิก</Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </TabsContent>

          <TabsContent value="pending" className="mt-6">
            <div className="space-y-4">
              {requests.filter(r => r.status === 'pending').map((request, index) => (
                <motion.div
                  key={request.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="border-0 shadow-lg overflow-hidden">
                    <div className="h-1 bg-gradient-to-r from-orange-500 to-amber-500" />
                    <CardHeader>
                      <CardTitle className="text-lg">{request.title}</CardTitle>
                      <CardDescription>{request.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="approved" className="mt-6">
            <div className="space-y-4">
              {requests.filter(r => r.status === 'approved').map((request, index) => (
                <motion.div
                  key={request.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="border-0 shadow-lg overflow-hidden">
                    <div className="h-1 bg-gradient-to-r from-green-500 to-emerald-500" />
                    <CardHeader>
                      <CardTitle className="text-lg">{request.title}</CardTitle>
                      <CardDescription>{request.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="rejected" className="mt-6">
            <div className="space-y-4">
              {requests.filter(r => r.status === 'rejected').map((request, index) => (
                <motion.div
                  key={request.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="border-0 shadow-lg overflow-hidden">
                    <div className="h-1 bg-gradient-to-r from-red-500 to-rose-500" />
                    <CardHeader>
                      <CardTitle className="text-lg">{request.title}</CardTitle>
                      <CardDescription>{request.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  );
}
