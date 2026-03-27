import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function LnInput(props: React.ComponentProps<"input">) {
  const { className, ...rest } = props;
  const inputProps = {
    ...rest,
    className: cn("", className),
  };
  return <Input {...inputProps} />;
}
