import React, { useEffect, useMemo } from 'react';
import { X, Trash2, GitCompare, Plus, ArrowRight } from '../Icons';
import { formatNumber, formatPopulation, formatArea } from '../../utils/formatters';
import './ComparisonModal.css';

export function ComparisonModal({
  comparedList,
  onClose,
  onRemoveCountry,
  onClearAll,
  onSelectCountry
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  // Encontrar valores máximos para barras proporcionais
  const maxValues = useMemo(() => {
    if (comparedList.length === 0) return { population: 1, area: 1 };
    const maxPop = Math.max(...comparedList.map(c => c.population || 0), 1);
    const maxArea = Math.max(...comparedList.map(c => c.area || 0), 1);
    return { population: maxPop, area: maxArea };
  }, [comparedList]);

  return (
    <div className="compare-backdrop" onClick={onClose} role="presentation">
      <aside
        className="compare-dialog-content"
        role="dialog"
        aria-modal="true"
        aria-labelledby="compare-heading"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabeçalho */}
        <header className="compare-header">
          <div className="compare-header-title">
            <div className="compare-icon-box">
              <GitCompare size={20} aria-hidden="true" />
            </div>
            <div>
              <h2 id="compare-heading" className="compare-title">
                Comparador de Nações
              </h2>
              <p className="compare-subtitle">
                Análise comparativa direta entre {comparedList.length} países selecionados (máx. 4)
              </p>
            </div>
          </div>

          <div className="compare-header-actions">
            {comparedList.length > 0 && (
              <button
                type="button"
                className="clear-all-btn"
                onClick={onClearAll}
                title="Limpar todos os países do comparador"
              >
                <Trash2 size={16} aria-hidden="true" />
                <span>Limpar todos</span>
              </button>
            )}

            <button
              type="button"
              className="compare-close-btn"
              onClick={onClose}
              aria-label="Fechar comparador"
            >
              <X size={20} aria-hidden="true" />
            </button>
          </div>
        </header>

        {/* Conteúdo de Comparação */}
        <div className="compare-body">
          {comparedList.length === 0 ? (
            <article className="empty-compare">
              <GitCompare size={48} className="empty-compare-icon" aria-hidden="true" />
              <h3>Nenhum país selecionado para comparação</h3>
              <p>Navegue pelos cards de países e clique no botão "Comparar" para adicionar até 4 países lado a lado.</p>
              <button type="button" className="btn-explore" onClick={onClose}>
                Explorar países
              </button>
            </article>
          ) : (
            <section className="compare-grid" aria-label="Colunas de países comparados">
              {comparedList.map((c) => {
                const popPercent = Math.round(((c.population || 0) / maxValues.population) * 100);
                const areaPercent = Math.round(((c.area || 0) / maxValues.area) * 100);

                return (
                  <article key={c.cca3} className="compare-card">
                    {/* Botão Remover */}
                    <button
                      type="button"
                      className="remove-compare-btn"
                      onClick={() => onRemoveCountry(c.cca3)}
                      aria-label={`Remover ${c.nameCommon} da comparação`}
                      title="Remover"
                    >
                      <X size={16} aria-hidden="true" />
                    </button>

                    {/* Bandeira e Título */}
                    <figure className="compare-flag-figure">
                      <img src={c.flagUrl} alt={c.flagAlt} className="compare-flag-img" />
                    </figure>

                    <header className="compare-card-head">
                      <h3 className="compare-country-name">{c.nameCommon}</h3>
                      <p className="compare-country-region">{c.region} • {c.subregion}</p>
                    </header>

                    {/* Métricas Proporcionais */}
                    <dl className="compare-metrics-list">
                      {/* População */}
                      <div className="compare-metric-row">
                        <dt className="metric-row-label">
                          <span>População:</span>
                          <strong>{formatPopulation(c.population)}</strong>
                        </dt>
                        <dd className="metric-row-bar">
                          <div
                            className="bar-fill bar-pop"
                            style={{ width: `${Math.max(popPercent, 6)}%` }}
                            aria-valuenow={popPercent}
                            aria-valuemin="0"
                            aria-valuemax="100"
                            role="progressbar"
                          />
                        </dd>
                      </div>

                      {/* Área Territorial */}
                      <div className="compare-metric-row">
                        <dt className="metric-row-label">
                          <span>Área:</span>
                          <strong>{formatArea(c.area)}</strong>
                        </dt>
                        <dd className="metric-row-bar">
                          <div
                            className="bar-fill bar-area"
                            style={{ width: `${Math.max(areaPercent, 6)}%` }}
                            aria-valuenow={areaPercent}
                            aria-valuemin="0"
                            aria-valuemax="100"
                            role="progressbar"
                          />
                        </dd>
                      </div>

                      {/* Capital */}
                      <div className="compare-metric-row">
                        <dt className="metric-row-label"><span>Capital:</span></dt>
                        <dd className="metric-row-text">{c.capital}</dd>
                      </div>

                      {/* Moeda */}
                      <div className="compare-metric-row">
                        <dt className="metric-row-label"><span>Moeda:</span></dt>
                        <dd className="metric-row-text">
                          {c.currencies && c.currencies.length > 0
                            ? c.currencies.map(curr => `${curr.name} (${curr.symbol || curr.code})`).join(', ')
                            : '—'}
                        </dd>
                      </div>

                      {/* Idiomas */}
                      <div className="compare-metric-row">
                        <dt className="metric-row-label"><span>Idiomas:</span></dt>
                        <dd className="metric-row-text">
                          {c.languages && c.languages.length > 0 ? c.languages.join(', ') : '—'}
                        </dd>
                      </div>
                    </dl>

                    {/* Botão Ver Detalhes */}
                    <footer className="compare-card-footer">
                      <button
                        type="button"
                        className="btn-card-detail"
                        onClick={() => {
                          onClose();
                          onSelectCountry(c);
                        }}
                      >
                        <span>Abrir Detalhes</span>
                        <ArrowRight size={15} aria-hidden="true" />
                      </button>
                    </footer>
                  </article>
                );
              })}
            </section>
          )}
        </div>
      </aside>
    </div>
  );
}
