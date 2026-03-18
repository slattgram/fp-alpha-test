import { Component, input } from '@angular/core';

@Component({
  selector: 'app-table-view-header',
  imports: [],
  templateUrl: './table-view-header.html',
  styleUrl: './table-view-header.scss',
})
export class TableViewHeader {
  readonly label = input.required<string>();
}
