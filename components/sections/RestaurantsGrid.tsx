"use client";

import { motion } from "framer-motion";
import RestaurantCard, { Restaurant } from "./RestaurantCard";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function RestaurantsGrid({
  restaurants = [],
}: {
  restaurants?: Restaurant[];
}) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
    >
      {restaurants.map((r) => (
        <motion.div key={r.id} variants={item}>
          <RestaurantCard r={r} />
        </motion.div>
      ))}
    </motion.div>
  );
}