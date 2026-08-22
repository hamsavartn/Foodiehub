import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { MapPin, Search, ShoppingCart } from "lucide-react";
import UserMenu from "../auth/UserMenu";
import CartSheet from "../cart/CartSheet";
export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="relative h-9 w-9 overflow-hidden rounded-xl bg-orange-100">
            <div className="h-full w-full bg-gradient-to-br from-orange-500 to-amber-300" />
          </div>
          <span className="text-lg font-semibold tracking-tight">FoodieHub</span>
        </div>

        {/* Location */}
        <Button variant="outline" className="hidden md:flex gap-2">
          <MapPin className="h-4 w-4" />
          <span className="text-sm">Set location</span>
        </Button>

        {/* Search */}
        <div className="relative ml-auto w-full max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input className="pl-9" placeholder="Search dishes or restaurants" />
        </div>

        {/* Actions */}
        <div className="hidden sm:flex items-center gap-2">
          <div className="hidden sm:block">
            <UserMenu />
          </div>

          <CartSheet />
        </div>
      </div>
    </header>
  );
}