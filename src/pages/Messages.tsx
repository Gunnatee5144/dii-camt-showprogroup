import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send, Inbox, Archive, Trash2, Search, Star, Paperclip, Filter, MoreVertical,
  Reply, Forward, Mail, CheckCheck, Phone, Video, Info, User, ChevronLeft,
  Sparkles, Zap, ShieldAlert, ArrowUpRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { mockMessages, getMessagesByUserId, mockStudent } from '@/lib/mockData';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export default function Messages() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [selectedMessage, setSelectedMessage] = React.useState<string | null>(null);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [replyText, setReplyText] = React.useState('');

  const userMessages = getMessagesByUserId(mockStudent.id);
  const inboxMessages = userMessages.filter(m => m.toId === mockStudent.id);

  const filteredMessages = inboxMessages.filter(m =>
    m.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedMsg = inboxMessages.find(m => m.id === selectedMessage);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="h-[calc(100vh-6rem)] flex flex-col gap-6"
    >
      {/* Header Section - Matching Dashboard/Courses/Schedule Style */}
      <div className="flex-shrink-0">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 text-slate-500 font-medium mb-2"
            >
              <Mail className="w-4 h-4 text-blue-500" />
              <span>{t.messagesPage.subtitle}</span>
            </motion.div>
            <motion.h1
              className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {t.messagesPage.title}<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">{t.messagesPage.titleHighlight}</span>
            </motion.h1>
          </div>
        </div>
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-12 gap-6 pb-4 h-full">
        {/* Sidebar / List */}
        <div className={`col-span-12 lg:col-span-4 flex flex-col gap-4 h-full bg-white/60 backdrop-blur-xl rounded-[2.5rem] border border-white/60 shadow-sm overflow-hidden ${selectedMessage ? 'hidden lg:flex' : 'flex'}`}>
          <div className="p-6 border-b border-slate-100 flex flex-col gap-5">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
              <Input
                placeholder={t.messagesPage.searchMessages}
                className="pl-11 h-12 bg-slate-50/50 border-none rounded-2xl focus-visible:ring-indigo-500 font-medium"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2 p-1 bg-slate-100/50 rounded-2xl">
              <Button size="sm" variant="ghost" className="rounded-xl text-xs h-9 flex-1 bg-white shadow-sm text-indigo-600 font-bold">Inbox</Button>
              <Button size="sm" variant="ghost" className="rounded-xl text-xs h-9 flex-1 text-slate-500 font-bold hover:bg-white/50">{t.messagesPage.starred}</Button>
              <Button size="sm" variant="ghost" className="rounded-xl text-xs h-9 flex-1 text-slate-500 font-bold hover:bg-white/50">{t.messagesPage.announcements}</Button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-3 pb-4 custom-scrollbar space-y-2">
            {filteredMessages.map((msg) => (
              <motion.div
                key={msg.id}
                layoutId={msg.id}
                onClick={() => setSelectedMessage(msg.id)}
                className={`p-5 rounded-3xl cursor-pointer transition-all relative group border ${selectedMessage === msg.id
                  ? 'bg-slate-900 text-white shadow-2xl border-slate-900 scale-[1.02] z-10'
                  : 'bg-white hover:bg-white hover:border-indigo-200 border-transparent text-slate-900 shadow-sm'
                  }`}
              >
                {!msg.read && selectedMessage !== msg.id && (
                  <div className="absolute top-6 right-6 w-3 h-3 bg-indigo-500 rounded-full border-2 border-white shadow-[0_0_10px_rgba(79,70,229,0.5)]" />
                )}
                <div className="flex gap-4">
                  <div className="relative">
                    <Avatar className="w-12 h-12 border-2 border-white shadow-md rounded-2xl">
                      <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${msg.from}`} />
                      <AvatarFallback className="rounded-2xl bg-indigo-50 text-indigo-600 font-bold">{msg.from[0]}</AvatarFallback>
                    </Avatar>
                    {msg.from.includes('Admin') && (
                      <div className="absolute -bottom-1 -right-1 bg-amber-400 p-1 rounded-lg border-2 border-white">
                        <ShieldAlert className="w-2.5 h-2.5 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <span className={`font-bold text-sm truncate tracking-tight ${selectedMessage === msg.id ? 'text-white' : 'text-slate-900'}`}>{msg.from}</span>
                      <span className={`text-[10px] font-bold whitespace-nowrap px-2 py-0.5 rounded-full ${selectedMessage === msg.id ? 'bg-white/10 text-white/60' : 'bg-slate-100 text-slate-500'}`}>
                        {new Date(msg.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <div className={`text-sm font-bold truncate mb-1.5 tracking-tight ${selectedMessage === msg.id ? 'text-indigo-300' : 'text-slate-700'}`}>{msg.subject}</div>
                    <div className={`text-xs truncate font-medium ${selectedMessage === msg.id ? 'text-white/40' : 'text-slate-400'}`}>{msg.preview}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className={`col-span-12 lg:col-span-8 h-full bg-white/70 backdrop-blur-xl rounded-[2.5rem] border border-white/60 shadow-sm overflow-hidden flex flex-col ${selectedMessage ? 'flex' : 'hidden lg:flex'}`}>
          {selectedMsg ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedMsg.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex flex-col h-full"
              >
                <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white/50 backdrop-blur-md z-10 sticky top-0">
                  <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => setSelectedMessage(null)} className="lg:hidden rounded-2xl hover:bg-slate-100 transition-colors">
                      <ChevronLeft className="w-5 h-5 text-slate-600" />
                    </Button>
                    <Avatar className="w-12 h-12 border-2 border-white shadow-lg rounded-2xl">
                      <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedMsg.from}`} />
                      <AvatarFallback className="rounded-2xl bg-indigo-50 text-indigo-600 font-bold">{selectedMsg.from[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-bold text-slate-900 text-lg tracking-tight flex items-center gap-2">
                        {selectedMsg.from}
                        {selectedMsg.from.includes('Admin') && <Badge className="bg-amber-400/20 text-amber-700 border-0 text-[10px] h-5 rounded-lg">Official</Badge>}
                      </div>
                      <div className="text-xs text-slate-500 font-medium flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        {t.messagesPage.onlineNow}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="rounded-2xl h-11 w-11 bg-slate-50 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all"><Phone className="w-5 h-5" /></Button>
                    <Button variant="ghost" size="icon" className="rounded-2xl h-11 w-11 bg-slate-50 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all"><Info className="w-5 h-5" /></Button>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-slate-50/20 custom-scrollbar">
                  <div className="flex flex-col gap-8">
                    {/* Date Divider */}
                    <div className="text-center relative">
                      <div className="absolute top-1/2 left-0 right-0 h-px bg-slate-200/60" />
                      <span className="bg-slate-50 rounded-full px-4 py-1.5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] relative z-10 border border-slate-200/60 shadow-sm">
                        {new Date(selectedMsg.date).toLocaleDateString('th-TH', { weekday: 'long', day: 'numeric', month: 'long' })}
                      </span>
                    </div>

                    {/* Sender Message */}
                    <div className="flex items-start gap-4">
                      <Avatar className="w-10 h-10 mt-1 border-2 border-white shadow-md rounded-2xl shrink-0">
                        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedMsg.from}`} />
                        <AvatarFallback className="rounded-2xl">{selectedMsg.from[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col gap-2 max-w-[75%]">
                        <div className="bg-white p-6 rounded-[2rem] rounded-tl-none shadow-sm border border-white text-slate-700 leading-relaxed font-medium">
                          <h4 className="font-black text-slate-900 mb-3 text-xl tracking-tight leading-tight">{selectedMsg.subject}</h4>
                          <p className="whitespace-pre-line text-slate-600">{selectedMsg.body || selectedMsg.preview}</p>
                        </div>
                        <div className="text-[10px] font-bold text-slate-400 ml-2">
                          {new Date(selectedMsg.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </div>

                    {/* My Reply */}
                    <div className="flex items-start gap-4 flex-row-reverse">
                      <Avatar className="w-10 h-10 mt-1 border-2 border-white shadow-md rounded-2xl shrink-0">
                        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || 'Me'}`} />
                        <AvatarFallback className="rounded-2xl">Me</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col gap-2 max-w-[75%]">
                        <div className="bg-slate-900 p-6 rounded-[2rem] rounded-tr-none shadow-2xl text-white font-medium leading-relaxed">
                          <p>ขอบคุณสำหรับข้อมูลครับ เดี๋ยวผมจะรีบดำเนินการตามที่แจ้งและส่งเอกสารผ่านระบบคำร้องครับ 🙌</p>
                        </div>
                        <div className="text-[10px] font-bold text-slate-400 mr-2 flex items-center justify-end gap-1.5">
                          10:42 <CheckCheck className="w-4 h-4 text-emerald-500" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-white/50 backdrop-blur-md border-t border-slate-100 z-10">
                  <div className="relative flex items-end gap-3">
                    <div className="flex-1 relative">
                      <Textarea
                        placeholder={t.messagesPage.typeReply}
                        className="min-h-[56px] w-full rounded-[1.5rem] border-none bg-white shadow-inner focus-visible:ring-indigo-500 p-4 font-medium text-slate-700 resize-none pr-12 scrollbar-hide"
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                      />
                      <Button variant="ghost" size="icon" className="absolute right-2 bottom-2 text-slate-400 hover:text-indigo-600 hover:bg-slate-50 rounded-xl transition-all">
                        <Paperclip className="w-5 h-5" />
                      </Button>
                    </div>
                    <Button className="h-14 w-14 rounded-[1.5rem] bg-slate-900 hover:bg-slate-800 shadow-2xl shadow-indigo-500/20 transform active:scale-90 transition-all flex items-center justify-center">
                      <Send className="w-6 h-6 text-white" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-400 bg-slate-50/30 p-12 text-center">
              <div className="w-32 h-32 bg-white rounded-[2.5rem] border-2 border-dashed border-slate-200 flex items-center justify-center mb-8 shadow-inner relative group cursor-pointer hover:border-indigo-200 hover:bg-indigo-50/50 transition-all">
                <div className="absolute inset-0 bg-indigo-500/5 rounded-[2.5rem] scale-0 group-hover:scale-110 transition-transform blur-2xl" />
                <Inbox className="w-14 h-14 text-slate-200 group-hover:text-indigo-200 transition-colors" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-3 tracking-tight">{t.messagesPage.emptyInbox}</h3>
              <p className="text-slate-500 max-w-xs leading-relaxed font-medium">{t.messagesPage.emptyDesc}</p>

              <div className="mt-12 grid grid-cols-2 gap-4 w-full max-w-sm">
                <div className="bg-white/80 p-4 rounded-3xl border border-white shadow-sm flex flex-col items-center gap-2">
                  <Sparkles className="w-6 h-6 text-amber-400" />
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.messagesPage.recentContacts}</span>
                  <span className="text-sm font-bold text-slate-900">3 {t.messagesPage.newLabel}</span>
                </div>
                <div className="bg-white/80 p-4 rounded-3xl border border-white shadow-sm flex flex-col items-center gap-2">
                  <Zap className="w-6 h-6 text-indigo-500" />
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.messagesPage.systemStatus}</span>
                  <span className="text-sm font-bold text-slate-900">{t.messagesPage.normalStatus}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
