import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonneeagentComponent } from './donneeagent.component';

describe('DonneeagentComponent', () => {
  let component: DonneeagentComponent;
  let fixture: ComponentFixture<DonneeagentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DonneeagentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonneeagentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
