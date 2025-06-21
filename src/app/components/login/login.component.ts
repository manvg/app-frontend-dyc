import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule, RouterModule, ReactiveFormsModule,
    MatInputModule, MatFormFieldModule, MatButtonModule,
    MatCardModule, MatCheckboxModule, MatIconModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formLogin!: FormGroup;
  enviado = false;
  loginError = '';
  loading = false;
  titulo: string = 'Iniciar sesión';

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      rememberMe: [true]
    });
  }

  iniciarSesion(): void {
    this.enviado = true;
    this.loginError = '';
    this.loading = true;

    if (this.formLogin.valid) {
      const email = this.formLogin.get('email')!.value;
      const password = this.formLogin.get('password')!.value;
      const rememberMe = this.formLogin.get('rememberMe')!.value;

      // Aquí va tu integración con Cognito o backend
      // Ejemplo placeholder:
      setTimeout(() => {
        this.loading = false;
        // Si es exitoso
        this.router.navigate(['/']);
        // Si hay error, muestra feedback visual
        // this.loginError = 'Correo o contraseña incorrectos';
      }, 1200);

    } else {
      this.loading = false;
    }
  }
}
