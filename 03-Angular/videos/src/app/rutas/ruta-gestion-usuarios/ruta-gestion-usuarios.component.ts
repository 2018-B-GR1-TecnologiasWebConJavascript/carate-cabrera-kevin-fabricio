import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ruta-gestion-usuarios',
  templateUrl: './ruta-gestion-usuarios.component.html',
  styleUrls: ['./ruta-gestion-usuarios.component.scss']
})
export class RutaGestionUsuariosComponent implements OnInit {

  usuarios: Usuario[] = [
    {
      id:1,
      nombre:'Kevin'
    },
    {
      id:2,
      nombre:'Fabricio'
    }
  ]

  constructor() { }

  ngOnInit() {
  }

  hola(){
    return 'Hola'
  }

  imprimir(usuario: Usuario){
    console.log('Imprimir', usuario);
    const  indiceUsuarioAEliminar = this.usuarios.findIndex(
      (usuarioABuscar) =>{
        return usuarioABuscar.id === usuario.id;
      }
    );
    this.usuarios.splice(indiceUsuarioAEliminar, 1);
  }

}

interface Usuario {
  nombre?: string;
  id?: number;
}
