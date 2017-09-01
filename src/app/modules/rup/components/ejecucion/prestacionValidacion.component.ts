import { Component, OnInit, Output, Input, EventEmitter, AfterViewInit, HostBinding, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Auth } from '@andes/auth';
import { Plex } from '@andes/plex';
import { PacienteService } from './../../../../services/paciente.service';
import { ElementosRUPService } from './../../services/elementosRUP.service';
import { PrestacionesService } from './../../services/prestaciones.service';

@Component({
    selector: 'rup-prestacionValidacion',
    templateUrl: 'prestacionValidacion.html',
    styleUrls: ['prestacionValidacion.scss'],
    // Use to disable CSS Encapsulation for this component
    encapsulation: ViewEncapsulation.None
})
export class PrestacionValidacionComponent implements OnInit {
    @HostBinding('class.plex-layout') layout = true;
    @Output() evtData: EventEmitter<any> = new EventEmitter<any>();
    // prestacion actual en ejecucion
    public prestacion: any;
    public paciente;
    // array de elementos RUP que se pueden ejecutar
    public elementosRUP: any[];
    // elementoRUP de la prestacion actual
    public elementoRUPprestacion: any;
    /**
     * Indica si muestra el calendario para dar turno autocitado
     */
    public showDarTurnos = false;
    solicitudTurno;

    constructor(private servicioPrestacion: PrestacionesService,
        public elementosRUPService: ElementosRUPService,
        private servicioPaciente: PacienteService,
        public plex: Plex, public auth: Auth, private router: Router, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            let id = params['id'];
            this.inicializar(id);
        });
    }

    inicializar(id) {
        // Mediante el id de la prestación que viene en los parámetros recuperamos el objeto prestación
        this.servicioPrestacion.getById(id).subscribe(prestacion => {
            this.prestacion = prestacion;

            // Carga la información completa del paciente
            // [jgabriel] ¿Hace falta esto?
            this.servicioPaciente.getById(prestacion.paciente.id).subscribe(paciente => {
                this.paciente = paciente;
            });

            // Busca el elementoRUP que implementa esta prestación
            this.elementoRUPprestacion = this.elementosRUPService.buscarElemento(prestacion.solicitud.tipoPrestacion, false);
        });
    }

    /**
     * Confirmamos validacion y guardamos
     * @memberof PrestacionValidacionComponent
     */
    validar() {
        this.plex.confirm('Luego de validar la prestación no podrá editarse.<br />¿Desea continuar?', 'Confirmar validación').then(validar => {
            if (!validar) {
                return false;
            } else {
                // // de los registros a
                // let planes = this.registros.filter(r => r.tipo === 'planes');

                // this.servicioPrestacion.validarPrestacion(this.prestacion, planes).subscribe(prestacion => {
                //     this.prestacion = prestacion;
                // }, (err) => {
                //     this.plex.toast('danger', 'ERROR: No es posible validar la prestación');
                // });
            }
        });
    }

    romperValidacion() {
        this.plex.confirm('Esta acción puede traer consecuencias 💀 ☠️💀 ☠️<br />¿Desea continuar?', 'Romper validación').then(validar => {
            if (!validar) {
                return false;
            } else {

                // hacemos el patch y luego creamos los planes
                let cambioEstado: any = {
                    op: 'romperValidacion',
                    estado: { tipo: 'ejecucion' }
                };

                // Vamos a cambiar el estado de la prestación a ejecucion
                this.servicioPrestacion.patch(this.prestacion.id, cambioEstado).subscribe(prestacion => {
                    this.prestacion = prestacion;

                    this.router.navigate(['rup/ejecucion', this.prestacion.id]);
                }, (err) => {
                    this.plex.toast('danger', 'ERROR: No es posible romper la validación de la prestación');
                });
            }

        });
    }

    turnoDado(e) {
        // recargamos
        this.inicializar(this.prestacion.id);
    }

    tienePermisos(tipoPrestacion) {
        let permisos = this.auth.getPermissions('rup:tipoPrestacion:?');
        let existe = permisos.find(permiso => (permiso === tipoPrestacion._id));

        return existe;
    }

    volver() {
        this.router.navigate(['rup/ejecucion/', this.prestacion.id]);
    }

    volverInicio() {
        this.router.navigate(['rup']);
    }

    darTurnoAutocitado(prestacionSolicitud) {
        this.solicitudTurno = prestacionSolicitud;
        this.showDarTurnos = true;
        // DEBERÍA VENIR POR PARÁMETRO --- VER LINEA 148
        // this.solicitudTurno = null;
    }

}

