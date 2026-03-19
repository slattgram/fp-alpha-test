import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeThemeButton } from './change-theme-button';

describe('ChangeThemeButton', () => {
  let component: ChangeThemeButton;
  let fixture: ComponentFixture<ChangeThemeButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangeThemeButton],
    }).compileComponents();

    fixture = TestBed.createComponent(ChangeThemeButton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
