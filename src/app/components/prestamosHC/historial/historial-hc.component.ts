import { Component, OnInit } from '@angular/core';
import { PrestamosService } from './../../../services/prestamosHC/prestamos-hc.service';
import { Auth } from '@andes/auth';
import { Plex } from '@andes/plex';
import * as moment from 'moment';


@Component({
    selector: 'app-historial-carpetas',
    templateUrl: './historial-hc.component.html',
    styleUrls: ['../prestamos-hc.scss']
})

export class HistorialCarpetasComponent implements OnInit {
    public historial: any[] = [];
    public numeroCarpeta = '';

    constructor(
        public prestamosService: PrestamosService,
        public auth: Auth
    ) {
    }

    ngOnInit() {
    }

    buscarHistorial() {
        if (this.numeroCarpeta != null) {
            this.prestamosService.getHistorialCarpetas( { numero: this.numeroCarpeta, organizacion: this.auth.organizacion } )
            .subscribe(historial => {
                this.historial = historial;
            });
        }
    }

    loadCarpetas(event) {
        let listaProfesionales = [];
        if (event.query) {
            let query = {
                nombreCompleto: event.query
            };
        }
    }
}
