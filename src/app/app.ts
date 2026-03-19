import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Toast } from 'primeng/toast';
import { ClearStorageButtonComponent } from './shared/components/clear-storage-button/clear-storage-button.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ClearStorageButtonComponent, Toast],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('fp-alpha-test');
}
