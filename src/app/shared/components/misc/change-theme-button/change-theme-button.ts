import { Component, OnInit, signal } from '@angular/core';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-change-theme-button',
  imports: [Button],
  templateUrl: './change-theme-button.html',
  styleUrl: './change-theme-button.scss',
})
export class ChangeThemeButton implements OnInit {
  isDark = signal(false);

  ngOnInit() {
    // In real world this would be a service that handles it but I decided to do it in component
    // to keep it simple since this button is loaded in root anyway
    const cookieTheme = this.getThemeFromCookie();
    this.isDark.set(
      cookieTheme !== null
        ? cookieTheme
        : window.matchMedia('(prefers-color-scheme: dark)').matches,
    );

    if (this.isDark()) {
      document.querySelector('html').classList.add('app-dark');
    }
  }

  toggleDarkMode() {
    this.isDark.update((value) => !value);
    const element = document.querySelector('html');

    if (this.isDark()) {
      element.classList.add('app-dark');
    } else {
      element.classList.remove('app-dark');
    }

    this.saveThemePreferenceToCookie();
  }

  private saveThemePreferenceToCookie(): void {
    const value = this.isDark() ? 'dark' : 'light';
    const expires = new Date();
    expires.setFullYear(expires.getFullYear() + 1);

    document.cookie = `app-theme=${value}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
  }

  private getThemeFromCookie(): boolean | null {
    const cookies = document.cookie.split(';');

    const themeCookie = cookies.find((cookie) => cookie.trim().split('=')[0]);

    if (themeCookie) {
      const [, value] = themeCookie.trim().split('=');
      return value === 'dark';
    }

    return null;
  }
}
