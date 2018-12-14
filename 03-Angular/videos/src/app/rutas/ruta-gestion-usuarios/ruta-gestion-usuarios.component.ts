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

  actualizar(usuario: Usuario){
    const  indice = this.usuarios.findIndex(
      (usuarioABuscar) =>{
        return usuarioABuscar.id === usuario.id;
      }
    );

    this.usuarios[indice].nombre = document.getElementById("actualizarNombre").value;
  }

  ingresarUsuario(){

    const usuario: Usuario = {
      id: document.getElementById("id2").value,
      nombre: document.getElementById("name").value
    }

    this.usuarios.push(usuario);
  }

}

interface Usuario {
  nombre?: string;
  id?: number;
}
