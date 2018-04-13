import { RUPComponent } from './../core/rup.component';
import { Component, Output, Input, EventEmitter, OnInit } from '@angular/core';
@Component({
    selector: 'rup-odontologiaDefault',
    templateUrl: 'odontologiaDefault.html'
})
export class OdontologiaDefaultComponent extends RUPComponent implements OnInit {
    public piezasDentales;
    public carasDentales;

    ngOnInit() {
        debugger;
        // buscamos las piezas dentales en snomed




        if (!this.registro.valor) {
            this.registro.valor = { piezaDental: null };
        }

    }


    loadPiezasDentales($event) {
        this.snomedService.getQuery({ expression: '<245563006' }).subscribe(dientes => {
            $event.callback(dientes);
        });
    }

    loadCarasDentales($event) {
        this.snomedService.getQuery({ expression: '245652002 OR 245653007 OR 362103001 OR 72203008 OR 245647007' }).subscribe(dientes => {
            $event.callback(dientes);
        });
    }

}
