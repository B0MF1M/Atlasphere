import React, { useState, useMemo, useCallback } from 'react';
import { Header } from './components/Header/Header';
import { MetricsSection } from './components/Metrics/MetricsSection';
import { FilterBar } from './components/FilterBar/FilterBar';
import { CountryGrid } from './components/CountryGrid/CountryGrid';
import { SkeletonGrid } from './components/SkeletonCard/SkeletonCard';
import { EmptyState } from './components/EmptyState/EmptyState';
import { CountryModal } from './components/CountryModal/CountryModal';
import { ComparisonModal } from './components/ComparisonModal/ComparisonModal';
import { Footer } from './components/Footer/Footer';
import { useCountries } from './hooks/useCountries';
import { useFavorites } from './hooks/useFavorites';
import { useTheme } from './hooks/useTheme';
import { normalizeSearchTerm } from './utils/formatters';
import { Sparkles, Globe, Heart } from './components/Icons';
import './App.css';

export function App() {
  const { theme, toggleTheme } = useTheme();
  const { countries, loading, error, refetch } = useCountries();
  const { favorites, favoritesCount, toggleFavorite, isFavorite, clearFavorites } = useFavorites();

  // Estados de Filtros e Busca
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedSubregion, setSelectedSubregion] = useState('all');
  const [sortBy, setSortBy] = useState('name-asc');
  const [activeView, setActiveView] = useState('all'); // 'all' | 'favorites'

  // Estados de Modais e Interações
  const [selectedCountryModal, setSelectedCountryModal] = useState(null);
  const [comparedList, setComparedList] = useState([]);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  // Mapa rápido O(1) de cca3 -> país para fronteiras e comparador
  const allCountriesMap = useMemo(() => {
    const map = {};
    for (const c of countries) {
      if (c.cca3) map[c.cca3] = c;
    }
    return map;
  }, [countries]);

  // Lista dinâmica de sub-regiões baseada na região selecionada
  const subregionsList = useMemo(() => {
    const set = new Set();
    const source = selectedRegion === 'all' 
      ? countries 
      : countries.filter(c => c.region === selectedRegion);

    for (const c of source) {
      if (c.subregion && c.subregion !== 'Não especificada') {
        set.add(c.subregion);
      }
    }
    return Array.from(set).sort();
  }, [countries, selectedRegion]);

  // Ao mudar de região principal, reseta o filtro de sub-região se não for compatível
  const handleSelectRegion = useCallback((region) => {
    setSelectedRegion(region);
    setSelectedSubregion('all');
  }, []);

  // Notificação temporária (Toast)
  const showToast = useCallback((msg) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 3500);
  }, []);

  // Adicionar / Remover do comparador
  const handleToggleCompare = useCallback((country) => {
    setComparedList((prev) => {
      const exists = prev.some(c => c.cca3 === country.cca3);
      if (exists) {
        showToast(`"${country.nameCommon}" removido do comparador.`);
        return prev.filter(c => c.cca3 !== country.cca3);
      }
      if (prev.length >= 4) {
        showToast('Limite máximo de 4 países no comparador atingido.');
        return prev;
      }
      showToast(`"${country.nameCommon}" adicionado ao comparador!`);
      return [...prev, country];
    });
  }, [showToast]);

  const handleRemoveFromCompare = useCallback((cca3) => {
    setComparedList(prev => prev.filter(c => c.cca3 !== cca3));
  }, []);

  const handleClearCompare = useCallback(() => {
    setComparedList([]);
  }, []);

  // Limpar todos os filtros
  const handleResetFilters = useCallback(() => {
    setSearchTerm('');
    setSelectedRegion('all');
    setSelectedSubregion('all');
    setSortBy('name-asc');
  }, []);

  const hasActiveFilters = searchTerm !== '' || selectedRegion !== 'all' || selectedSubregion !== 'all' || sortBy !== 'name-asc';

  // Processamento e filtragem de países
  const filteredCountries = useMemo(() => {
    let result = [...countries];

    // 1. Filtrar por Modo (Favoritos ou Todos)
    if (activeView === 'favorites') {
      const favSet = new Set(favorites);
      result = result.filter(c => favSet.has(c.cca3));
    }

    // 2. Filtrar por Região
    if (selectedRegion !== 'all') {
      result = result.filter(c => c.region === selectedRegion);
    }

    // 3. Filtrar por Sub-região
    if (selectedSubregion !== 'all') {
      result = result.filter(c => c.subregion === selectedSubregion);
    }

    // 4. Filtrar por Busca Textual (Nome comum, oficial, capital, cca3)
    if (searchTerm.trim()) {
      const query = normalizeSearchTerm(searchTerm);
      result = result.filter(c => {
        const nameNorm = normalizeSearchTerm(c.nameCommon);
        const officialNorm = normalizeSearchTerm(c.nameOfficial);
        const capitalNorm = normalizeSearchTerm(c.capital);
        const cca3Norm = normalizeSearchTerm(c.cca3);
        return (
          nameNorm.includes(query) ||
          officialNorm.includes(query) ||
          capitalNorm.includes(query) ||
          cca3Norm.includes(query)
        );
      });
    }

    // 5. Ordenação
    result.sort((a, b) => {
      switch (sortBy) {
        case 'name-asc':
          return a.nameCommon.localeCompare(b.nameCommon, 'pt-BR');
        case 'name-desc':
          return b.nameCommon.localeCompare(a.nameCommon, 'pt-BR');
        case 'pop-desc':
          return (b.population || 0) - (a.population || 0);
        case 'pop-asc':
          return (a.population || 0) - (b.population || 0);
        case 'area-desc':
          return (b.area || 0) - (a.area || 0);
        case 'area-asc':
          return (a.area || 0) - (b.area || 0);
        default:
          return 0;
      }
    });

    return result;
  }, [countries, activeView, favorites, selectedRegion, selectedSubregion, searchTerm, sortBy]);

  return (
    <div className="app-shell">
      {/* Cabeçalho Fixo Semântico */}
      <Header
        theme={theme}
        onToggleTheme={toggleTheme}
        activeView={activeView}
        onSelectView={setActiveView}
        favoritesCount={favoritesCount}
        comparedCount={comparedList.length}
        onOpenComparison={() => setIsComparisonOpen(true)}
      />

      {/* Conteúdo Principal Semântico */}
      <main id="main-content" className="main-layout">
        {/* Banner de Apresentação / Hero Semântico */}
        <section className="hero-section" aria-labelledby="hero-title">
          <h1 id="hero-title" className="hero-title">
            {activeView === 'favorites' ? (
              <>Meus Países <span className="gradient-text">Favoritos</span></>
            ) : (
              <>Explore o Mundo com <span className="gradient-text">Dados em Tempo Real</span></>
            )}
          </h1>

          <p className="hero-description">
            {activeView === 'favorites'
              ? `Você possui ${favoritesCount} país(es) marcado(s) como favorito. Acesse estatísticas detalhadas e compare informações quando quiser.`
              : 'Descubra dados demográficos, áreas territoriais, capitais, moedas e fronteiras geográficas de todas as nações do planeta em um painel interativo.'}
          </p>
        </section>

        {/* Métricas e Indicadores Globais */}
        {!loading && !error && (
          <MetricsSection
            visibleCountries={filteredCountries}
            totalCount={countries.length}
          />
        )}

        {/* Barra de Filtros e Busca */}
        <FilterBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedRegion={selectedRegion}
          onSelectRegion={handleSelectRegion}
          selectedSubregion={selectedSubregion}
          onSelectSubregion={setSelectedSubregion}
          subregionsList={subregionsList}
          sortBy={sortBy}
          onSortChange={setSortBy}
          onResetFilters={handleResetFilters}
          hasActiveFilters={hasActiveFilters}
        />

        {/* Renderização Condicional de Estados (Loading, Erro, Vazio, Grid) */}
        {loading && <SkeletonGrid count={8} />}

        {!loading && error && (
          <EmptyState
            type="error"
            onAction={refetch}
            actionLabel="Tentar Novamente"
            customMessage={error}
          />
        )}

        {!loading && !error && filteredCountries.length === 0 && (
          <EmptyState
            type={activeView === 'favorites' && !searchTerm && selectedRegion === 'all' ? 'no-favorites' : 'no-results'}
            onAction={activeView === 'favorites' && !searchTerm && selectedRegion === 'all' ? () => setActiveView('all') : handleResetFilters}
            actionLabel={activeView === 'favorites' && !searchTerm && selectedRegion === 'all' ? 'Ver Todos os Países' : 'Limpar Filtros'}
            customMessage={
              activeView === 'favorites' && !searchTerm && selectedRegion === 'all'
                ? 'Você ainda não possui nenhum país adicionado aos favoritos. Clique no ícone de coração nos cards para salvá-los aqui!'
                : undefined
            }
          />
        )}

        {!loading && !error && filteredCountries.length > 0 && (
          <CountryGrid
            countries={filteredCountries}
            onSelectCountry={setSelectedCountryModal}
            isFavorite={isFavorite}
            onToggleFavorite={toggleFavorite}
            comparedList={comparedList}
            onToggleCompare={handleToggleCompare}
          />
        )}
      </main>

      {/* Rodapé Semântico */}
      <Footer />

      {/* Modal de Detalhes do País */}
      {selectedCountryModal && (
        <CountryModal
          country={selectedCountryModal}
          onClose={() => setSelectedCountryModal(null)}
          allCountriesMap={allCountriesMap}
          onNavigateToBorder={(neighbor) => setSelectedCountryModal(neighbor)}
          isFavorite={isFavorite(selectedCountryModal.cca3)}
          onToggleFavorite={toggleFavorite}
          isCompared={comparedList.some(c => c.cca3 === selectedCountryModal.cca3)}
          onToggleCompare={handleToggleCompare}
        />
      )}

      {/* Modal do Comparador de Países */}
      {isComparisonOpen && (
        <ComparisonModal
          comparedList={comparedList}
          onClose={() => setIsComparisonOpen(false)}
          onRemoveCountry={handleRemoveFromCompare}
          onClearAll={handleClearCompare}
          onSelectCountry={setSelectedCountryModal}
        />
      )}

      {/* Notificação Toast */}
      {notification && (
        <aside className="toast-notification" role="status" aria-live="polite">
          <p>{notification}</p>
        </aside>
      )}
    </div>
  );
}

export default App;
