import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChefequipeComponent } from './chefequipe.component';

describe('ChefequipeComponent', () => {
  let component: ChefequipeComponent;
  let fixture: ComponentFixture<ChefequipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChefequipeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChefequipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
