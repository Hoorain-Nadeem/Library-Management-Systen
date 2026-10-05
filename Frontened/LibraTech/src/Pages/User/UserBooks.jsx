import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function MyBooks() {
  const [myBooks, setMyBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [returningId, setReturningId] = useState(null);

  // Get user's borrowed books
  const getMyBooks = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        "https://library-management-systen.vercel.app/api/borrow/my-books",
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

  useEffect(() => {
    getMyBooks();
  }, []);

  // Return book
  const returnBook = async (borrowId) => {
    try {
      setReturningId(borrowId);

      const response = await axios.put(
        `https://library-management-systen.vercel.app/api/borrow/return/${borrowId}`,
        {},
        {
          withCredentials: true,
        }
      );

      if (response.data.status) {
        alert("Book returned successfully!");

        // Remove returned book from current list
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

  // Loading screen
  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8faf9] p-5 sm:p-8 lg:p-10">
        <div className="max-w-[1500px] mx-auto">
          <div className="animate-pulse">
            <div className="h-8 w-48 bg-gray-200 rounded-lg" />
            <div className="h-4 w-72 bg-gray-200 rounded-lg mt-3" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-10">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="h-96 bg-white border border-gray-200 rounded-2xl"
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
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="px-5 sm:px-8 lg:px-10 py-6">
          <div className="max-w-[1500px] mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
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
                    My Books
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl font-bold text-gray-950">
                  My Books
                </h1>

                <p className="text-gray-500 mt-2 text-sm sm:text-base">
                  Books currently borrowed by you.
                </p>
              </div>

              <Link
                to="/user/allbooks"
                className="inline-flex items-center justify-center gap-2 bg-black hover:bg-gray-800 text-white px-5 py-3 rounded-xl font-semibold transition"
              >
                <span>📚</span>
                Browse Books
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="p-5 sm:p-8 lg:p-10">
        <div className="max-w-[1500px] mx-auto">

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
            <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6">
              <p className="text-sm text-gray-500">
                Currently Borrowed
              </p>

              <h2 className="text-3xl font-bold text-gray-950 mt-1">
                {myBooks.length}
              </h2>

              <p className="text-xs text-green-600 mt-3">
                Books in your possession
              </p>
            </div>

            <div className="bg-black rounded-2xl p-5 sm:p-6 text-white">
              <p className="text-sm text-gray-400">
                Library Status
              </p>

              <h2 className="text-2xl font-bold text-green-400 mt-1">
                Active
              </h2>

              <p className="text-xs text-gray-400 mt-3">
                You can borrow available books
              </p>
            </div>
          </div>

          {/* No books */}
          {myBooks.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded-2xl py-20 px-6 text-center">
              <div className="w-20 h-20 bg-green-50 rounded-2xl flex items-center justify-center text-4xl mx-auto">
                📚
              </div>

              <h2 className="text-xl font-bold text-gray-900 mt-5">
                No borrowed books
              </h2>

              <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto">
                You don't have any books borrowed right now.
                Browse the library and borrow a book you'd like to read.
              </p>

              <Link
                to="/books"
                className="inline-flex mt-6 bg-black hover:bg-green-600 text-white px-5 py-3 rounded-xl font-semibold text-sm transition"
              >
                Browse Books
              </Link>
            </div>
          ) : (
            <>
              {/* Section heading */}
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-950">
                    Your Borrowed Books
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    Return a book when you're finished reading.
                  </p>
                </div>

                <span className="hidden sm:inline-flex px-3 py-1.5 rounded-full bg-green-100 text-green-700 text-xs font-bold">
                  {myBooks.length}{" "}
                  {myBooks.length === 1 ? "Book" : "Books"}
                </span>
              </div>

              {/* Books */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {myBooks.map((item) => {
                  const book = item.bookId;

                  const borrowDate = item.borrowDate
                    ? new Date(
                        item.borrowDate
                      ).toLocaleDateString()
                    : "N/A";

                  const dueDate = item.dueDate
                    ? new Date(
                        item.dueDate
                      ).toLocaleDateString()
                    : "N/A";

                  return (
                    <article
                      key={item._id}
                      className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-xl hover:shadow-gray-200/60 transition-all duration-300"
                    >
                      {/* Book top */}
                      <div className="h-44 bg-gradient-to-br from-black via-gray-900 to-green-950 relative overflow-hidden">
                        <div className="absolute -right-10 -top-10 w-36 h-36 rounded-full bg-green-500/10" />

                        <div className="absolute -left-10 -bottom-16 w-40 h-40 rounded-full bg-green-500/10" />

                        <div className="relative h-full flex flex-col items-center justify-center text-center p-5">
                          <div className="w-14 h-14 rounded-2xl bg-green-500 flex items-center justify-center text-2xl shadow-lg shadow-green-900/30">
                            📖
                          </div>

                          <p className="text-xs text-green-400 font-semibold uppercase tracking-wider mt-3">
                            LibraTech
                          </p>
                        </div>

                        {/* Status */}
                        <div className="absolute top-4 right-4">
                          <span className="px-2.5 py-1.5 rounded-full bg-green-500 text-black text-[11px] font-bold">
                            Borrowed
                          </span>
                        </div>
                      </div>

                      {/* Book details */}
                      <div className="p-5">
                        <div className="flex items-center justify-between gap-3 mb-3">
                          <span className="px-2.5 py-1 rounded-lg bg-green-50 text-green-700 text-xs font-semibold">
                            {book?.category || "General"}
                          </span>

                          {book?.publicationYear && (
                            <span className="text-xs text-gray-400">
                              {book.publicationYear}
                            </span>
                          )}
                        </div>

                        <h2
                          className="text-lg font-bold text-gray-950 line-clamp-2 min-h-[56px]"
                          title={book?.title}
                        >
                          {book?.title || "Unknown Book"}
                        </h2>

                        <p className="text-sm text-gray-500 mt-2 truncate">
                          by{" "}
                          <span className="font-medium text-gray-700">
                            {book?.author || "Unknown Author"}
                          </span>
                        </p>

                        {/* Borrow information */}
                        <div className="mt-5 pt-4 border-t border-gray-100 space-y-3">
                          <div className="flex justify-between gap-3">
                            <span className="text-xs text-gray-400">
                              Borrowed
                            </span>

                            <span className="text-xs font-semibold text-gray-700">
                              {borrowDate}
                            </span>
                          </div>

                          <div className="flex justify-between gap-3">
                            <span className="text-xs text-gray-400">
                              Due Date
                            </span>

                            <span className="text-xs font-semibold text-orange-500">
                              {dueDate}
                            </span>
                          </div>

                          <div className="flex justify-between gap-3">
                            <span className="text-xs text-gray-400">
                              ISBN
                            </span>

                            <span className="text-xs font-semibold text-gray-700">
                              {book?.ISBN || "N/A"}
                            </span>
                          </div>
                        </div>

                        {/* Return button */}
                        <button
                          onClick={() =>
                            returnBook(item._id)
                          }
                          disabled={returningId === item._id}
                          className={`w-full mt-5 py-3 rounded-xl font-semibold text-sm transition ${
                            returningId === item._id
                              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                              : "bg-black text-white hover:bg-green-600"
                          }`}
                        >
                          {returningId === item._id
                            ? "Returning..."
                            : "Return Book"}
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
