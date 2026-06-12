import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, User, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

const categories = [
  { name: 'All', value: 'All' },
  { name: 'Electronics', value: 'Electronics' },
  { name: 'Fashion', value: 'Fashion' },
  { name: 'Home', value: 'Home' },
  { name: 'Grocery', value: 'Grocery' },
  { name: 'Beauty', value: 'Beauty' },
];

const Navbar = () => {
  const [query, setQuery] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const { cartCount } = useCart();

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const trimmedQuery = query.trim();
    const params = new URLSearchParams();
    if (trimmedQuery) params.set('search', trimmedQuery);
    navigate(`/products?${params.toString()}`);
    setQuery('');
    setMobileOpen(false);
  };

  const handleCategoryClick = (value) => {
    const params = new URLSearchParams();
    params.set('category', value);
    navigate(`/products?${params.toString()}`);
    setMobileOpen(false);
  };

  return (
    <header className="w-full">
      <div className="bg-red-600 text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-xl font-bold tracking-tight">
              KigaliMart
            </Link>
          </div>

          <form
            onSubmit={handleSearchSubmit}
            className="hidden flex-1 items-center justify-center gap-2 sm:flex"
          >
            <label htmlFor="navbar-search" className="sr-only">
              Search products
            </label>
            <div className="flex w-full max-w-xl overflow-hidden rounded-full border border-white/30 bg-white text-black">
              <input
                id="navbar-search"
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search products"
                className="w-full border-none bg-transparent px-4 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full bg-red-600 px-4 text-white transition hover:bg-red-700"
              >
                <Search size={18} />
              </button>
            </div>
          </form>

          <div className="flex items-center gap-3">
            <Link to="/login" className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-3 py-2 text-sm text-white transition hover:bg-white/20">
              <User size={18} className="mr-2" />
              Account
            </Link>
            <Link to="/cart" className="relative inline-flex items-center rounded-full border border-white/30 bg-white/10 px-3 py-2 text-sm text-white transition hover:bg-white/20">
              <ShoppingCart size={18} />
              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-semibold text-white">
                  {cartCount}
                </span>
              )}
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
              className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 p-2 text-white transition hover:bg-white/20 sm:hidden"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      <div className="border-b border-slate-200 bg-white shadow-sm sm:block">
        <div className="mx-auto hidden max-w-7xl px-4 py-3 sm:flex sm:items-center sm:justify-center sm:gap-6 sm:px-6">
          {categories.map((category) => (
            <button
              key={category.value}
              type="button"
              onClick={() => handleCategoryClick(category.value)}
              className="text-sm font-medium text-slate-700 transition hover:text-red-600"
            >
              {category.name}
            </button>
          ))}
        </div>

        {mobileOpen && (
          <div className="border-t border-slate-200 bg-white px-4 pb-4 pt-2 sm:hidden">
            <nav className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category.value}
                  type="button"
                  onClick={() => handleCategoryClick(category.value)}
                  className="w-full rounded-md px-4 py-2 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-red-600"
                >
                  {category.name}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
