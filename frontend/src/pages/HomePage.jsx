import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const categories = [
  {
    name: 'Electronics',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=300',
  },
  {
    name: 'Fashion',
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=300',
  },
  {
    name: 'Home',
    image: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=300',
  },
  {
    name: 'Grocery',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=300',
  },
  {
    name: 'Beauty',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300',
  },
];

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('https://kigalimart-backend.onrender.com/api/products');
        setProducts(data || []);
      } catch (err) {
        setError('Unable to load featured products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const featuredProducts = products.slice(0, 8);

  return (
    <div className="space-y-16">
      <section className="bg-red-600 px-6 py-14 text-white sm:px-8 lg:px-16">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.25em] text-red-200">KigaliMart</p>
            <h1 className="max-w-2xl text-4xl font-bold leading-tight sm:text-5xl">
              Shop Everything You Need
            </h1>
            <p className="max-w-xl text-base text-red-100 sm:text-lg">
              Delivered to your door in Kigali, Rwanda.
            </p>
            <Link
              to="/products"
              className="inline-flex rounded-full bg-white px-8 py-4 text-sm font-semibold text-red-600 transition hover:bg-red-50"
            >
              Shop Now
            </Link>
          </div>

          <div className="flex justify-center">
            <img
              src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=500"
              alt="Shopping essentials"
              className="h-80 w-full max-w-md rounded-[2rem] object-cover shadow-2xl"
            />
          </div>
        </div>
      </section>

      <section className="px-6 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900">Shop by Category</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={`/products?category=${encodeURIComponent(category.name)}`}
                className="group overflow-hidden rounded-3xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="h-40 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="px-4 py-5 text-center">
                  <p className="text-base font-semibold text-slate-900">{category.name}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-slate-900">Featured Products</h2>
          </div>

          {loading ? (
            <div className="flex justify-center py-16">
              <div className="inline-flex h-12 w-12 animate-spin rounded-full border-4 border-transparent border-t-white" />
            </div>
          ) : error ? (
            <div className="rounded-3xl bg-red-50 px-6 py-8 text-center text-red-700">
              {error}
            </div>
          ) : featuredProducts.length === 0 ? (
            <div className="rounded-3xl bg-slate-50 px-6 py-8 text-center text-slate-700">
              No featured products available at the moment.
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {featuredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-red-600 px-6 py-12 text-white sm:px-8 lg:px-16">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 rounded-3xl bg-red-700/90 px-6 py-10 sm:flex-row">
          <div>
            <h3 className="text-2xl font-semibold">Free Delivery on Orders Over 50,000 RWF</h3>
            <p className="mt-2 text-sm text-red-100">
              Enjoy fast, reliable delivery across Kigali when you shop with KigaliMart.
            </p>
          </div>
          <Link
            to="/products"
            className="inline-flex rounded-full bg-white px-8 py-4 text-sm font-semibold text-red-600 transition hover:bg-red-50"
          >
            Start Shopping
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
