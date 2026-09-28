import { useState, useEffect, useCallback } from 'react';
import { fetchAllCountries } from '../services/countriesApi';

const STORAGE_CACHE_KEY = 'terrapulse_countries_cache';
const CACHE_EXPIRY_MS = 1000 * 60 * 30; // 30 minutos

export function useCountries() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = useCallback(async (forceRefresh = false) => {
    setLoading(true);
    setError(null);

    // Tentativa de carregar do cache da sessão para velocidade instantânea
    if (!forceRefresh) {
      try {
        const cached = sessionStorage.getItem(STORAGE_CACHE_KEY);
        if (cached) {
          const { timestamp, data } = JSON.parse(cached);
          if (Date.now() - timestamp < CACHE_EXPIRY_MS && Array.isArray(data) && data.length > 0) {
            setCountries(data);
            setLoading(false);
            return;
          }
        }
      } catch (e) {
        console.warn('Erro ao ler cache:', e);
      }
    }

    try {
      const data = await fetchAllCountries();
      setCountries(data);
      
      try {
        sessionStorage.setItem(STORAGE_CACHE_KEY, JSON.stringify({
          timestamp: Date.now(),
          data
        }));
      } catch (e) {
        console.warn('Erro ao salvar cache:', e);
      }
    } catch (err) {
      setError(err.message || 'Não foi possível carregar as informações dos países.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return {
    countries,
    loading,
    error,
    refetch: () => loadData(true)
  };
}
