import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [players, setPlayers] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPlayer, setNewPlayer] = useState({
    name: '',
    role: '',
    batting_average: '',
    bowling_average: '',
    matches_played: '',
    age: ''
  });
  const [editingPlayer, setEditingPlayer] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);

  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/players');
      const data = await response.json();
      setPlayers(data);
    } catch (error) {
      console.error('Error fetching players:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPlayer(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5001/api/players', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newPlayer.name,
          role: newPlayer.role,
          batting_average: parseFloat(newPlayer.batting_average) || 0,
          bowling_average: parseFloat(newPlayer.bowling_average) || 0,
          matches_played: parseInt(newPlayer.matches_played),
          age: parseInt(newPlayer.age)
        })
      });
      if (response.ok) {
        fetchPlayers();
        setShowAddForm(false);
        setNewPlayer({
          name: '',
          role: '',
          batting_average: '',
          bowling_average: '',
          matches_played: '',
          age: ''
        });
      }
    } catch (error) {
      console.error('Error adding player:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5001/api/players/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        fetchPlayers();
      }
    } catch (error) {
      console.error('Error deleting player:', error);
    }
  };

  const handleEdit = (player) => {
    setEditingPlayer({
      ...player,
      batting_average: player.batting_average || '',
      bowling_average: player.bowling_average || ''
    });
    setShowEditForm(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5001/api/players/${editingPlayer._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: editingPlayer.name,
          role: editingPlayer.role,
          batting_average: parseFloat(editingPlayer.batting_average) || 0,
          bowling_average: parseFloat(editingPlayer.bowling_average) || 0,
          matches_played: parseInt(editingPlayer.matches_played),
          age: parseInt(editingPlayer.age)
        })
      });
      if (response.ok) {
        fetchPlayers();
        setShowEditForm(false);
        setEditingPlayer(null);
      }
    } catch (error) {
      console.error('Error updating player:', error);
    }
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditingPlayer(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="App">
      <h1>Cricket Team Management</h1>
      <button className="add-button" onClick={() => setShowAddForm(true)}>
        + Add Player
      </button>

      {showAddForm && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Add New Player</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={newPlayer.name}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="role"
                placeholder="Role"
                value={newPlayer.role}
                onChange={handleInputChange}
                required
              />
              <input
                type="number"
                name="batting_average"
                placeholder="Batting Average"
                value={newPlayer.batting_average}
                onChange={handleInputChange}
              />
              <input
                type="number"
                name="bowling_average"
                placeholder="Bowling Average"
                value={newPlayer.bowling_average}
                onChange={handleInputChange}
              />
              <input
                type="number"
                name="matches_played"
                placeholder="Matches Played"
                value={newPlayer.matches_played}
                onChange={handleInputChange}
                required
              />
              <input
                type="number"
                name="age"
                placeholder="Age"
                value={newPlayer.age}
                onChange={handleInputChange}
                required
              />
              <div className="modal-buttons">
                <button type="submit">Add Player</button>
                <button type="button" onClick={() => setShowAddForm(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Batting Avg</th>
            <th>Bowling Avg</th>
            <th>Matches</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {players.map(player => (
            <tr key={player._id}>
              <td>{player.name}</td>
              <td>{player.role}</td>
              <td>{player.batting_average || '-'}</td>
              <td>{player.bowling_average || '-'}</td>
              <td>{player.matches_played}</td>
              <td>{player.age}</td>
              <td>
                <button className="edit-button" onClick={() => handleEdit(player)}>✏️</button>
                <button className="delete-button" onClick={() => handleDelete(player._id)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showEditForm && editingPlayer && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Edit Player</h2>
            <form onSubmit={handleUpdate}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={editingPlayer.name}
                onChange={handleEditInputChange}
                required
              />
              <input
                type="text"
                name="role"
                placeholder="Role"
                value={editingPlayer.role}
                onChange={handleEditInputChange}
                required
              />
              <input
                type="number"
                name="batting_average"
                placeholder="Batting Average"
                value={editingPlayer.batting_average}
                onChange={handleEditInputChange}
              />
              <input
                type="number"
                name="bowling_average"
                placeholder="Bowling Average"
                value={editingPlayer.bowling_average}
                onChange={handleEditInputChange}
              />
              <input
                type="number"
                name="matches_played"
                placeholder="Matches Played"
                value={editingPlayer.matches_played}
                onChange={handleEditInputChange}
                required
              />
              <input
                type="number"
                name="age"
                placeholder="Age"
                value={editingPlayer.age}
                onChange={handleEditInputChange}
                required
              />
              <div className="modal-buttons">
                <button type="submit">Update Player</button>
                <button type="button" onClick={() => {
                  setShowEditForm(false);
                  setEditingPlayer(null);
                }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
