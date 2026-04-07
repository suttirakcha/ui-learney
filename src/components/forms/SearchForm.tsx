"use client";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Search, X } from "lucide-react";
import { useForm, useWatch } from "react-hook-form";
import { useRouter } from "next/navigation";

interface SearchFormProps {
  placeholder?: string;
}

export default function SearchForm({ placeholder }: SearchFormProps) {
  const router = useRouter();
  const { control, register, handleSubmit, setValue, getValues } = useForm({
    defaultValues: {
      search: "",
    },
  });
  const search = useWatch({
    control,
    name: "search",
  });

  const onSubmit = () => {
    const query = getValues("search").trim();
    if (query) {
      router.push(`/courses?search=${encodeURIComponent(query)}`);
    } else {
      router.push("/courses");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputGroup className="p-2 h-10 bg-accent text-muted-foreground">
        <InputGroupInput
          placeholder={placeholder || "Search courses..."}
          {...register("search")}
        />
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
        {search && (
          <InputGroupAddon
            align="inline-end"
            className="cursor-pointer"
            onClick={() => setValue("search", "")}
          >
            <X />
          </InputGroupAddon>
        )}
      </InputGroup>
    </form>
  );
}
