import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BasicnewPage } from './basicnew.page';

describe('BasicnewPage', () => {
  let component: BasicnewPage;
  let fixture: ComponentFixture<BasicnewPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BasicnewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
