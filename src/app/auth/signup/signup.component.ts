import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, AfterViewInit {

  signUpForm!: FormGroup;
  errorMessage!: string;
  nbrPassword!: any;
  toto!: number

  constructor(private formBuilder: FormBuilder,private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.initForm();

  }
ngAfterViewInit(): void {


}
  initForm(){
    this.signUpForm = this.formBuilder.group({
      email:['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })

  }
  onSubmit(){
    const email= this.signUpForm.get('email')?.value;
    const password = this.signUpForm.get('password')?.value;
    this.authService.createUser(email, password).then(
      ()=>{
        this.router.navigate(['/books']);
      },
      (error)=>{
        this.errorMessage = error
      }
    )
  }
}
