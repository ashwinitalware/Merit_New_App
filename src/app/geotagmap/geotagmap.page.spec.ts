import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GeotagmapPage } from './geotagmap.page';

describe('GeotagmapPage', () => {
  let component: GeotagmapPage;
  let fixture: ComponentFixture<GeotagmapPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(GeotagmapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
