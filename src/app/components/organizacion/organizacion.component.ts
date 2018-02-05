import { IOrganizacion } from './../../interfaces/IOrganizacion';
import { OrganizacionService } from './../../services/organizacion.service';
import { Component, OnInit, HostBinding } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

const limit = 25;

@Component({
    selector: 'organizaciones',
    templateUrl: 'organizacion.html'
})
export class OrganizacionComponent implements OnInit {

    @HostBinding('class.plex-layout') layout = true;  // Permite el uso de flex-box en el componente
    showcreate = false;
    datos: IOrganizacion[] = [];
    searchForm: FormGroup;
    seleccion: IOrganizacion;
    value: any;
    skip = 0;
    nombre = '';
    codigoSisa = '';
    activo: boolean = null;
    loader = false;
    tengoDatos = true;
    checked = true;
    fin = false;

    constructor(private formBuilder: FormBuilder, private organizacionService: OrganizacionService) { }

    ngOnInit() {
        this.searchForm = this.formBuilder.group({
            nombre: [''],
            codigoSisa: [''],
            activo: true
        });

        this.searchForm.valueChanges.debounceTime(200).subscribe((value) => {
            this.value = value;
            this.skip = 0;
            this.loadDatos(false);
        });
        this.loadDatos();
    }

    loadDatos(concatenar: boolean = false) {
        let parametros = {
            'activo': this.value && this.value.activo,
             'nombre': this.value && this.value.nombre,
             'codigoSisa': this.value && this.value.codigoSisa,
             'skip': this.skip, 'limit': limit
        };
        this.organizacionService.get(parametros)
            .subscribe(
            datos => {

                if (concatenar) {
                    if (datos.length > 0) {
                        this.datos = this.datos.concat(datos);
                    } else {
                        this.tengoDatos = false;
                    }
                } else {
                    this.datos = datos;
                    this.fin = false;
                }
                this.loader = false;
               if (datos.length === 0 ) {
                this.fin = true;

               }
               if (datos.length < limit ) {
                this.fin = true;

               }
            });
    }

    onReturn(objOrganizacion: IOrganizacion): void {
        this.showcreate = false;
        this.seleccion = null;
        this.loadDatos();
    }

    onDisable(objOrganizacion: IOrganizacion) {
        this.organizacionService.disable(objOrganizacion)
            .subscribe(dato => this.loadDatos()); // Bind to view
    }

    onEnable(objOrganizacion: IOrganizacion) {
        this.organizacionService.enable(objOrganizacion)
            .subscribe(dato => this.loadDatos()); // Bind to view
    }

    // activate(objOrganizacion: IOrganizacion) {
    //     if (objOrganizacion.activo) {

    //         this.organizacionService.disable(objOrganizacion)
    //             .subscribe(dato => this.loadDatos()); // Bind to view
    //     } else {
    //         this.organizacionService.enable(objOrganizacion)
    //             .subscribe(dato => this.loadDatos()); // Bind to view
    //     }
    // }

    activateTrue(objOrganizacion: IOrganizacion) {
        this.organizacionService.enable(objOrganizacion)
                 .subscribe(datos => this.loadDatos());  // Bind to view
    }


    activateFalse(objEspacioFisico: IOrganizacion) {
        this.organizacionService.disable(objEspacioFisico)
                 .subscribe(datos => this.loadDatos());  // Bind to view
    }


    onEdit(objOrganizacion: IOrganizacion) {
        this.showcreate = true;
        this.seleccion = objOrganizacion;
    }

    nextPage() {
        if (this.tengoDatos) {
            this.skip += limit;
            this.loadDatos(true);
            this.loader = true;
        }
    }
}
