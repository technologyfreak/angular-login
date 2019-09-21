import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Task } from '../task';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  private taskDoc: AngularFirestoreDocument<Task>;
  task: Observable<Task>;
  private id: string;
  value: string;
  private email: string;

  constructor(private readonly afs: AngularFirestore,
              public afAuth: AngularFireAuth,
              private route: ActivatedRoute,
              private router: Router) {
    this.email = this.afAuth.auth.currentUser.email;
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.taskDoc = this.afs.doc<Task>(`${this.email}/${this.id}`);
    this.task = this.taskDoc.valueChanges();
    this.task.subscribe(task => this.value = task.value);
  }

  redirect() {
    this.router.navigate([`tasks/${this.email}`]);
  }

  updateTask() {
    const id = this.id;
    const value = this.value;
    const task: Task = { id, value };
    this.taskDoc.update(task);
    this.redirect();
  }

  deleteTask() {
    this.taskDoc.delete();
    this.redirect();
  }

}
