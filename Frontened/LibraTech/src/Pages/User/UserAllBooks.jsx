
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function UserAllBooks() {
  const [books, setBooks] = useState([]);

  // Filter fields
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [availability, setAvailability] = useState("All");

  const [loading, setLoading] = useState(true);

  // ================= GET ALL BOOKS =================

  const getBooks = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        "https://library-management-systen.vercel.app/api/book/all",
        {
          withCredentials: true,
        }
      );

      console.log("ALL BOOKS:", response.data);

      setBooks(response.data.bookList || []);
    } catch (error) {
      console.log("GET BOOKS ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  // ================= FILTER BOOKS =================

  const filterBooks = async () => {
    try {
      setLoading(true);

      const params = {};

      // Search can be title/author/ISBN
      if (search.trim()) {
        params.search = search.trim();
      }

      if (category !== "All") {
        params.category = category;
      }

      if (availability !== "All") {
        params.available =
          availability === "Available" ? "true" : "false";
      }

      console.log("FILTER PARAMS:", params);

      const response = await axios.get(
        "https://library-management-systen.vercel.app/api/book/filter",
        {
          params,
          withCredentials: true,
        }
      );

      console.log("FILTERED BOOKS:", response.data);

      setBooks(response.data.bookList || []);
    } catch (error) {
      console.log("FILTER BOOKS ERROR:", error);

      alert(
        error.response?.data?.message ||
          "Something went wrong while filtering books"
      );
    } finally {
      setLoading(false);
    }
  };

  // ================= APPLY FILTER =================

  const applyFilters = () => {
    const hasAnyFilter =
      search.trim() ||
      category !== "All" ||
      availability !== "All";

    if (hasAnyFilter) {
      filterBooks();
    } else {
      getBooks();
    }
  };

  // ================= INITIAL LOAD =================

  useEffect(() => {
    getBooks();
  }, []);

  // ================= BORROW BOOK =================

  const borrowBook = async (bookId) => {
    try {
      const response = await axios.post(
        "https://library-management-systen.vercel.app/api/borrow/borrow",
        {
          bookId: bookId,
        },
        {
          withCredentials: true,
        }
      );

      if (response.data.status) {
        alert("Book borrowed successfully!");

        // Refresh books so availableQuantity changes
        getBooks();
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log("BORROW ERROR:", error);

      alert(
        error.response?.data?.message ||
          "Something went wrong while borrowing the book"
      );
    }
  };

  // ================= CLEAR FILTERS =================

  const clearFilters = () => {
    setSearch("");
    setCategory("All");
    setAvailability("All");

    // Get all books again
    getBooks();
  };

  // ================= FILTER STATUS =================

  const hasFilters =
    search.trim() !== "" ||
    category !== "All" ||
    availability !== "All";

  // ================= STATISTICS =================

  const totalBooks = books.length;

  const availableBooks = books.filter(
    (book) => Number(book.availableQuantity) > 0
  ).length;

  const unavailableBooks = books.filter(
    (book) => Number(book.availableQuantity) <= 0
  ).length;

  const totalCopies = books.reduce(
    (total, book) => total + Number(book.quantity || 0),
    0
  );

  // Since backend already filtered the books,
  // books itself is our filtered result.
  const filteredBooks = books;

  // ================= CATEGORIES =================

  const categories = [
    "All",
    ...new Set(
      books
        .map((book) => book.category)
        .filter((category) => category)
    ),
  ];

  // ================= LOADING =================

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8faf9] p-5 sm:p-8 lg:p-10">
        <div className="max-w-[1600px] mx-auto">
          <div className="animate-pulse">
            <div className="h-8 w-48 bg-gray-200 rounded-lg mb-3" />

            <div className="h-4 w-80 bg-gray-200 rounded-lg mb-8" />

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="h-28 bg-white rounded-2xl border border-gray-200"
                />
              ))}
            </div>

            <div className="h-20 bg-white rounded-2xl border border-gray-200 mb-6" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                <div
                  key={item}
                  className="h-80 bg-white rounded-2xl border border-gray-200"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8faf9]">

      {/* ================= PAGE HEADER ================= */}

      <header className="bg-white border-b border-gray-200">
        <div className="px-5 sm:px-8 lg:px-10 py-6">
          <div className="max-w-[1600px] mx-auto">

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

              <div>
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                  <Link
                    to="/user"
                    className="hover:text-green-600 transition"
                  >
                    Dashboard
                  </Link>

                  <span>›</span>

                  <span className="text-gray-900 font-medium">
                    Books
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl font-bold text-gray-950">
                  Explore Books
                </h1>

                <p className="text-gray-500 mt-2 text-sm sm:text-base">
                  Discover books available in the LibraTech library.
                </p>
              </div>

              <Link
                to="/user/my-books"
                className="inline-flex items-center justify-center gap-2 bg-black hover:bg-gray-800 text-white px-5 py-3 rounded-xl font-semibold transition"
              >
                <span>📖</span>
                My Books
              </Link>

            </div>

          </div>
        </div>
      </header>

      {/* ================= MAIN ================= */}

      <main className="p-5 sm:p-8 lg:p-10">
        <div className="max-w-[1600px] mx-auto">

          {/* ================= STATISTICS ================= */}

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

            {/* Total Books */}

            <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6">
              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm text-gray-500">
                    Total Titles
                  </p>

                  <h2 className="text-3xl font-bold text-gray-950 mt-1">
                    {totalBooks}
                  </h2>
                </div>

                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-xl">
                  📚
                </div>

              </div>

              <p className="text-xs text-gray-400 mt-4">
                Books matching your selection
              </p>
            </div>

            {/* Available */}

            <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6">
              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm text-gray-500">
                    Available
                  </p>

                  <h2 className="text-3xl font-bold text-green-600 mt-1">
                    {availableBooks}
                  </h2>
                </div>

                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-700">
                  ✓
                </div>

              </div>

              <p className="text-xs text-green-600 mt-4">
                Currently available titles
              </p>
            </div>

            {/* Unavailable */}

            <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6">
              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm text-gray-500">
                    Unavailable
                  </p>

                  <h2 className="text-3xl font-bold text-orange-500 mt-1">
                    {unavailableBooks}
                  </h2>
                </div>

                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  ⏳
                </div>

              </div>

              <p className="text-xs text-orange-600 mt-4">
                Currently unavailable
              </p>
            </div>

            {/* Total Copies */}

            <div className="bg-black rounded-2xl p-5 sm:p-6 text-white">
              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm text-gray-400">
                    Total Copies
                  </p>

                  <h2 className="text-3xl font-bold text-white mt-1">
                    {totalCopies}
                  </h2>
                </div>

                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center text-black text-xl">
                  📦
                </div>

              </div>

              <p className="text-xs text-green-400 mt-4">
                Physical copies in selection
              </p>
            </div>

          </div>

          {/* ================= FILTER BAR ================= */}

          <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 mb-8">

            <div className="flex flex-col xl:flex-row gap-4">

              {/* Search */}

              <div className="relative flex-1">

                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
                  🔍
                </span>

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      applyFilters();
                    }
                  }}
                  placeholder="Search by title, author or ISBN..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-12 pr-4 py-3.5 text-sm outline-none focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-100 transition"
                />

              </div>

              {/* Category */}

              <div className="w-full xl:w-56">

                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-gray-700 outline-none focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-100 transition"
                >
                  {categories.map((item) => (
                    <option key={item} value={item}>
                      {item === "All"
                        ? "All Categories"
                        : item}
                    </option>
                  ))}
                </select>

              </div>

              {/* Availability */}

              <div className="w-full xl:w-56">

                <select
                  value={availability}
                  onChange={(e) =>
                    setAvailability(e.target.value)
                  }
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-gray-700 outline-none focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-100 transition"
                >
                  <option value="All">
                    All Availability
                  </option>

                  <option value="Available">
                    Available
                  </option>

                  <option value="Unavailable">
                    Unavailable
                  </option>
                </select>

              </div>

              {/* Apply */}

              <button
                onClick={applyFilters}
                className="px-6 py-3.5 rounded-xl bg-black hover:bg-green-600 text-white font-semibold text-sm transition"
              >
                Apply Filters
              </button>

              {/* Clear */}

              {hasFilters && (
                <button
                  onClick={clearFilters}
                  className="px-5 py-3.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-sm transition"
                >
                  Clear
                </button>
              )}

            </div>

            {/* Filter Result */}

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-5 pt-5 border-t border-gray-100">

              <p className="text-sm text-gray-500">
                Showing{" "}
                <span className="font-bold text-gray-900">
                  {books.length}
                </span>{" "}
                books
              </p>

              {hasFilters && (
                <p className="text-xs text-green-600 font-medium">
                  Backend filters are active
                </p>
              )}

            </div>

          </div>

          {/* ================= BOOK GRID ================= */}

          {filteredBooks.length > 0 ? (

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

              {filteredBooks.map((book) => {

                const isAvailable =
                  Number(book.availableQuantity) > 0;

                return (
                  <article
                    key={book._id}
                    className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-xl hover:shadow-gray-200/60 transition-all duration-300"
                  >

                    {/* Book Visual */}

                    <div className="h-44 sm:h-48 bg-gradient-to-br from-black via-gray-900 to-green-950 relative overflow-hidden">

                      <div className="absolute -right-10 -top-10 w-36 h-36 rounded-full bg-green-500/10" />

                      <div className="absolute -left-12 -bottom-16 w-40 h-40 rounded-full bg-green-500/10" />

                      <div className="relative h-full flex flex-col items-center justify-center p-6 text-center">

                        <div className="w-14 h-14 rounded-2xl bg-green-500 flex items-center justify-center text-2xl mb-3 shadow-lg shadow-green-900/30 group-hover:scale-110 transition duration-300">
                          📚
                        </div>

                        <p className="text-xs text-green-400 font-semibold uppercase tracking-wider">
                          LibraTech Library
                        </p>

                      </div>

                      {/* Availability */}

                      <div className="absolute top-4 right-4">

                        {isAvailable ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-green-500 text-black text-[11px] font-bold">
                            <span className="w-1.5 h-1.5 rounded-full bg-black" />
                            Available
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-orange-400 text-black text-[11px] font-bold">
                            <span className="w-1.5 h-1.5 rounded-full bg-black" />
                            Unavailable
                          </span>
                        )}

                      </div>

                    </div>

                    {/* Book Information */}

                    <div className="p-5">

                      {/* Category */}

                      <div className="flex items-center justify-between gap-3 mb-3">

                        <span className="inline-flex px-2.5 py-1 rounded-lg bg-green-50 text-green-700 text-xs font-semibold">
                          {book.category || "General"}
                        </span>

                        {book.publicationYear && (
                          <span className="text-xs text-gray-400">
                            {book.publicationYear}
                          </span>
                        )}

                      </div>

                      {/* Title */}

                      <h2
                        className="text-lg font-bold text-gray-950 line-clamp-2 min-h-[56px] group-hover:text-green-700 transition"
                        title={book.title}
                      >
                        {book.title}
                      </h2>

                      {/* Author */}

                      <p className="text-sm text-gray-500 mt-2 truncate">
                        by{" "}
                        <span className="font-medium text-gray-700">
                          {book.author || "Unknown Author"}
                        </span>
                      </p>

                      {/* ISBN */}

                      <div className="mt-4 pt-4 border-t border-gray-100">

                        <div className="flex items-center justify-between gap-3">

                          <div>
                            <p className="text-[11px] uppercase tracking-wide text-gray-400 font-semibold">
                              ISBN
                            </p>

                            <p className="text-xs text-gray-600 mt-1 font-medium">
                              {book.ISBN || "N/A"}
                            </p>
                          </div>

                          <div className="text-right">

                            <p className="text-[11px] uppercase tracking-wide text-gray-400 font-semibold">
                              Copies
                            </p>

                            <p
                              className={`text-sm font-bold mt-1 ${
                                isAvailable
                                  ? "text-green-600"
                                  : "text-orange-500"
                              }`}
                            >
                              {book.availableQuantity || 0}

                              <span className="text-gray-400 font-normal">
                                {" "}
                                / {book.quantity || 0}
                              </span>
                            </p>

                          </div>

                        </div>

                      </div>

                      {/* Bottom */}

                      <div className="mt-5 flex items-center gap-3">

                        {isAvailable ? (
                          <button
                            onClick={() => borrowBook(book._id)}
                            className="flex-1 bg-black hover:bg-green-600 text-white py-3 rounded-xl font-semibold text-sm transition"
                          >
                            Borrow Book
                          </button>
                        ) : (
                          <button
                            disabled
                            className="flex-1 bg-gray-100 text-gray-400 py-3 rounded-xl font-semibold text-sm cursor-not-allowed"
                          >
                            Unavailable
                          </button>
                        )}

                      </div>

                    </div>

                  </article>
                );
              })}

            </div>

          ) : (

            /* ================= EMPTY STATE ================= */

            <div className="bg-white border border-gray-200 rounded-2xl py-20 px-6 text-center">

              <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center text-3xl mx-auto">
                📚
              </div>

              <h2 className="text-xl font-bold text-gray-900 mt-5">
                No books found
              </h2>

              <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto">
                We couldn't find any books matching your current
                search or filters.
              </p>

              {hasFilters && (
                <button
                  onClick={clearFilters}
                  className="mt-6 bg-black hover:bg-gray-800 text-white px-5 py-3 rounded-xl font-semibold text-sm transition"
                >
                  Clear Filters
                </button>
              )}

            </div>

          )}

        </div>
      </main>
    </div>
  );
}
