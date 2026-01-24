import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Calendar, Repeat, ArrowRight, AlertCircle, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';
import { th } from 'date-fns/locale';

interface RescheduleDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: (mode: 'permanent' | 'one-time') => void;
    item?: any;
    targetTime?: string;
}

export function RescheduleDialog({ open, onOpenChange, onConfirm, item, targetTime }: RescheduleDialogProps) {
    const [selectedMode, setSelectedMode] = useState<'permanent' | 'one-time' | null>(null);

    const handleConfirm = () => {
        if (selectedMode) {
            onConfirm(selectedMode);
            setSelectedMode(null);
        }
    };

    if (!item) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>ยืนยันการย้ายตารางสอน</DialogTitle>
                    <DialogDescription>
                        คุณต้องการย้ายวิชา <span className="font-semibold text-primary">{item.courseCode} {item.courseName}</span> ไปยัง <span className="font-semibold">{targetTime}</span> แบบใด?
                    </DialogDescription>
                </DialogHeader>

                <div className="grid grid-cols-2 gap-4 py-4">
                    <div
                        className={`cursor-pointer rounded-xl border-2 p-4 hover:border-blue-500 hover:bg-blue-50 transition-all ${selectedMode === 'one-time' ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200' : 'border-gray-100'}`}
                        onClick={() => setSelectedMode('one-time')}
                    >
                        <div className="mb-2 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                            <Calendar className="w-5 h-5" />
                        </div>
                        <div className="font-semibold text-gray-900">เปลี่ยนเฉพาะวันนี้</div>
                        <div className="text-xs text-gray-500 mt-1">
                            มีผลเฉพาะวันที่ {format(new Date(), 'd MMM yyyy', { locale: th })} เท่านั้น สัปดาห์อื่นยังคงเดิม
                        </div>
                    </div>

                    <div
                        className={`cursor-pointer rounded-xl border-2 p-4 hover:border-purple-500 hover:bg-purple-50 transition-all ${selectedMode === 'permanent' ? 'border-purple-500 bg-purple-50 ring-2 ring-purple-200' : 'border-gray-100'}`}
                        onClick={() => setSelectedMode('permanent')}
                    >
                        <div className="mb-2 w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                            <Repeat className="w-5 h-5" />
                        </div>
                        <div className="font-semibold text-gray-900">เปลี่ยนถาวร</div>
                        <div className="text-xs text-gray-500 mt-1">
                            มีผลตั้งแต่วันนี้เป็นต้นไป ทุกสัปดาห์ในภาคการศึกษานี้
                        </div>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>ยกเลิก</Button>
                    <Button onClick={handleConfirm} disabled={!selectedMode} className={selectedMode === 'permanent' ? 'bg-purple-600 hover:bg-purple-700' : 'bg-blue-600 hover:bg-blue-700'}>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        ยืนยันการย้าย
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
