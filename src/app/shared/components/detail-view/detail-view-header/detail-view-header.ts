import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-detail-view-header',
  imports: [RouterLink],
  templateUrl: './detail-view-header.html',
  styleUrl: './detail-view-header.scss',
})
export class DetailViewHeader {
  readonly label = input.required<string>();

  readonly routerLink = input.required<string>();
}
