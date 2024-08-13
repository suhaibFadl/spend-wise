import { inject, Injectable } from '@angular/core';
import { Transaction, TransactionType } from './transaction.model';
import { collection, CollectionReference, deleteDoc, doc, DocumentData, Firestore, getDoc, getDocs, getFirestore, limit, query, setDoc, Timestamp, where } from 'firebase/firestore';
import { environment } from '../../../environments/environment';
import { initializeApp } from '@angular/fire/app';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  firestore: Firestore
  transactionsCollection!: CollectionReference<DocumentData>;
  
  constructor(){
    initializeApp(environment.firebaseConfig);
    this.firestore = getFirestore();
  }

  firebaseApp = initializeApp(environment.firebaseConfig);
  // firestore = inject(Firestore);

  async getTransactions(uid: string): Promise<Transaction[]> {  // Assuming userID is a string
    this.transactionsCollection = collection(this.firestore, 'transactions')
    const q = query(this.transactionsCollection, where('uid', '==', uid));  // Adjust the field name based on your Firestore structure
    const snapshot = await getDocs(q);
    const transactions = snapshot.docs.map(doc => {
      const transactionData = doc.data() as Transaction;
      // transactionData.id = doc.id; // Assign Firestore document ID to the id field if necessary
      if (transactionData.date instanceof Timestamp) {
        transactionData.date = transactionData.date.toDate();
      }
      return transactionData;
    });
    return transactions;
  }

  async addTransaction(transaction: Partial<Transaction>){
    this.transactionsCollection = collection(this.firestore, 'transactions')
    await setDoc(doc(this.transactionsCollection, transaction.id), transaction);
  
  }
  
  async getTransactionById(id: string) {
    const transactionsRef = collection(this.firestore, 'transactions');
    const docRef = doc(transactionsRef, id);
    const docSnap = await getDoc(docRef);
  
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("Transaction with ID", id, "does not exist.");
      return null;
    }
  }
  
  async doesCollectionExist(collectionPath: string) {
    const transactionsRef = collection(this.firestore, collectionPath);
    const querySnapshot = await getDocs(query(transactionsRef, limit(1)));
    return !querySnapshot.empty; 
  }

  async deleteTransaction(id: string): Promise<void> {
    const transactionDocRef = doc(this.firestore, 'transactions', id);
    const transactionDocSnap = await getDoc(transactionDocRef);
    console.log(this.doesCollectionExist('transactions'));
    await deleteDoc(transactionDocRef);
  }
}
