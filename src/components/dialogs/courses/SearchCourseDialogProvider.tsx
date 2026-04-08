"use client";

import { coursesData, type Course } from "@/data/courses";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

interface SearchCourseDialogContextValue {
  query: string;
  setQuery: (query: string) => void;
  results: Course[];
  isLoading: boolean;
  error: string | null;
}

const SearchCourseDialogContext =
  createContext<SearchCourseDialogContextValue | null>(null);

export function useSearchCourseDialog() {
  const ctx = useContext(SearchCourseDialogContext);
  if (!ctx) {
    throw new Error(
      "useSearchCourseDialog must be used within SearchCourseDialogProvider"
    );
  }
  return ctx;
}

async function searchCourses(query: string): Promise<Course[]> {
  // Simulate async search — replace with a real API call when ready
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const lower = query.toLowerCase();
        const results = coursesData.filter(
          (c) =>
            c.title.toLowerCase().includes(lower) ||
            c.instructor.toLowerCase().includes(lower) ||
            c.category.toLowerCase().includes(lower)
        );
        resolve(results);
      } catch {
        reject(new Error("Search failed. Please try again."));
      }
    }, 300);
  });
}

export default function SearchCourseDialogProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Course[]>(coursesData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSearch = useCallback(async (q: string) => {
    if (!q.trim()) {
      setResults(coursesData);
      setIsLoading(false);
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = await searchCourses(q);
      setResults(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      handleSearch(query);
    }, 300);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, handleSearch]);

  return (
    <SearchCourseDialogContext.Provider
      value={{ query, setQuery, results, isLoading, error }}
    >
      {children}
    </SearchCourseDialogContext.Provider>
  );
}
