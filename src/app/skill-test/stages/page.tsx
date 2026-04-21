"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

const stages = [
  {
    slug: "primary-school",
    title: "Primary School (7–12)",
    description: "25-35 questions / 5 min",
    color: "#F472B6",
  },
  // 3 more...
];

export default function StagesPage() {
  return (
    <main className="section-frame py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">
          Choose Your Stage
        </h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stages.map((stage) => (
            <Link
              key={stage.slug}
              href={`/skill-test/questions?stageSlug=${stage.slug}`}
            >
              <div className="group bg-gradient-to-br from-white/80 to-white/50 backdrop-blur-lg rounded-2xl p-8 hover:-translate-y-2 transition-all cursor-pointer border border-white/30">
                <Sparkles className="h-12 w-12 mx-auto text-primary mb-4" />
                <h2 className="text-2xl font-bold text-center mb-4">
                  {stage.title}
                </h2>
                <p className="text-muted-foreground text-center mb-6">
                  {stage.description}
                </p>
                <Button className="w-full bg-primary hover:bg-primary/90">
                  Start Test
                </Button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
