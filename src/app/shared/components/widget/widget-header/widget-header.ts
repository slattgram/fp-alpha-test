import { Component, input } from '@angular/core';

@Component({
  selector: 'app-widget-header',
  imports: [],
  templateUrl: './widget-header.html',
  styleUrl: './widget-header.scss',
})
export class WidgetHeader {
  readonly label = input.required<string>();
}
