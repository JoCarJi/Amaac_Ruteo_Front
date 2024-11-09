import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RutePage } from './rute.page';

describe('RutePage', () => {
  let component: RutePage;
  let fixture: ComponentFixture<RutePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RutePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
