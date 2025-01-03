import {
  Component,
  ElementRef,
  Renderer2,
  ViewChildren,
  QueryList,
} from '@angular/core';

@Component({
  selector: 'app-heading',
  standalone: true,
  imports: [],
  templateUrl: './heading.component.html',
  styleUrl: './heading.component.scss',
})
export class HeadingComponent {
  @ViewChildren('counter', { read: ElementRef })
  counters!: QueryList<ElementRef>;
  private readonly speed = 1500;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    if (this.counters.length > 0) {
      console.log('Counters found:', this.counters.length);
      this.incrementStats();
    } else {
      console.error('No counters found. Ensure the "counter" class exists.');
    }
  }

  incrementStats(): void {
    console.log('incrementing');
    this.counters.forEach((counter) => {
      console.log('hello');
      this.renderer.setProperty(counter.nativeElement, 'innerText', '0');

      const updateCounter = () => {
        const target = +counter.nativeElement.getAttribute('data-target');
        const current = +counter.nativeElement.innerText;

        const increment = target / this.speed;

        if (current < target) {
          const newValue = Math.ceil(current + increment);
          this.renderer.setProperty(
            counter.nativeElement,
            'innerText',
            newValue.toString()
          );
          setTimeout(updateCounter, 50);
        } else {
          this.renderer.setProperty(
            counter.nativeElement,
            'innerText',
            target.toString()
          );
        }
      };

      updateCounter();
      console.log('incrementing done');
    });
  }
}
