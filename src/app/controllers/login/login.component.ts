import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/Auth.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.authService.login(this.email, this.password).subscribe(
      (response: any) => {
        console.log('Login successful');
        this.router.navigate(['/controller1']);
      },
      (error: any) => {
        console.error('Login error:', error);
        alert('Login failed: ' + error.message);
      }
    );
  }
}
