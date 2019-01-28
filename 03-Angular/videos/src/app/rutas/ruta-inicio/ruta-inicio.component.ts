import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ruta-inicio',
  templateUrl: './ruta-inicio.component.html',
  styleUrls: ['./ruta-inicio.component.scss']
})
export class RutaInicioComponent implements OnInit {

  constructor() { }

  imagenes:Imagenes[]=[
    {
      anio:2016,
      nombreImagen:'01.jpg',
      nombrePelicula:'Arrow',
    },
    {
      anio:2017,
      nombreImagen:'02.jpg',
      nombrePelicula:'Batman',
    },
    {
      anio:2015,
      nombreImagen:'03.jpg',
      nombrePelicula:'Flash',
    },
    {
      anio:2019,
      nombreImagen:'04.jpg',
      nombrePelicula:'Supergirl',
    }
  ]

  ngOnInit() {
  }

  agregarCarrito(pelicula){
   console.log("agregando al carrito",pelicula)
  }
}

export interface Imagenes {
  nombreImagen: string;
  nombrePelicula: string;
  anio:number;
}
