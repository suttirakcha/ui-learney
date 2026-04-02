// import { Card, CardContent } from "@/components/ui/card";
// import { BookOpen, FileText, XCircle } from "lucide-react";
// import { Course } from "@/types/course";

// interface Props {
//   courses: Course[];
// }

// export default function PendingStats({ courses }: Props) {
//   const newCourses = courses.filter((c) => c.type === "new").length;
//   const updated = courses.filter((c) => c.type === "updated").length;
//   const deleted = courses.filter((c) => c.type === "deleted").length;

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//       <Card>
//         <CardContent className="flex justify-between p-4">
//           <div>
//             <p className="text-sm text-muted-foreground">คอร์สใหม่</p>
//             <p className="text-xl font-bold">{newCourses}</p>
//             <p className="text-xs text-muted-foreground">รอการอนุมัติ</p>
//           </div>
//           <BookOpen className="text-blue-500" />
//         </CardContent>
//       </Card>

//       <Card>
//         <CardContent className="flex justify-between p-4">
//           <div>
//             <p className="text-sm text-muted-foreground">คอร์สที่แก้ไข</p>
//             <p className="text-xl font-bold">{updated}</p>
//             <p className="text-xs text-muted-foreground">รอการอนุมัติ</p>
//           </div>
//           <FileText className="text-orange-500" />
//         </CardContent>
//       </Card>

//       <Card>
//         <CardContent className="flex justify-between p-4">
//           <div>
//             <p className="text-sm text-muted-foreground">คอร์สที่ถูกลบ</p>
//             <p className="text-xl font-bold">{deleted}</p>
//             <p className="text-xs text-muted-foreground">รอการอนุมัติ</p>
//           </div>
//           <XCircle className="text-red-500" />
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
