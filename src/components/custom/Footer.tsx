// import Link from "next/link";
// import LearneyLogo from "./LearneyLogo";

// export default function Footer() {
//   return (
//     <footer className="p-8 ">
//       <div className="grid grid-cols-3 items-center  ">
//         <div className="flex gap-4 justify-start">
//           <Link href="/about">About</Link>
//           <Link href="/contact">Contact</Link>
//           <Link href="/privacy">Privacy</Link>
//         </div>
//         <div className="flex items-center  justify-center">
//           <LearneyLogo />
//         </div>
//         {/* <p>เสริมพลังงานผู้เรียนทั่วโลกด้วยการศึกษาออนไลน์คุณภาพสูง</p>
//         <div className="flex gap-4 justify-center">
//         <Link href="/about">About</Link>
//         <Link href="/contact">Contact</Link>
//         <Link href="/privacy">Privacy</Link>
//         </div> */}
//         <p className="text-end ">© 2026 Learney. All rights reserved. </p>
//       </div>{" "}
//     </footer>
//   );
// }

import Link from "next/link";
import LearneyLogo from "./LearneyLogo";
import FacebookSolidIcon from "../icons/FacebookIcon";
import InstagramIcon from "../icons/InstagramIcon";
// import { Facebook, Twitter, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t mt-20">
      <div className="max-w-7xl mx-auto px-8 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* LEFT - BRAND */}
        <div className="space-y-4">
          <LearneyLogo />
          <p className="text-gray-600 text-sm leading-relaxed">
            เสริมพลังการเรียนรู้ของคุณ ด้วยแพลตฟอร์มรวมวิดีโอการศึกษาคุณภาพ
            จากทั่วโลก เรียนได้ทุกที่ ทุกเวลา
          </p>
        </div>

        {/* CENTER - LINKS */}
        <div className="flex flex-col items-start md:items-center space-y-3">
          <h3 className="font-semibold text-gray-800">Explore</h3>
          <Link
            href="/about"
            className="text-gray-600 hover:text-blue-500 transition"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-gray-600 hover:text-blue-500 transition"
          >
            Contact
          </Link>
          <Link
            href="/privacy"
            className="text-gray-600 hover:text-blue-500 transition"
          >
            Privacy Policy
          </Link>
        </div>

        {/* RIGHT - SOCIAL */}
        <div className="flex flex-col items-start md:items-end space-y-4">
          <h3 className="font-semibold text-gray-800">Follow us</h3>
          <div className="flex gap-4">
            <FacebookSolidIcon />
            <InstagramIcon />
            {/* <Facebook className="w-5 h-5 text-gray-600 hover:text-blue-500 cursor-pointer transition" />
            <Twitter className="w-5 h-5 text-gray-600 hover:text-blue-500 cursor-pointer transition" />
            <Youtube className="w-5 h-5 text-gray-600 hover:text-red-500 cursor-pointer transition" /> */}
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="border-t text-center py-4 text-sm text-gray-500">
        © 2026 Learney. All rights reserved.
      </div>
    </footer>
  );
}
