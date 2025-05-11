import React, { useState, useEffect } from 'react';

const ConsultCenterPage = () => {
  const [region, setRegion] = useState('');
  const [keyword, setKeyword] = useState('');
  const [fields, setFields] = useState([]);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [sortedCenters, setSortedCenters] = useState([]);

  const fieldOptions = ['진로', '가족', '금전', '우울', '교우관계'];

  const handleCheckboxChange = (field) => {
    setFields((prev) =>
      prev.includes(field) ? prev.filter((f) => f !== field) : [...prev, field]
    );
  };

  const sampleData = [
    {
      region: '서울',
      name: '서울청소년상담센터',
      fields: ['진로', '우울'],
      address: '서울특별시 강남구 테헤란로 212',
      phone: '02-123-4567',
      link: 'https://seoulcenter.or.kr'
    },
    {
      region: '경기',
      name: '경기청소년복지센터',
      fields: ['가족'],
      address: '경기도 수원시 팔달구 효원로 1',
      phone: '031-987-6543',
      link: 'https://ggcenter.or.kr'
    },
    {
      region: '서울',
      name: '서울가족상담소',
      fields: ['가족', '우울'],
      address: '서울특별시 종로구 사직로 8길',
      phone: '02-555-0000',
      link: 'https://familycenter.or.kr'
    },
  ];

  const handleSearch = () => {
    processCenters();
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://dapi.kakao.com/v2/maps/sdk.js?appkey=7aca63350baec1aed973206144f0c889&autoload=false&libraries=services';
    script.async = true;
    script.onload = () => {
      window.kakao.maps.load(() => setMapLoaded(true));
    };
    document.head.appendChild(script);
  }, []);

  const geocodeAddress = (address) => {
    return new Promise((resolve, reject) => {
      const geocoder = new window.kakao.maps.services.Geocoder();
      geocoder.addressSearch(address, function (result, status) {
        if (status === window.kakao.maps.services.Status.OK && result.length > 0) {
          resolve({ lat: parseFloat(result[0].y), lng: parseFloat(result[0].x) });
        } else {
          reject('주소 변환 실패');
        }
      });
    });
  };

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

  const processCenters = async () => {
    try {
      const userCoord = await geocodeAddress('서울특별시 강남구 테헤란로 212');
      const filteredData = sampleData.filter((center) => {
        const regionMatch = region ? center.region.includes(region) : true;
        const keywordMatch = keyword ? center.name.includes(keyword) : true;
        const fieldMatch = fields.length > 0 ? fields.some(f => center.fields.includes(f)) : true;
        return regionMatch && keywordMatch && fieldMatch;
      });

      const results = await Promise.all(
        filteredData.map(async (center) => {
          try {
            const coord = await geocodeAddress(center.address);
            const distance = getDistance(userCoord.lat, userCoord.lng, coord.lat, coord.lng);
            return { ...center, coord, distance };
          } catch {
            return null;
          }
        })
      );
      const filtered = results.filter(Boolean);
      setSortedCenters(filtered.sort((a, b) => a.distance - b.distance));
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (!mapLoaded || !sortedCenters.length) return;

    const container = document.getElementById('map');
    const options = {
      center: new window.kakao.maps.LatLng(
        sortedCenters[0].coord.lat,
        sortedCenters[0].coord.lng
      ),
      level: 5,
    };
    const map = new window.kakao.maps.Map(container, options);

    const infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });

    sortedCenters.forEach((center) => {
      const marker = new window.kakao.maps.Marker({
        map,
        position: new window.kakao.maps.LatLng(center.coord.lat, center.coord.lng),
        title: center.name,
      });

      const content = `
        <div style="padding:8px 12px;font-size:14px;">
          <strong>${center.name}</strong><br/>
          <span>${center.region} · ${center.fields.join(', ')}</span><br/>
          <span>📞 ${center.phone}</span><br/>
          <a href="${center.link}" target="_blank" style="color:blue; text-decoration:underline;">홈페이지 방문</a>
        </div>
      `;

      window.kakao.maps.event.addListener(marker, 'click', () => {
        infowindow.setContent(content);
        infowindow.open(map, marker);
      });
    });
  }, [mapLoaded, sortedCenters]);

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h2 className="text-2xl font-bold mb-6">상담센터 찾기</h2>

      <div className="bg-[#faeddc] p-6 rounded-xl shadow mb-8">
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

        <div className="mb-2 font-semibold">상담 분야</div>
        <div className="flex flex-wrap gap-4 items-center">
          {fieldOptions.map((field) => (
            <label key={field} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={fields.includes(field)}
                onChange={() => handleCheckboxChange(field)}
              />
              {field}
            </label>
          ))}
          <div className="flex justify-end ml-auto">
            <button
              onClick={handleSearch}
              className="bg-white hover:bg-[#ddbca1] text-black px-4 py-2 rounded shadow rounded-3xl"
            >
              조회
            </button>
          </div>
        </div>
      </div>

      <div id="map" className="w-full h-[400px] mb-6 border rounded" />

      <table className="w-full text-center border border-gray-300">
        <thead className="bg-[#faeddc] text-sm">
          <tr>
            <th className="py-2 px-4 border">지역</th>
            <th className="py-2 px-4 border">센터명</th>
            <th className="py-2 px-4 border">상담 분야</th>
            <th className="py-2 px-4 border">거리 (km)</th>
          </tr>
        </thead>
        <tbody>
          {sortedCenters.map((item, idx) => (
            <tr key={idx} className="border-t">
              <td className="py-2 px-4 border">{item.region}</td>
              <td className="py-2 px-4 border">{item.name}</td>
              <td className="py-2 px-4 border">{item.fields.join(', ')}</td>
              <td className="py-2 px-4 border">{item.distance.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ConsultCenterPage;
