import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import {
  Plus,
  Pencil,
  Trash2,
  LayoutDashboard,
  Package,
  ShoppingBag,
  ArrowLeft,
  LogOut,
  ToggleLeft,
  ToggleRight,
} from 'lucide-react';

const navItems = [
  { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Products', path: '/admin/products', icon: Package },
  { label: 'Orders', path: '/admin/orders', icon: ShoppingBag },
  { label: 'Back to Store', path: '/', icon: ArrowLeft },
];

const AdminProducts = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(0);

  let token = null;
  try {
    const stored = window.localStorage.getItem('kigalimart_user');
    const user = stored ? JSON.parse(stored) : null;
    token = user?.token;
  } catch {
    token = null;
  }

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await axios.get('http://localhost:5000/api/products');
        setProducts(Array.isArray(data) ? data : []);
      } catch {
        setError('Unable to load products');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [refresh]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Product removed');
      setRefresh((r) => r + 1);
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Unable to delete product');
    }
  };

  const handleToggleStock = async (id, currentStock) => {
    try {
      await axios.put(
        `http://localhost:5000/api/products/${id}`,
        { stock: currentStock > 0 ? 0 : 50 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Stock status updated!');
      setRefresh((r) => r + 1);
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to update stock');
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('kigalimart_user');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[280px_1fr]">
        <aside className="flex flex-col bg-slate-950 text-slate-200">
          <div className="px-8 py-10">
            <Link
              to="/admin/dashboard"
              className="inline-flex items-center gap-3 text-2xl font-bold text-red-500"
            >
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
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-slate-900">Products</h1>
              <p className="mt-1 text-sm text-slate-500">
                {products.length} total products
              </p>
            </div>
            <Link
              to="/admin/products/add"
              className="inline-flex items-center gap-2 rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
            >
              <Plus size={16} /> Add Product
            </Link>
          </div>

          {loading ? (
            <div className="flex min-h-[240px] items-center justify-center rounded-2xl bg-white shadow-sm">
              <div className="inline-flex h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-red-600" />
            </div>
          ) : error ? (
            <div className="rounded-2xl bg-red-50 p-6 text-red-700 shadow-sm">{error}</div>
          ) : products.length === 0 ? (
            <div className="rounded-2xl bg-white p-8 text-center text-slate-500 shadow-sm">
              No products found.
            </div>
          ) : (
            <div className="rounded-2xl bg-white p-4 shadow-sm">
              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm text-slate-700">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500">
                      <th className="px-4 py-3">Image</th>
                      <th className="px-4 py-3">Name</th>
                      <th className="px-4 py-3">Category</th>
                      <th className="px-4 py-3">Price</th>
                      <th className="px-4 py-3">Stock Qty</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((p) => (
                      <tr key={p._id} className="border-b border-slate-200 last:border-b-0">
                        <td className="px-4 py-4">
                          <img
                            src={p.image}
                            alt={p.name}
                            className="h-12 w-12 rounded-md object-cover"
                          />
                        </td>
                        <td className="px-4 py-4 font-medium text-slate-900">
                          {p.name}
                        </td>
                        <td className="px-4 py-4">{p.category}</td>
                        <td className="px-4 py-4 text-red-600">
                          RWF {p.price.toLocaleString('en-US')}
                        </td>
                        <td className="px-4 py-4 font-semibold">
                          {p.stock}
                        </td>
                        <td className="px-4 py-4">
                          {p.stock > 0 ? (
                            <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                              In Stock
                            </span>
                          ) : (
                            <span className="inline-flex rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                              Out of Stock
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex flex-wrap items-center gap-2">
                            <Link
                              to={`/admin/products/edit/${p._id}`}
                              className="inline-flex items-center gap-1 rounded-full bg-sky-50 px-3 py-2 text-xs font-semibold text-sky-600 transition hover:bg-sky-100"
                            >
                              <Pencil size={13} /> Edit
                            </Link>
                            <button
                              type="button"
                              onClick={() => handleToggleStock(p._id, p.stock)}
                              className={`inline-flex items-center gap-1 rounded-full px-3 py-2 text-xs font-semibold transition ${
                                p.stock > 0
                                  ? 'bg-yellow-50 text-yellow-600 hover:bg-yellow-100'
                                  : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                              }`}
                            >
                              {p.stock > 0 ? (
                                <><ToggleRight size={13} /> Out of Stock</>
                              ) : (
                                <><ToggleLeft size={13} /> In Stock</>
                              )}
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDelete(p._id)}
                              className="inline-flex items-center gap-1 rounded-full bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-100"
                            >
                              <Trash2 size={13} /> Delete
                            </button>
                          </div>
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

export default AdminProducts;