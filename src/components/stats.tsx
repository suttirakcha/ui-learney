import { statsConfig } from "@/lib/mock-data";

export default function Stats() {
  return (
    <section className="py-12 bg-gray-50 border-y border-gray-100">
      <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {statsConfig.map(({ value, label, Icon }) => (
          <div
            key={label}
            className="flex flex-col items-center gap-2 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#4fd6f0]/10 flex items-center justify-center mb-1 group-hover:bg-[#4fd6f0]/20 transition-colors">
              <Icon className="h-6 w-6 text-[#4fd6f0]" />
            </div>
            <span className="text-3xl font-bold text-gray-900">{value}</span>
            <span className="text-sm text-gray-500">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
