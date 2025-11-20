import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux";
import {
  clearCart,
  completelyRemoveItem,
  selectCartItems,
  selectTotalItems,
  selectTotalPrice,
  updateQuantities,
} from "@/store/slices/cart-slice";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

const CartPage = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const totalItems = useAppSelector(selectTotalItems);
  const totalPrice = useAppSelector(selectTotalPrice);

  const [quantities, setQuantities] = useState<Record<number, number>>(
    cartItems.reduce(
      (acc, item) => {
        acc[item.id] = item.quantity;
        return acc;
      },
      {} as Record<number, number>,
    ),
  );

  const incrementHandler = (id: number) => {
    const newQty = (quantities[id] || 0) + 1;
    setQuantities({ ...quantities, [id]: newQty });
    dispatch(updateQuantities([{ id, quantity: newQty }]));
  };

  const decrementHandler = (id: number) => {
    const currentQty = quantities[id] || 0;
    if (currentQty > 1) {
      const newQty = currentQty - 1;
      setQuantities({ ...quantities, [id]: newQty });
      dispatch(updateQuantities([{ id, quantity: newQty }]));
    }
  };

  const inputChangeHandler = (id: number, value: string) => {
    if (value === "") {
      setQuantities({ ...quantities, [id]: 0 });
      return;
    }

    const newQty = parseInt(value);
    if (!isNaN(newQty) && newQty >= 0) {
      setQuantities({ ...quantities, [id]: newQty });
      if (newQty > 0) {
        dispatch(updateQuantities([{ id, quantity: newQty }]));
      }
    }
  };

  const removeHandler = (id: number) => {
    dispatch(completelyRemoveItem(id));
    const newQuantities = { ...quantities };
    delete newQuantities[id];
    setQuantities(newQuantities);
  };

  const clearCartHandler = () => {
    dispatch(clearCart());
    setQuantities({});
  };

  if (cartItems.length === 0) {
    return (
      <section className="grid gap-3 flex-1">
        <header>
          <h3 className="text-2xl font-bold">Shopping Cart</h3>
        </header>
        <div className="flex flex-col items-center  justify-center h-[60vh] gap-4">
          <p className="font-semibold text-lg">Your cart is empty.</p>
          <Button variant={"outline"}>
            <Link to={"/view-product"}>Go to products</Link>
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="grid gap-6 flex-1">
      <header className="flex justify-between items-center">
        <h3 className="text-2xl font-bold">Shopping Cart</h3>
        <Button
          variant="outline"
          onClick={clearCartHandler}
        >
          Clear Cart
        </Button>
      </header>

      <div className="grid lg:grid-cols-3 gap-6 ">
        <div className="lg:col-span-2 space-y-4 ">
          {cartItems.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-4 justify-between">
                  {/* Product Image */}
                  <div className="flex gap-3 relative">
                    <img
                      src={item.image || ""}
                      alt={item.title}
                      className="w-24 h-24 object-cover rounded"
                    />

                    {/* Product Details */}
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg">{item.title}</h4>
                      <p className="text-sm text-gray-500 line-clamp-2">
                        {item.description}
                      </p>
                      <p className="font-semibold mt-2">${item.price}</p>
                    </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeHandler(item.id)}
                      className="text-red-500 flex md:hidden hover:text-red-700 absolute right-0 z-20 bg-gray-200 hover:bg-gray-300 rounded-full -top-6"
                    >
                      <Trash2 size={18} />
                    </Button>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex flex-col md:items-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeHandler(item.id)}
                      className="text-red-500 hover:text-red-700 hidden md:flex bg-gray-200 hover:bg-gray-300 rounded-full"
                    >
                      <Trash2 size={18} />
                    </Button>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => decrementHandler(item.id)}
                        disabled={quantities[item.id] <= 1}
                      >
                        <Minus size={16} />
                      </Button>

                      <Input
                        type="text"
                        inputMode="numeric"
                        value={quantities[item.id] ?? item.quantity}
                        onChange={(e) =>
                          inputChangeHandler(item.id, e.target.value)
                        }
                        onFocus={(e) => e.target.select()}
                        onBlur={(e) => {
                          // Reset to 1 if empty on blur
                          if (
                            e.target.value === "" ||
                            quantities[item.id] === 0
                          ) {
                            setQuantities({ ...quantities, [item.id]: 1 });
                            dispatch(
                              updateQuantities([{ id: item.id, quantity: 1 }]),
                            );
                          }
                        }}
                        className="w-16 text-center"
                      />

                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => incrementHandler(item.id)}
                      >
                        <Plus size={16} />
                      </Button>
                    </div>
                    <p className="text-sm font-medium">
                      Subtotal: ${(item.subtotal ?? 0).toFixed(2)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Right side - Checkout Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardContent className="p-6">
              <h4 className="text-xl font-bold mb-4">Order Summary</h4>

              <div className="space-y-3 mb-6">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between text-sm"
                  >
                    <span className="text-gray-600">
                      {item.title} x {item.quantity}
                    </span>
                    <span className="font-medium">
                      ${(item.subtotal ?? 0).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Items:</span>
                  <span className="font-medium">{totalItems}</span>
                </div>
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span>${(totalPrice ?? 0).toFixed(2)}</span>
                </div>
              </div>

              <Button
                className="w-full mt-6"
                size="lg"
              >
                Checkout - ${(totalPrice ?? 0).toFixed(2)}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CartPage;
