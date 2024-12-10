import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavComponent } from "./nav/nav.component";
import { HeroComponent } from "./hero/hero.component";
import { HomeComponent } from "./home/home.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    NavComponent,
    HeroComponent,
    HomeComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private http = inject(HttpClient);
  title = "Sam's App";
  users: any;

  ngOnInit(): void {
    this.getUsers();
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
