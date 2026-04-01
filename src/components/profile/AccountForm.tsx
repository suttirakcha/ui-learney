import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function AccountForm() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Account Settings</h2>

      <div className="space-y-4">
        <div>
          <label className="text-sm">Full Name</label>
          <Input defaultValue="สมชาย นักเรียน" />
        </div>

        <div>
          <label className="text-sm">Email</label>
          <Input defaultValue="student@learney.com" />
        </div>

        <div>
          <label className="text-sm">Bio</label>
          <Textarea placeholder="Tell us about yourself..." />
        </div>

        <Button className="bg-cyan-500 hover:bg-cyan-600">
          บันทึกการเปลี่ยนแปลง
        </Button>
      </div>
    </div>
  );
}
