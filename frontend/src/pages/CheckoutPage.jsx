import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { toast } from 'react-hot-toast';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems, cartTotal, clearCart } = useCart();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('MoMo');
  const [loading, setLoading] = useState(false);

  const shipping = cartTotal > 50000 || cartTotal === 0 ? 0 : 2000;
  const totalPrice = cartTotal + shipping;

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/cart');
    }
  }, [cartItems, navigate]);

  const formatPrice = (value) => `RWF ${value.toLocaleString('en-US')}`;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!fullName || !email || !phone || !address || !city) {
      toast.error('Please complete all required fields.');
      return;
    }

    setLoading(true);

    try {
      const orderPayload = {
        orderItems: cartItems,
        shippingAddress: {
          fullName,
          email,
          phone,
          address,
          city,
          paymentMethod,
        },
        totalPrice,
      };

      const { data } = await axios.post('https://kigalimart-backend.onrender.com/api/orders', orderPayload);
      clearCart();
      navigate(`/order-confirmation/${data._id || data.id || ''}`);
    } catch (err) {
      toast.error('Unable to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-6 py-10 sm:px-8 lg:px-16">
      <div className="mx-auto max-w-7xl space-y-8 lg:grid lg:grid-cols-[1.4fr_0.8fr] lg:gap-8 lg:space-y-0">
        <form onSubmit={handleSubmit} className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="mb-6 text-3xl font-semibold text-slate-900">Shipping Information</h1>

          <div className="grid gap-6 sm:grid-cols-2">
            <label className="space-y-2 text-sm text-slate-700">
              <span>Full Name</span>
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-red-500"
                required
              />
            </label>
            <label className="space-y-2 text-sm text-slate-700">
              <span>Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-red-500"
                required
              />
            </label>
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <label className="space-y-2 text-sm text-slate-700">
              <span>Phone Number</span>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-red-500"
                required
              />
            </label>
            <label className="space-y-2 text-sm text-slate-700">
              <span>City</span>
              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-red-500"
                required
              />
            </label>
          </div>

          <label className="mt-6 block space-y-2 text-sm text-slate-700">
            <span>Address</span>
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-red-500"
              required
            />
          </label>

          <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="mb-4 text-lg font-semibold text-slate-900">Payment Method</h2>
            <div className="space-y-4">
              <label className="flex cursor-pointer items-center justify-between rounded-3xl border border-slate-200 bg-white px-4 py-4 text-sm font-semibold text-slate-900 transition hover:border-red-300">
                <span>Mobile Money (MoMo)</span>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  paymentMethod === 'MoMo' ? 'bg-orange-100 text-orange-700' : 'bg-slate-200 text-slate-600'
                }`}>
                  MoMo
                </span>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="MoMo"
                  checked={paymentMethod === 'MoMo'}
                  onChange={() => setPaymentMethod('MoMo')}
                  className="hidden"
                />
              </label>

              <label className="flex cursor-pointer items-center justify-between rounded-3xl border border-slate-200 bg-white px-4 py-4 text-sm font-semibold text-slate-900 transition hover:border-red-300">
                <span>Pay on Delivery</span>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  paymentMethod === 'Pay on Delivery' ? 'bg-slate-300 text-slate-700' : 'bg-slate-200 text-slate-600'
                }`}>
                  POD
                </span>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="Pay on Delivery"
                  checked={paymentMethod === 'Pay on Delivery'}
                  onChange={() => setPaymentMethod('Pay on Delivery')}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-red-600 px-6 py-4 text-base font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            {loading ? 'Placing order...' : 'Place Order'}
          </button>
        </form>

        <aside className="space-y-6">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-900">Order Summary</h2>
            <div className="mt-6 space-y-4 text-sm text-slate-600">
              {cartItems.map((item) => (
                <div key={item._id} className="flex items-center gap-4 rounded-3xl bg-slate-50 p-4">
                  <img src={item.image} alt={item.name} className="h-16 w-16 rounded-3xl object-cover" />
                  <div className="flex-1">
                    <p className="font-semibold text-slate-900">{item.name}</p>
                    <p className="text-xs text-slate-500">Qty: {item.qty}</p>
                  </div>
                  <p className="font-semibold text-red-600">{formatPrice(item.price * item.qty)}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-3xl bg-slate-50 p-5 text-sm text-slate-700">
              <div className="flex items-center justify-between py-2">
                <span>Subtotal</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-4 text-base font-semibold text-slate-900">
                <span>Total</span>
                <span className="text-red-600">{formatPrice(totalPrice)}</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CheckoutPage;
