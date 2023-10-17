import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UnitconverterPage } from './unitconverter.page';

describe('UnitconverterPage', () => {
  let component: UnitconverterPage;
  let fixture: ComponentFixture<UnitconverterPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UnitconverterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
