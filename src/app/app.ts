import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ClearStorageButtonComponent } from './shared/components/clear-storage-button/clear-storage-button.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ClearStorageButtonComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('fp-alpha-test');
}
