import { Component, OnInit } from '@angular/core';
// import { SpeedometerComponent } from '../speedometer/speedometer.component';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { AlertController } from '@ionic/angular';
import * as moment from 'moment';
// import { setInterval } from 'timers';


// Define an interface for btable
interface BookTable {
  valuation_id: string;
  status: string;
  date: string;
  // Define other properties here...
}


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  private refreshInterval: any;
  isStatusLabelOpen = false;
  switchTab = 'planned';
  user_id1: any;
  message: any;

  currentDayCasesCount = 0;
  allcomtables: any;
  
  shouldHideCard: any;
  timeDifference: any;
  overdueBooktables: any;
  created_at: any;
  status: any;

  segmentChanged(ev: any) {
    this.switchTab = ev.detail.value;
    console.log('Segment changed', ev);
  }

  allbooktables: any = [];
  alloverdue: any[] = [];
  // shouldHideCard: boolean = false;
  
  constructor(
    public url: DataService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private storage: Storage,
    private alertController: AlertController
  ) {}

  ionViewWillEnter() {
    this.url.presentLoading();
    this.get_all_data_admin();
    this.get_all_data_admin_comp();
    this.url.dismiss();
  }

  // ionViewWillEnter() {
  //   this.url.presentLoading();
  //   this.get_all_data_admin(); // Call initially

  //   // Set an interval to refresh the function every 2 seconds
  //   this.refreshInterval = setInterval(() => {
  //     this.get_all_data_admin();
  //   }, 2000);

  //   this.get_all_data_admin_comp();
  //   this.url.dismiss();
  // }

  // ngOnDestroy() {
  //   // Clear the interval when the view is destroyed
  //   if (this.refreshInterval) {
  //     clearInterval(this.refreshInterval);
  //   }
  // }

  goToBasicPage() {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        valuation_id: 1,
      },
    };
    this.router.navigate(['/basicnew'], navigationExtras);
  }

  isAccordionOpen = false;

  anystatus(adc: any) {
    this.isAccordionOpen = true; 
    const navigationExtras: NavigationExtras = {
      queryParams: {
        id: 1,
      },
    };
    this.router.navigate(['/basicnew'], navigationExtras);
  }

  bookEFcase(adc: any) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        id: JSON.stringify(adc),
        // valuation_id: JSON.stringify(adc),
      },
    };
    this.router.navigate(['basicnew'], navigationExtras);
  }


  alltables(alltables: any) {
    throw new Error('Method not implemented.');
  }

  openStatusLabel() {
    this.isStatusLabelOpen = true;
  }

  redirectToStatusPage() {
    this.openStatusLabel(); 
    this.router.navigate(['/basicnew']);
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const isStatusLabelOpen = params['isStatusLabelOpen'];
      if (isStatusLabelOpen) {
      }
    });
  }

  // displayCase(btable: any): void {
  //   this.currentDayCasesCount++;
  // }

  // i provide you html and tc code plz correct it
  // async get_all_data_admin() {
  //   const userData = await this.storage.get('member');
  //   const user_id = parseInt(userData.user_id, 10);
  
  //   this.http.get(`${this.url.serverUrl}get_all_data_admin?user_id=${user_id}`).subscribe(
  //     (res: any) => {
  //       if (res === 0) {
  //         this.url.presentToast('You Have no booking.');
  //       } else {
  //         this.allbooktables = res.data;
  //         const dd = this.dateDifference(res.data[0].fe_time, true);
  
  //         // Sidemenu start
  //         this.url.publishSomeData({
  //           field_executive_name: res.data[0].field_executive_name,
  //         });
  //         // Sidemenu end
  //       }
  //     },
  //     (err) => {
  //       // Handle errors here
  //     }
  //   );
  // }

  calculateTimeDifference1(initialTime: string): string {
    const initialDate = new Date(initialTime);
    const currentDate = new Date();
    const timeDifference = currentDate.getTime() - initialDate.getTime();
  
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  
    if (days > 0) {
      return `${days} days`;
    } else if (hours > 0) {
      return `${hours} hours`;
    } else {
      return `${minutes} minutes`;
    }
  }

  // async get_all_data_admin() {
  //   const userData = await this.storage.get('member');
  //   const user_id = parseInt(userData.user_id, 10);
  
  //   this.http.get(`${this.url.serverUrl}get_all_data_admin?user_id=${user_id}`).subscribe(
  //     (res: any) => {
  //       if (res === 0) {
  //         this.url.presentToast('You Have no booking.');
  //       } else {
  //         if (res.data[0].status !== "visited by fe") {
  //           this.allbooktables = res.data;
  //         const timeDifference = this.calculateTimeDifference(res.data[0].admin);
  //         this.timeDifference = timeDifference;
  //         console.log(this.timeDifference,99);
  //           // Sidemenu start
  //           this.url.publishSomeData({
  //             field_executive_name: res.data[0].field_executive_name,
  //           });
  //           // Sidemenu end
  //         } else {
  //           this.shouldHideCard = true;
  //         }
  //       }
  //     },
  //     (err) => {
  //     }
  //   );
  // }
  // async get_all_data_admin() {
  //   const userData = await this.storage.get('member');
  //   const user_id = parseInt(userData.user_id, 10);
  
  //   this.http.get(`${this.url.serverUrl}get_all_data_admin?user_id=${user_id}`).subscribe(
  //     (res: any) => {
  //       if (res === 0) {
  //         this.url.presentToast('You Have no booking.');
  //       } else {
  //         if (res.data[0].status !== "visited by fe") {
  //           this.allbooktables = res.data;
  //           const timeDifference = this.calculateTimeDifference(res.data[0].created_at);
  //           this.timeDifference = timeDifference;
  //           console.log(this.timeDifference, 99);
  
  //           // Check if the time difference is greater than or equal to 2 hours (2 * 60 * 60 * 1000 milliseconds)
  //           if (Number(timeDifference) >= 2 * 60 * 60 * 1000)  {
  //             // Push the card to another segment
  //             this.overdueBooktables(res.data[0]);
  //           }
  
  //           // Sidemenu start
  //           this.url.publishSomeData({
  //             field_executive_name: res.data[0].field_executive_name,
  //           });
  //           // Sidemenu end
  //         } else {
  //           this.shouldHideCard = true;
  //         }
  //       }
  //     },
  //     (err) => {
  //       // Handle errors if any
  //     }
  //   );
  // }

  async get_all_data_admin() {
    // Your existing code to fetch data
    const userData = await this.storage.get('member');
    const user_id = parseInt(userData.user_id, 10);
    this.http.get(`${this.url.serverUrl}get_all_data_admin?user_id=${user_id}`).subscribe(
      (res: any) => {
        if (res === 0) {
          this.url.presentToast('You Have no booking.');
        } else {
          if (res.data[0].status !== "visited by fe") {
            // Update allbooktables and calculate the time difference
            this.allbooktables = res.data.map((btable: any) => this.calculateTimeDifference(btable));

            // Filter overdue items and move them to the "alloverdue" array
            this.overdueBooktables = this.allbooktables.filter((btable: any) => {
              const days = btable.timeDifference.days;
              return days >= 2;
            });
            // Remove overdue items from the "allbooktables" array
            this.allbooktables = this.allbooktables.filter((btable: any) => {
              const days = btable.timeDifference.days;
              return days < 2;
            });
          } else {
            this.shouldHideCard = true;
          }
        }
      },
      (err) => {
      }
    );
  }

  calculateTimeDifference(btable: any): any {
    const adminTime = moment(btable.admin, 'YYYY-MM-DD HH:mm:ss');
    
    const currentTime = moment();
    const duration = moment.duration(currentTime.diff(adminTime));

    const days = duration.days();
    const hours = duration.hours();
    const minutes = duration.minutes();

    btable.timeDifference = {
      days: days,
      hours: hours,
      minutes: minutes
    };

    return btable;
  }

  calculateTimeDifferencenew(ctable: any): any {
    const adminTime = moment(ctable.admin, 'YYYY-MM-DD HH:mm:ss');
    
    const currentTime = moment();
    const duration = moment.duration(currentTime.diff(adminTime));

    const days = duration.days();
    const hours = duration.hours();
    const minutes = duration.minutes();

    ctable.timeDifference = {
      days: days,
      hours: hours,
      minutes: minutes
    };

    return ctable;
  }



  pushCardToAnotherSegment(cardData: any) {
    this.overdueBooktables.push(cardData);
    
    const index = this.allbooktables.indexOf(cardData);
    if (index !== -1) {
      this.allbooktables.splice(index, 1);
    }
  }
  
  async get_all_data_admin_comp() {
    const userData = await this.storage.get('member');
    const user_id = parseInt(userData.user_id, 10);
    this.http.get(`${this.url.serverUrl}get_all_data_admin?user_id=${user_id}`).subscribe(
      (res: any) => {
        if (res === 0) {
          this.url.presentToast('You Have no booking.');
        } else {
          this.allcomtables = res.data;
          this.allcomtables = res.data.map((ctable: any) => this.calculateTimeDifferencenew(ctable));
          // this.status = res.data;
          // alert(this.status);
          // Sidemenu start
          this.url.publishSomeData({
            field_executive_name: res.data[0].field_executive_name,
          });
          // Sidemenu end
        }
      },
      (err) => {
        // Handle errors here
      }
    );
  }
  contact(type: any, contact_no: any) {
    if (type == 'call') {
      ('tel:+' + contact_no);
    } else {
      // window.open('https://api.whatsapp.com/send?phone=' + contact);
    }
  }

  makePhoneCall(contactNumber: string) {
    if (contactNumber) {
      window.open(`tel:${contactNumber}`, '_system');
    }
  }
  

  show_map() {
    this.router.navigate([`show-map`]);
  }


}
function get_all_data_admin_comp() {
  throw new Error('Function not implemented.');
}
