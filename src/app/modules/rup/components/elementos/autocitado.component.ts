import { element } from 'protractor';
import { RUPComponent } from './../core/rup.component';
import { Component, Output, Input, EventEmitter, OnInit } from '@angular/core';
@Component({
    selector: 'rup-autocitado',
    templateUrl: 'autocitado.html'
})
export class AutocitadoComponent extends RUPComponent implements OnInit {
    // Tipos de prestacion que el usuario tiene permiso
    public tiposPrestacion: any = [];
    public prestacionSeleccion;

    public darTurnoEmit = new EventEmitter<any>();

    ngOnInit() {
        // Buscamos los tipos de prestación que sean turneables para los que el tenga permisos
        // (OBS: a futuro un profesional puede tener permisos para mas prestaciones que no sean turneables)
        this.servicioTipoPrestacion.get({ id: this.auth.getPermissions('rup:tipoPrestacion:?') }).subscribe(data => {
            this.tiposPrestacion = data;
            if (!this.registro.valor) {
                this.registro.valor = {};
                this.registro.valor['autocitado'] = true;
                this.registro.valor['prestacionSolicitada'] = this.tiposPrestacion.find(tp => tp.conceptId === this.prestacion.solicitud.tipoPrestacion.conceptId);
            }
        });
    }

    darTurno(prestacionSolicitud) {
        this.darTurnoEmit.emit(prestacionSolicitud);
    }
}
