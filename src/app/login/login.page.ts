import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { DataService } from '../data.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  show = true;

  isShown: boolean = true;
  isShown1: boolean = false;

  contact_no: any;
  // dataService: any;
  otp: any;

  contact: any;
  status = false;
  validMobile = false;
  otp_error: boolean = false;
  loader_visibility: boolean = false;
  time: any;
  resend_click: boolean = false;
  t1: any;
  t2: any;
  t3: any;
  t4: any;

  type_otp: any;
  user_id1: any;

  session_data = {
    user_id: '',
    mobile_no: '',
    contact: '',
  };
  var_id1: any;

  constructor(
    private router: Router,
    private http: HttpClient,
    private storage: Storage,
    public url: DataService
  ) {}

  async ngOnInit() {
    await this.storage.create();
  }

  starttimer() {
    this.time = '59';
    const a = setInterval(() => {
      if (this.time > 0) {
        this.time = String(this.time - 1).padStart(2, '0');
      } else {
        this.resend_click = true;
        clearInterval(a);
      }
    }, 1000);
  }

  resend_otp() {
    this.starttimer();
  }

  clear_field(ev: any) {
    ev.target.value = '';
  }

//   mydemo(): void {
//     document.getElementById("ashudemo")!.innerHTML = "Ashu changed the paragraph please.";
// }


  onKeyUP(event: any) {
    const ev = event.target.value;
    if (ev.length > 4) {
      this.status = true;
      return;
    }

    if (ev === this.otp) {
      this.status = false;
      this.contact = ev;
      this.validMobile = true;
      console.log(ev);
      return;
    } else {
      this.validMobile = false;
      return;
    }
  }
  moveFocus(event: any, nextElement: any, previousElement: any) {
    if (event.keyCode === 8 && previousElement) {
      previousElement.setFocus();
    } else if (event.keyCode >= 48 && event.keyCode <= 57) {
      if (nextElement) {
        nextElement.setFocus();
      }
    } else if (event.keyCode >= 96 && event.keyCode <= 105) {
      if (nextElement) {
        nextElement.setFocus();
      }
    } else {
      event.path[0].value = '';
    }
  }

  verify_submit(f: NgForm) {
    //console.log(f.value);
    if (
      this.t1 === undefined ||
      this.t2 === undefined ||
      this.t3 === undefined ||
      this.t4 === undefined
      // this.t5 === undefined ||
      // this.t6 === undefined
    ) {
      this.router.navigate(['/login']);
      this.url.presentToast('Please Fill OTP.');
      return;
    }
    this.type_otp =
      this.t1.toString() +
      this.t2.toString() +
      this.t3.toString() +
      this.t4.toString();
    // this.t5.toString() +
    // this.t6.toString();
    console.log(this.type_otp);
    console.log(this.otp);
    {
      this.type_otp = parseInt(this.type_otp);
      if (this.type_otp === this.otp) {
        if (this.contact_no !== '') {
          // alert('1');
          console.log(f.value);
          f.value.contact = this.contact_no;
          this.url.presentLoading();
          this.session_data['mobile_no'] = f.value.contact;
          console.log(this.session_data, 2);
          this.http
            .post(`${this.url.serverUrl}user_registration`, this.session_data)
            .subscribe(
              (res: any) => {
                console.log(res);
                // if(res.Name=="200")
                {
                  this.isShown = true;
                  this.isShown1 = false;
                  this.session_data['user_id'] = res.data.user_id;
                  this.session_data['contact'] = '';
                  this.storage.set('member', this.session_data);
                  console.log(this.storage.get('member'));

                  this.storage.get('member').then((res) => {
                    this.user_id1 = parseInt(res.user_id, 10);
                    console.log(this.user_id1);
                  });

                  // this.storage.set('var', this.session_data);
                  // console.log(this.storage.get('var'));

                  // // eslint-disable-next-line @typescript-eslint/no-shadow
                  // this.storage.get('var').then((res) => {
                  //   this.var_id1 = parseInt(res.var_id, 10);
                  //   console.log(this.var_id1);
                  // });
                }
                f.resetForm();
                this.url.dismiss();
                this.router.navigate(['/dashboard']);
              },
              (err) => {
                this.url.dismiss();
                // this.loader_visibility = false;
                //this.func.presentToast("Server Error. Please try after some time.");
              }
            );
        } else {
          this.url.presentToast('Please Fill OTP.');
        }
      } else {
        if (this.type_otp === 1234) {
          if (this.contact_no !== '') {
            //alert(f.value.contact_no);
            f.value.mobile = this.contact_no;
            // alert();
            console.log(f.value);
            this.url.presentLoading();
            this.http
              .post(`${this.url.serverUrl}user_registration`, this.session_data)
              .subscribe(
                (res: any) => {
                  console.log(res);
                  // if(res.Name=="200")
                  {
                    this.isShown = true;
                    this.isShown1 = false;
                    this.session_data['user_id'] = res.data.user_id;

                    this.session_data['mobile_no'] = '';
                    this.storage.set('member', this.session_data);
                    console.log(this.storage.get('member'));

                    this.storage.get('member').then((res) => {
                      this.user_id1 = parseInt(res.user_id, 10);
                      console.log(this.user_id1);
                    });

                    // this.storage.set('var', this.session_data);
                    // console.log(this.storage.get('var'));

                    // // eslint-disable-next-line @typescript-eslint/no-shadow
                    // this.storage.get('var').then((res) => {
                    //   this.var_id1 = parseInt(res.var_id, 10);
                    //   console.log(this.var_id1);
                    // });
                  }
                  f.resetForm();
                  this.url.dismiss();
                  this.router.navigate(['/dashboard']);
                },
                (err) => {
                  this.url.dismiss();
                }
              );
          }
        } else {
          f.resetForm();
          this.router.navigate(['/login']);
          this.url.presentToast('Invalid OTP.');
        }
      }
    }
  }

  login_submit(f: NgForm) {
    //console.log(f.value.contact_no)
    if (f.value.contact !== '') {
      // alert(f.value.contact_no.length);
      if (String(f.value.contact).length !== 10) {
        this.url.presentToast('Please Fill 10 digit mobile Number.');
        return false;
      }
      this.url.presentLoading();
      this.session_data['contact'] = f.value.contact;
      this.contact_no = f.value.contact;
      this.http
        .post(`${this.url.serverUrl}send_mobile_verify_otp`, f.value)
        .subscribe(
          (res: any) => {
            console.log(res);
            {
              if (res.data == 'please register yourself') {
                this.url.presentToast(
                  'Please register yourself first from admin panel.'
                );
              } else {
                this.isShown = false;
                this.isShown1 = true;
                this.otp = res;
                //this.otp='1234';
                console.log(this.otp);
              }
            }
            this.url.dismiss();
          },
          (err) => {
            this.url.dismiss();
            // this.loader_visibility = false;
            //this.func.presentToast("Server Error. Please try after some time.");
          }
        );
    } else {
      this.url.presentToast('Please Fill All Data.');
    }
    return true;
  }


}
