import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const ContactPage = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    toast.success('Message sent successfully!');
    setFullName('');
    setEmail('');
    setSubject('');
    setMessage('');
  };

  return (
    <div className="space-y-10">
      <section className="bg-red-600 px-6 py-14 text-white sm:px-8 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm uppercase tracking-[0.35em] text-red-200">Contact Us</p>
          <h1 className="mt-4 text-4xl font-bold sm:text-5xl">Have a question or need support?</h1>
          <p className="mt-4 max-w-2xl text-base text-red-100 sm:text-lg">
            Our KigaliMart team is here to help. Send us a message and we’ll get back to you soon.
          </p>
        </div>
      </section>

      <section className="px-6 pb-16 sm:px-8 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <form onSubmit={handleSubmit} className="rounded-[2rem] bg-white p-8 shadow-sm">
            <h2 className="mb-6 text-3xl font-semibold text-slate-900">Get in Touch</h2>

            <div className="grid gap-6 sm:grid-cols-2">
              <label className="block text-sm text-slate-700">
                Full Name
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-red-500 focus:ring-0"
                />
              </label>
              <label className="block text-sm text-slate-700">
                Email
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-red-500 focus:ring-0"
                />
              </label>
            </div>

            <label className="mt-6 block text-sm text-slate-700">
              Subject
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-red-500 focus:ring-0"
              />
            </label>

            <label className="mt-6 block text-sm text-slate-700">
              Message
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={6}
                className="mt-2 w-full rounded-[1.5rem] border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-red-500 focus:ring-0"
              />
            </label>

            <button
              type="submit"
              className="mt-8 inline-flex rounded-full bg-red-600 px-8 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
            >
              Send Message
            </button>
          </form>

          <aside className="rounded-[2rem] bg-slate-950 p-8 text-slate-100 shadow-sm">
            <h2 className="mb-6 text-3xl font-semibold text-white">Contact Info</h2>
            <div className="space-y-6 text-sm text-slate-200">
              <div className="flex items-start gap-4">
                <span className="mt-1 rounded-2xl bg-red-600 p-3 text-white">
                  <MapPin size={20} />
                </span>
                <div>
                  <p className="font-semibold text-white">Address</p>
                  <p>KK 508 ST, Gasabo, Kigali, Rwanda</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="mt-1 rounded-2xl bg-red-600 p-3 text-white">
                  <Phone size={20} />
                </span>
                <div>
                  <p className="font-semibold text-white">Phone</p>
                  <p>+250 791 591 773</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="mt-1 rounded-2xl bg-red-600 p-3 text-white">
                  <Mail size={20} />
                </span>
                <div>
                  <p className="font-semibold text-white">Email</p>
                  <p>info@kigalimart.rw</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="mt-1 rounded-2xl bg-red-600 p-3 text-white">
                  <Clock size={20} />
                </span>
                <div>
                  <p className="font-semibold text-white">Hours</p>
                  <p>Mon - Sat: 8:00 AM - 8:00 PM</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
