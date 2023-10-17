import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
// import { AlertController, Platform } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { IonAccordionGroup } from '@ionic/angular';
import { IonSegment } from '@ionic/angular';

interface PropertyType {
  id: number;
  property: string;
}

interface StateType {
  id: number;
  state: string;
}

interface DistrictType {
  id: number;
  District: string;
}

interface TehsilType {
  id: number;
  tt: string;
}

interface YerasType {
  id: number;
  year: string;
}



@Component({
  selector: 'app-basicnew',
  templateUrl: './basicnew.page.html',
  styleUrls: ['./basicnew.page.scss'],
})
export class BasicnewPage implements OnInit {

  alladmindata:any;

   // selectedAmenities: string[] = [];
   selectedAmenities: { [key: string]: boolean } = {
    'NA': false,
    'Bore Well': false,
    'Compound wall with gate': false,
    'Car Parking': false
  };

  selectedDeviation: string[] = [];
  imageUrl: string = 'https://cms.meritassociates.in/public/images/New-valuation/';

  formData: any = {
    name: '',
    NA: false,
    BoreWell: false,
    Compoundwallwithgate: false,
    CarParking: false,
    ModularKitchen: false,
    Lift: false,
    Swimming_Pool: false,
    Electric_carChargingStation: false,
    Garden: false,
  };


  loading: boolean = false;
  latitude: any;
  longitude: any;

  tagnew: any[] = [];
  image1: any[] = [];
  aminities: string[] = ['NA'];
  // aminities: string[] = [];
  deviation: string[] = ['High Tension'];
  wine_shop: string[] = [];
  // @ViewChild('segment') segment!: IonSegment;
  @ViewChild('segment', { static: false }) segment!: IonSegment;
  // @ViewChild('segment', { static: false }) segment!: IonSegment;

  newdocuments: { name: string; file: string }[] = [];
  documents: { category: string;category1: string; tag: string; tag1: string; file: string; file1: any }[] = [];

  data: { valuation_id: 0;
     category_id: string;
     category_id1: string; 
     tag_id: string; 
     tag_id1: string; 
     image: string; }[] = [];
  // data: { valuation_id: string; category_id: string; tag_id: string; } | undefined;

  session_datan = {
    valuation_id: '',
    category_id: '',
    tag_id: '',
    image: '',
  };

  customer_photo_name_edit: any;

  //cap_photo start//
  customer_camera1: string = 'assets/pre1.png';
  customer_photo_name_edit1: any;
  fileToUpload1: any;
  //cap_photo End//


  valuation_data = {
    valuation_id: '',
  };

  switchTab = 'general';

  // fristuploaddoc
  document_name: any;
  documents1: { name: string; file: string }[] = [];
  customer_file: any;

  //seconduploaddoc
  allcategory1: any;
  alltags1: any;
  // alltags1: any[] = [];
  customer_file1: any
  selectedTags: any[] = [];

  // customer_file1: string = 'assets/pre1.png';
  // documents: { category: string; tag: string; file: string }[] = [];
  // documents: any[] = [];
  alllocation1: any;
  allproduct1: any;
  allclient1: any;
  allarea1: any;
  allfieldexe1: any;
  alldata: any;
  allassistant1: any;
  alltechnical1: any;
  alltechnicalhead1: any;
  contact_no: any;
  address: any;
  latitute: any;
  tags: any;
  date: any;
  comment: any;
  // customer_photo_name_edit: any;
  fileToUpload: any;
  firstname: any;
  middelname: any;
  lastname: any;
  bankname: any;
  products: any;
  locations: any;
  area: any;
  field_executive_name: any;
  assistant_valuer_name: any;
  technical_manager_name: any;
  technical_head_name: any;
  alt_cont_no: any;
  city: any;
  state: any;
  pincode: any;
  // longitude: any;
  statu: any;
  static_status: any;
  allfieldlist: any;
  cust_id1: string | undefined;
  presentAlert: any;
  valuation: any;
  allstatetype1: any;
  alldistricttype1: any;
  alltehsiltype1: any;
  allgetyears1: any;
  // latitude: any;
  customer_file2: any;
  valuation_id1: any;
  image: any;
  relation_with_owner: any;
  property_type_id: any;
  whether_boundaries_matching: any;
  type_of_structure: any;
  no_of_floor: any;
  no_of_flat_per_floor: any;
  percentage_completion: any;
  construction_plan: any;
  property_inquiry: any;
  road_type: any;
  occupancy_status: any;
  occupied_by: any;
  reference_type: any;
  categorys: any;
  alladminimg: any;
  session_data2: any;
  allcapturedata: any;
  field_executive_id: any;


  segmentChanged(ev: any) {
    this.switchTab = ev.detail.value;
    // console.log('Segment changed', ev);
  }


  user_id1: any;
  session_data1: any;

  update_data = {
    id: '',
    firstname: '',
    middelname: '',
    lastname: '',
    valuation_id: '',
    contact_no: '',
    alt_cont_no: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    // longitude: '',
    // latitute: '',
    tags: '',
    date: '',
    comment: '',
    document_name: '',
    bankname: '',
    products: '',
    locations: '',
    area: '',
    name: '',
    image_files: '',
    statu: '',
  };

  valuation_id: any;
  name: any;
  person_met_at_site: any;
  allpropertytype1: any;
  meter_no: any;
  house_no: any;
  road_name: any;
  building_name: any;
  wing_no: any;
  colony: any;
  village_city: any;
  // district: any;
  District: any;
  tt: any;
  tehsil: any;
  landmark: any;
  pin_code: any;
  four_borders: string[] = ['', '', '', ''];
  remark_on_boundaries_matching: any;
  // plot_area: any = ['', '', '', ''];
  plot_area: string[] = ['', '', '', ''];
  land_area_per_site: any;
  land_area_per_documents: any;
  construction_area: string[] = ['', '', '', ''];
  GF: any;
  FF: any;
  SF: any;
  TF: any;
  discription_of_property: string[] = ['', '', '', ''];
  road_width_in_feet: any;
  side_marginal_distance_in_feet: string[] = ['', '', '', ''];
  land_rate_per_sqft: any;
  land_rate_per_acre: any;
  land_rate_per_guntha: any;
  locality_price: any;
  reference_name: any;
  reference_mobile: any;
  reference_feedback: any;
  remark_on_property: any;
  lat: any;
  long: any;
  date_of_visit: any;
  // date_of_visit: string;
  // aminities: any;
  // aminities: string[] = ['',];
  selectedOption23: any;
  selectedOption24: any;
  // selectedTagName: any;
  selectedTagName: string[] = [];
  selectedTagName1: string[] = [];
  selectedOption: any;
  selectedOption1: any;
  selectedOption2: any;
  selectedOption3: any;
  selectedOption4: any;
  selectedOption5: any;

  selectedOption16: any;
  selectedOption17: any;
  selectedOption18: any;
  selectedOption19: any;
  selectedOption20: any;
  selectedOption21: any;
  selectedOption22: any;
  selectedOption29: any;
  selectedOption25: any;
  selectedOption26: any;
  selectedOption27: any;
  selectedOption28: any;

  selectedOption6: any;
  selectedOption7: any;
  selectedOption8: any;
  selectedOption9: any;
  selectedOption10: any;
  selectedOption11: any;
  selectedOption12: any;
  selectedOption13: any;
  selectedOption14: any;
  selectedOption15: any;

  field_update_data = {
    valuation_id: '',
    field_executive_id:'',
    name: '',
    person_met_at_site: '',
    relation_with_owner: '',
    property_type_id: '',
    meter_no: '',
    house_no: '',
    road_name: '',
    building_name: '',
    wing_no: '',
    colony: '',
    village_city: '',
    state: '',
    district_id: '',
    District: '',
    tehsil: '',
    tt: '',
    landmark: '',
    pin_code: '',
    four_borders: this.four_borders,
    whether_boundaries_matching: '',
    remark_on_boundaries_matching: '',
    plot_area: this.plot_area,
    land_area_per_site: '',
    land_area_per_documents: '',
    construction_area: this.construction_area,
    GF: '',
    FF: '',
    SF: '',
    TF: '',
    type_of_structure: '',
    no_of_floor: '',
    no_of_flat_per_floor: '',
    discription_of_property: this.discription_of_property,
    percentage_completion: '',
    construction_plan: '',
    property_inquiry: '',
    road_width_in_feet: '',
    road_type: '',
    reference_type: '',
    occupancy_status: '',
    occupied_by: '',
    side_marginal_distance_in_feet: this.side_marginal_distance_in_feet,
    land_rate_per_sqft: '',
    land_rate_per_acre: '',
    land_rate_per_guntha: '',
    locality_price: '',
    reference_name: '',
    reference_mobile: '',
    reference_feedback: '',
    remark_on_property: '',
    lat: '',
    long: '',
    date_of_visit: '',
    category: '',
    categorys: '',
    tag_id: '',
    tags: '',
    // aminities: this.aminities,
    aminities: '',
    deviation: '',
    wine_shop: '',
    image_files: '',
    status_field:'',
  };

  categorytext: any;
  tagtext: any;
  selectedCategoryText: any;
  selectedTagText: any;
  allcapture_image:any;
  allcapture_cat:any;
  allcapture_tags:any;

  constructor(
    public url: DataService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private storage: Storage,
    private alertController: AlertController,
    private navCtrl: NavController,
    private sanitizer: DomSanitizer
    // private sanitizer: DomSanitizer
  ) { 
    this.date_of_visit = '';
   }
  async ngOnInit() {
    await this.storage.create();
  }

  ionViewWillEnter() {
    this.route.queryParams.subscribe((params) => {
      this.address = this.url.user_map_address;
      this.lat = this.url.user_map_lat;
      this.long = this.url.user_map_lan;

      this.customer_file2 = 'assets/dummy.png';
      this.customer_file = 'assets/dummy.png';

      if (params && params['id']) {
        try {
          this.session_data1 = JSON.parse(params['id']);
          // console.log(this.session_data1);
        } catch (error) {
          // console.error('Error parsing JSON data:', error);
        }
      }

      if (params && params['latitude'] && params['longitude']) {
        this.latitude = Number(params['latitude']);
        // console.log(this.longitude, 5);
        // alert(this.latitude);
        this.longitude = Number(params['longitude']);
        // console.log(this.longitude, 6);
        // alert(this.longitude);
      }

      this.url.presentLoading();
      this.get_all_data_admin();
      this.client();
      this.product();
      this.location();
      this.property_type();
      this.category();
      // this.tagss();
      this.get_fe_data();
      this.get_state();
      this.get_year();
      this.getadminimg();
      this.get_capture_data();
      this.get_all_data_admin1();
      this.url.dismiss();
    });
  }

  session_data(arg0: string, session_data: any) {
    throw new Error('Method not implemented.');
  }

  sanitizeUrl(url: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  uploadFileToActivity1() {
    const endpoint = 'your-destination-url';
    const formData: FormData = new FormData();
    formData.append('files', this.fileToUpload1, this.fileToUpload1.name);
    // console.log(formData);
  }

  updateSelectedDeviation(deviation: string, event: any) {
    const isChecked = event.detail.checked;
  
    if (isChecked) {
      if (!this.selectedDeviation.includes(deviation)) {
        this.selectedDeviation.push(deviation);
      }
    } else {
      this.selectedDeviation = this.selectedDeviation.filter(item => item !== deviation);
    }
  }

  // updateSelectedAmenities(amenity: string, event: any) {
  //   this.selectedAmenities[amenity] = event.detail.checked;
  // }

  updateSelectedAmenities(amenity: string, event: any) {
    this.selectedAmenities[amenity] = event.detail.checked;
  }

  // updateSelectedAmenities(aminities: string, event: any) {
  //   const isChecked = event.detail.checked;
  
  //   if (isChecked) {
  //     if (!this.selectedAmenities.includes(aminities)) {
  //       this.selectedAmenities.push(aminities);
  //     }
  //   } else {
  //     this.selectedAmenities = this.selectedAmenities.filter(item => item !== aminities);
  //   }
  // }

  client() {
    this.http.get(`${this.url.serverUrl}client?`).subscribe(
      (res: any) => {
        if (res === 0) {
          this.url.presentToast('You Have no Clients added.');
        } else {
          this.allclient1 = res.data;
          // console.log(res.data);
        }
      },
      (err) => { }
    );
  }
  
  product() {
    this.http.get(`${this.url.serverUrl}product?`).subscribe(
      (res: any) => {
        if (res === 0) {
          this.url.presentToast('You have no products added.');
        } else {
          this.allproduct1 = res.data;
          // console.log(res.data);
        }
      },
      (err) => { }
    );
  }

  location() {
    this.http.get(`${this.url.serverUrl}location`).subscribe(
      (res: any) => {
        if (res === 0) {
          this.url.presentToast('You have no locations added.');
        } else {
          this.alllocation1 = res.data;
          // console.log(res.data);
        }
      },
      (err) => { }
    );
  }

  property_type() {
    this.http.get(`${this.url.serverUrl}property_type`).subscribe(
      (res: any) => {
        if (res === 0) {
          this.url.presentToast('You have no Property Type added.');
        } else {
          // console.log(res.data);
          this.allpropertytype1 = res.data;
        }
      },
      (err) => { }
    );
  }

  get_state() {
    this.http.get(`${this.url.serverUrl}get_state?`).subscribe(
      (res: any) => {
        if (res === 0) {
          this.url.presentToast('You have no state added.');
        } else {
          // console.log(res.data);
          this.allstatetype1 = res.data;
          // console.log(this.allstatetype1);
          // console.log(res);
        }
      },
      (err) => { }
    );
  }

  onStateChange(dd: any) {
    //const selectedStateId = this.selectedOption21; // Assuming the ID is stored in selectedOption21
    // alert(this.selectedOption21);
    if (dd) {
      this.get_district_by_id(dd);
    }
    this.selectedOption21 = dd;
  }

  get_district_by_id(stateId: number) {
    this.http
      .get(`${this.url.serverUrl}get_district_by_id?id=${stateId}`)
      .subscribe(
        (res: any) => {
          if (res.status) {
            // console.log(res.data);
            this.alldistricttype1 = res.data;
            // alert(this.alldistricttype1);
            // console.log(this.alldistricttype1);
            // alert(this.alldistricttype1);
            // console.log(res);
          } else {
            this.url.presentToast('No districts found for the selected state.');
          }
        },
        (err) => {
          // Handle error
        }
      );
  }

  onDistrictChange(dd1: any) {
    //const selectedStateId = this.selectedOption21; // Assuming the ID is stored in selectedOption21
    // alert(this.selectedOption22);
    if (dd1) {
      this.get_tehsil_by_id(dd1);

    }
    this.selectedOption22 = dd1;
  }

  get_tehsil_by_id(districtId: number) {
    this.http
      .get(`${this.url.serverUrl}get_tehsil_by_id?id=${districtId}`)
      .subscribe(
        (res: any) => {
          if (res.status) {
            // console.log(res.data);
            this.alltehsiltype1 = res.data;
            // console.log(res);
          } else {
            this.url.presentToast(
              'No tehsils found for the selected district.'
            );
          }
        },
        (err) => {
          // Handle error
        }
      );
  }

  // togglewine_shop(wine_shopy: string) {
  //   if (this.wine_shop.includes(wine_shopy)) {
  //     // Remove deviatiy if it's already selected
  //     this.wine_shop = this.wine_shop.filter((item) => item !== wine_shopy);
  //   } else {
  //     // Add deviatiy if it's not selected
  //     this.wine_shop.push(wine_shopy);
  //   }
  // }

  get_year() {
    this.http.get(`${this.url.serverUrl}get_year?`).subscribe(
      (res: any) => {
        if (res === 0) {
          this.url.presentToast('You have no Property Type added.');
        } else {
          // console.log(res.data);
          this.allgetyears1 = res.data;
          // console.log(res);
        }
      },
      (err) => { }
    );
  }

  areaget(dd: any) {
    // console.log(dd, 1);
    this.selectedOption2 = dd.detail.value;
    this.get_area_by_id();
  }

  fieldget(areaid: any) {
    // console.log(areaid, 1);
    this.selectedOption3 = areaid.detail.value;
    this.emp_name();
  }
  
  get_area_by_id() {
    this.storage.get('member').then((res1) => {
      this.user_id1 = parseInt(res1.user_id, 10);
      this.http
        .get(
          `${this.url.serverUrl}get_area_by_id?location_id=${this.selectedOption2}`
        )
        .subscribe(
          (res: any) => {
            if (res === 0) {
              this.url.presentToast('You have no area added.');
            } else {
              // console.log(res.data);
              // this.allbooktables = [];
              this.allarea1 = res.data[0];
            }
          },
          (err) => { }
        );
    });
  }

  removeArea(dd: any) {
    this.http.delete(`${this.url.serverUrl}area/${dd}`).subscribe(
      (res: any) => {
        if (res.Name == 'deleted') {
          this.alladmin();
          this.url.presentToast('Deleted Successfully.');
        } else {
          // console.log(res);
        }
      },
      (err) => {
        // this.loader_visibility = false;
        //this.func.presentToast("Server Error. Please try after some time.");
      }
    );
  }

  addarea(f: NgForm) {
    //console.log(f.value.contact_no)
    if (f.value.areaName != '') {
      this.url.presentLoading();
      this.http.post(`${this.url.serverUrl}area`, f.value).subscribe(
        (res: any) => {
          f.resetForm();
          // console.log(res);
          this.alladmin();
          if (res.Name == 'Added') {
            this.url.presentToast('Area Added SuccessFully.');
            //this.otp='1234';
          }
          this.url.dismiss();
        },
        (err) => {
          this.url.dismiss();
        }
      );
    } else {
      this.url.presentToast('Please Fill area.');
    }
  }

  alladmin() {
    throw new Error('Method not implemented.');
  }

  emp_name() {
    // alert(1);
    this.http
      .get(`${this.url.serverUrl}emp_name?area_id=${this.selectedOption3}`)
      .subscribe(
        (res: any) => {
          if (res === 0) {
            this.url.presentToast('You have no area added.');
          } else {
            this.alldata = res.data;
            // console.log(this.alldata, 1);
            Array.from(this.alldata).forEach((i: any) => {
              if (i.role_name_id == '27') {
                this.allfieldexe1.push(i);
                // alert('5');
                // alert(this.allbooktables);
              }
            });

            Array.from(this.alldata).forEach((i: any) => {
              if (i.role_name_id == '29') {
                this.allassistant1.push(i);
                // alert(this.allbooktables);
              }
            });

            Array.from(this.alldata).forEach((i: any) => {
              if (i.role_name_id == '30') {
                this.alltechnical1.push(i);
                // alert(this.allbooktables);
              }
            });

            Array.from(this.alldata).forEach((i: any) => {
              if (i.role_name_id == '31') {
                this.alltechnicalhead1.push(i);
              }
            });
            // console.log(res.data);
          }
        },
        (err) => { }
      );
  }

  update_admin_data(f: NgForm) {
    if (
      this.selectedOption !== undefined &&
      this.selectedOption !== 'Select Client' &&
      this.selectedOption1 !== undefined &&
      this.selectedOption1 !== 'Select Product' &&
      this.selectedOption2 !== undefined &&
      this.selectedOption2 !== 'Location' &&
      this.selectedOption3 !== undefined &&
      this.selectedOption3 !== 'Area' &&
      this.selectedOption4 !== undefined &&
      this.selectedOption4 !== 'Field Executive' &&
      this.selectedOption5 !== undefined &&
      this.selectedOption5 !== 'Assistant Valuer'
    ) {
      this.storage.get('member').then((res) => {
        this.user_id1 = parseInt(res.user_id, 10);
        // console.log(f.value);
        this.update_data.id = this.user_id1;
        this.update_data.firstname = f.value.firstname;
        this.update_data.middelname = f.value.middelname;
        this.update_data.lastname = f.value.lastname;
        this.update_data.valuation_id = f.value.valuation_id;
        this.update_data.bankname = this.selectedOption;
        this.update_data.products = this.selectedOption1;
        this.update_data.locations = this.selectedOption2;
        this.update_data.area = this.selectedOption3;
        this.update_data.name = this.selectedOption4;
        this.update_data.name = this.selectedOption5;
        this.update_data.contact_no = this.contact_no;
        this.update_data.address = this.address;
        this.update_data.city = f.value.city;
        this.update_data.state = f.value.state;
        this.update_data.pincode = f.value.pincode;
        // this.update_data.longitude = f.value.valuation_id;
        // this.update_data.latitute = this.latitute;
        this.update_data.tags = this.tags;
        this.update_data.date = this.date;
        this.update_data.comment = this.comment;
        this.update_data.document_name = this.document_name;
        this.update_data.image_files = this.customer_photo_name_edit;
        this.url.presentLoading();
        this.url.dismiss();
        // console.log(this.update_data);
        this.http
          .post(`${this.url.serverUrl}update_admin_data`, this.update_data)
          .subscribe(
            (res: any) => {
              this.url.dismiss();
              this.url.presentToast('Update Successfully');
              f.resetForm();
            },
            (err) => {
              this.url.dismiss();
            }
          );
      });
    } else {
      this.url.presentToast('Please Fill All Data.');
    }
  }

  field_executive_step1(f: NgForm) {
    this.storage.get('member').then((res) => {
      this.user_id1 = parseInt(res.user_id, 10);
      // console.log(f.value);
      const formData = new FormData();
      formData.append('valuation_id', this.valuation_id);
      formData.append('image_file', this.fileToUpload);
      // console.log(this.fileToUpload, 5);
      this.url.presentLoading();
      this.url.dismiss();
      // console.log(this.field_update_data);
      this.http
        .post(`${this.url.serverUrl}field_executive`, formData)
        .subscribe(
          (res: any) => {
            this.url.dismiss();
            this.get_fe_data();
          },
          (err) => {
            this.url.dismiss();
          }
        );
    });
  }

  new_field_executive(f: NgForm) {
    this.storage.get('member').then((res) => {
      this.user_id1 = parseInt(res.user_id, 10);
      this.field_update_data.valuation_id = this.valuation_id;
      console.clear();
      console.log(this.data, 25);
      this.url.presentLoading();
      this.url.dismiss();
      console.log(this.field_update_data);
      this.http
        .post(`${this.url.serverUrl}store_image`, this.data)
        .subscribe(
          (res: any) => {
            this.url.dismiss();
            this.get_capture_data();
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

  //Get all category
  category() {
    this.http.get(`${this.url.serverUrl}category?`).subscribe(
      (res: any) => {
        if (res === 0) {
          this.url.presentToast('You have no Property Type added.');
        } else {
          // console.log(res.data);
          this.allcategory1 = res.data;
          console.log( this.allcategory1, 11);

        }
      },
      (err) => { }
    );
  }

  //Get all Tag
  tags1() {
    this.http
      .get(`${this.url.serverUrl}tags?id=${this.selectedOption23.id}`)
      .subscribe(
        (res: any) => {
          if (res === 0) {
            this.url.presentToast('You have no Property Type added.');
          } else {
            // console.log(res, 0);
            this.alltags1 = res.data;
            console.log(this.alltags1, 12);
          }
        },
        (err) => { }
      );
  }

  tags23(dd: any) {
    console.log(this.selectedOption23, 13);
    if (this.selectedOption23 != undefined) {
      this.categorytext = this.selectedOption23.id;
      console.log(this.categorytext,23);
      this.tags1();
    }
  }

  selectTag(tag: any) {
    this.selectedOption24 = tag;
    console.log(this.selectedOption24,14);
    this.selectedTagName.push(tag.tag);
    this.selectedTagName1.push(tag.id);
  }

  // addData() {
  //   this.data.push({
  //     category_id: this.selectedOption23.id,
  //    category_id1: this.selectedOption23.category,
  //     tag_id: this.selectedTagName1[this.data.length], // Use the selected tag name for the new row
  //     tag_id1: this.selectedTagName[this.data.length], // Use the selected tag name for the new row
  //     valuation_id: this.valuation_id,
  //     image: this.fileToUpload,
  //   });
  //   console.log( this.selectedOption23.id,15);
  //   console.log(  this.selectedOption23.category,16);
  //   console.log(this.selectedTagName1[this.data.length],17);
  //   console.log(this.selectedTagName[this.data.length],17);
  // }

  addData() {
    if (this.selectedOption23 && this.selectedOption23.id && this.selectedOption23.category) {
        this.data.push({
            category_id: this.selectedOption23.id,
            category_id1: this.selectedOption23.category,
            tag_id: this.selectedTagName1[this.data.length] !== null ? this.selectedTagName1[this.data.length] : '', // Use the selected tag name for the new row if available or an empty string
            tag_id1: this.selectedTagName[this.data.length] !== null ? this.selectedTagName[this.data.length] : '', // Use the selected tag name for the new row if available or an empty string
            valuation_id: this.valuation_id,
            image: this.fileToUpload,
        });
        console.log(this.selectedOption23.id, 15);
        console.log(this.selectedOption23.category, 16);
        if (this.selectedTagName1[this.data.length] !== null) {
            console.log(this.selectedTagName1[this.data.length], 17);
        }
        if (this.selectedTagName[this.data.length] !== null) {
            console.log(this.selectedTagName[this.data.length], 18);
        }
    } else {
        console.error("selectedOption23 is not properly set.");
    }
}


  addDocument() {
    if (this.selectedOption23 && this.selectedOption24 && this.customer_file1) {
      this.documents.push({
        category: this.selectedOption23.category,
        category1: this.selectedOption23.id,
        tag: this.selectedTagName1[this.documents.length], // Use the selected tag name for the new row
        tag1: this.selectedTagName[this.documents.length],
        file: this.customer_file1,
        file1: this.fileToUpload,
      });
  
      this.selectedOption24 = null; // Clear the selected tag
      this.customer_file1 = '';
    // console.log( this.selectedOption24,20)
    // console.log(this.customer_file1, 21);

    }
  }

  // addDocument() {
  //   if (this.selectedOption23 && this.selectedOption24 && this.customer_file1) {
  //     this.documents.push({
  //       category: this.selectedOption23.category,
  //       category1: this.selectedOption23.id,
  //       tag: this.selectedTagName1[this.documents.length], // Use the selected tag name for the new row
  //       tag1: this.selectedTagName[this.documents.length], 
  //       file: this.customer_file1,
  //       file1: this.fileToUpload,
  //     });
  //     // this.documentsnew.push(this.fileToUpload);
  //     this.selectedOption24 = null; // Clear the selected tag for the next document
  //     this.customer_file1 = '';
  //   }
  // }

  get_capture_data() {
    this.storage.get('member').then((res2) => {
      this.valuation_id1 = parseInt(res2.valuation_id, 10);
      this.http
        .get(`${this.url.serverUrl}get_capture_data?valuation_id=${this.session_data1}`)
        .subscribe(
          (res: any) => {
            if (res === 0) {
              this.url.presentToast('You Have no booking.');
            } else {
              let data = res.data;
              this.image = data[0].image;
              // console.log(this.image,89);
              this.allcapture_image = (data[0].image);
              // console.log(this.allcapture_image,78);
              this.allcapture_cat = (data[0].categorys).split(',');              
              // console.log(this.allcapture_cat, 78);
              this.allcapture_tags = (data[0].tags).split(','); 
              // console.log(this.allcapture_tags, 88);// 
            }
          },
          (err) => { }
        );
    });
  }






  removeDocument1(index: number) {
    this.data.splice(index, 1);
  }



  tags24(dd: any) {
    console.log(dd);
    if (this.selectedOption24 != undefined) {
      // alert(1);
      this.tagtext = this.selectedOption24.tag;
      // this.selectedOption24 = this.selectedOption24.id;
      console.log(this.tagtext);
    }
  }


  handleFileInput2(files: any) {
    this.fileToUpload = files.target.files.item(0);
    if (files.target.files && files.target.files[0]) {
      const file = files.target.files[0];

      const reader = new FileReader();
      reader.onload = (e) => (this.customer_file1 = reader.result);

      reader.readAsDataURL(file);
    }
  }

  uploadFileToActivity11() {
    const endpoint = 'your-destination-url';
    const formData: FormData = new FormData();
    formData.append('files', this.fileToUpload, this.fileToUpload.name);
    //this.dataService.present();
    console.log(formData);
  }

  handleFileInput1(event: any) {
    if (event && event.target && event.target.files) {
      const file = event.target.files.item(0);
  
      if (file) {
        const reader = new FileReader();
  
        reader.onload = (fileEvent) => {
          if (fileEvent.target && fileEvent.target.result) {
            const result = fileEvent.target.result as string;
  
            const mimeType = file.type;
  
            if (mimeType.startsWith('image/')) {
              this.fileToUpload = result;
            } else if (mimeType === 'image/pdf') {
              this.fileToUpload = result;
            }
          }
        };
  
        reader.readAsDataURL(file);
      }
    } else {
      console.error('Invalid event or event properties:', event);
    }
  }

  isImageFile(file: string): boolean {
    return typeof file === 'string' && file.startsWith('data:image/');
  }

  isPdfFile(file: string): boolean {
    return typeof file === 'string' && file.startsWith('data:image/pdf');
  }


  
  field_executive_step(f: NgForm, dd:any) {
    this.storage.get('member').then((res) => {
      this.user_id1 = parseInt(res.user_id, 10);
      // console.log(f.value);
      this.field_update_data.valuation_id = this.valuation_id;
      // alert(this.field_update_data.valuation_id);
      this.field_update_data.name = f.value.name;
      this.field_update_data.person_met_at_site = f.value.person_met_at_site;
      this.field_update_data.relation_with_owner = this.selectedOption16;
      this.field_update_data.property_type_id = this.selectedOption17;
      this.field_update_data.meter_no = f.value.meter_no;
      this.field_update_data.house_no = this.house_no;
      this.field_update_data.road_name = f.value.road_name;
      this.field_update_data.building_name = f.value.building_name;
      this.field_update_data.wing_no = f.value.wing_no;
      this.field_update_data.colony = f.value.colony;
      this.field_update_data.village_city = f.value.village_city;
      this.field_update_data.tehsil = f.value.tehsil;
      this.field_update_data.landmark = f.value.landmark;
      this.field_update_data.pin_code = f.value.pin_code;
      this.field_update_data.whether_boundaries_matching =
      this.selectedOption18;
      this.field_update_data.remark_on_boundaries_matching = f.value.remark_on_boundaries_matching;
      this.field_update_data.land_area_per_site = f.value.land_area_per_site;
      this.field_update_data.land_area_per_documents =
        f.value.land_area_per_documents;
      this.field_update_data.type_of_structure = this.selectedOption19;
      this.field_update_data.no_of_floor = this.selectedOption20;
      this.field_update_data.no_of_flat_per_floor = this.selectedOption6;
      this.field_update_data.percentage_completion = this.selectedOption7;
      this.field_update_data.construction_plan = this.selectedOption8;
      this.field_update_data.property_inquiry = this.selectedOption9;
      this.field_update_data.road_width_in_feet = f.value.road_width_in_feet;
      this.field_update_data.road_type = this.selectedOption10;
      this.field_update_data.occupancy_status = this.selectedOption11;
      this.field_update_data.occupied_by = this.selectedOption12;
      this.field_update_data.land_rate_per_sqft = f.value.land_rate_per_sqft;
      this.field_update_data.land_rate_per_acre = f.value.land_rate_per_acre;
      this.field_update_data.land_rate_per_guntha =
        f.value.land_rate_per_guntha;
      this.field_update_data.locality_price = f.value.locality_price;
      this.field_update_data.reference_type = this.selectedOption13;
      this.field_update_data.reference_name = f.value.reference_name;
      this.field_update_data.reference_mobile = f.value.reference_mobile;
      this.field_update_data.reference_feedback = f.value.reference_feedback;
      this.field_update_data.remark_on_property = f.value.remark_on_property;
      this.field_update_data.lat = f.value.lat;
      this.field_update_data.long = f.value.long;
      this.field_update_data.state = this.selectedOption21;
      this.field_update_data.district_id = this.selectedOption22;
      this.field_update_data.tehsil = this.selectedOption29;
      this.field_update_data.GF = this.selectedOption25;
      this.field_update_data.FF = this.selectedOption26;
      this.field_update_data.SF = this.selectedOption27;
      this.field_update_data.TF = this.selectedOption28;
      this.field_update_data.date_of_visit = f.value.date_of_visit;
       // Create an array of selected amenities
    // const selectedAmenitiesArray = Object.keys(this.selectedAmenities).filter(
    //   (amenity) => this.selectedAmenities[amenity]
    // );

    // this.field_update_data.aminities = selectedAmenitiesArray.join(',');

     // Create an array of selected amenities
  const selectedAmenitiesArray = Object.keys(this.selectedAmenities).filter(
    (amenity) => this.selectedAmenities[amenity]
  );

  this.field_update_data.aminities = selectedAmenitiesArray.join(',');
    // Object.keys(this.selectedAmenities).forEach((amenity) => {
    //   this.selectedAmenities[amenity] = this.selectedAmenities.includes(amenity);
    // });

      // this.field_update_data.aminities = this.selectedAmenities.join(',');
      // this.selectedDeviation = dataFromDatabase.selectedDeviations.split(',');
      this.field_update_data.deviation = this.selectedDeviation.join(',');
      this.field_update_data.image_files = this.fileToUpload;
      this.field_update_data.status_field = dd;
      this.url.presentLoading();
      this.url.dismiss();
      // console.log(this.field_update_data);
      this.http
        .post(`${this.url.serverUrl}field_executive`, this.field_update_data)
        .subscribe(
          (res: any) => {
            // console.log(res.data,77);
            this.url.dismiss();
            this.get_fe_data();
          },
          (err) => {
            this.url.dismiss();
          }
        );
    });
  }

  showSaveToast() {
    this.url.dismiss();
    this.url.presentToast('Data saved successfully!');
    this.get_fe_data();
  }

  showSubmitToast() {
    this.url.dismiss();
    this.url.presentToast('Data submitted successfully!');
    this.router.navigate(['/dashboard']);
  }

  get_all_data_admin1() {
    this.storage.get('member').then((res1) => {
      this.user_id1 = parseInt(res1.user_id, 10);
      this.http
        .get(`${this.url.serverUrl}get_all_data_valuation?valuation_id=${this.session_data1}`)
        .subscribe(
          
          (res: any) => {
            if (res === 0) {
              this.url.presentToast('You Have no booking.');
            } else {
              this.firstname = res.data[0].firstname;
              this.middelname = res.data[0].middelname;
              this.lastname = res.data[0].lastname;
              this.valuation_id = res.data[0].valuation_id;
              this.bankname = res.data[0].bankname;
              this.products = res.data[0].products;
              this.locations = res.data[0].locations;
              this.area = res.data[0].area;
              this.field_executive_name = res.data[0].field_executive_name;
              this.assistant_valuer_name = res.data[0].assistant_valuer_name;
              this.technical_manager_name = res.data[0].technical_manager_name;
              this.technical_head_name = res.data[0].technical_head_name;
              this.contact_no = res.data[0].contact_no;
              this.alt_cont_no = res.data[0].alt_cont_no;
              this.address = res.data[0].address;
              this.city = res.data[0].city;
              this.state = res.data[0].state;
              this.pincode = res.data[0].pincode;
              // this.longitude = res.data[0].longitude;
              // this.latitute = res.data[0].latitute;
              this.tags = res.data[0].tags;
              this.date = res.data[0].date;
              this.comment = res.data[0].comment;
              this.document_name = res.data[0].document_name;
              // this.image = res.data[0].image;
              // console.log(this.image, 0);
              // this.image = `${imageUrl}${image}`;
              // this.image = 'https://webmediaindia.co.in/merit_associates/public/images/' + res.data[0].image; // Construct the full image URL
              // this.image = res.data[0].image;
              this.statu = res.data[0].statu;
              this.static_status = res.data[0].static_status;
            }
          },
          (err) => { }
        );
    });
  }


  //segment code start
 //segment code start
 moveToPreviewSegment() {
  // if (this.segment) {
  //   this.segment.value = 'preview';
  // }
  // this.segment.value = 'preview';

  this.switchTab = 'preview';

  if (this.segment) {
    this.segment.value = 'preview';
  }
}
//segment code end
  //segment code end

 

  show_map() {
    this.router.navigate([`show-map`]);
  }

  geotag_map() {
    this.router.navigate([`geotagmap`]);
  }

  newdownloadImage1(imageUrl: string) {
    if (!imageUrl) {
      // console.log('Image URL is not provided.');
      return;
    }
  
    // Extract the image format from the URL
    const formatMatch = imageUrl.match(/\.(png|jpg|jpeg|gif|pdf)$/i);
    if (!formatMatch) {
      // console.log('Image format not recognized.');
      return;
    }
  
    const imageFormat = formatMatch[1].toLowerCase();
    const validFormats = ['png', 'jpg', 'jpeg', 'gif','pdf'];
    if (!validFormats.includes(imageFormat)) {
      // console.log('Image format not supported.');
      return;
    }
  
    // Fetch the image as a blob
    fetch(imageUrl)
      .then((response) => response.blob())
      .then((blob) => {
        // Create a Blob object from the image blob
        const file = new Blob([blob], { type: `image/${imageFormat}` });
        // Generate a URL for the Blob object
        const url = window.URL.createObjectURL(file);
        // Create an anchor element to initiate the download
        const a = document.createElement('a');
        a.href = url;
        a.download = `image.${imageFormat}`; // Change the filename based on the format
        document.body.appendChild(a);
        a.click();
        // Clean up the temporary URL and anchor
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      })
      .catch((error) => {
        // console.error('Error downloading image:', error);
      });
  }


  deleteCaptureData(valuation_id: number, index: number) {
    this.storage.get('member').then((res2) => {
      this.valuation_id1 = parseInt(res2.valuation_id, 10);
      // alert( this.valuation_id1);
      this.http.get(`${this.url.serverUrl}capdatadelete?id=${index}&valuation_id=${this.session_data1}`)
        .subscribe(
          (response: any) => {
            if (response.status) {
              this.get_capture_data();
              // console.log(response.message);
              this.allcapturedata.splice(index, 1);
            } else {
              // console.log(response.message);
            }
          },
          (error) => {
            // console.error('Error occurred:', error);
          }
        );
    });
  }

  deleteCaptureData1(index: number) {
    this.storage.get('member').then((res2) => {
      this.valuation_id1 = parseInt(res2.valuation_id, 10);
      this.http.get(`${this.url.serverUrl}capdatadelete?id=${index}`)
      .subscribe(
        (response: any) => {
          if (response.status) {
            // Success, handle UI updates and data removal
            // console.log(response.message);
            this.allcapturedata.splice(index, 1);
            // You might also want to remove the deleted item from your local data array
          } else {
            // console.log(response.message); // Could not delete
          }
        },
        (error) => {
          // console.error('Error occurred:', error);
        }
      );
    });
   
  }

 
  get_fe_data() {
    this.storage.get('member').then((res2) => {
      this.valuation_id1 = parseInt(res2.valuation_id, 10);
      this.http
        .get(
          `${this.url.serverUrl}get_fe_data?valuation_id=${this.session_data1}`
        )
        .subscribe(
          (res: any) => {
            if (res === 0) {
              this.url.presentToast('You Have no booking.');
            } else {
              let data = res.data;
              // console.log(data);
              this.allfieldlist = res.data;
              this.name = data[0].name;
              this.selectedOption16 = data[0].relation_with_owner;
              this.date_of_visit = data[0].date_of_visit;
              this.selectedOption17 = data[0].property_type_id;

              const selectedPropertyType = this.allpropertytype1.find((propertytype: PropertyType) => propertytype.id === this.selectedOption17);
              if (selectedPropertyType) {
                selectedPropertyType.property = data[0].property;
              }

              this.meter_no = data[0].meter_no;
              this.person_met_at_site = data[0].person_met_at_site;
              this.house_no = data[0].house_no;
              this.road_name = data[0].road_name;
              this.building_name = data[0].building_name;
              this.wing_no = data[0].wing_no;
              this.colony = data[0].colony;
              this.village_city = data[0].village_city;
              this.selectedOption21 = data[0].state_id;
              this.onStateChange(data[0].state_id);
              const selectedStateName = data[0].state;
              // console.log('selectedStateName:', selectedStateName);


              this.selectedOption22 = data[0].district;
              this.onDistrictChange(data[0].district);
              // console.log('selectedOption22:', this.selectedOption22);

              const selectedDistrictName = data[0].District;
              // console.log('selectedDistrictName:', selectedDistrictName);


              this.selectedOption29 = data[0].tehsil;
              // console.log('selectedOption29:', this.selectedOption29);

              const selectedTehsileName = data[0].tt;
              // console.log('selectedTehsileName:', selectedTehsileName);

            
              this.four_borders[0] = data[0].four_borders[0];
              
              this.four_borders[1] = data[0].four_borders[1];
              
              this.four_borders[2] = data[0].four_borders[2];
              
              this.four_borders[3] = data[0].four_borders[3];
             

              this.landmark = data[0].landmark;

              // console.log(this.landmark, 78);
              this.pin_code = data[0].pin_code;


              this.selectedOption18 = data[0].whether_boundaries_matching;
              this.remark_on_boundaries_matching = data[0].remark_on_boundaries_matching;
              this.land_area_per_site = data[0].land_area_per_site;
              this.land_area_per_documents = data[0].land_area_per_documents;

              this.selectedOption19 = data[0].type_of_structure;
              this.selectedOption20 = data[0].no_of_floor;
              this.selectedOption6 = data[0].no_of_flat_per_floor;

              this.selectedOption7 = data[0].percentage_completion;
              // console.clear();
              // console.log(this.percentage_completion,66);

              this.selectedOption8 = data[0].construction_plan;

              this.selectedOption25 = data[0].GF;
              // Find the propertytype object with the selected property_type_id
              const selectedYerasType = this.allgetyears1.find((getyears: YerasType) => getyears.id === this.selectedOption25);
              if (selectedYerasType) {
                selectedYerasType.year = data[0].gf;
              }

              this.selectedOption26 = data[0].FF;
              // Find the propertytype object with the selected property_type_id
              const selectedYerasType1 = this.allgetyears1.find((getyears: YerasType) => getyears.id === this.selectedOption26);
              if (selectedYerasType1) {
                selectedYerasType1.year = data[0].ff;
              }

              this.selectedOption27 = data[0].SF;
              // Find the propertytype object with the selected property_type_id
              const selectedYerasType2 = this.allgetyears1.find((getyears: YerasType) => getyears.id === this.selectedOption27);
              if (selectedYerasType2) {
                selectedYerasType2.year = data[0].sf;
              }

              this.selectedOption28 = data[0].TF;
              // Find the propertytype object with the selected property_type_id
              const selectedYerasType3 = this.allgetyears1.find((getyears: YerasType) => getyears.id === this.selectedOption28);
              if (selectedYerasType3) {
                selectedYerasType3.year = data[0].tf;
              }

              this.selectedOption9 = data[0].property_inquiry;

              this.road_width_in_feet = data[0].road_width_in_feet;
              this.selectedOption10 = data[0].road_type;

              this.selectedOption11 = data[0].occupancy_status;
              this.selectedOption12 = data[0].occupied_by;
              this.land_rate_per_sqft = data[0].land_rate_per_sqft;
              this.land_rate_per_acre = data[0].land_rate_per_acre;
              this.land_rate_per_guntha = data[0].land_rate_per_guntha;
              this.locality_price = data[0].locality_price;
              this.selectedOption13 = data[0].reference_type;
              this.reference_name = data[0].reference_name;
              this.reference_mobile = data[0].reference_mobile;
              this.reference_feedback = data[0].reference_feedback;
              this.remark_on_property = data[0].remark_on_property;
              // console.clear();
              // console.log(this.remark_on_property, 97);
              // alert(this.remark_on_property);

              // this.latitude = data[0].latitude;
              // this.longitude = data[0].longitude;
              
              this.plot_area[0] = data[0].plot_area[0];
              // console.clear();
              // console.log(this.plot_area[0], 78);
              this.plot_area[1] = data[0].plot_area[1];
              this.plot_area[2] = data[0].plot_area[2];
              this.plot_area[3] = data[0].plot_area[3];

              this.construction_area[0] = data[0].construction_area[0];
              this.construction_area[1] = data[0].construction_area[1];
              this.construction_area[2] = data[0].construction_area[2];
              this.construction_area[3] = data[0].construction_area[3];

              this.side_marginal_distance_in_feet[0] = data[0].side_marginal_distance_in_feet[0];
              this.side_marginal_distance_in_feet[1] = data[0].side_marginal_distance_in_feet[1];
              this.side_marginal_distance_in_feet[2] = data[0].side_marginal_distance_in_feet[2];
              this.side_marginal_distance_in_feet[3] = data[0].side_marginal_distance_in_feet[3];

              this.discription_of_property[0] = data[0].discription_of_property[0];
              this.discription_of_property[1] = data[0].discription_of_property[1];
              this.discription_of_property[2] = data[0].discription_of_property[2];
              this.discription_of_property[3] = data[0].discription_of_property[3];

              // this.aminities = this.aminities;
              if (data && data.amenities) {
                Object.keys(this.selectedAmenities).forEach((amenity) => {
                  this.selectedAmenities[amenity] = data.amenities.includes(amenity);
                });
              }
              this.deviation = this.deviation;
              this.wine_shop = this.wine_shop;
            }
          },
          (err) => { }
        );
    });
  }




  get_all_data_admin() {
    this.storage.get('member').then((res1) => {
      this.user_id1 = parseInt(res1.user_id, 10);
      this.http
        .get(`${this.url.serverUrl}get_all_data_valuation?valuation_id=${this.session_data1}`)
        .subscribe(
          (res: any) => {
            if (res === 0) {
              this.url.presentToast('You Have no booking.');
            } else {
              this.valuation_id = res.data[0].valuation_id;
              this.alladmindata=res.data;
            }
          },
          (err) => { }
        );
    });
  }

  isPDF(image: string[]): boolean {
    // Check if the file extension of the first element in the array is '.pdf'
    if (image && image.length > 0) {
      const firstImage = image[0];
      const fileExtension = firstImage.substr(firstImage.lastIndexOf('.') + 1).toLowerCase();
      return fileExtension === 'pdf';
    }
    return false;
  }
  
  // Function to sanitize the PDF URL
  sanitizePDFUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

 
  downloadPDF(pdfUrl: string) {
    // Construct the full URL of the PDF file
    const fullPdfUrl = this.imageUrl + pdfUrl;
  
    // Open the PDF in a new tab
    window.open(fullPdfUrl, '_blank');
  }

  getadminimg() {
    this.storage.get('member').then((res2) => {
      this.valuation_id1 = parseInt(res2.valuation_id, 10);
      this.http
        .get(
          `${this.url.serverUrl}get_all_admin_img?valuation_id=${this.session_data1}`
        )
        .subscribe(
          (res: any) => {
            if (res === 0) {
              this.url.presentToast('You Have no img.');
            } else {
              this.alladminimg = res.data;
            }
          },
          (err) => { }
        );
    });
  }

}
function triggerEvent(domEl: HTMLElement, arg1: string) {
  throw new Error('Function not implemented.');
}