const API_URL = "http://localhost:8000";

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

  const responseData = await res.json();

  if (!res.ok) {
    // ✅ THROW ให้ frontend ใช้ได้
    throw {
      response: {
        data: responseData,
      },
    };
  }

  return responseData;
}

export async function login(data: { email: string; password: string }) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const responseData = await res.json();

  if (!res.ok) {
    throw {
      response: {
        data: responseData,
      },
    };
  }

  return responseData;
}
