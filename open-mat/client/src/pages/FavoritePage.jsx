import { api } from '../api/api';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function FavoritePage() {
    const [favorites, setFavorites] = useState(null);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) {
            navigate('/login');
            return;
        }

        const getFavorites = async () => {
            try {
                const response = await api.get('users/favorites/');
                setFavorites(response.data);
            } catch (error) {
                console.log(error);
                if (error.response?.status === 401) {
                    navigate('/login');
                }
            }
        };
        getFavorites();
    }, [token, navigate]);

    const removeFavorite = async (gymId) => {
        try {
            await api.delete(`users/favorites/${gymId}/`);
            setFavorites(favorites.filter(fav => fav.gym.id !== gymId));
        } catch (error) {
            console.log(error);
        }
    };

    if (!token) return <div>Please log in to view favorites.</div>;

    if (!favorites) return <div>Loading...</div>;

    if (favorites.length === 0) return <div>No favorites yet.</div>;

    return (
        <div>
            <h1>Favorite Gyms</h1>
            {favorites.map((favorite) => {
                const { id, name, street, city, state, zip } = favorite.gym;
                return (
                    <div key={favorite.id} className='border-2'>
                        <h2>{name}</h2>
                        <h3>{street} {city}, {state} {zip}</h3>
                        <button onClick={() => removeFavorite(id)}>
                            Remove Favorite
                        </button>
                    </div>
                );
            })}
        </div>
    );
}