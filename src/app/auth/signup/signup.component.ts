import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TransactionsStore } from '../../store/transactions.store';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from '../../shared/auth/auth.service';
import { StrongPasswordRegx } from '../../shared/regExp/regExp';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./../auth.component.css', './signup.component.css'],
})

export class SignupComponent {
  auth = inject(AngularFireAuth)
  form: FormGroup;
  store= inject(TransactionsStore)
  isEmailUsed: boolean = false;
  isUsernameUsed: boolean = false;
  isPasswordsMatched : boolean = true;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.pattern(StrongPasswordRegx)]],
      confirmPassword: ['', Validators.required]
    });
  }

  get passwordFormField() {
    return this.form.get('password');
  }

  async onSubmit() {

    if (this.form.invalid) {
      this.markAllAsTouched();
      return;
    }

    const { username, email, password, confirmPassword } = this.form.value;

    this.isPasswordsMatched = password == confirmPassword;
    if(!this.isPasswordsMatched || this.isEmailUsed || this.isUsernameUsed) return;
    console.log( username, email, password, confirmPassword )
    
    try{
    const user = await this.store.signUp(email, username,password);
    this.router.navigate(['/initail-transaction']);
    }catch(error){

    }
  }

  markAllAsTouched(): void {
    this.form.markAllAsTouched();
  }

  async checkDoc(event: Event, checkType: string) {
    this.isEmailUsed = checkType == "email" ? false : this.isEmailUsed;
    this.isUsernameUsed = checkType == "username" ? false : this.isUsernameUsed;
    const inputElement = event.target as HTMLInputElement;
    const typeData = inputElement.value;
    const isUsed = await this.authService.checkDoc(checkType, typeData)
    if (isUsed){
      if (checkType == 'email') this.isEmailUsed = true
      else if (checkType == 'username') this.isUsernameUsed = true
    }
  }

}
