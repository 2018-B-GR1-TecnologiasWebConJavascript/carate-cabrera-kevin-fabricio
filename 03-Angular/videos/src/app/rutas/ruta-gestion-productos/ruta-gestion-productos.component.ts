import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ruta-gestion-productos',
  templateUrl: './ruta-gestion-productos.component.html',
  styleUrls: ['./ruta-gestion-productos.component.scss']
})
export class RutaGestionProductosComponent implements OnInit {

  constructor() { }

  productos: Producto[] = [
    {
      id:1,
      nombre:'Pilsener'
    },
    {
      id:2,
      nombre:'Brahma'
    }
  ]


  ngOnInit() {
  }

  imprimir(producto: Producto){
    console.log('Imprimir', producto);
    const  indiceproductoAEliminar = this.productos.findIndex(
      (productoABuscar) =>{
        return productoABuscar.id === producto.id;
      }
    );
    this.productos.splice(indiceproductoAEliminar, 1);
  }

  actualizar(producto: Producto){
    const  indice = this.productos.findIndex(
      (productoABuscar) =>{
        return productoABuscar.id === producto.id;
      }
    );

    this.productos[indice].nombre = document.getElementById("actualizarNombre").value;
  }

  ingresarProducto(){

    const producto: Producto = {
      id: document.getElementById("id2").value,
      nombre: document.getElementById("name").value
    }

    this.productos.push(producto);
  }
}

interface Producto {
  nombre?: string;
  id?: number;
}
