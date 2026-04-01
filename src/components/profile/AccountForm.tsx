import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export default function AccountForm() {
  const t = useTranslations("profile");

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-lg font-semibold mb-4">{t("accountSettings")}</h2>

      <div className="space-y-4">
        <div>
          <label className="text-sm">{t("fullName")}</label>
          <Input defaultValue="สมชาย นักเรียน" />
        </div>

        <div>
          <label className="text-sm">{t("email")}</label>
          <Input defaultValue="student@learney.com" />
        </div>

        <div>
          <label className="text-sm">{t("bio")}</label>
          <Textarea placeholder={t("bioPlaceholder")} />
        </div>

        <Button className="bg-cyan-500 hover:bg-cyan-600">
          {t("saveChanges")}
        </Button>
      </div>
    </div>
  );
}
