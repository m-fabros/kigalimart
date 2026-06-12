import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQty, cartTotal } = useCart();

  const itemCount = cartItems.reduce((total, item) => total + item.qty, 0);
  const shipping = cartTotal > 50000 ? 0 : cartTotal === 0 ? 0 : 2000;
  const totalAmount = cartTotal + shipping;

  const formatPrice = (value) => `RWF ${value.toLocaleString('en-US')}`;

  const handleQtyChange = (item, nextQty) => {
    if (nextQty < 1) return;
    if (item.stock !== undefined && nextQty > item.stock) return;
    updateQty(item._id, nextQty);
  };

  if (cartItems.length === 0) {
    return (
      <div className="px-6 py-20 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-slate-200 bg-white p-12 text-center shadow-sm">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-100 text-red-600">
            <ShoppingCart size={32} />
          </div>
          <h1 className="text-3xl font-semibold text-slate-900">Your cart is empty</h1>
          <p className="mt-3 text-sm text-slate-500">
            Add items to your cart and proceed to checkout when you’re ready.
          </p>
          <Link
            to="/products"
            className="mt-8 inline-flex rounded-full bg-red-600 px-8 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 py-10 sm:px-8 lg:px-16">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.8fr_0.8fr]">
        <div className="space-y-6">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <h1 className="text-2xl font-semibold text-slate-900">Shopping Cart</h1>
            <p className="mt-2 text-sm text-slate-500">
              You have {itemCount} item{itemCount === 1 ? '' : 's'} in your cart.
            </p>
          </div>

          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item._id} className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-20 w-20 rounded-3xl object-cover"
                  />

                  <div className="flex-1 space-y-2">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h2 className="text-base font-semibold text-slate-900">{item.name}</h2>
                        <p className="text-sm text-slate-500">{item.category}</p>
                      </div>
                      <p className="text-base font-semibold text-red-600">{formatPrice(item.price)}</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <div className="inline-flex items-center overflow-hidden rounded-full border border-slate-200 bg-slate-50">
                        <button
                          type="button"
                          onClick={() => handleQtyChange(item, item.qty - 1)}
                          className="inline-flex h-10 w-10 items-center justify-center px-3 text-slate-700 transition hover:bg-slate-100"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="inline-flex h-10 min-w-[3rem] items-center justify-center bg-white px-3 text-sm font-semibold text-slate-900">
                          {item.qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleQtyChange(item, item.qty + 1)}
                          className="inline-flex h-10 w-10 items-center justify-center px-3 text-slate-700 transition hover:bg-slate-100"
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromCart(item._id)}
                        className="inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100"
                      >
                        <Trash2 size={16} /> Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Order Summary</h2>
            <div className="mt-6 space-y-4 text-sm text-slate-600">
              <div className="flex items-center justify-between">
                <span>Items</span>
                <span>{itemCount}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
              </div>
            </div>
            <div className="mt-6 rounded-3xl bg-slate-50 p-5 text-center">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Total</p>
              <p className="mt-2 text-3xl font-bold text-red-600">{formatPrice(totalAmount)}</p>
            </div>
            <Link
              to="/checkout"
              className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-red-600 px-6 py-4 text-sm font-semibold text-white transition hover:bg-red-700"
            >
              Proceed to Checkout
            </Link>
            <Link
              to="/products"
              className="mt-4 inline-flex w-full items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Continue Shopping
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CartPage;
