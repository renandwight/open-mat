import { api } from '../api/api';
import { useEffect, useState } from 'react';
import FavoriteCard from '../components/FavoriteCard';

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
            <h2 className="text-center mb-4">Favorite Gyms</h2>
            {favorites.map((favorite) => (
                <FavoriteCard 
                    key={favorite.id} 
                    favoriteData={favorite} 
                    onRemove={removeFavorite} 
                />
            ))}
        </div>
    );
}