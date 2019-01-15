import { Component, OnInit } from '@angular/core';
import {UsuarioServiceService} from '../../services/usuario-service.service';
import {ActivatedRoute, Route} from '@angular/router';
import {User} from '../../services/usuario-service.service';

@Component({
  selector: 'app-ruta-detalle-usuario',
  templateUrl: './ruta-detalle-usuario.component.html',
  styleUrls: ['./ruta-detalle-usuario.component.scss']
})
export class RutaDetalleUsuarioComponent implements OnInit {

  user:User;
  constructor(
    private readonly _userService: UsuarioServiceService,
    private readonly _route: ActivatedRoute
  ) { }

  ngOnInit() {
    const $activeRoute = this._route.params;
    $activeRoute.subscribe(
      (parameters) => {
        console.log(parameters);
        const user = this._userService.find(parseInt(parameters.userId));
        console.log(user);
        this.user = user;
      }
    )
  }

}
