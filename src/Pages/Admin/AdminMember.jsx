
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";

export default function AdminMembers() {
  const [members, setMembers] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    phone: "",
    address: "",
  });

  const [editingUserId, setEditingUserId] = useState(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [showForm, setShowForm] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  // =========================================================
  // GET MEMBERS
  // =========================================================

  const getMembers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/member/all",
        {
          withCredentials: true,
        }
      );

      console.log("MEMBERS:", response.data);

      setMembers(response.data.memberList || []);
    } catch (error) {
      console.log("GET MEMBERS ERROR:", error);

      alert(
        error.response?.data?.message ||
          "Something went wrong while getting members"
      );
    }
  };

  useEffect(() => {
    getMembers();
  }, []);

  // =========================================================
  // HANDLE INPUT
  // =========================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================================================
  // RESET FORM
  // =========================================================

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      role: "user",
      phone: "",
      address: "",
    });

    setEditingUserId(null);
    setShowForm(false);
  };

  // =========================================================
  // CREATE / UPDATE MEMBER
  // =========================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // =====================================================
      // UPDATE MEMBER
      // =====================================================

      if (editingUserId) {
        const response = await axios.post(
          `http://localhost:5000/api/member/edit/${editingUserId}`,
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
          },
          {
            withCredentials: true,
          }
        );

        alert(
          response.data.message || "Member updated successfully"
        );

        resetForm();
        getMembers();

        return;
      }

      // =====================================================
      // CREATE MEMBER
      // =====================================================

      const response = await axios.post(
        "http://localhost:5000/api/user/register",
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,

          // For normal member creation, role should remain user
          role: "user",

          phone: formData.phone,
          address: formData.address,
        },
        {
          withCredentials: true,
        }
      );

      alert(
        response.data.message || "Member created successfully"
      );

      resetForm();
      getMembers();
    } catch (error) {
      console.log("SUBMIT MEMBER ERROR:", error);

      alert(
        error.response?.data?.message ||
          "Something went wrong while saving member"
      );
    }
  };

  // =========================================================
  // EDIT MEMBER
  // =========================================================

  const editMember = (member) => {
    setEditingUserId(member.userId?._id);

    setFormData({
      name: member.name || "",
      email: member.email || "",
      password: "",
      role: member.userId?.role || "user",
      phone: member.phone || "",
      address: member.address || "",
    });

    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================================================
  // DELETE MEMBER
  // =========================================================

  const deleteMember = async (userId) => {
    if (!userId) {
      alert("User ID not found");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this member?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:5000/api/member/del/${userId}`,
        {
          withCredentials: true,
        }
      );

      alert(
        response.data.message || "Member deleted successfully"
      );

      getMembers();
    } catch (error) {
      console.log("DELETE MEMBER ERROR:", error);

      alert(
        error.response?.data?.message ||
          "Something went wrong while deleting member"
      );
    }
  };

  // =========================================================
  // UPGRADE MEMBER
  // =========================================================

  const upgradeMember = async (userId) => {
    if (!userId) {
      alert("User ID not found");
      return;
    }

    const confirmUpgrade = window.confirm(
      "Are you sure you want to upgrade this member to librarian?"
    );

    if (!confirmUpgrade) {
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:5000/api/member/upgrade/${userId}`,
        {},
        {
          withCredentials: true,
        }
      );

      alert(
        response.data.message ||
          "Member upgraded to librarian successfully"
      );

      getMembers();
    } catch (error) {
      console.log("UPGRADE MEMBER ERROR:", error);

      alert(
        error.response?.data?.message ||
          "Something went wrong while upgrading member"
      );
    }
  };

  // =========================================================
  // VIEW MEMBER
  // =========================================================

  const viewMember = (member) => {
    setSelectedMember(member);
  };

  // =========================================================
  // FILTER MEMBERS
  // =========================================================

  const filteredMembers = useMemo(() => {
    return members.filter((member) => {
      const memberRole = member.userId?.role || "user";

      const searchText = search.toLowerCase();

      const matchesSearch =
        member.name?.toLowerCase().includes(searchText) ||
        member.email?.toLowerCase().includes(searchText) ||
        member.phone?.toLowerCase().includes(searchText);

      const matchesRole =
        statusFilter === "All" ||
        memberRole === statusFilter;

      return matchesSearch && matchesRole;
    });
  }, [members, search, statusFilter]);

  // =========================================================
  // STATISTICS
  // =========================================================

  const totalMembers = members.length;

  const normalMembers = members.filter(
    (member) =>
      (member.userId?.role || "user") === "user"
  ).length;

  const librarians = members.filter(
    (member) =>
      member.userId?.role === "librarian"
  ).length;

  // =========================================================
  // UI
  // =========================================================

  return (
    <div className="min-h-screen">

      {/* ================================================= */}
      {/* PAGE HEADER */}
      {/* ================================================= */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">

        <div>
          <p className="text-sm text-green-700 font-semibold mb-1">
            LIBRARY MANAGEMENT
          </p>

          <h1 className="text-3xl font-bold text-gray-900">
            Members
          </h1>

          <p className="text-gray-500 mt-1">
            Manage library members and their accounts.
          </p>
        </div>

        <button
          onClick={() => {
            resetForm();
            setShowForm(true);

            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
          className="bg-green-700 hover:bg-green-800 text-white px-5 py-3 rounded-xl font-semibold transition"
        >
          + Add Member
        </button>

      </div>

      {/* ================================================= */}
      {/* STATISTICS */}
      {/* ================================================= */}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">

        {/* TOTAL */}

        <div className="bg-white border border-gray-200 rounded-2xl p-5">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-gray-500">
                Total Members
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-1">
                {totalMembers}
              </h2>

            </div>

            <div className="w-11 h-11 rounded-xl bg-green-100 flex items-center justify-center text-xl">
              👥
            </div>

          </div>

          <p className="text-xs text-gray-400 mt-3">
            Registered members
          </p>

        </div>

        {/* USERS */}

        <div className="bg-white border border-gray-200 rounded-2xl p-5">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-gray-500">
                Members
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-1">
                {normalMembers}
              </h2>

            </div>

            <div className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center text-xl">
              👤
            </div>

          </div>

          <p className="text-xs text-gray-400 mt-3">
            Standard members
          </p>

        </div>

        {/* LIBRARIANS */}

        <div className="bg-white border border-gray-200 rounded-2xl p-5">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-gray-500">
                Librarians
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-1">
                {librarians}
              </h2>

            </div>

            <div className="w-11 h-11 rounded-xl bg-orange-100 flex items-center justify-center text-xl">
              ⭐
            </div>

          </div>

          <p className="text-xs text-gray-400 mt-3">
            Administrative members
          </p>

        </div>

      </div>

      {/* ================================================= */}
      {/* ADD / EDIT FORM */}
      {/* ================================================= */}

      {showForm && (

        <div className="bg-white border border-gray-200 rounded-2xl mb-8">

          <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">

            <div>

              <h2 className="text-lg font-bold text-gray-900">
                {editingUserId
                  ? "Edit Member"
                  : "Create Member"}
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                {editingUserId
                  ? "Update member information."
                  : "Enter information to create a new member."}
              </p>

            </div>

            <button
              type="button"
              onClick={resetForm}
              className="text-gray-400 hover:text-gray-700 text-xl"
            >
              ✕
            </button>

          </div>

          <form
            onSubmit={handleSubmit}
            className="p-6"
          >

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* NAME */}

              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                />

              </div>

              {/* EMAIL */}

              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                />

              </div>

              {/* PASSWORD */}

              {!editingUserId && (

                <div>

                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>

                  <input
                    type="password"
                    name="password"
                    placeholder="Create password"
                    value={formData.password}
                    onChange={handleChange}
                    required={!editingUserId}
                    minLength={6}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                  />

                </div>

              )}

              {/* ROLE */}

              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Role
                </label>

                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  disabled={!editingUserId}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-white outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                >

                  <option value="user">
                    Member
                  </option>

                  <option value="librarian">
                    Librarian
                  </option>

                </select>

              </div>

              {/* PHONE */}

              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone
                </label>

                <input
                  type="text"
                  name="phone"
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                />

              </div>

              {/* ADDRESS */}

              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>

                <input
                  type="text"
                  name="address"
                  placeholder="Enter address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                />

              </div>

            </div>

            <div className="flex gap-3 mt-6">

              <button
                type="submit"
                className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-xl font-semibold"
              >
                {editingUserId
                  ? "Update Member"
                  : "Create Member"}
              </button>

              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold"
              >
                Cancel
              </button>

            </div>

          </form>

        </div>

      )}

      {/* ================================================= */}
      {/* ALL MEMBERS */}
      {/* ================================================= */}

      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">

        {/* HEADER */}

        <div className="p-6 border-b border-gray-100">

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

            <div>

              <h2 className="text-xl font-bold text-gray-900">
                All Members
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Showing {filteredMembers.length} of{" "}
                {members.length} members
              </p>

            </div>

            {/* SEARCH */}

            <div className="relative w-full lg:w-96">

              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                🔍
              </span>

              <input
                type="text"
                placeholder="Search name, email or phone..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border border-gray-200 rounded-xl pl-11 pr-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
              />

            </div>

          </div>

          {/* FILTER */}

          <div className="flex gap-3 mt-5">

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
              className="border border-gray-200 rounded-xl px-4 py-3 bg-white text-gray-700 outline-none focus:border-green-600"
            >

              <option value="All">
                All Roles
              </option>

              <option value="user">
                Members
              </option>

              <option value="librarian">
                Librarians
              </option>

            </select>

            {(search || statusFilter !== "All") && (

              <button
                onClick={() => {
                  setSearch("");
                  setStatusFilter("All");
                }}
                className="px-4 py-3 text-sm font-semibold text-gray-600 hover:text-green-700"
              >
                Clear Filters
              </button>

            )}

          </div>

        </div>

        {/* ================================================= */}
        {/* TABLE */}
        {/* ================================================= */}

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-gray-50 border-b border-gray-100">

              <tr>

                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Member
                </th>

                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Contact
                </th>

                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Address
                </th>

                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Role
                </th>

                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Membership
                </th>

                <th className="text-right px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredMembers.map((member) => {

                const role =
                  member.userId?.role || "user";

                const isLibrarian =
                  role === "librarian";

                return (

                  <tr
                    key={
                      member.userId?._id ||
                      member._id
                    }
                    className="border-b border-gray-100 hover:bg-gray-50 transition"
                  >

                    {/* MEMBER */}

                    <td className="px-6 py-5">

                      <div className="flex items-center gap-3">

                        <div className="w-11 h-11 rounded-xl bg-green-100 flex items-center justify-center text-green-700 font-bold text-lg">
                          {(member.name || "U")
                            .charAt(0)
                            .toUpperCase()}
                        </div>

                        <div>

                          <p className="font-semibold text-gray-900">
                            {member.name}
                          </p>

                          <p className="text-xs text-gray-400 mt-1">
                            ID:{" "}
                            {member.userId?._id
                              ? String(
                                  member.userId._id
                                ).slice(-8)
                              : "N/A"}
                          </p>

                        </div>

                      </div>

                    </td>

                    {/* CONTACT */}

                    <td className="px-6 py-5">

                      <p className="text-sm text-gray-700">
                        {member.email}
                      </p>

                      <p className="text-xs text-gray-400 mt-1">
                        {member.phone ||
                          "No phone"}
                      </p>

                    </td>

                    {/* ADDRESS */}

                    <td className="px-6 py-5">

                      <p className="text-sm text-gray-600 max-w-xs">
                        {member.address ||
                          "No address"}
                      </p>

                    </td>

                    {/* ROLE */}

                    <td className="px-6 py-5">

                      {isLibrarian ? (

                        <span className="inline-flex items-center gap-1.5 bg-purple-50 text-purple-700 px-3 py-1.5 rounded-full text-xs font-semibold">
                          ⭐ Librarian
                        </span>

                      ) : (

                        <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-xs font-semibold">
                          👤 Member
                        </span>

                      )}

                    </td>

                    {/* MEMBERSHIP DATE */}

                    <td className="px-6 py-5 text-sm text-gray-600">

                      {member.membershipDate
                        ? new Date(
                            member.membershipDate
                          ).toLocaleDateString()
                        : "N/A"}

                    </td>

                    {/* ACTIONS */}

                    <td className="px-6 py-5">

                      <div className="flex justify-end gap-2">

                        {/* VIEW */}

                        <button
                          onClick={() =>
                            viewMember(member)
                          }
                          className="px-3 py-2 rounded-lg text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition"
                        >
                          View
                        </button>

                        {/* EDIT */}

                        <button
                          onClick={() =>
                            editMember(member)
                          }
                          className="px-3 py-2 rounded-lg text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 transition"
                        >
                          Edit
                        </button>

                        {/* UPGRADE */}

                        {!isLibrarian && (

                          <button
                            onClick={() =>
                              upgradeMember(
                                member.userId?._id
                              )
                            }
                            className="px-3 py-2 rounded-lg text-sm font-medium text-purple-700 bg-purple-50 hover:bg-purple-100 transition"
                          >
                            Upgrade
                          </button>

                        )}

                        {/* DELETE */}

                        <button
                          onClick={() =>
                            deleteMember(
                              member.userId?._id
                            )
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

              {/* EMPTY */}

              {filteredMembers.length === 0 && (

                <tr>

                  <td
                    colSpan="6"
                    className="px-6 py-16 text-center"
                  >

                    <div className="text-4xl mb-3">
                      👥
                    </div>

                    <h3 className="font-semibold text-gray-800">
                      No members found
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      Try changing your search or
                      filter.
                    </p>

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* ================================================= */}
      {/* MEMBER DETAILS MODAL */}
      {/* ================================================= */}

      {selectedMember && (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">

          <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl overflow-hidden">

            {/* MODAL HEADER */}

            <div className="bg-green-700 px-6 py-6 text-white">

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-4">

                  <div className="w-14 h-14 rounded-full bg-white text-green-700 flex items-center justify-center text-xl font-bold">

                    {(selectedMember.name || "U")
                      .charAt(0)
                      .toUpperCase()}

                  </div>

                  <div>

                    <h2 className="text-xl font-bold">
                      {selectedMember.name}
                    </h2>

                    <p className="text-green-100 text-sm">
                      {selectedMember.email}
                    </p>

                  </div>

                </div>

                <button
                  onClick={() =>
                    setSelectedMember(null)
                  }
                  className="text-white/80 hover:text-white text-xl"
                >
                  ✕
                </button>

              </div>

            </div>

            {/* DETAILS */}

            <div className="p-6 space-y-5">

              {/* NAME */}

              <div>

                <p className="text-xs uppercase text-gray-400 font-semibold">
                  Full Name
                </p>

                <p className="text-gray-900 font-medium mt-1">
                  {selectedMember.name ||
                    "N/A"}
                </p>

              </div>

              {/* EMAIL */}

              <div>

                <p className="text-xs uppercase text-gray-400 font-semibold">
                  Email
                </p>

                <p className="text-gray-900 font-medium mt-1">
                  {selectedMember.email ||
                    "N/A"}
                </p>

              </div>

              {/* PHONE */}

              <div>

                <p className="text-xs uppercase text-gray-400 font-semibold">
                  Phone
                </p>

                <p className="text-gray-900 font-medium mt-1">
                  {selectedMember.phone ||
                    "N/A"}
                </p>

              </div>

              {/* ADDRESS */}

              <div>

                <p className="text-xs uppercase text-gray-400 font-semibold">
                  Address
                </p>

                <p className="text-gray-900 font-medium mt-1">
                  {selectedMember.address ||
                    "N/A"}
                </p>

              </div>

              {/* ROLE + DATE */}

              <div className="grid grid-cols-2 gap-5">

                <div>

                  <p className="text-xs uppercase text-gray-400 font-semibold">
                    Role
                  </p>

                  <p className="text-gray-900 font-medium mt-1 capitalize">
                    {selectedMember?.userId
                      ?.role || "user"}
                  </p>

                </div>

                <div>

                  <p className="text-xs uppercase text-gray-400 font-semibold">
                    Membership Date
                  </p>

                  <p className="text-gray-900 font-medium mt-1">

                    {selectedMember.membershipDate
                      ? new Date(
                          selectedMember.membershipDate
                        ).toLocaleDateString()
                      : "N/A"}

                  </p>

                </div>

              </div>

              {/* USER ID */}

              <div>

                <p className="text-xs uppercase text-gray-400 font-semibold">
                  User ID
                </p>

                <p className="text-xs text-gray-600 mt-1 break-all">
                  {selectedMember?.userId?._id ||
                    "N/A"}
                </p>

              </div>

            </div>

            {/* MODAL FOOTER */}

            <div className="px-6 py-4 bg-gray-50 border-t flex justify-end">

              <button
                onClick={() =>
                  setSelectedMember(null)
                }
                className="bg-gray-900 hover:bg-black text-white px-5 py-2.5 rounded-lg font-medium"
              >
                Close
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}