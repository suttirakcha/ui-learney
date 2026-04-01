import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function EmptyState() {
  const t = useTranslations("admin.pendingCourses");

  return (
    <Card className="py-16">
      <CardContent className="flex flex-col items-center text-center space-y-4">
        <div className="bg-blue-100 p-4 rounded-full">
          <CheckCircle className="text-blue-500 w-8 h-8" />
        </div>

        <h2 className="text-lg font-semibold">{t("emptyStateTitle")}</h2>

        <p className="text-sm text-muted-foreground">
          {t("emptyStateDesc")}
        </p>

        <Link href="/admin/profile">
          <Button variant="outline">{t("backToProfile")}</Button>
        </Link>
      </CardContent>
    </Card>
  );
}
