import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface AccountFormProps {
  defaultFullname?: string;
  defaultEmail?: string;
  title?: string;
}

export default function AccountForm({
  defaultFullname = "สมชาย นักเรียน",
  defaultEmail = "student@learney.com",
  title = "การตั้งค่าบัญชี",
}: AccountFormProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>

      <div className="space-y-4">
        <div>
          <label className="text-sm">ชื่อ - นามสกุล</label>
          <Input defaultValue={defaultFullname} />
        </div>

        <div>
          <label className="text-sm">อีเมล</label>
          <Input defaultValue={defaultEmail} />
        </div>

        <div>
          <label className="text-sm">แนะนำตัว</label>
          <Textarea placeholder="บอกเราสักนิดเกี่ยวกับตัวคุณ" />
        </div>

        <Button className="bg-cyan-500 hover:bg-cyan-600">
          บันทึกการเปลี่ยนแปลง
        </Button>
      </div>
    </div>
  );
}
