import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminBooks() {
  const [books, setBooks] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    ISBN: "",
    quantity: "",
    publicationYear: "",
  });

  const [editingISBN, setEditingISBN] = useState(null);

  // Search and filters
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [availabilityFilter, setAvailabilityFilter] =
    useState("All");

  // Keep categories separately so they don't disappear
  // after applying a backend filter.
  const [categories, setCategories] = useState(["All"]);

  // ================= GET ALL BOOKS =================

  const getBooks = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/book/all",
        {
          withCredentials: true,
        }
      );

      const bookList = response.data.bookList || [];

      setBooks(bookList);

      // Create category list from all books
      const uniqueCategories = [
        ...new Set(
          bookList
            .map((book) => book.category)
            .filter(Boolean)
        ),
      ];

      setCategories(["All", ...uniqueCategories]);
    } catch (error) {
      console.log("GET BOOK ERROR:", error);
    }
  };

  // ================= INPUT =================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ================= ADD / UPDATE =================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // ================= UPDATE =================

      if (editingISBN) {
        const response = await axios.put(
          `http://localhost:5000/api/book/edit/${editingISBN}`,
          formData,
          {
            withCredentials: true,
          }
        );

        if (!response.data.status) {
          alert(response.data.message);
          return;
        }

        alert("Book updated successfully");
      }

      // ================= ADD =================

      else {
        const response = await axios.post(
          "http://localhost:5000/api/book/create",
          formData,
          {
            withCredentials: true,
          }
        );

        if (!response.data.status) {
          alert(response.data.message);
          return;
        }

        alert("Book added successfully");
      }

      resetForm();

      // After adding/updating, get all books again
      getBooks();

    } catch (error) {
      console.log("ADD/UPDATE ERROR:", error);

      alert(
        error.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  // ================= DELETE =================

  const deleteBook = async (ISBN) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this book?"
    );

    if (!confirmDelete) return;

    try {
      const response = await axios.delete(
        `http://localhost:5000/api/book/delete/${ISBN}`,
        {
          withCredentials: true,
        }
      );

      if (!response.data.status) {
        alert(response.data.message);
        return;
      }

      alert("Book deleted successfully");

      getBooks();

    } catch (error) {
      console.log("DELETE BOOK ERROR:", error);

      alert(
        error.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  // ================= EDIT =================

  const editBook = (book) => {
    setEditingISBN(book.ISBN);

    setFormData({
      title: book.title || "",
      author: book.author || "",
      category: book.category || "",
      ISBN: book.ISBN || "",
      quantity: book.quantity || "",
      publicationYear: book.publicationYear || "",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ================= RESET =================

  const resetForm = () => {
    setEditingISBN(null);

    setFormData({
      title: "",
      author: "",
      category: "",
      ISBN: "",
      quantity: "",
      publicationYear: "",
    });
  };

  // ================= FILTER BOOKS =================

  const filterBooks = async () => {
    try {
      const params = {};

      // Search
      if (search.trim()) {
        params.search = search.trim();
      }

      // Category
      if (categoryFilter !== "All") {
        params.category = categoryFilter;
      }

      // Availability
      if (availabilityFilter !== "All") {
        params.available =
          availabilityFilter === "Available"
            ? "true"
            : "false";
      }

      console.log("FILTER PARAMS:", params);

      const response = await axios.get(
        "http://localhost:5000/api/book/filter",
        {
          params,
          withCredentials: true,
        }
      );

      console.log("FILTERED BOOKS:", response.data);

      setBooks(response.data.bookList || []);

    } catch (error) {
      console.log("FILTER BOOK ERROR:", error);

      alert(
        error.response?.data?.message ||
          "Something went wrong while filtering books"
      );
    }
  };

  // ================= APPLY FILTER =================

  const applyFilters = () => {
    const hasFilter =
      search.trim() !== "" ||
      categoryFilter !== "All" ||
      availabilityFilter !== "All";

    if (hasFilter) {
      filterBooks();
    } else {
      getBooks();
    }
  };

  // ================= CLEAR FILTER =================

  const clearFilters = () => {
    setSearch("");
    setCategoryFilter("All");
    setAvailabilityFilter("All");

    // Get all books again
    getBooks();
  };

  // ================= LOAD BOOKS =================

  useEffect(() => {
    getBooks();
  }, []);

  // ================= FILTER STATUS =================

  const hasFilters =
    search.trim() !== "" ||
    categoryFilter !== "All" ||
    availabilityFilter !== "All";

  // ================= STATISTICS =================

  const totalBookTitles = books.length;

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

  // Backend already filtered books.
  const filteredBooks = books;

  // ================= UI =================

  return (
    <div className="min-h-screen">

      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">

        <div>
          <p className="text-sm text-green-700 font-semibold mb-1">
            LIBRARY MANAGEMENT
          </p>

          <h1 className="text-3xl font-bold text-gray-900">
            Books
          </h1>

          <p className="text-gray-500 mt-1">
            Manage your library collection and inventory.
          </p>
        </div>

        <button
          onClick={() => {
            resetForm();

            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
          className="bg-green-700 hover:bg-green-800 text-white px-5 py-3 rounded-xl font-semibold transition shadow-sm"
        >
          + Add New Book
        </button>

      </div>

      {/* ================================================= */}
      {/* STATISTICS */}
      {/* ================================================= */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

        {/* BOOK TITLES */}

        <div className="bg-white border border-gray-200 rounded-2xl p-5">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-gray-500">
                Book Titles
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-1">
                {totalBookTitles}
              </h2>

            </div>

            <div className="w-11 h-11 rounded-xl bg-green-100 flex items-center justify-center text-xl">
              📚
            </div>

          </div>

          <p className="text-xs text-gray-400 mt-3">
            Books in current result
          </p>

        </div>

        {/* TOTAL COPIES */}

        <div className="bg-white border border-gray-200 rounded-2xl p-5">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-gray-500">
                Total Copies
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-1">
                {totalCopies}
              </h2>

            </div>

            <div className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center text-xl">
              📖
            </div>

          </div>

          <p className="text-xs text-gray-400 mt-3">
            Physical copies
          </p>

        </div>

        {/* AVAILABLE */}

        <div className="bg-white border border-gray-200 rounded-2xl p-5">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-gray-500">
                Available
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-1">
                {availableCopies}
              </h2>

            </div>

            <div className="w-11 h-11 rounded-xl bg-emerald-100 flex items-center justify-center text-xl">
              ✓
            </div>

          </div>

          <p className="text-xs text-gray-400 mt-3">
            Ready to borrow
          </p>

        </div>

        {/* BORROWED */}

        <div className="bg-white border border-gray-200 rounded-2xl p-5">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-gray-500">
                Borrowed
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-1">
                {borrowedCopies}
              </h2>

            </div>

            <div className="w-11 h-11 rounded-xl bg-orange-100 flex items-center justify-center text-xl">
              ↗
            </div>

          </div>

          <p className="text-xs text-gray-400 mt-3">
            Currently borrowed
          </p>

        </div>

      </div>

      {/* ================================================= */}
      {/* ADD / EDIT BOOK FORM */}
      {/* ================================================= */}

      <div className="bg-white border border-gray-200 rounded-2xl mb-8">

        {/* FORM HEADER */}

        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">

          <div>

            <h2 className="text-lg font-bold text-gray-900">
              {editingISBN
                ? "Edit Book"
                : "Add New Book"}
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              {editingISBN
                ? "Update the information of this book."
                : "Enter the details to add a new book."}
            </p>

          </div>

          {editingISBN && (
            <span className="text-xs font-semibold bg-blue-50 text-blue-700 px-3 py-2 rounded-lg">
              Editing Book
            </span>
          )}

        </div>

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="p-6"
        >

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

            {/* TITLE */}

            <div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Book Title
              </label>

              <input
                type="text"
                name="title"
                placeholder="Enter book title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 transition"
              />

            </div>

            {/* AUTHOR */}

            <div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Author
              </label>

              <input
                type="text"
                name="author"
                placeholder="Enter author name"
                value={formData.author}
                onChange={handleChange}
                required
                className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 transition"
              />

            </div>

            {/* CATEGORY */}

            <div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>

              <input
                type="text"
                name="category"
                placeholder="e.g. Programming"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 transition"
              />

            </div>

            {/* ISBN */}

            <div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                ISBN
              </label>

              <input
                type="text"
                name="ISBN"
                placeholder="Enter ISBN"
                value={formData.ISBN}
                onChange={handleChange}
                disabled={!!editingISBN}
                required
                className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 transition disabled:bg-gray-100 disabled:text-gray-500"
              />

            </div>

            {/* QUANTITY */}

            <div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>

              <input
                type="number"
                name="quantity"
                placeholder="Enter quantity"
                value={formData.quantity}
                onChange={handleChange}
                min="1"
                required
                className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 transition"
              />

            </div>

            {/* PUBLICATION YEAR */}

            <div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Publication Year
              </label>

              <input
                type="number"
                name="publicationYear"
                placeholder="e.g. 2024"
                value={formData.publicationYear}
                onChange={handleChange}
                required
                className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 transition"
              />

            </div>

          </div>

          {/* FORM BUTTONS */}

          <div className="flex gap-3 mt-6">

            <button
              type="submit"
              className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-xl font-semibold transition"
            >
              {editingISBN
                ? "Update Book"
                : "Add Book"}
            </button>

            {editingISBN && (

              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold transition"
              >
                Cancel
              </button>

            )}

          </div>

        </form>

      </div>

      {/* ================================================= */}
      {/* ALL BOOKS */}
      {/* ================================================= */}

      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">

        {/* ALL BOOKS HEADER */}

        <div className="p-6 border-b border-gray-100">

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

            <div>

              <h2 className="text-xl font-bold text-gray-900">
                All Books
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Showing {filteredBooks.length} books
              </p>

            </div>

            {/* SEARCH */}

            <div className="relative w-full lg:w-96">

              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                🔍
              </span>

              <input
                type="text"
                placeholder="Search title, author or ISBN..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    applyFilters();
                  }
                }}
                className="w-full border border-gray-200 rounded-xl pl-11 pr-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 transition"
              />

            </div>

          </div>

          {/* FILTERS */}

          <div className="flex flex-col sm:flex-row gap-3 mt-5">

            {/* CATEGORY FILTER */}

            <select
              value={categoryFilter}
              onChange={(e) =>
                setCategoryFilter(e.target.value)
              }
              className="border border-gray-200 rounded-xl px-4 py-3 bg-white text-gray-700 outline-none focus:border-green-600"
            >

              {categories.map((category) => (

                <option
                  key={category}
                  value={category}
                >
                  {category === "All"
                    ? "All Categories"
                    : category}
                </option>

              ))}

            </select>

            {/* AVAILABILITY FILTER */}

            <select
              value={availabilityFilter}
              onChange={(e) =>
                setAvailabilityFilter(e.target.value)
              }
              className="border border-gray-200 rounded-xl px-4 py-3 bg-white text-gray-700 outline-none focus:border-green-600"
            >

              <option value="All">
                All Availability
              </option>

              <option value="Available">
                Available
              </option>

              <option value="Out of Stock">
                Out of Stock
              </option>

            </select>

            {/* APPLY */}

            <button
              onClick={applyFilters}
              className="px-5 py-3 rounded-xl bg-green-700 hover:bg-green-800 text-white text-sm font-semibold transition"
            >
              Apply Filters
            </button>

            {/* CLEAR */}

            {hasFilters && (

              <button
                onClick={clearFilters}
                className="px-4 py-3 text-sm font-semibold text-gray-600 hover:text-green-700 transition"
              >
                Clear Filters
              </button>

            )}

          </div>

          {hasFilters && (
            <p className="text-xs text-green-600 font-medium mt-4">
              Backend filters are active
            </p>
          )}

        </div>

        {/* ================================================= */}
        {/* TABLE */}
        {/* ================================================= */}

        <div className="overflow-x-auto">

          <table className="w-full">

            {/* TABLE HEAD */}

            <thead className="bg-gray-50 border-b border-gray-100">

              <tr>

                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Book
                </th>

                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Author
                </th>

                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Category
                </th>

                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  ISBN
                </th>

                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Stock
                </th>

                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Status
                </th>

                <th className="text-right px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Actions
                </th>

              </tr>

            </thead>

            {/* TABLE BODY */}

            <tbody>

              {filteredBooks.map((book) => {

                const isAvailable =
                  Number(book.availableQuantity) > 0;

                return (

                  <tr
                    key={book._id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition"
                  >

                    {/* BOOK */}

                    <td className="px-6 py-5">

                      <div className="flex items-center gap-3">

                        <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center text-lg">
                          📚
                        </div>

                        <div>

                          <p className="font-semibold text-gray-900">
                            {book.title}
                          </p>

                          <p className="text-xs text-gray-400 mt-1">
                            Published {book.publicationYear}
                          </p>

                        </div>

                      </div>

                    </td>

                    {/* AUTHOR */}

                    <td className="px-6 py-5 text-gray-600">
                      {book.author}
                    </td>

                    {/* CATEGORY */}

                    <td className="px-6 py-5">

                      <span className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg text-sm">
                        {book.category}
                      </span>

                    </td>

                    {/* ISBN */}

                    <td className="px-6 py-5 text-gray-500 text-sm">
                      {book.ISBN}
                    </td>

                    {/* STOCK */}

                    <td className="px-6 py-5">

                      <div>

                        <p className="font-semibold text-gray-800">

                          {book.availableQuantity}

                          <span className="text-gray-400 font-normal">
                            {" "}
                            / {book.quantity}
                          </span>

                        </p>

                        <p className="text-xs text-gray-400">
                          available
                        </p>

                      </div>

                    </td>

                    {/* STATUS */}

                    <td className="px-6 py-5">

                      {isAvailable ? (

                        <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-xs font-semibold">

                          <span className="w-1.5 h-1.5 bg-green-600 rounded-full" />

                          Available

                        </span>

                      ) : (

                        <span className="inline-flex items-center gap-1.5 bg-red-50 text-red-700 px-3 py-1.5 rounded-full text-xs font-semibold">

                          <span className="w-1.5 h-1.5 bg-red-600 rounded-full" />

                          Out of Stock

                        </span>

                      )}

                    </td>

                    {/* ACTIONS */}

                    <td className="px-6 py-5">

                      <div className="flex justify-end gap-2">

                        <button
                          onClick={() =>
                            editBook(book)
                          }
                          className="px-3 py-2 rounded-lg text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 transition"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            deleteBook(book.ISBN)
                          }
                          className="px-3 py-2 rounded-lg text-sm font-medium text-red-700 bg-red-50 hover:bg-red-100 transition"
                        >
                          Delete
                        </button>

                      </div>

                    </td>

                  </tr>

                );
              })}

              {/* EMPTY STATE */}

              {filteredBooks.length === 0 && (

                <tr>

                  <td
                    colSpan="7"
                    className="px-6 py-16 text-center"
                  >

                    <div className="text-4xl mb-3">
                      📚
                    </div>

                    <h3 className="font-semibold text-gray-800">
                      No books found
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      Try changing your search or filters.
                    </p>

                    {hasFilters && (
                      <button
                        onClick={clearFilters}
                        className="mt-4 bg-black hover:bg-gray-800 text-white px-5 py-2.5 rounded-lg text-sm font-semibold"
                      >
                        Clear Filters
                      </button>
                    )}

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