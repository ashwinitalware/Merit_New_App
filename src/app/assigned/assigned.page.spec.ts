import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssignedPage } from './assigned.page';

describe('AssignedPage', () => {
  let component: AssignedPage;
  let fixture: ComponentFixture<AssignedPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AssignedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
