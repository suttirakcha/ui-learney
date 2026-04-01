import { useTranslations } from "next-intl";

export default function RecentActions() {
  const t = useTranslations("admin.recentActions");

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
      <h3 className="font-semibold">{t("title")}</h3>

      <div className="space-y-3">
        <div className="border-b pb-2">
          <p className="font-medium">{t("action1")}</p>
          <p className="text-sm text-gray-500">
            {t("desc1")}
          </p>
        </div>

        <div className="border-b pb-2">
          <p className="font-medium">{t("action2")}</p>
          <p className="text-sm text-gray-500">{t("desc2")}</p>
        </div>

        <div>
          <p className="font-medium">{t("action3")}</p>
          <p className="text-sm text-gray-500">{t("desc3")}</p>
        </div>
      </div>
    </div>
  );
}
