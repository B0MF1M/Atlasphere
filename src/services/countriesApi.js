/**
 * Serviço de integração com a base de dados de Países
 * Contém dados verificados de população, capitais múltiplas, áreas, moedas, idiomas e bandeiras
 */
import fallbackData from '../data/countriesFallback.json';

function normalizeCountryData(item) {
  const cca2 = (item.cca2 || item.iso2 || '').toLowerCase();
  const cca3 = item.cca3 || item.iso3 || '';
  
  // Nome em português se disponível
  const ptCommon = item.translations?.por?.common || '';
  const ptOfficial = item.translations?.por?.official || '';
  const enCommon = item.name?.common || item.name || 'Desconhecido';
  const enOfficial = item.name?.official || '';

  // Nomes nativos
  let nativeNames = '';
  if (item.name?.native) {
    nativeNames = Object.values(item.name.native).map(n => n.common || n.official).filter(Boolean).join(', ');
  } else if (item.name?.nativeName) {
    nativeNames = Object.values(item.name.nativeName).map(n => n.common || n.official).filter(Boolean).join(', ');
  }

  // Bandeiras
  const flagUrl = item.flags?.svg || item.flags?.png || (cca2 ? `https://flagcdn.com/w320/${cca2}.png` : '');
  const coatOfArmsUrl = item.coatOfArms?.svg || item.coatOfArms?.png || (cca2 ? `https://mainfacts.com/media/images/coats_of_arms/${cca2}.svg` : null);

  // Moedas
  let currencies = [];
  if (item.currencies) {
    if (Array.isArray(item.currencies)) {
      currencies = item.currencies.map(c => ({ code: c.code || '', name: c.name || '', symbol: c.symbol || '' }));
    } else if (typeof item.currencies === 'object') {
      currencies = Object.entries(item.currencies).map(([code, curr]) => ({
        code,
        name: curr.name || code,
        symbol: curr.symbol || ''
      }));
    }
  }

  // Idiomas
  let languages = [];
  if (item.languages) {
    if (Array.isArray(item.languages)) {
      languages = item.languages.map(l => (typeof l === 'string' ? l : l.name || ''));
    } else if (typeof item.languages === 'object') {
      languages = Object.values(item.languages);
    }
  }

  // Capitais (suporte a múltiplas capitais como África do Sul, Bolívia, etc.)
  let capital = 'Sem capital declarada';
  let allCapitals = '';

  if (Array.isArray(item.capital) && item.capital.length > 0) {
    capital = item.capital[0];
    allCapitals = item.capital.join(', ');
  } else if (typeof item.capital === 'string' && item.capital.trim()) {
    capital = item.capital;
    allCapitals = item.capital;
  }

  // População garantida
  let population = 0;
  if (typeof item.population === 'number') {
    population = item.population;
  } else if (typeof item.population === 'string') {
    population = parseInt(item.population, 10) || 0;
  }

  const area = typeof item.area === 'number' ? item.area : (item.area_sq_km || 0);

  return {
    cca3,
    cca2,
    nameCommon: ptCommon || enCommon,
    nameEn: enCommon,
    nameOfficial: ptOfficial || enOfficial,
    nativeNames,
    flagUrl,
    flagAlt: `Bandeira de ${ptCommon || enCommon}`,
    coatOfArmsUrl,
    population,
    region: item.region || 'Outro',
    subregion: item.subregion || 'Não especificada',
    capital,
    allCapitals,
    area,
    continents: Array.isArray(item.continents) ? item.continents : [item.region || 'Outro'],
    currencies,
    languages,
    borders: Array.isArray(item.borders) ? item.borders : [],
    timezones: Array.isArray(item.timezones) ? item.timezones : [],
    googleMapsUrl: item.maps?.googleMaps || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(enCommon)}`,
    openStreetMapsUrl: item.maps?.openStreetMaps || '',
    latlng: Array.isArray(item.latlng) ? item.latlng : [0, 0],
  };
}

export async function fetchAllCountries() {
  // Retorna os 250 países com população verificada e normalizada instantaneamente
  if (Array.isArray(fallbackData) && fallbackData.length > 0) {
    return fallbackData.map(normalizeCountryData);
  }

  throw new Error('Não foi possível carregar os dados de países.');
}
