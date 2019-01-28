import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-imagen-pelicula',
  templateUrl: './imagen-pelicula.component.html',
  styleUrls: ['./imagen-pelicula.component.scss']
})
export class ImagenPeliculaComponent implements OnInit {

  @Input() // propiedades
  nombre:String;

  @Input()
  titulo:String;

  @Input()
  anio:String;

  @Output() // eventos
  dioClick = new EventEmitter()


  constructor() { }

  ngOnInit() {
  }

  lanzarEventoDioClick(){
    const  objetoPelicula = {
      titulo:this.titulo,
      anio:this.anio,
      nombre:this.nombre
    };

    this.dioClick.emit(objetoPelicula);
  }

}
