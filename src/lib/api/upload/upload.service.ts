const API_URL = process.env.NEXT_PUBLIC_API!;

async function parseUploadResponse(res: Response) {
  const text = await res.text();

  let data;

  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    console.error("❌ UPLOAD NOT JSON:", text);
    throw new Error("Invalid upload response");
  }

  if (!res.ok) {
    console.error("❌ UPLOAD ERROR:", data);
    throw new Error(data?.message || "Upload failed");
  }

  return data as { url?: string };
}

export async function uploadVideo(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_URL}/upload/video`, {
    method: "POST",
    body: formData,
    credentials: "include", // 👈 เผื่อ backend ใช้ cookie
  });

  console.log("🎥 UPLOAD STATUS:", res.status);

  const data = await parseUploadResponse(res);

  return data.url ?? "";
}

export async function uploadImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_URL}/upload/image`, {
    method: "POST",
    body: formData,
    credentials: "include",
  });

  console.log("🖼️ UPLOAD STATUS:", res.status);

  const data = await parseUploadResponse(res);

  return data.url ?? "";
}
