import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { PieChart, TrendingUp, TrendingDown, DollarSign, FileText, CreditCard, AlertCircle, Plus, Wallet, Receipt } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};
const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

export default function Budget() {
    const { t } = useLanguage();
    const transactions = [
        { id: 1, type: 'expense', category: 'วัสดุสำนักงาน', amount: 5400, description: 'สั่งซื้อกระดาษ A4 40 รีม', date: '2026-03-15', status: 'approved' },
        { id: 2, type: 'expense', category: 'ครุภัณฑ์', amount: 25900, description: 'โปรเจคเตอร์ห้อง DII-302', date: '2026-03-12', status: 'pending' },
        { id: 3, type: 'income', category: 'งบประมาณ', amount: 500000, description: 'งบประมาณประจำภาคการศึกษา 1/2567', date: '2026-03-01', status: 'approved' },
        { id: 4, type: 'expense', category: 'ค่าจ้างบริการ', amount: 12000, description: 'ค่าทำความสะอาดเดือนกุมภาพันธ์', date: '2026-02-28', status: 'approved' },
    ];

    return (
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8 pb-10">
            {/* Header */}
            <div>
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2 text-slate-500 font-medium mb-2">
                    <Wallet className="w-4 h-4 text-purple-500" />
                    <span>{t.budgetPage.subtitle}</span>
                </motion.div>
                <motion.h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                    {t.budgetPage.title}<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-violet-600">{t.budgetPage.titleHighlight}</span>
                </motion.h1>
            </div>

            {/* Stat Cards */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                    { icon: DollarSign, label: t.budgetPage.remaining, value: '฿456,700', sub: `${t.budgetPage.fromTotal} ฿1,000,000`, gradient: 'from-emerald-500 to-teal-500', shadow: 'shadow-emerald-200' },
                    { icon: TrendingDown, label: t.budgetPage.monthlyExpense, value: '฿43,300', sub: t.budgetPage.increaseFromLast, gradient: 'from-blue-500 to-indigo-500', shadow: 'shadow-blue-200' },
                    { icon: Receipt, label: t.budgetPage.pendingApproval, value: '3', sub: t.budgetPage.disbursementReqs, gradient: 'from-amber-500 to-orange-500', shadow: 'shadow-amber-200' },
                ].map((stat, i) => (
                    <motion.div key={i} whileHover={{ scale: 1.02 }} className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${stat.gradient} p-6 text-white shadow-xl ${stat.shadow}`}>
                        <div className="absolute -top-10 -right-10 w-28 h-28 bg-white/10 rounded-full blur-2xl" />
                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="p-2 rounded-xl bg-white/20 backdrop-blur-sm"><stat.icon className="w-5 h-5" /></div>
                                <span className="font-medium text-white/90">{stat.label}</span>
                            </div>
                            <div className="text-3xl font-bold">{stat.value}</div>
                            <p className="text-sm text-white/70 mt-1">{stat.sub}</p>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Bento Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                {/* Budget Progress - 2 cols */}
                <motion.div variants={itemVariants} className="lg:col-span-2 bg-white/60 backdrop-blur-xl border border-white/60 rounded-3xl p-6 shadow-sm">
                    <h3 className="text-lg font-bold text-slate-800 mb-5 flex items-center gap-2">
                        <PieChart className="w-5 h-5 text-purple-500" /> {t.budgetPage.expenseRatio}
                    </h3>
                    <div className="space-y-4">
                        {[
                            { label: t.budgetPage.computerEquipment, percent: 45, color: 'bg-blue-500' },
                            { label: t.budgetPage.officeSupplies, percent: 20, color: 'bg-emerald-500' },
                            { label: t.budgetPage.serviceCharges, percent: 15, color: 'bg-orange-500' },
                            { label: t.budgetPage.others, percent: 20, color: 'bg-slate-400' },
                        ].map((item, idx) => (
                            <div key={idx}>
                                <div className="flex justify-between text-sm mb-1.5">
                                    <span className="text-slate-600">{item.label}</span>
                                    <span className="font-bold text-slate-800">{item.percent}%</span>
                                </div>
                                <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                                    <motion.div initial={{ width: 0 }} animate={{ width: `${item.percent}%` }} transition={{ delay: 0.5 + idx * 0.1, duration: 0.6 }} className={`h-full ${item.color} rounded-full`} />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 pt-4 border-t border-slate-100">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-slate-500">{t.budgetPage.budgetUsed}</span>
                            <span className="font-bold text-slate-800">54.33%</span>
                        </div>
                        <div className="h-3 bg-slate-100 rounded-full overflow-hidden mt-2">
                            <motion.div initial={{ width: 0 }} animate={{ width: '54.33%' }} transition={{ delay: 0.8, duration: 0.8 }} className="h-full bg-gradient-to-r from-purple-500 to-violet-500 rounded-full" />
                        </div>
                    </div>
                </motion.div>

                {/* Transactions - 3 cols */}
                <motion.div variants={itemVariants} className="lg:col-span-3 bg-white/60 backdrop-blur-xl border border-white/60 rounded-3xl p-6 shadow-sm">
                    <div className="flex justify-between items-center mb-5">
                        <div>
                            <h3 className="text-lg font-bold text-slate-800">{t.budgetPage.recentItems}</h3>
                            <p className="text-sm text-slate-500">{t.budgetPage.recentDesc}</p>
                        </div>
                        <Button className="rounded-xl bg-purple-600 hover:bg-purple-700 shadow-lg shadow-purple-200">
                            <Plus className="w-4 h-4 mr-2" /> {t.budgetPage.requestBudget}
                        </Button>
                    </div>
                    <div className="space-y-2">
                        {transactions.map((tx) => (
                            <motion.div key={tx.id} whileHover={{ x: 4 }} className="flex items-center justify-between p-4 rounded-2xl hover:bg-white border border-transparent hover:border-slate-100 hover:shadow-sm transition-all">
                                <div className="flex items-center gap-4">
                                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${tx.type === 'expense' ? 'bg-red-50 text-red-500' : 'bg-emerald-50 text-emerald-500'}`}>
                                        {tx.type === 'expense' ? <TrendingDown className="w-5 h-5" /> : <TrendingUp className="w-5 h-5" />}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-slate-800">{tx.description}</h4>
                                        <p className="text-sm text-slate-400">{tx.category} • {tx.date}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className={`font-bold ${tx.type === 'expense' ? 'text-red-500' : 'text-emerald-500'}`}>
                                        {tx.type === 'expense' ? '-' : '+'}฿{tx.amount.toLocaleString()}
                                    </div>
                                    <Badge variant="outline" className={`text-xs mt-1 ${tx.status === 'approved' ? 'border-emerald-200 text-emerald-600 bg-emerald-50' : 'border-amber-200 text-amber-600 bg-amber-50'}`}>
                                        {tx.status === 'approved' ? t.budgetPage.approved : t.budgetPage.pendingReview}
                                    </Badge>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}
