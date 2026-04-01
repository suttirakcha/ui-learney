import InstructorSettingsForm from "@/components/features/instructor-settings-form";
import SecurityCard from "../SecurityCard";

export default function InstructorProfileSettings() {
  return (
    <div className="space-y-6">
      <InstructorSettingsForm />
      <SecurityCard />
    </div>
  );
}
