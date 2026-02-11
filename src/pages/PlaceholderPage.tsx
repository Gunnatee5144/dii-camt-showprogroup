import React from 'react';
import { motion } from 'framer-motion';
import { Construction } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

interface PlaceholderPageProps {
    title: string;
    subtitle?: string;
}

export default function PlaceholderPage({ title, subtitle }: PlaceholderPageProps) {
    const { t } = useLanguage();
    return (
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
            <motion.div variants={itemVariants} className="relative">
                <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 rounded-xl bg-gradient-to-br from-gray-500 to-slate-500 text-white shadow-lg">
                        <Construction className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-medium text-gray-600">{t.placeholderPage.thisPage}</span>
                </div>
                <div className="flex items-center justify-between">
                    <div>
                        <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-3xl font-bold text-gray-900">
                            <span className="bg-gradient-to-r from-gray-500 to-slate-500 bg-clip-text text-transparent">{title}</span>
                        </motion.h1>
                        <p className="text-gray-500 mt-1">{subtitle || t.placeholderPage.defaultSubtitle}</p>
                    </div>
                </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col items-center justify-center min-h-[400px] bg-white/60 backdrop-blur-xl border border-white/60 rounded-3xl shadow-sm p-12 text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                    <Construction className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{t.placeholderPage.underDevelopment}</h3>
                <p className="text-gray-500 max-w-md mx-auto">
                    {t.placeholderPage.developingMessage}
                </p>
            </motion.div>
        </motion.div>
    );
}
