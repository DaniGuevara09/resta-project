import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Autentication } from './autentication';

describe('Autentication', () => {
  let component: Autentication;
  let fixture: ComponentFixture<Autentication>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Autentication],
    }).compileComponents();

    fixture = TestBed.createComponent(Autentication);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
