import {
  AuthClient,
  UserCredential,
  UserProfile,
} from './../domain/AuthClient';

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  Auth,
} from 'firebase/auth';

export class FirebaseAuthClient implements AuthClient {
  private _firebaseAuth: Auth;

  constructor(auth: Auth) {
    this._firebaseAuth = auth;
  }
  public async singup(
    email: string,
    password: string
  ): Promise<UserCredential> {
    const userCredential = await createUserWithEmailAndPassword(
      this._firebaseAuth,
      email,
      password
    );

    return {
      id: userCredential.user.uid,
      email: userCredential.user.email ?? '',
      profile: {
        displayName:
          userCredential.user.displayName ??
          email.substring(0, email.indexOf('@')),
        photoURL: '',
      },
    };
  }

  async login(email: string, password: string): Promise<UserCredential> {
    const userCredential = await signInWithEmailAndPassword(
      this._firebaseAuth,
      email,
      password
    );

    return {
      id: userCredential.user.uid,
      email: userCredential.user.email ?? '',
      profile: {
        displayName:
          userCredential.user.displayName ??
          email.substring(0, email.indexOf('@')),
        photoURL: '',
      },
    };
  }

  async logout(): Promise<void> {
    await signOut(this._firebaseAuth);
  }
  async updateProfile(profile: UserProfile): Promise<void> {
    if (this._firebaseAuth.currentUser) {
      await updateProfile(this._firebaseAuth.currentUser, {
        displayName: profile.displayName,
        photoURL: profile.photoURL,
      });
    }
  }
}
