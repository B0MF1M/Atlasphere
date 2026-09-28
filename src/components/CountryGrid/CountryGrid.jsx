import React, { useState, useEffect } from 'react';
import { CountryCard } from '../CountryCard/CountryCard';
import { ChevronDown, ArrowUp } from '../Icons';
import './CountryGrid.css';

const ITEMS_PER_PAGE = 24;

export function CountryGrid({
  countries,
  onSelectCountry,
  isFavorite,
  onToggleFavorite,
  comparedList,
  onToggleCompare
}) {
  const [visibleLimit, setVisibleLimit] = useState(ITEMS_PER_PAGE);

  // Reinicia o limite ao mudar os filtros
  useEffect(() => {
    setVisibleLimit(ITEMS_PER_PAGE);
  }, [countries]);

  const displayedCountries = countries.slice(0, visibleLimit);
  const hasMore = visibleLimit < countries.length;

  const handleLoadMore = () => {
    setVisibleLimit(prev => prev + ITEMS_PER_PAGE);
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const comparedCodes = new Set(comparedList.map(c => c.cca3));

  return (
    <section className="country-grid-section" aria-labelledby="countries-list-heading">
      <header className="sr-only">
        <h2 id="countries-list-heading">Lista de Países</h2>
      </header>

      <ul className="country-grid" role="list">
        {displayedCountries.map((country) => (
          <li key={country.cca3} className="country-grid-item">
            <CountryCard
              country={country}
              onSelectCountry={onSelectCountry}
              isFavorite={isFavorite(country.cca3)}
              onToggleFavorite={onToggleFavorite}
              isCompared={comparedCodes.has(country.cca3)}
              onToggleCompare={onToggleCompare}
            />
          </li>
        ))}
      </ul>

      {/* Controles de Paginação / Carregar Mais */}
      {hasMore && (
        <nav className="load-more-nav" aria-label="Paginação">
          <button
            type="button"
            className="load-more-btn"
            onClick={handleLoadMore}
          >
            <span>Mostrar mais países ({countries.length - visibleLimit} restantes)</span>
            <ChevronDown size={18} aria-hidden="true" />
          </button>
        </nav>
      )}

      {/* Botão de Voltar ao Topo */}
      {visibleLimit > ITEMS_PER_PAGE && (
        <aside className="scroll-top-container">
          <button
            type="button"
            className="scroll-top-btn"
            onClick={handleScrollToTop}
            aria-label="Voltar ao topo da página"
            title="Voltar ao topo"
          >
            <ArrowUp size={20} aria-hidden="true" />
          </button>
        </aside>
      )}
    </section>
  );
}
