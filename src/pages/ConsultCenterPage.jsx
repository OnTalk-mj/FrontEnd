import React, { useState } from 'react';

const ConsultCenterPage = () => {
    const handleSearch = () => {
        console.log('조회 버튼 클릭됨');
        console.log('지역:', region);
        console.log('검색어:', keyword);
        console.log('선택한 분야:', fields);
        //추후 완성 예정
      };
      

  const [region, setRegion] = useState('');
  const [keyword, setKeyword] = useState('');
  const [fields, setFields] = useState([]);

  const fieldOptions = ['진로', '가족', '금전', '우울', '교우관계'];

  const handleCheckboxChange = (field) => {
    setFields((prev) =>
      prev.includes(field) ? prev.filter((f) => f !== field) : [...prev, field]
    );
  };

  // 테스트용 리스트
  const sampleData = [
    { region: '서울', name: '서울청소년상담센터', fields: ['진로', '우울'] },
    { region: '경기', name: '경기청소년복지센터', fields: ['가족'] },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h2 className="text-2xl font-bold mb-6">상담센터 찾기</h2>

      {/* 필터 박스 */}
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
        <div className="flex flex-wrap gap-4">
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
          <div className="flex justify-end ">
        <button
            onClick={handleSearch}  // 검색 조건 처리
            className="bg-[#FFFFFF] hover:bg-[#ddbca1] text-black px-4 py-2 rounded shadow rounded-3xl"
          >
            조회
        </button>
       </div>
        </div>
      </div>

      {/* 결과 리스트 */}
      <table className="w-full text-center border border-gray-300">
        <thead className="bg-[#faeddc] text-sm">
          <tr>
            <th className="py-2 px-4 border">지역</th>
            <th className="py-2 px-4 border">센터명</th>
            <th className="py-2 px-4 border">상담 분야</th>
          </tr>
        </thead>
        <tbody>
          {sampleData.map((item, idx) => (
            <tr key={idx} className="border-t">
              <td className="py-2 px-4 border">{item.region}</td>
              <td className="py-2 px-4 border">{item.name}</td>
              <td className="py-2 px-4 border">{item.fields.join(', ')}</td>
            </tr>
          ))}
        </tbody>
        
      </table>
      
    </div>
  );
};

export default ConsultCenterPage;
