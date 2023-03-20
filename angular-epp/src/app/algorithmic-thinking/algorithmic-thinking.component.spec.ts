import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlgorithmicThinkingComponent } from './algorithmic-thinking.component';

describe('AlgorithmicThinkingComponent', () => {
  let component: AlgorithmicThinkingComponent;
  let fixture: ComponentFixture<AlgorithmicThinkingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlgorithmicThinkingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlgorithmicThinkingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
