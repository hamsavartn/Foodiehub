import Navbar from "../components/sections/Navbar";
import Hero from "../components/sections/Hero";
import CategoryRow from "../components/sections/CategoryRow";
import RestaurantsGrid from "../components/sections/RestaurantsGrid";
import { Restaurant } from "../components/sections/RestaurantCard";
import { supabase } from "../lib/supabaseClient";
import ExploreRestaurants from "../components/sections/ExploreRestaurants";
export const dynamic = "force-dynamic";

export default async function Home() {
  const { data, error } = await supabase
    .from("restaurants")
    .select("id,name,cuisine,rating,eta,delivery,image_url,featured,created_at")
    .order("created_at", { ascending: false })
    .limit(12);

    const restaurants: Restaurant[] =
    data?.map((row) => ({
      id: row.id,
      name: row.name,
      cuisine: row.cuisine,
      rating: Number(row.rating),
      time: row.eta,
      delivery: row.delivery,
      image: row.image_url ?? undefined,
    })) ?? [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-white">
      <Navbar />
      <Hero />
      <CategoryRow />

      <main className="mx-auto max-w-6xl px-4 pb-16">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Explore restaurants</h2>
            <p className="text-muted-foreground">Handpicked favorites near you.</p>
          </div>
        </div>

        {error ? (
          <p className="mt-6 text-sm text-red-600">
            Failed to load restaurants from Supabase: {error.message}
          </p>
        ) : (
          <ExploreRestaurants initial={restaurants} />
        )}

        <footer className="mt-16 border-t pt-8 text-sm text-muted-foreground">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} FoodieHub</p>
            <p>Built with Next.js + shadcn/ui + Supabase</p>
          </div>
        </footer>
      </main>
    </div>
  );
}