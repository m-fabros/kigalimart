import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  ArrowLeft,
  LogOut,
  Box,
  Truck,
  CheckCircle2,
} from 'lucide-react';

const navItems = [
  { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Products', path: '/admin/products', icon: Package },
  { label: 'Orders', path: '/admin/orders', icon: ShoppingBag },
  { label: 'Back to Store', path: '/', icon: ArrowLeft },
];

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-700',
  processing: 'bg-blue-100 text-blue-700',
  shipped: 'bg-purple-100 text-purple-700',
  delivered: 'bg-emerald-100 text-emerald-700',
};

const statCards = [
  { label: 'Total Products', key: 'totalProducts', icon: Box, border: 'border-red-500' },
  { label: 'Total Orders', key: 'totalOrders', icon: ShoppingBag, border: 'border-blue-500' },
  { label: 'In Stock Products', key: 'inStock', icon: CheckCircle2, border: 'border-emerald-500' },
  { label: 'Out of Stock Products', key: 'outOfStock', icon: Truck, border: 'border-purple-500' },
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const storedUser = typeof window !== 'undefined' ? window.localStorage.getItem('kigalimart_user') : null;
  let token = null;
  let adminName = 'Admin';

  try {
    const currentUser = storedUser ? JSON.parse(storedUser) : null;
    token = currentUser?.token;
    adminName = currentUser?.name || 'Admin';
  } catch {
    token = null;
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [productRes, orderRes] = await Promise.all([
          axios.get('https://kigalimart-backend.onrender.com/api/products'),
          axios.get('https://kigalimart-backend.onrender.com/api/orders', {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        setProducts(Array.isArray(productRes.data) ? productRes.data : []);
        setOrders(Array.isArray(orderRes.data) ? orderRes.data : []);
      } catch {
        setError('Unable to load admin dashboard data.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token]);

  const handleLogout = () => {
    window.localStorage.removeItem('kigalimart_user');
    navigate('/admin/login');
  };

  const stats = {
    totalProducts: products.length,
    totalOrders: orders.length,
    inStock: products.filter((p) => p.stock > 0).length,
    outOfStock: products.filter((p) => p.stock <= 0).length,
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[280px_1fr]">
        <aside className="flex flex-col bg-slate-950 text-slate-200">
          <div className="px-8 py-10">
            <Link to="/admin/dashboard" className="inline-flex items-center gap-3 text-2xl font-bold text-red-500">
              <span>KigaliMart Admin</span>
            </Link>
          </div>
          <nav className="flex-1 space-y-1 px-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 rounded-3xl px-4 py-3 text-sm font-semibold transition ${
                    active ? 'bg-red-500 text-white' : 'hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Icon size={18} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="mt-auto border-t border-slate-800 px-4 py-6">
            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full items-center justify-center gap-2 rounded-3xl bg-red-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
            >
              <LogOut size={18} /> Logout
            </button>
          </div>
        </aside>

        <main className="px-6 py-8 sm:px-8 lg:px-10">
          <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Welcome back</p>
              <h1 className="text-4xl font-bold text-slate-900">Dashboard</h1>
              <p className="mt-2 text-sm text-slate-600">Signed in as {adminName}</p>
            </div>
          </div>

          {loading ? (
            <div className="flex min-h-[320px] items-center justify-center rounded-[2rem] bg-white p-10 shadow-sm">
              <div className="inline-flex h-14 w-14 animate-spin rounded-full border-4 border-slate-200 border-t-red-600" />
            </div>
          ) : error ? (
            <div className="rounded-[2rem] bg-red-50 p-8 text-red-700 shadow-sm">{error}</div>
          ) : (
            <>
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                {statCards.map((card) => {
                  const StatIcon = card.icon;
                  return (
                    <div key={card.key} className={`rounded-[2rem] border-l-4 ${card.border} bg-white p-6 shadow-sm`}>
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-3xl font-bold text-slate-900">{stats[card.key]}</p>
                          <p className="mt-2 text-sm text-slate-500">{card.label}</p>
                        </div>
                        <div className="rounded-3xl bg-slate-100 p-3 text-slate-700">
                          <StatIcon size={22} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 rounded-[2rem] bg-white p-6 shadow-sm">
                <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <h2 className="text-xl font-semibold text-slate-900">Recent Orders</h2>
                  <p className="text-sm text-slate-500">Latest orders from the store</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-left text-sm text-slate-700">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-500">
                        <th className="px-4 py-3">Order ID</th>
                        <th className="px-4 py-3">Customer</th>
                        <th className="px-4 py-3">Total</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.slice(0, 8).map((order) => (
                        <tr key={order._id} className="border-b border-slate-200 last:border-b-0">
                          <td className="px-4 py-4 font-medium text-slate-900">{order._id.slice(-8).toUpperCase()}</td>
                          <td className="px-4 py-4">{order.user?.name || 'Unknown'}</td>
                          <td className="px-4 py-4 text-red-600">RWF {order.totalPrice.toLocaleString('en-US')}</td>
                          <td className="px-4 py-4">
                            <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusColors[order.status] || 'bg-slate-100 text-slate-700'}`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="px-4 py-4 text-slate-500">{new Date(order.createdAt).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;