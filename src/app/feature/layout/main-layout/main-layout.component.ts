import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";
// import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './main-layout.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {

}
