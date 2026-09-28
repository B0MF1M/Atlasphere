/**
 * Utilitários de formatação e manipulação de dados
 */

export function formatNumber(num) {
  if (num === null || num === undefined || isNaN(num)) return '0';
  return new Intl.NumberFormat('pt-BR').format(num);
}

export function formatPopulation(num) {
  if (num === null || num === undefined || isNaN(num)) return '0 hab.';
  if (num >= 1_000_000_000) {
    return `${(num / 1_000_000_000).toFixed(2)} bi hab.`;
  }
  if (num >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(1)} mi hab.`;
  }
  return `${formatNumber(num)} hab.`;
}

export function formatArea(num) {
  if (num === null || num === undefined || isNaN(num)) return '0 km²';
  return `${formatNumber(num)} km²`;
}

/**
 * Remove acentos e normaliza para busca insensível a maiúsculas/minúsculas e acentos
 */
export function normalizeSearchTerm(str) {
  if (!str) return '';
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}
