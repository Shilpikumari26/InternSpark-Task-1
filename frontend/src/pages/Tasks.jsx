import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import "../styles/tasks.css";

export default function Tasks() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [priority, setPriority] = useState("Low");

  // 🔐 Protected
  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/login");
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const res = await api.get("/tasks");
    setTasks(res.data);
  };

  const addTask = async () => {
    if (!title || !time) return alert("Fill all fields");

    const res = await api.post("/tasks", { title, time, priority });
    setTasks([res.data, ...tasks]);
    setTitle("");
    setTime("");
  };

  const toggleTask = async (id) => {
    await api.put(`/tasks/${id}`);
    loadTasks();
  };

  const deleteTask = async (id) => {
    await api.delete(`/tasks/${id}`);
    loadTasks();
  };

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="tasks-page">
      <div className="tasks-header">
        <h2>My Tasks</h2>
        <button className="logout-btn" onClick={logout}>Logout</button>
      </div>

      <div className="task-input">
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Task" />
        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <button onClick={addTask}>Add</button>
      </div>

      <ul className="task-list">
        {tasks.map((t) => (
          <li key={t._id} className={`task ${t.priority.toLowerCase()} ${t.completed ? "done" : ""}`}>
            <input type="checkbox" checked={t.completed} onChange={() => toggleTask(t._id)} />
            <div>
              <strong>{t.title}</strong>
              <small>{t.time}</small>
            </div>
            <span className="badge">{t.priority}</span>
            <button onClick={() => deleteTask(t._id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
