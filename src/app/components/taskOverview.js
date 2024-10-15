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
          method: "get",
          headers: {
            "Content-Type": "application/json",
            "trustflow_session": sessionToken,
            "Authorization": `Bearer ${accessToken}`,
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
          <li key={index}>
            <h2>{task.name}</h2>
            <p>{task.description}</p>
            <p>
              <strong>Priority:</strong> {task.priority}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskOverview;
