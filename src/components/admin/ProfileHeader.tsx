"use client";

export default function ProfileHeader() {
  return (
    <div className="bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl p-8 text-white flex items-center gap-6">
      {/* Avatar */}
      <div className="w-20 h-20 rounded-full border-2 border-white flex items-center justify-center text-3xl">
        🛡️
      </div>

      {/* Info */}
      <div>
        <h1 className="text-2xl font-bold">แอดมิน ระบบ</h1>
        <p className="text-sm opacity-90">admin@learny.com</p>

        <span className="inline-block mt-2 text-xs bg-white/20 px-3 py-1 rounded-full">
          Platform Administrator
        </span>
      </div>
    </div>
  );
}
