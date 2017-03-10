import { Component, Output, Input, EventEmitter, OnInit } from '@angular/core';
import { IPaciente } from "../../../../interfaces/IPaciente";


@Component({
  selector: 'rup-ViviendaAsistenciaEconomica',
  templateUrl: 'viviendaAsistenciaEconomica.html'
})//@Component

export class ViviendaAsistenciaEconomicaComponent implements OnInit {

  @Input('datosIngreso') datosIngreso: any;
  @Input('tipoPrestacion') tipoPrestacion: any;
  @Input('paciente') paciente: IPaciente;
  @Output() evtData: EventEmitter<any> = new EventEmitter<any>();

  data: any = {
    mensaje: {
      class: "",
      texto: "",
    },
  };

  ngOnInit() {

this.tipoPrestacion = {
    "id" : "58b8183bb64acd0989b9f53d",
    "key" : "viviendaAsistenciaEconomica",
    "nombre" : "Asistencia Económica",
    "autonoma" : false,
    "activo" : true,
    "componente" : {
        "ruta" : "rup/atomos/socioEconomicos/viviendaAsistenciaEconomica.component.ts",
        "nombre" : "ViviendaAsistenciaEconomicaComponent"
    },
    "turneable" : false
}

    this.data[this.tipoPrestacion.key] = (this.datosIngreso) ? this.datosIngreso : false;
  } //ngOnInit()

  devolverValores() { //Hacer las validaciones                                              
    this.data.mensaje = this.getMensajes();
    this.evtData.emit(this.data);
  }//devolverValores()

  getMensajes() { };

}//export class ViviendaAsistenciaEconomicaComponent