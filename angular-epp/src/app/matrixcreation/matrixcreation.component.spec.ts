import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatrixcreationComponent } from './matrixcreation.component';

describe('MatrixcreationComponent', () => {
  let component: MatrixcreationComponent;
  let fixture: ComponentFixture<MatrixcreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatrixcreationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatrixcreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
