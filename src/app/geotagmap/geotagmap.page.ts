import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { Storage } from '@ionic/storage-angular';
import { LoadingController, NavController } from '@ionic/angular';
import { Geolocation } from '@capacitor/geolocation';
declare const google: any;
@Component({
  selector: 'app-geotagmap',
  templateUrl: './geotagmap.page.html',
  styleUrls: ['./geotagmap.page.scss'],
})
export class GeotagmapPage implements OnInit {
  map: any;
  @ViewChild('mapElement') mapElement: any;
  shop_location: any;

  // Add the following variable at the top of your class
  isSatelliteView: boolean = false;

  getCurrentPosition: any;
  user_address = 'Move home marker to select your address';
  btn_disabled: any;
  user_lat = 20.938894;
  user_lang = 77.7421033;
  user_marker: any;

  dropOffAddress: string = '';
  directionsService: any;
  directionsRenderer: any;
  distanceInKm: any;

  lat: any;
  long: any;

  session_data2 = {
    lat: '',
    long: '',
  };

  position_id1: any;
  loading: any;
  latitude: any;
  longitude: any;

  constructor(
    private url: DataService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private storage: Storage,
    private navCtrl: NavController,
    private loadingController: LoadingController
  ) {}

  ionViewDidEnter() {
    this.lat = this.url.lat;
    this.long = this.url.long;
    // this.lng =this.url.lng;

    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      center: { lat: this.user_lat, lng: this.user_lang },
      zoom: 14,
      disableDefaultUI: true, // a way to quickly hide all controls
    });
    this.directionsService = new google.maps.DirectionsService();
    this.directionsRenderer = new google.maps.DirectionsRenderer();
    this.directionsRenderer.setMap(this.map);
    this.printCurrentPosition();
  }

  // Add the following function in your class
  toggleSatelliteView() {
    this.isSatelliteView = !this.isSatelliteView;
    this.map.setMapTypeId(this.isSatelliteView ? 'hybrid' : 'roadmap');
  }

  fetchAddress(lat: number, lng: number) {
    const reverseGeocodingUrl =
      'https://maps.googleapis.com/maps/api/geocode/json?latlng=' +
      lat +
      ',' +
      lng +
      '&sensor=true&key=AIzaSyDkFrL3p2KR9iAmFiuhmkszKgMHIon1Y0E';

    fetch(reverseGeocodingUrl)
      .then((result) => result.json())
      .then((featureCollection) => {
        this.user_address = featureCollection.results[0].formatted_address;
        this.btn_disabled = false;
      });
  }

  printCurrentPosition = async () => {
    const resp = await Geolocation.getCurrentPosition({
      maximumAge: 5000,
      timeout: 5000,
      enableHighAccuracy: true,
    });
    this.get_user_current_position(resp.coords.latitude, resp.coords.longitude);
    console.log(
      'Current position:',
      resp.coords.latitude,
      resp.coords.longitude
    );
  };
  confirm_address() {
    // this.calculate_distance_from_shop();
    this.navCtrl.back();
  }

  get_user_current_position(lat: number, lng: number) {
    this.user_marker = new google.maps.Marker({
      position: new google.maps.LatLng(lat, lng),
      map: this.map,
      draggable: true,
      animation: google.maps.Animation.DROP,
    });

    this.map.setZoom(18);
    const latLng2 = new google.maps.LatLng(lat, lng);
    this.map.panTo(latLng2);
    this.fetchAddress(lat, lng);
    this.user_marker.addListener('dragend', (e: any) => {
      this.user_lat = e.latLng.lat();
      this.user_lang = e.latLng.lng();
      this.fetchAddress(e.latLng.lat(), e.latLng.lng());
    });

  }


  // geotag() {
  //   Geolocation.getCurrentPosition().then((position) => {
  //     this.user_lat = position.coords.latitude;
  //     this.user_lang = position.coords.longitude;
  //     this.fetchAddress(this.user_lat, this.user_lang);
  //     this.saveGeotag(this.user_lat, this.user_lang);
  //   }).catch((error) => {
  //     console.log('Error getting current position', error);
  //   });
  // }


  geotag() {
    this.loading = true; // Show loading indicator
  
    Geolocation.getCurrentPosition().then((position) => {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
      this.saveGeotag(this.latitude, this.longitude);
    }).catch((error) => {
      console.log('Error getting current position', error);
    }).finally(() => {
      this.loading = false; // Hide loading indicator
    });
  }

  geotag1() {
    Geolocation.getCurrentPosition().then((position) => {
      this.user_lat = position.coords.latitude;
      this.user_lang = position.coords.longitude;
      this.fetchAddress(this.user_lat, this.user_lang);
      this.saveGeotag(this.user_lat, this.user_lang);
    }).catch((error) => {
      console.log('Error getting current position', error);
    });
  }

  async saveGeotag(latitude: number, longitude: number) {
    console.log('Latitude:', latitude);
    console.log('Longitude:', longitude);
  
    const loading = await this.loadingController.create({
      message: 'Saving geotag...'
    });
  
    await loading.present();
  
    this.storage.set('geotag', { lat: latitude, long: longitude }).then(() => {
      console.log('Geotag saved successfully');
  
      loading.dismiss().then(() => {
        this.router.navigate(['/basicnew'], {
          queryParams: { latitude: latitude, longitude: longitude },
        });
      });
    }).catch((error) => {
      loading.dismiss().then(() => {
        console.log('Error saving geotag', error);
      });
    });
  }

  // saveGeotag(latitude: number, longitude: number) {
  //   console.log('Latitude:', latitude);
  //   console.log('Longitude:', longitude);
    
  //   this.storage.set('geotag', { lat: latitude, long: longitude }).then(() => {
  //     console.log('Geotag saved successfully');
  //     this.router.navigate(['/basicnew'], {
  //       queryParams: { latitude: latitude, longitude: longitude },
  //     });
  //   }).catch((error) => {
  //     console.log('Error saving geotag', error);
  //   });
  // }

  saveGeotag1(latitude: number, longitude: number) {
    console.log('Latitude:', latitude);
    console.log('Longitude:', longitude);
    
    this.storage.set('geotag', { lat: latitude, long: longitude }).then(() => {
      console.log('Geotag saved successfully');
      this.router.navigate(['/basicnew'], {
        queryParams: { latitude: latitude, longitude: longitude },
      });
    }).catch((error) => {
      console.log('Error saving geotag', error);
    });
  }
 
  confirmAddress() {
    console.log('User Address:', this.user_address);
    console.log('Drop-off Address:', this.dropOffAddress);
    console.log('User Location:', this.user_lat, this.user_lang);
    this.dropOffAddress = ''; // Clear the input field
    this.directionsRenderer.set('directions', null); // Reset the directions
  }

  ngOnInit() {}

}
