import { useState, useEffect, useCallback } from 'react';

const FAVORITES_STORAGE_KEY = 'terrapulse_favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
    } catch (e) {
      console.warn('Erro ao salvar favoritos:', e);
    }
  }, [favorites]);

  const toggleFavorite = useCallback((cca3) => {
    setFavorites(prev => 
      prev.includes(cca3) 
        ? prev.filter(code => code !== cca3)
        : [...prev, cca3]
    );
  }, []);

  const isFavorite = useCallback((cca3) => {
    return favorites.includes(cca3);
  }, [favorites]);

  const clearFavorites = useCallback(() => {
    setFavorites([]);
  }, []);

  return {
    favorites,
    favoritesCount: favorites.length,
    toggleFavorite,
    isFavorite,
    clearFavorites
  };
}
