import React from 'react';
import './SkeletonCard.css';

export function SkeletonCard() {
  return (
    <article className="skeleton-card" aria-hidden="true">
      <div className="skeleton-flag shimmer" />
      <div className="skeleton-body">
        <div className="skeleton-title shimmer" />
        <div className="skeleton-lines">
          <div className="skeleton-line shimmer" />
          <div className="skeleton-line shimmer" />
          <div className="skeleton-line shimmer" />
        </div>
      </div>
      <div className="skeleton-footer shimmer" />
    </article>
  );
}

export function SkeletonGrid({ count = 8 }) {
  return (
    <div className="skeleton-grid" aria-label="Carregando países...">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
