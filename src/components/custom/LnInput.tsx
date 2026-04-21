import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function LnInput(props: React.ComponentProps<"input">) {
  const { className, ...rest } = props;
  const inputProps = {
    ...rest,
    className: cn(
      "h-12 px-4 py-3 bg-glass-bg/80 backdrop-blur-sm border border-glass-border rounded-2xl placeholder:text-muted-foreground text-foreground focus:ring-2 ring-primary/50 focus:border-primary/70 transition-all duration-200 shadow-sm hover:shadow-md hover:shadow-primary/20 hover:-translate-y-px",
      className,
    ),
  };
  return <Input {...inputProps} />;
}
