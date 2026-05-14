import React, { useState, useEffect } from 'react';
import './UserDetail.css';

function UserDetail() {
    const [userId, setUserId] = useState(1);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        // 1. Validate userId (Chỉ từ 1-10)
        if (userId < 1 || userId > 10 || isNaN(userId)) {
            setUser(null);
            setError("ID không hợp lệ! Vui lòng nhập từ 1 đến 10.");
            return;
        }

        const fetchUser = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
                
                if (!response.ok) {
                    throw new Error("User not found");
                }

                const data = await response.json();
                setUser(data);
            } catch (err) {
                setUser(null);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [userId]); // Dependency là [userId] để fetch lại khi ID đổi

    return (
        <div className="user-detail-container">
            <h2>Tìm kiếm User</h2>
            
            <div className="input-group">
                <label>Nhập User ID (1-10): </label>
                <input 
                    type="number" 
                    className="id-input"
                    value={userId}
                    onChange={(e) => setUserId(parseInt(e.target.value))}
                />
            </div>

            {/* Conditional Rendering: Hiển thị theo trạng thái */}
            {loading && <p>Đang tìm...</p>}

            {error && <p className="error-text">{error}</p>}

            {!loading && !error && user && (
                <div className="user-info-card">
                    <h3>{user.name}</h3>
                    <p><strong>Phone:</strong> {user.phone}</p>
                    <p><strong>Website:</strong> {user.website}</p>
                </div>
            )}
        </div>
    );
}

export default UserDetail;