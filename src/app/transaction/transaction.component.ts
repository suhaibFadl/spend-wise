import { Component, effect, inject } from '@angular/core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';



import { TransactionsStore } from '../store/transactions.store';
import { TransactionType } from '../shared/transaction/transaction.model';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.css',

})

export class TransactionComponent{
  store = inject(TransactionsStore);
  filterValue!: TransactionType

   constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
    // this.store.loadAll().then(() => {
    //   this.store.calculateMonthlyTransactions()
    // })

    effect(() => {
      this.filterValue = this.store.filter()
    })
  }

  async onDeleteTransaction(id: string){
    await this.store.deleteTransaction(id);
  }

  onFilterChange(transactionType: TransactionType){
    console.log(this.filterValue)
    this.store.updateFilter(transactionType)
  }

  
}