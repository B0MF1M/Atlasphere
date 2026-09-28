import React from 'react';
import { Heart, GitCompare, ArrowRight, MapPin, Users, Globe, Maximize } from '../Icons';
import { formatNumber, formatArea } from '../../utils/formatters';
import './CountryCard.css';

export function CountryCard({
  country,
  onSelectCountry,
  isFavorite,
  onToggleFavorite,
  isCompared,
  onToggleCompare
}) {
  return (
    <article
      className="country-card"
      onClick={() => onSelectCountry(country)}
      aria-label={`Ver detalhes de ${country.nameCommon}`}
    >
      {/* Imagem / Bandeira Semântica com Figure */}
      <figure className="flag-figure">
        <img
          src={country.flagUrl}
          alt={country.flagAlt || `Bandeira oficial de ${country.nameCommon}`}
          loading="lazy"
          className="flag-img"
        />
        <figcaption className="sr-only">Bandeira de {country.nameCommon}</figcaption>

        {/* Badge da Região */}
        <span className="region-badge">{country.region}</span>

        {/* Botão de Favoritar Rápido */}
        <button
          type="button"
          className={`card-fav-btn ${isFavorite ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(country.cca3);
          }}
          aria-label={isFavorite ? `Remover ${country.nameCommon} dos favoritos` : `Favoritar ${country.nameCommon}`}
          title={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        >
          <Heart size={18} fill={isFavorite ? 'currentColor' : 'none'} aria-hidden="true" />
        </button>
      </figure>

      {/* Conteúdo Principal do Card */}
      <div className="card-body">
        <header className="card-heading">
          <h3 className="country-title" title={country.nameCommon}>
            {country.nameCommon}
          </h3>
          <p className="country-code">{country.cca3}</p>
        </header>

        {/* Lista de Descrição Semântica para Chave-Valor */}
        <dl className="country-info-list">
          <div className="info-item">
            <dt className="info-label">
              <Users size={14} aria-hidden="true" />
              <span>População:</span>
            </dt>
            <dd className="info-value">{formatNumber(country.population)}</dd>
          </div>

          <div className="info-item">
            <dt className="info-label">
              <MapPin size={14} aria-hidden="true" />
              <span>Capital:</span>
            </dt>
            <dd className="info-value" title={country.capital}>{country.capital}</dd>
          </div>

          <div className="info-item">
            <dt className="info-label">
              <Globe size={14} aria-hidden="true" />
              <span>Sub-região:</span>
            </dt>
            <dd className="info-value" title={country.subregion}>{country.subregion}</dd>
          </div>

          <div className="info-item">
            <dt className="info-label">
              <Maximize size={14} aria-hidden="true" />
              <span>Área:</span>
            </dt>
            <dd className="info-value">{formatArea(country.area)}</dd>
          </div>
        </dl>
      </div>

      {/* Rodapé do Card com Ações Interativas */}
      <footer className="card-footer" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className={`compare-btn ${isCompared ? 'compared' : ''}`}
          onClick={() => onToggleCompare(country)}
          title={isCompared ? 'Remover do comparador' : 'Adicionar ao comparador'}
          aria-pressed={isCompared}
        >
          <GitCompare size={15} aria-hidden="true" />
          <span>{isCompared ? 'Comparando' : 'Comparar'}</span>
        </button>

        <button
          type="button"
          className="details-action-btn"
          onClick={() => onSelectCountry(country)}
          aria-label={`Abrir painel completo de ${country.nameCommon}`}
        >
          <span>Detalhes</span>
          <ArrowRight size={15} aria-hidden="true" />
        </button>
      </footer>
    </article>
  );
}
