import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialTransactionComponent } from './initial-transaction.component';

describe('InitialTransactionComponent', () => {
  let component: InitialTransactionComponent;
  let fixture: ComponentFixture<InitialTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InitialTransactionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InitialTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
