import { Component, Input } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { HeadingComponent } from '../heading/heading.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavComponent, HeadingComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  @Input() isMenuOpen!: boolean;
}
