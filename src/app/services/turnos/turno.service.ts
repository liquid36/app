import { AppSettings } from './../../appSettings';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Server } from '@andes/shared';

@Injectable()
export class TurnoService {
    private turnoUrl = AppSettings.API_ENDPOINT + '/modules/turnos';  // URL to web api

    constructor(private server: Server, private http: Http) { }
    save(turno: any): Observable<any> {
        if (turno.idAgenda) {
            //return this.server.put(this.turnoUrl + '/' + turno.idAgenda, turno);
            return this.server.patch(this.turnoUrl + '/agenda/' + turno.idAgenda + '/bloque/' + turno.idBloque  + '/turno/' + turno.idTurno , turno);
        }
    }
}
