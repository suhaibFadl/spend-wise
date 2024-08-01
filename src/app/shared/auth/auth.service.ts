import { inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CollectionReference, DocumentData, Firestore, collection, doc, getDocs, query, setDoc, where } from '@angular/fire/firestore';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { Auth, signInWithEmailAndPassword, signOut, User, onAuthStateChanged} from 'firebase/auth';
// import { User as FirebaseUser } from '@firebase/auth-types';
import { getAuth, setPersistence } from 'firebase/auth';
import { browserLocalPersistence } from 'firebase/auth';
import { environment } from '../../../environments/environment';
// import { User } from 'firebase/auth';
// import * as jwt from 'jsonwebtoken';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  firestore = inject(Firestore);
  firebaseApp = initializeApp(environment.firebaseConfig);
  auth = getAuth(this.firebaseApp);
  usersCollection!: CollectionReference<DocumentData>;

  constructor(private afAuth: AngularFireAuth) {
    const app: FirebaseApp = initializeApp(environment.firebaseConfig);
    this.auth = getAuth(app);

    // Set persistence
    setPersistence(this.auth, browserLocalPersistence).catch((error) => {
      console.error('Error setting persistence:', error);
    });
   }
  
  signUp(email: string, username: string, password: string) {
    console.log(email, username, password);
    this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user
        console.log(email, username, password);
        setDoc(doc(this.firestore, 'users', user!.uid), {
          email: email,
          username: username
        });
      })
      .catch((error) => {
        console.log(error)
        // An error occurred
      });
  }

  async logIn(email: string, password: string): Promise<User | null> {
    try {
      const credential = await signInWithEmailAndPassword(this.auth, email, password);
      return credential.user; // Extract the User object
    } catch (error) {
      console.error('Login error:', error);
      return null; // Return null on error
    }
  }

  async getCurrentUser(): Promise<User | null> {
    return new Promise((resolve) => {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        resolve(user);
      });
    });
  }

  async isAuthenticated(): Promise<boolean> {
    const user = await this.getCurrentUser();
    return !!user;
  }


  async checkDoc(checkType: string, typeData: string): Promise<boolean>{
    this.usersCollection = collection(this.firestore, 'users')
    // console.log(checkType, typeData);
    const q = query(this.usersCollection, where(`${checkType}`, '==', typeData));
    const querySnapshot = await getDocs(q);
    console.log(!querySnapshot.empty, querySnapshot)
    return !querySnapshot.empty
  }

  async logout() {
    await this.afAuth.signOut()
      .then(() => {
        // Logout successful
      })
      .catch((error) => {
        // An error occurred
      });
  }
  
}
