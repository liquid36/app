import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { IAgenda } from './../../interfaces/turnos/IAgenda';
import { ITurno } from './../../interfaces/turnos/ITurno';
import { Plex } from 'andes-plex/src/lib/core/service';
import { PacienteService } from './../../services/paciente.service';
import { SmsService } from './../../services/turnos/sms.service';
import { AgendaService } from '../../services/turnos/agenda.service';
import { ListaEsperaService } from '../../services/turnos/listaEspera.service';

@Component({
    selector: 'turnos',
    templateUrl: 'turnos.html'
})

export class TurnosComponent implements OnInit {

    @Input() ag: IAgenda;

    showTurnos: boolean = true;

    smsEnviado: boolean = false;
    smsLoader: boolean = false;
    resultado: any;

    listaEspera: any;

    public pacientesSeleccionados: any[] = [];

    public turnos = [];
    private _selectAll;

    ngOnInit() {
        this.turnos = this.ag.bloques[0].turnos;
    }

    @Input()
    public get selectAll() {
        return this._selectAll;
    }
    public set selectAll(value) {
        if (!this.turnos) {
            return;
        }

        this.pacientesSeleccionados = [];

        this.turnos = this.turnos.filter(
            pac => pac.paciente != null);

        this.turnos.forEach(turno => {
            turno.checked = value;

            if (value) {
                this.pacientesSeleccionados.push(turno);
            }
        });

        this._selectAll = value;
    }

    agregarPaciente(turno) {

        this._selectAll = false;

        if (this.pacientesSeleccionados.find(x => x.paciente === turno.paciente)) {
            this.pacientesSeleccionados.splice(this.pacientesSeleccionados.indexOf(turno), 1);
            turno.checked = false;
        } else {
            this.pacientesSeleccionados.push(turno);
            turno.checked = true;
        }
    }

    eventosTurno(agenda: IAgenda, turno: any, event) {
        let btnClicked = event.currentTarget.id;
        let patch: any = {};

        if (btnClicked === 'cancelarTurno') {
            patch = {
                'op': 'cancelarTurno',
                'idTurno': turno.id
            };
        } else if ((btnClicked === 'darAsistencia') || (btnClicked === 'sacarAsistencia')) {
            patch = {
                'op': 'asistenciaTurno',
                'idTurno': turno.id
            };
        } else if (btnClicked === 'bloquearTurno') {
            patch = {
                'op': 'bloquearTurno',
                'idTurno': turno.id
            };
        }

        this.serviceAgenda.patch(agenda.id, patch).subscribe(resultado => {
            this.ag = resultado;
        },
            err => {
                if (err) {
                    console.log(err);
                }
            });
    }

    agregarPacienteListaEspera(agenda: any) {
        let patch: any = {};

        patch = {
            'op': 'listaEsperaSuspensionAgenda',
            'idAgenda': agenda.id,
            'pacientes': this.pacientesSeleccionados
        };

        this.listaEsperaService.postXIdAgenda(agenda.id, patch).subscribe(resultado => agenda = resultado);
    }

    enviarSMS() {
        this.smsLoader = true;

        for (let x = 0; x < this.pacientesSeleccionados.length; x++) {
            if (this.pacientesSeleccionados[x].paciente != null) {

                this.smsService.enviarSms(this.pacientesSeleccionados[x].paciente.telefono).subscribe(
                    resultado => {
                        this.resultado = resultado;

                        if (resultado === '0') {
                            this.smsLoader = false;
                            this.smsEnviado = true;
                        } else {
                            this.smsLoader = false;
                            this.smsEnviado = false;
                        }
                    },
                    err => {
                        if (err) {
                            console.log(err);
                        }
                    });
            }
        }
    }

    constructor(public plex: Plex, public servicePaciente: PacienteService, public smsService: SmsService,
        public serviceAgenda: AgendaService, public listaEsperaService: ListaEsperaService) { }
}