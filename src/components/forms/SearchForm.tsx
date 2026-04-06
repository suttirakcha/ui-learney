"use client";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Search, X } from "lucide-react";
import { useForm } from "react-hook-form";

interface SearchFormProps {
  placeholder?: string;
}

export default function SearchForm({ placeholder }: SearchFormProps) {
  const { register, handleSubmit, setValue, getValues } = useForm({
    defaultValues: {
      search: "",
    },
  });

  const onSubmit = (values: { search: string }) => {
    // router
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
        {getValues("search") && (
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
