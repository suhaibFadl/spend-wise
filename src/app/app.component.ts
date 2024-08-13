import { Component, inject, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from './shared/auth/auth.service';
import { TransactionsStore } from './store/transactions.store';
import { Auth, onAuthStateChanged, User } from 'firebase/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'spend-wise';
  user: User | null = null;
  store= inject(TransactionsStore)

  constructor(
    public authService: AuthService, 
    private router: Router,
  ) {
    this.store.loadAll().then(() => {
      this.store.calculateMonthlyTransactions()
    })
  }
  
  async ngOnInit(): Promise<void> {
    await this.store.getCurrentUser()
  
  }
}
