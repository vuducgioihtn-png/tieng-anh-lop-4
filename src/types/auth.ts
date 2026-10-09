export type UserRole = 'student' | 'teacher' | 'admin';
export type UserStatus = 'pending' | 'approved' | 'rejected';

export interface UserProfile {
  id: string;
  fullName: string;
  username: string;
  email?: string;
  phone?: string;
  schoolClass?: string;
  schoolName?: string;
  role: UserRole;
  status: UserStatus;
  registeredAt: string;
  approvedAt?: string;
  approvedBy?: string;
  note?: string;
  stars: number;
  avatarEmoji?: string;
}

export interface RegisterFormData {
  fullName: string;
  username: string;
  phone?: string;
  schoolClass: string;
  schoolName?: string;
  password: string;
  note?: string;
}
