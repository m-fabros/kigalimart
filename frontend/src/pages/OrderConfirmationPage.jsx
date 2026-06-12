import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { CheckCircle } from 'lucide-react';

const OrderConfirmationPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(true);
      setError(null);

      try {
        const { data } = await axios.get(`http://localhost:5000/api/orders/${id}`);
        setOrder(data);
      } catch (err) {
        setError('Unable to load order details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-[65vh] items-center justify-center px-6 py-20 sm:px-8 lg:px-16">
        <div className="inline-flex h-14 w-14 animate-spin rounded-full border-4 border-slate-200 border-t-green-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-6 py-20 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-lg rounded-[2rem] bg-red-50 p-10 text-center text-red-700 shadow-sm">
          {error}
        </div>
      </div>
    );
  }

  if (!order) {
    return null;
  }

  const totalPrice = order.totalPrice ?? 0;

  return (
    <div className="px-6 py-14 sm:px-8 lg:px-16">
      <div className="mx-auto max-w-2xl space-y-8">
        <div className="rounded-[2rem] bg-white p-10 text-center shadow-sm">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
            <CheckCircle size={36} />
          </div>
          <h1 className="text-3xl font-semibold text-emerald-700">Order Confirmed!</h1>
          <p className="mt-3 text-sm text-slate-600">
            Thank you for shopping with KigaliMart.
          </p>
          <p className="mt-4 rounded-full bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-900">
            Order #{order._id || order.id}
          </p>
        </div>

        <div className="rounded-[2rem] bg-white p-8 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold text-slate-900">Order Summary</h2>
          <div className="space-y-4 text-sm text-slate-700">
            {Array.isArray(order.orderItems) && order.orderItems.length > 0 ? (
              order.orderItems.map((item, index) => (
                <div key={`${item._id || item.name}-${index}`} className="flex items-center justify-between rounded-3xl bg-slate-50 px-4 py-4">
                  <div>
                    <p className="font-semibold text-slate-900">{item.name}</p>
                    <p className="text-xs text-slate-500">Qty: {item.qty}</p>
                  </div>
                  <p className="font-semibold text-red-600">RWF {(item.price * item.qty).toLocaleString('en-US')}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-500">No items found in this order.</p>
            )}
          </div>
          <div className="mt-6 rounded-3xl bg-slate-50 p-5 text-sm text-slate-700">
            <div className="flex items-center justify-between py-2">
              <span>Total</span>
              <span className="font-semibold text-red-600">RWF {totalPrice.toLocaleString('en-US')}</span>
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] bg-white p-8 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold text-slate-900">Shipping Details</h2>
          <div className="space-y-3 text-sm text-slate-700">
            <p>
              <span className="font-semibold text-slate-900">Name:</span> {order.shippingAddress?.fullName}
            </p>
            <p>
              <span className="font-semibold text-slate-900">Address:</span> {order.shippingAddress?.address}
            </p>
            <p>
              <span className="font-semibold text-slate-900">City:</span> {order.shippingAddress?.city}
            </p>
            <p>
              <span className="font-semibold text-slate-900">Phone:</span> {order.shippingAddress?.phone}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Link
            to="/products"
            className="inline-flex flex-1 items-center justify-center rounded-full bg-red-600 px-6 py-4 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            Continue Shopping
          </Link>
          <Link
            to="/"
            className="inline-flex flex-1 items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Track Order
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
