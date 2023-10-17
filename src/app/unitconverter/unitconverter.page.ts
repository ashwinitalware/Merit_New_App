import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-unitconverter',
  templateUrl: './unitconverter.page.html',
  styleUrls: ['./unitconverter.page.scss'],
})
export class UnitconverterPage implements OnInit {

  inputValue: any;
  fromUnit: any;
  conversions: { unit: string; value: number }[] = [];

  constructor(public url: DataService) {}

  convertLength() {
    this.conversions = this.url.convertLength(this.inputValue, this.fromUnit);
  }
  // convertArea() {
  //   this.conversions = this.url.convertArea(this.inputValue, this.fromUnit);
  // }

  selectedType: string = 'length';
  selectedUnit1: string = '';
  selectedUnit2: string = '';
  selectedUnit3: string = '';
  selectedUnit4: string = '';
  convertedValue: number = 0;
  value1: number = 1;
  value2: number = 0;

  // selectedType: string = 'area';
  // selectedarea1: string = '';
  // selectedarea2: string = '';
  // selectedarea3: string = '';
  // selectedarea4: string = '';
  convertedValuearea: number = 0;

  onUnitChange(event: any) {
    this.selectedType = event.detail.value;
    if (this.selectedType == 'length') {
      this.convertUnits();
    } else if (this.selectedType == 'area') {
      this.convertArea();
    }
  }

  // convertUnits1() {
  //   if (this.selectedType === 'length') {
  //     const value: number = this.convertedValue;
  //     switch (this.selectedUnit2) {
  //       case 'me':
  //         this.convertedValue = this.convertMeterToFoot(value);
  //         break;
  //       case 'kme':
  //         this.convertedValue = this.convertKilometerToFoot(value);
  //         break;
  //       case 'cm':
  //         this.convertedValue = this.convertCentimeterToFoot(value);
  //         break;
  //       case 'mm':
  //         this.convertedValue = this.convertMillimeterToFoot(value);
  //         break;
  //       case 'nm':
  //         this.convertedValue = this.convertNanometerToFoot(value);
  //         break;
  //       case 'ft':
  //         this.convertedValue = value;
  //         break;
  //       case 'in':
  //         this.convertedValue = this.convertInchToFoot(value);
  //         break;
  //       default:
  //         this.convertedValue = 0;
  //         break;
  //     }
  //   } else if (this.selectedType === 'area') {
  //     this.convertArea();
  //     const value: number = this.convertedValue;
  //     switch (this.selectedUnit2) {
  //       case 'me':
  //         this.convertedValue = this.convertMeterToFoot(value);
  //         break;
  //       case 'kme':
  //         this.convertedValue = this.convertKilometerToFoot(value);
  //         break;
  //       case 'cm':
  //         this.convertedValue = this.convertCentimeterToFoot(value);
  //         break;
  //       case 'mm':
  //         this.convertedValue = this.convertMillimeterToFoot(value);
  //         break;
  //       case 'nm':
  //         this.convertedValue = this.convertNanometerToFoot(value);
  //         break;
  //       case 'ft':
  //         this.convertedValue = value;
  //         break;
  //       case 'in':
  //         this.convertedValue = this.convertInchToFoot(value);
  //         break;
  //       default:
  //         this.convertedValue = 0;
  //         break;
  //     }
  //   }
  // }

  convertUnits() {
    if (this.selectedType === 'length') {
      const value: number = this.value1;
      // alert(this.selectedUnit2);
      if (this.selectedUnit2 == 'ft') {
        switch (this.selectedUnit1) {
          case 'me':
            this.convertedValue = this.convertMeterToFoot(value);
            break;
          case 'kme':
            this.convertedValue = this.convertKilometerToFoot(value);
            break;
          case 'cm':
            this.convertedValue = this.convertCentimeterToFoot(value);
            break;
          case 'mm':
            this.convertedValue = this.convertMillimeterToFoot(value);
            break;
          case 'nm':
            this.convertedValue = this.convertNanometerToFoot(value);
            break;
          case 'ft':
            this.convertedValue = value;
            break;
          case 'in':
            this.convertedValue = this.convertInchToFoot(value);
            break;
          default:
            this.convertedValue = 0;
            break;
        }
      } else if (this.selectedUnit2 == 'me') {
        switch (this.selectedUnit1) {
          case 'me':
            this.convertedValue = this.convertMeterTometer(value);
            break;
          case 'kme':
            this.convertedValue = this.convertKilometerTometer(value);
            break;
          case 'cm':
            this.convertedValue = this.convertCentimeterTometer(value);
            break;
          case 'mm':
            this.convertedValue = this.convertMillimeterTometer(value);
            break;
          case 'nm':
            this.convertedValue = this.convertNanometerTometer(value);
            break;
          case 'ft':
            this.convertedValue = this.convertfootTometer(value);
            break;
          case 'in':
            this.convertedValue = this.convertInchTometer(value);
            break;
          default:
            this.convertedValue = 0;
            break;
        }
      } else if (this.selectedUnit2 == 'kme') {
        switch (this.selectedUnit1) {
          case 'me':
            this.convertedValue = this.convertMeterTometer(value);
            break;
          case 'kme':
            this.convertedValue = this.convertKilometerTometer(value);
            break;
          case 'cm':
            this.convertedValue = this.convertCentimeterTometer(value);
            break;
          case 'mm':
            this.convertedValue = this.convertMillimeterTometer(value);
            break;
          case 'nm':
            this.convertedValue = this.convertNanometerTometer(value);
            break;
          case 'ft':
            this.convertedValue = this.convertfootTometer(value);
            break;
          case 'in':
            this.convertedValue = this.convertInchTometer(value);
            break;
          default:
            this.convertedValue = 0;
            break;
        }
      } else if (this.selectedUnit2 == 'cm') {
        switch (this.selectedUnit1) {
          case 'me':
            this.convertedValue = this.convertMeterToCentimeter(value);
            break;
          case 'kme':
            this.convertedValue = this.convertKilometerToCentimeter(value);
            break;
          case 'mm':
            this.convertedValue = this.convertMillimeterToCentimeter(value);
            break;
          case 'nm':
            this.convertedValue = this.convertNanometerToCentimeter(value);
            break;
          case 'ft':
            this.convertedValue = this.convertfootToCentimeter(value);
            break;
          case 'in':
            this.convertedValue = this.convertInchToCentimeter(value);
            break;
          default:
            this.convertedValue = 0;
            break;
        }
      } else if (this.selectedUnit2 == 'mm') {
        switch (this.selectedUnit1) {
          case 'me':
            this.convertedValue = this.convertMeterToMillimeter(value);
            break;
          case 'kme':
            this.convertedValue = this.convertKilometerToMillimeter(value);
            break;
          case 'mm':
            this.convertedValue = this.convertCentimeterToMillimeter(value);
            break;
          case 'nm':
            this.convertedValue = this.convertNanometerToMillimeter(value);
            break;
          case 'ft':
            this.convertedValue = this.convertfootToMillimeter(value);
            break;
          case 'in':
            this.convertedValue = this.convertInchToMillimeter(value);
            break;
          default:
            this.convertedValue = 0;
            break;
        }
      } else if (this.selectedUnit2 == 'in') {
        switch (this.selectedUnit1) {
          case 'me':
            this.convertedValue = this.convertMeterToInch(value);
            break;
          case 'kme':
            this.convertedValue = this.convertKilometerToInch(value);
            break;
          case 'mm':
            this.convertedValue = this.convertCentimeterToInch(value);
            break;
          case 'nm':
            this.convertedValue = this.convertNanometerToInch(value);
            break;
          case 'ft':
            this.convertedValue = this.convertfootToInch(value);
            break;
          case 'mm':
            this.convertedValue = this.convertMillimeterToInch(value);
            break;
          default:
            this.convertedValue = 0;
            break;
        }
      } else if (this.selectedUnit2 == 'nm') {
        switch (this.selectedUnit1) {
          case 'me':
            this.convertedValue = this.convertMeterToNanometer(value);
            break;
          case 'kme':
            this.convertedValue = this.convertKilometerToNanometer(value);
            break;
          case 'mm':
            this.convertedValue = this.convertCentimeterToNanometer(value);
            break;
          case 'in':
            this.convertedValue = this.convertInchToNanometer(value);
            break;
          case 'ft':
            this.convertedValue = this.convertfootToNanometer(value);
            break;
          case 'mm':
            this.convertedValue = this.convertMillimeterToNanometer(value);
            break;
          default:
            this.convertedValue = 0;
            break;
        }
      }
    }
    //  else if (this.selectedType === 'area') {
    //   this.convertArea();
    // }
  }

  convertArea() {
    if (this.selectedType === 'area') {
      const value: number = this.value2;
      // alert(this.selectedUnit4);
      if (this.selectedUnit4 == 'sq m') {
        switch (this.selectedUnit3) {
          case 'sq. km':
            // alert(this.convertedValuearea);
            this.convertedValuearea =
              this.convertSquarekilometerToSquaremeter(value);
            // alert(this.convertSquarekilometerToSquaremeter);
            break;
          case 'mi2':
            this.convertedValuearea =
              this.convertSquaremileToSquaremeter(value);
            break;
          case 'yd2':
            this.convertedValuearea =
              this.convertSquareYardToSquaremeter(value);
            break;
          case 'ft2':
            this.convertedValuearea =
              this.convertSquarefootToSquaremeter(value);
            break;
          case 'sq. in':
            this.convertedValuearea =
              this.convertSquareinchToSquaremeter(value);
            break;
          case 'sq m':
            this.convertedValuearea = value;
            break;
          case 'ha':
            this.convertedValuearea = this.convertHectareToSquaremeter(value);
            break;
          case 'ac':
            this.convertedValuearea = this.convertAcreToSquaremeter(value);
            break;
          default:
            this.convertedValuearea = 0;
            break;
        }
      } else if (this.selectedUnit4 == 'sq. km') {
        switch (this.selectedUnit3) {
          case 'sq m':
            // alert(this.convertedValuearea);
            this.convertedValuearea =
              this.convertSquaremeterToSquarekilometer(value);
            // alert(this.convertSquarekilokilometerToSquarekilometer);
            break;
          case 'mi2':
            this.convertedValuearea =
              this.convertSquaremileToSquarekilometer(value);
            break;
          case 'yd2':
            this.convertedValuearea =
              this.convertSquareYardToSquarekilometer(value);
            break;
          case 'ft2':
            this.convertedValuearea =
              this.convertSquarefootToSquarekilometer(value);
            break;
          case 'sq. in':
            this.convertedValuearea =
              this.convertSquareinchToSquarekilometer(value);
            break;
          case 'sq. km':
            this.convertedValuearea = value;
            break;
          case 'ha':
            this.convertedValuearea =
              this.convertHectareToSquarekilometer(value);
            break;
          case 'ac':
            this.convertedValuearea = this.convertAcreToSquarekilometer(value);
            break;
          default:
            this.convertedValuearea = 0;
            break;
        }
      } else if (this.selectedUnit4 == 'mi2') {
        switch (this.selectedUnit3) {
          case 'sq m':
            // alert(this.convertedValuearea);
            this.convertedValuearea =
              this.convertSquaremeterToSquaremile(value);
            // alert(this.convertSquarekilokilometerToSquaremile);
            break;
          case 'sq. km':
            this.convertedValuearea =
              this.convertSquarekilometerToSquaremile(value);
            break;
          case 'yd2':
            this.convertedValuearea = this.convertSquareYardToSquaremile(value);
            break;
          case 'ft2':
            this.convertedValuearea = this.convertSquarefootToSquaremile(value);
            break;
          case 'sq. in':
            this.convertedValuearea = this.convertSquareinchToSquaremile(value);
            break;
          case 'mi2':
            this.convertedValuearea = value;
            break;
          default:
            this.convertedValuearea = 0;
            break;
        }
      } else if (this.selectedUnit4 == 'ft2') {
        switch (this.selectedUnit3) {
          case 'sq m':
            // alert(this.convertedValuearea);
            this.convertedValuearea =
              this.convertSquaremeterToSquarefoot(value);
            // alert(this.convertSquarekilokilometerToSquarefoot);
            break;
          case 'sq. km':
            this.convertedValuearea =
              this.convertSquarekilometerToSquarefoot(value);
            break;
          case 'yd2':
            this.convertedValuearea = this.convertSquareYardToSquarefoot(value);
            break;
          case 'mi2':
            this.convertedValuearea = this.convertSquaremileToSquarefoot(value);
            break;
          case 'sq. in':
            this.convertedValuearea = this.convertSquareinchToSquarefoot(value);
            break;
          case 'ft2':
            this.convertedValuearea = value;
            break;
          default:
            this.convertedValuearea = 0;
            break;
        }
      } else if (this.selectedUnit4 == 'yd2') {
        switch (this.selectedUnit3) {
          case 'sq m':
            // alert(this.convertedValuearea);
            this.convertedValuearea =
              this.convertSquaremeterToSquareYard(value);
            // alert(this.convertSquarekilokilometerToSquareYard);
            break;
          case 'sq. km':
            this.convertedValuearea =
              this.convertSquarekilometerToSquareYard(value);
            break;
          case 'ft2':
            this.convertedValuearea = this.convertSquarefootToSquareYard(value);
            break;
          case 'mi2':
            this.convertedValuearea = this.convertSquaremileToSquareYard(value);
            break;
          case 'sq. in':
            this.convertedValuearea = this.convertSquareinchToSquareYard(value);
            break;
          case 'yd2':
            this.convertedValuearea = value;
            break;
          default:
            this.convertedValuearea = 0;
            break;
        }
      } else if (this.selectedUnit4 == 'sq. in') {
        switch (this.selectedUnit3) {
          case 'sq m':
            // alert(this.convertedValuearea);
            this.convertedValuearea =
              this.convertSquaremeterToSquareinch(value);
            // alert(this.convertSquarekilokilometerToSquareinch);
            break;
          case 'sq. km':
            this.convertedValuearea =
              this.convertSquarekilometerToSquareinch(value);
            break;
          case 'ft2':
            this.convertedValuearea = this.convertSquarefootToSquareinch(value);
            break;
          case 'mi2':
            this.convertedValuearea = this.convertSquaremileToSquareinch(value);
            break;
          case 'sq. in':
            this.convertedValuearea = value;
            break;
          default:
            this.convertedValuearea = 0;
            break;
        }
      }
    }
    // if (this.selectedUnit3 === 'me' && this.selectedUnit4 === 'm2') {
    //   // Convert from square meter to square foot
    //   this.convertedValue = this.value2 * 10.764;
    // }
    // // Add more conversion options as needed

    // // Round the converted value to two decimal places
    // this.convertedValue = Math.round(this.convertedValue * 100) / 100;
  }

  // convertArea1() {
  //   if (this.selectedType === 'area') {
  //     const value: number = this.value1;

  //     switch (this.selectedUnit3) {
  //       case 'sqm':
  //         this.convertedValue = this.convertSquareMeterToSquareFoot(value);
  //         break;
  //       case 'sqk':
  //         this.convertedValue = this.convertSquareKilometerToSquareFoot(value);
  //         break;
  //       case 'sqc':
  //         this.convertedValue = this.convertSquareCentimeterToSquareFoot(value);
  //         break;
  //       case 'sqm':
  //         this.convertedValue = this.convertSquareMillimeterToSquareFoot(value);
  //         break;
  //       case 'sqm':
  //         this.convertedValue = value;
  //         break;
  //       case 'sqin':
  //         this.convertedValue = this.convertSquareInchToSquareFoot(value);
  //         break;
  //       default:
  //         this.convertedValue = 0;
  //         break;
  //     }
  //   }
  // }

  convertMeterToFoot(value: number): number {
    return value * 3.28084;
  }

  convertKilometerToFoot(value: number): number {
    return value * 3280.84;
  }

  convertCentimeterToFoot(value: number): number {
    return value * 0.0328084;
  }

  convertMillimeterToFoot(value: number): number {
    return value * 0.00328084;
  }

  convertNanometerToFoot(value: number): number {
    return value * 3.28084e-9;
  }

  convertInchToFoot(value: number): number {
    return value * 0.0833333;
  }

  // meter
  convertMeterTometer(value: number): number {
    return value;
  }

  convertKilometerTometer(value: number): number {
    return value * 1000;
  }

  convertCentimeterTometer(value: number): number {
    return value / 100;
  }

  convertMillimeterTometer(value: number): number {
    return value / 1000;
  }

  convertNanometerTometer(value: number): number {
    return value / 1e9;
  }
  convertfootTometer(value: number): number {
    return value / 3.281;
  }
  convertInchTometer(value: number): number {
    return value / 39.37;
  }

  //kilometer

  convertMeterTokilometer(value: number): number {
    return value / 1000;
  }

  convertKilometerTokilometer(value: number): number {
    return value;
  }

  convertCentimeterTokilometer(value: number): number {
    return value / 100000;
  }

  convertMillimeterTokilometer(value: number): number {
    return value / 1e6;
  }

  convertNanometerTokilometer(value: number): number {
    return value / 1e12;
  }
  convertfootTokilometer(value: number): number {
    return value / 3281;
  }
  convertInchTokilometer(value: number): number {
    return value / 39370;
  }

  convertSquareMeterToSquareFoot(value: number): number {
    return value * 10.7639;
  }

  convertSquareKilometerToSquareFoot(value: number): number {
    return value * 10763910.4;
  }

  convertSquareCentimeterToSquareFoot(value: number): number {
    return value * 0.00107639;
  }

  convertSquareMillimeterToSquareFoot(value: number): number {
    return value * 0.0000107639;
  }

  convertSquareInchToSquareFoot(value: number): number {
    return value * 0.00694444;
  }

  //Centimeter

  convertMeterToCentimeter(value: number): number {
    return value * 100;
  }

  convertKilometerToCentimeter(value: number): number {
    return value * 100000;
  }

  // convertCentimeterToCentimeter(value: number): number {
  //   return value / 100000;
  // }

  convertMillimeterToCentimeter(value: number): number {
    return value / 10;
  }

  convertNanometerToCentimeter(value: number): number {
    return value / 1e7;
  }
  convertfootToCentimeter(value: number): number {
    return value * 30.48;
  }
  convertInchToCentimeter(value: number): number {
    return value * 2.54;
  }

  //Millimeter

  convertMeterToMillimeter(value: number): number {
    return value * 1000;
  }

  convertKilometerToMillimeter(value: number): number {
    return value * 1e6;
  }

  convertCentimeterToMillimeter(value: number): number {
    return value * 10;
  }

  convertNanometerToMillimeter(value: number): number {
    return value / 1e6;
  }
  convertfootToMillimeter(value: number): number {
    return value * 304.8;
  }
  convertInchToMillimeter(value: number): number {
    return value * 25.4;
  }

  //Inch

  convertMeterToInch(value: number): number {
    return value * 39.37;
  }

  convertKilometerToInch(value: number): number {
    return value * 39370;
  }

  convertCentimeterToInch(value: number): number {
    return value / 2.54;
  }

  convertNanometerToInch(value: number): number {
    return value / 2.54e7;
  }
  convertfootToInch(value: number): number {
    return value * 12;
  }
  convertMillimeterToInch(value: number): number {
    return value / 25.4;
  }

  //Nanometer

  convertMeterToNanometer(value: number): number {
    return value * 1e9;
  }
  convertKilometerToNanometer(value: number): number {
    return value * 1e12;
  }
  convertCentimeterToNanometer(value: number): number {
    return value * 1e7;
  }
  convertInchToNanometer(value: number): number {
    return value * 2.54e7;
  }
  convertfootToNanometer(value: number): number {
    return value * 3.048e8;
  }
  convertMillimeterToNanometer(value: number): number {
    return value * 1e6;
  }
  //sqmeter
  // convertSquareMeterToSquareFoot(value: number): number {
  //   return value * 10.764;
  // }

  // Area formulas Squaremeter
  convertSquarekilometerToSquaremeter(value: number): number {
    return value * 1e6;
  }

  convertSquaremileToSquaremeter(value: number): number {
    return value * 2.59e6;
  }

  convertSquareYardToSquaremeter(value: number): number {
    return value / 1.196;
  }

  convertSquarefootToSquaremeter(value: number): number {
    return value / 10.764;
  }

  convertSquareinchToSquaremeter(value: number): number {
    return value / 1550;
  }

  convertHectareToSquaremeter(value: number): number {
    return value * 10000;
  }

  convertAcreToSquaremeter(value: number): number {
    return value * 4047;
  }

  // Area formulas Squarekilometer
  convertSquaremeterToSquarekilometer(value: number): number {
    return value / 1e6;
  }

  convertSquaremileToSquarekilometer(value: number): number {
    return value * 2.59;
  }

  convertSquareYardToSquarekilometer(value: number): number {
    return value / 1.196e6;
  }

  convertSquarefootToSquarekilometer(value: number): number {
    return value / 1.076e7;
  }

  convertSquareinchToSquarekilometer(value: number): number {
    return value / 1.55e9;
  }

  convertHectareToSquarekilometer(value: number): number {
    return value / 100;
  }

  convertAcreToSquarekilometer(value: number): number {
    return value / 247.1;
  }

  // Area formulas Squaremile
  convertSquaremeterToSquaremile(value: number): number {
    return value / 2.59e6;
  }

  convertSquaremileToSquaremile(value: number): number {
    return value / 3.098e6;
  }

  convertSquareYardToSquaremile(value: number): number {
    return value / 3.098e6;
  }

  convertSquarefootToSquaremile(value: number): number {
    return value / 2.788e7;
  }

  convertSquareinchToSquaremile(value: number): number {
    return value / 4.014e9;
  }

  convertSquarekilometerToSquaremile(value: number): number {
    return value / 2.59;
  }

  // Area formulas Squarefoot
  convertSquaremeterToSquarefoot(value: number): number {
    return value * 10.764;
  }

  convertSquaremileToSquarefoot(value: number): number {
    return value * 2.788e7;
  }

  convertSquareYardToSquarefoot(value: number): number {
    return value * 9;
  }

  convertSquareinchToSquarefoot(value: number): number {
    return value / 144;
  }

  convertSquarekilometerToSquarefoot(value: number): number {
    return value * 1.076e7;
  }
  // Area formulas SquareYard
  convertSquaremeterToSquareYard(value: number): number {
    return value * 1.196;
  }

  convertSquaremileToSquareYard(value: number): number {
    return value * 3.098e6;
  }

  // convertSquareYardToSquareYard(value: number): number {
  //   return value * 9;
  // }

  convertSquarefootToSquareYard(value: number): number {
    return value / 9;
  }
  convertSquareinchToSquareYard(value: number): number {
    return value / 1296;
  }

  convertSquarekilometerToSquareYard(value: number): number {
    return value * 1.196e6;
  }
  // Area formulas Squareinch
  convertSquaremeterToSquareinch(value: number): number {
    return value * 1550;
  }

  convertSquaremileToSquareinch(value: number): number {
    return value * 4.014e9;
  }

  // convertSquareinchToSquareinch(value: number): number {
  //   return value * 9;
  // }

  convertSquarefootToSquareinch(value: number): number {
    return value * 144;
  }
  convertSquareYardToSquareinch(value: number): number {
    return value * 1296;
  }

  convertSquarekilometerToSquareinch(value: number): number {
    return value * 1.55e9;
  }

  ngOnInit() {}
}
