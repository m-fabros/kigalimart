import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { toast } from 'react-hot-toast';
import { ShoppingCart, ArrowLeft } from 'lucide-react';

const ProductDetailPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);

      try {
        const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(data);
        setQuantity(data?.stock > 0 ? 1 : 0);
      } catch (err) {
        setError('Unable to load product details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product || product.stock === 0) return;
    addToCart({ ...product, qty: quantity });
    toast.success(`${product.name} added to cart`);
  };

  const increment = () => {
    if (!product) return;
    setQuantity((current) => Math.min(current + 1, product.stock));
  };

  const decrement = () => {
    setQuantity((current) => Math.max(current - 1, 1));
  };

  const renderStars = () => {
    if (!product) return null;
    const rating = Math.round(product.rating || 0);
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={index < rating ? 'text-yellow-500' : 'text-slate-300'}>
        ★
      </span>
    ));
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-6 py-20 sm:px-8 lg:px-16">
        <div className="inline-flex h-14 w-14 animate-spin rounded-full border-4 border-slate-200 border-t-red-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-6 py-20 sm:px-8 lg:px-16">
        <div className="rounded-3xl bg-red-50 p-10 text-center text-red-700 shadow-sm">
          {error}
        </div>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  const formattedPrice = `RWF ${product.price.toLocaleString('en-US')}`;

  return (
    <div className="px-6 py-10 sm:px-8 lg:px-16">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <img
            src={product.image}
            alt={product.name}
            className="w-full rounded-[2rem] object-cover shadow-2xl"
          />
        </div>

        <div className="space-y-6 rounded-[2rem] bg-white p-8 shadow-sm">
          <div className="space-y-2">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
              {product.category}
            </p>
            <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
              {product.name}
            </h1>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2 text-yellow-500">{renderStars()}</div>
            <p className="text-sm text-slate-500">{product.numReviews} review{product.numReviews === 1 ? '' : 's'}</p>
          </div>

          <div className="space-y-3">
            <p className="text-4xl font-bold text-red-600">{formattedPrice}</p>
            <p className={`inline-flex rounded-full px-4 py-2 text-sm font-semibold ${
              product.stock > 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
            }`}>
              {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-slate-700">Quantity</span>
              <div className="inline-flex overflow-hidden rounded-full border border-slate-200">
                <button
                  type="button"
                  onClick={decrement}
                  disabled={quantity <= 1}
                  className="inline-flex h-12 w-12 items-center justify-center bg-slate-100 px-3 text-lg font-semibold text-slate-700 transition disabled:cursor-not-allowed disabled:opacity-50"
                >
                  -
                </button>
                <span className="inline-flex h-12 min-w-[3rem] items-center justify-center bg-white px-4 text-base font-semibold text-slate-900">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={increment}
                  disabled={quantity >= product.stock}
                  className="inline-flex h-12 w-12 items-center justify-center bg-slate-100 px-3 text-lg font-semibold text-slate-700 transition disabled:cursor-not-allowed disabled:opacity-50"
                >
                  +
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-red-600 px-6 py-4 text-base font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500"
              >
                <ShoppingCart size={20} />
                Add to Cart
              </button>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 text-sm font-semibold text-red-600 transition hover:text-red-800"
              >
                <ArrowLeft size={18} />
                Continue Shopping
              </Link>
            </div>
          </div>

          <div className="rounded-3xl bg-slate-50 p-6">
            <h2 className="mb-3 text-lg font-semibold text-slate-900">Product Description</h2>
            <p className="text-sm leading-7 text-slate-600">{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
