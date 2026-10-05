import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [books, setBooks] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get books
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
      console.log("BOOK ERROR:", error);
    }
  };

  // Get members
  const getMembers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/member/all",
        {
          withCredentials: true,
        }
      );

      setMembers(response.data.memberList || []);
    } catch (error) {
      console.log("MEMBER ERROR:", error);
    }
  };

  useEffect(() => {
    const loadDashboard = async () => {
      setLoading(true);

      await Promise.all([
        getBooks(),
        getMembers(),
      ]);

      setLoading(false);
    };

    loadDashboard();
  }, []);

  // Dashboard calculations
  const totalBookTitles = books.length;

  const totalMembers = members.length;

  const totalCopies = books.reduce(
    (total, book) =>
      total + Number(book.quantity || 0),
    0
  );

  const availableCopies = books.reduce(
    (total, book) =>
      total + Number(book.availableQuantity || 0),
    0
  );

  const borrowedCopies =
    totalCopies - availableCopies;

  return (
    <div>

      {/* Header */}
      <div className="mb-8">

        <h1 className="text-3xl font-bold text-gray-900">
          Dashboard
        </h1>

        <p className="text-gray-500 mt-1">
          Welcome to LibraTech Admin Panel
        </p>

      </div>


      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

        {/* Total Book Titles */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Book Titles
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mt-2">
                {loading ? "..." : totalBookTitles}
              </h2>
            </div>

            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-2xl">
              📚
            </div>

          </div>

          <p className="text-sm text-green-600 mt-4">
            Total books in library
          </p>

        </div>


        {/* Members */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Members
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mt-2">
                {loading ? "..." : totalMembers}
              </h2>
            </div>

            <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-2xl">
              👥
            </div>

          </div>

          <p className="text-sm text-orange-600 mt-4">
            Registered library members
          </p>

        </div>


        {/* Total Copies */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Total Copies
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mt-2">
                {loading ? "..." : totalCopies}
              </h2>
            </div>

            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-2xl">
              📖
            </div>

          </div>

          <p className="text-sm text-blue-600 mt-4">
            Physical book copies
          </p>

        </div>


        {/* Borrowed */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Borrowed Copies
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mt-2">
                {loading ? "..." : borrowedCopies}
              </h2>
            </div>

            <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center text-2xl">
              📕
            </div>

          </div>

          <p className="text-sm text-red-600 mt-4">
            Currently borrowed
          </p>

        </div>

      </div>


      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">


        {/* Library Overview */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">

          <h2 className="text-xl font-bold text-gray-900">
            Library Overview
          </h2>

          <p className="text-gray-500 text-sm mt-1">
            Current status of your library
          </p>


          <div className="mt-6 space-y-5">

            {/* Available */}
            <div>

              <div className="flex justify-between mb-2">

                <span className="text-sm font-medium text-gray-700">
                  Available Copies
                </span>

                <span className="text-sm font-semibold text-green-600">
                  {availableCopies}
                </span>

              </div>

              <div className="w-full bg-gray-100 rounded-full h-3">

                <div
                  className="bg-green-600 h-3 rounded-full"
                  style={{
                    width:
                      totalCopies > 0
                        ? `${(availableCopies / totalCopies) * 100}%`
                        : "0%",
                  }}
                ></div>

              </div>

            </div>


            {/* Borrowed */}
            <div>

              <div className="flex justify-between mb-2">

                <span className="text-sm font-medium text-gray-700">
                  Borrowed Copies
                </span>

                <span className="text-sm font-semibold text-red-600">
                  {borrowedCopies}
                </span>

              </div>

              <div className="w-full bg-gray-100 rounded-full h-3">

                <div
                  className="bg-red-500 h-3 rounded-full"
                  style={{
                    width:
                      totalCopies > 0
                        ? `${(borrowedCopies / totalCopies) * 100}%`
                        : "0%",
                  }}
                ></div>

              </div>

            </div>

          </div>

        </div>


        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">

          <h2 className="text-xl font-bold text-gray-900">
            Quick Actions
          </h2>

          <p className="text-gray-500 text-sm mt-1">
            Manage your library quickly
          </p>


          <div className="grid grid-cols-2 gap-4 mt-6">

            <button
              onClick={() =>
                window.location.href = "/admin/books"
              }
              className="p-5 rounded-xl bg-green-50 hover:bg-green-100 transition text-left"
            >

              <div className="text-2xl mb-2">
                📚
              </div>

              <h3 className="font-semibold text-gray-900">
                Manage Books
              </h3>

              <p className="text-xs text-gray-500 mt-1">
                Add, edit or delete books
              </p>

            </button>


            <button
              onClick={() =>
                window.location.href = "/admin/members"
              }
              className="p-5 rounded-xl bg-orange-50 hover:bg-orange-100 transition text-left"
            >

              <div className="text-2xl mb-2">
                👥
              </div>

              <h3 className="font-semibold text-gray-900">
                Manage Members
              </h3>

              <p className="text-xs text-gray-500 mt-1">
                View and manage members
              </p>

            </button>

          </div>

        </div>

      </div>


      {/* Recent Books */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mt-8 overflow-hidden">

        <div className="p-6 border-b">

          <h2 className="text-xl font-bold text-gray-900">
            Books in Library
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Recently available books
          </p>

        </div>


        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-gray-50">

              <tr>

                <th className="text-left px-6 py-4 text-sm">
                  Title
                </th>

                <th className="text-left px-6 py-4 text-sm">
                  Author
                </th>

                <th className="text-left px-6 py-4 text-sm">
                  Category
                </th>

                <th className="text-left px-6 py-4 text-sm">
                  Available
                </th>

              </tr>

            </thead>


            <tbody>

              {books.slice(0, 5).map((book) => (

                <tr
                  key={book._id}
                  className="border-t hover:bg-gray-50"
                >

                  <td className="px-6 py-4 font-semibold">
                    {book.title}
                  </td>

                  <td className="px-6 py-4 text-gray-600">
                    {book.author}
                  </td>

                  <td className="px-6 py-4 text-gray-600">
                    {book.category}
                  </td>

                  <td className="px-6 py-4">

                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                      {book.availableQuantity}
                    </span>

                  </td>

                </tr>

              ))}


              {books.length === 0 && !loading && (

                <tr>

                  <td
                    colSpan="4"
                    className="text-center py-8 text-gray-500"
                  >
                    No books found
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}