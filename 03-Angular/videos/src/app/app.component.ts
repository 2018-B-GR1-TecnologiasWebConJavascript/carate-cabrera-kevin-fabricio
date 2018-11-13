import { Component } from '@angular/core'; //TS
//import {} from 'http-server'; //JS

@Component({ //Decorador
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'videos';
}

