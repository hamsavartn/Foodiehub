import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Star } from "lucide-react";
import ShineBorder from "../effects/ShineBorder";
export type Restaurant = {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  time: string;
  delivery: string;
  image?: string; // e.g. "/assets/rest-1.jpg"
};

export default function RestaurantCard({ r }: { r: Restaurant }) {
  return (
    <ShineBorder className="hover:shadow-xl">
      <Card className="overflow-hidden border-0 bg-white/90">
        <div className="relative h-40 w-full bg-gradient-to-br from-orange-200 via-orange-100 to-white">
          {r.image ? (
            <Image src={r.image} alt={r.name} fill className="object-cover" />
          ) : null}
        </div>

        <CardHeader className="space-y-1">
          <div className="flex items-start justify-between gap-3">
            <CardTitle className="text-base">{r.name}</CardTitle>
            <Badge variant="secondary" className="gap-1">
              <Star className="h-3.5 w-3.5 text-orange-600" />
              {r.rating.toFixed(1)}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">{r.cuisine}</p>
        </CardHeader>

        <CardContent className="text-sm">
          <div className="flex items-center justify-between text-muted-foreground">
            <span>{r.time}</span>
            <span>{r.delivery}</span>
          </div>
        </CardContent>

        <CardFooter className="pt-0">
          <Badge className="bg-orange-600 hover:bg-orange-600">Featured</Badge>
        </CardFooter>
      </Card>
    </ShineBorder>
  );
}