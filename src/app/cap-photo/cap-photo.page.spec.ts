import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CapPhotoPage } from './cap-photo.page';

describe('CapPhotoPage', () => {
  let component: CapPhotoPage;
  let fixture: ComponentFixture<CapPhotoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CapPhotoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
