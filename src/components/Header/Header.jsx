import React from 'react';
import { Globe2, Sun, Moon, Heart, GitCompare, Sparkles } from '../Icons';
import './Header.css';

export function Header({
  theme,
  onToggleTheme,
  activeView,
  onSelectView,
  favoritesCount,
  comparedCount,
  onOpenComparison
}) {
  return (
    <header className="site-header">
      <div className="header-container">
        {/* Marca e Título Semântico */}
        <div className="header-brand" onClick={() => onSelectView('all')}>
          <div className="brand-icon-wrapper">
            <Globe2 className="brand-icon" aria-hidden="true" />
          </div>
          <div>
            <h1 className="brand-title">Atlasphere</h1>
            <p className="brand-subtitle">Painel Interativo de Dados Globais</p>
          </div>
        </div>

        {/* Navegação Semântica de Modos */}
        <nav className="header-nav" aria-label="Navegação Principal">
          <button
            type="button"
            className={`nav-btn ${activeView === 'all' ? 'active' : ''}`}
            onClick={() => onSelectView('all')}
            aria-current={activeView === 'all' ? 'page' : undefined}
          >
            <Globe2 size={18} aria-hidden="true" />
            <span>Todos os Países</span>
          </button>

          <button
            type="button"
            className={`nav-btn ${activeView === 'favorites' ? 'active' : ''}`}
            onClick={() => onSelectView('favorites')}
            aria-current={activeView === 'favorites' ? 'page' : undefined}
          >
            <Heart size={18} className={favoritesCount > 0 ? 'heart-filled' : ''} aria-hidden="true" />
            <span>Favoritos</span>
            {favoritesCount > 0 && (
              <span className="badge-count" aria-label={`${favoritesCount} favoritos`}>
                {favoritesCount}
              </span>
            )}
          </button>

          <button
            type="button"
            className={`nav-btn ${activeView === 'compare' ? 'active' : ''}`}
            onClick={() => onOpenComparison()}
            aria-label="Abrir comparador de países"
          >
            <GitCompare size={18} aria-hidden="true" />
            <span>Comparar</span>
            {comparedCount > 0 && (
              <span className="badge-count badge-accent" aria-label={`${comparedCount} países selecionados`}>
                {comparedCount}
              </span>
            )}
          </button>
        </nav>

        {/* Ações Rápidas & Alternância de Tema */}
        <aside className="header-actions" aria-label="Controles de Usuário">
          <button
            type="button"
            className="theme-toggle-btn"
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'}
            title={theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'}
          >
            {theme === 'dark' ? (
              <Sun size={20} className="sun-icon" aria-hidden="true" />
            ) : (
              <Moon size={20} className="moon-icon" aria-hidden="true" />
            )}
          </button>
        </aside>
      </div>
    </header>
  );
}
