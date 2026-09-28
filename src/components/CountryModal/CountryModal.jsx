import React, { useEffect } from 'react';
import {
  X,
  MapPin,
  Users,
  Globe,
  Maximize2,
  Coins,
  Languages,
  Clock,
  ExternalLink,
  Heart,
  GitCompare,
  Compass
} from '../Icons';
import { formatNumber, formatPopulation, formatArea } from '../../utils/formatters';
import './CountryModal.css';

export function CountryModal({
  country,
  onClose,
  allCountriesMap,
  onNavigateToBorder,
  isFavorite,
  onToggleFavorite,
  isCompared,
  onToggleCompare
}) {
  // Fechar com tecla Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    // Bloquear scroll do body enquanto o modal está aberto
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  if (!country) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="presentation">
      <aside
        className="modal-content"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-country-title"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabeçalho do Modal */}
        <header className="modal-header">
          <div className="modal-title-group">
            <h2 id="modal-country-title" className="modal-title">
              {country.nameCommon}
            </h2>
            <p className="modal-subtitle">
              {country.nameOfficial}
              {country.nativeNames && <span className="modal-native"> • {country.nativeNames}</span>}
            </p>
          </div>

          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Fechar janela de detalhes"
            title="Fechar (Esc)"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </header>

        {/* Corpo com Informações Semânticas */}
        <div className="modal-body-scroll">
          {/* Seção Visual: Bandeira e Brasão */}
          <section className="modal-visuals-grid" aria-label="Imagens oficiais">
            <figure className="modal-figure">
              <img
                src={country.flagUrl}
                alt={country.flagAlt || `Bandeira de ${country.nameCommon}`}
                className="modal-flag-img"
              />
              <figcaption className="modal-fig-caption">Bandeira Oficial</figcaption>
            </figure>

            {country.coatOfArmsUrl && (
              <figure className="modal-figure coat-figure">
                <img
                  src={country.coatOfArmsUrl}
                  alt={`Brasão de armas de ${country.nameCommon}`}
                  className="modal-coat-img"
                />
                <figcaption className="modal-fig-caption">Brasão de Armas</figcaption>
              </figure>
            )}
          </section>

          {/* Dados Técnicos e Estatísticas Semânticas */}
          <section className="modal-data-section" aria-labelledby="specs-heading">
            <h3 id="specs-heading" className="section-subtitle">
              Informações Gerais & Geográficas
            </h3>

            <dl className="modal-specs-list">
              <div className="spec-card">
                <dt className="spec-title">
                  <Users size={16} className="spec-icon" aria-hidden="true" />
                  <span>População</span>
                </dt>
                <dd className="spec-value">
                  {formatNumber(country.population)}
                  <small className="spec-subval"> ({formatPopulation(country.population)})</small>
                </dd>
              </div>

              <div className="spec-card">
                <dt className="spec-title">
                  <MapPin size={16} className="spec-icon" aria-hidden="true" />
                  <span>Capital</span>
                </dt>
                <dd className="spec-value">{country.allCapitals || country.capital}</dd>
              </div>

              <div className="spec-card">
                <dt className="spec-title">
                  <Globe size={16} className="spec-icon" aria-hidden="true" />
                  <span>Região & Continente</span>
                </dt>
                <dd className="spec-value">
                  {country.region} • {country.subregion}
                </dd>
              </div>

              <div className="spec-card">
                <dt className="spec-title">
                  <Maximize2 size={16} className="spec-icon" aria-hidden="true" />
                  <span>Área Territorial</span>
                </dt>
                <dd className="spec-value">{formatArea(country.area)}</dd>
              </div>

              <div className="spec-card">
                <dt className="spec-title">
                  <Coins size={16} className="spec-icon" aria-hidden="true" />
                  <span>Moedas</span>
                </dt>
                <dd className="spec-value">
                  {country.currencies && country.currencies.length > 0
                    ? country.currencies.map(c => `${c.name} (${c.symbol || c.code})`).join(', ')
                    : 'Não informado'}
                </dd>
              </div>

              <div className="spec-card">
                <dt className="spec-title">
                  <Languages size={16} className="spec-icon" aria-hidden="true" />
                  <span>Idiomas Oficiais</span>
                </dt>
                <dd className="spec-value">
                  {country.languages && country.languages.length > 0
                    ? country.languages.join(', ')
                    : 'Não informado'}
                </dd>
              </div>

              <div className="spec-card">
                <dt className="spec-title">
                  <Clock size={16} className="spec-icon" aria-hidden="true" />
                  <span>Fusos Horários</span>
                </dt>
                <dd className="spec-value">
                  {country.timezones && country.timezones.length > 0
                    ? country.timezones.join(', ')
                    : 'UTC'}
                </dd>
              </div>

              <div className="spec-card">
                <dt className="spec-title">
                  <Compass size={16} className="spec-icon" aria-hidden="true" />
                  <span>Coordenadas Geográficas</span>
                </dt>
                <dd className="spec-value">
                  {country.latlng ? `${country.latlng[0]}° N, ${country.latlng[1]}° E` : '—'}
                </dd>
              </div>
            </dl>
          </section>

          {/* Países Fronteiriços Interativos */}
          <section className="modal-borders-section" aria-labelledby="borders-heading">
            <h3 id="borders-heading" className="section-subtitle">
              Fronteiras Terrestres
            </h3>

            {country.borders && country.borders.length > 0 ? (
              <nav aria-label="Países vizinhos" className="borders-nav">
                <ul className="borders-list" role="list">
                  {country.borders.map((borderCode) => {
                    const neighbor = allCountriesMap[borderCode];
                    return (
                      <li key={borderCode}>
                        <button
                          type="button"
                          className="border-pill-btn"
                          onClick={() => neighbor && onNavigateToBorder(neighbor)}
                          title={neighbor ? `Ver detalhes de ${neighbor.nameCommon}` : borderCode}
                        >
                          {neighbor ? neighbor.nameCommon : borderCode}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            ) : (
              <p className="no-borders-text">Este país não possui fronteiras terrestres diretas (país insular ou isolado).</p>
            )}
          </section>
        </div>

        {/* Rodapé com Ações */}
        <footer className="modal-footer">
          <div className="modal-actions-left">
            <button
              type="button"
              className={`modal-btn-action ${isFavorite ? 'fav-active' : ''}`}
              onClick={() => onToggleFavorite(country.cca3)}
            >
              <Heart size={18} fill={isFavorite ? 'currentColor' : 'none'} aria-hidden="true" />
              <span>{isFavorite ? 'Favoritado' : 'Favoritar'}</span>
            </button>

            <button
              type="button"
              className={`modal-btn-action ${isCompared ? 'compare-active' : ''}`}
              onClick={() => onToggleCompare(country)}
            >
              <GitCompare size={18} aria-hidden="true" />
              <span>{isCompared ? 'No Comparador' : 'Adicionar ao Comparador'}</span>
            </button>
          </div>

          {country.googleMapsUrl && (
            <a
              href={country.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="maps-link-btn"
            >
              <span>Ver no Google Maps</span>
              <ExternalLink size={16} aria-hidden="true" />
            </a>
          )}
        </footer>
      </aside>
    </div>
  );
}
