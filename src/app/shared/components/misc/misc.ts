import { Component } from '@angular/core';
import { Card } from 'primeng/card';
import { ClearStorageButtonComponent } from './clear-storage-button/clear-storage-button.component';
import { ChangeThemeButton } from './change-theme-button/change-theme-button';

@Component({
  selector: 'app-misc',
  imports: [ClearStorageButtonComponent, ChangeThemeButton, Card],
  templateUrl: './misc.html',
  styleUrl: './misc.scss',
})
export class Misc {}
