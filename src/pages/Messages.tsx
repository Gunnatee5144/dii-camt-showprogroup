import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Send, Inbox, Archive, Trash2, Search, Star, Paperclip, Filter, MoreVertical, Reply, Forward, Mail, CheckCheck } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { mockMessages, getMessagesByUserId, mockStudent } from '@/lib/mockData';

export default function Messages() {
  const { user } = useAuth();
  const [selectedMessage, setSelectedMessage] = React.useState<string | null>(null);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [composing, setComposing] = React.useState(false);

  const userMessages = getMessagesByUserId(mockStudent.id);
  const inboxMessages = userMessages.filter(m => m.toId === mockStudent.id);
  const sentMessages = userMessages.filter(m => m.fromId === mockStudent.id);

  const filteredInbox = searchQuery
    ? inboxMessages.filter(m =>
        m.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.preview.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : inboxMessages;

  const selectedMsg = selectedMessage ? userMessages.find(m => m.id === selectedMessage) : null;

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'academic': return 'bg-blue-100 text-blue-800';
      case 'internship': return 'bg-purple-100 text-purple-800';
      case 'announcement': return 'bg-orange-100 text-orange-800';
      case 'activity': return 'bg-green-100 text-green-800';
      case 'system': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'academic': return 'วิชาการ';
      case 'internship': return 'ฝึกงาน';
      case 'announcement': return 'ประกาศ';
      case 'activity': return 'กิจกรรม';
      case 'system': return 'ระบบ';
      default: return 'ทั่วไป';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">ข้อความ</h1>
          <p className="text-gray-600 mt-1">จัดการข้อความและการสื่อสาร</p>
        </div>
        <Button onClick={() => setComposing(true)}>
          <Send className="w-4 h-4 mr-2" />
          เขียนข้อความใหม่
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Inbox className="w-4 h-4" />
              ข้อความใหม่
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{inboxMessages.filter(m => !m.read).length}</div>
            <p className="text-sm text-gray-600 mt-1">ยังไม่ได้อ่าน</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Mail className="w-4 h-4" />
              ทั้งหมด
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{inboxMessages.length}</div>
            <p className="text-sm text-gray-600 mt-1">ข้อความรับ</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Send className="w-4 h-4" />
              ส่งแล้ว
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{sentMessages.length}</div>
            <p className="text-sm text-gray-600 mt-1">ข้อความส่ง</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Star className="w-4 h-4" />
              ที่สำคัญ
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{inboxMessages.filter(m => m.starred).length}</div>
            <p className="text-sm text-gray-600 mt-1">ติดดาว</p>
          </CardContent>
        </Card>
      </div>

      {composing ? (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>เขียนข้อความใหม่</CardTitle>
              <Button variant="ghost" onClick={() => setComposing(false)}>ยกเลิก</Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">ถึง</label>
              <Input placeholder="กรอกชื่อหรืออีเมล..." className="mt-1" />
            </div>
            <div>
              <label className="text-sm font-medium">หัวข้อ</label>
              <Input placeholder="หัวข้อข้อความ..." className="mt-1" />
            </div>
            <div>
              <label className="text-sm font-medium">ข้อความ</label>
              <Textarea placeholder="เนื้อหาข้อความ..." rows={6} className="mt-1" />
            </div>
            <div className="flex gap-2">
              <Button>
                <Send className="w-4 h-4 mr-2" />
                ส่งข้อความ
              </Button>
              <Button variant="outline">
                <Paperclip className="w-4 h-4 mr-2" />
                แนบไฟล์
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input 
                    placeholder="ค้นหาข้อความ..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9" 
                  />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Tabs defaultValue="inbox" className="w-full">
                  <TabsList className="w-full grid grid-cols-3 rounded-none">
                    <TabsTrigger value="inbox" className="text-xs">
                      <Inbox className="w-4 h-4 mr-1" />
                      รับ
                    </TabsTrigger>
                    <TabsTrigger value="sent" className="text-xs">
                      <Send className="w-4 h-4 mr-1" />
                      ส่ง
                    </TabsTrigger>
                    <TabsTrigger value="starred" className="text-xs">
                      <Star className="w-4 h-4 mr-1" />
                      ดาว
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="inbox" className="mt-0">
                    <div className="divide-y max-h-[600px] overflow-y-auto">
                      {filteredInbox.map((message) => (
                        <div
                          key={message.id}
                          onClick={() => setSelectedMessage(message.id)}
                          className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                            !message.read ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                          } ${selectedMessage === message.id ? 'bg-gray-100' : ''}`}
                        >
                          <div className="flex items-start gap-3">
                            <Avatar className="w-10 h-10">
                              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                                {message.from.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <p className={`text-sm truncate ${!message.read ? 'font-semibold' : 'font-medium'}`}>
                                  {message.from}
                                </p>
                                {message.starred && <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />}
                              </div>
                              <p className={`text-sm truncate ${!message.read ? 'font-semibold' : ''}`}>
                                {message.subject}
                              </p>
                              <p className="text-xs text-gray-500 truncate mt-1">
                                {message.preview}
                              </p>
                              <div className="flex items-center gap-2 mt-2">
                                <span className="text-xs text-gray-400">
                                  {message.date.toLocaleDateString('th-TH', { 
                                    day: 'numeric', 
                                    month: 'short',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                  })}
                                </span>
                                {message.hasAttachment && (
                                  <Badge variant="outline" className="text-xs">
                                    <Paperclip className="w-3 h-3" />
                                  </Badge>
                                )}
                                <Badge variant="outline" className={`text-xs ${getCategoryColor(message.category)}`}>
                                  {getCategoryLabel(message.category)}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="sent" className="mt-0">
                    <div className="divide-y max-h-[600px] overflow-y-auto">
                      {sentMessages.map((message) => (
                        <div
                          key={message.id}
                          onClick={() => setSelectedMessage(message.id)}
                          className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                            selectedMessage === message.id ? 'bg-gray-100' : ''
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <Avatar className="w-10 h-10">
                              <AvatarFallback className="bg-gradient-to-br from-green-500 to-blue-500 text-white">
                                {message.to.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <p className="text-sm font-medium truncate">ถึง: {message.to}</p>
                                <CheckCheck className="w-4 h-4 text-green-500" />
                              </div>
                              <p className="text-sm font-medium truncate">{message.subject}</p>
                              <p className="text-xs text-gray-500 truncate mt-1">{message.preview}</p>
                              <span className="text-xs text-gray-400 mt-2 block">
                                {message.date.toLocaleDateString('th-TH', { 
                                  day: 'numeric', 
                                  month: 'short',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="starred" className="mt-0">
                    <div className="divide-y max-h-[600px] overflow-y-auto">
                      {inboxMessages.filter(m => m.starred).map((message) => (
                        <div
                          key={message.id}
                          onClick={() => setSelectedMessage(message.id)}
                          className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                            selectedMessage === message.id ? 'bg-gray-100' : ''
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <Avatar className="w-10 h-10">
                              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                                {message.from.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">{message.from}</p>
                              <p className="text-sm font-medium truncate">{message.subject}</p>
                              <p className="text-xs text-gray-500 truncate mt-1">{message.preview}</p>
                              <span className="text-xs text-gray-400 mt-2 block">
                                {message.date.toLocaleDateString('th-TH')}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            {selectedMsg ? (
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={getCategoryColor(selectedMsg.category)}>
                          {getCategoryLabel(selectedMsg.category)}
                        </Badge>
                        {selectedMsg.starred && (
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        )}
                      </div>
                      <CardTitle className="text-2xl">{selectedMsg.subject}</CardTitle>
                      <CardDescription className="mt-2">
                        {selectedMsg.date.toLocaleDateString('th-TH', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </CardDescription>
                    </div>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <Separator />
                <CardContent className="pt-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-lg">
                        {selectedMsg.from.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{selectedMsg.from}</p>
                      <p className="text-sm text-gray-600">ถึง: {selectedMsg.to}</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="prose max-w-none">
                    <p className="whitespace-pre-wrap text-gray-700">{selectedMsg.body}</p>
                  </div>

                  {selectedMsg.hasAttachment && selectedMsg.attachments && (
                    <>
                      <Separator />
                      <div>
                        <p className="font-semibold mb-3">ไฟล์แนบ ({selectedMsg.attachments.length})</p>
                        <div className="space-y-2">
                          {selectedMsg.attachments.map((attachment, idx) => (
                            <div key={idx} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                              <div className="flex items-center gap-3">
                                <Paperclip className="w-5 h-5 text-gray-400" />
                                <div>
                                  <p className="text-sm font-medium">{attachment.name}</p>
                                  <p className="text-xs text-gray-500">{attachment.size}</p>
                                </div>
                              </div>
                              <Button size="sm" variant="outline">ดาวน์โหลด</Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  <Separator />

                  <div className="flex gap-2">
                    <Button>
                      <Reply className="w-4 h-4 mr-2" />
                      ตอบกลับ
                    </Button>
                    <Button variant="outline">
                      <Forward className="w-4 h-4 mr-2" />
                      ส่งต่อ
                    </Button>
                    <Button variant="outline">
                      <Archive className="w-4 h-4 mr-2" />
                      เก็บเข้าคลัง
                    </Button>
                    <Button variant="outline" className="ml-auto text-red-600 hover:text-red-700">
                      <Trash2 className="w-4 h-4 mr-2" />
                      ลบ
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="h-full">
                <CardContent className="flex items-center justify-center h-[600px]">
                  <div className="text-center text-gray-400">
                    <Mail className="w-16 h-16 mx-auto mb-4" />
                    <p>เลือกข้อความเพื่อดูรายละเอียด</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
