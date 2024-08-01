import { computed, inject } from "@angular/core";
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { User } from 'firebase/auth';
import { User as FirebaseUser } from '@firebase/auth-types';
import { AuthService } from "../shared/auth/auth.service";

import { Transaction, TransactionType } from "../shared/transaction/transaction.model";
import { TransactionService } from "../shared/transaction/transaction.service";

type TransactionsState = {
    user: User | null,
    transactions: Transaction[];
    filter: TransactionType;
}

const initialState: TransactionsState = {
    user: null,
    transactions: [],
    filter: "all",
}

export const TransactionsStore = signalStore(
    {providedIn: 'root'},
    withState(initialState),
    withMethods(
        (store, transactoinsService = inject(TransactionService), authService = inject(AuthService)) => ({
            async getCurrentUser(){
                const user = !!store.user() ?
                store.user()
                : await authService.getCurrentUser();
                patchState(store, {user});
            },

            async signUp(email: string, username:string ,password: string){
                return await authService.signUp(email ,username, password);
            },

            async logIn(email: string, password: string){
                const user = await authService.logIn(email, password);
                patchState(store, {user});
                return user
            },

            async isAuthenticated(){
                return authService.isAuthenticated()
            },

            async logout(){
                await authService.logout();
                patchState(store, {});
            },

            async loadAll() {

                const user = !!store.user() ?
                store.user()
                : await authService.getCurrentUser();

                console.log('User is Here')
                const transactions = await transactoinsService.getTransactions(user!.uid);
                // const transactions = await transactoinsService.getTransactions(store.user.email());
                patchState(store, {user,transactions});
            },

            async addTransaction(
                id: string,
                title: string,
                budget: number,
                type: TransactionType,
                date: Date
            ){
                const user = store.user()!
                const uid = user!.uid
                const transaction: Transaction = {
                    id,
                    title,
                    budget,
                    type,
                    date,
                    uid
                    }
                await transactoinsService.addTransaction(transaction);

                patchState(store, (state) => ({
                    transactions: [transaction, ...state.transactions]
                }))
            },
          
            async deleteTransaction(id: string){
                await transactoinsService.deleteTransaction(id);
                patchState(store, (state) => ({
                    transactions: state.transactions.filter(transaction => transaction.id !== id)
                }))
            }
        }),
    ),

    withComputed((state) =>({
        calculateOutcomes: computed(() => {
            const transactions = state.transactions();
            var outcomesSum;
            outcomesSum = transactions
                .filter((transaction) => transaction.type === "outcome")
                .map((transaction) => transaction.budget)
                .reduce((sum, budget) => sum + budget, 0)
            return outcomesSum;
        }),

        calculateIncomes: computed(() => {
            const transactions = state.transactions();
            var incomesSum;
            incomesSum = transactions
                .filter((transaction) => transaction.type === "income")
                .map((transaction) => transaction.budget)
                .reduce((sum, budget) => sum + budget, 0)
            return incomesSum;
        }),

        calculateBalance: computed(() => {
            const transactions = state.transactions();
            var blanaceSum;
            blanaceSum = transactions
                .map((transaction) => transaction.type == 'outcome' ? transaction.budget * -1 : transaction.budget)
                .reduce((sum, budget) => sum + budget, 0)
            return blanaceSum;
        })
    })
    )
)

