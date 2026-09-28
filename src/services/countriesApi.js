/**
 * Serviço de integração com a API de Países
 * Com suporte a múltiplos endpoints e fallback local com 250 países
 */
import fallbackData from '../data/countriesFallback.json';

const PRIMARY_API = 'https://raw.githubusercontent.com/mledoze/countries/master/countries.json';
const BACKUP_API = 'https://restcountries.com/v3.1/all';

function normalizeCountryData(item) {
  const cca2 = (item.cca2 || '').toLowerCase();
  const cca3 = item.cca3 || '';
  
  // Nome em português se disponível
  const ptCommon = item.translations?.por?.common || '';
  const ptOfficial = item.translations?.por?.official || '';
  const enCommon = item.name?.common || 'Desconhecido';
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

  // Capitais
  const capital = Array.isArray(item.capital) && item.capital.length > 0 
    ? item.capital[0] 
    : (typeof item.capital === 'string' ? item.capital : 'Sem capital declarada');

  const allCapitals = Array.isArray(item.capital) ? item.capital.join(', ') : capital;

  // População
  const population = typeof item.population === 'number' ? item.population : 0;
  const area = typeof item.area === 'number' ? item.area : 0;

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
  try {
    // 1. Tentar primeiro o endpoint JSON aberto e rápido
    const response = await fetch(PRIMARY_API, {
      headers: { Accept: 'application/json' }
    });

    if (response.ok) {
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        return data.map(normalizeCountryData);
      }
    }
  } catch (err) {
    console.warn('Falha na fonte primária, tentando fonte de backup...', err);
  }

  try {
    // 2. Tentar endpoint secundário
    const backupRes = await fetch(BACKUP_API);
    if (backupRes.ok) {
      const data = await backupRes.json();
      if (Array.isArray(data) && data.length > 0) {
        return data.map(normalizeCountryData);
      }
    }
  } catch (err) {
    console.warn('Falha no backup online, utilizando dataset local garantido...', err);
  }

  // 3. Fallback garantido local de 250 países
  if (Array.isArray(fallbackData) && fallbackData.length > 0) {
    return fallbackData.map(normalizeCountryData);
  }

  throw new Error('Não foi possível carregar os dados de países.');
}
