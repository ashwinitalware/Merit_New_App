import { Component } from '@angular/core';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { App } from '@capacitor/app';
//Push Notifiaction start
import { FCM } from '@capacitor-community/fcm';
import { ActionPerformed, PushNotification, PushNotifications, PushNotificationSchema, PushNotificationToken } from '@capacitor/push-notifications';
// import {
//   PermissionStatus
// } from '@capacitor/push-notifications';
//Push Notifiaction End
// import { AppUpdate, AppUpdateAvailability } from '@capawesome/capacitor-app-update';

// interface TokenData {
//   user_id: number;
//   device_token: string;
// }


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  // rootPage: any ='BasicnewPage';
  dataService: any;
  last_name: any;
  field_executive_name: any;
  name: any;
  mobile: any;
  user_id1: any;
  cust_id1: any;
  version = '0.0.1';
  role_name: any;
  photo: any;

  constructor(
    public url: DataService,
    private http: HttpClient,
    private router: Router,
    private storage: Storage,
    private navCtrl: NavController,
    private platform: Platform // private socialSharing: SocialSharing
  ) {
    this.initializeApp();
  }

  // async initializeApp() {
  //   this.storage.create();
  //   this.platform.ready().then(() => {
  //     this.storage.get('member').then(async (res) => {
  //       this.cust_id1 = parseInt(res.user_id, 10);
  //       if (
  //         this.cust_id1 !== '' &&
  //         this.cust_id1 !== 'undefined' &&
  //         this.cust_id1 !== undefined
  //       ) {
  //         // alert(this.cust_id1);
  //         this.router.navigate(['/dashboard']);
  //       } else {
  //         this.router.navigate(['/login']);
  //       }
  //       // this.dataService.initPush();
  //     });

  //       this.url.getObservable().subscribe((data) => {
  //     this.field_executive_name = data.field_executive_name;
  //     console.log(this.field_executive_name, 90);
  //   });

  //     //backbutton code start
  //     this.platform.backButton.subscribeWithPriority(-1, () => {
  //       if (
  //         (window.location + '').includes('localhost/dashboard') ||
  //         (window.location + '').includes(
  //           'localhost' + this.dataService.directNavigate
  //         ) ||
  //         (window.location + '').includes('localhost/login')
  //       ) {
  //         App.exitApp();
  //       }
  //     });
  //     //backbutton code End
  //   });
  // }

  async initializeAppnew() {
    this.storage.create();
    this.platform.ready().then(() => {
      this.storage.get('member').then(async (res) => {
        this.cust_id1 = parseInt(res.id, 10);
        this.get_user_data();
        if (
          this.cust_id1 !== '' &&
          this.cust_id1 !== 'undefined' &&
          this.cust_id1 !== undefined
        ) {
          alert(this.cust_id1);
          this.router.navigate(['/dashboard']);
        
        } else {
          this.router.navigate(['/login']);
        }
        // this.dataService.initPush();
      });
      //backbutton code start
      this.platform.backButton.subscribeWithPriority(-1, () => {
        if (
          (window.location + '').includes('localhost/dashboard') ||
          (window.location + '').includes(
            'localhost' + this.dataService.directNavigate
          ) ||
          (window.location + '').includes('localhost/login')
        ) {
          App.exitApp();
        }
      });
      //backbutton code End
 
    });
  }

  async initializeApp(){
    await this.storage.create();
    await this.platform.ready();
    this.platform.ready().then(async () => {
      const userData = await this.storage.get('member');
      if (userData && userData.user_id) {
        this.cust_id1 = parseInt(userData.user_id, 10);
        // alert(this.cust_id1);
        this.router.navigate(['/dashboard']);
      } else {
        this.router.navigate(['/login']);
      }
    });

    this.url.getObservable().subscribe((data) => {
      this.field_executive_name = data.field_executive_name;
      console.log(this.field_executive_name, 90);
    });

    // backbutton code start
    this.platform.backButton.subscribeWithPriority(-1, () => {
      const currentLocation = window.location + '';
      if (
        currentLocation.includes('localhost/dashboard') ||
        currentLocation.includes('localhost' + this.dataService.directNavigate) ||
        currentLocation.includes('localhost/login')
      ) {
        App.exitApp();
      }
    });
    // backbutton code End
    // this.initializePushNotifications();
  }

  // async initializePushNotifications() {
  //   PushNotifications.requestPermissions().then(async (permission) => {
  //     if (permission.receive === 'granted') {
  //       PushNotifications.register();
  
  //       PushNotifications.addListener('registration', (token: PushNotificationToken) => {
  //         console.log('FCM Token:', token.value);
  //         // Send this token to your server for handling notifications
  //         this.sendTokenToServer(token.value);
  //         alert(token.value);
  //       });
  //     }
  //   });
  // }

  // async sendTokenToServer(token: string) {
  //   const userData = await this.storage.get('member');
  //   if (userData && userData.user_id) {
  //     const user_id = parseInt(userData.user_id, 10);
  
  //     this.http.post(`${this.url.serverUrl}update_token`, { user_id, remember_token: token })
  //       .subscribe(
  //         (response: any) => {
  //           console.log('Token sent to server:', response);
  //         },
  //         (error) => {
  //           console.error('Error sending token to server:', error);
  //           // Handle errors
  //         }
  //       );
  //   }
  // }


  get_user_data() {
    this.storage.get('member').then((res1) => {
      this.user_id1 = parseInt(res1.user_id, 10);
      this.url.presentLoading();
      this.url.dismiss();
      this.http
        .get(`${this.url.serverUrl}get_all_data_admin?user_id=${this.user_id1}`)
        .subscribe(
          (res: any) => {
            if (res === 0) {
              this.url.presentToast('You Have no Profile.');
            } else {
              console.log(res);
              this.field_executive_name = res.data.field_executive_name;
              this.photo = res.data.photo;
            }
          },
          (err) => {
          }
        );
    });
  }

  logout() {
    this.storage.remove('member').then(() => {
      this.router.navigateByUrl('/login');
    });
    localStorage.clear();
    this.url.presentToast('Logout Successfully.');
  }

  open_playstore() {
    window.open(
      'https://play.google.com/store/apps/details?id=com.ionic.clockhooks',
      '_system'
    );
  }

  redirectToCompassPage() {
    if (this.platform.is('cordova')) {
      window.open('https://onlinecompass.app/', '_system');
    } else {
      window.location.href = 'https://onlinecompass.app/';
    }
  }

  goToCompassPage() {
    this.router.navigate(['/compass']);
  }

}
