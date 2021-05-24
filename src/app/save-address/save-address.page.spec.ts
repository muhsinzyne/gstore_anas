import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SaveAddressPage } from './save-address.page';

describe('SaveAddressPage', () => {
  let component: SaveAddressPage;
  let fixture: ComponentFixture<SaveAddressPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveAddressPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SaveAddressPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
