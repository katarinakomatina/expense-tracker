import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DodajTrosak } from './dodaj-trosak';

describe('DodajTrosak', () => {
  let component: DodajTrosak;
  let fixture: ComponentFixture<DodajTrosak>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DodajTrosak]
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
