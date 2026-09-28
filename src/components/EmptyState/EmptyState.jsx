import React from 'react';
import { SearchX, HeartOff, AlertTriangle, RotateCcw, Globe } from '../Icons';
import './EmptyState.css';

export function EmptyState({
  type = 'no-results',
  onAction,
  actionLabel = 'Limpar filtros',
  customMessage
}) {
  const configs = {
    'no-results': {
      icon: SearchX,
      title: 'Nenhum país encontrado',
      description: customMessage || 'Não encontramos nenhum país correspondente aos termos de busca e filtros selecionados.',
      iconColor: 'var(--accent-amber)'
    },
    'no-favorites': {
      icon: HeartOff,
      title: 'Nenhum favorito salvo',
      description: customMessage || 'Você ainda não adicionou nenhum país aos seus favoritos. Clique no ícone de coração nos cards para salvá-los.',
      iconColor: 'var(--accent-rose)'
    },
    'error': {
      icon: AlertTriangle,
      title: 'Erro ao conectar à API',
      description: customMessage || 'Ocorreu um erro ao carregar os dados dos países. Verifique sua conexão e tente novamente.',
      iconColor: 'var(--accent-rose)'
    }
  };

  const current = configs[type] || configs['no-results'];
  const IconComponent = current.icon;

  return (
    <article className="empty-state-card" role="status" aria-live="polite">
      <figure className="empty-state-icon" style={{ color: current.iconColor }}>
        <IconComponent size={56} aria-hidden="true" />
      </figure>

      <header className="empty-state-header">
        <h3 className="empty-state-title">{current.title}</h3>
        <p className="empty-state-desc">{current.description}</p>
      </header>

      {onAction && (
        <footer className="empty-state-footer">
          <button
            type="button"
            className="empty-state-action-btn"
            onClick={onAction}
          >
            <RotateCcw size={16} aria-hidden="true" />
            <span>{actionLabel}</span>
          </button>
        </footer>
      )}
    </article>
  );
}
