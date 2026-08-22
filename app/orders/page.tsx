import Navbar from "../../components/sections/Navbar";
import { supabase } from "../../lib/supabaseClient";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";

export const dynamic = "force-dynamic";

export default async function OrdersPage() {
  const { data: auth } = await supabase.auth.getUser();
  const user = auth.user;

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-white">
        <Navbar />
        <main className="mx-auto max-w-6xl px-4 py-10">
          <h1 className="text-2xl font-semibold tracking-tight">My Orders</h1>
          <p className="mt-2 text-muted-foreground">
            Please sign in to view your orders.
          </p>
        </main>
      </div>
    );
  }

  const { data: orders, error } = await supabase
    .from("orders")
    .select("id,total,status,created_at,items")
    .order("created_at", { ascending: false })
    .limit(20);

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-white">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">My Orders</h1>
            <p className="text-muted-foreground">
              Your recent orders placed on FoodieHub.
            </p>
          </div>
        </div>

        {error ? (
          <p className="mt-6 text-sm text-red-600">{error.message}</p>
        ) : orders && orders.length > 0 ? (
          <div className="mt-6 grid gap-4">
            {orders.map((o) => {
              const created = new Date(o.created_at).toLocaleString();
              const restaurantName =
                (o.items as any)?.restaurantName ?? "Restaurant";
              const count = ((o.items as any)?.items ?? []).reduce(
                (s: number, it: any) => s + (it.qty ?? 0),
                0
              );

              return (
                <Card key={o.id} className="overflow-hidden">
                  <CardHeader className="flex-row items-start justify-between gap-4 space-y-0">
                    <div>
                      <CardTitle className="text-base">{restaurantName}</CardTitle>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {created} • {count} item(s)
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Status</p>
                      <p className="font-medium capitalize">{o.status}</p>
                    </div>
                  </CardHeader>
                  <CardContent className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">Total</p>
                    <p className="text-lg font-semibold">${Number(o.total).toFixed(2)}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="mt-10 rounded-2xl border bg-white p-8 text-center">
            <p className="text-lg font-semibold">No orders yet</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Place your first order from the homepage.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}