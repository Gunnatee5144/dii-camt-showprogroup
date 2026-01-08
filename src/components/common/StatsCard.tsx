import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    label: string;
    isPositive: boolean;
  };
  variant?: 'default' | 'student' | 'teacher' | 'staff' | 'company' | 'success' | 'warning';
  className?: string;
}

export function StatsCard({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  trend, 
  variant = 'default',
  className 
}: StatsCardProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'student':
        return 'bg-gradient-to-br from-role-student/10 to-role-student/5 border-role-student/20';
      case 'teacher':
        return 'bg-gradient-to-br from-role-teacher/10 to-role-teacher/5 border-role-teacher/20';
      case 'staff':
        return 'bg-gradient-to-br from-role-staff/10 to-role-staff/5 border-role-staff/20';
      case 'company':
        return 'bg-gradient-to-br from-role-company/10 to-role-company/5 border-role-company/20';
      case 'success':
        return 'bg-gradient-to-br from-success/10 to-success/5 border-success/20';
      case 'warning':
        return 'bg-gradient-to-br from-warning/10 to-warning/5 border-warning/20';
      default:
        return 'bg-card border-border';
    }
  };

  const getIconColor = () => {
    switch (variant) {
      case 'student': return 'text-role-student';
      case 'teacher': return 'text-role-teacher';
      case 'staff': return 'text-role-staff';
      case 'company': return 'text-role-company';
      case 'success': return 'text-success';
      case 'warning': return 'text-warning';
      default: return 'text-primary';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "relative overflow-hidden rounded-xl border p-6 shadow-card transition-all hover:shadow-card-hover",
        getVariantStyles(),
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold text-foreground">{value}</p>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
          {trend && (
            <div className="flex items-center gap-1 text-sm">
              <span className={trend.isPositive ? 'text-success' : 'text-destructive'}>
                {trend.isPositive ? '+' : ''}{trend.value}%
              </span>
              <span className="text-muted-foreground">{trend.label}</span>
            </div>
          )}
        </div>
        <div className={cn("p-3 rounded-xl bg-background/50", getIconColor())}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </motion.div>
  );
}
