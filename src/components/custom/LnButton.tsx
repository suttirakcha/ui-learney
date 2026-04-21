import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { VariantProps } from "class-variance-authority";

export default function LnButton(
  props: React.ComponentProps<"button"> &
    VariantProps<typeof buttonVariants> & {
      asChild?: boolean;
    },
) {
  const buttonProps = {
    ...props,
    className: cn("text-base px-4 py-2 h-fit", props.className),
  };

  return <Button {...buttonProps}>{props.children}</Button>;
}
