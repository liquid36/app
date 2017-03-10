import { Component, Output, Input, EventEmitter, OnInit } from '@angular/core';
import { IPaciente } from "../../../../interfaces/IPaciente";


@Component({
  selector: 'rup-PerinatalesEmbarazoNormal',
  templateUrl: 'perinatalesEmbarazoNormal.html'
})//@Component

export class PerinatalesEmbarazoNormalComponent implements OnInit {

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
    this.data[this.tipoPrestacion.key] = (this.datosIngreso) ? this.datosIngreso : false;
  } //ngOnInit()

  devolverValores() { //Hacer las validaciones                                              
    this.data.mensaje = this.getMensajes();
    this.evtData.emit(this.data);
  }//devolverValores()

  getMensajes() { };

}//export class PerinatalesEmbarazoNormalComponent