const Footer = () => {
  return (
    <footer className="w-full">
      <div className="bg-[#CC0000] px-6 py-3 text-center text-sm font-semibold text-white">
        Free shipping on orders over 50,000 RWF
      </div>

      <div className="bg-white px-6 py-12 text-slate-700 sm:px-8 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-semibold text-slate-900">About KigaliMart</h3>
            <p className="text-sm leading-7 text-slate-600">
              KigaliMart is Rwanda’s trusted online marketplace, offering fast delivery, great
              value, and a wide selection of products for every home.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold text-slate-900">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/products?category=Electronics" className="transition hover:text-red-600">
                  Electronics
                </a>
              </li>
              <li>
                <a href="/products?category=Fashion" className="transition hover:text-red-600">
                  Fashion
                </a>
              </li>
              <li>
                <a href="/products?category=Home" className="transition hover:text-red-600">
                  Home
                </a>
              </li>
              <li>
                <a href="/products?category=Grocery" className="transition hover:text-red-600">
                  Grocery
                </a>
              </li>
              <li>
                <a href="/products?category=Beauty" className="transition hover:text-red-600">
                  Beauty
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold text-slate-900">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="transition hover:text-red-600">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="transition hover:text-red-600">
                  Returns
                </a>
              </li>
              <li>
                <a href="#" className="transition hover:text-red-600">
                  Track Order
                </a>
              </li>
              <li>
                <a href="#" className="transition hover:text-red-600">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold text-slate-900">Contact</h3>
            <div className="space-y-3 text-sm text-slate-600">
              <p>KK 508 ST, Kigali, Rwanda</p>
              <p>Phone: +250 791 591 773</p>
              <p>Email: info@kigalimart.rw</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 px-6 py-4 text-center text-sm text-slate-200 sm:px-8 lg:px-16">
        © 2026 KigaliMart. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
