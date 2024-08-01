import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../shared/auth/auth.service';
import { Router } from '@angular/router';

import { TransactionsStore } from '../../store/transactions.store';

@Component({
  selector: 'app-initial-transaction',
  templateUrl: './initial-transaction.component.html',
  styleUrl: './initial-transaction.component.css'
})
export class InitialTransactionComponent {
  transactionForm: FormGroup;
  store= inject(TransactionsStore)
 

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.transactionForm = this.fb.group({
      budget: ['', [Validators.required, Validators.pattern(/^\d+(\.\d+)?$/)]],
      type : ['', [Validators.required]],
      
    });
  }

  ngOnInit(): void {
    // const auth: Auth = this.authService.getAuthState();
    // onAuthStateChanged(auth, (user) => {
    //   if (user) {
    //     this.router.navigate(['/home']);
    //   }
    // });
  }
  

  async onSubmit() {
    if (this.transactionForm.invalid) {
      this.markAllAsTouched();
      return;
    }

    const {budget, type} = this.transactionForm.value;
    const id = Math.random().toString(36).substr(2, 9)
    const  date =  new Date()
    console.log(id, 'My Budget', budget, type,date)
    try {
      await this.store.addTransaction(id, 'My Budget', budget, type,date);
      this.router.navigate(['/home']);
    } catch (error) {
      console.log(error);
    }
  }

  markAllAsTouched(): void {
    this.transactionForm.markAllAsTouched();
  }
}
