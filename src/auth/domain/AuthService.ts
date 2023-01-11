import { User, AuthState } from './../../stores/AuthStore';
import { AuthClient, UserProfile } from './AuthClient';

export class AuthService {
  private _authClient: AuthClient;
  private _authState: AuthState;

  constructor(authClient: AuthClient, authState: AuthState) {
    this._authClient = authClient;
    this._authState = authState;
  }

  async singup(email: string, password: string): Promise<void> {
    const userCredential = await this._authClient.singup(email, password);

    this._authState.user.id = userCredential.id;
    this._authState.user.email = userCredential.email;
    this._authState.user.name = userCredential.profile.displayName ?? '';
    this._authState.user.online = true;
  }
  async login(email: string, password: string): Promise<void> {
    const userCredential = await this._authClient.login(email, password);

    this._authState.user.id = userCredential.id;
    this._authState.user.email = userCredential.email;
    this._authState.user.name = userCredential.profile.displayName ?? '';
    this._authState.user.online = true;
  }
  async logout(): Promise<void> {
    await this._authClient.logout();
    this._authState.user = new User();
  }
  async updateProfile(profile: UserProfile): Promise<void> {
    await this._authClient.updateProfile(profile);
    this._authState.user.name = profile.displayName ?? '';
  }

  public get authState(): AuthState {
    return this._authState;
  }
}
