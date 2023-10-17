import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckboxdataPage } from './checkboxdata.page';

describe('CheckboxdataPage', () => {
  let component: CheckboxdataPage;
  let fixture: ComponentFixture<CheckboxdataPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CheckboxdataPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
