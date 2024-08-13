import { Component, inject } from '@angular/core';
import { Transaction } from 'firebase/firestore';
import { TransactionsStore } from '../store/transactions.store';
import { trigger, transition, style, animate, state } from '@angular/animations';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css',
  animations: [
    trigger('grow', [
      state('inactive', style({ height: '0px' })),
      state('active', style({ height: '*' })),
      transition('inactive => active', [
        animate('3s ease-in')
      ])
    ])
  ]
    
})
export class StatisticsComponent {
  store = inject(TransactionsStore);
 constructor(){
 
 }

 get monthlyStatisticsEntries() {
  return Object.entries(this.store.monthlyStatistics());
}
}
