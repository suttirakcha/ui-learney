const API_URL = "http://localhost:8000"; // backend คุณ

export async function login(data: { email: string; password: string }) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Login failed");

  return res.json();
}

export async function register(data: {
  fullname: string;
  email: string;
  password: string;
  confirmPassword: string;
}) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Register failed");

  return res.json();
}
