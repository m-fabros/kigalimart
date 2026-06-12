import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { _id, name, price, image, category, rating } = product;
  const formattedPrice = `RWF ${price.toLocaleString('en-US')}`;
  const roundedRating = Math.round(rating);

  const handleAddToCart = (event) => {
    event.preventDefault();
    addToCart(product);
    toast.success(`${name} added to cart`);
  };

  return (
    <article className="group overflow-hidden rounded-3xl bg-white shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
      <Link to={`/products/${_id}`} className="block overflow-hidden">
        <img
          src={image}
          alt={name}
          className="h-52 w-full object-cover transition duration-300 group-hover:scale-105"
        />
      </Link>

      <div className="space-y-3 p-4">
        <p className="text-sm uppercase tracking-wide text-slate-500">{category}</p>

        <Link to={`/products/${_id}`} className="block">
          <h2 className="line-clamp-2 text-base font-semibold text-slate-900">
            {name}
          </h2>
        </Link>

        <div className="flex items-center gap-1 text-yellow-500">
          {Array.from({ length: 5 }, (_, index) => (
            <span key={index} className={index < roundedRating ? 'text-yellow-500' : 'text-slate-300'}>
              ★
            </span>
          ))}
        </div>

        <p className="text-lg font-bold text-red-600">{formattedPrice}</p>

        <button
          type="button"
          onClick={handleAddToCart}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-red-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
        >
          <ShoppingCart size={18} />
          Add to Cart
        </button>
      </div>
    </article>
  );
};

export default ProductCard;
