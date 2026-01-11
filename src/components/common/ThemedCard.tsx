import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ThemedCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'glass' | 'bordered' | 'gradient';
}

export function ThemedCard({ children, className, variant = 'default' }: ThemedCardProps) {
  const variants = {
    default: 'bg-white border shadow-sm hover:shadow-md transition-shadow',
    elevated: 'bg-white border-0 shadow-lg hover:shadow-xl transition-shadow',
    glass: 'bg-white/70 backdrop-blur-md border border-white/20 shadow-lg',
    bordered: 'bg-white border-2 shadow-sm hover:shadow-md transition-all',
    gradient: 'bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-white border-0 shadow-xl',
  };

  return (
    <Card className={cn(variants[variant], className)}>
      {children}
    </Card>
  );
}

export function ActionCard({ 
  title, 
  description, 
  icon: Icon, 
  onClick,
  variant = 'default'
}: { 
  title: string; 
  description?: string; 
  icon?: any; 
  onClick?: () => void;
  variant?: 'default' | 'primary' | 'success' | 'warning';
}) {
  const variants = {
    default: 'hover:border-primary/50 hover:shadow-md',
    primary: 'border-primary/30 bg-primary/5 hover:bg-primary/10 hover:border-primary',
    success: 'border-success/30 bg-success/5 hover:bg-success/10 hover:border-success',
    warning: 'border-warning/30 bg-warning/5 hover:bg-warning/10 hover:border-warning',
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'p-4 rounded-xl border-2 cursor-pointer transition-all',
        variants[variant]
      )}
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        {Icon && (
          <div className="p-2 rounded-lg bg-primary/10">
            <Icon className="w-5 h-5 text-primary" />
          </div>
        )}
        <div>
          <h3 className="font-semibold">{title}</h3>
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
      </div>
    </motion.div>
  );
}

export function InfoRow({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex justify-between items-center py-2">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}
