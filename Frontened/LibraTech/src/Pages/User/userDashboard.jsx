
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function UserDashboard() {
  const [userData, setUserData] = useState(null);
  const [myBooks, setMyBooks] = useState([]);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [returningId, setReturningId] = useState(null);

  // ================= USER PROFILE =================
  const user = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/profile",
        {},
        {
          withCredentials: true,
        }
      );

      console.log("USER DATA:", response.data);

      setUserData(response.data);
    } catch (error) {
      console.log("PROFILE ERROR:", error);
    }
  };

  // ================= GET ALL BOOKS =================
  const getBooks = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/book/all",
        {
          withCredentials: true,
        }
      );

      setBooks(response.data.bookList || []);
    } catch (error) {
      console.log("GET BOOK ERROR:", error);
    }
  };

  // ================= GET MY BOOKS =================
  const getMyBooks = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        "http://localhost:5000/api/borrow/my-books",
        {
          withCredentials: true,
        }
      );

      console.log("MY BOOKS:", response.data);

      setMyBooks(response.data.myBooks || []);
    } catch (error) {
      console.log("GET MY BOOKS ERROR:", error);

      alert(
        error.response?.data?.message ||
          "Unable to load your borrowed books"
      );
    } finally {
      setLoading(false);
    }
  };

  // ================= RETURN BOOK =================
  const returnBook = async (borrowId) => {
    try {
      setReturningId(borrowId);

      const response = await axios.put(
        `http://localhost:5000/api/borrow/return/${borrowId}`,
        {},
        {
          withCredentials: true,
        }
      );

      if (response.data.status) {
        alert("Book returned successfully!");

        setMyBooks((prevBooks) =>
          prevBooks.filter((item) => item._id !== borrowId)
        );
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log("RETURN BOOK ERROR:", error);

      alert(
        error.response?.data?.message ||
          "Something went wrong while returning the book"
      );
    } finally {
      setReturningId(null);
    }
  };

  // ================= DASHBOARD DATA =================
  const totalBookTitles = books.length;

  const availableBooks = books.filter(
    (book) => book.availableQuantity > 0
  ).length;

  const unavailableBooks = books.filter(
    (book) => book.availableQuantity <= 0
  ).length;

  const totalCopies = books.reduce(
    (total, book) => total + Number(book.quantity || 0),
    0
  );

  const availableCopies = books.reduce(
    (total, book) => total + Number(book.availableQuantity || 0),
    0
  );

  const borrowedCopies = totalCopies - availableCopies;

  const availabilityPercentage =
    totalCopies > 0
      ? Math.round((availableCopies / totalCopies) * 100)
      : 0;

  // ================= CATEGORIES =================
  const categories = books.reduce((acc, book) => {
    const category = book.category || "Other";

    acc[category] = (acc[category] || 0) + 1;

    return acc;
  }, {});

  const categoryList = Object.entries(categories)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4);

  // ================= EFFECT =================
  useEffect(() => {
    user();
    getBooks();
    getMyBooks();
  }, []);

  const userName = userData?.name || "User";

  const firstLetter = userName.charAt(0).toUpperCase();

  return (
    <div className="min-h-screen bg-[#f8faf9]">

      {/* ================= TOP HEADER ================= */}
      <header className="bg-white border-b border-gray-200">
        <div className="px-5 sm:px-8 lg:px-10 py-5">
          <div className="flex items-center justify-between gap-4">

            <div>
              <p className="text-xs sm:text-sm text-gray-500 font-medium">
                Library Management System
              </p>

              <h1 className="text-2xl sm:text-3xl font-bold text-gray-950 mt-1">
                Dashboard
              </h1>
            </div>

            {/* USER PROFILE */}
            <Link
              to="/profile"
              className="flex items-center gap-3 group"
            >
              <div className="hidden sm:block text-right">
                <p className="text-sm font-bold text-gray-900">
                  {userName}
                </p>

                <p className="text-xs text-gray-500 capitalize mt-0.5">
                  {userData?.role || "Member"}
                </p>
              </div>

              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-green-100 border border-green-200 flex items-center justify-center group-hover:bg-green-200 transition">
                <span className="text-green-700 font-bold text-lg">
                  {firstLetter}
                </span>
              </div>
            </Link>

          </div>
        </div>
      </header>

      {/* ================= MAIN CONTENT ================= */}
      <main className="p-5 sm:p-8 lg:p-10">

        <div className="max-w-[1600px] mx-auto">

          {/* ================= WELCOME SECTION ================= */}
          <section className="relative overflow-hidden bg-black rounded-3xl p-6 sm:p-8 lg:p-10 mb-8">

            <div className="absolute -right-16 -top-20 w-72 h-72 rounded-full bg-green-500/10" />

            <div className="absolute right-20 -bottom-24 w-56 h-56 rounded-full bg-green-400/5" />

            <div className="absolute left-1/2 top-0 w-40 h-40 rounded-full bg-white/[0.02]" />

            <div className="relative z-10 max-w-3xl">

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 mb-5">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />

                <span className="text-xs sm:text-sm text-green-400 font-semibold">
                  Library Member
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                Welcome back,{" "}
                <span className="text-green-400">
                  {userName}
                </span>
              </h2>

              <p className="text-gray-400 mt-4 text-sm sm:text-base leading-relaxed max-w-2xl">
                Explore the library, discover new books, keep track of
                your borrowed books, and manage your account from one
                place.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mt-7">

                <Link
                  to="/user/allbooks"
                  className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-black font-bold px-5 py-3 rounded-xl transition"
                >
                  <span>📚</span>
                  Browse Books
                </Link>

                <Link
                  to="/user/my-books"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/10 text-white font-semibold px-5 py-3 rounded-xl transition"
                >
                  <span>📖</span>
                  My Books
                </Link>

              </div>
            </div>
          </section>

          {/* ================= STAT CARDS ================= */}
          <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

            {/* TOTAL BOOKS */}
            <div className="group bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 hover:border-green-300 hover:shadow-lg hover:shadow-green-100/50 transition duration-300">

              <div className="flex items-start justify-between">

                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Total Books
                  </p>

                  <h3 className="text-3xl font-bold text-gray-950 mt-2">
                    {totalBookTitles}
                  </h3>
                </div>

                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-xl group-hover:scale-105 transition">
                  📚
                </div>

              </div>

              <div className="flex items-center gap-2 mt-5">
                <span className="w-2 h-2 rounded-full bg-green-500" />

                <p className="text-xs font-medium text-green-600">
                  Book titles in library
                </p>
              </div>

            </div>

            {/* BORROWED */}
            <div className="group bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 hover:border-orange-300 hover:shadow-lg hover:shadow-orange-100/50 transition duration-300">

              <div className="flex items-start justify-between">

                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Borrowed Books
                  </p>

                  <h3 className="text-3xl font-bold text-gray-950 mt-2">
                    {myBooks.length
                      .toString()
                      .padStart(2, "0")}
                  </h3>
                </div>

                <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-xl group-hover:scale-105 transition">
                  📖
                </div>

              </div>

              <div className="flex items-center gap-2 mt-5">
                <span className="w-2 h-2 rounded-full bg-orange-500" />

                <p className="text-xs font-medium text-orange-600">
                  Currently borrowed
                </p>
              </div>

            </div>

            {/* AVAILABLE */}
            <div className="group bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-100/50 transition duration-300">

              <div className="flex items-start justify-between">

                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Available Titles
                  </p>

                  <h3 className="text-3xl font-bold text-gray-950 mt-2">
                    {availableBooks}
                  </h3>
                </div>

                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700 text-xl group-hover:scale-105 transition">
                  ✓
                </div>

              </div>

              <div className="flex items-center gap-2 mt-5">
                <span className="w-2 h-2 rounded-full bg-blue-500" />

                <p className="text-xs font-medium text-blue-600">
                  Ready to borrow
                </p>
              </div>

            </div>

            {/* MEMBERSHIP */}
            <div className="group bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 hover:border-green-300 hover:shadow-lg hover:shadow-green-100/50 transition duration-300">

              <div className="flex items-start justify-between">

                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Membership
                  </p>

                  <h3 className="text-2xl font-bold text-green-600 mt-3">
                    Active
                  </h3>
                </div>

                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-green-700 text-xl group-hover:scale-105 transition">
                  ✓
                </div>

              </div>

              <div className="flex items-center gap-2 mt-5">
                <span className="w-2 h-2 rounded-full bg-green-500" />

                <p className="text-xs font-medium text-green-600">
                  Membership is active
                </p>
              </div>

            </div>

          </section>

          {/* ================= LIBRARY INSIGHTS ================= */}
          <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">

            {/* LIBRARY OVERVIEW */}
            <div className="xl:col-span-2 bg-white border border-gray-200 rounded-2xl p-5 sm:p-6">

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-7">

                <div>
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-lg bg-green-100 flex items-center justify-center">
                      📊
                    </div>

                    <h2 className="text-lg font-bold text-gray-950">
                      Library Insights
                    </h2>
                  </div>

                  <p className="text-sm text-gray-500 mt-2">
                    A quick overview of the library collection.
                  </p>
                </div>

                <Link
                  to="/user/allbooks"
                  className="text-sm font-semibold text-green-600 hover:text-green-700"
                >
                  Explore Library →
                </Link>

              </div>

              {/* AVAILABILITY */}
              <div className="bg-[#f8faf9] border border-gray-100 rounded-2xl p-5 mb-5">

                <div className="flex items-center justify-between mb-3">

                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      Collection availability
                    </p>

                    <p className="text-xs text-gray-500 mt-1">
                      {availableCopies} of {totalCopies} copies are
                      currently available.
                    </p>
                  </div>

                  <span className="text-lg font-bold text-green-600">
                    {availabilityPercentage}%
                  </span>

                </div>

                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">

                  <div
                    className="h-full bg-green-500 rounded-full transition-all duration-700"
                    style={{
                      width: `${availabilityPercentage}%`,
                    }}
                  />

                </div>

                <div className="flex items-center justify-between mt-3 text-xs">

                  <span className="text-green-600 font-medium">
                    {availableCopies} available
                  </span>

                  <span className="text-orange-500 font-medium">
                    {borrowedCopies} borrowed
                  </span>

                </div>

              </div>

              {/* SMALL INSIGHT CARDS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                <div className="border border-gray-100 rounded-2xl p-5 hover:border-green-200 hover:shadow-sm transition">

                  <div className="flex items-center gap-3">

                    <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                      📚
                    </div>

                    <div>
                      <p className="text-xs text-gray-500">
                        Collection
                      </p>

                      <p className="text-lg font-bold text-gray-900">
                        {totalCopies} Copies
                      </p>
                    </div>

                  </div>

                  <p className="text-xs text-gray-500 mt-4">
                    Total physical copies available across the library.
                  </p>

                </div>

                <div className="border border-gray-100 rounded-2xl p-5 hover:border-orange-200 hover:shadow-sm transition">

                  <div className="flex items-center gap-3">

                    <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
                      📖
                    </div>

                    <div>
                      <p className="text-xs text-gray-500">
                        Your Reading
                      </p>

                      <p className="text-lg font-bold text-gray-900">
                        {myBooks.length} Active
                      </p>
                    </div>

                  </div>

                  <p className="text-xs text-gray-500 mt-4">
                    Books currently checked out under your account.
                  </p>

                </div>

              </div>

            </div>

            {/* POPULAR CATEGORIES */}
            <div className="bg-black rounded-2xl p-5 sm:p-6 text-white">

              <div className="flex items-center gap-3 mb-2">

                <div className="w-10 h-10 rounded-xl bg-green-500 text-black flex items-center justify-center">
                  🗂️
                </div>

                <div>
                  <h2 className="text-lg font-bold">
                    Top Categories
                  </h2>

                  <p className="text-xs text-gray-400">
                    Based on available books
                  </p>
                </div>

              </div>

              <div className="mt-6 space-y-4">

                {categoryList.length > 0 ? (
                  categoryList.map(([category, count], index) => {

                    const percentage =
                      totalBookTitles > 0
                        ? Math.round(
                            (count / totalBookTitles) * 100
                          )
                        : 0;

                    return (
                      <div key={category}>

                        <div className="flex items-center justify-between mb-2">

                          <div className="flex items-center gap-2">

                            <span className="w-6 h-6 rounded-md bg-white/10 flex items-center justify-center text-xs text-green-400">
                              {index + 1}
                            </span>

                            <span className="text-sm font-medium">
                              {category}
                            </span>

                          </div>

                          <span className="text-xs text-gray-400">
                            {count} books
                          </span>

                        </div>

                        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">

                          <div
                            className="h-full bg-green-400 rounded-full"
                            style={{
                              width: `${percentage}%`,
                            }}
                          />

                        </div>

                      </div>
                    );
                  })
                ) : (
                  <div className="py-10 text-center">

                    <div className="text-4xl mb-3">
                      📚
                    </div>

                    <p className="text-sm text-gray-400">
                      Categories will appear here once books
                      are added to the library.
                    </p>

                  </div>
                )}

              </div>

            </div>

          </section>

          {/* ================= QUICK ACTIONS ================= */}
          <section className="mt-6 bg-white border border-gray-200 rounded-2xl p-5 sm:p-6">

            <div className="mb-6">

              <h2 className="text-lg font-bold text-gray-950">
                Quick Actions
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Everything you need to manage your library experience.
              </p>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

              {/* BROWSE */}
              <Link
                to="/user/allbooks"
                className="group flex items-center gap-4 p-4 rounded-2xl bg-green-50 border border-green-100 hover:bg-green-100 hover:border-green-200 hover:-translate-y-1 transition duration-300"
              >

                <div className="w-12 h-12 shrink-0 bg-green-500 rounded-xl flex items-center justify-center text-xl group-hover:scale-105 transition">
                  📚
                </div>

                <div className="flex-1">

                  <p className="font-bold text-gray-950">
                    Browse Books
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    Discover books in the library
                  </p>

                </div>

                <span className="text-green-600 text-lg">
                  →
                </span>

              </Link>

              {/* MY BOOKS */}
              <Link
                to="/user/my-books"
                className="group flex items-center gap-4 p-4 rounded-2xl bg-orange-50 border border-orange-100 hover:bg-orange-100 hover:border-orange-200 hover:-translate-y-1 transition duration-300"
              >

                <div className="w-12 h-12 shrink-0 bg-orange-200 rounded-xl flex items-center justify-center text-xl group-hover:scale-105 transition">
                  📖
                </div>

                <div className="flex-1">

                  <p className="font-bold text-gray-950">
                    My Books
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    View and manage borrowed books
                  </p>

                </div>

                <span className="text-orange-600 text-lg">
                  →
                </span>

              </Link>

              {/* PROFILE */}
              <Link
                to="/profile"
                className="group flex items-center gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-200 hover:bg-gray-100 hover:-translate-y-1 transition duration-300"
              >

                <div className="w-12 h-12 shrink-0 bg-black text-white rounded-xl flex items-center justify-center text-xl group-hover:scale-105 transition">
                  👤
                </div>

                <div className="flex-1">

                  <p className="font-bold text-gray-950">
                    My Profile
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    Manage your account
                  </p>

                </div>

                <span className="text-gray-500 text-lg">
                  →
                </span>

              </Link>

            </div>

          </section>

          {/* ================= BOTTOM INFO ================= */}
          <section className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* LIBRARY TIP */}
            <div className="bg-green-50 border border-green-100 rounded-2xl p-5 sm:p-6">

              <div className="flex items-start gap-4">

                <div className="w-11 h-11 rounded-xl bg-green-500 flex items-center justify-center shrink-0">
                  💡
                </div>

                <div>

                  <h3 className="font-bold text-gray-950">
                    Library Tip
                  </h3>

                  <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                    Return your books on time to keep your membership
                    in good standing and make books available to other
                    readers.
                  </p>

                </div>

              </div>

            </div>

            {/* NEED HELP */}
            <div className="bg-black rounded-2xl p-5 sm:p-6 text-white">

              <div className="flex items-start gap-4">

                <div className="w-11 h-11 rounded-xl bg-green-500 text-black flex items-center justify-center shrink-0">
                  ?
                </div>

                <div>

                  <h3 className="font-bold">
                    Need Help?
                  </h3>

                  <p className="text-sm text-gray-400 mt-1">
                    Contact the library administration if you have
                    questions about borrowing or returning books.
                  </p>

                </div>

              </div>

            </div>

          </section>

        </div>
      </main>

    </div>
  );
}
