import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SecurityCard() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm flex justify-between items-center">
      <div className="flex gap-3 items-center">
        <div className="bg-cyan-100 p-2 rounded-lg">
          <Lock className="text-cyan-600" size={18} />
        </div>

        <div>
          <p className="font-medium">เปลี่ยนรหัสผ่าน</p>
          <p className="text-sm text-gray-500">
            Update your password to keep your account secure
          </p>
        </div>
      </div>

      <Button variant="outline">แก้ไข</Button>
    </div>
  );
}
