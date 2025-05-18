import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Word } from './word';

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  private collName = 'words';

  constructor(private firestore: Firestore) {}

  getWords(): Observable<Word[]> {
    const coll = collection(this.firestore, this.collName);
    return collectionData(coll, { idField: 'id' }) as Observable<Word[]>;
  }

  addWord(data: Word) {
    const coll = collection(this.firestore, this.collName);
    return addDoc(coll, data);
  }

  updateWord(id: string, data: Partial<Word>) {
    const docRef = doc(this.firestore, `${this.collName}/${id}`);
    return updateDoc(docRef, data);
  }

  deleteWord(id: string): void {
    const docRef = doc(this.firestore, `${this.collName}/${id}`);
    deleteDoc(docRef)
      .then(() => {
        console.log(`Deleted with ID: ${id}`);
      })
      .catch((error) => {
        console.error(`Error when deleting with ID ${id}:`, error);
      });
  }
}
