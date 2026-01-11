import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  actions?: React.ReactNode;
  gradient?: 'blue' | 'purple' | 'green' | 'orange' | 'rose' | 'navy';
  className?: string;
}

export function PageHeader({ 
  title, 
  subtitle, 
  icon, 
  actions, 
  gradient = 'blue',
  className 
}: PageHeaderProps) {
  const gradientStyles = {
    blue: 'from-blue-600 via-blue-500 to-cyan-500',
    purple: 'from-purple-600 via-purple-500 to-pink-500',
    green: 'from-emerald-600 via-green-500 to-teal-500',
    orange: 'from-orange-500 via-amber-500 to-yellow-500',
    rose: 'from-rose-600 via-pink-500 to-fuchsia-500',
    navy: 'from-slate-800 via-slate-700 to-slate-600',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "relative overflow-hidden rounded-2xl p-6 md:p-8",
        `bg-gradient-to-r ${gradientStyles[gradient]}`,
        className
      )}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute top-0 left-0 w-full h-full opacity-30">
          <div className="w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </div>
      </div>

      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          {icon && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="flex items-center justify-center w-14 h-14 rounded-xl bg-white/20 backdrop-blur-sm shadow-lg"
            >
              <div className="text-white">{icon}</div>
            </motion.div>
          )}
          <div>
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-2xl md:text-3xl font-bold text-white tracking-tight"
            >
              {title}
            </motion.h1>
            {subtitle && (
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-white/80 mt-1 text-sm md:text-base"
              >
                {subtitle}
              </motion.p>
            )}
          </div>
        </div>
        {actions && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-2"
          >
            {actions}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
