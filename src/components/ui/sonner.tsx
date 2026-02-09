import { useTheme } from "next-themes";
import { Toaster as Sonner, toast } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      position="top-right"
      expand={false}
      richColors
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-white/95 group-[.toaster]:backdrop-blur-xl group-[.toaster]:text-slate-900 group-[.toaster]:border-slate-200/60 group-[.toaster]:shadow-2xl group-[.toaster]:shadow-slate-200/50 group-[.toaster]:rounded-2xl group-[.toaster]:p-5",
          description: "group-[.toast]:text-slate-500 group-[.toast]:text-sm",
          actionButton: "group-[.toast]:bg-slate-900 group-[.toast]:text-white group-[.toast]:rounded-xl group-[.toast]:font-semibold group-[.toast]:shadow-lg",
          cancelButton: "group-[.toast]:bg-slate-100 group-[.toast]:text-slate-600 group-[.toast]:rounded-xl group-[.toast]:font-medium",
          success: "group-[.toaster]:!bg-gradient-to-r group-[.toaster]:!from-emerald-50/95 group-[.toaster]:!to-teal-50/95 group-[.toaster]:!border-emerald-200/60 group-[.toaster]:!text-emerald-900",
          error: "group-[.toaster]:!bg-gradient-to-r group-[.toaster]:!from-red-50/95 group-[.toaster]:!to-rose-50/95 group-[.toaster]:!border-red-200/60 group-[.toaster]:!text-red-900",
          warning: "group-[.toaster]:!bg-gradient-to-r group-[.toaster]:!from-amber-50/95 group-[.toaster]:!to-yellow-50/95 group-[.toaster]:!border-amber-200/60 group-[.toaster]:!text-amber-900",
          info: "group-[.toaster]:!bg-gradient-to-r group-[.toaster]:!from-blue-50/95 group-[.toaster]:!to-indigo-50/95 group-[.toaster]:!border-blue-200/60 group-[.toaster]:!text-blue-900",
          title: "group-[.toast]:font-bold group-[.toast]:text-sm",
        },
      }}
      {...props}
    />
  );
};

export { Toaster, toast };
