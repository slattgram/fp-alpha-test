import { Component, DOCUMENT, inject } from '@angular/core';
import { Button } from 'primeng/button';
import { clearAllLocalStorage } from '../../utils/local-storage-utils';

@Component({
  selector: 'app-clear-storage-button',
  standalone: true,
  imports: [Button],
  templateUrl: './clear-storage-button.component.html',
  styleUrl: './clear-storage-button.component.scss',
})
export class ClearStorageButtonComponent {
  readonly document = inject(DOCUMENT);

  clearLocalStorage(): void {
    clearAllLocalStorage();
    this.document.defaultView?.location.reload();
  }
}
