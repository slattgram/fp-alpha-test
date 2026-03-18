import { Component, input } from '@angular/core';
import { Widget } from '../../../../shared/components/widget/widget';
import { WidgetHeader } from '../../../../shared/components/widget/widget-header/widget-header';
import { WidgetItem } from '../../../../shared/components/widget/widget-item/widget-item';
import { TClient } from '../../../../shared/types/client';
import { RelativeTimePipe } from '../../../../shared/pipes/relative-time-pipe';

@Component({
  selector: 'app-client-information-widget',
  imports: [Widget, WidgetHeader, WidgetItem, RelativeTimePipe],
  templateUrl: './client-information-widget.html',
  styleUrl: './client-information-widget.scss',
})
export class ClientInformationWidget {
  client = input.required<TClient>();
}
