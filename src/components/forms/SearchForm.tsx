"use client";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Search, X } from "lucide-react";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";

interface SearchFormProps {
  placeholder?: string;
  onSearch?: (value: string) => void;
}

export default function SearchForm({ placeholder, onSearch }: SearchFormProps) {
  const { control, register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      search: "",
    },
  });
  const search = useWatch({
    control,
    name: "search",
  });

  useEffect(() => {
    const subscription = watch((values) => {
      onSearch?.(values.search ?? "");
    });
    return () => subscription.unsubscribe();
  }, [watch, onSearch]);

  const onSubmit = () => {
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
