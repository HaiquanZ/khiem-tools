import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';  // 👈 cần import

@Component({
  selector: 'app-root',
  imports: [RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'khiem-tools';
}
