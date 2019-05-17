import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuadroDocenteComponent } from './quadro-docente.component';

describe('QuadroDocenteComponent', () => {
  let component: QuadroDocenteComponent;
  let fixture: ComponentFixture<QuadroDocenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuadroDocenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuadroDocenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
