import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Expense } from './expense';
import { routes } from '../../app.routes';

describe('Expense', () => {
  let component: Expense;
  let fixture: ComponentFixture<Expense>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Expense],
      providers: [provideRouter(routes)]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Expense);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
