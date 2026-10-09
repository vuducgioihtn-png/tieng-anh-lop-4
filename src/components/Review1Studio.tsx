import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Volume2,
  Play,
  RotateCcw,
  Check,
  Sparkles,
  BookOpen,
  Award,
  ChevronDown,
  ChevronUp,
  Heart,
  CheckCircle2,
  HelpCircle,
  Lightbulb,
  ArrowRight,
  Smile,
  Globe,
  Clock,
  Calendar,
  Compass,
  MapPin,
  Trophy,
  Star,
  ExternalLink
} from 'lucide-react';
import { sound, speakWord } from '../utils/audio';

interface Review1StudioProps {
  speechRate: number;
  onAddStar: (count: number) => void;
  onOpenVoiceStudio?: () => void;
  onSwitchToUnit1?: () => void;
  onSwitchToUnit5?: () => void;
  onSwitchToUnit6?: () => void;
}

export const Review1Studio: React.FC<Review1StudioProps> = ({
  speechRate,
  onAddStar,
  onOpenVoiceStudio,
  onSwitchToUnit1,
  onSwitchToUnit5,
  onSwitchToUnit6
}) => {
  // Navigation tabs: 1: Page 40, 2: Page 41, 3: Page 42 (Extension 1 & 2), 4: Page 43 (Extension 3), 5: Grand Challenge
  const [activeTab, setActiveTab] = useState<number>(1);
  const [showParentGuide, setShowParentGuide] = useState<boolean>(true);

  // =========================================================================
  // PAGE 40 • ACTIVITY 1: LISTEN AND TICK (TRACK 56)
  // =========================================================================
  interface ListenTickItem {
    id: number;
    audioScript: string;
    questionVi: string;
    options: Array<{
      key: 'a' | 'b' | 'c';
      label: string;
      icon: string;
      desc: string;
    }>;
    correctAnswer: 'a' | 'b' | 'c';
    userChoice: 'a' | 'b' | 'c' | null;
    explanation: string;
  }

  const [listenTickList, setListenTickList] = useState<ListenTickItem[]>([
    {
      id: 1,
      audioScript: 'Where are you from, Lucy? - I’m from Britain.',
      questionVi: 'Câu 1: Bạn Lucy đến từ quốc gia nào?',
      options: [
        { key: 'a', label: 'Viet Nam', icon: '🇻🇳', desc: 'Việt Nam (cờ đỏ sao vàng)' },
        { key: 'b', label: 'Britain', icon: '🇬🇧', desc: 'Vương quốc Anh (cờ Union Jack)' },
        { key: 'c', label: 'Japan', icon: '🇯🇵', desc: 'Nhật Bản (cờ mặt trời)' }
      ],
      correctAnswer: 'b',
      userChoice: null,
      explanation: 'Trong bài nghe Track 56, câu thoại nói: "I’m from Britain" nên đáp án chính xác là tranh b (Vương quốc Anh).'
    },
    {
      id: 2,
      audioScript: 'Can he cook? - Yes, he can. He makes fresh salad in the kitchen.',
      questionVi: 'Câu 2: Bạn nam ấy có thể làm được hoạt động gì?',
      options: [
        { key: 'a', label: 'roller skate', icon: '🛼', desc: 'Trượt pa-tanh có bánh xe' },
        { key: 'b', label: 'cook', icon: '🍳', desc: 'Nấu ăn / làm bếp chuẩn bị món' },
        { key: 'c', label: 'draw', icon: '🎨', desc: 'Vẽ tranh nghệ thuật' }
      ],
      correctAnswer: 'b',
      userChoice: null,
      explanation: 'Bài nghe hỏi "Can he cook?" và bạn nhỏ đáp "Yes, he can" tương ứng với tranh b (bạn nam đang nấu ăn).'
    },
    {
      id: 3,
      audioScript: 'When is your birthday? - It is on the eighth of March.',
      questionVi: 'Câu 3: Ngày sinh nhật được nhắc đến trên tờ lịch nào?',
      options: [
        { key: 'a', label: '8 February', icon: '📅', desc: 'Ngày 8 tháng 2 (February)' },
        { key: 'b', label: '8 March', icon: '🌸', desc: 'Ngày 8 tháng 3 (March)' },
        { key: 'c', label: '8 April', icon: '🌱', desc: 'Ngày 8 tháng 4 (April)' }
      ],
      correctAnswer: 'b',
      userChoice: null,
      explanation: 'Băng phát âm rõ ràng: "on the eighth of March" (ngày 8 tháng 3) nên chọn tranh b.'
    },
    {
      id: 4,
      audioScript: 'What do you do on Fridays? - I listen to music.',
      questionVi: 'Câu 4: Bạn làm gì vào các ngày thứ Sáu?',
      options: [
        { key: 'a', label: 'study at school', icon: '📚', desc: 'Học bài tại trường' },
        { key: 'b', label: 'listen to music', icon: '🎧', desc: 'Đeo tai nghe thư giãn nghe nhạc' },
        { key: 'c', label: 'clean the house', icon: '🧹', desc: 'Lau dọn nhà cửa' }
      ],
      correctAnswer: 'b',
      userChoice: null,
      explanation: 'Câu trả lời trong băng là "I listen to music" (nghe nhạc) tương ứng tranh b bạn nữ đeo tai nghe.'
    },
    {
      id: 5,
      audioScript: 'What time do you brush your teeth? - I brush my teeth at six thirty AM.',
      questionVi: 'Câu 5: Bạn đánh răng vào lúc mấy giờ sáng?',
      options: [
        { key: 'a', label: '6:15 AM', icon: '⏰', desc: 'Sáu giờ mười lăm (six fifteen)' },
        { key: 'b', label: '6:30 AM', icon: '⏰', desc: 'Sáu giờ ba mươi (six thirty)' },
        { key: 'c', label: '6:45 AM', icon: '⏰', desc: 'Sáu giờ bốn mươi lăm (six forty-five)' }
      ],
      correctAnswer: 'b',
      userChoice: null,
      explanation: 'Bài nghe nêu mốc giờ "at six thirty AM" (6:30 sáng) tương ứng với đồng hồ số ở tranh b.'
    }
  ]);
  const [listenTickChecked, setListenTickChecked] = useState<boolean>(false);

  // =========================================================================
  // PAGE 40 • ACTIVITY 2: ASK AND ANSWER (4 SCENARIOS)
  // =========================================================================
  const askAnswerScenes = [
    {
      id: 1,
      question: 'What time do you go to school?',
      questionVi: 'Bạn đi học vào lúc mấy giờ?',
      answer: 'I go to school at seven thirty.',
      answerVi: 'Tớ đi học lúc bảy giờ ba mươi phút sáng.',
      timeBadge: '7:30 AM',
      icon: '🏫',
      tip: 'Đồng hồ điện tử trên cổng trường hiện 7:30 AM (seven thirty).'
    },
    {
      id: 2,
      question: 'What do you want to drink?',
      questionVi: 'Bạn muốn uống nước gì nào?',
      answer: 'I want some lemonade.',
      answerVi: 'Tớ muốn một ly nước chanh tươi mát.',
      timeBadge: 'Lemonade 🍋',
      icon: '🥤',
      tip: 'Trong bong bóng suy nghĩ là ly nước chanh có lát chanh tròn và ống hút (some lemonade).'
    },
    {
      id: 3,
      question: 'Where’s he from?',
      questionVi: 'Bạn nam ấy đến từ đất nước nào vậy?',
      answer: 'He’s from Australia.',
      answerVi: 'Cậu ấy đến từ nước Úc.',
      timeBadge: 'Australia 🇦🇺',
      icon: '🦘',
      tip: 'Bạn nam cầm lá cờ nước Úc (Australia) với chòm sao Nam Thập Tự.'
    },
    {
      id: 4,
      question: 'Can you cook?',
      questionVi: 'Bạn có biết nấu ăn không?',
      answer: 'Yes, I can.',
      answerVi: 'Có, tớ biết nấu ăn đấy.',
      timeBadge: 'Cooking 🍳',
      icon: '👨‍🍳',
      tip: 'Trong tranh bạn nhỏ tươi cười đứng nấu chảo thức ăn bốc khói thơm phức.'
    }
  ];

  // =========================================================================
  // PAGE 41 • ACTIVITY 3: READ AND MATCH (5 PAIRS)
  // =========================================================================
  interface MatchPair {
    id: number;
    qEn: string;
    qVi: string;
    correctKey: 'a' | 'b' | 'c' | 'd' | 'e';
    aEn: string;
    aVi: string;
    userMatched: 'a' | 'b' | 'c' | 'd' | 'e' | null;
  }

  const [matchPairs, setMatchPairs] = useState<MatchPair[]>([
    {
      id: 1,
      qEn: '1. What time is it?',
      qVi: 'Bây giờ là mấy giờ?',
      correctKey: 'c',
      aEn: 'c. It’s twelve o’clock.',
      aVi: 'Bây giờ là mười hai giờ đúng.',
      userMatched: null
    },
    {
      id: 2,
      qEn: '2. Where’s she from?',
      qVi: 'Cô ấy đến từ quốc gia nào?',
      correctKey: 'd',
      aEn: 'd. She’s from Malaysia.',
      aVi: 'Cô ấy đến từ nước Ma-lay-xi-a.',
      userMatched: null
    },
    {
      id: 3,
      qEn: '3. When’s your birthday?',
      qVi: 'Khi nào là sinh nhật của bạn?',
      correctKey: 'b',
      aEn: 'b. It’s in April.',
      aVi: 'Sinh nhật của tớ vào Tháng Tư.',
      userMatched: null
    },
    {
      id: 4,
      qEn: '4. What day is it today?',
      qVi: 'Hôm nay là thứ mấy?',
      correctKey: 'e',
      aEn: 'e. It’s Tuesday.',
      aVi: 'Hôm nay là thứ Ba.',
      userMatched: null
    },
    {
      id: 5,
      qEn: '5. What do you want to eat?',
      qVi: 'Bạn muốn ăn món gì?',
      correctKey: 'a',
      aEn: 'a. I want some grapes.',
      aVi: 'Tớ muốn một ít nho tươi.',
      userMatched: null
    }
  ]);
  const [matchSubmitted, setMatchSubmitted] = useState<boolean>(false);

  // =========================================================================
  // PAGE 41 • ACTIVITY 4: READ AND COMPLETE (BEN FROM AUSTRALIA)
  // =========================================================================
  const benPassage = `My name is Ben. I am nine years old. I am from Australia. I am a pupil at Rose Primary School. I go to school from Mondays to Fridays. I like sports and music. I play football on Tuesdays. I play the guitar on Wednesdays. At the weekend, I stay at home and do housework.`;

  const [benFillAnswers, setBenFillAnswers] = useState<{ [key: string]: string }>({
    blank1: '',
    blank2: '',
    blank3: '',
    blank4: ''
  });
  const [benFillChecked, setBenFillChecked] = useState<boolean>(false);
  const [activeBenClue, setActiveBenClue] = useState<string | null>(null);

  // =========================================================================
  // PAGE 41 • ACTIVITY 5: LET'S WRITE (ANN PROFILE)
  // =========================================================================
  const [annAnswers, setAnnAnswers] = useState<{ [key: string]: string }>({
    country: '',
    month: '',
    can1: '',
    can2: '',
    cant: ''
  });
  const [annChecked, setAnnChecked] = useState<boolean>(false);

  // =========================================================================
  // PAGE 42 • EXTENSION 1: LOOK AND WRITE (COUNTRIES & MAPS)
  // =========================================================================
  const mapCountries = [
    {
      id: 1,
      country: 'Viet Nam',
      nameVi: 'Việt Nam',
      flag: '🇻🇳',
      shapeDesc: 'Dải đất hình chữ S bên bờ Biển Đông',
      capital: 'Ha Noi',
      fact: 'Đất nước ngàn năm văn hiến, nhiều danh lam thắng cảnh tươi đẹp.'
    },
    {
      id: 2,
      country: 'Britain',
      nameVi: 'Vương quốc Anh',
      flag: '🇬🇧',
      shapeDesc: 'Đảo quốc sương mù phía Tây Bắc châu Âu',
      capital: 'London',
      fact: 'Nổi tiếng với đồng hồ Big Ben và các bạn học quốc tế như Lucy.'
    },
    {
      id: 3,
      country: 'Japan',
      nameVi: 'Nhật Bản',
      flag: '🇯🇵',
      shapeDesc: 'Quần đảo hình cánh cung ở Đông Á',
      capital: 'Tokyo',
      fact: 'Xứ sở hoa anh đào và đỉnh núi Phú Sĩ tuyết phủ tuyệt đẹp.'
    },
    {
      id: 4,
      country: 'Australia',
      nameVi: 'Nước Úc',
      flag: '🇦🇺',
      shapeDesc: 'Quốc gia lục địa nằm ở Nam bán cầu',
      capital: 'Canberra',
      fact: 'Quê hương của chuột túi Kangaroo và chú gấu Koala đáng yêu.'
    },
    {
      id: 5,
      country: 'America',
      nameVi: 'Nước Mỹ (Hoa Kỳ)',
      flag: '🇺🇸',
      shapeDesc: 'Lãnh thổ rộng lớn trải dài ở Bắc Mỹ',
      capital: 'Washington DC',
      fact: 'Nơi có Tượng Nữ thần Tự do và các bạn học như Mary.'
    }
  ];

  const [mapInputs, setMapInputs] = useState<{ [key: number]: string }>({
    1: 'Viet Nam',
    2: '',
    3: '',
    4: '',
    5: ''
  });
  const [mapChecked, setMapChecked] = useState<boolean>(false);

  // =========================================================================
  // PAGE 42 • EXTENSION 2: WORLD CLOCK (MÚI GIỜ QUỐC TẾ)
  // =========================================================================
  const worldClocks = [
    {
      id: 1,
      cityCountry: 'Washington DC, America',
      timeDigital: '8:00 AM',
      period: 'Buổi sáng',
      sentenceSample: 'In America, it’s eight o’clock.',
      hourWord: 'eight o’clock'
    },
    {
      id: 2,
      cityCountry: 'London, Britain',
      timeDigital: '1:00 PM',
      period: 'Buổi trưa/chiều',
      sentenceSample: 'In Britain, it’s one o’clock.',
      hourWord: 'one o’clock'
    },
    {
      id: 3,
      cityCountry: 'Ha Noi, Viet Nam',
      timeDigital: '7:00 PM',
      period: 'Buổi tối',
      sentenceSample: 'In Viet Nam, it’s seven o’clock.',
      hourWord: 'seven o’clock'
    },
    {
      id: 4,
      cityCountry: 'Tokyo, Japan',
      timeDigital: '9:00 PM',
      period: 'Đêm muộn',
      sentenceSample: 'In Japan, it’s nine o’clock.',
      hourWord: 'nine o’clock'
    },
    {
      id: 5,
      cityCountry: 'Canberra, Australia',
      timeDigital: '10:00 PM',
      period: 'Đêm khuya',
      sentenceSample: 'In Australia, it’s ten o’clock.',
      hourWord: 'ten o’clock'
    }
  ];

  const [clockInputs, setClockInputs] = useState<{ [key: number]: string }>({
    2: '',
    3: '',
    4: '',
    5: ''
  });
  const [clockChecked, setClockChecked] = useState<boolean>(false);

  // =========================================================================
  // PAGE 43 • EXTENSION 3: NEAR & FAR FROM VIET NAM
  // =========================================================================
  interface GeoQuiz {
    id: number;
    question: string;
    questionVi: string;
    type: 'near' | 'far';
    options: Array<{
      name: string;
      flag: string;
      isCorrect: boolean;
      distanceVi: string;
    }>;
    userChoice: string | null;
  }

  const [geoQuizzes, setGeoQuizzes] = useState<GeoQuiz[]>([
    {
      id: 1,
      question: '1. Which country is near Viet Nam?',
      questionVi: 'Đất nước nào ở GẦN Việt Nam nhất trong 3 nước sau?',
      type: 'near',
      options: [
        { name: 'Thailand', flag: '🇹🇭', isCorrect: true, distanceVi: 'Gần (cùng thuộc khu vực Đông Nam Á, bay chỉ hơn 1 giờ)' },
        { name: 'America', flag: '🇺🇸', isCorrect: false, distanceVi: 'Rất xa (bên kia bờ Thái Bình Dương)' },
        { name: 'Russia', flag: '🇷🇺', isCorrect: false, distanceVi: 'Xa (ở phương bắc châu Âu - Á)' }
      ],
      userChoice: null
    },
    {
      id: 2,
      question: '2. Which country is near Viet Nam?',
      questionVi: 'Đất nước nào ở GẦN Việt Nam trong 3 nước sau?',
      type: 'near',
      options: [
        { name: 'Australia', flag: '🇦🇺', isCorrect: false, distanceVi: 'Xa (châu Đại Dương, bay hơn 8 giờ)' },
        { name: 'Britain', flag: '🇬🇧', isCorrect: false, distanceVi: 'Rất xa (Tây Âu, bay khoảng 12 giờ)' },
        { name: 'Malaysia', flag: '🇲🇾', isCorrect: true, distanceVi: 'Gần (láng giềng Đông Nam Á, bay chỉ khoảng 2 giờ)' }
      ],
      userChoice: null
    },
    {
      id: 3,
      question: '3. Which country is far from Viet Nam?',
      questionVi: 'Đất nước nào ở XA Việt Nam nhất?',
      type: 'far',
      options: [
        { name: 'Canada', flag: '🇨🇦', isCorrect: true, distanceVi: 'Rất xa (Bắc Mỹ tuyết trắng, cách nửa vòng Trái Đất)' },
        { name: 'Thailand', flag: '🇹🇭', isCorrect: false, distanceVi: 'Gần (Đông Nam Á)' },
        { name: 'Singapore', flag: '🇸🇬', isCorrect: false, distanceVi: 'Gần (Đông Nam Á)' }
      ],
      userChoice: null
    },
    {
      id: 4,
      question: '4. Which country is far from Viet Nam?',
      questionVi: 'Đất nước nào ở XA Việt Nam?',
      type: 'far',
      options: [
        { name: 'Thailand', flag: '🇹🇭', isCorrect: false, distanceVi: 'Gần (Đông Nam Á)' },
        { name: 'Australia', flag: '🇦🇺', isCorrect: true, distanceVi: 'Xa (thuộc Nam Bán Cầu, cách Việt Nam hàng ngàn hải lý)' },
        { name: 'Laos', flag: '🇱🇦', isCorrect: false, distanceVi: 'Cực kỳ gần (nước láng giềng sát biên giới Việt Nam)' }
      ],
      userChoice: null
    }
  ]);
  const [geoChecked, setGeoChecked] = useState<boolean>(false);

  return (
    <div className="space-y-8 pb-16">
      {/* ================= HERO MASTER BANNER ================= */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-600 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-black tracking-wide uppercase">
              <Trophy className="w-4 h-4 text-amber-300 animate-bounce" />
              <span>Review 1 & Extension Activities • Trang 40 - 43 SGK</span>
            </div>

            <div className="flex items-center gap-2">
              {onSwitchToUnit1 && (
                <button
                  onClick={onSwitchToUnit1}
                  className="px-3 py-1.5 bg-white/15 hover:bg-white/25 rounded-xl text-xs font-bold transition-all text-amber-100 hover:text-white"
                >
                  ⬅️ Về Unit 1
                </button>
              )}
              {onSwitchToUnit5 && (
                <button
                  onClick={onSwitchToUnit5}
                  className="px-3 py-1.5 bg-white/15 hover:bg-white/25 rounded-xl text-xs font-bold transition-all text-amber-100 hover:text-white"
                >
                  🚴 Về Unit 5
                </button>
              )}
              {onSwitchToUnit6 && (
                <button
                  onClick={onSwitchToUnit6}
                  className="px-3 py-1.5 bg-yellow-400 hover:bg-yellow-300 text-slate-900 rounded-xl text-xs font-black transition-all shadow-md flex items-center gap-1"
                >
                  <span>🏫 Sang Unit 6</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          <div>
            <h1 className="text-2xl md:text-4xl font-black tracking-tight text-white flex items-center gap-3">
              <span>Đấu Trường Ôn Tập Kì 1 (Review 1)</span>
              <span className="text-3xl">🏆</span>
            </h1>
            <p className="text-amber-100 text-sm md:text-base font-medium mt-1">
              Tổng hợp tinh hoa toàn diện 5 Unit đầu tiên: Quốc gia bạn bè, Thời gian thói quen, Ngày trong tuần, Tiệc sinh nhật và Tài năng siêu sao!
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
            <div className="bg-white/10 rounded-2xl p-2.5 backdrop-blur-sm border border-white/10">
              <span className="text-[11px] text-amber-200 block font-medium">Phạm vi ôn</span>
              <span className="text-sm font-black text-white">Unit 1 đến Unit 5</span>
            </div>
            <div className="bg-white/10 rounded-2xl p-2.5 backdrop-blur-sm border border-white/10">
              <span className="text-[11px] text-amber-200 block font-medium">Trang SGK</span>
              <span className="text-sm font-black text-yellow-300">Trang 40, 41, 42, 43</span>
            </div>
            <div className="bg-white/10 rounded-2xl p-2.5 backdrop-blur-sm border border-white/10">
              <span className="text-[11px] text-amber-200 block font-medium">Mở Rộng</span>
              <span className="text-sm font-black text-white">Bản Đồ & Giờ Quốc Tế</span>
            </div>
            <div className="bg-white/10 rounded-2xl p-2.5 backdrop-blur-sm border border-white/10">
              <span className="text-[11px] text-amber-200 block font-medium">Bí kíp</span>
              <span className="text-sm font-black text-emerald-300">Nhớ Theo Não Phải 🧠</span>
            </div>
          </div>
        </div>
      </div>

      {/* ================= 4 PAGE SELECTOR TABS ================= */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {[
          { num: 1, label: 'Trang 40: Nghe & Hỏi Đáp', icon: '🎧' },
          { num: 2, label: 'Trang 41: Đọc Nối, Điền & Viết', icon: '📖' },
          { num: 3, label: 'Trang 42: Bản Đồ & Giờ Quốc Tế', icon: '🌍' },
          { num: 4, label: 'Trang 43: Nước Gần & Nước Xa', icon: '🧭' }
        ].map(tab => (
          <button
            key={tab.num}
            onClick={() => {
              setActiveTab(tab.num);
              sound.playClick();
            }}
            className={`px-4 py-2.5 rounded-2xl text-xs font-black transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === tab.num
                ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30 scale-105'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: TRANG 40 SGK • LISTEN AND TICK & ASK AND ANSWER */}
      {/* ========================================================================= */}
      {activeTab === 1 && (
        <div className="space-y-6">
          {/* Activity 1: Listen and tick (Track 56) */}
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-xs font-black text-amber-600 uppercase tracking-wider block">
                  Hoạt Động 1 • SGK Trang 40
                </span>
                <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                  <span>1. Listen and tick</span>
                  <span className="text-xs bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded-full font-bold">
                    Track 56
                  </span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Bấm loa để nghe từng đoạn hội thoại, sau đó chọn tranh a, b hoặc c đúng nhất.
                </p>
              </div>

              <button
                onClick={() => {
                  setListenTickList(prev => prev.map(q => ({ ...q, userChoice: null })));
                  setListenTickChecked(false);
                  sound.playClick();
                }}
                className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Làm Lại</span>
              </button>
            </div>

            {/* List of 5 items */}
            <div className="space-y-4">
              {listenTickList.map(item => (
                <div
                  key={item.id}
                  className="p-5 rounded-2xl border-2 border-slate-200 bg-slate-50 space-y-3 hover:border-amber-300 transition-all"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-xl bg-amber-500 text-white font-black text-xs flex items-center justify-center">
                        #{item.id}
                      </span>
                      <span className="text-sm font-black text-slate-800">{item.questionVi}</span>
                    </div>

                    <button
                      onClick={() => {
                        speakWord(item.audioScript, speechRate);
                        sound.playClick();
                      }}
                      className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-black flex items-center gap-1.5 shadow-sm"
                    >
                      <Volume2 className="w-4 h-4" />
                      <span>Nghe Băng #{item.id}</span>
                    </button>
                  </div>

                  {/* 3 Option Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {item.options.map(opt => {
                      const isSelected = item.userChoice === opt.key;
                      return (
                        <button
                          key={opt.key}
                          onClick={() => {
                            setListenTickList(prev =>
                              prev.map(q =>
                                q.id === item.id ? { ...q, userChoice: opt.key } : q
                              )
                            );
                            sound.playClick();
                          }}
                          className={`p-3.5 rounded-2xl border-2 text-left transition-all relative flex flex-col justify-between ${
                            isSelected
                              ? 'border-amber-600 bg-amber-100/70 shadow-sm scale-[1.02]'
                              : 'border-slate-200 bg-white hover:bg-slate-100/60'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-black px-2 py-0.5 rounded-lg bg-slate-100 text-slate-700 uppercase">
                              Tranh {opt.key}
                            </span>
                            <span className="text-2xl">{opt.icon}</span>
                          </div>

                          <div className="pt-2">
                            <div className="text-sm font-black text-slate-900">{opt.label}</div>
                            <div className="text-xs text-slate-500">{opt.desc}</div>
                          </div>

                          {isSelected && (
                            <div className="absolute top-2 right-2">
                              <CheckCircle2 className="w-4 h-4 text-amber-600" />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Feedback when checked */}
                  {listenTickChecked && (
                    <div
                      className={`p-3 rounded-xl text-xs font-bold ${
                        item.userChoice === item.correctAnswer
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {item.userChoice === item.correctAnswer
                        ? `✅ Hoàn toàn chính xác! Băng đọc: "${item.audioScript}"`
                        : `❌ Chưa đúng rồi! Đáp án đúng là tranh (${item.correctAnswer}). Băng đọc: "${item.audioScript}"`}
                      <div className="text-[11px] font-normal mt-0.5 opacity-90">
                        {item.explanation}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="text-center pt-2">
              <button
                onClick={() => {
                  setListenTickChecked(true);
                  const correctCount = listenTickList.filter(
                    q => q.userChoice === q.correctAnswer
                  ).length;
                  if (correctCount === listenTickList.length) {
                    sound.playVictory();
                    confetti({ particleCount: 60, spread: 70 });
                    onAddStar(5);
                  } else {
                    sound.playCorrect();
                    onAddStar(correctCount);
                  }
                }}
                className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-2xl text-sm font-black transition-all shadow-md inline-flex items-center gap-2"
              >
                <Check className="w-5 h-5" />
                <span>Chấm Điểm Bài Nghe (5 Câu)</span>
              </button>
            </div>
          </div>

          {/* Activity 2: Ask and answer */}
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6">
            <div>
              <span className="text-xs font-black text-amber-600 uppercase tracking-wider block">
                Hoạt Động 2 • SGK Trang 40
              </span>
              <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <span>2. Ask and answer (Hỏi và Trả lời 4 tình huống)</span>
                <span className="text-2xl">💬</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Quan sát các chi tiết trong tranh tình huống (đồng hồ, đồ uống, lá cờ, nhà bếp) và luyện nói câu trả lời chuẩn xác.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {askAnswerScenes.map(sc => (
                <div
                  key={sc.id}
                  className="p-5 rounded-2xl border-2 border-slate-200 bg-slate-50 space-y-3 hover:border-amber-300 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-amber-700 uppercase">
                        Tình huống #{sc.id}
                      </span>
                      <span className="px-2.5 py-0.5 bg-amber-100 text-amber-900 rounded-full text-xs font-bold flex items-center gap-1">
                        <span>{sc.icon}</span>
                        <span>{sc.timeBadge}</span>
                      </span>
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-slate-200">
                      <span className="text-[11px] font-bold text-slate-400 block uppercase">
                        Câu Hỏi:
                      </span>
                      <span className="text-base font-black text-slate-900">
                        "{sc.question}"
                      </span>
                      <span className="text-xs text-slate-500 block">({sc.questionVi})</span>
                    </div>

                    <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
                      <span className="text-[11px] font-bold text-amber-800 block uppercase">
                        Câu Trả Lời Chuẩn:
                      </span>
                      <span className="text-base font-black text-amber-950">
                        "{sc.answer}"
                      </span>
                      <span className="text-xs text-amber-700 block">({sc.answerVi})</span>
                    </div>

                    <p className="text-xs text-slate-500 italic">💡 {sc.tip}</p>
                  </div>

                  <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between">
                    <button
                      onClick={() => {
                        speakWord(`${sc.question} ${sc.answer}`, speechRate);
                        onAddStar(1);
                      }}
                      className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-black transition-all flex items-center gap-1.5 shadow-sm"
                    >
                      <Volume2 className="w-4 h-4" />
                      <span>Nghe Mẫu Cả Cặp Câu</span>
                    </button>

                    <button
                      onClick={onOpenVoiceStudio}
                      className="text-xs font-bold text-amber-700 hover:underline"
                    >
                      Luyện nói AI ➔
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: TRANG 41 SGK • READ AND MATCH, COMPLETE & WRITE */}
      {/* ========================================================================= */}
      {activeTab === 2 && (
        <div className="space-y-6">
          {/* Activity 3: Read and match */}
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-xs font-black text-amber-600 uppercase tracking-wider block">
                  Hoạt Động 3 • SGK Trang 41
                </span>
                <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                  <span>3. Read and match (Nối câu hỏi với câu trả lời)</span>
                  <span className="text-2xl">🔗</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Đọc 5 câu hỏi bên trái và bấm chọn câu trả lời tương ứng (a, b, c, d, e) ở bên phải.
                </p>
              </div>

              <button
                onClick={() => {
                  setMatchPairs(prev => prev.map(p => ({ ...p, userMatched: null })));
                  setMatchSubmitted(false);
                  sound.playClick();
                }}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Nối Lại</span>
              </button>
            </div>

            <div className="space-y-3">
              {matchPairs.map(item => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-3 hover:bg-white hover:border-amber-300 transition-all"
                >
                  <div className="space-y-0.5">
                    <span className="text-base font-black text-slate-900">{item.qEn}</span>
                    <span className="text-xs text-slate-500 block">({item.qVi})</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5">
                    {(['a', 'b', 'c', 'd', 'e'] as const).map(k => (
                      <button
                        key={k}
                        onClick={() => {
                          setMatchPairs(prev =>
                            prev.map(p => (p.id === item.id ? { ...p, userMatched: k } : p))
                          );
                          sound.playClick();
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-black border transition-all ${
                          item.userMatched === k
                            ? 'bg-amber-600 text-white border-amber-700 shadow-sm scale-105'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        Nối ({k})
                      </button>
                    ))}
                  </div>

                  {item.userMatched && (
                    <div className="text-xs font-bold text-amber-800 bg-amber-50 px-3 py-1 rounded-xl border border-amber-200">
                      Đã chọn: {item.userMatched.toUpperCase()}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Answer Guide Preview Table */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-xs space-y-2">
              <span className="font-black text-slate-700 uppercase block">
                Kho đáp án bên phải SGK để đối chiếu:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-slate-600">
                <div>a. I want some grapes. (ăn nho)</div>
                <div>b. It’s in April. (sinh nhật tháng 4)</div>
                <div>c. It’s twelve o’clock. (12 giờ đúng)</div>
                <div>d. She’s from Malaysia. (đến từ Malaysia)</div>
                <div>e. It’s Tuesday. (hôm nay là thứ Ba)</div>
              </div>
            </div>

            <div className="text-center pt-2">
              <button
                onClick={() => {
                  setMatchSubmitted(true);
                  const isAllCorrect = matchPairs.every(p => p.userMatched === p.correctKey);
                  if (isAllCorrect) {
                    sound.playVictory();
                    confetti({ particleCount: 50, spread: 60 });
                    onAddStar(5);
                  } else {
                    sound.playCorrect();
                  }
                }}
                className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-2xl text-sm font-black transition-all shadow-md inline-flex items-center gap-2"
              >
                <Check className="w-5 h-5" />
                <span>Kiểm Tra Nối Cặp Câu</span>
              </button>

              {matchSubmitted && (
                <div className="pt-3 text-xs font-bold text-slate-700">
                  Kết quả:{' '}
                  {matchPairs.filter(p => p.userMatched === p.correctKey).length} / 5 câu chính xác!
                </div>
              )}
            </div>
          </div>

          {/* Activity 4: Read and complete (Ben's Story) */}
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-xs font-black text-amber-600 uppercase tracking-wider block">
                  Hoạt Động 4 • SGK Trang 41
                </span>
                <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                  <span>4. Read and complete (Đọc đoạn văn về bạn Ben)</span>
                  <span className="text-2xl">🇦🇺</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Đọc đoạn văn tự thuật của Ben và điền các từ còn thiếu vào bản tóm tắt bên dưới.
                </p>
              </div>

              <button
                onClick={() => {
                  speakWord(benPassage, speechRate);
                  sound.playClick();
                }}
                className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-black flex items-center gap-1.5 shadow-sm"
              >
                <Volume2 className="w-4 h-4" />
                <span>Nghe Đọc Đoạn Văn</span>
              </button>
            </div>

            {/* Original Passage Box */}
            <div className="bg-amber-50/70 p-5 rounded-2xl border-2 border-amber-200 space-y-2">
              <span className="text-xs font-black text-amber-800 uppercase tracking-wide">
                📜 Đoạn Văn Tự Giới Thiệu Của Ben (9 tuổi):
              </span>
              <p className="text-sm md:text-base leading-relaxed text-slate-800 font-medium bg-white p-4 rounded-xl border border-amber-200">
                "{benPassage}"
              </p>
            </div>

            {/* Fill-in-the-blank summary */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
              <span className="text-xs font-black text-slate-700 uppercase">
                Bản tóm tắt cần điền (1, 2, 3, 4):
              </span>

              <div className="text-sm md:text-base leading-loose text-slate-800 space-y-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span>This is Ben. He is from (1)</span>
                  <input
                    type="text"
                    value={benFillAnswers.blank1}
                    onChange={e => setBenFillAnswers({ ...benFillAnswers, blank1: e.target.value })}
                    placeholder="Australia"
                    className="px-3 py-1 border border-slate-300 rounded-xl text-sm font-bold text-amber-700 w-36 bg-white focus:outline-amber-500"
                  />
                  <span>.</span>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <span>He is at school from Mondays to (2)</span>
                  <input
                    type="text"
                    value={benFillAnswers.blank2}
                    onChange={e => setBenFillAnswers({ ...benFillAnswers, blank2: e.target.value })}
                    placeholder="Fridays"
                    className="px-3 py-1 border border-slate-300 rounded-xl text-sm font-bold text-amber-700 w-32 bg-white focus:outline-amber-500"
                  />
                  <span>.</span>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <span>His hobbies are sports and music. He can play football. He can play the (3)</span>
                  <input
                    type="text"
                    value={benFillAnswers.blank3}
                    onChange={e => setBenFillAnswers({ ...benFillAnswers, blank3: e.target.value })}
                    placeholder="guitar"
                    className="px-3 py-1 border border-slate-300 rounded-xl text-sm font-bold text-amber-700 w-32 bg-white focus:outline-amber-500"
                  />
                  <span>.</span>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <span>He is at home on (4)</span>
                  <input
                    type="text"
                    value={benFillAnswers.blank4}
                    onChange={e => setBenFillAnswers({ ...benFillAnswers, blank4: e.target.value })}
                    placeholder="Saturdays"
                    className="px-3 py-1 border border-slate-300 rounded-xl text-sm font-bold text-amber-700 w-36 bg-white focus:outline-amber-500"
                  />
                  <span>and Sundays.</span>
                </div>
              </div>

              {benFillChecked && (
                <div className="p-3 rounded-xl bg-amber-100 text-amber-900 text-xs font-bold space-y-1">
                  <div>🎯 Đáp án chuẩn:</div>
                  <div>(1) Australia • (2) Fridays • (3) guitar • (4) Saturdays</div>
                </div>
              )}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setBenFillChecked(true);
                  sound.playVictory();
                  confetti({ particleCount: 40, spread: 60 });
                  onAddStar(4);
                }}
                className="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-black transition-all shadow-sm"
              >
                Kiểm Tra Đáp Án Điền
              </button>

              <button
                onClick={() => {
                  setBenFillAnswers({ blank1: '', blank2: '', blank3: '', blank4: '' });
                  setBenFillChecked(false);
                  sound.playClick();
                }}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all"
              >
                Điền Lại
              </button>
            </div>
          </div>

          {/* Activity 5: Let's write (Ann Profile) */}
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6">
            <div>
              <span className="text-xs font-black text-amber-600 uppercase tracking-wider block">
                Hoạt Động 5 • SGK Trang 41
              </span>
              <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <span>5. Let's write • Viết về bạn Ann</span>
                <span className="text-2xl">✍️</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Quan sát các gợi ý hình ảnh (Cờ Mỹ 🇺🇸, Lịch tháng 4 📅, Micro 🎤, Tranh vẽ 🎨, Pa-tanh 🛼) để hoàn thành đoạn văn.
              </p>
            </div>

            <div className="bg-gradient-to-br from-amber-50 via-rose-50 to-orange-50 rounded-2xl p-6 border-2 border-amber-200 space-y-4">
              <div className="text-sm md:text-base leading-loose text-slate-800 space-y-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span>I have a friend. Her name is Ann. She is from 🇺🇸 (1)</span>
                  <input
                    type="text"
                    value={annAnswers.country}
                    onChange={e => setAnnAnswers({ ...annAnswers, country: e.target.value })}
                    placeholder="America"
                    className="px-3 py-1 border border-slate-300 rounded-xl text-sm font-bold text-amber-700 w-36 bg-white focus:outline-amber-500"
                  />
                  <span>.</span>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <span>Her birthday is in 📅 (2)</span>
                  <input
                    type="text"
                    value={annAnswers.month}
                    onChange={e => setAnnAnswers({ ...annAnswers, month: e.target.value })}
                    placeholder="April"
                    className="px-3 py-1 border border-slate-300 rounded-xl text-sm font-bold text-amber-700 w-32 bg-white focus:outline-amber-500"
                  />
                  <span>.</span>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <span>She can 🎤 (3)</span>
                  <input
                    type="text"
                    value={annAnswers.can1}
                    onChange={e => setAnnAnswers({ ...annAnswers, can1: e.target.value })}
                    placeholder="sing"
                    className="px-3 py-1 border border-slate-300 rounded-xl text-sm font-bold text-amber-700 w-28 bg-white focus:outline-amber-500"
                  />
                  <span>and 🎨 (4)</span>
                  <input
                    type="text"
                    value={annAnswers.can2}
                    onChange={e => setAnnAnswers({ ...annAnswers, can2: e.target.value })}
                    placeholder="draw"
                    className="px-3 py-1 border border-slate-300 rounded-xl text-sm font-bold text-amber-700 w-28 bg-white focus:outline-amber-500"
                  />
                  <span>, but she can’t 🛼 (5)</span>
                  <input
                    type="text"
                    value={annAnswers.cant}
                    onChange={e => setAnnAnswers({ ...annAnswers, cant: e.target.value })}
                    placeholder="roller skate"
                    className="px-3 py-1 border border-slate-300 rounded-xl text-sm font-bold text-amber-700 w-36 bg-white focus:outline-amber-500"
                  />
                  <span>.</span>
                </div>
              </div>

              {/* Read Whole Passage button */}
              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={() => {
                    const country = annAnswers.country || 'America';
                    const month = annAnswers.month || 'April';
                    const can1 = annAnswers.can1 || 'sing';
                    const can2 = annAnswers.can2 || 'draw';
                    const cant = annAnswers.cant || 'roller skate';
                    const text = `I have a friend. Her name is Ann. She is from ${country}. Her birthday is in ${month}. She can ${can1} and ${can2}, but she can't ${cant}.`;
                    speakWord(text, speechRate);
                    sound.playVictory();
                    confetti({ particleCount: 40, spread: 60 });
                    onAddStar(3);
                  }}
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-black transition-all flex items-center gap-2 shadow-sm"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Phát Âm Bài Viết Hoàn Chỉnh</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: TRANG 42 SGK • EXTENSION ACTIVITIES 1 & 2 */}
      {/* ========================================================================= */}
      {activeTab === 3 && (
        <div className="space-y-6">
          {/* Extension Activity 1: Look and write (Countries & Map Shapes) */}
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6">
            <div>
              <span className="text-xs font-black text-amber-600 uppercase tracking-wider block">
                Mở Rộng 1 • SGK Trang 42
              </span>
              <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <span>1. Look and write • Bản đồ & Quốc kỳ 5 quốc gia</span>
                <span className="text-2xl">🗺️</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Nhìn hình dạng bản đồ địa lý và quốc kỳ để viết tên 5 quốc gia: America, Australia, Britain, Japan, Viet Nam.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {mapCountries.map(c => (
                <div
                  key={c.id}
                  className="p-5 rounded-3xl border-2 border-slate-200 bg-slate-50 space-y-3 hover:border-amber-400 transition-all text-center flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-slate-500">Mục #{c.id}</span>
                      <span className="text-3xl">{c.flag}</span>
                    </div>

                    <div className="py-2">
                      <span className="text-xs font-bold text-amber-800 block">
                        Đặc điểm nhận dạng:
                      </span>
                      <p className="text-xs text-slate-600">{c.shapeDesc}</p>
                    </div>

                    <div className="text-xs text-slate-500 bg-white p-2.5 rounded-xl border border-slate-100">
                      Thủ đô: <strong>{c.capital}</strong>
                    </div>
                  </div>

                  <div className="pt-2">
                    <input
                      type="text"
                      value={mapInputs[c.id]}
                      onChange={e => setMapInputs({ ...mapInputs, [c.id]: e.target.value })}
                      placeholder={`Tên nước #${c.id}...`}
                      className="w-full text-center px-3 py-2 border border-slate-300 rounded-xl text-sm font-black text-amber-700 bg-white focus:outline-amber-500"
                    />
                    {mapChecked && (
                      <div className="text-[11px] font-bold mt-1 text-emerald-700">
                        {mapInputs[c.id].trim().toLowerCase() === c.country.toLowerCase()
                          ? '✅ Chính xác!'
                          : `👉 Đáp án: ${c.country}`}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => {
                  setMapChecked(true);
                  sound.playVictory();
                  confetti({ particleCount: 50, spread: 60 });
                  onAddStar(5);
                }}
                className="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-black transition-all shadow-sm"
              >
                Kiểm Tra 5 Quốc Gia
              </button>
            </div>
          </div>

          {/* Extension Activity 2: World Clock (Múi Giờ Thế Giới) */}
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6">
            <div>
              <span className="text-xs font-black text-amber-600 uppercase tracking-wider block">
                Mở Rộng 2 • SGK Trang 42
              </span>
              <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <span>2. Look and write • Múi giờ thế giới (World Clock)</span>
                <span className="text-2xl">⏰</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Quan sát đồng hồ tại các thành phố lớn trên thế giới và viết câu thông báo giờ chuẩn cấu trúc: "In [Country], it’s [time]."
              </p>
            </div>

            <div className="space-y-3">
              {worldClocks.map(clock => (
                <div
                  key={clock.id}
                  className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-3 hover:bg-white hover:border-amber-300 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1.5 bg-slate-900 text-amber-300 font-mono font-black text-sm rounded-xl">
                      {clock.timeDigital}
                    </span>
                    <div>
                      <span className="text-sm font-black text-slate-900 block">
                        {clock.cityCountry}
                      </span>
                      <span className="text-xs text-slate-500">{clock.period}</span>
                    </div>
                  </div>

                  <div className="flex-1 max-w-md">
                    {clock.id === 1 ? (
                      <div className="text-sm font-black text-slate-800 italic">
                        1. In America, it’s <u className="text-amber-700">eight o’clock</u>. (Mẫu)
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-bold text-slate-800">
                          {clock.id}. In {clock.cityCountry.split(', ')[1]}, it’s
                        </span>
                        <input
                          type="text"
                          value={clockInputs[clock.id]}
                          onChange={e =>
                            setClockInputs({ ...clockInputs, [clock.id]: e.target.value })
                          }
                          placeholder={clock.hourWord}
                          className="px-3 py-1 border border-slate-300 rounded-xl text-xs font-bold text-amber-700 w-36 bg-white focus:outline-amber-500"
                        />
                        <span>.</span>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => speakWord(clock.sentenceSample, speechRate)}
                    className="p-2 bg-amber-100 hover:bg-amber-200 text-amber-800 rounded-xl transition-colors self-start md:self-auto"
                    title="Nghe câu đọc giờ"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => {
                  setClockChecked(true);
                  sound.playVictory();
                  confetti({ particleCount: 50, spread: 60 });
                  onAddStar(4);
                }}
                className="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-black transition-all shadow-sm"
              >
                Kiểm Tra Múi Giờ
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: TRANG 43 SGK • EXTENSION ACTIVITY 3: NEAR & FAR FROM VIET NAM */}
      {/* ========================================================================= */}
      {activeTab === 4 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6">
          <div>
            <span className="text-xs font-black text-amber-600 uppercase tracking-wider block">
              Mở Rộng 3 • SGK Trang 43
            </span>
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <span>3. Read the questions. Then tick the answers.</span>
              <span className="text-2xl">🧭</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Khám phá địa lý thế giới: Phân biệt các quốc gia ở GẦN Việt Nam (near Viet Nam) và các quốc gia ở XA Việt Nam (far from Viet Nam).
            </p>
          </div>

          {/* 4 Geography Questions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {geoQuizzes.map(quiz => (
              <div
                key={quiz.id}
                className="p-5 rounded-3xl border-2 border-slate-200 bg-slate-50 space-y-4 hover:border-amber-300 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs font-black uppercase px-3 py-1 rounded-full ${
                      quiz.type === 'near'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-indigo-100 text-indigo-800'
                    }`}
                  >
                    {quiz.type === 'near' ? '📍 Nước Ở GẦN (Near)' : '✈️ Nước Ở XA (Far)'}
                  </span>
                  <span className="text-xs font-mono text-slate-400">Câu #{quiz.id}</span>
                </div>

                <div>
                  <h4 className="text-base font-black text-slate-900">{quiz.question}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">{quiz.questionVi}</p>
                </div>

                {/* 3 Flags to tick */}
                <div className="grid grid-cols-3 gap-2">
                  {quiz.options.map(opt => {
                    const isPicked = quiz.userChoice === opt.name;
                    return (
                      <button
                        key={opt.name}
                        onClick={() => {
                          setGeoQuizzes(prev =>
                            prev.map(q =>
                              q.id === quiz.id ? { ...q, userChoice: opt.name } : q
                            )
                          );
                          sound.playClick();
                        }}
                        className={`p-3 rounded-2xl border-2 text-center transition-all flex flex-col items-center justify-between ${
                          isPicked
                            ? 'border-amber-600 bg-amber-100/70 shadow-sm scale-105'
                            : 'border-slate-200 bg-white hover:bg-slate-100'
                        }`}
                      >
                        <span className="text-3xl block py-1">{opt.flag}</span>
                        <span className="text-xs font-black text-slate-900">{opt.name}</span>
                        {isPicked && <CheckCircle2 className="w-4 h-4 text-amber-600 mt-1" />}
                      </button>
                    );
                  })}
                </div>

                {/* Feedback when checked */}
                {geoChecked && (
                  <div className="pt-2 text-xs font-bold space-y-1">
                    {quiz.options.map(opt => (
                      <div
                        key={opt.name}
                        className={`p-2 rounded-xl flex items-center justify-between ${
                          opt.isCorrect
                            ? 'bg-emerald-100 text-emerald-900'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        <span>
                          {opt.flag} {opt.name}: {opt.distanceVi}
                        </span>
                        {opt.isCorrect && <span>✅ ĐÚNG</span>}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center pt-2">
            <button
              onClick={() => {
                setGeoChecked(true);
                const allRight = geoQuizzes.every(
                  q => q.options.find(o => o.name === q.userChoice)?.isCorrect
                );
                if (allRight) {
                  sound.playVictory();
                  confetti({ particleCount: 60, spread: 70 });
                  onAddStar(5);
                } else {
                  sound.playCorrect();
                }
              }}
              className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-2xl text-sm font-black transition-all shadow-md inline-flex items-center gap-2"
            >
              <Check className="w-5 h-5" />
              <span>Kiểm Tra Địa Lý Gần / Xa</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
