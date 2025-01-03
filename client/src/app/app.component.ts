import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private http = inject(HttpClient);
  title = "Sam's App";
  users: any;
  model: any = {};
  isMenuOpen = false;

  ngOnInit(): void {
    this.getUsers();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const navbar = document.querySelector('.navbar') as HTMLElement;

    if (window.scrollY > 50) {
      navbar?.classList.add('bg-dark', 'sticky-top');
    } else {
      navbar?.classList.remove('bg-dark', 'sticky-top');
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  getUsers() {
    this.http.get('https://localhost:5008/api/users').subscribe({
      next: (response) => {
        this.users = response;
        console.log(this.users);
      },
      error: (error) => {
        console.error('Error fetching users', error);
      },
      complete: () => console.log('Completed fetching users'),
    });
  }
}
