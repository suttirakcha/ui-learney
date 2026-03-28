"use client";

import { useRouter } from "next/navigation";

export default function PendingActions({ id }: { id: string }) {
  const router = useRouter();

  const approve = async () => {
    await fetch(`http://localhost:3000/admin/courses/${id}/approve`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    router.refresh();
  };

  const remove = async () => {
    await fetch(`http://localhost:3000/admin/courses/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    router.refresh();
  };

  return (
    <>
      <button onClick={approve}>Approve</button>
      <button onClick={remove}>Delete</button>
    </>
  );
}
