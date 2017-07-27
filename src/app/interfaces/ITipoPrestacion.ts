export interface ITipoPrestacion {
    id: String;
    key: String;
    nombre: String;
    descripcion: String;
    codigo: [{
        nombre: String,
        codigo: String,
        jerarquia: String,
        origen: String
    }];
    autonoma: Boolean;
    solicitud: [ITipoPrestacion];
    ejecucion: [ITipoPrestacion];
    activo: Boolean;
    componente: {
        nombre: String,
        ruta: String
    };
    granularidad: String;
}
