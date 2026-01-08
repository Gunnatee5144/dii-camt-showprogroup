import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center px-4">
        <div className="mb-8">
          <div className="flex items-center justify-center w-20 h-20 mx-auto rounded-2xl bg-gradient-hero mb-6">
            <span className="text-3xl font-bold text-accent">404</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            ไม่พบหน้าที่ต้องการ
          </h1>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            หน้าที่คุณกำลังมองหาอาจถูกย้าย ลบ หรือไม่เคยมีอยู่
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button variant="outline" asChild>
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              กลับหน้าก่อนหน้า
            </Link>
          </Button>
          <Button variant="hero" asChild>
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              กลับหน้าหลัก
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
