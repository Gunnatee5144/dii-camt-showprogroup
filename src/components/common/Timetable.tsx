import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Schedule, Course } from '@/types';
import { Clock, MapPin, User } from 'lucide-react';

interface TimetableProps {
  courses: Course[];
  semester: number;
  academicYear: string;
}

const DAYS = [
  { en: 'monday', th: 'จันทร์', short: 'จ.' },
  { en: 'tuesday', th: 'อังคาร', short: 'อ.' },
  { en: 'wednesday', th: 'พุธ', short: 'พ.' },
  { en: 'thursday', th: 'พฤหัสบดี', short: 'พฤ.' },
  { en: 'friday', th: 'ศุกร์', short: 'ศ.' },
  { en: 'saturday', th: 'เสาร์', short: 'ส.' },
  { en: 'sunday', th: 'อาทิตย์', short: 'อา.' },
];

const TIME_SLOTS = [
  '08:00', '09:00', '10:00', '11:00', '12:00', 
  '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'
];

export function Timetable({ courses, semester, academicYear }: TimetableProps) {
  // Group schedules by day
  const schedulesByDay = React.useMemo(() => {
    const byDay: Record<string, Array<{ course: Course; schedule: Schedule }>> = {};
    
    DAYS.forEach(day => {
      byDay[day.en] = [];
    });
    
    courses.forEach(course => {
      course.schedule.forEach(schedule => {
        byDay[schedule.day].push({ course, schedule });
      });
    });
    
    return byDay;
  }, [courses]);

  const totalCredits = courses.reduce((sum, course) => sum + course.credits, 0);

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold">
            ตารางเรียน เทอม {semester}/{academicYear}
          </CardTitle>
          <Badge variant="secondary" className="text-sm">
            {totalCredits} หน่วยกิต
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {/* Desktop Table View */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-200 p-3 text-left font-semibold text-sm w-24">
                  เวลา
                </th>
                {DAYS.map(day => (
                  <th key={day.en} className="border border-gray-200 p-3 text-center font-semibold text-sm">
                    <div>{day.th}</div>
                    <div className="text-xs text-gray-500 font-normal">{day.short}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TIME_SLOTS.map((time, timeIndex) => (
                <tr key={time}>
                  <td className="border border-gray-200 p-2 text-sm text-gray-600 bg-gray-50">
                    {time}
                  </td>
                  {DAYS.map(day => {
                    const daySchedules = schedulesByDay[day.en];
                    const classAtThisTime = daySchedules.find(({ schedule }) => {
                      return schedule.startTime <= time && schedule.endTime > time;
                    });

                    if (classAtThisTime) {
                      // Only render if this is the first time slot of the class
                      const { course, schedule } = classAtThisTime;
                      const isFirstSlot = schedule.startTime === time;
                      
                      if (isFirstSlot) {
                        const { course, schedule } = classAtThisTime;
                        const startIndex = TIME_SLOTS.indexOf(schedule.startTime);
                        const endIndex = TIME_SLOTS.findIndex(t => t >= schedule.endTime);
                        const rowSpan = endIndex - startIndex;

                        return (
                          <td
                            key={day.en}
                            rowSpan={rowSpan}
                            className="border border-gray-200 p-3 bg-blue-50 hover:bg-blue-100 transition-colors"
                          >
                            <div className="space-y-1">
                              <div className="font-semibold text-sm text-blue-900">
                                {course.code}
                              </div>
                              <div className="text-xs text-gray-700 line-clamp-2">
                                {course.nameThai}
                              </div>
                              <div className="flex items-center gap-1 text-xs text-gray-600">
                                <MapPin className="w-3 h-3" />
                                {schedule.room}
                              </div>
                              <div className="flex items-center gap-1 text-xs text-gray-600">
                                <User className="w-3 h-3" />
                                <span className="truncate">{course.lecturerName}</span>
                              </div>
                            </div>
                          </td>
                        );
                      }
                      return null;
                    }

                    return (
                      <td key={day.en} className="border border-gray-200 p-3 bg-white">
                        {/* Empty cell */}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile List View */}
        <div className="lg:hidden space-y-4">
          {DAYS.map(day => {
            const daySchedules = schedulesByDay[day.en];
            if (daySchedules.length === 0) return null;

            return (
              <div key={day.en} className="border rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-3 text-primary">{day.th}</h3>
                <div className="space-y-3">
                  {daySchedules.map(({ course, schedule }, index) => (
                    <div key={index} className="bg-blue-50 rounded-lg p-3 space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-semibold text-blue-900">
                            {course.code}
                          </div>
                          <div className="text-sm text-gray-700">
                            {course.nameThai}
                          </div>
                        </div>
                        <Badge variant="secondary">{course.credits} หน่วยกิต</Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        {schedule.startTime} - {schedule.endTime}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4" />
                        {schedule.room} {schedule.building}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <User className="w-4 h-4" />
                        {course.lecturerName}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Course List */}
        <div className="mt-6 space-y-2">
          <h3 className="font-semibold text-lg">รายวิชาทั้งหมด</h3>
          <div className="grid gap-2">
            {courses.map(course => (
              <div key={course.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <span className="font-semibold">{course.code}</span>
                  <span className="ml-2 text-sm text-gray-600">{course.nameThai}</span>
                </div>
                <div className="text-sm text-gray-600">
                  {course.credits} หน่วยกิต
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
