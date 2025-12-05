import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone:true,
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}
  ngOnInit() {
  if (this.authService.isLoggedIn()) {
    this.router.navigate(['/movies']);
  }
}

  login() {
    this.authService.login({
      email: this.email,
      password: this.password
    }).subscribe({
      next: () => this.router.navigate(['/movies']),
      error: () => alert('Invalid credentials')
    });
  }
}
