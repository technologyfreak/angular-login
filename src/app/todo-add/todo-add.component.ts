import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Task } from '../task';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.css']
})
export class TodoAddComponent implements OnInit {
  private tasksCollection: AngularFirestoreCollection<Task>;
  tasks: Observable<Task[]>;
  value: string;

  constructor(private readonly afs: AngularFirestore, public afAuth: AngularFireAuth) { }

  ngOnInit() {
    this.tasksCollection = this.afs.collection<Task>(this.afAuth.auth.currentUser.email);
    this.tasks = this.tasksCollection.valueChanges();
  }

  addTask() {
    const id = this.afs.createId();
    const value = this.value;
    const task: Task = { id, value };
    this.tasksCollection.doc(id).set(task);
    this.value = null;
  }
}
