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
  const pagesToShow = 5;
  const totalPages = Math.ceil(sortedCenters.length / centersPerPage);
  const totalBlocks = Math.ceil(totalPages / pagesToShow);
  const currentBlock = Math.floor((currentPage - 1) / pagesToShow);
  const startPage = currentBlock * pagesToShow + 1;
  const endPage = Math.min(startPage + pagesToShow - 1, totalPages);
  const [isLoading, setIsLoading] = useState(false);

  const formatWebsiteUrl = (url) => {
    if (!url) return '';
    return url.startsWith('http://') || url.startsWith('https://')
      ? url
      : `http://${url}`;
  };
  
  useEffect(() => {
    if (mapLoaded) {
      fetchCentersFromBackend();
    }
  }, [mapLoaded]);

  // Kakao Map Script 불러오기
  useEffect(() => {
    if (!document.getElementById('kakao-map-script')) {
      const script = document.createElement('script');
      script.id = 'kakao-map-script';
      script.src =
        'https://dapi.kakao.com/v2/maps/sdk.js?appkey=404aa3d99a8c3eaa2e7987ccf681c8d7&autoload=false&libraries=services';
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

  // 지도 생성 및 마커 표시
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
      markerRef.current.forEach((marker) => marker.setMap(null));
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
      <div style="
        box-sizing: border-box;
        width: 200px;
        padding: 8px 12px;
        font-size: 13px;
        white-space: normal;
        word-break: break-word;
        overflow-wrap: break-word;
        overflow: hidden;
        line-height: 1.4;
      ">
        <div style="font-weight: bold; margin-bottom: 4px;">${center.name}</div>
        <div>${center.region}</div>
        <div style="word-break: break-all;">📞 ${center.phone}</div>
        ${
          center.website
            ? `<div style="margin-top: 6px;">
                 <a href="${formatWebsiteUrl(center.website)}" target="_blank" rel="noopener noreferrer"
                   style="display:inline-block; margin-top:4px; padding:6px 10px; background:white; color:black; border-radius:20px; border: 1px solid black; font-size:12px; text-align:center; text-decoration:none; ">
                   홈페이지
                 </a>
               </div>`
            : ''
        }
      </div>
    `;

      window.kakao.maps.event.addListener(marker, 'click', () => {
        infowindow.setContent(content);
        infowindow.open(map, marker);
      });
    });
  }, [mapLoaded, sortedCenters]);

  // 거리 계산 함수
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

  // 상담센터 및 사용자 위치 불러오기
  const fetchCentersFromBackend = async () => {
  try {
    setIsLoading(true); // 로딩 시작
    const token = localStorage.getItem('accessToken');
    let userAddress = '서울 중구 세종대로 110'; // 기본 주소

    if (token) {
      const userResponse = await fetch('http://localhost:8000/api/accounts/mypage/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (userResponse.ok) {
        const userData = await userResponse.json();
        if (userData.address) {
          userAddress = userData.address;
        }
      }
    }

    // 주소 → 좌표 변환
    const geoRes = await new Promise((resolve, reject) => {
      const geocoder = new window.kakao.maps.services.Geocoder();
      geocoder.addressSearch(userAddress, (result, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          resolve({ lat: parseFloat(result[0].y), lng: parseFloat(result[0].x) });
        } else {
          reject('주소 좌표 변환 실패');
        }
      });
    });

    userCoordRef.current = geoRes;

    const res = await fetch(
      `http://localhost:8000/api/consult/centerlist/?region=${region}&keyword=${keyword}`
    );
    const data = await res.json();

    const geocoder = new window.kakao.maps.services.Geocoder();
    const centersWithCoords = await Promise.all(
      data.map((center) => {
        return new Promise((resolve) => {
          geocoder.addressSearch(center.address, (result, status) => {
            if (status === window.kakao.maps.services.Status.OK) {
              const latitude = parseFloat(result[0].y);
              const longitude = parseFloat(result[0].x);
              const distance = getDistance(geoRes.lat, geoRes.lng, latitude, longitude);
              resolve({ ...center, latitude, longitude, distance });
            } else {
              resolve(null);
            }
          });
        });
      })
    );

    const validCenters = centersWithCoords.filter((center) => center !== null);
    setSortedCenters(validCenters.sort((a, b) => a.distance - b.distance));
    setCurrentPage(1);
  } catch (err) {
    console.error('상담센터 불러오기 오류:', err);
  } finally {
    setIsLoading(false); // 로딩 종료
  }
};

  const handleSearch = () => {
    fetchCentersFromBackend();
  };

  const indexOfLast = currentPage * centersPerPage;
  const indexOfFirst = indexOfLast - centersPerPage;
  const currentCenters = sortedCenters.slice(indexOfFirst, indexOfLast);

  return (
    <div style={{ backgroundColor: '#FFFAF1', minHeight: '100vh' }}>
      <div className="max-w-5xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-bold mb-6">상담센터 찾기</h2>

        <div className="bg-[#ffffff] border-2 border-[#87C68C] p-6 rounded-xl shadow mb-8">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-1 font-semibold">지역</label>
              <input
                type="text"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full px-3 py-2 border rounded-2xl"
                placeholder="예: 서울"
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">검색어</label>
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="w-full px-3 py-2 border rounded-2xl"
                placeholder="센터명, 키워드"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleSearch}
              className="bg-[#87C68C] text-black px-4 py-2 rounded shadow rounded-3xl"
            >
              조회
            </button>
          </div>
        </div>
        {isLoading && (
          <div className="text-center text-gray-600 my-4 animate-pulse">
            상담센터 정보를 불러오는 중입니다...
          </div>
        )}
        <div
          id="map"
          className="w-full h-[400px] mb-6 border rounded-2xl"
          style={{ minHeight: '400px', display: 'block' }}
        />

        <table className="w-full text-center border border-[#87C68C] overflow-hidden">
          <thead className="bg-white text-sm">
            <tr>
              <th className="py-2 px-4 border-2 border-[#87C68C]">지역</th>
              <th className="py-2 px-4 border-2 border-[#87C68C]">센터명</th>
              <th className="py-2 px-4 border-2 border-[#87C68C]">거리 (km)</th>
            </tr>
          </thead>
          <tbody>
            {currentCenters.map((item, idx) => (
              <tr key={idx} className="border-t border-gray-300 bg-white">
                <td className="py-2 px-4 border">{item.region}</td>
                <td className="py-2 px-4 border">
                  <a
                    href={formatWebsiteUrl(item.website)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:bg-yellow-300"
                  >
                    {item.name}
                  </a>
                </td>
                <td className="py-2 px-4 border">{item.distance.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-center items-center mt-6 space-x-2">
          {/* 이전 블록 */}
          {currentBlock > 0 && (
            <button
              onClick={() => setCurrentPage(startPage - 1)}
              className="px-3 py-1 rounded-full border hover:bg-[#87C68C] hover:text-white"
            >
              ◀
            </button>
          )}

          {/* 페이지 번호 */}
          {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
            const page = startPage + i;
            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded-full transition-all duration-200 ${
                  currentPage === page
                    ? 'bg-[#87C68C] text-white font-semibold shadow-md'
                    : 'bg-white border hover:bg-[#f0f0f0]'
                }`}
              >
                {page}
              </button>
            );
          })}

          {/* 다음 블록 */}
          {currentBlock < totalBlocks - 1 && (
            <button
              onClick={() => setCurrentPage(endPage + 1)}
              className="px-3 py-1 rounded-full border hover:bg-[#87C68C] hover:text-white"
            >
              ▶
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConsultCenterPage;
