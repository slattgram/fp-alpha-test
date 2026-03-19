import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Misc } from './shared/components/misc/misc';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Misc],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('fp-alpha-test');
}
