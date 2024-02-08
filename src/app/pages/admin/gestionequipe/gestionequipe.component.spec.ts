import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionequipeComponent } from './gestionequipe.component';

describe('GestionequipeComponent', () => {
  let component: GestionequipeComponent;
  let fixture: ComponentFixture<GestionequipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionequipeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionequipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
