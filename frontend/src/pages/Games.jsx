import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/api';

export default function Games() {
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchGames();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [games, filter, showFavoritesOnly]);

  const fetchGames = async () => {
    try {
      setLoading(true);
      const response = await api.get('/games');
      setGames(response.data);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load games');
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let result = [...games];

    if (filter !== 'all') {
      result = result.filter(game => 
        game.sport.toLowerCase() === filter.toLowerCase()
      );
    }

    if (showFavoritesOnly) {
      result = result.filter(game => game.isFavorite);
    }

    setFilteredGames(result);
  };

  const toggleFavorite = async (gameId) => {
    try {
      await api.post(`/favorites/${gameId}`);
      // Update the game's favorite status locally
      setGames(games.map(game => 
        game.id === gameId 
          ? { ...game, isFavorite: !game.isFavorite }
          : game
      ));
    } catch (err) {
      setError('Failed to update favorite');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const sports = ['all', ...new Set(games.map(g => g.sport))];

  const getBadgeClass = (sport) => {
    return `game-badge badge-${sport.toLowerCase().replace(/\s+/g, '-')}`;
  };

  if (loading) {
    return (
      <div>
        <nav className="navbar">
          <div className="navbar-content">
            <h1>🎰 Casino Games</h1>
            <div className="navbar-links">
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>
        </nav>
        <div className="container">
          <div className="loading">Loading games...</div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-content">
          <h1>🎰 Casino Games</h1>
          <div className="navbar-links">
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </nav>
      
      <div className="container">
        {error && <div className="error">{error}</div>}
        
        <div className="filters">
          {sports.map(sport => (
            <button
              key={sport}
              className={`filter-btn ${filter === sport ? 'active' : ''}`}
              onClick={() => setFilter(sport)}
            >
              {sport === 'all' ? 'All Sports' : sport}
            </button>
          ))}
          <button
            className={`filter-btn ${showFavoritesOnly ? 'active' : ''}`}
            onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
          >
            ⭐ Favorites Only
          </button>
        </div>

        {filteredGames.length === 0 ? (
          <div className="empty">
            {showFavoritesOnly 
              ? 'No favorite games yet. Click the star to add favorites!'
              : 'No games available'}
          </div>
        ) : (
          <div className="games-grid">
            {filteredGames.map(game => (
              <div key={game.id} className="game-card">
                <div className="game-header">
                  <div>
                    <div className="game-title">{game.name}</div>
                    <div className={getBadgeClass(game.sport)}>
                      {game.sport}
                    </div>
                    <div className="game-league">{game.league}</div>
                  </div>
                  <button
                    className="favorite-btn"
                    onClick={() => toggleFavorite(game.id)}
                    title={game.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    {game.isFavorite ? '⭐' : '☆'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
