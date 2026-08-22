"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

export default function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-4 pt-10">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-orange-50 via-white to-amber-50"
      >
        <div className="grid gap-8 p-8 md:grid-cols-2 md:p-12">
          <div className="flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.05 }}
            >
              <Badge className="w-fit bg-orange-600 hover:bg-orange-600">
                Fast delivery • Great deals
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.12 }}
              className="mt-4 text-4xl font-bold tracking-tight md:text-5xl"
            >
              Delicious food,{" "}
              <span className="relative inline-block bg-gradient-to-r from-orange-600 via-amber-500 to-orange-600 bg-[length:200%_200%] bg-clip-text text-transparent animate-[gradient_4s_ease_infinite]">
  delivered fast
</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18 }}
              className="mt-4 text-muted-foreground md:text-lg"
            >
              Discover top restaurants near you, add to cart, and checkout in minutes.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.25 }}
              className="mt-6 flex flex-wrap gap-3"
            >
              <Button size="lg">Order Now</Button>
              <Button size="lg" variant="outline">
                Browse restaurants
              </Button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.15, ease: "easeOut" }}
            className="relative min-h-[260px] overflow-hidden rounded-2xl bg-gradient-to-br from-orange-200 via-orange-100 to-white md:min-h-[320px]"
          >
            {/* Use your asset if you want */}
            <Image src="/assets/hero.png" alt="Food" fill className="object-cover" /> 

            <div className="absolute bottom-4 left-4 rounded-2xl bg-white/70 px-4 py-3 backdrop-blur">
              <p className="text-sm font-medium">Today’s pick</p>
              <p className="text-sm text-muted-foreground">Up to 40% off combos</p>
            </div>
          </motion.div>
        </div>

        <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-orange-300/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-amber-300/30 blur-3xl" />
      </motion.div>
    </section>
  );
}