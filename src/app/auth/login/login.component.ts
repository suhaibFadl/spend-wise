import { Component, Inject, inject, OnInit } from '@angular/core';
import { TransactionsStore } from '../../store/transactions.store';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../shared/auth/auth.service';
import { Auth, onAuthStateChanged, User } from 'firebase/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./../../../styles.css','./../auth.component.css','./login.component.css']
})

export class LoginComponent implements OnInit {
  form: FormGroup;
  store= inject(TransactionsStore)
  user: User | null = null;
  loginError: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
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
    if (this.form.invalid) {
      this.markAllAsTouched();
      return;
    }

    const { email, password } = this.form.value;

    const user = await this.store.logIn(email, password);

    if (user) {
      this.router.navigate(['/home']); // Adjust the path as needed
    } else {
      this.loginError = "Email or Password incorrect"
      console.log(this.loginError)
    }
  }

  markAllAsTouched(): void {
    this.form.markAllAsTouched();
  }
}

