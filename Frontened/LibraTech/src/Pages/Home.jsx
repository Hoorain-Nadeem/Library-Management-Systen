
import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black">

      {/* ================= NAVBAR ================= */}
      <nav className="border-b border-black/10 bg-white/95 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="h-20 flex items-center justify-between">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-green-600 text-white flex items-center justify-center font-bold text-xl">
                L
              </div>

              <div>
                <h1 className="text-2xl font-bold tracking-tight">
                  Libra<span className="text-green-600">Tech</span>
                </h1>
                <p className="text-[10px] text-gray-500 -mt-1 tracking-widest uppercase">
                  Library Management
                </p>
              </div>
            </Link>

            {/* Navigation */}
            <div className="hidden md:flex items-center gap-8 text-sm font-medium">
              <a href="#features" className="hover:text-green-600 transition">
                Features
              </a>

              <a href="#how-it-works" className="hover:text-green-600 transition">
                How It Works
              </a>

              <a href="#about" className="hover:text-green-600 transition">
                About
              </a>

              <a href="#contact" className="hover:text-green-600 transition">
                Contact
              </a>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="hidden sm:block px-5 py-2.5 font-medium hover:text-green-600 transition"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="px-5 py-2.5 bg-black text-white rounded-lg font-semibold hover:bg-green-600 transition duration-300"
              >
                Sign Up
              </Link>
            </div>

          </div>
        </div>
      </nav>


      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-[#fdf8f3]">

        {/* Decorative shapes */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-green-200 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-orange-200 rounded-full blur-3xl opacity-50"></div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32">

          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Hero Content */}
            <div>

              <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold mb-7">
                <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                Smart Library Management
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
                Manage Your
                <span className="block text-green-600">
                  Library Smarter.
                </span>
              </h1>

              <p className="mt-7 text-lg text-gray-600 leading-relaxed max-w-xl">
                LibraTech is a modern library management system designed to
                simplify books, members, borrowing, returns, and everyday
                library operations — all in one place.
              </p>

              {/* CTA */}
              <div className="flex flex-wrap gap-4 mt-9">

                <Link
                  to="/signup"
                  className="px-7 py-4 bg-green-600 text-white rounded-xl font-semibold shadow-lg shadow-green-600/20 hover:bg-green-700 hover:-translate-y-1 transition duration-300"
                >
                  Create Account →
                </Link>

                <a
                  href="#features"
                  className="px-7 py-4 bg-white border border-black/10 rounded-xl font-semibold hover:border-green-600 hover:text-green-600 transition duration-300"
                >
                  Explore Features
                </a>

              </div>

              {/* Trust */}
              <div className="flex flex-wrap items-center gap-6 mt-10 text-sm text-gray-500">
                <span>✓ Easy to use</span>
                <span>✓ Secure</span>
                <span>✓ Fast & reliable</span>
              </div>

            </div>


            {/* Dashboard Preview */}
            <div className="relative">

              <div className="absolute -top-8 -right-8 bg-[#f4a261] text-black px-5 py-3 rounded-xl font-bold shadow-lg rotate-3 z-10">
                Smart & Simple
              </div>

              <div className="bg-black rounded-3xl p-3 shadow-2xl shadow-black/20">

                <div className="bg-white rounded-2xl overflow-hidden">

                  {/* Fake browser bar */}
                  <div className="h-12 bg-gray-100 border-b flex items-center px-5 gap-2">
                    <span className="w-3 h-3 bg-red-400 rounded-full"></span>
                    <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
                    <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                  </div>

                  <div className="p-6">

                    <div className="flex justify-between items-center mb-7">
                      <div>
                        <p className="text-sm text-gray-500">
                          Welcome back
                        </p>
                        <h3 className="text-xl font-bold">
                          Library Dashboard
                        </h3>
                      </div>

                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold">
                        L
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-3">

                      <div className="bg-green-50 rounded-xl p-4">
                        <p className="text-xs text-gray-500">
                          Books
                        </p>
                        <p className="text-2xl font-bold mt-1">
                          2,480
                        </p>
                      </div>

                      <div className="bg-orange-50 rounded-xl p-4">
                        <p className="text-xs text-gray-500">
                          Members
                        </p>
                        <p className="text-2xl font-bold mt-1">
                          856
                        </p>
                      </div>

                      <div className="bg-gray-100 rounded-xl p-4">
                        <p className="text-xs text-gray-500">
                          Issued
                        </p>
                        <p className="text-2xl font-bold mt-1">
                          324
                        </p>
                      </div>

                    </div>

                    {/* Recent activity */}
                    <div className="mt-7">
                      <div className="flex justify-between mb-4">
                        <h4 className="font-bold">
                          Recent Activity
                        </h4>

                        <span className="text-green-600 text-sm">
                          View all
                        </span>
                      </div>

                      <div className="space-y-3">

                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 bg-green-100 rounded-lg"></div>
                            <div>
                              <p className="font-medium text-sm">
                                Atomic Habits
                              </p>
                              <p className="text-xs text-gray-500">
                                Book issued
                              </p>
                            </div>
                          </div>

                          <span className="text-xs text-green-600 font-semibold">
                            Active
                          </span>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 bg-orange-100 rounded-lg"></div>
                            <div>
                              <p className="font-medium text-sm">
                                The Psychology of Money
                              </p>
                              <p className="text-xs text-gray-500">
                                Returned
                              </p>
                            </div>
                          </div>

                          <span className="text-xs text-gray-500 font-semibold">
                            Completed
                          </span>
                        </div>

                      </div>
                    </div>

                  </div>

                </div>
              </div>

            </div>

          </div>
        </div>
      </section>


      {/* ================= STATS ================= */}
      <section className="bg-black text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">

            <div>
              <h3 className="text-3xl font-bold text-green-400">
                2.4K+
              </h3>
              <p className="text-gray-400 mt-1">
                Books Managed
              </p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-orange-300">
                850+
              </h3>
              <p className="text-gray-400 mt-1">
                Active Members
              </p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-green-400">
                99.9%
              </h3>
              <p className="text-gray-400 mt-1">
                System Reliability
              </p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-orange-300">
                24/7
              </h3>
              <p className="text-gray-400 mt-1">
                Accessibility
              </p>
            </div>

          </div>

        </div>
      </section>


      {/* ================= FEATURES ================= */}
      <section id="features" className="py-24 bg-white">

        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          <div className="max-w-2xl mb-16">
            <p className="text-green-600 font-bold uppercase tracking-widest text-sm">
              Powerful Features
            </p>

            <h2 className="text-4xl lg:text-5xl font-bold mt-3">
              Everything your library needs.
            </h2>

            <p className="text-gray-600 mt-5 text-lg">
              Manage your entire library from one clean and organized
              platform.
            </p>
          </div>


          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* Feature 1 */}
            <div className="p-8 rounded-2xl bg-[#fdf8f3] border border-black/5 hover:border-green-500 hover:-translate-y-1 transition duration-300">
              <div className="w-12 h-12 rounded-xl bg-green-100 text-green-700 flex items-center justify-center text-xl font-bold">
                B
              </div>

              <h3 className="text-xl font-bold mt-6">
                Book Management
              </h3>

              <p className="text-gray-600 mt-3 leading-relaxed">
                Add, update, search and organize your entire book collection
                with ease.
              </p>
            </div>


            {/* Feature 2 */}
            <div className="p-8 rounded-2xl bg-black text-white hover:-translate-y-1 transition duration-300">
              <div className="w-12 h-12 rounded-xl bg-green-500 text-white flex items-center justify-center text-xl font-bold">
                M
              </div>

              <h3 className="text-xl font-bold mt-6">
                Member Management
              </h3>

              <p className="text-gray-400 mt-3 leading-relaxed">
                Keep member information organized and easily accessible
                whenever you need it.
              </p>
            </div>


            {/* Feature 3 */}
            <div className="p-8 rounded-2xl bg-[#fff3e8] border border-black/5 hover:border-orange-400 hover:-translate-y-1 transition duration-300">
              <div className="w-12 h-12 rounded-xl bg-orange-200 text-orange-800 flex items-center justify-center text-xl font-bold">
                T
              </div>

              <h3 className="text-xl font-bold mt-6">
                Borrow & Return
              </h3>

              <p className="text-gray-600 mt-3 leading-relaxed">
                Track borrowed books, returns and due dates without
                complicated paperwork.
              </p>
            </div>


            {/* Feature 4 */}
            <div className="p-8 rounded-2xl bg-[#fdf8f3] border border-black/5 hover:border-green-500 hover:-translate-y-1 transition duration-300">
              <div className="w-12 h-12 rounded-xl bg-green-100 text-green-700 flex items-center justify-center text-xl font-bold">
                S
              </div>

              <h3 className="text-xl font-bold mt-6">
                Smart Search
              </h3>

              <p className="text-gray-600 mt-3 leading-relaxed">
                Quickly find books and members using a simple and powerful
                search experience.
              </p>
            </div>


            {/* Feature 5 */}
            <div className="p-8 rounded-2xl bg-[#fff3e8] border border-black/5 hover:border-orange-400 hover:-translate-y-1 transition duration-300">
              <div className="w-12 h-12 rounded-xl bg-orange-200 text-orange-800 flex items-center justify-center text-xl font-bold">
                D
              </div>

              <h3 className="text-xl font-bold mt-6">
                Dashboard
              </h3>

              <p className="text-gray-600 mt-3 leading-relaxed">
                Get a clear overview of your library activity from one
                centralized dashboard.
              </p>
            </div>


            {/* Feature 6 */}
            <div className="p-8 rounded-2xl bg-black text-white hover:-translate-y-1 transition duration-300">
              <div className="w-12 h-12 rounded-xl bg-orange-300 text-black flex items-center justify-center text-xl font-bold">
                🔒
              </div>

              <h3 className="text-xl font-bold mt-6">
                Secure System
              </h3>

              <p className="text-gray-400 mt-3 leading-relaxed">
                Keep your library data protected with secure authentication
                and controlled access.
              </p>
            </div>

          </div>
        </div>
      </section>


      {/* ================= HOW IT WORKS ================= */}
      <section id="how-it-works" className="py-24 bg-[#fdf8f3]">

        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          <div className="text-center max-w-2xl mx-auto">

            <p className="text-green-600 font-bold uppercase tracking-widest text-sm">
              Simple Process
            </p>

            <h2 className="text-4xl lg:text-5xl font-bold mt-3">
              Start managing in minutes.
            </h2>

            <p className="text-gray-600 mt-5">
              LibraTech keeps your library workflow simple and organized.
            </p>

          </div>


          <div className="grid md:grid-cols-3 gap-8 mt-16">

            <div className="text-center">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-green-600 text-white flex items-center justify-center text-2xl font-bold">
                01
              </div>

              <h3 className="text-xl font-bold mt-6">
                Create Account
              </h3>

              <p className="text-gray-600 mt-3">
                Create your LibraTech account and set up your library.
              </p>
            </div>


            <div className="text-center">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-black text-white flex items-center justify-center text-2xl font-bold">
                02
              </div>

              <h3 className="text-xl font-bold mt-6">
                Add Your Library
              </h3>

              <p className="text-gray-600 mt-3">
                Add books, members and important library information.
              </p>
            </div>


            <div className="text-center">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-orange-300 text-black flex items-center justify-center text-2xl font-bold">
                03
              </div>

              <h3 className="text-xl font-bold mt-6">
                Manage Everything
              </h3>

              <p className="text-gray-600 mt-3">
                Manage borrowing, returns, members and books from your
                dashboard.
              </p>
            </div>

          </div>

        </div>
      </section>


      {/* ================= ABOUT ================= */}
      <section id="about" className="py-24 bg-white">

        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          <div className="grid lg:grid-cols-2 gap-16 items-center">

            <div>
              <p className="text-green-600 font-bold uppercase tracking-widest text-sm">
                About LibraTech
              </p>

              <h2 className="text-4xl lg:text-5xl font-bold mt-3">
                Built to make library management effortless.
              </h2>

              <p className="text-gray-600 text-lg leading-relaxed mt-6">
                LibraTech brings the essential tools of modern library
                management into one simple platform. From managing books and
                members to tracking borrowing activity, everything is
                organized in one place.
              </p>

              <div className="mt-8 space-y-4">

                <div className="flex gap-3">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Clean and intuitive interface</span>
                </div>

                <div className="flex gap-3">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Fast book and member management</span>
                </div>

                <div className="flex gap-3">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Secure authentication system</span>
                </div>

              </div>
            </div>


            <div className="bg-black rounded-3xl p-10 text-white">

              <div className="text-6xl font-bold text-green-400">
                L
              </div>

              <h3 className="text-3xl font-bold mt-6">
                One platform.
              </h3>

              <h3 className="text-3xl font-bold text-orange-300">
                Complete control.
              </h3>

              <p className="text-gray-400 mt-5 leading-relaxed">
                Whether you're managing a small library or a growing
                collection, LibraTech helps you stay organized and focused.
              </p>

            </div>

          </div>

        </div>
      </section>


      {/* ================= CTA ================= */}
      <section className="py-24 bg-green-600 text-white">

        <div className="max-w-5xl mx-auto px-6 text-center">

          <h2 className="text-4xl lg:text-6xl font-bold tracking-tight">
            Ready to modernize your library?
          </h2>

          <p className="text-green-100 text-lg mt-6 max-w-2xl mx-auto">
            Create your LibraTech account and start managing your library
            smarter today.
          </p>

          <Link
            to="/signup"
            className="inline-block mt-9 px-8 py-4 bg-white text-black rounded-xl font-bold hover:bg-orange-200 transition duration-300"
          >
            Create Your Account →
          </Link>

        </div>

      </section>


      {/* ================= FOOTER ================= */}
      <footer id="contact" className="bg-black text-white">

        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">

            {/* Brand */}
            <div>

              <div className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-xl bg-green-600 flex items-center justify-center font-bold text-xl">
                  L
                </div>

                <h3 className="text-2xl font-bold">
                  Libra<span className="text-green-400">Tech</span>
                </h3>

              </div>

              <p className="text-gray-400 mt-5 leading-relaxed">
                A modern library management solution built to make
                organizing libraries simple, efficient and secure.
              </p>

            </div>


            {/* Product */}
            <div>

              <h4 className="font-bold text-lg">
                Product
              </h4>

              <div className="flex flex-col gap-3 mt-5 text-gray-400">

                <a href="#features" className="hover:text-green-400">
                  Features
                </a>

                <a href="#how-it-works" className="hover:text-green-400">
                  How It Works
                </a>

                <a href="#about" className="hover:text-green-400">
                  About
                </a>

              </div>

            </div>


            {/* Account */}
            <div>

              <h4 className="font-bold text-lg">
                Account
              </h4>

              <div className="flex flex-col gap-3 mt-5 text-gray-400">

                <Link to="/login" className="hover:text-green-400">
                  Login
                </Link>

                <Link to="/signup" className="hover:text-green-400">
                  Create Account
                </Link>

              </div>

            </div>


            {/* Contact */}
            <div>

              <h4 className="font-bold text-lg">
                Contact
              </h4>

              <div className="flex flex-col gap-3 mt-5 text-gray-400">

                <p>support@libratech.com</p>

                <p>Available 24/7</p>

              </div>

            </div>

          </div>


          {/* Bottom */}
          <div className="border-t border-white/10 mt-14 pt-7 flex flex-col md:flex-row justify-between gap-4 text-sm text-gray-500">

            <p>
              © 2026 LibraTech. All rights reserved.
            </p>

            <div className="flex gap-6">

              <a href="#" className="hover:text-white">
                Privacy Policy
              </a>

              <a href="#" className="hover:text-white">
                Terms of Service
              </a>

            </div>

          </div>

        </div>

      </footer>

    </div>
  );
}

