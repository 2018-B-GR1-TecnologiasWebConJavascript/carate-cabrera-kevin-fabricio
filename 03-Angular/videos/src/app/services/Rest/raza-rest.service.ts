import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/index";
import {Raza} from "../../interfaces/raza";

@Injectable()
export class RazaRestService{

  nombreModelo = '/Raza';

  constructor(private readonly _httpClient:HttpClient){

  }

  findAll(): Observable<Raza[]>{
    //Observable
    const razas$ =this._httpClient.get(environment.url + this.nombreModelo)
      .pipe(
        map(
          (respuesta) => {
            return <Raza[]> respuesta;
          }
        )
      )

    return razas$;
  }

  delete(id:number):Observable<Raza>{
    return this._httpClient
      .delete(environment.url + this.nombreModelo + `/${id}`)
      .pipe(map(r => <Raza> r));
  }

}
