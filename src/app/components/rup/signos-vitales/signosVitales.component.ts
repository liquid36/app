import { ITipoPrestacion } from './../../../interfaces/ITipoPrestacion';
import { Component, OnInit, Output, Input, EventEmitter, AfterViewInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Plex } from 'andes-plex/src/lib/core/service';
// import { PlexValidator } from 'andes-plex/src/lib/core/validator.service';
import { IPaciente } from './../../../interfaces/IPaciente';
// import { TipoPrestacionService } from './../../../services/rup/tipoPrestacion.service';

import { FrecuenciaRespiratoriaComponent } from './../frecuenciaRespiratoria.component';
import { PesoComponent } from './../peso.component';
import { SaturacionOxigenoComponent } from './../saturacionOxigeno.component';
import { TemperaturaComponent } from './../temperatura.component';
import { TensionArterialComponent } from './../tension-arterial/tensionArterial.component';
import { ObservacionesComponent } from './../observaciones.component';

@Component({
    selector: 'rup-signos-vitales',
    templateUrl: 'signosVitales.html'
})
export class SignosVitalesComponent implements OnInit {

    @Output() evtData: EventEmitter<any> = new EventEmitter<any>();
    @Input('datosIngreso') datosIngreso: any;
    @Input('tipoPrestacion') tipoPrestacion: ITipoPrestacion;
    // tipoPrestacion: any;

    @Input('paciente') paciente: any;
    // paciente: any; // será un IPaciente


    // resultados a devolver
    data: Object = {};

    // tipos de prestaciones a utilizar
    prestacionFrecuenciaCardiaca: any;
    prestacionFrecuenciaRespiratoria: any;
    prestacionPeso: any;
    prestacionSaturacionOxigeno: any;
    prestacionTemperatura: any;
    prestacionTensionArterial: any;
    prestacionObservacion: any;
    valor = {
        frecuenciaCardiaca: null,
        frecuenciaRespiratoria: null,
        peso: null,
        saturacionOxigeno: null,
        temperatura: null,
        tensionArterial: null,
        observacion: null,
    };

    // prestaciones: ITipoPrestacion[] = [];
    // constructor(private formBuilder: FormBuilder, private servTipoPrestacion: TipoPrestacionService) { 
    // }

    ngOnInit() {
        
        if (this.datosIngreso) {
            if (this.datosIngreso.frecuenciaCardiaca) {
                this.valor.frecuenciaCardiaca = this.datosIngreso.frecuenciaCardiaca;
            }
            if (this.datosIngreso.frecuenciaRespiratoria) {
                this.valor.frecuenciaRespiratoria = this.datosIngreso.frecuenciaRespiratoria;
            }
            
            if (this.datosIngreso.peso) {
                this.valor.peso = this.datosIngreso.peso;
            }
            if (this.datosIngreso.saturacionOxigeno) {
                this.valor.saturacionOxigeno = this.datosIngreso.saturacionOxigeno;
            }
            if (this.datosIngreso.temperatura) {
                this.valor.temperatura = this.datosIngreso.temperatura;
            }
            if (this.datosIngreso.tensionArterial) {
                this.valor.tensionArterial = this.datosIngreso.tensionArterial;
            }
            if (this.datosIngreso.observacion) {
                this.valor.observacion = this.datosIngreso.observacion;
            }
            // // debugger;
            // this.paciente = {
            //     "id": "588257bce70a44138c44a002",
            //     "documento": "93155329",
            //     "estado": "validado",
            //     "nombre": "SERGIO ECIO JUAN",
            //     "apellido": "GIORGIS",
            //     "sexo": "masculino",
            //     "genero": "masculino",
            //     "fechaNacimiento": "02/11/1993",
            //     "estadoCivil": "",
            //     "activo": true
            // }

            // this.prestacionFrecuenciaCardiaca = {
            //     "_id": "5890c8aa7358af394f6d52d6",
            //     "key": "frecuenciaCardiaca",
            //     "nombre": "Frecuencia cardíaca",
            //     "autonoma": false,
            //     "activo": true,
            //     "componente": "rup/frecuenciaCardiaca.component.ts"
            // };

            // this.prestacionFrecuenciaRespiratoria = {
            //     "_id": "5890c8f77358af394f6d52d7",
            //     "key": "frecuenciaRespiratoria",
            //     "nombre": "Frecuencia respiratoria",
            //     "autonoma": false,
            //     "activo": true,
            //     "componente": "rup/frecuenciaRespiratoria.component.ts"
            // };

            // this.prestacionPeso = {
            //     "_id": "5890c93f7358af394f6d52d9",
            //     "key": "peso",
            //     "nombre": "Peso",
            //     "autonoma": false,
            //     "activo": true,
            //     "componente": "rup/peso.component.ts"
            // };

            // this.prestacionSaturacionOxigeno = {
            //     "_id": "5890c92c7358af394f6d52d8",
            //     "key": "saturacionOxigeno",
            //     "nombre": "Saturación oxigeno",
            //     "autonoma": false,
            //     "activo": true,
            //     "componente": "rup/saturacionOxigeno.component.ts"
            // };

            // this.prestacionTemperatura = {
            //     "_id": "5890ca047358af394f6d52dc",
            //     "key": "temperatura",
            //     "nombre": "Temperatura",
            //     "autonoma": false,
            //     "activo": true,
            //     "componente": "rup/temperatura.component.ts"
            // };

            // this.prestacionTensionArterial = {
            //     "_id": "589073500c4eccd05d2a7a44",
            //     "key": "tensionArterial",
            //     "nombre": "Tension arterial",
            //     "autonoma": false,
            //     "activo": true,
            //     "ejecucion": [
            //         "589073500c4eccd05d2a7a42",
            //         "589073500c4eccd05d2a7a43"
            //     ],
            //     "componente": "rup/tension-arterial/tensionArterial.component.ts"
            // };

            // this.prestacionObservacion = {
            //     "_id": "5894ba5b159eb45d71236e53",
            //     "key": "observaciones",
            //     "nombre": "Texto libre",
            //     "autonoma": false,
            //     "activo": true,
            //     "componente": "rup/observaciones.component.ts"
            // }

            /*this.tipoPrestacion.ejecucion = [{
                "_id": "5890c8aa7358af394f6d52d6",
                "key": "frecuenciaCardiaca",
                "nombre": "Frecuencia cardíaca",
                "autonoma": false,
                "activo": true,
                "componente": "rup/frecuenciaCardiaca.component.ts"
            }, {
                "_id": "5890c8f77358af394f6d52d7",
                "key": "frecuenciaRespiratoria",
                "nombre": "Frecuencia respiratoria",
                "autonoma": false,
                "activo": true,
                "componente": "rup/frecuenciaRespiratoria.component.ts"
            }, {
                "_id": "5890c93f7358af394f6d52d9",
                "key": "peso",
                "nombre": "Peso",
                "autonoma": false,
                "activo": true,
                "componente": "rup/peso.component.ts"
            }, {
                "_id": "5890c92c7358af394f6d52d8",
                "key": "saturacionOxigeno",
                "nombre": "Saturación oxigeno",
                "autonoma": false,
                "activo": true,
                "componente": "rup/saturacionOxigeno.component.ts"
            }, {
                "_id": "5890ca047358af394f6d52dc",
                "key": "temperatura",
                "nombre": "Temperatura",
                "autonoma": false,
                "activo": true,
                "componente": "rup/temperatura.component.ts"
            }, {
                "_id": "589073500c4eccd05d2a7a44",
                "key": "tensionArterial",
                "nombre": "Tension arterial",
                "autonoma": false,
                "activo": true,
                "ejecucion": [
                    "589073500c4eccd05d2a7a42",
                    "589073500c4eccd05d2a7a43"
                ],
                "componente": "rup/tension-arterial/tensionArterial.component.ts"
            }];
    
            // this.prestaciones[] = tipoPrestacionesServices.get(@Input idPadre);
    
            */

        }

    }
    onReturn(valor: Number, tipoPrestacion: any) {
        debugger;
        this.data[tipoPrestacion] = valor[tipoPrestacion].valor;
        this.evtData.emit(this.data);
    }

}