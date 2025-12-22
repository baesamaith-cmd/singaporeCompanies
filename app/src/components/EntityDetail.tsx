import 'leaflet/dist/leaflet.css';
import React, { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { useParams } from 'react-router-dom';
import { dataService } from '../lib/dataService';
import { getLatLngFromPostalCode } from '../lib/onemapService';

const EntityDetail: React.FC = () => {
  const { uen } = useParams<{ uen: string }>();
  const entity = dataService.getAllEntities().find(e => e.uen === uen);
  const [position, setPosition] = useState<[number, number] | null>(null);

  useEffect(() => {
    const loadPosition = async () => {
      if (entity?.postal_code) {
        console.log('EntityDetail: Loading position for postal code:', entity.postal_code);
        const latLng = await getLatLngFromPostalCode(entity.postal_code);
        if (latLng) {
          console.log('EntityDetail: Position set to:', latLng);
          setPosition(latLng);
        } else {
          console.log('EntityDetail: No position found for postal code:', entity.postal_code);
        }
      }
    };
    loadPosition();
  }, [entity]);

  if (!entity) {
    return <div className="p-4">Entity not found</div>;
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h1 className="text-3xl font-bold mb-2 text-gray-800">{entity.entity_name}</h1>
        <div className="border-t border-gray-200 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h2 className="text-lg font-semibold text-gray-700">기본 정보</h2>
              <div className="space-y-1 text-sm"><strong>UEN:</strong> {entity.uen}</div>
              <div className="space-y-1 text-sm"><strong>기업명:</strong> {entity.entity_name}</div>
              <div className="space-y-1 text-sm"><strong>기업 유형:</strong> {entity.entity_type_description}</div>
              <div className="space-y-1 text-sm"><strong>사업 구성:</strong> {entity.business_constitution_description}</div>
              <div className="space-y-1 text-sm"><strong>회사 유형:</strong> {entity.company_type_description}</div>
              <div className="space-y-1 text-sm"><strong>PAF 구성:</strong> {entity.paf_constitution_description}</div>
              <div className="space-y-1 text-sm"><strong>상태:</strong> {entity.entity_status_description}</div>
              <div className="space-y-1 text-sm"><strong>임원 수:</strong> {entity.no_of_officers}</div>
            </div>
            <div className="space-y-2 bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h2 className="text-lg font-semibold text-gray-700">날짜 정보</h2>
              <div className="space-y-1 text-sm"><strong>등록일:</strong> {entity.registration_incorporation_date?.toLocaleDateString()}</div>
              <div className="space-y-1 text-sm"><strong>UEN 발급 날짜:</strong> {entity.uen_issue_date?.toLocaleDateString()}</div>
              <div className="space-y-1 text-sm"><strong>계정 마감일:</strong> {entity.account_due_date?.toLocaleDateString()}</div>
              <div className="space-y-1 text-sm"><strong>연간 보고일:</strong> {entity.annual_return_date?.toLocaleDateString()}</div>
            </div>
            <div className="space-y-2 bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h2 className="text-lg font-semibold text-gray-700">주소 정보</h2>
              <div className="space-y-1 text-sm"><strong>주소 유형:</strong> {entity.address_type}</div>
              <div className="space-y-1 text-sm"><strong>블록:</strong> {entity.block}</div>
              <div className="space-y-1 text-sm"><strong>도로명:</strong> {entity.street_name}</div>
              <div className="space-y-1 text-sm"><strong>건물명:</strong> {entity.building_name}</div>
              <div className="space-y-1 text-sm"><strong>우편번호:</strong> {entity.postal_code}</div>
              <div className="space-y-1 text-sm"><strong>층:</strong> {entity.level_no}</div>
              <div className="space-y-1 text-sm"><strong>호수:</strong> {entity.unit_no}</div>
              <div className="space-y-1 text-sm"><strong>기타 주소 1:</strong> {entity.other_address_line1}</div>
              <div className="space-y-1 text-sm"><strong>기타 주소 2:</strong> {entity.other_address_line2}</div>
            </div>
            <div className="space-y-2 bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h2 className="text-lg font-semibold text-gray-700">SSIC 정보</h2>
              <div className="space-y-1 text-sm"><strong>주 SSIC 코드:</strong> {entity.primary_ssic_code}</div>
              <div className="space-y-1 text-sm"><strong>주 SSIC 설명:</strong> {entity.primary_ssic_description}</div>
              <div className="space-y-1 text-sm"><strong>주 사용자 설명 활동:</strong> {entity.primary_user_described_activity}</div>
              <div className="space-y-1 text-sm"><strong>부 SSIC 코드:</strong> {entity.secondary_ssic_code}</div>
              <div className="space-y-1 text-sm"><strong>부 SSIC 설명:</strong> {entity.secondary_ssic_description}</div>
              <div className="space-y-1 text-sm"><strong>부 사용자 설명 활동:</strong> {entity.secondary_user_described_activity}</div>
            </div>
          </div>
        </div>
      </div>
      {position && (
        <div className="mt-8 mx-auto bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4 text-gray-800">위치: {entity.block}, {entity.street_name}, {entity.building_name}, {entity.postal_code}</h2>
          <div className="w-full h-64 border border-gray-200 rounded-lg overflow-hidden">
            <MapContainer center={position} zoom={15} style={{ height: '100%', width: '100%' }}>
              <TileLayer
                url="https://www.onemap.gov.sg/maps/tiles/Default/{z}/{x}/{y}.png"
                detectRetina={true}
                maxZoom={19}
                minZoom={11}
                attribution='<img src="https://www.onemap.gov.sg/web-assets/images/logo/om_logo.png" style="height:20px;width:20px;"/>&nbsp;<a href="https://www.onemap.gov.sg/" target="_blank" rel="noopener noreferrer">OneMap</a>&nbsp;&copy;&nbsp;contributors&nbsp;&#124;&nbsp;<a href="https://www.sla.gov.sg/" target="_blank" rel="noopener noreferrer">Singapore Land Authority</a>'
              />
              <Marker position={position}>
                <Popup>
                  {entity.entity_name}<br />
                  {entity.postal_code}
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      )}
      {!position && entity?.postal_code && (
        <div className="mt-8 mx-auto bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4 text-gray-800">위치: {entity.block}, {entity.street_name}, {entity.building_name}, {entity.postal_code} </h2>
          <div className="w-full h-64 flex justify-center items-center bg-gray-100 border border-gray-200 rounded-lg">
            <p className="text-gray-500">우편번호 {entity.postal_code}에 대한 지도를 불러올 수 없습니다.</p>
          </div>
        </div>
      )}
      <div className="mt-6 flex justify-center">
        <button onClick={() => window.history.back()} className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">뒤로</button>
      </div>
    </div>
  );
};

export default EntityDetail;