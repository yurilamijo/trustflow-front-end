"use client";

import { useState, useEffect } from "react";
import { getUserIdFromJwtToken } from "../util/helper";
import { APIPaths, Token } from "../util/constants";

const UserDetails = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: "",
  });

  const userId = getUserIdFromJwtToken();

  useEffect(() => {
    if (userId) {
      fetch(`${APIPaths.userDetails}/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem(Token.accessToken)}`,
          trustflow_session: localStorage.getItem(Token.sessionToken),
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setUser(data);
          setFormData({
            id: data.id,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            dateOfBirth: data.dateOfBirth,
            role: data.role,
          });
        })
        .catch((error) => console.error("Error fetching user:", error));
    }
  }, [userId]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${APIPaths.userUpdate}/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem(Token.accessToken)}`,
        trustflow_session: localStorage.getItem(Token.sessionToken),
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Failed to update user");
      })
      .then((data) => {
        console.log("Updated User:", data);
        alert("User updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating user:", error);
        alert("Failed to update user.");
      });
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h1>User Details</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="block mb-2 text-black">First Name:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block mb-2 text-black">Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block mb-2 text-black">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block mb-2 text-black">Date of Birth:</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 my-2"
        >
          Update User
        </button>
      </form>
    </div>
  );
};

export default UserDetails;
