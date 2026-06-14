import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Lock, Eye, EyeOff } from 'lucide-react';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post('https://kigalimart-backend.onrender.com/api/auth/login', {
        email,
        password,
      });

      if (!data?.isAdmin) {
        toast.error('Not authorized as admin');
        setLoading(false);
        return;
      }

      window.localStorage.setItem('kigalimart_user', JSON.stringify(data));
      toast.success('Admin signed in successfully');
      navigate('/admin/dashboard');
    } catch (error) {
      const message = error?.response?.data?.message || error.message || 'Login failed';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-900 px-4 py-10 sm:px-6">
      <div className="w-full max-w-md rounded-[2rem] bg-slate-950 p-8 shadow-2xl shadow-black/30">
        <div className="mb-8 flex items-center gap-3 text-center text-red-500">
          <Lock size={28} />
          <div>
            <h1 className="text-3xl font-bold">KigaliMart Admin</h1>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <label className="block text-sm font-medium text-slate-300">
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-red-500 focus:ring-0"
            />
          </label>

          <label className="block text-sm font-medium text-slate-300">
            Password
            <div className="relative mt-2">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-3xl border border-slate-700 bg-slate-900 px-4 py-3 pr-12 text-sm text-slate-100 outline-none transition focus:border-red-500 focus:ring-0"
              />
              <button
                type="button"
                onClick={() => setShowPassword((visible) => !visible)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-100"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </label>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center rounded-full bg-red-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-slate-700"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          <Link to="/" className="font-semibold text-red-500 transition hover:text-red-400">
            Back to Store
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
