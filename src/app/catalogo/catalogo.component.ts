import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {LocalStorage} from '@ngx-pwa/local-storage';

import { FrontendService }  from '../frontend.service';
import { Actividad } from '../actividad';
import { ObjetoDeNickYEstado } from '../objetoDeNickYEstado';
import { config, from } from 'rxjs';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {

  actividad: Actividad = new Actividad();
  lista: Actividad[];
  linkNickEstado: ObjetoDeNickYEstado;
  constructor(
    protected localStorage: LocalStorage,
    private route: ActivatedRoute,
    private frontendService: FrontendService,
    private location: Location ) { }

  ngOnInit(): void {
    this.actividad.propietario = "time4time";
    //this.frontendService.getActividadesPropietario(this.actividad).subscribe(listaAct => this.lista = listaAct);
    this.frontendService.getActividadesPropietario(this.actividad).subscribe(data =>  this.lista = data);
    this.localStorage.setItem('titulo', this.actividad.titulo).subscribe(() => {});

  }

  //Envio usuario para recibir sus actividades
  sendUser(): void{
    //this.actividad = {titulo:null, descripcion:null, estrellas:0, propietario: "Time4Time", tags:null,clientes:[]}
    //this.frontendService.getActividadesPropietario(this.actividad).subscribe(actividad => this.actividad = actividad);

  }
  modificarActivity(actividad: Actividad):void{
      this.localStorage.setItem('titulo',actividad.titulo).subscribe(() => {});

   // this.frontendService.updateActividad(actividad).subscribe(act => this.ngOnInit(), err => console.error('Ops: ' + err.message));

    //Debo encontrar la manera de enlazar la actiivdad de la lista elegida con esta otra pantalla
  }
  eliminarActivity(actividad: Actividad):void{
    this.frontendService.deleteActividad(actividad).subscribe(act => this.ngOnInit(), err => console.error('Ops: ' + err.message));

  }

  goBack(): void {
    this.location.back();
  }
}
