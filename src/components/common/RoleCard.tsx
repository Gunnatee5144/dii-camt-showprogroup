import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { UserRole } from '@/types';

interface RoleCardProps {
  role: UserRole;
  title: string;
  description: string;
  icon: LucideIcon;
  onClick: () => void;
  isSelected?: boolean;
}

export function RoleCard({ role, title, description, icon: Icon, onClick, isSelected }: RoleCardProps) {
  const getRoleStyles = () => {
    switch (role) {
      case 'student':
        return {
          gradient: 'from-role-student to-blue-600',
          bg: 'bg-role-student/10',
          border: 'border-role-student',
          text: 'text-role-student',
        };
      case 'teacher':
        return {
          gradient: 'from-role-teacher to-green-600',
          bg: 'bg-role-teacher/10',
          border: 'border-role-teacher',
          text: 'text-role-teacher',
        };
      case 'staff':
        return {
          gradient: 'from-role-staff to-purple-600',
          bg: 'bg-role-staff/10',
          border: 'border-role-staff',
          text: 'text-role-staff',
        };
      case 'company':
        return {
          gradient: 'from-role-company to-yellow-600',
          bg: 'bg-role-company/10',
          border: 'border-role-company',
          text: 'text-role-company',
        };
    }
  };

  const styles = getRoleStyles();

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "relative w-full p-6 rounded-2xl border-2 text-left transition-all duration-300",
        "hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2",
        isSelected ? `${styles.border} ${styles.bg} shadow-lg` : 'border-border bg-card hover:border-muted-foreground/30'
      )}
    >
      <div className="flex items-start gap-4">
        <div className={cn(
          "flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br",
          styles.gradient
        )}>
          <Icon className="h-7 w-7 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-foreground mb-1">{title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        </div>
      </div>
      {isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className={cn(
            "absolute top-3 right-3 w-6 h-6 rounded-full bg-gradient-to-br flex items-center justify-center",
            styles.gradient
          )}
        >
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>
      )}
    </motion.button>
  );
}
