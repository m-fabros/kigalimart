import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const categories = ['All', 'Electronics', 'Fashion', 'Home', 'Grocery', 'Beauty'];
const sortOptions = [
  { label: 'Featured', value: 'featured' },
  { label: 'Price Low to High', value: 'price_asc' },
  { label: 'Price High to Low', value: 'price_desc' },
];

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const category = searchParams.get('category') || 'All';
  const search = searchParams.get('search') || '';
  const sort = searchParams.get('sort') || 'featured';

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const params = {};
        if (category && category !== 'All') params.category = category;
        if (search) params.search = search;
        if (sort) params.sort = sort;

        const { data } = await axios.get('http://localhost:5000/api/products', { params });
        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        setError('Unable to load products. Please try again later.');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, search, sort]);

  const setCategory = (value) => {
    const nextParams = new URLSearchParams(searchParams);
    if (value === 'All') {
      nextParams.delete('category');
    } else {
      nextParams.set('category', value);
    }
    setSearchParams(nextParams);
  };

  const setSort = (value) => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set('sort', value);
    setSearchParams(nextParams);
  };

  const title = search
    ? `Search results for "${search}"`
    : category && category !== 'All'
    ? `${category} Products`
    : 'All Products';

  return (
    <div className="px-6 py-10 sm:px-8 lg:px-16">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[250px_1fr]">
        <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="space-y-6">
            <div>
              <h2 className="mb-4 text-lg font-semibold text-slate-900">Category</h2>
              <ul className="space-y-2 text-sm text-slate-700">
                {categories.map((option) => {
                  const active = option === category;
                  return (
                    <li key={option}>
                      <button
                        type="button"
                        onClick={() => setCategory(option)}
                        className={`w-full rounded-2xl px-4 py-3 text-left transition ${
                          active ? 'bg-red-50 text-red-600' : 'hover:bg-slate-100'
                        }`}
                      >
                        {option}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div>
              <h2 className="mb-4 text-lg font-semibold text-slate-900">Sort by</h2>
              <div className="space-y-2 text-sm text-slate-700">
                {sortOptions.map((option) => {
                  const active = option.value === sort;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setSort(option.value)}
                      className={`w-full rounded-2xl px-4 py-3 text-left transition ${
                        active ? 'bg-red-50 text-red-600' : 'hover:bg-slate-100'
                      }`}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </aside>

        <section className="space-y-6">
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h1 className="text-3xl font-semibold text-slate-900">{title}</h1>
                <p className="mt-2 text-sm text-slate-500">
                  Showing {products.length} result{products.length === 1 ? '' : 's'}
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
                {search ? `Search: ${search}` : `Category: ${category}`}
              </div>
            </div>
          </div>

          {loading ? (
            <div className="flex min-h-[240px] items-center justify-center rounded-3xl bg-white shadow-sm">
              <div className="inline-flex h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-red-600" />
            </div>
          ) : error ? (
            <div className="rounded-3xl bg-red-50 p-8 text-center text-red-700 shadow-sm">
              {error}
            </div>
          ) : products.length === 0 ? (
            <div className="rounded-3xl bg-slate-50 p-8 text-center text-slate-700 shadow-sm">
              No products found.
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default ProductsPage;
