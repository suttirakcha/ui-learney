"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const API_URL = process.env.NEXT_PUBLIC_API!;

export default function PendingActions({ id }: { id: string }) {
  const router = useRouter();

  // ================= APPROVE =================
  const approve = async () => {
    try {
      const res = await fetch(`${API_URL}/admin/courses/${id}/approve`, {
        method: "PATCH",
        credentials: "include", // 🔥 สำคัญมาก (ใช้ cookie)
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("APPROVE ERROR:", text);
        toast.error("Approve failed");
        return;
      }

      toast.success("Approved ✅");

      // refresh data
      router.refresh();
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  // ================= DELETE =================
  const remove = async () => {
    try {
      const res = await fetch(`${API_URL}/admin/courses/${id}`, {
        method: "DELETE",
        credentials: "include", // 🔥 สำคัญมาก
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("DELETE ERROR:", text);
        toast.error("Delete failed");
        return;
      }

      toast.success("Deleted ❌");

      router.refresh();
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={approve}
        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
      >
        Approve
      </button>

      <button
        onClick={remove}
        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
      >
        Delete
      </button>
    </div>
  );
}
