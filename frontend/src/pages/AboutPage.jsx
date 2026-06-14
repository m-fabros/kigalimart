import { Link } from 'react-router-dom';
import { Star, Truck, Heart } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="space-y-16 bg-slate-50">
      <section className="bg-red-600 px-6 py-16 text-white sm:px-8 lg:px-16">
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-red-200">About KigaliMart</p>
          <h1 className="mt-6 text-4xl font-bold sm:text-5xl">About KigaliMart</h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-red-100 sm:text-lg">
            Rwanda's Premier Online Shopping Destination
          </p>
        </div>
      </section>

      <section className="px-6 sm:px-8 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold text-slate-900">Who We Are</h2>
            <p className="text-base leading-8 text-slate-600">
              KigaliMart is a proudly Rwandan e-commerce platform founded in the heart of Kigali. We bring quality products, trusted sellers, and fast delivery together in one convenient online shopping experience.
            </p>
            <p className="text-base leading-8 text-slate-600">
              Our mission is to serve customers across Rwanda with a curated selection of everyday essentials, electronics, fashion, home goods, and more—all backed by dedicated local support.
            </p>
          </div>
          <div className="overflow-hidden rounded-[2rem] shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500"
              alt="Storefront"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-red-600 px-6 py-14 text-white sm:px-8 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-[2rem] bg-red-700/90 p-8 text-center shadow-lg">
              <p className="text-4xl font-bold">1000+</p>
              <p className="mt-3 text-sm uppercase tracking-[0.25em] text-red-200">Happy Customers</p>
            </div>
            <div className="rounded-[2rem] bg-red-700/90 p-8 text-center shadow-lg">
              <p className="text-4xl font-bold">500+</p>
              <p className="mt-3 text-sm uppercase tracking-[0.25em] text-red-200">Products</p>
            </div>
            <div className="rounded-[2rem] bg-red-700/90 p-8 text-center shadow-lg">
              <p className="text-4xl font-bold">5</p>
              <p className="mt-3 text-sm uppercase tracking-[0.25em] text-red-200">Categories</p>
            </div>
            <div className="rounded-[2rem] bg-red-700/90 p-8 text-center shadow-lg">
              <p className="text-4xl font-bold">3+</p>
              <p className="mt-3 text-sm uppercase tracking-[0.25em] text-red-200">Years Experience</p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-red-600">Our Values</p>
            <h2 className="mt-4 text-3xl font-semibold text-slate-900">What Drives KigaliMart</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
              <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-red-100 text-red-600">
                <Star size={24} />
              </div>
              <h3 className="text-xl font-semibold text-slate-900">Quality</h3>
              <p className="mt-3 text-slate-600">We source only the best products for our customers.</p>
            </div>
            <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
              <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-red-100 text-red-600">
                <Truck size={24} />
              </div>
              <h3 className="text-xl font-semibold text-slate-900">Fast Delivery</h3>
              <p className="mt-3 text-slate-600">Quick delivery across Kigali, right to your doorstep.</p>
            </div>
            <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
              <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-red-100 text-red-600">
                <Heart size={24} />
              </div>
              <h3 className="text-xl font-semibold text-slate-900">Customer First</h3>
              <p className="mt-3 text-slate-600">Your satisfaction is our top priority.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-red-600">Meet the Team</p>
            <h2 className="mt-4 text-3xl font-semibold text-slate-900">The People Behind KigaliMart</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-[2rem] bg-white p-6 text-center shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300"
                alt="CEO"
                className="mx-auto mb-5 h-40 w-40 rounded-[2rem] object-cover"
              />
              <h3 className="text-xl font-semibold text-slate-900">Amina Uwizeyimana</h3>
              <p className="mt-2 text-sm text-slate-500">CEO</p>
            </div>
            <div className="rounded-[2rem] bg-white p-6 text-center shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300"
                alt="CTO"
                className="mx-auto mb-5 h-40 w-40 rounded-[2rem] object-cover"
              />
              <h3 className="text-xl font-semibold text-slate-900">Jean Bosco</h3>
              <p className="mt-2 text-sm text-slate-500">CTO</p>
            </div>
            <div className="rounded-[2rem] bg-white p-6 text-center shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300"
                alt="Head of Operations"
                className="mx-auto mb-5 h-40 w-40 rounded-[2rem] object-cover"
              />
              <h3 className="text-xl font-semibold text-slate-900">Mireille Niyonsaba</h3>
              <p className="mt-2 text-sm text-slate-500">Head of Operations</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-red-600 px-6 py-14 text-white sm:px-8 lg:px-16">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 rounded-[2rem] bg-red-700/90 p-10 text-center sm:flex-row sm:text-left">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-red-200">Ready to Shop?</p>
            <h2 className="mt-4 text-3xl font-semibold">Find everything you need at KigaliMart.</h2>
          </div>
          <Link
            to="/products"
            className="inline-flex rounded-full bg-white px-8 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
          >
            Shop Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
