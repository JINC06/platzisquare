import { Component } from '@angular/core';
import {LugaresService} from '../services/lugares.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html'
})
export class CrearComponent {
  action  = 'Crear';
  lugar: any = {};
  constructor (private lugaresServices: LugaresService, private route: ActivatedRoute) {
    this.lugar.id = this.route.snapshot.params['id'];
    if (this.lugar.id !== 'new') {
      this.action = 'Editar';
      this.lugaresServices.buscarLugar(this.lugar.id)
        .subscribe(lugar => {
          this.lugar = lugar;
        });
    }
  }
  guardaLugar() {
    const direccion = this.lugar.calle + ',' + this.lugar.ciudad + ',' + this.lugar.pais;
    this.lugaresServices.obtenerGeodata(direccion)
      .subscribe(result  => {
        this.lugar.lat = result.json().results[0].geometry.location.lat;
        this.lugar.lng = result.json().results[0].geometry.location.lng;
        if (this.lugar.id === 'new') {
          this.lugar.id = Date.now();
        }
        this.lugar.activo = true;
        this.lugaresServices.guardarLugar(this.lugar)
          .subscribe( response => {
            alert('Negocio guardado con éxito');

            this.lugar = { id: 'new' };
            this.action = 'Crear';
          });
      });
  }
}
