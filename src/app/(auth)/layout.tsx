export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10">
      <div className="orb-pink pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full blur-3xl sm:h-96 sm:w-96" />
      <div className="orb-purple pointer-events-none absolute right-[-4rem] top-1/4 h-72 w-72 rounded-full blur-3xl sm:h-96 sm:w-96" />
      <div className="orb-yellow pointer-events-none absolute bottom-[-4rem] left-1/3 h-64 w-64 rounded-full blur-3xl sm:h-80 sm:w-80" />
      <div className="calm-surface relative w-full max-w-6xl rounded-[2rem] p-4 shadow-[var(--shadow-soft)] sm:p-8">
        <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center rounded-[1.5rem]">
          {children}
        </div>
      </div>
    </div>
  );
}
