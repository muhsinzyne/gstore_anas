import { HttpClient } from '@angular/common/http';
import { ApplicationRef, Component, OnInit } from '@angular/core';
import { Geoposition } from '@ionic-native/geolocation/ngx';
import { ModalController, NavController } from '@ionic/angular';
import { ConfigService } from 'src/providers/config/config.service';
import { LoadingService } from 'src/providers/loading/loading.service';
import { LocationDataService } from 'src/providers/location-data/location-data.service';
import { SharedDataService } from 'src/providers/shared-data/shared-data.service';
import { UserAddressService } from 'src/providers/user-address/user-address.service';
import { SelectCountryPage } from '../modals/select-country/select-country.page';
import { SelectZonesPage } from '../modals/select-zones/select-zones.page';
import { GeoLocationAddress } from './modals';
import { Storage } from '@ionic/storage';
import { AppEventsService } from 'src/providers/app-events/app-events.service';

@Component({
  selector: 'app-save-address',
  templateUrl: './save-address.page.html',
  styleUrls: ['./save-address.page.scss'],
})
export class SaveAddressPage implements OnInit {

  defaultAddress = false;
  constructor(
    public config: ConfigService,
    public shared: SharedDataService,
    public storage: Storage,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public loading: LoadingService,
    public location: LocationDataService,
    public userAddress: UserAddressService,
    private applicationRef: ApplicationRef,
    public appEventsService: AppEventsService,
    public http: HttpClient,

    // public loading: LoadingProvider, 
  ) {
    this.loadCache();
  }


  async loadCache() {
   

    this.storage.get('cacheAddress').then((val) => {
      let value = val;
      if(val != null) {
        var cacheAddressJson = JSON.parse(value);
        this.shared.postcode = cacheAddressJson.postcode;
        this.shared.locationUrl = cacheAddressJson.locationUrl;
        this.shared.phone = cacheAddressJson.phone;
        this.shared.full_name = cacheAddressJson.full_name;
        this.shared.house_name_no = cacheAddressJson.house_name_no;
        this.shared.address_1 = cacheAddressJson.address_1;
        this.shared.address_2 = cacheAddressJson.address_2;
      }
     
    
    });

  }

  submit() {

    var addressJson  = {
      locationUrl: this.shared.locationUrl,
      phone: this.shared.phone,
      postcode: this.shared.postcode,
      full_name: this.shared.full_name,
      house_name_no: this.shared.house_name_no,
      address_1: this.shared.address_1,
      address_2: this.shared.address_2
    };
    var cacheAddress = JSON.stringify(addressJson);
    this.storage.set('cacheAddress', cacheAddress);
    this.openHomePage();

  }

  openHomePage() {
    this.appEventsService.publish("openHomePage", "");
    this.config.checkingNewSettingsFromServer();
  }

  
  
  disableButton() {
    if (
      this.shared.phone == ''
      || this.shared.postcode == ''
      || this.shared.full_name == ''
      || this.shared.house_name_no == ''
      || this.shared.address_1 == ''
      || this.shared.address_2 == ''
    ) {
      return true;
    }
    else
      return false;
  }
  ngOnInit() { }


  async removeGps() {
    this.loading.show();
    this.shared.locationUrl = null;
    this.loading.hide();
  }

  async getLocationAddress() {
  this.loading.show();
  let data =  await this.userAddress.getLocationData();
  var latitude = 10.891551;
  var longitude = 76.2657653;
  this.shared.locationUrl = 'https://www.google.com/maps/@'+ latitude + ',' + longitude;
  this.loading.hide();
  }


}
