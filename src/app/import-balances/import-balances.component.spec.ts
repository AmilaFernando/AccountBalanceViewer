import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportBalancesComponent } from './import-balances.component';

describe('ImportBalancesComponent', () => {
  let component: ImportBalancesComponent;
  let fixture: ComponentFixture<ImportBalancesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportBalancesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportBalancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
