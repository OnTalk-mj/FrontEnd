import React, { useState } from 'react';

const questionSets = {
  우울: [
    '평소에는 아무렇지도 않던 일들이 괴롭고 귀찮게 느껴졌다.',
    '먹고 싶지 않고 식욕도 없다.',
    '가족이나 친구들과 어울리고 싶지 않았다.',
    '잠을 설쳤다 (잠들기 어렵거나 자주 깼다).',
    '모든 일에 에너지가 없고 무기력했다.',
    '이유 없이 슬퍼지거나 눈물이 났다.',
    '내가 실패자이고 인생이 헛되다고 느꼈다.',
    '집중이 잘 되지 않았다.',
    '불안하고 초조한 느낌이 들었다.',
    '아무 것도 나아질 것 같지 않고 절망스러웠다.',
    '내가 다른 사람보다 못하다고 느꼈다.',
    '하루 대부분을 침대나 소파에서 보냈다.',
    '나에 대한 부정적인 생각이 반복되었다.',
    '평소 즐기던 활동에도 흥미가 떨어졌다.',
    '가끔 이유 없이 짜증이 났다.',
    '무기력해서 해야 할 일을 미뤘다.',
    '혼자 있고 싶은 마음이 강해졌다.',
    '자신을 돌보는 것이 귀찮게 느껴졌다.',
    '하루가 너무 길게 느껴졌다.',
    '자주 한숨을 쉬고 깊은 피로감을 느꼈다.',
  ],
    불안감: [
    '최근 며칠 동안, 불안하거나 초조한 느낌이 들었다.',
    '걱정을 멈출 수 없거나 조절할 수 없었다.',
    '여러 가지 일에 대해 과도하게 걱정했다.',
    '평소보다 긴장되거나 쉽게 놀랐다.',
    '짜증이 나거나 쉽게 화가 났다.',
    '불안으로 인해 일상생활에 지장이 있었다.',
    '몸이 뻣뻣하거나 근육이 긴장되었다.',
    '잠이 잘 오지 않거나 자주 깼다.',
    '숨이 가쁘거나 과호흡한 적이 있었다.',
    '식은땀이 나거나 심장이 빠르게 뛰었다.',
    '불길한 예감이 들거나 나쁜 일이 일어날 것 같았다.',
    '사람들과 있는 것이 부담스럽거나 회피하고 싶었다.',
    '혼자 있는 것이 불안하거나 두려웠다.',
    '불안한 상태가 하루 종일 지속되었다.',
    '불안으로 인해 식사, 수면, 집중력에 변화가 생겼다.',
    '불안을 줄이기 위해 반복적인 행동을 한 적이 있다.',
    '공공장소에서 이유 없이 긴장하거나 피하고 싶었다.',
    '불안한 생각이 머리에서 떠나지 않았다.',
    '마음이 조급하고 가슴이 답답하게 느껴졌다.',
    '불안이 심해서 병원 진료나 상담을 고려한 적이 있다.',
  ],
  분노조절: [
    '화가 날 때 쉽게 짜증을 낸다.',
    '작은 일에도 예민하게 반응한다.',
    '화를 참는 것이 어렵다.',
    '화를 낸 후 후회한 적이 있다.',
    '화를 표현할 방법을 몰라 속으로 쌓아둔다.',
    '화를 낼 때 물건을 던지거나 부순 적이 있다.',
    '말이나 행동으로 상대를 위협한 적이 있다.',
    '분노가 가라앉는데 시간이 오래 걸린다.',
    '화를 낸 후 대인관계에 문제가 생긴 적이 있다.',
    '자신의 분노로 인해 실수를 한 경험이 있다.',
    '화를 조절하지 못해 학업이나 업무에 지장이 있었다.',
    '분노를 느낄 때 신체적으로 긴장되거나 두근거린다.',
    '분노를 표현하지 못해 속이 답답한 경우가 많다.',
    '과거의 분노를 반복해서 떠올린다.',
    '분노가 너무 커져 폭력 충동을 느낀 적이 있다.',
    '화를 내고 나서도 속이 풀리지 않는다.',
    '화를 내지 않으면 무시당할까봐 걱정된다.',
    '화를 내는 나 자신이 싫다.',
    '감정을 말로 표현하는 것이 어렵게 느껴진다.',
    '분노를 조절할 수 있는 방법을 알고 싶다.',
  ],
  스트레스: [
    '최근 한 달간 스트레스를 많이 받았다고 느꼈다.',
    '예상치 못한 일이 생기면 불안하거나 긴장된다.',
    '중요한 일의 통제권을 잃었다고 느낀다.',
    '짜증을 잘 내거나 쉽게 지친다.',
    '작은 일도 쉽게 걱정하게 된다.',
    '내가 원하는 대로 일이 되지 않는다.',
    '일이나 책임이 너무 많아 감당하기 어렵다.',
    '자신의 능력에 의심이 생긴다.',
    '문제를 해결하기 어렵다고 느낀다.',
    '자신의 감정을 조절하기 어렵다.',
    '충분한 휴식을 취하지 못했다.',
    '스트레스가 쌓여 신체적으로 아픈 느낌이 든다.',
    '무기력하고 의욕이 없다.',
    '남들과 비교하며 위축되는 경우가 많다.',
    '스트레스를 회피하려는 경향이 있다.',
    '최근 체력이나 수면이 감소했다.',
    '스트레스로 인해 실수가 잦아졌다.',
    '불안하거나 불쾌한 기분이 자주 든다.',
    '자신을 돌볼 시간이 부족하다고 느낀다.',
    '긴장된 상황에서 여유를 가지기 어렵다.',
  ],
  자존감: [
    '나는 나 자신을 긍정적으로 평가한다.',
    '나는 나를 가치 있는 사람이라고 생각한다.',
    '나는 나 자신을 자랑스럽게 여긴다.',
    '나는 대체로 나 자신에게 만족한다.',
    '나는 다른 사람들과 동등한 사람이라고 느낀다.',
    '나는 내가 잘하는 점을 알고 있다.',
    '나는 내가 어떤 어려움도 극복할 수 있다고 믿는다.',
    '나는 실수해도 나 자신을 탓하지 않는다.',
    '나는 실패해도 내 가치는 변하지 않는다고 믿는다.',
    '나는 내 감정과 생각을 솔직히 표현할 수 있다.',
    '나는 타인의 시선보다 내 기준을 더 중요하게 여긴다.',
    '나는 내가 노력한 것에 대해 스스로 칭찬할 수 있다.',
    '나는 나를 있는 그대로 받아들이려 한다.',
    '나는 비난보다 격려를 먼저 떠올린다.',
    '나는 비교보다 성장에 집중하려 노력한다.',
    '나는 단점이 있어도 충분히 괜찮은 사람이라 느낀다.',
    '나는 내가 좋아하는 모습을 알고 있다.',
    '나는 내 삶의 방향을 스스로 선택할 수 있다.',
    '나는 나 자신에게 감사한 마음이 있다.',
    '나는 나를 소중히 여긴다.',
  ],
  인터넷중독: [
    '인터넷 사용 시간이 예상보다 길어지는 경우가 많다.',
    '자려고 누워도 스마트폰이나 인터넷을 끄지 못한다.',
    '인터넷을 하지 않으면 불안하거나 짜증이 난다.',
    '인터넷 사용을 줄이려 하지만 잘 되지 않는다.',
    '인터넷 때문에 해야 할 일을 미룬 적이 있다.',
    '공부나 일보다 인터넷을 먼저 하게 된다.',
    '인터넷을 하느라 수면 시간이 줄어들었다.',
    '온라인에 있지 않으면 소외감을 느낀다.',
    '오프라인보다 온라인에서 더 편하다.',
    '인터넷 사용을 부모나 친구에게 숨긴 적이 있다.',
    '실제로 만나기보단 메신저나 SNS를 선호한다.',
    '인터넷 사용으로 인해 성적이나 업무 성과가 떨어졌다.',
    '식사나 이동 중에도 인터넷을 끊지 않는다.',
    '현실보다 온라인 세상이 더 즐겁다고 느낀다.',
    '현실 스트레스를 인터넷으로 잊으려 한다.',
    '하루에 4시간 이상 인터넷을 사용하는 날이 많다.',
    '기분이 안 좋을 때 인터넷으로 달래려 한다.',
    '자신도 모르게 웹서핑을 계속한 적이 있다.',
    '인터넷 사용을 통제할 수 없다고 느낀다.',
    '인터넷을 하지 않으면 우울하거나 공허하다.',
  ],
};


const categories = Object.keys(questionSets);

const Test = () => {
  const [activeCategory, setActiveCategory] = useState('우울');
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState(Array(questionSets[activeCategory].length).fill(null));
  const [showResult, setShowResult] = useState(false);
  const positiveScoringCategories = ['자존감'];

  const questions = questionSets[activeCategory];
const choices = [
  {
    label: (
      <>
        극히 드물었다<br />
        <span className="text-sm text-gray-500">(1주일에 1일 이하)</span>
      </>
    ),
    value: 0,
  },
  {
    label: (
      <>
        가끔 있었다<br />
        <span className="text-sm text-gray-500">(1주일에 1~2일간)</span>
      </>
    ),
    value: 1,
  },
  {
    label: (
      <>
        종종 있었다<br />
        <span className="text-sm text-gray-500">(1주일에 3~4일간)</span>
      </>
    ),
    value: 2,
  },
  {
    label: (
      <>
        대부분 그랬다<br />
        <span className="text-sm text-gray-500">(1주일에 5일 이상)</span>
      </>
    ),
    value: 3,
  },
];


  const selectAnswer = (val) => {
    const updated = [...answers];
    updated[current] = val;
    setAnswers(updated);
  };

  const next = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      setShowResult(true);
    }
  };

  const prev = () => {
    if (current > 0) setCurrent(current - 1);
  };

  const totalScore = answers.reduce((sum, val) => {
  const actualValue = val ?? 0;
  return sum + (
    positiveScoringCategories.includes(activeCategory)
      ? 3 - actualValue
      : actualValue
  );
}, 0);
  const maxScore = questions.length * 3;
  const severity = totalScore <= 13 ? '정상 범위' : totalScore <= 27 ? '가벼운 증상' : totalScore <= 40 ? '중등도' : '심각';

  const resetCategory = (cat) => {
    setActiveCategory(cat);
    setAnswers(Array(questionSets[cat].length).fill(null));
    setCurrent(0);
    setShowResult(false);
  };

  return (
    <div className='min-h-screen bg-[#FFFAF1]'>
      
    <div className="max-w-3xl mx-auto px-6 py-10 font-sans bg-[#FFFAF1]">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">
        나의 마음건강을 체크해 보세요.<br className="sm:hidden" /> <span className="text-[#f28398]">심리 자가진단 테스트</span>
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 border border-gray-200 mb-10">
        {categories.map((cat, idx) => (
          <button
            key={idx}
            onClick={() => resetCategory(cat)}
            className={`p-3 border border-gray-200 text-sm font-medium ${
              activeCategory === cat ? 'bg-[#87C68C] text-white' : 'bg-white text-gray-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {!showResult ? (
        <div className="bg-white border border-gray-200 rounded-xl px-6 py-8 shadow-md">
          <div className="text-gray-600 mb-1">{String(current + 1).padStart(2, '0')} | 총 {questions.length} 문항</div>
          <h2 className="text-lg sm:text-xl font-bold text-black mb-6">
            지난 일주일간 나는?<br /><span className="text-lg font-semibold text-gray-800">{questions[current]}</span>
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            {choices.map((c, idx) => (
              <button
                key={idx}
                onClick={() => selectAnswer(c.value)}
                className={`border rounded-full py-2 px-3 text-sm transition ${
                  answers[current] === c.value ? 'bg-[#87C68C] text-white border-[#87C68C]' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div className="flex justify-between">
            <button onClick={prev} disabled={current === 0} className="px-5 py-2 border rounded shadow-sm disabled:opacity-30">이전</button>
            <button
              onClick={next}
              disabled={answers[current] === null}
              className="bg-[#87C68C] text-white px-8 py-2 rounded shadow disabled:opacity-50"
            >
              {current === questions.length - 1 ? '결과 보기' : '다음'}
            </button>
          </div>

          <p className="text-xs text-gray-400 mt-8">
            * 본 검사는 전문가의 진단을 대체하는 것이 아니며 참고용으로만 활용해주세요. <br />
            * 청소년용 간이판별 문항 기반으로 제공됩니다.
          </p>
        </div>
      ) : (
        <div className="bg-white border p-6 rounded-xl shadow text-center">
          <h2 className="text-xl font-bold mb-4">🧠 {activeCategory} 자가진단 결과</h2>
          <p className="text-gray-800 mb-2">총점: <strong>{totalScore}</strong> / {maxScore}</p>
          <p className="text-lg font-semibold text-[#87C68C]">판정: {severity}</p>
          <p className="text-sm text-gray-500 mt-4">※ 본 검사는 참고용이며, 정확한 진단을 위해 전문가의 상담이 필요합니다.</p>
        </div>
      )}
    </div>
    </div>
  );
};

export default Test;
