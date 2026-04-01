import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

export default function LnTextarea(props: React.ComponentProps<'textarea'>) {
  const textareaProps = {
    ...props,
    className: cn(
      'input placeholder:text-gray-400 resize-none',
      props.className
    ),
  };
  return <Textarea {...textareaProps} />;
}
