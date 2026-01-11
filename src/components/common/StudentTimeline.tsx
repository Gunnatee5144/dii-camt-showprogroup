import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { TimelineEvent } from '@/types';
import { Calendar, Award, BookOpen, AlertTriangle, TrendingUp, Flag } from 'lucide-react';

interface StudentTimelineProps {
  events: TimelineEvent[];
  showFilters?: boolean;
}

const getEventIcon = (type: TimelineEvent['type']) => {
  switch (type) {
    case 'enrollment':
      return <Flag className="w-4 h-4" />;
    case 'course':
      return <BookOpen className="w-4 h-4" />;
    case 'grade':
      return <TrendingUp className="w-4 h-4" />;
    case 'achievement':
      return <Award className="w-4 h-4" />;
    case 'warning':
      return <AlertTriangle className="w-4 h-4" />;
    default:
      return <Calendar className="w-4 h-4" />;
  }
};

const getEventColor = (type: TimelineEvent['type']) => {
  switch (type) {
    case 'enrollment':
      return 'bg-blue-500';
    case 'achievement':
      return 'bg-yellow-500';
    case 'grade':
      return 'bg-green-500';
    case 'warning':
      return 'bg-red-500';
    case 'plan_change':
      return 'bg-orange-500';
    default:
      return 'bg-gray-500';
  }
};

export function StudentTimeline({ events, showFilters = false }: StudentTimelineProps) {
  const [filter, setFilter] = React.useState<string>('all');

  const filteredEvents = React.useMemo(() => {
    if (filter === 'all') return events;
    return events.filter(event => event.type === filter);
  }, [events, filter]);

  const groupedByYear = React.useMemo(() => {
    const groups: Record<string, TimelineEvent[]> = {};
    filteredEvents.forEach(event => {
      const year = event.academicYear;
      if (!groups[year]) {
        groups[year] = [];
      }
      groups[year].push(event);
    });
    return groups;
  }, [filteredEvents]);

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold">Timeline การเรียน</CardTitle>
          {showFilters && (
            <div className="flex gap-2">
              <Badge
                variant={filter === 'all' ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => setFilter('all')}
              >
                ทั้งหมด
              </Badge>
              <Badge
                variant={filter === 'achievement' ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => setFilter('achievement')}
              >
                รางวัล
              </Badge>
              <Badge
                variant={filter === 'warning' ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => setFilter('warning')}
              >
                แจ้งเตือน
              </Badge>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px] pr-4">
          {Object.entries(groupedByYear).reverse().map(([year, yearEvents]) => (
            <div key={year} className="mb-8">
              <h3 className="text-lg font-semibold mb-4 text-primary">
                ปีการศึกษา {year}
              </h3>
              <div className="relative border-l-2 border-gray-200 pl-6 ml-2 space-y-6">
                {yearEvents.map((event, index) => (
                  <div key={event.id} className="relative">
                    {/* Timeline dot */}
                    <div
                      className={`absolute -left-[29px] top-2 w-4 h-4 rounded-full border-2 border-white ${getEventColor(event.type)}`}
                    />
                    
                    {/* Event card */}
                    <div
                      className={`bg-white rounded-lg border p-4 hover:shadow-md transition-shadow ${
                        event.isImportant ? 'border-yellow-400 border-2' : 'border-gray-200'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {getEventIcon(event.type)}
                          <h4 className="font-semibold text-gray-900">
                            {event.titleThai || event.title}
                          </h4>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          เทอม {event.semester}/{event.academicYear}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-2">
                        {event.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          {new Date(event.date).toLocaleDateString('th-TH', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </span>
                        
                        {event.tags && event.tags.length > 0 && (
                          <div className="flex gap-1">
                            {event.tags.slice(0, 3).map((tag, i) => (
                              <Badge key={i} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          
          {filteredEvents.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>ยังไม่มีเหตุการณ์ในช่วงเวลานี้</p>
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
