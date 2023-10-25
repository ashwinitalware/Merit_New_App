import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';
import { Storage } from '@ionic/storage-angular';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-cap-photo',
  templateUrl: './cap-photo.page.html',
  styleUrls: ['./cap-photo.page.scss'],
})
export class CapPhotoPage implements OnInit {
  
  fileToUpload: File | null = null;
  previewURL: string | null = null;

  @ViewChild('fileUploadCamera', { static: false })
  fileUploadCamera!: ElementRef;
  
  selectedOption23:any;
  selectedOption24:any;
  filteredTags: any[] = []; 
  allcategory1: any;
  alltags1: any;
  // fileToUpload: any;
  user_id1: any;
  valuation_id: any;
  field_update_data: any;
  allcapture_image: any;

  data: {
    valuation_id: 0;
    category_id: string;
    category_id1: string;
    tag_id: string;
    tag_id1: string;
    image: string;
  }[] = [];
  isModalOpen: boolean = false;
  // valuation_id1: number;

  constructor(
    public url: DataService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private storage: Storage,
    private alertController: AlertController,
    private navCtrl: NavController,
    private sanitizer: DomSanitizer
  ) {
  }
  async ngOnInit() {
    await this.storage.create();
  }

  
  ionViewWillEnter() {
      this.url.presentLoading();
      this.category();
      this.loadTags();
      this.url.dismiss();
  }
  openModal() {
    this.isModalOpen = true;
  }
  
  category() {
    this.http.get(`${this.url.serverUrl}category?`).subscribe(
      (res: any) => {
        if (res === 0) {
          this.url.presentToast('You have no Property Type added.');
        } else {
          this.allcategory1 = res.data;
          console.log(this.allcategory1, 11);
        }
      },
      (err) => { }
    );
  }


  loadTags() {
    if (this.selectedOption23) {
      this.http.get(`${this.url.serverUrl}tags?id=${this.selectedOption23.id}`).subscribe(
        (res: any) => {
          if (res === 0) {
            this.url.presentToast('No tags available for this category.');
          } else {
            this.alltags1 = res.data;
            console.log(this.alltags1, 12);
          }
        },
        (err) => {
          // Handle error if necessary
        }
      );
    } else {
      // Handle the case where no category is selected (e.g., clear or hide the tags).
      this.alltags1 = [];
    }
  }

  new_field_executive(f: NgForm, dd:any) {
    this.storage.get('member').then((res) => {
      this.user_id1 = parseInt(res.user_id, 10);
      this.field_update_data.valuation_id = this.valuation_id;
      console.clear();
      // console.log(this.data, 25);
      this.url.presentLoading();
      this.url.dismiss();
      console.log(this.field_update_data);
      this.http
        .post(`${this.url.serverUrl}store_image`, this.data)
        .subscribe(
          (res: any) => {
            this.url.dismiss();
            // this.get_capture_data();
            console.log(res, 56);
            console.log(this.data, 57);
            this.data = [];
            this.selectedOption23 = null;
            this.selectedOption24 = null;
            this.fileToUpload = null;
          },

          (err) => {
            this.url.dismiss();
          }
        );
    });
  }

  handleFileInput1(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
  
    if (file) {
      this.fileToUpload = file;
      if (this.isImageFile(file)) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.previewURL = e.target?.result as string;
        };
        reader.readAsDataURL(file);
      } else if (this.isPdfFile(file)) {
        // Handle PDF preview if needed
      }
    }
  }
  
  isImageFile(file: File): boolean {
    return file.type.startsWith('image/');
  }
  
  isPdfFile(file: File): boolean {
    return file.type === 'application/pdf';
  }

  // uploadFileToActivity11() {
  //   const endpoint = 'your-destination-url';
  //   const formData: FormData = new FormData();
  //   formData.append('files', this.fileToUpload, this.fileToUpload.name);
  //   //this.dataService.present();
  //   console.log(formData);
  // }

  // handleFileInput1(event: any) {
  //   if (event && event.target && event.target.files) {
  //     const file = event.target.files.item(0);

  //     if (file) {
  //       const reader = new FileReader();

  //       reader.onload = (fileEvent) => {
  //         if (fileEvent.target && fileEvent.target.result) {
  //           const result = fileEvent.target.result as string;

  //           const mimeType = file.type;

  //           if (mimeType.startsWith('image/')) {
  //             this.fileToUpload = result;
  //           } else if (mimeType === 'image/pdf') {
  //             this.fileToUpload = result;
  //           }
  //         }
  //       };

  //       reader.readAsDataURL(file);
  //     }
  //   } else {
  //     console.error('Invalid event or event properties:', event);
  //   }
  // }

  // isImageFile(file: string): boolean {
  //   return typeof file === 'string' && file.startsWith('data:image/');
  // }

  // isPdfFile(file: string): boolean {
  //   return typeof file === 'string' && file.startsWith('data:image/pdf');
  // }


  // showSaveToast() {
  //   this.url.dismiss();
  //   this.url.presentToast('Data saved successfully!');
  //   // this.get_fe_data();
  // }

  // showSubmitToast() {
  //   this.url.dismiss();
  //   this.url.presentToast('Data submitted successfully!');
  //   this.router.navigate(['/dashboard']);
  // }

  // get_capture_data() {
  //   this.storage.get('member').then((res2) => {
  //     this.valuation_id1 = parseInt(res2.valuation_id, 10);
  //     this.http
  //       .get(`${this.url.serverUrl}get_capture_data?valuation_id=${this.session_data1}`)
  //       .subscribe(
  //         (res: any) => {
  //           if (res === 0) {
  //             this.url.presentToast('You Have no booking.');
  //           } else {
  //             let data = res.data;
  //             this.image = data[0].image;
  //             // console.log(this.image,89);
  //             this.allcapture_image = (data[0].image);
  //             // console.log(this.allcapture_image,78);
  //             this.allcapture_cat = (data[0].categorys).split(',');
  //             // console.log(this.allcapture_cat, 78);
  //             this.allcapture_tags = (data[0].tags).split(',');
  //             // console.log(this.allcapture_tags, 88);// 
  //           }
  //         },
  //         (err) => { }
  //       );
  //   });
  // }

  

  // addData() {
  //   if (this.selectedOption23 && this.selectedOption23.id && this.selectedOption23.category) {
  //     this.data.push({
  //       category_id: this.selectedOption23.id,
  //       category_id1: this.selectedOption23.category,
  //       tag_id: this.selectedTagName1[this.data.length] !== null ? this.selectedTagName1[this.data.length] : '', // Use the selected tag name for the new row if available or an empty string
  //       tag_id1: this.selectedTagName[this.data.length] !== null ? this.selectedTagName[this.data.length] : '', // Use the selected tag name for the new row if available or an empty string
  //       valuation_id: this.valuation_id,
  //       image: this.fileToUpload,
  //     });
  //     console.log(this.selectedOption23.id, 15);
  //     console.log(this.selectedOption23.category, 16);
  //     if (this.selectedTagName1[this.data.length] !== null) {
  //       console.log(this.selectedTagName1[this.data.length], 17);
  //       alert(this.selectedTagName1);
  //     }
  //     if (this.selectedTagName[this.data.length] !== null) {
  //       console.log(this.selectedTagName[this.data.length], 18);
  //       alert(this.selectedTagName);
  //     }
  //   } else {
  //     console.error("selectedOption23 is not properly set.");
  //   }
  // }

  addData(){
    
  }

  


  


}
