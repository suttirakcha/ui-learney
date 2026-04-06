import AccountForm from "@/components/profile/AccountForm";
import SecurityCard from "@/components/profile/SecurityCard";

export default function AdminSettingsForm() {
  return (
    <div className="space-y-6">
      <AccountForm title="การตั้งค่าผู้ดูแลระบบ" />
      <SecurityCard />
    </div>
  );
}
