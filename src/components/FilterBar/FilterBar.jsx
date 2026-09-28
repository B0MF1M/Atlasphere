import React from 'react';
import { Search, X, SlidersHorizontal, ArrowUpDown, RotateCcw } from '../Icons';
import './FilterBar.css';

const REGIONS = [
  { key: 'all', label: 'Todos' },
  { key: 'Africa', label: 'África' },
  { key: 'Americas', label: 'Américas' },
  { key: 'Asia', label: 'Ásia' },
  { key: 'Europe', label: 'Europa' },
  { key: 'Oceania', label: 'Oceania' },
  { key: 'Antarctic', label: 'Antártica' }
];

export function FilterBar({
  searchTerm,
  onSearchChange,
  selectedRegion,
  onSelectRegion,
  selectedSubregion,
  onSelectSubregion,
  subregionsList,
  sortBy,
  onSortChange,
  onResetFilters,
  hasActiveFilters
}) {
  return (
    <section className="filter-section" aria-labelledby="filters-heading">
      <header className="sr-only">
        <h2 id="filters-heading">Painel de Filtros e Busca de Países</h2>
      </header>

      <div className="filter-main-bar">
        {/* Busca Semântica */}
        <search role="search" className="search-container">
          <label htmlFor="country-search-input" className="sr-only">
            Buscar país por nome, nome oficial ou capital
          </label>
          <Search size={18} className="search-icon" aria-hidden="true" />
          <input
            id="country-search-input"
            type="search"
            className="search-input"
            placeholder="Buscar por país, capital, código cca3..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            autoComplete="off"
            spellCheck="false"
          />
          {searchTerm && (
            <button
              type="button"
              className="clear-search-btn"
              onClick={() => onSearchChange('')}
              aria-label="Limpar campo de busca"
              title="Limpar busca"
            >
              <X size={16} aria-hidden="true" />
            </button>
          )}
        </search>

        {/* Seletores de Ordenação e Sub-região */}
        <div className="filter-dropdowns">
          {/* Sub-região Select */}
          {subregionsList.length > 0 && (
            <div className="select-wrapper">
              <label htmlFor="subregion-select" className="sr-only">Filtrar por Sub-região</label>
              <SlidersHorizontal size={16} className="select-icon" aria-hidden="true" />
              <select
                id="subregion-select"
                className="custom-select"
                value={selectedSubregion}
                onChange={(e) => onSelectSubregion(e.target.value)}
              >
                <option value="all">Todas as Sub-regiões</option>
                {subregionsList.map((sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Ordenação Select */}
          <div className="select-wrapper">
            <label htmlFor="sort-select" className="sr-only">Ordenar resultados</label>
            <ArrowUpDown size={16} className="select-icon" aria-hidden="true" />
            <select
              id="sort-select"
              className="custom-select"
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
            >
              <option value="name-asc">Nome (A - Z)</option>
              <option value="name-desc">Nome (Z - A)</option>
              <option value="pop-desc">População (Maior)</option>
              <option value="pop-asc">População (Menor)</option>
              <option value="area-desc">Área Territorial (Maior)</option>
              <option value="area-asc">Área Territorial (Menor)</option>
            </select>
          </div>

          {/* Botão de Limpar Filtros */}
          {hasActiveFilters && (
            <button
              type="button"
              className="reset-filters-btn"
              onClick={onResetFilters}
              title="Limpar todos os filtros aplicados"
            >
              <RotateCcw size={15} aria-hidden="true" />
              <span>Limpar</span>
            </button>
          )}
        </div>
      </div>

      {/* Navegação de Regiões / Continentes em formato de abas/pills */}
      <nav className="region-pills-nav" aria-label="Filtro por Continente">
        <ul className="region-pills-list" role="list">
          {REGIONS.map((region) => {
            const isSelected = selectedRegion === region.key;
            return (
              <li key={region.key} className="region-pill-item">
                <button
                  type="button"
                  className={`region-pill-btn ${isSelected ? 'active' : ''}`}
                  onClick={() => onSelectRegion(region.key)}
                  aria-pressed={isSelected}
                >
                  {region.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </section>
  );
}
