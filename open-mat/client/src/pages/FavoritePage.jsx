import { api } from '../api/api';
import { useEffect, useState } from 'react';

export default function FavoritePage() {
    const [favorites, setFavorites] = useState(null);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const getFavorites = async () => {
            try {
                const response = await api.get('users/favorites/', {
                    headers: {
                        Authorization: `Token ${token}`
                    }
                });
                setFavorites(response.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        getFavorites();
    }, [token]);

    const removeFavorite = async (gymId) => {
        try {
            await api.delete(`users/favorites/${gymId}/`, {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            setFavorites(favorites.filter(fav => fav.gym_details.id !== gymId));
        } catch (error) {
            console.log("Delete error:", error.response?.data || error.message);
        }
    };

    if (loading) return <div>Loading...</div>;

    if (!favorites || favorites.length === 0) return <div>No favorites yet.</div>;

    return (
        <div>
            <h1>Favorite Gyms</h1>
            {favorites.map((favorite) => {
                const { id, name, street, city, state, zip } = favorite.gym_details;
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