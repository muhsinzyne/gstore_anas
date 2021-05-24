import { Injectable } from '@angular/core';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { ConfigService } from '../config/config.service';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserAddressService {

  constructor(
    public config: ConfigService,
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    public http: HttpClient,

  ) {
    console.log('Hello UserAddressProvider Provider');
  }
  public lat: any;
  public long: any;
  public cLocation: Geoposition;
  async getLocationData() {
    this.cLocation = await this.currentLocation();
    return this.cLocation;
    
  }

  async currentLocation() {
    let location = await this.geolocation.getCurrentPosition();
    return location;
  }


  getCordinates() {
    return new Promise(resolve => {
      this.geolocation.getCurrentPosition().then((resp) => {
        // // resp.coords.latitude
        // resp.coords.longitude
        console.log("sdsdsd");
        console.log(resp.coords.latitude);
        console.log(resp.coords.longitude);
        resolve({ "lat": resp.coords.latitude, "long": resp.coords.longitude });
      }).catch((error) => {
        console.log('Error getting location', error);
        resolve("error in cordova");
      });
    });
  }

  getAddress() {
    return new Promise(resolve => {
      let options: NativeGeocoderOptions = {
        useLocale: true,
        maxResults: 5
      };
      this.getCordinates().then((value: any) => {
        this.nativeGeocoder.reverseGeocode(value.lat, value.long, options)
          .then((result: NativeGeocoderResult[]) => {
            resolve(result[0]);
            console.log(result[0]);
          })
          .catch((error: any) => {
            console.log(error);
            resolve("error sdsdsds");
          });

      });
    });
  }

}
