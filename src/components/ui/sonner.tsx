import { useTheme } from "next-themes";
import { Toaster as Sonner, toast } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group font-['IBM_Plex_Sans_Thai']"
      position="bottom-right"
      expand={true}
      richColors
      duration={4000}
      gap={12}
      toastOptions={{
        classNames: {
          toast:
            "group toast min-w-[380px] group-[.toaster]:bg-white group-[.toaster]:text-slate-900 group-[.toaster]:border group-[.toaster]:border-slate-200 group-[.toaster]:shadow-lg group-[.toaster]:rounded-lg group-[.toaster]:p-4",
          description: "group-[.toast]:text-slate-600 group-[.toast]:text-sm group-[.toast]:mt-1",
          actionButton: "group-[.toast]:bg-slate-900 group-[.toast]:text-white group-[.toast]:rounded-md group-[.toast]:font-medium group-[.toast]:px-3 group-[.toast]:py-1.5 group-[.toast]:text-sm",
          cancelButton: "group-[.toast]:bg-slate-100 group-[.toast]:text-slate-700 group-[.toast]:rounded-md group-[.toast]:font-medium group-[.toast]:px-3 group-[.toast]:py-1.5 group-[.toast]:text-sm",
          success: "group-[.toaster]:!bg-emerald-50 group-[.toaster]:!border-emerald-200 group-[.toaster]:!text-emerald-900",
          error: "group-[.toaster]:!bg-red-50 group-[.toaster]:!border-red-200 group-[.toaster]:!text-red-900",
          warning: "group-[.toaster]:!bg-amber-50 group-[.toaster]:!border-amber-200 group-[.toaster]:!text-amber-900",
          info: "group-[.toaster]:!bg-blue-50 group-[.toaster]:!border-blue-200 group-[.toaster]:!text-blue-900",
          title: "group-[.toast]:font-semibold group-[.toast]:text-base",
        },
      }}
      {...props}
    />
  );
};

export { Toaster, toast };
