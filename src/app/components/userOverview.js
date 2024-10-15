"use client";

import { useEffect, useState } from "react";
import { APIPaths, Token } from "../util/constants";

const UserOverview = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const accessToken = localStorage.getItem(Token.accessToken);
      const sessionToken = localStorage.getItem(Token.sessionToken);

      try {
        const response = await fetch(`${APIPaths.allUsers}/USER`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
            trustflow_session: sessionToken,
          },
        });
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    const accessToken = localStorage.getItem(Token.accessToken);
    const sessionToken = localStorage.getItem(Token.sessionToken);

    try {
      const response = await fetch(`${APIPaths.userDelete}/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
          trustflow_session: sessionToken,
        },
      });

      if (response.ok) {
        setUsers(users.filter((user) => user.id !== userId));
      } else {
        console.error("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div>
      <h1>User Overview</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id} className="my-2" style={{ listStyleType: "none" }}>
            <div>
              <p>
                <strong>First name:</strong> {user.firstName}
              </p>
              <p>
                <strong>Last name:</strong> {user.lastName}
              </p>
              <p>
                <strong>Email:</strong>{" "}
                {user.email == null ? "unknown" : user.email}
              </p>
              <button
                className="w-full mx-4 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 my-2"
                onClick={() => handleDelete(user.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserOverview;
