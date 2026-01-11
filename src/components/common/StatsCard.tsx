import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  description?: string;
  icon: React.ReactElement;
  trend?: {
    value: number;
    label?: string;
    isPositive: boolean;
  };
  variant?: 'default' | 'student' | 'teacher' | 'staff' | 'company' | 'success' | 'warning';
  className?: string;
}

export function StatsCard({ 
  title, 
  value, 
  subtitle,
  description, 
  icon, 
  trend, 
  variant = 'default',
  className 
}: StatsCardProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'student':
        return 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200';
      case 'teacher':
        return 'bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200';
      case 'staff':
        return 'bg-gradient-to-br from-green-50 to-green-100 border-green-200';
      case 'company':
        return 'bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200';
      case 'success':
        return 'bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200';
      case 'warning':
        return 'bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200';
      default:
        return 'bg-white border-gray-200';
    }
  };

  const getIconColor = () => {
    switch (variant) {
      case 'student': return 'text-blue-600';
      case 'teacher': return 'text-purple-600';
      case 'staff': return 'text-green-600';
      case 'company': return 'text-orange-600';
      case 'success': return 'text-emerald-600';
      case 'warning': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "relative overflow-hidden rounded-xl border p-6 shadow-sm transition-all hover:shadow-md",
        getVariantStyles(),
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2 flex-1">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {subtitle && (
            <p className="text-sm text-gray-600">{subtitle}</p>
          )}
          {description && (
            <p className="text-sm text-gray-600">{description}</p>
          )}
          {trend && (
            <div className="flex items-center gap-1 text-sm">
              <span className={trend.isPositive ? 'text-green-600' : 'text-red-600'}>
                {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
              </span>
              {trend.label && <span className="text-gray-500">{trend.label}</span>}
            </div>
          )}
        </div>
        <div className={cn("p-3 rounded-xl bg-white/50", getIconColor())}>
          {React.cloneElement(icon, { className: cn("h-6 w-6", getIconColor()) })}
        </div>
      </div>
    </motion.div>
  );
}
