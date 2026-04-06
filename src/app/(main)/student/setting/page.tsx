import AccountForm from "@/components/profile/AccountForm";
import SecurityCard from "@/components/profile/SecurityCard";

export default function StudentPage() {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* <ProfileHeader /> */}

      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-6 p-6">
        {/* <Sidebar role="student" /> */}

        <div className="md:col-span-3 space-y-6">
          <AccountForm />
          <SecurityCard />
        </div>
      </div>
    </div>
  );
}
