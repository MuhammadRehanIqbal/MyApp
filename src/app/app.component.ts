import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppmenueComponent } from './component/appmenue/appmenue.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,RouterOutlet,AppmenueComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'MyApp';
  //my app
}
