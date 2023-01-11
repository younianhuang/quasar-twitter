export interface UserCredential {
  id: string;
  email: string;
  profile: UserProfile;
}

export interface UserProfile {
  displayName?: string;
  photoURL?: string;
}

export interface AuthClient {
  singup(email: string, password: string): Promise<UserCredential>;
  login(email: string, password: string): Promise<UserCredential>;
  logout(): Promise<void>;
  updateProfile(profile: UserProfile): Promise<void>;
}
