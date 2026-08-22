import Navbar from "../../components/sections/Navbar";
import OrdersClient from "../../components/orders/OrdersClient";

export default function OrdersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-white">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-10">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">My Orders</h1>
          <p className="text-muted-foreground">
            Your recent orders placed on FoodieHub.
          </p>
        </div>

        <OrdersClient />
      </main>
    </div>
  );
}