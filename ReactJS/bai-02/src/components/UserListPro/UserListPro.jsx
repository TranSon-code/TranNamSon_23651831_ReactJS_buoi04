import React, { useState, useEffect } from 'react';
import './UserListPro.css';

function UserListPro() {
  // 1. Khai báo 3 state theo yêu cầu
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      // Bắt đầu fetch thì đảm bảo loading là true và reset error
      setLoading(true);
      setError(null);

      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        
        // Kiểm tra nếu response không thành công (vd: lỗi 404, 500)
        if (!response.ok) {
          throw new Error('Phản hồi từ server không ổn định (Status: ' + response.status + ')');
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        // Lưu thông báo lỗi vào state error
        setError(err.message);
      } finally {
        // Dù thành công hay lỗi thì cũng tắt loading
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // 2. Xử lý logic hiển thị (Ưu tiên Error -> Loading -> Data)
  
  if (error) {
    return (
      <div className="container">
        <div className="error-box">
          <strong>Lỗi rồi Sơn ơi:</strong> {error}
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container">
        <div className="loading-spinner">Đang tải dữ liệu, chờ xíu nhé...</div>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>Danh sách Users (Bài 2)</h2>
      <div style={{ border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }}>
        {data.map((user) => (
          <div key={user.id} className="user-item">
            <strong>{user.name}</strong> — <span>{user.email}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserListPro;