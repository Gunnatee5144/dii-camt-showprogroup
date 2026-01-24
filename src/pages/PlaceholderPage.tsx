import React from 'react';
import { Construction } from 'lucide-react';
import { ThemedPageHeader } from '@/components/common/ThemedPageHeader';

interface PlaceholderPageProps {
    title: string;
    subtitle?: string;
}

export default function PlaceholderPage({ title, subtitle = 'กำลังพัฒนาระบบนี้' }: PlaceholderPageProps) {
    return (
        <div className="space-y-6">
            <ThemedPageHeader title={title} subtitle={subtitle} />

            <div className="flex flex-col items-center justify-center min-h-[400px] bg-white rounded-xl border border-dashed border-gray-300 p-12 text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                    <Construction className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">อยู่ระหว่างการพัฒนา</h3>
                <p className="text-gray-500 max-w-md mx-auto">
                    ฟีเจอร์นี้กำลังถูกสร้างและจะพร้อมใช้งานในเร็วๆ นี้ ขอบคุณที่รอคอย!
                </p>
            </div>
        </div>
    );
}
