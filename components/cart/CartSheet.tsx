"use client";

import * as React from "react";
import { ShoppingCart, Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { useCart } from "./CartProvider";
import { supabase } from "@/lib/supabaseClient";

export default function CartSheet() {
  const cart = useCart();
  const [open, setOpen] = React.useState(false);
  const [msg, setMsg] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  async function placeOrder() {
    setMsg(null);
    setLoading(true);

    const { data: userData } = await supabase.auth.getUser();
    const user = userData.user;

    if (!user) {
      setMsg("Please sign in to place an order.");
      setLoading(false);
      return;
    }

    if (!cart.restaurantId || cart.items.length === 0) {
      setMsg("Your cart is empty.");
      setLoading(false);
      return;
    }

    const payload = {
      restaurantId: cart.restaurantId,
      restaurantName: cart.restaurantName,
      items: cart.items,
    };

    const { error } = await supabase.from("orders").insert({
      user_id: user.id,
      restaurant_id: cart.restaurantId,
      items: payload,
      total: Number(cart.total.toFixed(2)),
      status: "placed",
    });

    if (error) {
      setMsg(error.message);
      setLoading(false);
      return;
    }

    cart.clear();
    setMsg("Order placed successfully!");
    setLoading(false);

    // Close after a moment
    setTimeout(() => setOpen(false), 600);
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button className="gap-2">
          <ShoppingCart className="h-4 w-4" />
          Cart
          {cart.count ? (
            <span className="ml-1 rounded-full bg-white/20 px-2 py-0.5 text-xs">
              {cart.count}
            </span>
          ) : null}
        </Button>
      </SheetTrigger>

      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Your cart</SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-4">
          {cart.restaurantName ? (
            <p className="text-sm text-muted-foreground">
              Ordering from: <span className="font-medium">{cart.restaurantName}</span>
            </p>
          ) : null}

          {cart.items.length === 0 ? (
            <div className="rounded-xl border bg-white p-6 text-sm text-muted-foreground">
              Cart is empty. Add a combo from any restaurant.
            </div>
          ) : (
            <div className="space-y-3">
              {cart.items.map((it) => (
                <div key={it.id} className="rounded-xl border bg-white p-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-medium">{it.name}</p>
                      <p className="text-sm text-muted-foreground">
                        ${it.price.toFixed(2)}
                      </p>
                    </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => cart.remove(it.id)}
                      aria-label="Remove"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => cart.dec(it.id)}
                        aria-label="Decrease"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center">{it.qty}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => cart.inc(it.id)}
                        aria-label="Increase"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    <p className="font-medium">
                      ${(it.qty * it.price).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <Separator />

          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Total</p>
            <p className="text-lg font-semibold">${cart.total.toFixed(2)}</p>
          </div>

          {msg ? <p className="text-sm text-muted-foreground">{msg}</p> : null}

          <div className="flex gap-2">
            <Button
              variant="outline"
              className="w-full"
              onClick={cart.clear}
              disabled={cart.items.length === 0}
            >
              Clear
            </Button>
            <Button
              className="w-full"
              onClick={placeOrder}
              disabled={loading || cart.items.length === 0}
            >
              {loading ? "Placing..." : "Place order"}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}