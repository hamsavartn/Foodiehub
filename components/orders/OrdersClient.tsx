"use client";

import * as React from "react";
import { supabase } from "@/lib/supabaseClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type OrderRow = {
  id: string;
  total: number;
  status: string;
  created_at: string;
  items: any;
};

export default function OrdersClient() {
  const [loading, setLoading] = React.useState(true);
  const [signedIn, setSignedIn] = React.useState(false);
  const [orders, setOrders] = React.useState<OrderRow[]>([]);
  const [error, setError] = React.useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);

    const { data: userData, error: userErr } = await supabase.auth.getUser();
    if (userErr) {
      setSignedIn(false);
      setOrders([]);
      setError(userErr.message);
      setLoading(false);
      return;
    }

    const user = userData.user;
    if (!user) {
      setSignedIn(false);
      setOrders([]);
      setLoading(false);
      return;
    }

    setSignedIn(true);

    const { data, error: ordersErr } = await supabase
      .from("orders")
      .select("id,total,status,created_at,items")
      .order("created_at", { ascending: false })
      .limit(20);

    if (ordersErr) {
      setError(ordersErr.message);
      setOrders([]);
      setLoading(false);
      return;
    }

    setOrders((data ?? []) as OrderRow[]);
    setLoading(false);
  }

  React.useEffect(() => {
    load();

    const { data } = supabase.auth.onAuthStateChange(() => {
      load();
    });

    return () => {
      data.subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <p className="mt-6 text-sm text-muted-foreground">Loading orders…</p>;
  }

  if (!signedIn) {
    return (
      <div className="mt-6 rounded-2xl border bg-white p-8">
        <p className="text-lg font-semibold">Please sign in</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Sign in from the top right to view your orders.
        </p>
      </div>
    );
  }

  if (error) {
    return <p className="mt-6 text-sm text-red-600">{error}</p>;
  }

  if (orders.length === 0) {
    return (
      <div className="mt-6 rounded-2xl border bg-white p-8 text-center">
        <p className="text-lg font-semibold">No orders yet</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Place your first order from the homepage.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6 grid gap-4">
      <div className="flex justify-end">
        <Button variant="outline" onClick={load}>Refresh</Button>
      </div>

      {orders.map((o) => {
        const created = new Date(o.created_at).toLocaleString();
        const restaurantName = o.items?.restaurantName ?? "Restaurant";
        const count = (o.items?.items ?? []).reduce(
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
  );
}