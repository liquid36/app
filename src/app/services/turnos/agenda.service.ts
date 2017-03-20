import { AppSettings } from './../../appSettings';
import { Http } from '@angular/http';
import { IAgenda } from './../../interfaces/turnos/IAgenda';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Server } from '@andes/shared';

@Injectable()
export class AgendaService {
    private agendaUrl = AppSettings.API_ENDPOINT + '/modules/turnos/agenda';  // URL to web api

    constructor(private server: Server, private http: Http) { }

    get(params: any): Observable<IAgenda[]> {
        return this.server.get(this.agendaUrl, { params: params, showError: true });
    }

    getById(id: String): Observable<IAgenda> {
        return this.server.get(this.agendaUrl + '/' + id, null);
    }

    patch(id: String, cambios: any): Observable<IAgenda> {
        return this.server.patch(this.agendaUrl + '/' + id, cambios);
    }

    save(agenda: IAgenda): Observable<IAgenda> {
        if (agenda.id) {
            return this.server.put(this.agendaUrl + '/' + agenda.id, agenda);
        } else {
            return this.server.post(this.agendaUrl, agenda);
        }
    }
}
