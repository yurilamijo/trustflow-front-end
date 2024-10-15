"use client";

import { useEffect, useState } from "react";
import { APIPaths, Token } from "../util/constants";

const TaskOverview = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const accessToken = localStorage.getItem(Token.accessToken);
      const sessionToken = localStorage.getItem(Token.sessionToken);

      try {
        const response = await fetch(APIPaths.allTasks, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
            trustflow_session: sessionToken,
          },
        });
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div>
      <h1>Task Overview</h1>
      <ul>
        {tasks.map((task, index) => (
          <li className="my-2" key={index} style={{ listStyleType: "none" }}>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <label style={{ fontWeight: "bold" }}>Name:</label>
              <h2 style={{ margin: 0 }}>{task.name}</h2>
            </div>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <label style={{ fontWeight: "bold" }}>Description:</label>
              <p style={{ margin: 0 }}>{task.description}</p>
            </div>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <label style={{ fontWeight: "bold" }}>Priority:</label>
              <p style={{ margin: 0 }}>{task.priority}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskOverview;
