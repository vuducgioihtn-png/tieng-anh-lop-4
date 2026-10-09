import React, { useState, useMemo } from 'react';
import confetti from 'canvas-confetti';
import {
  X,
  Shield,
  CheckCircle2,
  XCircle,
  Clock,
  UserCheck,
  UserX,
  Trash2,
  Search,
  Filter,
  Sparkles,
  Award,
  Users,
  CheckCheck,
  AlertCircle,
  Phone,
  School,
  GraduationCap,
  Calendar,
  Eye,
  RefreshCw
} from 'lucide-react';
import { authService } from '../../services/authService';
import { UserProfile, UserStatus } from '../../types/auth';
import { sound } from '../../utils/audio';

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile | null;
  onUserApproved?: () => void;
}

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onUserApproved
}) => {
  const [users, setUsers] = useState<UserProfile[]>(() => authService.getAllUsers());
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<UserStatus | 'all'>('all');
  const [notification, setNotification] = useState<{ text: string; type: 'success' | 'info' } | null>(null);

  if (!isOpen) return null;

  const refreshUsersList = () => {
    setUsers(authService.getAllUsers());
  };

  // Stats
  const totalStudents = users.filter(u => u.role === 'student').length;
  const pendingCount = users.filter(u => u.status === 'pending').length;
  const approvedCount = users.filter(u => u.status === 'approved' && u.role === 'student').length;
  const rejectedCount = users.filter(u => u.status === 'rejected').length;

  // Filtered users
  const filteredUsers = users.filter(u => {
    const term = searchTerm.toLowerCase().trim();
    const matchSearch =
      !term ||
      u.fullName.toLowerCase().includes(term) ||
      u.username.toLowerCase().includes(term) ||
      (u.schoolClass && u.schoolClass.toLowerCase().includes(term)) ||
      (u.schoolName && u.schoolName.toLowerCase().includes(term)) ||
      (u.phone && u.phone.includes(term));

    const matchStatus = statusFilter === 'all' || u.status === statusFilter;
    return matchSearch && matchStatus;
  });

  // Action: Approve student
  const handleApprove = (userId: string, name: string) => {
    sound.playCorrect();
    confetti({ particleCount: 70, spread: 50, origin: { y: 0.6 } });
    authService.approveUser(userId, currentUser?.fullName || 'Thầy Vũ Đức Giỏi');
    refreshUsersList();
    setNotification({ text: `Đã phê duyệt cho học sinh "${name}" vào học thành công! ✅`, type: 'success' });
    if (onUserApproved) onUserApproved();
  };

  // Action: Reject student
  const handleReject = (userId: string, name: string) => {
    sound.playWrong();
    authService.rejectUser(userId);
    refreshUsersList();
    setNotification({ text: `Đã tạm từ chối học sinh "${name}". ❌`, type: 'info' });
  };

  // Action: Approve ALL pending students
  const handleApproveAll = () => {
    sound.playVictory();
    confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
    const count = authService.approveAllPending(currentUser?.fullName || 'Thầy Vũ Đức Giỏi');
    refreshUsersList();
    setNotification({ text: `Đã phê duyệt toàn bộ ${count} học sinh đang chờ vào học! 🎉`, type: 'success' });
    if (onUserApproved) onUserApproved();
  };

  // Action: Delete student
  const handleDelete = (userId: string, name: string) => {
    if (confirm(`Bạn có chắc chắn muốn xóa tài khoản của "${name}" không?`)) {
      sound.playClick();
      authService.deleteUser(userId);
      refreshUsersList();
      setNotification({ text: `Đã xóa tài khoản "${name}".`, type: 'info' });
    }
  };

  // Switch to that student to preview
  const handleSwitchToStudent = (userId: string) => {
    sound.playClick();
    authService.switchUser(userId);
    onClose();
    window.location.reload();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-800 via-indigo-700 to-blue-700 p-6 text-white relative">
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
            <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-black uppercase tracking-wider backdrop-blur-md flex items-center gap-1.5 border border-white/20">
              <Shield className="w-3.5 h-3.5 text-amber-300" />
              Bảng Điều Khiển Quản Trị Viên (Admin Studio)
            </span>
            {pendingCount > 0 && (
              <span className="px-3 py-1 rounded-full bg-amber-400 text-amber-950 text-xs font-black animate-pulse flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {pendingCount} Học Sinh Chờ Duyệt!
              </span>
            )}
          </div>

          <h2 className="text-2xl sm:text-3xl font-black tracking-tight flex items-center gap-2.5">
            <span>QUẢN LÝ &amp; DUYỆT TÀI KHOẢN VÀO HỌC</span>
            <span>📋✨</span>
          </h2>
          <p className="text-indigo-100 text-xs sm:text-sm mt-1 max-w-2xl font-medium">
            Phê duyệt học sinh vào lớp học SGK Tiếng Anh 4 Global Success, theo dõi danh sách theo lớp và cấp quyền học tập.
          </p>

          {/* Quick KPI Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-5">
            <div className="bg-black/20 backdrop-blur-md rounded-2xl p-3 border border-white/10">
              <div className="text-[11px] font-bold text-indigo-200">Tổng Học Sinh</div>
              <div className="text-2xl font-black text-white mt-0.5">{totalStudents}</div>
            </div>

            <div className={`rounded-2xl p-3 border transition-all ${
              pendingCount > 0
                ? 'bg-amber-400/30 border-amber-300 text-white shadow-sm'
                : 'bg-black/20 border-white/10 text-white'
            }`}>
              <div className="text-[11px] font-bold text-amber-200 flex items-center gap-1">
                <Clock className="w-3 h-3 text-amber-300" /> Chờ Phê Duyệt
              </div>
              <div className="text-2xl font-black text-amber-300 mt-0.5">{pendingCount}</div>
            </div>

            <div className="bg-black/20 backdrop-blur-md rounded-2xl p-3 border border-white/10">
              <div className="text-[11px] font-bold text-emerald-200 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-300" /> Đã Vào Học
              </div>
              <div className="text-2xl font-black text-emerald-300 mt-0.5">{approvedCount}</div>
            </div>

            <div className="bg-black/20 backdrop-blur-md rounded-2xl p-3 border border-white/10">
              <div className="text-[11px] font-bold text-rose-200">Từ Chối / Khóa</div>
              <div className="text-2xl font-black text-rose-300 mt-0.5">{rejectedCount}</div>
            </div>
          </div>
        </div>

        {/* Action Controls & Filters */}
        <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50/70 flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Tìm theo tên học sinh, lớp, trường, SĐT..."
              className="w-full pl-10 pr-4 py-2 rounded-2xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            />
          </div>

          {/* Filter Pills & Approve All button */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-end flex-wrap">
            <div className="flex items-center gap-1 bg-white p-1 rounded-2xl border border-slate-200 text-xs font-bold">
              <button
                onClick={() => {
                  sound.playClick();
                  setStatusFilter('all');
                }}
                className={`px-3 py-1 rounded-xl transition ${
                  statusFilter === 'all' ? 'bg-indigo-600 text-white shadow-xs font-black' : 'text-slate-600'
                }`}
              >
                Tất cả ({users.length})
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setStatusFilter('pending');
                }}
                className={`px-3 py-1 rounded-xl transition flex items-center gap-1 ${
                  statusFilter === 'pending'
                    ? 'bg-amber-500 text-white shadow-xs font-black'
                    : 'text-amber-800 hover:bg-amber-50'
                }`}
              >
                <span>Chờ duyệt</span>
                <span className="text-[10px] bg-black/20 text-white px-1.5 py-0.2 rounded-full font-black">
                  {pendingCount}
                </span>
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setStatusFilter('approved');
                }}
                className={`px-3 py-1 rounded-xl transition ${
                  statusFilter === 'approved' ? 'bg-emerald-600 text-white shadow-xs font-black' : 'text-slate-600'
                }`}
              >
                Đã duyệt ({approvedCount})
              </button>
            </div>

            {pendingCount > 0 && (
              <button
                onClick={handleApproveAll}
                className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-green-600 hover:brightness-105 text-white rounded-2xl text-xs font-black transition shadow-md flex items-center gap-1.5 active:scale-95"
              >
                <CheckCheck className="w-4 h-4" />
                <span>Duyệt Tất Cả ({pendingCount})</span>
              </button>
            )}
          </div>
        </div>

        {/* Notification Toast */}
        {notification && (
          <div className="mx-6 mt-4 p-3 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-900 text-xs font-bold flex items-center justify-between animate-fadeIn">
            <span>{notification.text}</span>
            <button onClick={() => setNotification(null)} className="text-slate-400 hover:text-slate-600">✕</button>
          </div>
        )}

        {/* Users List Table */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3">
          {filteredUsers.length === 0 ? (
            <div className="text-center py-12 text-slate-400 space-y-2">
              <Users className="w-12 h-12 mx-auto text-slate-300" />
              <p className="font-bold text-slate-700">Không tìm thấy tài khoản học sinh nào phù hợp.</p>
              <p className="text-xs">Hãy thử đổi từ khóa tìm kiếm hoặc bấm &quot;Tất cả&quot;.</p>
            </div>
          ) : (
            filteredUsers.map(user => {
              const isPending = user.status === 'pending';
              const isApproved = user.status === 'approved';
              const isRejected = user.status === 'rejected';

              return (
                <div
                  key={user.id}
                  className={`p-4 rounded-2xl border-2 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    isPending
                      ? 'border-amber-300 bg-amber-50/40 shadow-xs'
                      : isApproved
                      ? 'border-slate-200 bg-white hover:border-slate-300'
                      : 'border-rose-200 bg-rose-50/30'
                  }`}
                >
                  {/* Left: User Details */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-2xl shrink-0 shadow-inner">
                      {user.avatarEmoji || (user.role === 'admin' ? '👨‍🏫' : '👦')}
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-base font-black text-slate-900">
                          {user.fullName}
                        </h4>
                        <span className="text-[11px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md font-semibold">
                          @{user.username}
                        </span>
                        {user.role === 'admin' && (
                          <span className="text-[10px] font-black bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full border border-purple-200">
                            🛡️ Quản trị viên
                          </span>
                        )}
                        {isPending && (
                          <span className="text-[11px] font-black bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full border border-amber-300 animate-pulse flex items-center gap-1">
                            <Clock className="w-3 h-3 text-amber-600" />
                            Đang chờ duyệt
                          </span>
                        )}
                        {isApproved && user.role === 'student' && (
                          <span className="text-[10px] font-black bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            Đã duyệt vào học
                          </span>
                        )}
                        {isRejected && (
                          <span className="text-[10px] font-black bg-rose-100 text-rose-800 px-2 py-0.5 rounded-full border border-rose-200">
                            ❌ Từ chối
                          </span>
                        )}
                      </div>

                      {/* Class, School, Phone info */}
                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600">
                        {user.schoolClass && (
                          <span className="font-bold text-indigo-700 flex items-center gap-1">
                            <GraduationCap className="w-3.5 h-3.5" />
                            {user.schoolClass}
                          </span>
                        )}
                        {user.schoolName && (
                          <span className="flex items-center gap-1">
                            <School className="w-3.5 h-3.5 text-slate-400" />
                            {user.schoolName}
                          </span>
                        )}
                        {user.phone && (
                          <span className="flex items-center gap-1">
                            <Phone className="w-3.5 h-3.5 text-slate-400" />
                            SĐT PH: {user.phone}
                          </span>
                        )}
                        <span className="text-slate-400 flex items-center gap-1 text-[11px]">
                          <Calendar className="w-3 h-3" />
                          {user.registeredAt}
                        </span>
                      </div>

                      {/* Student note */}
                      {user.note && (
                        <p className="text-xs text-amber-900 bg-amber-100/70 px-2.5 py-1 rounded-xl font-medium inline-block mt-1">
                          💬 Lời nhắn: &quot;{user.note}&quot;
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Right: Action Buttons */}
                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                    {isPending && (
                      <>
                        <button
                          onClick={() => handleApprove(user.id, user.fullName)}
                          className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black transition flex items-center gap-1 shadow-sm active:scale-95"
                          title="Duyệt cho học sinh vào học"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Duyệt Ngay</span>
                        </button>

                        <button
                          onClick={() => handleReject(user.id, user.fullName)}
                          className="px-2.5 py-2 bg-slate-100 hover:bg-rose-100 text-slate-600 hover:text-rose-700 rounded-xl text-xs font-bold transition flex items-center gap-1"
                          title="Từ chối yêu cầu"
                        >
                          <XCircle className="w-4 h-4" />
                          <span>Từ chối</span>
                        </button>
                      </>
                    )}

                    {isApproved && user.role === 'student' && (
                      <button
                        onClick={() => handleReject(user.id, user.fullName)}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-amber-100 text-slate-600 hover:text-amber-800 rounded-xl text-xs font-bold transition"
                        title="Tạm dừng quyền học tập"
                      >
                        Tạm dừng
                      </button>
                    )}

                    {isRejected && (
                      <button
                        onClick={() => handleApprove(user.id, user.fullName)}
                        className="px-3 py-1.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 rounded-xl text-xs font-bold transition"
                      >
                        Duyệt lại
                      </button>
                    )}

                    {/* Switch role preview */}
                    <button
                      onClick={() => handleSwitchToStudent(user.id)}
                      className="p-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 transition"
                      title="Xem giao diện với tư cách học sinh này"
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                    {/* Delete button (except main admin) */}
                    {user.id !== 'user-admin-1' && (
                      <button
                        onClick={() => handleDelete(user.id, user.fullName)}
                        className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                        title="Xóa tài khoản"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <span className="font-bold">Đang đăng nhập quyền:</span>
            <span className="font-black text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-200">
              {currentUser?.fullName} ({currentUser?.role === 'admin' ? 'Quản Trị Viên' : 'Người Dùng'})
            </span>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="px-5 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl font-bold transition"
          >
            Đóng bảng quản trị
          </button>
        </div>
      </div>
    </div>
  );
};
