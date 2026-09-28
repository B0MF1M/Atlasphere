import React, { useMemo } from 'react';
import { formatNumber, formatPopulation, formatArea } from '../../utils/formatters';
import './MetricsSection.css';

export function MetricsSection({ visibleCountries, totalCount }) {
  const stats = useMemo(() => {
    if (!visibleCountries || visibleCountries.length === 0) {
      return {
        totalVisible: 0,
        totalPopulation: 0,
        mostPopulous: null,
        largestCountry: null
      };
    }

    let totalPop = 0;
    let mostPop = visibleCountries[0];
    let largest = visibleCountries[0];

    for (const c of visibleCountries) {
      totalPop += c.population || 0;
      if ((c.population || 0) > (mostPop.population || 0)) {
        mostPop = c;
      }
      if ((c.area || 0) > (largest.area || 0)) {
        largest = c;
      }
    }

    return {
      totalVisible: visibleCountries.length,
      totalPopulation: totalPop,
      mostPopulous: mostPop,
      largestCountry: largest
    };
  }, [visibleCountries]);

  return (
    <section className="metrics-section" aria-labelledby="metrics-heading">
      <header className="sr-only">
        <h2 id="metrics-heading">Indicadores Globais em Destaque</h2>
      </header>

      <ul className="metrics-grid" role="list">
        {/* Métrica 1: Países Exibidos */}
        <li className="metric-item">
          <article className="metric-card">
            <dl className="metric-details">
              <dt className="metric-label">Países em Exibição</dt>
              <dd className="metric-value">
                {stats.totalVisible}
                <small className="metric-sub"> / {totalCount} globais</small>
              </dd>
            </dl>
          </article>
        </li>

        {/* Métrica 2: População Total */}
        <li className="metric-item">
          <article className="metric-card">
            <dl className="metric-details">
              <dt className="metric-label">População Total do Filtro</dt>
              <dd className="metric-value" title={`${formatNumber(stats.totalPopulation)} habitantes`}>
                {formatPopulation(stats.totalPopulation)}
              </dd>
            </dl>
          </article>
        </li>

        {/* Métrica 3: Mais Populoso */}
        <li className="metric-item">
          <article className="metric-card">
            <dl className="metric-details">
              <dt className="metric-label">Mais Populoso da Seleção</dt>
              <dd className="metric-value metric-highlight">
                {stats.mostPopulous ? stats.mostPopulous.nameCommon : '—'}
                {stats.mostPopulous && (
                  <small className="metric-sub"> ({formatPopulation(stats.mostPopulous.population)})</small>
                )}
              </dd>
            </dl>
          </article>
        </li>

        {/* Métrica 4: Maior Extensão */}
        <li className="metric-item">
          <article className="metric-card">
            <dl className="metric-details">
              <dt className="metric-label">Maior Extensão Territorial</dt>
              <dd className="metric-value metric-highlight">
                {stats.largestCountry ? stats.largestCountry.nameCommon : '—'}
                {stats.largestCountry && (
                  <small className="metric-sub"> ({formatArea(stats.largestCountry.area)})</small>
                )}
              </dd>
            </dl>
          </article>
        </li>
      </ul>
    </section>
  );
}
