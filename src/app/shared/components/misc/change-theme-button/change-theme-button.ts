import { Component } from '@angular/core';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-change-theme-button',
  imports: [Button],
  templateUrl: './change-theme-button.html',
  styleUrl: './change-theme-button.scss',
})
export class ChangeThemeButton {
  toggleDarkMode() {
    const element = document.querySelector('html');
    element.classList.toggle('app-dark');
  }
}
