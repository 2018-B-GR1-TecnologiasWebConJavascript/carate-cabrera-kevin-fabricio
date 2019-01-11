import { Component, OnInit } from '@angular/core';
import {RazaRestService} from "../../services/Rest/raza-rest.service";
import {Raza} from "../../interfaces/raza";

@Component({
  selector: 'app-ruta-gestion-usuarios',
  templateUrl: './ruta-gestion-usuarios.component.html',
  styleUrls: ['./ruta-gestion-usuarios.component.scss']
})
export class RutaGestionUsuariosComponent implements OnInit {


  users: User[] = [];


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

  constructor(private readonly _razaRestService: RazaRestService) { }

  ngOnInit() {
    //this.users = this._userService.users;
    const razas = this._razaRestService.findAll();
    razas.subscribe(
      (razas:Raza[])=>{
          console.log(razas);
      },
      (error) =>{
        console.error('Error', error)
      }
    )
  }

  delete(raza: Raza) {
    //this._userService.delete(user.id);
    const razaEliminada$ = this._razaRestService.delete(raza.id);
    razaEliminada$.subscribe(
      (razaEliminada:Raza) =>{
        console.log('Se elimino:',razaEliminada);
        const indice = this.usuarios.findIndex((raza)=>raza.id === raza.id);

        this.usuarios.splice(indice,1);
      },
      (error)=>{
        console.error('Error',error)
      }
    )
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
