import Image from "next/image";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

export default function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-4 pt-10">
      <div className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-orange-50 via-white to-amber-50">
        <div className="grid gap-8 p-8 md:grid-cols-2 md:p-12">
          <div className="flex flex-col justify-center">
            <Badge className="w-fit bg-orange-600 hover:bg-orange-600">
              Fast delivery • Great deals
            </Badge>

            <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
              Delicious food, <span className="text-orange-600">delivered fast</span>
            </h1>

            <p className="mt-4 text-muted-foreground md:text-lg">
              Discover top restaurants near you, add to cart, and checkout in minutes.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button size="lg">Order Now</Button>
              <Button size="lg" variant="outline">
                Browse restaurants
              </Button>
            </div>
          </div>

          {/* Image / Visual */}
          <div className="relative min-h-[260px] overflow-hidden rounded-2xl bg-gradient-to-br from-orange-200 via-orange-100 to-white md:min-h-[320px]">
            {/* If you have a hero image, put it in /public/assets/hero.jpg and uncomment */}
            {/* <Image src="/assets/hero.jpg" alt="Food" fill className="object-cover" /> */}
            <div className="absolute inset-0 opacity-50" />
            <div className="absolute bottom-4 left-4 rounded-2xl bg-white/70 px-4 py-3 backdrop-blur">
              <p className="text-sm font-medium">Today’s pick</p>
              <p className="text-sm text-muted-foreground">Up to 40% off combos</p>
            </div>
          </div>
        </div>

        {/* subtle glow */}
        <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-orange-300/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-amber-300/30 blur-3xl" />
      </div>
    </section>
  );
}