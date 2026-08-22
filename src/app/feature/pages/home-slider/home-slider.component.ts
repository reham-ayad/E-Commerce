import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-slider',
  imports: [  RouterLink],
  templateUrl: './home-slider.component.html',
  styleUrl: './home-slider.component.scss',
})
export class HomeSliderComponent implements OnInit, OnDestroy {

  currentSlide = 0;

  slides = [
    {
      image: 'assets/images/hero-1.jpg',
      title: 'Timeless Elegance',
      subtitle: 'Discover premium collections crafted with exceptional quality.'
    },
    {
      image: 'assets/images/hero-2.jpg',
      title: 'Luxury Fashion',
      subtitle: 'Modern styles inspired by elegance and simplicity.'
    },
    {
      image: 'assets/images/hero-3.jpg',
      title: 'New Arrivals',
      subtitle: 'Explore the latest trends with exclusive offers.'
    }
  ];

  private intervalId!: ReturnType<typeof setInterval>;

  constructor(private ngZone: NgZone) {}

  ngOnInit(): void {
    // Run outside Angular so this recurring timer never registers
    // as a pending macrotask that blocks app/prerender stability.
    this.ngZone.runOutsideAngular(() => {
      this.intervalId = setInterval(() => {
        // Re-enter the zone only when we actually need change detection.
        this.ngZone.run(() => {
          this.nextSlide();
        });
      }, 5000);
    });
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  nextSlide(): void {
    this.currentSlide =
      (this.currentSlide + 1) % this.slides.length;
  }

  prevSlide(): void {
    this.currentSlide =
      (this.currentSlide - 1 + this.slides.length) %
      this.slides.length;
  }
}