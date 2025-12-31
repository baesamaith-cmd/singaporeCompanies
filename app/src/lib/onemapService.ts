// app/src/lib/onemapService.ts

const ONEMAP_API_URL = 'https://www.onemap.gov.sg/api/common/elastic/search';
const ONEMAP_TOKEN = import.meta.env.VITE_ONEMAP_TOKEN; // Assuming this environment variable name

console.log('OneMap Token:', ONEMAP_TOKEN ? 'Token is set' : 'Token is NOT set');
console.log('OneMap Token value:', ONEMAP_TOKEN);

export async function getLatLngFromPostalCode(postalCode: number): Promise<[number, number] | null> {
  if (!ONEMAP_TOKEN) {
    console.error('OneMap API token is not set. Please ensure VITE_ONEMAP_TOKEN is in your .env file.');
    return null;
  }

  const url = `${ONEMAP_API_URL}?searchVal=${postalCode}&returnGeom=Y&getAddrDetails=Y`;
  const headers = {
    'Authorization': `${ONEMAP_TOKEN}`
  };

  try {
    const response = await fetch(url, {
      headers: headers
    });
    if (!response.ok) {
      console.error(`OneMap API request failed for postal code ${postalCode}: ${response.statusText}`);
      return null;
    }
    const result = await response.json();

    // OneMap Search API returns results in a different format
    if (result.results && result.results.length > 0) {
      const lat = parseFloat(result.results[0].LATITUDE);
      const lng = parseFloat(result.results[0].LONGITUDE);
      if (!isNaN(lat) && !isNaN(lng)) {
        return [lat, lng];
      }
    }
    console.warn(`OneMap API did not return valid Lat/Lng for postal code: ${postalCode}`);
    return null;
  } catch (error) {
    console.error(`Error fetching Lat/Lng from OneMap for postal code ${postalCode}:`, error);
    return null;
  }
}
