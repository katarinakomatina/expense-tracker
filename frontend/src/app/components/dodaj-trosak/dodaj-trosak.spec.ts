import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { DodajTrosak } from './dodaj-trosak';
import { routes } from '../../app.routes';

describe('DodajTrosak', () => {
  let component: DodajTrosak;
  let fixture: ComponentFixture<DodajTrosak>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DodajTrosak],
      providers: [provideRouter(routes), provideHttpClient()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DodajTrosak);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
