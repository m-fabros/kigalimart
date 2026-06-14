import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  ArrowLeft,
  LogOut,
  Trash2,
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
  cancelled: 'bg-red-100 text-red-700',
};

const AdminOrders = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(0);
  const [filterStatus, setFilterStatus] = useState('all');

  let token = null;
  try {
    const stored = window.localStorage.getItem('kigalimart_user');
    const user = stored ? JSON.parse(stored) : null;
    token = user?.token;
  } catch {
    token = null;
  }

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await axios.get('http://localhost:5000/api/orders', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(Array.isArray(data) ? data : []);
      } catch {
        setError('Unable to load orders');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [token, refresh]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(
        `http://localhost:5000/api/orders/${orderId}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Order status updated!');
      setRefresh((r) => r + 1);
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to update status');
    }
  };

  const handleDelete = async (orderId) => {
    if (!window.confirm('Are you sure you want to delete this order?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Order deleted!');
      setRefresh((r) => r + 1);
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to delete order');
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('kigalimart_user');
    navigate('/admin/login');
  };

  const filteredOrders = filterStatus === 'all'
    ? orders
    : orders.filter((o) => o.status === filterStatus);

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
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-slate-900">Orders</h1>
              <p className="mt-1 text-sm text-slate-500">Manage and update customer orders</p>
            </div>
            {/* Filter by status */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="rounded-xl border border-slate-200 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              <option value="all">All Orders</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          {loading ? (
            <div className="flex min-h-[240px] items-center justify-center rounded-2xl bg-white shadow-sm">
              <div className="inline-flex h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-red-600" />
            </div>
          ) : error ? (
            <div className="rounded-2xl bg-red-50 p-6 text-red-700 shadow-sm">{error}</div>
          ) : filteredOrders.length === 0 ? (
            <div className="rounded-2xl bg-white p-8 text-center text-slate-500 shadow-sm">
              No orders found.
            </div>
          ) : (
            <div className="rounded-2xl bg-white p-4 shadow-sm">
              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm text-slate-700">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500">
                      <th className="px-4 py-3">Order ID</th>
                      <th className="px-4 py-3">Customer</th>
                      <th className="px-4 py-3">Items</th>
                      <th className="px-4 py-3">Total</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">Date</th>
                      <th className="px-4 py-3">Update</th>
                      <th className="px-4 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((order) => (
                      <tr key={order._id} className="border-b border-slate-200 last:border-b-0">
                        <td className="px-4 py-4 font-medium text-slate-900">
                          {order._id.slice(-8).toUpperCase()}
                        </td>
                        <td className="px-4 py-4">
                          <div className="font-medium">{order.shippingAddress?.fullName || 'Unknown'}</div>
                          <div className="text-xs text-slate-400">{order.shippingAddress?.city}</div>
                          <div className="text-xs text-slate-400">{order.shippingAddress?.phone}</div>
                        </td>
                        <td className="px-4 py-4">
                          <div>{order.orderItems?.length} item(s)</div>
                          <div className="text-xs text-slate-400">
                            {order.orderItems?.map((i) => i.name).join(', ').slice(0, 30)}...
                          </div>
                        </td>
                        <td className="px-4 py-4 font-semibold text-red-600">
                          RWF {order.totalPrice?.toLocaleString('en-US')}
                        </td>
                        <td className="px-4 py-4">
                          <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusColors[order.status] || 'bg-slate-100 text-slate-700'}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-slate-500">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-4">
                          <select
                            value={order.status}
                            onChange={(e) => handleStatusChange(order._id, e.target.value)}
                            className="rounded-xl border border-slate-200 px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                          >
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td className="px-4 py-4">
                          <button
                            type="button"
                            onClick={() => handleDelete(order._id)}
                            className="inline-flex items-center gap-1 rounded-full bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-100"
                          >
                            <Trash2 size={14} /> Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminOrders;