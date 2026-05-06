import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from '../../services/autentication';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-autenticacion',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './autentication.html',
  styleUrls: ['./autentication.css']
})
export class AutenticacionComponent implements OnInit {
  username = '';
  password = '';
  theme = environment.theme;

  constructor(private authService: AutenticacionService, private router: Router) { }

  ngOnInit() {
    document.documentElement.style.setProperty('--primary-color', this.theme.primaryColor);
    document.documentElement.style.setProperty('--secondary-color', this.theme.secondaryColor);
    document.documentElement.style.setProperty('--background-color', this.theme.background);
  }

  login() {
    this.authService.login(this.username, this.password).subscribe({
      next: () => {
        console.log('Login exitoso');
        this.router.navigate(['/productos']);
      },
      error: err => {
        console.error('Error en el login', err);
      }
    });
  }
}