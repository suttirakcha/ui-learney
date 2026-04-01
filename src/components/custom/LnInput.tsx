import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function LnInput(props: React.ComponentProps<"input">) {
  const { className, ...rest } = props;
  const inputProps = {
    ...rest,
    className: cn("input placeholder:text-gray-400 h-10", className),
  };
  return <Input {...inputProps} />;
}
