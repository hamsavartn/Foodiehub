"use client";

import * as React from "react";
import RestaurantsGrid from "./RestaurantsGrid";
import type { Restaurant } from "./RestaurantCard";
import { Input } from "../ui/input";
import { Search, X } from "lucide-react";
import { Button } from "../ui/button";

type Category =
  | "All"
  | "Pizza"
  | "Burgers"
  | "Sushi"
  | "Italian"
  | "American"
  | "Japanese";

const categories: Category[] = ["All", "Pizza", "Burgers", "Sushi", "Italian", "American", "Japanese"];

function matchesCategory(r: Restaurant, c: Category) {
  if (c === "All") return true;
  const text = `${r.name} ${r.cuisine}`.toLowerCase();
  return text.includes(c.toLowerCase());
}

export default function ExploreRestaurants({ initial }: { initial: Restaurant[] }) {
  const [query, setQuery] = React.useState("");
  const [category, setCategory] = React.useState<Category>("All");

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return initial.filter((r) => {
      const hay = `${r.name} ${r.cuisine}`.toLowerCase();
      const qOk = q.length === 0 || hay.includes(q);
      const cOk = matchesCategory(r, category);
      return qOk && cOk;
    });
  }, [initial, query, category]);

  return (
    <section className="mt-6">
      {/* Search + category filter bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="pl-9 pr-9"
            placeholder="Search restaurants (e.g., pizza, sushi, burger)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query ? (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label="Clear search"
              type="button"
            >
              <X className="h-4 w-4" />
            </button>
          ) : null}
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <Button
              key={c}
              variant={c === category ? "default" : "outline"}
              className="rounded-full"
              onClick={() => setCategory(c)}
            >
              {c}
            </Button>
          ))}
        </div>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="mt-10 rounded-2xl border bg-white p-8 text-center">
          <p className="text-lg font-semibold">No results found</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Try a different search term or switch categories.
          </p>
          <div className="mt-4">
            <Button variant="outline" onClick={() => { setQuery(""); setCategory("All"); }}>
              Reset filters
            </Button>
          </div>
        </div>
      ) : (
        <RestaurantsGrid restaurants={filtered} />
      )}
    </section>
  );
}