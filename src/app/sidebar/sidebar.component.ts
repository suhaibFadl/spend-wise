import { Component, inject } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { TransactionsStore } from '../store/transactions.store';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  store = inject(TransactionsStore)

  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
  }

  async logout(){
    await this.store.logout()
  }
}
