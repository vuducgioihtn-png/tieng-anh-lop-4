import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Volume2,
  Check,
  RotateCcw,
  Sparkles,
  Globe,
  Compass,
  CheckCircle2,
  Lightbulb,
  Award,
  Layers,
  Heart
} from 'lucide-react';
import { sound, speakWord } from '../../utils/audio';

interface Review3ExtensionProps {
  speechRate: number;
  onAddStar: (count: number) => void;
}

interface WorldStory {
  id: string;
  country: string;
  flag: string;
  name: string;
  photoIcon: string;
  locationEn: string;
  locationVi: string;
  parentsEn: string;
  parentsVi: string;
  appearanceEn: string;
  appearanceVi: string;
  weekendEn: string;
  weekendVi: string;
  quizQuestion: string;
  quizOptions: string[];
  correctOption: string;
}

interface VocabItem {
  id: number;
  word: string;
  ipa: string;
  meaningVi: string;
  category: 'home' | 'jobs' | 'appearance' | 'daily' | 'weekend';
}

export const Review3Extension: React.FC<Review3ExtensionProps> = ({
  speechRate,
  onAddStar
}) => {
  // =========================================================================
  // PART 1: WORLD STORIES (CÂU CHUYỆN GIA ĐÌNH VÒNG QUANH THẾ GIỚI)
  // =========================================================================
  const worldStories: WorldStory[] = [
    {
      id: 'uk',
      country: 'Vương Quốc Anh (United Kingdom)',
      flag: '🇬🇧',
      name: 'Oliver ở Thủ đô London',
      photoIcon: '👦🏼',
      locationEn: 'Oliver lives in a quiet suburb of London with a green garden.',
      locationVi: 'Oliver sống ở một vùng ngoại ô yên bình của London với khu vườn xanh ngát.',
      parentsEn: 'His father is a computer engineer, and his mother is a dentist in a clinic.',
      parentsVi: 'Bố của bạn là kỹ sư máy tính, còn mẹ là bác sĩ nha khoa tại một phòng khám.',
      appearanceEn: 'His father is tall and wears glasses. His mother has short blonde hair.',
      appearanceVi: 'Bố bạn cao ráo và đeo kính. Mẹ bạn có mái tóc vàng ngắn.',
      weekendEn: 'At the weekend, the whole family rides bicycles in Hyde Park and watches football.',
      weekendVi: 'Vào cuối tuần, cả gia đình đạp xe dạo chơi trong công viên Hyde Park và xem bóng đá.',
      quizQuestion: 'Where does Oliver’s family ride bikes on Saturdays?',
      quizOptions: ['In Hyde Park', 'In the supermarket', 'At the cinema'],
      correctOption: 'In Hyde Park'
    },
    {
      id: 'aus',
      country: 'Nước Úc (Australia)',
      flag: '🇦🇺',
      name: 'Chloe ở Thành phố Sydney',
      photoIcon: '👧🏼',
      locationEn: 'Chloe lives in a bright apartment near Bondi Beach in Sydney.',
      locationVi: 'Chloe sống trong một căn hộ tràn ngập ánh nắng gần bãi biển Bondi ở Sydney.',
      parentsEn: 'Her mother is a vet at an animal clinic, and her father is a seafood chef.',
      parentsVi: 'Mẹ bạn là bác sĩ thú y ở phòng khám động vật, còn bố là đầu bếp món hải sản.',
      appearanceEn: 'Her mother is slim and has long brown hair. Her father has a friendly round face.',
      appearanceVi: 'Mẹ bạn dáng thon thả với mái tóc nâu dài. Bố bạn có gương mặt tròn thân thiện.',
      weekendEn: 'On Sundays, they go to the beach to swim and enjoy an outdoor barbecue.',
      weekendVi: 'Vào Chủ nhật, họ ra bãi biển bơi lội và thưởng thức bữa tiệc thịt nướng BBQ ngoài trời.',
      quizQuestion: 'What does Chloe’s mother do?',
      quizOptions: ['She is a vet', 'She is a factory worker', 'She is a farmer'],
      correctOption: 'She is a vet'
    },
    {
      id: 'vn',
      country: 'Việt Nam',
      flag: '🇻🇳',
      name: 'Bé An ở Phố cổ Hội An',
      photoIcon: '👧🏻',
      locationEn: 'An lives in a historic house on a peaceful street in Hoi An ancient town.',
      locationVi: 'An sống trong một ngôi nhà cổ trên con phố thanh bình ở phố cổ Hội An.',
      parentsEn: 'Her father is a woodcarver, and her mother makes colourful silk lanterns.',
      parentsVi: 'Bố bạn là nghệ nhân điêu khắc gỗ, còn mẹ làm những chiếc đèn lồng lụa sắc màu.',
      appearanceEn: 'Her parents are very warm and have bright smiles.',
      appearanceVi: 'Bố mẹ bạn rất ấm áp và luôn nở nụ cười tươi sáng.',
      weekendEn: 'On weekends, they row a small boat on the Hoai River and release paper lanterns.',
      weekendVi: 'Vào cuối tuần, cả nhà chèo chiếc thuyền nhỏ trên sông Hoài và thả đèn hoa đăng lấp lánh.',
      quizQuestion: 'Where does An live?',
      quizOptions: ['In Hoi An ancient town', 'In New York', 'In a big noisy factory'],
      correctOption: 'In Hoi An ancient town'
    }
  ];

  const [activeStoryId, setActiveStoryId] = useState<string>('uk');
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  const [storyStarsGiven, setStoryStarsGiven] = useState<Record<string, boolean>>({});

  const currentStory = worldStories.find(s => s.id === activeStoryId)!;

  const handleSelectQuiz = (storyId: string, option: string) => {
    sound.playClick();
    setQuizAnswers(prev => ({ ...prev, [storyId]: option }));
    if (option === currentStory.correctOption && !storyStarsGiven[storyId]) {
      sound.playSuccess();
      onAddStar(2);
      setStoryStarsGiven(prev => ({ ...prev, [storyId]: true }));
    }
  };

  // =========================================================================
  // PART 2: CATEGORY QUEST (PHÂN LOẠI TỪ VỰNG UNITS 11 - 15)
  // =========================================================================
  const allVocab: VocabItem[] = [
    { id: 1, word: 'village', ipa: '/ˈvɪlɪdʒ/', meaningVi: 'ngôi làng', category: 'home' },
    { id: 2, word: 'flat', ipa: '/flæt/', meaningVi: 'căn hộ', category: 'home' },
    { id: 3, word: 'tower', ipa: '/ˈtaʊə/', meaningVi: 'toà tháp cao', category: 'home' },
    { id: 4, word: 'doctor', ipa: '/ˈdɒktə/', meaningVi: 'bác sĩ', category: 'jobs' },
    { id: 5, word: 'hospital', ipa: '/ˈhɒspɪtl/', meaningVi: 'bệnh viện', category: 'jobs' },
    { id: 6, word: 'factory', ipa: '/ˈfæktəri/', meaningVi: 'nhà máy', category: 'jobs' },
    { id: 7, word: 'round face', ipa: '/raʊnd feɪs/', meaningVi: 'mặt tròn', category: 'appearance' },
    { id: 8, word: 'long hair', ipa: '/lɒŋ heə/', meaningVi: 'tóc dài', category: 'appearance' },
    { id: 9, word: 'slim', ipa: '/slɪm/', meaningVi: 'mảnh mai', category: 'appearance' },
    { id: 10, word: 'wash dishes', ipa: '/wɒʃ ˈdɪʃɪz/', meaningVi: 'rửa bát đĩa', category: 'daily' },
    { id: 11, word: 'cook dinner', ipa: '/kʊk ˈdɪnə/', meaningVi: 'nấu bữa tối', category: 'daily' },
    { id: 12, word: 'clean floor', ipa: '/kliːn flɔː/', meaningVi: 'lau sàn nhà', category: 'daily' },
    { id: 13, word: 'cinema', ipa: '/ˈsɪnəmə/', meaningVi: 'rạp chiếu phim', category: 'weekend' },
    { id: 14, word: 'sports centre', ipa: '/spɔːts ˈsɛntə/', meaningVi: 'trung tâm thể thao', category: 'weekend' },
    { id: 15, word: 'water park', ipa: '/ˈwɔːtə pɑːk/', meaningVi: 'công viên nước', category: 'weekend' }
  ];

  const categories = [
    { key: 'home' as const, label: 'Homes (Nơi Ở)', icon: '🏡', color: 'from-emerald-500 to-teal-600', unit: 'Unit 11' },
    { key: 'jobs' as const, label: 'Jobs (Nghề Nghiệp)', icon: '👨‍💼', color: 'from-blue-500 to-indigo-600', unit: 'Unit 12' },
    { key: 'appearance' as const, label: 'Appearance (Ngoại Hình)', icon: '👤', color: 'from-purple-500 to-fuchsia-600', unit: 'Unit 13' },
    { key: 'daily' as const, label: 'Daily Tasks (Việc Hàng Ngày)', icon: '🧹', color: 'from-amber-500 to-orange-600', unit: 'Unit 14' },
    { key: 'weekend' as const, label: 'Weekend Fun (Cuối Tuần)', icon: '🎾', color: 'from-rose-500 to-pink-600', unit: 'Unit 15' }
  ];

  const [classifiedMap, setClassifiedMap] = useState<Record<number, string>>({});
  const [selectedVocabId, setSelectedVocabId] = useState<number | null>(null);
  const [questChecked, setQuestChecked] = useState(false);

  const handleAssignCategory = (catKey: string) => {
    if (!selectedVocabId) return;
    sound.playClick();
    setClassifiedMap(prev => ({ ...prev, [selectedVocabId]: catKey }));
    setSelectedVocabId(null);
  };

  const handleCheckQuest = () => {
    const totalCount = allVocab.length;
    const answeredCount = Object.keys(classifiedMap).length;
    if (answeredCount < totalCount) {
      sound.playWarning();
      return;
    }

    setQuestChecked(true);
    let correct = 0;
    allVocab.forEach(v => {
      if (classifiedMap[v.id] === v.category) {
        correct++;
      }
    });

    if (correct === totalCount) {
      sound.playComplete();
      onAddStar(8);
      confetti({ particleCount: 100, spread: 90 });
    } else {
      sound.playSuccess();
      onAddStar(correct);
    }
  };

  const handleResetQuest = () => {
    sound.playClick();
    setClassifiedMap({});
    setSelectedVocabId(null);
    setQuestChecked(false);
  };

  return (
    <div className="space-y-8">
      {/* ===================================================================== */}
      {/* PART 1: WORLD STORIES */}
      {/* ===================================================================== */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6">
        <div className="pb-6 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-teal-600 text-white">
              Trang 38 SGK
            </span>
            <span className="text-xs font-semibold text-slate-500">Mở Rộng · Văn Hoá Quốc Tế</span>
          </div>
          <h3 className="text-xl md:text-2xl font-black text-slate-800 mt-1 flex items-center gap-2">
            <Globe className="w-6 h-6 text-teal-600" />
            1. World Families: Gia Đình &amp; Cuối Tuần Bốn Phương
          </h3>
          <p className="text-sm text-slate-600 mt-1">
            Khám phá cuộc sống, nghề nghiệp và thói quen ngày nghỉ của các bạn nhỏ tại Anh, Úc và Việt Nam!
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap gap-2.5">
          {worldStories.map(story => {
            const isActive = activeStoryId === story.id;
            return (
              <button
                key={story.id}
                onClick={() => {
                  sound.playClick();
                  setActiveStoryId(story.id);
                }}
                className={`px-4 py-2.5 rounded-2xl font-bold text-xs md:text-sm flex items-center gap-2 transition-all ${
                  isActive
                    ? 'bg-teal-600 text-white shadow-md shadow-teal-200 ring-2 ring-teal-400'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span className="text-lg">{story.flag}</span>
                <span>{story.name}</span>
              </button>
            );
          })}
        </div>

        {/* Active Story Card */}
        <div className="bg-gradient-to-br from-teal-50/50 via-cyan-50/30 to-emerald-50/20 rounded-3xl p-6 md:p-8 border-2 border-teal-200 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-teal-200/60">
            <div className="flex items-center gap-3">
              <span className="text-4xl p-2 bg-white rounded-2xl shadow-xs border border-teal-100">
                {currentStory.photoIcon}
              </span>
              <div>
                <span className="text-xs font-black uppercase text-teal-700">
                  {currentStory.country}
                </span>
                <h4 className="text-lg md:text-xl font-black text-slate-800">
                  {currentStory.name} {currentStory.flag}
                </h4>
              </div>
            </div>

            <button
              onClick={() =>
                speakWord(
                  `${currentStory.locationEn} ${currentStory.parentsEn} ${currentStory.appearanceEn} ${currentStory.weekendEn}`,
                  speechRate
                )
              }
              className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center gap-2 transition active:scale-95 shadow-xs"
            >
              <Volume2 className="w-4 h-4" />
              <span>Nghe câu chuyện 🔊</span>
            </button>
          </div>

          {/* 4 Paragraph Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-teal-100 shadow-2xs space-y-1">
              <div className="flex items-center gap-2 text-xs font-black text-teal-700">
                <span>🏡</span> Nơi ở (Where they live):
              </div>
              <p className="text-sm font-bold text-slate-800">{currentStory.locationEn}</p>
              <p className="text-xs text-slate-500 italic">{currentStory.locationVi}</p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-teal-100 shadow-2xs space-y-1">
              <div className="flex items-center gap-2 text-xs font-black text-teal-700">
                <span>👨‍💼</span> Nghề nghiệp cha mẹ (Parents&apos; Jobs):
              </div>
              <p className="text-sm font-bold text-slate-800">{currentStory.parentsEn}</p>
              <p className="text-xs text-slate-500 italic">{currentStory.parentsVi}</p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-teal-100 shadow-2xs space-y-1">
              <div className="flex items-center gap-2 text-xs font-black text-teal-700">
                <span>👤</span> Ngoại hình cha mẹ (Appearance):
              </div>
              <p className="text-sm font-bold text-slate-800">{currentStory.appearanceEn}</p>
              <p className="text-xs text-slate-500 italic">{currentStory.appearanceVi}</p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-teal-100 shadow-2xs space-y-1">
              <div className="flex items-center gap-2 text-xs font-black text-teal-700">
                <span>🚴</span> Hoạt động cuối tuần (Weekends):
              </div>
              <p className="text-sm font-bold text-slate-800">{currentStory.weekendEn}</p>
              <p className="text-xs text-slate-500 italic">{currentStory.weekendVi}</p>
            </div>
          </div>

          {/* Mini Reading Comprehension Quiz */}
          <div className="p-4 rounded-2xl bg-white border border-teal-200 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-teal-600 text-white text-xs font-black flex items-center justify-center">
                ?
              </span>
              <h5 className="font-bold text-sm text-slate-800">
                Câu hỏi đọc hiểu: {currentStory.quizQuestion}
              </h5>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              {currentStory.quizOptions.map(opt => {
                const isSelected = quizAnswers[currentStory.id] === opt;
                const isCorrect = opt === currentStory.correctOption;

                let style = 'bg-slate-50 border-slate-200 text-slate-700 hover:border-teal-400';
                if (isSelected) {
                  style = isCorrect
                    ? 'bg-emerald-100 border-emerald-400 text-emerald-900 ring-2 ring-emerald-300'
                    : 'bg-rose-100 border-rose-400 text-rose-900';
                }

                return (
                  <button
                    key={opt}
                    onClick={() => handleSelectQuiz(currentStory.id, opt)}
                    className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold border-2 transition active:scale-95 ${style}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {quizAnswers[currentStory.id] && (
              <p className="text-xs font-bold pt-1">
                {quizAnswers[currentStory.id] === currentStory.correctOption ? (
                  <span className="text-emerald-700">✓ Hoan hô! Bé trả lời rất chính xác (+2 ⭐)</span>
                ) : (
                  <span className="text-rose-600">✕ Chưa đúng rồi, bé hãy đọc lại câu chuyện nhé!</span>
                )}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* PART 2: CATEGORY QUEST */}
      {/* ===================================================================== */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-amber-500 text-white">
                Trò Chơi
              </span>
              <span className="text-xs font-semibold text-slate-500">Phân Loại Siêu Tốc</span>
            </div>
            <h3 className="text-xl md:text-2xl font-black text-slate-800 mt-1 flex items-center gap-2">
              <Layers className="w-6 h-6 text-amber-500" />
              2. Category Quest: Phân Loại 15 Từ Vựng Vào 5 Hộp Kho Báu
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Bấm chọn một từ vựng ở trên rồi bấm vào 1 trong 5 Hộp kho báu tương ứng bên dưới!
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleResetQuest}
              className="px-3.5 py-2 text-xs font-bold rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition flex items-center gap-1.5"
            >
              <RotateCcw className="w-4 h-4" /> Chơi lại
            </button>
            <button
              onClick={handleCheckQuest}
              className="px-5 py-2 text-xs md:text-sm font-bold rounded-xl bg-amber-500 text-white hover:bg-amber-600 shadow-sm transition flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" /> Kiểm tra (+8 ⭐)
            </button>
          </div>
        </div>

        {/* Vocab Items Carousel / Cloud */}
        <div className="p-4 rounded-3xl bg-slate-50 border-2 border-slate-200 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-black text-slate-500 uppercase tracking-wider">
              15 Từ Vựng Cần Phân Loại:
            </span>
            <span className="font-bold text-amber-600">
              Đã xếp: {Object.keys(classifiedMap).length} / {allVocab.length}
            </span>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {allVocab.map(v => {
              const isSelected = selectedVocabId === v.id;
              const assignedCategory = classifiedMap[v.id];

              let border = 'border-slate-200 bg-white text-slate-800';
              if (isSelected) {
                border = 'border-amber-500 bg-amber-50 text-amber-900 ring-2 ring-amber-400 scale-105';
              } else if (assignedCategory) {
                border = 'border-slate-300 bg-slate-200 text-slate-600 opacity-60';
              }

              return (
                <button
                  key={v.id}
                  onClick={() => {
                    sound.playClick();
                    setSelectedVocabId(isSelected ? null : v.id);
                  }}
                  className={`px-3 py-1.5 rounded-xl font-bold text-xs border transition-all flex items-center gap-1.5 ${border}`}
                >
                  <span>{v.word}</span>
                  {assignedCategory && <span className="text-[10px] text-emerald-600 font-black">✓</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* 5 Treasure Chests */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {categories.map(cat => {
            const itemsInCat = allVocab.filter(v => classifiedMap[v.id] === cat.key);

            return (
              <div
                key={cat.key}
                onClick={() => selectedVocabId && handleAssignCategory(cat.key)}
                className={`p-4 rounded-3xl border-2 transition flex flex-col justify-between ${
                  selectedVocabId
                    ? 'border-dashed border-amber-400 hover:bg-amber-50/50 cursor-pointer animate-pulse'
                    : 'border-slate-200 bg-white'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">{cat.icon}</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-slate-100 text-slate-600">
                      {cat.unit}
                    </span>
                  </div>
                  <h4 className="font-extrabold text-xs text-slate-800 leading-snug">
                    {cat.label}
                  </h4>
                </div>

                {/* Items in this bucket */}
                <div className="mt-3 pt-3 border-t border-slate-100 space-y-1.5 min-h-[90px]">
                  {itemsInCat.length === 0 ? (
                    <p className="text-[11px] text-slate-400 italic">Chưa có từ nào</p>
                  ) : (
                    itemsInCat.map(it => {
                      const isCorrect = it.category === cat.key;
                      return (
                        <div
                          key={it.id}
                          className={`px-2 py-1 rounded-lg text-xs font-bold flex items-center justify-between ${
                            questChecked
                              ? isCorrect
                                ? 'bg-emerald-100 text-emerald-900'
                                : 'bg-rose-100 text-rose-900 line-through'
                              : 'bg-slate-100 text-slate-800'
                          }`}
                        >
                          <span>{it.word}</span>
                          <button
                            onClick={e => {
                              e.stopPropagation();
                              sound.playClick();
                              setClassifiedMap(prev => {
                                const next = { ...prev };
                                delete next[it.id];
                                return next;
                              });
                            }}
                            className="text-slate-400 hover:text-rose-500 font-black text-xs ml-1"
                            title="Bỏ từ"
                          >
                            ×
                          </button>
                        </div>
                      );
                    })
                  )}
                </div>

                {selectedVocabId && (
                  <button
                    onClick={() => handleAssignCategory(cat.key)}
                    className="mt-2 w-full py-1 text-xs font-black bg-amber-500 text-white rounded-xl shadow-xs"
                  >
                    Bỏ vào đây 📥
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
