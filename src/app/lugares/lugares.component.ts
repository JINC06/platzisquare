import { Component } from '@angular/core';
import {LugaresService} from '../services/lugares.service';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-lugares',
  templateUrl: './lugares.component.html',
  animations: [
    trigger('contenedorAnimable', [
      state('inicial', style({
        opacity: 0
      })),
      state('final', style({
        opacity: 1
      })),
      transition('inicial => final', animate(2000)),
      transition('final => inicial', animate(1000))
    ])
  ]
})
export class LugaresComponent {
  title = 'PlatziSquare';
  state = 'inicial';
  lat = 27.1551009;
  lng = -110.2176123;
  lugares = null;
  messageError = null;
  showMessageError = false;
  animar() {
    this.state = (this.state === 'final') ? 'inicial' : 'final';
  }
  animacionInicia(e) {
    console.log('Iniciado');
    console.log(e);
  }
  animacionTermina(e) {
    console.log('Terminado');
    console.log(e);
  }
  constructor(private lugaresService: LugaresService) {
    lugaresService.getLugaresMap()
      .subscribe(lugares => {
        // this.lugares = lugares;
        this.lugares = lugares; // this.lugares = lugares.json();
        const me = this;
        me.lugares = Object.keys(me.lugares).map(function (key) { return me.lugares[key]; });
        this.state = 'final';
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
