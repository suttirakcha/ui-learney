import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  PlusSquare,
  Users,
  BarChart3,
  UserCircle,
} from "lucide-react";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export function InstructorSidebar() {
  const pathname = usePathname();

  const menuItems = [
    { href: "/instructor/dashboard", label: "แดชบอร์ด", icon: LayoutDashboard },
    { href: "/instructor/courses", label: "คอร์สของฉัน", icon: BookOpen },
    { href: "/instructor/create", label: "สร้างคอร์ส", icon: PlusSquare },
    { href: "/instructor/students", label: "นักเรียน", icon: Users },
    { href: "/instructor/analytics", label: "สถิติ", icon: BarChart3 },
    { href: "/instructor/profile", label: "โปรไฟล์", icon: UserCircle },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <>
      {/* Mobile Menu Button - will be positioned by parent */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="sm" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">เมนู</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0 border-r-0">
          <div className="h-full flex flex-col">
            <div className="p-6 border-b">
              <h2 className="font-bold text-xl text-foreground">
                พื้นที่ผู้สอน
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                จัดการคอร์สของคุณ
              </p>
            </div>
            <nav className="flex-1 p-4 space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group flex items-center gap-3 rounded-xl p-3 text-sm font-medium transition-all ${
                    isActive(item.href)
                      ? "bg-primary text-primary-foreground border-primary shadow-sm font-semibold"
                      : "border-border hover:bg-accent hover:text-foreground"
                  }`}
                >
                  <item.icon className="h-4 w-4 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-64 border-r bg-background/95 backdrop-blur">
        <div className="p-6 border-b">
          <h2 className="font-bold text-xl text-foreground">พื้นที่ผู้สอน</h2>
          <p className="text-sm text-muted-foreground mt-1">
            จัดการคอร์สของคุณ
          </p>
        </div>
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex items-center gap-3 rounded-xl p-3 text-sm font-medium transition-all ${
                isActive(item.href)
                  ? "bg-primary text-primary-foreground border-primary shadow-sm font-semibold"
                  : "border-border hover:bg-accent hover:text-foreground"
              }`}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}
