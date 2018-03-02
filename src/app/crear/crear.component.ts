import { Component } from '@angular/core';
import {LugaresService} from '../services/lugares.service';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {FormControl} from '@angular/forms';
import {Http} from '@angular/http';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html'
})
export class CrearComponent {
  action  = 'Crear';
  lugar: any = {};
  results$: Observable<any>;
  private searchField: FormControl;
  constructor (private lugaresServices: LugaresService, private route: ActivatedRoute, private http: Http) {
    this.lugar.id = this.route.snapshot.params['id'];
    if (this.lugar.id !== 'new') {
      this.action = 'Editar';
      this.lugaresServices.buscarLugar(this.lugar.id)
        .subscribe(lugar => {
          this.lugar = lugar;
        });
    }
    const URL = 'https://maps.google.com/maps/api/geocode/json';
    this.searchField = new FormControl();
    this.results$ = this.searchField.valueChanges
      .debounceTime(500)
      .switchMap(query => this.http.get(`${URL}?address=${query}`))
      .map(response => response.json())
      .map(response => response.results);
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
        this.lugaresServices.guardarLugar(this.lugar);
        this.lugar = { id: 'new' };
        this.action = 'Crear';
        /*this.lugaresServices.guardarLugar(this.lugar)
          .subscribe( response => {
            alert('Negocio guardado con éxito');

            this.lugar = { id: 'new' };
            this.action = 'Crear';
          });*/
      });
  }
  public seleccionarDireccion(direccion) {
    console.log(direccion);
    this.lugar.calle = direccion.address_components[1].long_name + ' ' + direccion.address_components[0].long_name;
    this.lugar.ciudad = direccion.address_components[4].long_name;
    this.lugar.pais = direccion.address_components[6].long_name;
  }
}
