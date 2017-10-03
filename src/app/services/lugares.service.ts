import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Http} from '@angular/http';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class LugaresService {
  API_ENDPOINT = 'https://torch-1055.firebaseio.com';
  constructor(private afDB: AngularFireDatabase, private http: Http) {
  }
  public getLugares() {
    // return this.afDB.list('lugares/');
    return this.http.get(this.API_ENDPOINT + '/lugares.json');
  }
  public getLugaresMap() {
    return this.http.get(this.API_ENDPOINT + '/.json')
      .map((response) => {
        const data = response.json().lugares;
        return data;
      });
  }
  public buscarLugar(id) {
    return this.afDB.object('lugares/' + id);
  }
  public guardarLugar(lugar) {
    // this.afDB.database.ref('lugares/' + lugar.id).set(lugar);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(this.API_ENDPOINT + '/lugares.json', lugar, {headers: headers});
  }
  public obtenerGeodata(direccion) {
    return this.http.get('http://maps.google.com/maps/api/geocode/json?address=' + direccion);
  }
}
