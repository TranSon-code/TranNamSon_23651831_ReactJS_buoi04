import React, { useState, useEffect } from 'react';
import './UserList.css';

function UserList() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Gọi API trong useEffect
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        // Chuyển đổi dữ liệu sang JSON
        const data = await response.json();
        
        // Lưu dữ liệu vào state
        setUsers(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Lỗi khi fetch dữ liệu:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); // Dependency [] đảm bảo chỉ fetch 1 lần

  if (isLoading) {
    return <div className="loading">Đang tải danh sách người dùng...</div>;
  }

  return (
    <div className="user-container">
      <h2>Danh sách Users (Fetch API)</h2>
      {users.map((user) => (
        <div key={user.id} className="user-card">
          <h3>{user.name}</h3>
          <p>Email: {user.email}</p>
        </div>
      ))}
    </div>
  );
}

export default UserList;