import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ruta-detalle-usuario',
  templateUrl: './ruta-detalle-usuario.component.html',
  styleUrls: ['./ruta-detalle-usuario.component.scss']
})
export class RutaDetalleUsuarioComponent implements OnInit {

  user:User;
  constructor(
    private readonly _userService: UserServiceService,
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
