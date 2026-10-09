import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  X,
  User,
  Lock,
  Phone,
  School,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Clock,
  Shield,
  ArrowRight,
  LogIn,
  UserPlus,
  GraduationCap,
  BookOpen
} from 'lucide-react';
import { authService } from '../../services/authService';
import { UserProfile, RegisterFormData } from '../../types/auth';
import { sound } from '../../utils/audio';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (user: UserProfile) => void;
  onOpenAdminDashboard?: () => void;
  initialTab?: 'register' | 'login';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onAuthSuccess,
  onOpenAdminDashboard,
  initialTab = 'register'
}) => {
  const [activeTab, setActiveTab] = useState<'register' | 'login'>(initialTab);

  // Register Form State
  const [registerData, setRegisterData] = useState<RegisterFormData>({
    fullName: '',
    username: '',
    phone: '',
    schoolClass: 'Lớp 4A1',
    schoolName: '',
    password: '',
    note: ''
  });

  // Login Form State
  const [loginUsername, setLoginUsername] = useState<string>('');
  const [loginPassword, setLoginPassword] = useState<string>('');

  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  if (!isOpen) return null;

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!registerData.fullName.trim()) {
      setErrorMessage('Vui lòng nhập họ và tên của em.');
      return;
    }
    if (!registerData.username.trim()) {
      setErrorMessage('Vui lòng tạo tên đăng nhập (viết liền không dấu).');
      return;
    }

    const res = authService.registerStudent(registerData);
    if (res.success && res.user) {
      sound.playSuccess();
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
      setSuccessMessage(res.message);
      onAuthSuccess(res.user);
    } else {
      sound.playWrong();
      setErrorMessage(res.message);
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!loginUsername.trim()) {
      setErrorMessage('Vui lòng nhập tên đăng nhập hoặc email.');
      return;
    }

    const res = authService.login(loginUsername, loginPassword);
    if (res.success && res.user) {
      sound.playSuccess();
      onAuthSuccess(res.user);
      onClose();
    } else {
      sound.playWrong();
      setErrorMessage(res.message);
    }
  };

  // Quick login helper
  const handleQuickLogin = (username: string) => {
    sound.playClick();
    const res = authService.login(username);
    if (res.success && res.user) {
      sound.playSuccess();
      onAuthSuccess(res.user);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header with Title and Close Button */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-700 p-6 text-white relative">
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider backdrop-blur-xs flex items-center gap-1">
              <GraduationCap className="w-3.5 h-3.5 text-amber-300" />
              Cổng Học Sinh &amp; Quản Trị
            </span>
          </div>

          <h2 className="text-2xl font-black tracking-tight">
            {activeTab === 'register' ? 'Đăng Ký Tài Khoản Học Sinh' : 'Đăng Nhập Vào Lớp Học'}
          </h2>
          <p className="text-blue-100 text-xs mt-1">
            {activeTab === 'register'
              ? 'Đăng ký thông tin học sinh để Thầy/Cô giáo phê duyệt vào học đầy đủ các bài giảng SGK.'
              : 'Đăng nhập để lưu tiến độ, số sao thưởng và học tiếp các bài học SGK Tiếng Anh 4.'}
          </p>

          {/* Tab Selector */}
          <div className="flex items-center gap-1.5 mt-5 bg-black/20 p-1 rounded-2xl backdrop-blur-md">
            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('register');
                setErrorMessage('');
                setSuccessMessage('');
              }}
              className={`flex-1 py-2 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'register'
                  ? 'bg-white text-indigo-900 shadow-sm'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Đăng Ký Học Sinh Mới</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('login');
                setErrorMessage('');
                setSuccessMessage('');
              }}
              className={`flex-1 py-2 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'login'
                  ? 'bg-white text-indigo-900 shadow-sm'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Đăng Nhập</span>
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          {/* Notification Banners */}
          {errorMessage && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-start gap-2 animate-shake">
              <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold space-y-2 animate-fadeIn">
              <div className="flex items-center gap-2 text-emerald-700">
                <CheckCircle2 className="w-5 h-5" />
                <span className="font-black text-sm">Đăng ký thành công!</span>
              </div>
              <p className="text-emerald-800 font-medium">
                Tài khoản của em đang ở trạng thái <strong className="text-amber-800 bg-amber-100 px-2 py-0.5 rounded">Chờ duyệt ⏳</strong>.
                Thầy/Cô giáo sẽ phê duyệt sớm để em mở khóa toàn bộ 20 Unit!
              </p>
              <div className="pt-2 flex items-center justify-between border-t border-emerald-100">
                <span className="text-[11px] text-slate-500">Mẹo: Em có thể vào Admin để duyệt ngay để thử nghiệm!</span>
                {onOpenAdminDashboard && (
                  <button
                    onClick={() => {
                      onClose();
                      onOpenAdminDashboard();
                    }}
                    className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1 shadow-xs"
                  >
                    <span>Mở Admin Duyệt Ngay</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* ================= REGISTER FORM ================= */}
          {activeTab === 'register' && !successMessage && (
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Họ và tên học sinh <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="Ví dụ: Nguyễn Minh Đức"
                    value={registerData.fullName}
                    onChange={e => setRegisterData({ ...registerData, fullName: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 text-xs md:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50/60"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Tên đăng nhập <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="VD: minhduc4a"
                    value={registerData.username}
                    onChange={e => setRegisterData({ ...registerData, username: e.target.value.toLowerCase().replace(/\s/g, '') })}
                    className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-200 text-xs md:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50/60"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Lớp học <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={registerData.schoolClass}
                    onChange={e => setRegisterData({ ...registerData, schoolClass: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-2xl border border-slate-200 text-xs md:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50/60"
                  >
                    <option value="Lớp 4A1">Lớp 4A1</option>
                    <option value="Lớp 4A2">Lớp 4A2</option>
                    <option value="Lớp 4A3">Lớp 4A3</option>
                    <option value="Lớp 4B">Lớp 4B</option>
                    <option value="Lớp 4C">Lớp 4C</option>
                    <option value="Lớp 4D">Lớp 4D</option>
                    <option value="Khác">Lớp học khác</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Trường Tiểu học
                  </label>
                  <div className="relative">
                    <School className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="VD: Tiểu học Lê Quý Đôn"
                      value={registerData.schoolName}
                      onChange={e => setRegisterData({ ...registerData, schoolName: e.target.value })}
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-2xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50/60"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Số điện thoại phụ huynh
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      placeholder="VD: 0912 345 678"
                      value={registerData.phone}
                      onChange={e => setRegisterData({ ...registerData, phone: e.target.value })}
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-2xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50/60"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Mật khẩu đăng nhập
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    placeholder="Tùy chọn (để trống mật khẩu mặc định 123456)"
                    value={registerData.password}
                    onChange={e => setRegisterData({ ...registerData, password: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 text-xs md:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50/60"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Ghi chú gửi Thầy/Cô phê duyệt
                </label>
                <textarea
                  rows={2}
                  placeholder="VD: Em xin phép thầy cô duyệt cho em vào học bài Unit 19 và Unit 20..."
                  value={registerData.note}
                  onChange={e => setRegisterData({ ...registerData, note: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-2xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50/60 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-2xl text-xs md:text-sm font-black transition-all shadow-md hover:brightness-105 active:scale-98 flex items-center justify-center gap-2 mt-2"
              >
                <UserPlus className="w-4 h-4" />
                <span>Gửi Đăng Ký Chờ Admin / Thầy Cô Duyệt</span>
              </button>
            </form>
          )}

          {/* ================= LOGIN FORM ================= */}
          {activeTab === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Tên đăng nhập hoặc Email
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="Nhập tên đăng nhập hoặc email..."
                    value={loginUsername}
                    onChange={e => setLoginUsername(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-200 text-xs md:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50/60"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Mật khẩu
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    placeholder="Mật khẩu của bạn..."
                    value={loginPassword}
                    onChange={e => setLoginPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-200 text-xs md:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50/60"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl text-xs md:text-sm font-black transition-all shadow-md hover:brightness-105 active:scale-98 flex items-center justify-center gap-2"
              >
                <LogIn className="w-4 h-4" />
                <span>Đăng Nhập Vào Học</span>
              </button>
            </form>
          )}

          {/* Quick Login Bar (Ideal for teacher / admin demo) */}
          <div className="pt-4 border-t border-slate-100 space-y-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              ⚡ Tài Khoản Mẫu Để Thử Nghiệm Nhanh:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => handleQuickLogin('admin')}
                className="p-2.5 rounded-xl border border-purple-200 bg-purple-50 hover:bg-purple-100 text-purple-900 font-bold transition flex items-center justify-between text-left"
              >
                <div>
                  <div className="flex items-center gap-1 font-black">
                    <Shield className="w-3.5 h-3.5 text-purple-600" />
                    <span>Thầy Vũ Đức Giỏi</span>
                  </div>
                  <span className="text-[10px] text-purple-600 font-medium">Tài khoản Admin / Giáo viên</span>
                </div>
                <span className="text-[10px] bg-purple-200 px-2 py-0.5 rounded-full font-black">Duyệt bài</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickLogin('minhduc')}
                className="p-2.5 rounded-xl border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-bold transition flex items-center justify-between text-left"
              >
                <div>
                  <div className="flex items-center gap-1 font-black">
                    <span>👦</span>
                    <span>Nguyễn Minh Đức</span>
                  </div>
                  <span className="text-[10px] text-emerald-600 font-medium">Học sinh (Đã duyệt ✅)</span>
                </div>
                <span className="text-[10px] bg-emerald-200 px-2 py-0.5 rounded-full font-black">Vào học</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
