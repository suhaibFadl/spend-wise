import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTranasactionFormComponent } from './add-tranasaction-form.component';

describe('AddTranasactionFormComponent', () => {
  let component: AddTranasactionFormComponent;
  let fixture: ComponentFixture<AddTranasactionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTranasactionFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddTranasactionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
