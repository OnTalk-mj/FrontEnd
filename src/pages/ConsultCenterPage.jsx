import React, { useState, useEffect, useRef } from 'react';

const ConsultCenterPage = () => {
  const [region, setRegion] = useState('');
  const [keyword, setKeyword] = useState('');
  const [sortedCenters, setSortedCenters] = useState([]);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const centersPerPage = 10;
  const markerRef = useRef([]);
  const mapRef = useRef(null);
  const userCoordRef = useRef(null);

  useEffect(() => {
    if (!document.getElementById('kakao-map-script')) {
      const script = document.createElement('script');
      script.id = 'kakao-map-script';
      script.src = 'https://dapi.kakao.com/v2/maps/sdk.js?appkey=404aa3d99a8c3eaa2e7987ccf681c8d7&autoload=false&libraries=services';
      script.async = true;
      script.onload = () => {
        window.kakao.maps.load(() => {
          setMapLoaded(true);
        });
      };
      document.head.appendChild(script);
    } else {
      if (window.kakao?.maps) {
        window.kakao.maps.load(() => {
          setMapLoaded(true);
        });
      }
    }
  }, []);

  useEffect(() => {
    if (!mapLoaded || sortedCenters.length === 0 || !userCoordRef.current) return;

    const container = document.getElementById('map');
    if (!container) return;

    const options = {
      center: new window.kakao.maps.LatLng(userCoordRef.current.lat, userCoordRef.current.lng),
      level: 5,
    };

    const map = new window.kakao.maps.Map(container, options);
    mapRef.current = map;

    const infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });

    if (markerRef.current.length > 0) {
      markerRef.current.forEach(marker => marker.setMap(null));
      markerRef.current = [];
    }

    sortedCenters.forEach((center) => {
      const marker = new window.kakao.maps.Marker({
        map,
        position: new window.kakao.maps.LatLng(center.latitude, center.longitude),
        title: center.name,
      });

      markerRef.current.push(marker);

      const content = `
        <div style="padding:8px 12px;font-size:14px;">
          <strong>${center.name}</strong><br/>
          <span>${center.region}</span><br/>
          <span>📞 ${center.phone}</span><br/>
        </div>
      `;

      window.kakao.maps.event.addListener(marker, 'click', () => {
        infowindow.setContent(content);
        infowindow.open(map, marker);
      });
    });
  }, [mapLoaded, sortedCenters]);

  const getDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLng = (lng2 - lng1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1 * Math.PI / 180) *
      Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLng / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const fetchCentersFromBackend = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const userResponse = await fetch('http://localhost:8000/api/accounts/mypage/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const userData = await userResponse.json();
      const userAddress = userData.address;

      const geoRes = await new Promise((resolve, reject) => {
        const geocoder = new window.kakao.maps.services.Geocoder();
        geocoder.addressSearch(userAddress, (result, status) => {
          if (status === window.kakao.maps.services.Status.OK) {
            resolve({ lat: parseFloat(result[0].y), lng: parseFloat(result[0].x) });
          } else {
            reject('사용자 주소 좌표 변환 실패');
          }
        });
      });

      userCoordRef.current = geoRes;

      const res = await fetch(`http://localhost:8000/api/consult/centerlist/?region=${region}&keyword=${keyword}`);
      const data = await res.json();

      const withDistance = data.map(center => {
        const distance = getDistance(geoRes.lat, geoRes.lng, center.latitude, center.longitude);
        return { ...center, distance };
      });

      setSortedCenters(withDistance.sort((a, b) => a.distance - b.distance));
      setCurrentPage(1);
    } catch (err) {
      console.error('상담센터 불러오기 오류:', err);
    }
  };

  const handleSearch = () => {
    fetchCentersFromBackend();
  };

  const indexOfLast = currentPage * centersPerPage;
  const indexOfFirst = indexOfLast - centersPerPage;
  const currentCenters = sortedCenters.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(sortedCenters.length / centersPerPage);

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h2 className="text-2xl font-bold mb-6">상담센터 찾기</h2>

      <div className="bg-[#87C68C] p-6 rounded-xl shadow mb-8">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-1 font-semibold">지역</label>
            <input
              type="text"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              placeholder="예: 서울"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">검색어</label>
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              placeholder="센터명, 키워드"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleSearch}
            className="bg-white hover:bg-[#ddbca1] text-black px-4 py-2 rounded shadow rounded-3xl"
          >
            조회
          </button>
        </div>
      </div>

      <div id="map" className="w-full h-[400px] mb-6 border rounded" style={{ minHeight: '400px', display: 'block' }} />

      <table className="w-full text-center border border-gray-300">
        <thead className="bg-[#87C68C] text-sm">
          <tr>
            <th className="py-2 px-4 border">지역</th>
            <th className="py-2 px-4 border">센터명</th>
            <th className="py-2 px-4 border">거리 (km)</th>
          </tr>
        </thead>
        <tbody>
          {currentCenters.map((item, idx) => (
            <tr key={idx} className="border-t">
              <td className="py-2 px-4 border">{item.region}</td>
              <td className="py-2 px-4 border">{item.name}</td>
              <td className="py-2 px-4 border">{item.distance.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center mt-6 space-x-2">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            className={`px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-[#87C68C] text-white' : 'bg-white border'}`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ConsultCenterPage;
