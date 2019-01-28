import { Component, OnInit } from '@angular/core';
import {RazaRestService} from "../../services/Rest/raza-rest.service";
import {Raza} from '../../interfaces/raza';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-ruta-crear-raza',
  templateUrl: './ruta-crear-raza.component.html',
  styleUrls: ['./ruta-crear-raza.component.scss']
})
export class RutaCrearRazaComponent implements OnInit {


  constructor(private readonly _razaRestService: RazaRestService) { }

  raza: RazaEjemplo = {
    nombre: '123123123123',
    apellido: ''
  };

  ngOnInit() {
  }

  crearRaza(razaObjeto) {

    console.log('Formulario: ', formulario);

    // Validar

    //if (this.nombreContieneA(this.raza.nombre.toString())) {
      const crearRaza$ = this._razaRestService
        .create(razaObjeto.nombre);
      crearRaza$
        .subscribe(
          (raza: Raza) => {
            console.log('Raza');
            alert(`Raza creada: ${raza.nombre}`);
          },
          (error) => {
            console.error('Error: ', error);
          }
        );
    //} else {
    //  alert('ERROR, No contiene una letra A');
    //}
  }

  nombreContieneA(nombre: string): boolean {
    return nombre.toLowerCase().includes('a');
  }


  mostrarEnConsola(objeto) {
    console.log(objeto);
    console.log(objeto.value);
  }

}


interface RazaEjemplo {
  nombre: string | number;
  apellido: string;
}
