import { Component } from '@angular/core';
import {LugaresService} from '../services/lugares.service';

@Component({
  selector: 'app-lugares',
  templateUrl: './lugares.component.html'
})
export class LugaresComponent {
  title = 'PlatziSquare';
  lat = 27.1551009;
  lng = -110.2176123;
  lugares = null;
  messageError = null;
  showMessageError = false;
  constructor(private lugaresService: LugaresService) {
    lugaresService.getLugaresMap()
      .subscribe(lugares => {
        // this.lugares = lugares;
        this.lugares = lugares; // this.lugares = lugares.json();
        const me = this;
        me.lugares = Object.keys(me.lugares).map(function (key) { return me.lugares[key]; });
      }, error => {
        console.log(error);
        // alert('Tenemos algo de dificultades, disculpe las molestias. Error:' + error.statusText );
        this.messageError = 'Tenemos algo de dificultades, disculpe las molestias. Error:' + error.statusText;
        this.showMessageError = true;
      });
  }
  closeErrorMessage() {
    this.showMessageError = false;
  }
}
