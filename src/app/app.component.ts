import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';


@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [RouterOutlet]  // Import the banner component
})
export class AppComponent {}

