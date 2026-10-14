import React, { useState } from 'react';
import Badge from '../components/Common/Badge';
import Modal from '../components/Common/Modal';
import {
  FiUserPlus,
  FiShield,
  FiEdit,
  FiTrash2
} from 'react-icons/fi';

const Users = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [users, setUsers] = useState([
    { id: 1, name: 'Dr. Aris Thorne', email: 'aris.thorne@factory.ai', role: 'System Admin', permissions: 'Full Access (Read/Write/Admin)', status: 'Active', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80' },
    { id: 2, name: 'Elena Rostova', email: 'elena.r@factory.ai', role: 'Plant Engineer', permissions: 'Camera & Calibration Controls', status: 'Active', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&q=80' },
    { id: 3, name: 'Marcus Vance', email: 'marcus.v@factory.ai', role: 'Operations Manager', permissions: 'Reports & Analytics View', status: 'Active', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80' },
    { id: 4, name: 'Sarah Jenkins', email: 'sarah.j@factory.ai', role: 'Line Operator', permissions: 'Alert Acknowledge Only', status: 'Active', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80' },
    { id: 5, name: 'David Chen', email: 'david.c@factory.ai', role: 'Quality Specialist', permissions: 'Inspection Stream View', status: 'Inactive', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80' }
  ]);

  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'Line Operator' });

  const handleAddUser = (e) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email) return;
    setUsers([
      ...users,
      {
        id: Date.now(),
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        permissions: newUser.role === 'System Admin' ? 'Full Access' : 'Standard Operations',
        status: 'Active',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
      }
    ]);
    setNewUser({ name: '', email: '', role: 'Line Operator' });
    setShowAddModal(false);
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter(u => u.id !== id));
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            User Roles & Access Permissions
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Role-Based Access Control (RBAC) for plant supervisors and operators
          </p>
        </div>

        <button onClick={() => setShowAddModal(true)} className="btn btn-primary btn-sm">
          <FiUserPlus /> Add New User
        </button>
      </div>

      {/* Users Data Grid */}
      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Email Address</th>
              <th>Assigned Role</th>
              <th>Access Permissions</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <img
                      src={u.avatar}
                      alt={u.name}
                      style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <span style={{ fontWeight: 600 }}>{u.name}</span>
                  </div>
                </td>
                <td style={{ color: 'var(--text-secondary)' }}>{u.email}</td>
                <td>
                  <Badge variant={u.role === 'System Admin' ? 'purple' : u.role === 'Plant Engineer' ? 'info' : 'secondary'}>
                    <FiShield /> {u.role}
                  </Badge>
                </td>
                <td style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{u.permissions}</td>
                <td>
                  <span
                    style={{
                      padding: '0.2rem 0.5rem',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.725rem',
                      fontWeight: 600,
                      backgroundColor: u.status === 'Active' ? 'var(--success-light)' : 'var(--bg-hover)',
                      color: u.status === 'Active' ? '#047857' : 'var(--text-muted)',
                    }}
                  >
                    {u.status}
                  </span>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <div style={{ display: 'flex', gap: '0.35rem', justifyContent: 'flex-end' }}>
                    <button className="btn btn-outline btn-sm" style={{ padding: '0.25rem 0.5rem' }}>
                      <FiEdit />
                    </button>
                    <button onClick={() => handleDeleteUser(u.id)} className="btn btn-outline btn-sm" style={{ padding: '0.25rem 0.5rem', color: '#ef4444' }}>
                      <FiTrash2 />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add User Modal */}
      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Register New User Account">
        <form onSubmit={handleAddUser} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
              Full Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g. John Doe"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              style={{
                width: '100%',
                padding: '0.5rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-primary)',
                color: 'var(--text-primary)',
              }}
            />
          </div>
          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
              Email Address
            </label>
            <input
              type="email"
              required
              placeholder="e.g. john.d@factory.ai"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              style={{
                width: '100%',
                padding: '0.5rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-primary)',
                color: 'var(--text-primary)',
              }}
            />
          </div>
          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
              Role Assignment
            </label>
            <select
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              style={{
                width: '100%',
                padding: '0.5rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-primary)',
                color: 'var(--text-primary)',
              }}
            >
              <option value="Line Operator">Line Operator</option>
              <option value="Plant Engineer">Plant Engineer</option>
              <option value="Operations Manager">Operations Manager</option>
              <option value="System Admin">System Admin</option>
            </select>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '1rem' }}>
            <button type="button" onClick={() => setShowAddModal(false)} className="btn btn-outline btn-sm">Cancel</button>
            <button type="submit" className="btn btn-primary btn-sm">Create Account</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Users;
