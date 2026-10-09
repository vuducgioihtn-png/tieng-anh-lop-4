import { UserProfile, RegisterFormData, UserStatus } from '../types/auth';

const STORAGE_KEY_USERS = 'ta4_users_db_v2';
const STORAGE_KEY_CURRENT_USER = 'ta4_current_user_v2';

// Initial preloaded accounts
const INITIAL_USERS: UserProfile[] = [
  {
    id: 'user-admin-1',
    fullName: 'Thầy Vũ Đức Giỏi (Quản Trị Viên)',
    username: 'admin',
    email: 'vuducgioinb@gmail.com',
    phone: '0988888888',
    schoolClass: 'Tổ Chuyên Môn Tiếng Anh',
    schoolName: 'Hệ Thống Giáo Dục Global Success',
    role: 'admin',
    status: 'approved',
    registeredAt: '2026-09-01 08:00',
    approvedAt: '2026-09-01 08:00',
    approvedBy: 'Hệ Thống',
    stars: 999,
    avatarEmoji: '👨‍🏫'
  },
  {
    id: 'user-student-1',
    fullName: 'Nguyễn Minh Đức',
    username: 'minhduc',
    phone: '0912345678',
    schoolClass: 'Lớp 4A1',
    schoolName: 'Tiểu học Lê Quý Đôn',
    role: 'student',
    status: 'approved',
    registeredAt: '2026-10-01 09:30',
    approvedAt: '2026-10-01 10:00',
    approvedBy: 'Thầy Vũ Đức Giỏi',
    note: 'Đã hoàn thành học phí và được duyệt vào lớp chính thức',
    stars: 45,
    avatarEmoji: '👦'
  },
  {
    id: 'user-student-2',
    fullName: 'Trần Mai Anh',
    username: 'maianh',
    phone: '0987654321',
    schoolClass: 'Lớp 4A2',
    schoolName: 'Tiểu học Chu Văn An',
    role: 'student',
    status: 'pending',
    registeredAt: '2026-10-06 14:15',
    note: 'Em xin thầy cô duyệt cho em vào học bài Unit 19 và Unit 20 ạ!',
    stars: 12,
    avatarEmoji: '👧'
  },
  {
    id: 'user-student-3',
    fullName: 'Lê Bảo Nam',
    username: 'baonam',
    phone: '0934567890',
    schoolClass: 'Lớp 4B',
    schoolName: 'Tiểu học Thăng Long',
    role: 'student',
    status: 'pending',
    registeredAt: '2026-10-06 16:40',
    note: 'Phụ huynh xin đăng ký cho con học thêm buổi tối',
    stars: 5,
    avatarEmoji: '🧑'
  }
];

class AuthService {
  private users: UserProfile[] = [];
  private currentUser: UserProfile | null = null;

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    if (typeof window === 'undefined') return;

    try {
      const storedUsers = localStorage.getItem(STORAGE_KEY_USERS);
      if (storedUsers) {
        this.users = JSON.parse(storedUsers);
      } else {
        this.users = [...INITIAL_USERS];
        this.saveUsersToStorage();
      }

      const storedCurrent = localStorage.getItem(STORAGE_KEY_CURRENT_USER);
      if (storedCurrent) {
        this.currentUser = JSON.parse(storedCurrent);
      } else {
        // Default to admin or null
        this.currentUser = this.users[0] || null; // Preload as admin for convenience, user can switch
      }
    } catch {
      this.users = [...INITIAL_USERS];
      this.currentUser = this.users[0] || null;
    }
  }

  private saveUsersToStorage() {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(this.users));
    } catch (e) {
      console.error('Failed to save users', e);
    }
  }

  private saveCurrentUserToStorage() {
    if (typeof window === 'undefined') return;
    try {
      if (this.currentUser) {
        localStorage.setItem(STORAGE_KEY_CURRENT_USER, JSON.stringify(this.currentUser));
      } else {
        localStorage.removeItem(STORAGE_KEY_CURRENT_USER);
      }
    } catch (e) {
      console.error('Failed to save current user', e);
    }
  }

  // Get all users
  public getAllUsers(): UserProfile[] {
    return [...this.users];
  }

  // Get current logged in user
  public getCurrentUser(): UserProfile | null {
    if (!this.currentUser) return null;
    // Always refresh with latest in list
    const found = this.users.find(u => u.id === this.currentUser?.id);
    if (found) {
      this.currentUser = found;
    }
    return this.currentUser;
  }

  // Register new student
  public registerStudent(data: RegisterFormData): { success: boolean; message: string; user?: UserProfile } {
    const usernameTrimmed = data.username.toLowerCase().trim();
    if (!usernameTrimmed || !data.fullName.trim() || !data.schoolClass.trim()) {
      return { success: false, message: 'Vui lòng điền đầy đủ họ tên, tên đăng nhập và lớp học!' };
    }

    const existing = this.users.find(u => u.username.toLowerCase() === usernameTrimmed);
    if (existing) {
      return { success: false, message: 'Tên đăng nhập này đã được sử dụng. Vui lòng chọn tên khác!' };
    }

    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newUser: UserProfile = {
      id: `user-${Date.now()}`,
      fullName: data.fullName.trim(),
      username: usernameTrimmed,
      phone: data.phone?.trim() || '',
      schoolClass: data.schoolClass.trim(),
      schoolName: data.schoolName?.trim() || 'Trường Tiểu Học',
      role: 'student',
      status: 'pending', // Waiting for Admin approval!
      registeredAt: formattedDate,
      note: data.note?.trim() || 'Học sinh đăng ký vào học',
      stars: 0,
      avatarEmoji: Math.random() > 0.5 ? '👦' : '👧'
    };

    this.users.unshift(newUser);
    this.saveUsersToStorage();

    // Auto switch to new user to show pending screen
    this.currentUser = newUser;
    this.saveCurrentUserToStorage();

    return {
      success: true,
      message: 'Đăng ký tài khoản thành công! Hồ sơ của em đang chờ Thầy/Cô phê duyệt.',
      user: newUser
    };
  }

  // Login
  public login(usernameOrEmail: string, _password?: string): { success: boolean; message: string; user?: UserProfile } {
    const input = usernameOrEmail.toLowerCase().trim();
    const user = this.users.find(u => u.username.toLowerCase() === input || u.email?.toLowerCase() === input);

    if (!user) {
      return { success: false, message: 'Tài khoản không tồn tại. Vui lòng kiểm tra lại tên đăng nhập hoặc đăng ký mới!' };
    }

    this.currentUser = user;
    this.saveCurrentUserToStorage();
    return { success: true, message: `Đăng nhập thành công! Chào mừng ${user.fullName}`, user };
  }

  // Logout
  public logout() {
    this.currentUser = null;
    this.saveCurrentUserToStorage();
  }

  // Quick switch user (for teacher testing or switching accounts)
  public switchUser(userId: string) {
    const user = this.users.find(u => u.id === userId);
    if (user) {
      this.currentUser = user;
      this.saveCurrentUserToStorage();
    }
  }

  // Admin approves student
  public approveUser(userId: string, adminName: string = 'Thầy Vũ Đức Giỏi'): boolean {
    const user = this.users.find(u => u.id === userId);
    if (!user) return false;

    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    user.status = 'approved';
    user.approvedAt = formattedDate;
    user.approvedBy = adminName;

    this.saveUsersToStorage();
    if (this.currentUser?.id === userId) {
      this.currentUser = { ...user };
      this.saveCurrentUserToStorage();
    }
    return true;
  }

  // Admin rejects student
  public rejectUser(userId: string): boolean {
    const user = this.users.find(u => u.id === userId);
    if (!user) return false;

    user.status = 'rejected';
    this.saveUsersToStorage();
    if (this.currentUser?.id === userId) {
      this.currentUser = { ...user };
      this.saveCurrentUserToStorage();
    }
    return true;
  }

  // Admin approves ALL pending students
  public approveAllPending(adminName: string = 'Thầy Vũ Đức Giỏi'): number {
    let count = 0;
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    this.users.forEach(u => {
      if (u.status === 'pending') {
        u.status = 'approved';
        u.approvedAt = formattedDate;
        u.approvedBy = adminName;
        count++;
      }
    });

    if (count > 0) {
      this.saveUsersToStorage();
      if (this.currentUser && this.currentUser.status === 'pending') {
        this.currentUser.status = 'approved';
        this.saveCurrentUserToStorage();
      }
    }
    return count;
  }

  // Delete user
  public deleteUser(userId: string): boolean {
    if (userId === 'user-admin-1') return false; // Don't delete main admin
    this.users = this.users.filter(u => u.id !== userId);
    this.saveUsersToStorage();
    if (this.currentUser?.id === userId) {
      this.currentUser = this.users[0] || null;
      this.saveCurrentUserToStorage();
    }
    return true;
  }

  // Update user stars
  public addStars(count: number) {
    if (!this.currentUser) return;
    this.currentUser.stars = (this.currentUser.stars || 0) + count;
    const userInList = this.users.find(u => u.id === this.currentUser?.id);
    if (userInList) {
      userInList.stars = this.currentUser.stars;
    }
    this.saveUsersToStorage();
    this.saveCurrentUserToStorage();
  }
}

export const authService = new AuthService();
