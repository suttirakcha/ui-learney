// import LnButton from "@/components/custom/LnButton";
// import Navbar from "@/components/custom/Navbar";
// import Header from "@/components/custom/Header";
// import Button from "@/components/custom/Button";
// import LearneyLogo from "@/components/custom/LearneyLogo";

// export default function Home() {
//   return (
//     <div>
//       <Navbar />
//       <LnButton>SWAGGGGG</LnButton>
//       <LnButton variant="ghost">Ghost</LnButton>
//       {/* <Header /> */}
//       <Button variant="primary">Primary</Button>
//       <LearneyLogo />
//     </div>
//   );
// }

// app/page.tsx
import Navbar from "@/components/custom/Navbar";
import Hero from "@/components/custom/Hero";
import Stats from "@/components/custom/Stats";
import CourseList from "@/components/custom/CourseList";
import CTA from "@/components/custom/CTA";
import Footer from "@/components/custom/Footer";

export default function HomePage() {
  return (
    <main className="flex flex-col">
      <Hero />
      <Stats />
      <CourseList />
      <CTA />
      <Footer />
    </main>
  );
}
