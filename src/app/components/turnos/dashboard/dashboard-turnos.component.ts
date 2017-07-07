import { Component, AfterViewInit, Input, OnInit, Output, EventEmitter, HostBinding, Pipe, PipeTransform } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '@andes/auth';
import { Plex } from '@andes/plex';
import { Observable } from 'rxjs/Rx';
import * as moment from 'moment';

// Interfaces
import { IAgenda } from '../../../interfaces/turnos/IAgenda';
import { IPaciente } from '../../../interfaces/IPaciente';

// Servicios
import { PacienteService } from '../../../services/paciente.service';
import { AgendaService } from '../../../services/turnos/agenda.service';


@Component({
    selector: 'dashboard-turnos',
    templateUrl: 'dashboard-turnos.html'
})

export class DashboardTurnosComponent implements OnInit {

    @HostBinding('class.plex-layout') layout = true;


    public alerta = false;
    public mostrarLista = true;
    public mostrarPacientesSearch = true;
    public showMostrarEstadisticasAgendas = true;
    public showMostrarEstadisticasPacientes = true;

    public paciente;
    public autorizado = false;
    operacionTurnos = '';
    showDarTurnos = false;
    showDashboard = true;
    showMostrarTurnosPaciente = false;
    private esOperacion = false;


    constructor(
        public servicePaciente: PacienteService,
        public servicioAgenda: AgendaService, public auth: Auth,
        private router: Router,
        private plex: Plex) { }

    ngOnInit() {
        this.autorizado = this.auth.getPermissions('turnos:darTurnos:?').length > 0;

    }

    onPacienteSelected(paciente: IPaciente): void {
        this.paciente = paciente;
        this.showMostrarEstadisticasAgendas = false;
        if (this.esOperacion) {
            this.showMostrarEstadisticasPacientes = false;
            this.esOperacion = false;
        } else {
            this.showMostrarEstadisticasPacientes = true;
            this.showMostrarTurnosPaciente = false;
        }
    }

    handleBlanqueo(event) {
        this.showMostrarEstadisticasAgendas = true;
        this.showMostrarEstadisticasPacientes = false;
    }

    verificarOperacion(operacion) {
        this.esOperacion = true;
        switch (operacion) {
            case 'darTurno':
                this.showDarTurnos = true;
                this.showDashboard = false;
                this.showMostrarTurnosPaciente = false;
                break;
            case 'anulacionTurno':
                this.showMostrarEstadisticasAgendas = false;
                this.showMostrarEstadisticasPacientes = false;
                this.operacionTurnos = 'anulacionTurno';
                this.showMostrarTurnosPaciente = true;
                break;
            case 'registrarAsistencia':
                this.showMostrarEstadisticasAgendas = false;
                this.showMostrarEstadisticasPacientes = false;
                this.operacionTurnos = 'registrarAsistencia';
                this.showMostrarTurnosPaciente = true;
                break;
        }
    }

    cancelarDarTurno() {
        this.showDarTurnos = false;
        this.showDashboard = true;
        this.showMostrarEstadisticasAgendas = true;
        this.showMostrarEstadisticasPacientes = false;
        this.showMostrarTurnosPaciente = false;
    }

}
