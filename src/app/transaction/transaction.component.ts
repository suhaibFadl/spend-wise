import { Component, inject } from '@angular/core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';


import { TransactionsStore } from '../store/transactions.store';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.css',

})

export class TransactionComponent{
  store = inject(TransactionsStore);

  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
    this.store.loadAll()
  }

  async onDeleteTransaction(id: string){
    await this.store.deleteTransaction(id);
  }
}