import { Component } from '@angular/core';
import {LugaresService} from '../services/lugares.service';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-lugares',
  templateUrl: './lugares.component.html',
  animations: [
    trigger('contenedorAnimable', [
      state('inicial', style({
        opacity: 0,
        backgroundColor: 'green',
        transform: 'rotate3d(0,0,0,0deg)'
      })),
      state('final', style({
        opacity: 1,
        backgroundColor: 'yellow',
        transform: 'rotate3d(5,10,20,30deg)'
      })),
      transition('inicial => final', animate(1000)),
      transition('final => inicial', animate(500))
    ])
  ]
})
export class LugaresComponent {
  title = 'PlatziSquare';
  state = 'final';
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
