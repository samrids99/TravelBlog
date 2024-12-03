import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule
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
