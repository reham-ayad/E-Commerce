import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CategoryService } from '../../../core/services/category.service';
import { Category } from '../../../shared/interface/products/products';

@Component({
  selector: 'app-category-slider',
  templateUrl: './category-slider.component.html',
  styleUrl: './category-slider.component.scss',
  changeDetection: ChangeDetectionStrategy.Eager
})
export class CategorySliderComponent implements OnInit {

  categorylist: Category[] = [];

  constructor(
    private category: CategoryService
  ) {}

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories(): void {
    this.category.getAllcategory().subscribe({
      next: (res) => {
        this.categorylist = res.data;
      },
      error: (err) => {
        console.error('Error loading categories:', err);
      }
    });
  }
}