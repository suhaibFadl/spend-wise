import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { TransactionsStore } from '../../store/transactions.store';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TransactionType } from '../../shared/transaction/transaction.model';

declare var bootstrap: any;

@Component({
  selector: 'app-add-tranasaction-form',
  templateUrl: './add-tranasaction-form.component.html',
  styleUrl: './add-tranasaction-form.component.css'
})

export class AddTranasactionFormComponent {
  store = inject(TransactionsStore);
  transactionForm = new FormGroup({
    title : new FormControl('', [Validators.required]),
    budget : new FormControl('', [Validators.required, Validators.pattern(/^\d+(\.\d+)?$/)]),
    type : new FormControl('', [Validators.required]),
  })
  @ViewChild('exampleModal') exampleModal!: ElementRef;

  resetForm() {
    console.log('Reset')
    this.transactionForm.reset();
  }

  async onAddTransaction(){
    const id = Math.random().toString(36).substr(2, 9)
    const title = this.transactionForm.controls['title'].value!
    const budget = Number(this.transactionForm.controls['budget'].value)
    const type =  this.transactionForm.controls['type'].value as TransactionType
    const  date =  new Date()
    await this.store.addTransaction(
      id,
      title,
      budget,
      type,
      date
    )
    const modalElement = this.exampleModal.nativeElement;
    const modal = bootstrap.Modal.getInstance(modalElement); 
    if (modal) {
      modal.hide();
    }
  }
}
