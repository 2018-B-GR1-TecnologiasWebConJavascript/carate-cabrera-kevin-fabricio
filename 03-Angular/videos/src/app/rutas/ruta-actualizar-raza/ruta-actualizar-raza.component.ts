import { Component, OnInit } from '@angular/core';
import {RazaRestService} from "../../services/Rest/raza-rest.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-ruta-actualizar-raza',
  templateUrl: './ruta-actualizar-raza.component.html',
  styleUrls: ['./ruta-actualizar-raza.component.scss']
})
export class RutaActualizarRazaComponent implements OnInit {

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _razaRestService:RazaRestService
  ) { }

  ngOnInit() {

    const rutaActiva$ = this._activatedRoute.params;

    rutaActiva$
      .subscribe(
        (parametros)=>{

        }
      )

  }

}
