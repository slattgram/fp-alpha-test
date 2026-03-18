import { Component, input } from '@angular/core';

@Component({
  selector: 'app-widget-item',
  imports: [],
  templateUrl: './widget-item.html',
  styleUrl: './widget-item.scss',
})
export class WidgetItem {
  readonly label = input.required<string>();

  readonly value = input.required<string>();

  readonly type = input<'default' | 'phone' | 'email'>('default');
}
