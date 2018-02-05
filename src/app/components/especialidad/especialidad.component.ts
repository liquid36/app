import { EspecialidadCreateUpdateComponent } from './especialidad-create-update.component';
import { IEspecialidad } from './../../interfaces/IEspecialidad';
import { EspecialidadService } from './../../services/especialidad.service';
import { Observable } from 'rxjs/Rx';
import { Component, OnInit, Output, Input, EventEmitter, HostBinding, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Plex } from '@andes/plex';


const limit = 25;

@Component({
    selector: 'especialidades',
    templateUrl: 'especialidad.html'
})
export class EspecialidadComponent implements OnInit {
    @HostBinding('class.plex-layout') layout = true;  // Permite el uso de flex-box en el componente
    showcreate = false;
    showupdate = false;
    datos: IEspecialidad[];
    searchForm: FormGroup;
    seleccion: IEspecialidad;
    skip = 0;
    loader = false;
    finScroll = false;
    value: any;
    tengoDatos = true;
    total = null;
    constructor(private formBuilder: FormBuilder, public plex: Plex, private especialidadService: EspecialidadService) { }

    ngOnInit() {
        // Crea el formulario reactivo
        this.searchForm = this.formBuilder.group({
            codigoSisa: [''],
            nombre: [''],
            activo: ['']
        });
        // Genera la busqueda con el evento change.
        this.searchForm.valueChanges.debounceTime(200).subscribe((value) => {
            this.value = value;
            this.skip = 0;
            this.loadDatos(false);

        });
        this.loadDatos();
    }

    loadDatos(concatenar: boolean = false) {
        let parametros = {
            'codigoSisa': this.value && this.value.codigoSisa,
            'nombre': this.value && this.value.nombre, 'skip': this.skip, 'limit': limit
        };

        this.especialidadService.get(parametros).subscribe(
            datos => {
                if (concatenar) {
                    if (datos.length > 0) {
                        this.datos = this.datos.concat(datos);
                        this.total = this.datos.length;
                    } else {

                        this.tengoDatos = false;
                    }
                } else {
                    this.datos = datos;
                    this.finScroll = false;
                }
           
                if (datos.length === 0) {
                    this.finScroll = true;
    
                   }

                if (datos.length < limit ) {
                    this.finScroll = true;
    
                   }

                this.loader = false;
            }); // Bind to view
    }

    onReturn(objEspecialidad: IEspecialidad): void {
        this.showcreate = false;
        this.showupdate = false;
        this.loadDatos();
    }

    onEdit(objEspecialidad: IEspecialidad) {
        this.showcreate = false;
        this.showupdate = true;
        this.seleccion = objEspecialidad;
    }

    activateTrue(objEspecialidad: IEspecialidad) {
        this.especialidadService.enable(objEspecialidad)
                 .subscribe(datos => this.loadDatos());  // Bind to view
    }


    activateFalse(objEspecialidad: IEspecialidad) {
        this.especialidadService.disable(objEspecialidad)
                 .subscribe(datos => this.loadDatos());  // Bind to view
    }

    nextPage() {
        if (this.tengoDatos) {
            this.skip += limit;
            this.loadDatos(true);
            this.loader = true;
        }
    }

};
