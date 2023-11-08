import { Injectable, inject } from '@angular/core';
import { Note } from '../interfaces/note.interface';
import { Firestore, collection, doc, collectionData, onSnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NoteListService {

  trashNotes: Note[] = [];
  normalNotes: Note[] = [];

  items$;
  items;

  firestore: Firestore = inject(Firestore);
  unsubList: import("@angular/fire/firestore").Unsubscribe;

  constructor() {
    this.unsubList = onSnapshot(this.getNotesRef(), (list) => {
      list.forEach(element => {
        console.log(element);
      });
    });

    this.items$ = collectionData(this.getNotesRef());
    console.log(this.items$);

    this.items = this.items$.subscribe((list) => {
      list.forEach(element => {
        console.log(element);
      });
    });

  }

  ngonDestroy() {
    this.unsubList();
    this.items.unsubscribe()
  }

  getNotesRef() {
    return collection(this.firestore, 'notes');
  }

  getTrashRef() {
    return collection(this.firestore, 'trash');
  }

  getSingleDocRef(colId: string, docId: string) {
    return doc(collection(this.firestore, colId), docId);
  }


}
