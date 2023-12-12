import { Component } from '@angular/core';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { App } from '@capacitor/app';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  // rootPage: any ='BasicnewPage';
  dataService: any;
  last_name: any;
  field_executive_name:any;
  name: any;
  mobile: any;
  user_id1: any;
  cust_id1: any;
  version = '0.0.1';
  r2 = {
    id: '',
    remember_token: '',
  };
  remember_token: any;
  Token: any;
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

  redirectToCompassPage() {
    if (this.platform.is('cordova')) {
      // Use Cordova InAppBrowser plugin for mobile apps
      window.open('https://onlinecompass.app/', '_system');
    } else {
      // Use regular window.location.href for web apps
      window.location.href = 'https://onlinecompass.app/';
    }
  }

  async initializeApp() {
    await this.storage.create();
    await this.platform.ready();
  
    const userData = await this.storage.get('member');
    if (userData && userData.user_id) {
      this.cust_id1 = parseInt(userData.user_id, 10);
  
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate(['/login']);
    }
  
    this.url.getObservable().subscribe((data) => {
      // this.name = data.name;
      this.field_executive_name = data.field_executive_name;
      console.log(this.field_executive_name, 90);
      // this.role_name = data.role_name;
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


  goToCompassPage() {
    this.router.navigate(['/compass']); // Navigate to CompassPage
  }

  get_user_data() {
    this.storage.get('member').then((res1) => {
      this.user_id1 = parseInt(res1.user_id, 10);
      // this.session_data1.DepartmentId=this.cust_id1;
      this.url.presentLoading();
      this.url.dismiss();
      this.http
        .get(`${this.url.serverUrl}get_all_data_admin?user_id=${this.user_id1}`)
        .subscribe(
          (res: any) => {
            if (res === 0) {
              this.url.presentToast('You Have no Profile.');
            } else {
              // this.alluserdata = res.data;
              console.log(res);
              this.field_executive_name = res.data.field_executive_name;
              // this.role_name = res.data.role_name;
              this.photo = res.data.photo;
            }
          },
          (err) => {
            // this.loader_visibility = false;
            //this.func.presentToast("Server Error. Please try after some time.");
          }
        );
    });
  }
}
