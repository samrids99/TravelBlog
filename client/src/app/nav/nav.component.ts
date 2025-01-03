import { CommonModule } from '@angular/common';
import { Component, HostListener, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent {
  model: any = {};
  @Input() isMenuOpen!: boolean;

  login() {
    console.log(this.model);
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const navbar = document.querySelector('.navbar') as HTMLElement;
    const toTop = document.querySelector('#to-top') as HTMLElement;

    if (window.scrollY > 50) {
      navbar?.classList.add('bg-dark', 'sticky-top');
    } else {
      navbar?.classList.remove('bg-dark', 'sticky-top');
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
