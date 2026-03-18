import { Component, input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IftaLabel } from 'primeng/iftalabel';

@Component({
  selector: 'app-form-input',
  standalone: true,
  imports: [ReactiveFormsModule, IftaLabel, FormsModule],
  templateUrl: './form-input.html',
  styleUrls: ['./form-input.scss'],
})
export class FormInput {
  id = input.required<string>();

  label = input.required<string>();

  errors = input();
}
