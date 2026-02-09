import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Building, Search, MapPin, Users, Handshake, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { mockCompanies } from '@/lib/mockData';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};
const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

export default function Network() {
    const [searchQuery, setSearchQuery] = React.useState('');

    const filteredCompanies = mockCompanies.filter(c =>
        c.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.companyNameThai.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8 pb-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                <div>
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2 text-slate-500 font-medium mb-2">
                        <Globe className="w-4 h-4 text-orange-500" />
                        <span>ฐานข้อมูลพันธมิตร</span>
                    </motion.div>
                    <motion.h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                        เครือข่าย<span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">สถานประกอบการ</span>
                    </motion.h1>
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-slate-500 mt-2">
                        พันธมิตรและสถานประกอบการทั้งหมด {mockCompanies.length} แห่ง
                    </motion.p>
                </div>
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                    <Button className="rounded-xl bg-orange-500 hover:bg-orange-600 shadow-lg shadow-orange-200 h-11">
                        <Building className="w-4 h-4 mr-2" /> เพิ่มสถานประกอบการ
                    </Button>
                </motion.div>
            </div>

            {/* Search Bar */}
            <motion.div variants={itemVariants} className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row gap-3">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input placeholder="ค้นหาชื่อบริษัท, อุตสาหกรรม..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-10 rounded-xl bg-white/80 border-slate-200" />
                </div>
                <Button variant="outline" className="rounded-xl">ตัวกรองอุตสาหกรรม</Button>
            </motion.div>

            {/* Company Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {filteredCompanies.map((company, index) => (
                    <motion.div key={company.id} variants={itemVariants} whileHover={{ y: -4 }}
                        className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-3xl p-6 shadow-sm hover:shadow-lg transition-all group">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex gap-4">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center text-2xl font-bold text-white shadow-lg shadow-orange-200">
                                    {company.companyName.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-800">{company.companyName}</h3>
                                    <p className="text-sm text-slate-500 mt-0.5">{company.companyNameThai}</p>
                                    <Badge variant="outline" className="mt-2 rounded-lg text-xs">{company.industry}</Badge>
                                </div>
                            </div>
                            <Button variant="ghost" size="icon" className="text-slate-300 hover:text-orange-500 rounded-xl">
                                <ExternalLink className="w-4 h-4" />
                            </Button>
                        </div>
                        <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                            {[
                                { icon: MapPin, text: company.address || 'ไม่ระบุที่อยู่' },
                                { icon: Users, text: '50-200 คน (ขนาดกลาง)' },
                                { icon: Handshake, text: 'MOU: Active' },
                                { icon: Globe, text: company.website },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-2 text-slate-500">
                                    <item.icon className="w-4 h-4 flex-shrink-0" />
                                    <span className="truncate">{item.text}</span>
                                </div>
                            ))}
                        </div>
                        <div className="flex gap-2 pt-4 border-t border-slate-100">
                            <Button size="sm" variant="outline" className="flex-1 rounded-xl text-xs">ส่งนักศึกษาฝึกงาน</Button>
                            <Button size="sm" variant="outline" className="flex-1 rounded-xl text-xs">แก้ไขข้อมูล</Button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}
