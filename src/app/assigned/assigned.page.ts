import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import * as moment from 'moment';

@Component({
  selector: 'app-assigned',
  templateUrl: './assigned.page.html',
  styleUrls: ['./assigned.page.scss'],
})
export class AssignedPage implements OnInit {
  filered: any;



  switchTab = 'today';
  user_id1: any;
  from_date: any;
  to_date: any;
  allcomtables: any;

  segmentChanged(ev: any) {
    this.switchTab = ev.detail.value;
    console.log('Segment changed', ev);
  }

  allbooktables: any = [];
  allassigned: any =[];
  alloverdue: any =[];
  allcompleted: any =[];

  assignedsearch: boolean | undefined;
  overduesearch: boolean | undefined;
  completedsearch: boolean | undefined;

  searchText: string = '';

  shouldHideCard: any;
  timeDifference: any;
  overdueBooktables: any;
  created_at: any;
  status: any;


  constructor(
    public url: DataService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private storage: Storage,
    private alertController: AlertController,
    private modalCtrl: ModalController,
    public modalController: ModalController
  ) {}

  ionViewWillEnter() {
    this.url.presentLoading();
    this.get_all_data_admin();
    this.get_all_data_admin_comp();
    this.url.dismiss();
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

  anystatus(adc: any){
    const navigationExtras: NavigationExtras = {
      queryParams:{
        id: 1,
      },
    };
    this.router.navigate(['basic'], navigationExtras);
  }

  alltables(alltables: any) {
    throw new Error('Method not implemented.');
  }

  dateDifference(actualDate: any, value: boolean): string {
    const date1: any = new Date(actualDate);
    const date2: any = new Date();

    let r = {};
    const diffInSeconds: number = Math.abs(date2 - date1) / 1000;
    const days: number = Math.floor(diffInSeconds / (24 * 60 * 60));
    const hours: number = Math.floor((diffInSeconds % (24 * 60 * 60)) / 3600);

    r = {
      days,
      hours,
    };

    if (days === 0) {
      const minutes: number = Math.floor((diffInSeconds / 60) % 60);
      if (minutes === 1) {
        return minutes + ' minute';
      } else {
        return minutes + ' minutes';
      }
    } else {
      if (hours === 1) {
        return days + ' day ' + hours + ' hour';
      } else {
        return days + ' days ' + hours + ' hours';
      }
    }
  }


  assigned_case(){
    this.allassigned = [];
    Array.from(this.allbooktables).forEach((i: any) => {
      if (i.status === 'Assign to FE') {
        this.allassigned.push(i);
      }
    });
  }

  overdue_case(){
    this.alloverdue = [];
    Array.from(this.allbooktables).forEach((i: any) => {
      if (i.status === 'Accept') {
        this.alloverdue.push(i);
      }
    });
  }

  completed_case(){
    this.allcompleted = [];
    Array.from(this.allbooktables).forEach((i: any) => {
      if (i.status === 'Visited by FE') {
        this.allcompleted.push(i);
      }
    });
  }

  
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

  // get_all_data_admin() {
  //   this.storage.get('member').then((res1) => {
  //     this.user_id1 = parseInt(res1.user_id, 10);
  //     this.http
  //       .get(`${this.url.serverUrl}get_all_data_admin?user_id=${this.user_id1}`)
  //       .subscribe(
  //         (res: any) => {
  //           if (res === 0) {
  //             this.url.presentToast('You Have no booking.');
  //           } else {
  //             console.log(res.data);
  //             this.allbooktables = res.data;

  //             var dd = this.dateDifference(res.data[0].created_at, true);
  //             console.log(dd, 0);

  //             this.allassigned = [];
  //             Array.from(this.allbooktables).forEach((i: any) => {
  //               if (i.status === 'Assign to FE') {
  //                 this.allassigned.push(i);
  //               }
  //             });

  //           }
  //         },
  //         (err) => {}
  //       );
  //   });
  // }
  // async get_all_data_admin_comp() {
  //   await this.storage.get('member').then((res1) => {
  //     this.user_id1 = parseInt(res1.user_id, 10);
  //     this.http
  //       .get(`${this.url.serverUrl}get_all_data_admin?user_id=${this.user_id1}`)
  //       .subscribe(
  //         (res: any) => {
  //           if (res === 0) {
  //             this.url.presentToast('You Have no booking.');
  //           } else {
  //             console.log(res.data, 70);
  //             this.allcomtables = res.data;
  //             var dd = this.dateDifference(res.data[0].created_at, true);
  //             console.log(dd, 0);
  //             this.url.publishSomeData({
  //               field_executive_name: res.data[0].field_executive_name,
  //             });
  //           }
  //         },
  //         (err) => {}
  //       );
  //   });
  // }

  get_sort_data_admin() {
    this.storage.get('member').then((res1) => {
      this.user_id1 = parseInt(res1.user_id, 10);
      this.http
        .get(`${this.url.serverUrl}date_wise_data?user_id=${this.user_id1}&&from_date=${this.from_date}&&to_date=${this.to_date}`)
        .subscribe(
          (res: any) => {
            if (res === 0) {
              this.allassigned = [];
              this.url.presentToast('No Data Found');
            } else {
              console.log(res.data,90);
              this.allassigned = [];
              this.allbooktables = res.data;

              Array.from(this.allbooktables).forEach((i: any) => {
                if (i.status === 'Assign to FE') {
                  this.allassigned.push(i);
                }
              });              
            }
          },
          (err) => {}
        );
    });
  }

  contact(type: any, contact: any) {
    if (type == 'call') {
      window.open('tel:+' + contact);
    } else {
      window.open('https://api.whatsapp.com/send?phone=' + contact);
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

  onSearchChange() {
    if (this.searchText.length > 2) {
      this.filered = [];
      this.assignedsearch = true;

      this.allassigned.forEach((i: any) => {
        if (
          i.firstname.toLowerCase().indexOf(this.searchText.toLowerCase()) !== -1
        ) {
          this.filered.push(i);
        }
      });
    } else {
      this.assignedsearch = false;
    }
  }



  onKeyUp(x: any) {
    if (x.target.value.length > 2) {
      this.filered = [];
      this.assignedsearch = true;

      this.allassigned.forEach((i: any) => {
        if (
          i.firstname.toLowerCase().indexOf(x.target.value.toLowerCase()) !== -1
        ) {
          this.filered.push(i);
        }
      });
    } else {
      this.assignedsearch = false;
    }
   
  }


  onKeyUp1(y: any) {
    if (y.target.value.length > 2) {
      this.filered = [];
      this.overduesearch = true;

      this.alloverdue.forEach((i: any) => {
        if (
          i.firstname.toLowerCase().indexOf(y.target.value.toLowerCase()) !== -1
        ) {
          this.filered.push(i);
        }
      });
    } else {
      this.overduesearch = false;
    }
   
  }

  onKeyUp2(z: any) {
    if (z.target.value.length > 2) {
      this.filered = [];
      this.completedsearch = true;

      this.allcompleted.forEach((i: any) => {
        if (
          i.firstname.toLowerCase().indexOf(z.target.value.toLowerCase()) !== -1
        ) {
          this.filered.push(i);
        }
      });
    } else {
      this.completedsearch = false;
    }
   
  }

  
  ngOnInit() {}
}
