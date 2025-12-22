import 'leaflet/dist/leaflet.css';
import React, { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import type { Entity } from '../lib/dataService';
import { getLatLngFromPostalCode } from '../lib/onemapService';

interface PostalCodeMapProps {
  entities: Entity[];
}

const PostalCodeMap: React.FC<PostalCodeMapProps> = ({ entities }) => {
  const [markers, setMarkers] = useState<Array<{ position: [number, number]; entity: Entity }>>([]);
  const [loadingMarkers, setLoadingMarkers] = useState(true);

  useEffect(() => {
    const loadMarkers = async () => {
      setLoadingMarkers(true);
      console.log('PostalCodeMap: Received entities count:', entities.length);
      const newMarkers: Array<{ position: [number, number]; entity: Entity }> = [];
      const entitiesToProcess = entities.filter(e => e.postal_code).slice(0, 100); // Limit for performance

      for (const entity of entitiesToProcess) {
        if (entity.postal_code) { // Ensure postal_code is not null
          const latLng = await getLatLngFromPostalCode(entity.postal_code);
          if (latLng) {
            newMarkers.push({ position: latLng, entity });
          }
        }
      }
      setMarkers(newMarkers);
      setLoadingMarkers(false);
      console.log('PostalCodeMap: Generated markers count:', newMarkers.length);
      console.log('PostalCodeMap: First 5 markers:', newMarkers.slice(0, 5));
    };

    loadMarkers();
  }, [entities]); // Re-run when entities change

  if (loadingMarkers) {
    return <div className="w-full h-64 flex justify-center items-center">Loading map markers...</div>;
  }

  return (
    <div className="w-full h-64">
      <MapContainer center={[1.3521, 103.8198]} zoom={11} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://www.onemap.gov.sg/maps/tiles/Default/{z}/{x}/{y}.png"
          detectRetina={true}
          maxZoom={19}
          minZoom={11}
          attribution='<img src="https://www.onemap.gov.sg/web-assets/images/logo/om_logo.png" style="height:20px;width:20px;"/>&nbsp;<a href="https://www.onemap.gov.sg/" target="_blank" rel="noopener noreferrer">OneMap</a>&nbsp;&copy;&nbsp;contributors&nbsp;&#124;&nbsp;<a href="https://www.sla.gov.sg/" target="_blank" rel="noopener noreferrer">Singapore Land Authority</a>'
        />
        {markers.map((marker, index) => (
          <Marker key={index} position={marker.position as [number, number]}>
            <Popup>
              {marker.entity.entity_name}<br />
              {marker.entity.postal_code}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default PostalCodeMap;