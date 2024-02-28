import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

// code for sidemenu start
private fooSubject = new Subject<any>();
publishSomeData(data: any) {
  this.fooSubject.next(data);
}
getObservable(): Subject<any>{
  return this.fooSubject;
}
// code for sidemenu End

units = [
  { name: 'cm', factor: 1 },
  { name: 'm', factor: 100 },
  { name: 'in', factor: 0.393701 },
  { name: 'ft', factor: 30.48 },
  { name: 'km', factor: 100000 },
  { name: 'hm', factor: 10000 },
  { name: 'dcm', factor: 0.1 },
  { name: 'dm', factor: 10 },
  { name: 'sq', factor: 10000 },
  // Add more units as needed
];
lat: any;
lng:any;
long: any;

user_map_address: any = 'Choose your location';
user_map_lat: any;
user_map_lan: any;
loginData: any;

contact_no: any;
isLoading: any;
str: any;

serverUrl = 'https://cms.meritassociates.in/public/api/';
imageUrl = 'https://cms.meritassociates.in/public/images/';

imageUrl2 = 'https://cms.meritassociates.in/public/images/New-valuation/'
imageUrl3 = 'https://cms.meritassociates.in/public/images/FE-valuation/'
imageUrl1 = 'https://cms.meritassociates.in/public/images/photos/';

constructor(
  private storage: Storage,
  private toastCtrl: ToastController,
  public http: HttpClient,
  public loadingController: LoadingController
) {
  this.storage.create();

  this.storage
    .get('user_data')
    .then((res: any) => {
      this.loginData = res;
      // console.log(this.loginData);
    })
    .catch((err) => {
      console.log(err);
    });
}

//Convert Code start
convertLength(value: any, fromUnit: any) {
  const conversions = [];

  const fromUnitFactor =
    this.units.find((u) => u.name === fromUnit)?.factor || 1;

  for (const unit of this.units) {
    const convertedValue = (value * fromUnitFactor) / unit.factor;
    conversions.push({ unit: unit.name, value: convertedValue });
  }

  return conversions;
}

async presentToast(str: string) {
  const toast = await this.toastCtrl.create({
    message: str,
    cssClass: 'toast-scheme',
    duration: 3000,
  });
  toast.present();
}
async dismiss() {
  this.isLoading = false;
  return await this.loadingController
    .dismiss()
    .then(() => console.log('dismissed'));
}

async presentLoading() {
  this.isLoading = true;
  return await this.loadingController
    .create({
    })
    .then((a) => {
      a.present().then(() => {
        console.log('presented');
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
}
}
