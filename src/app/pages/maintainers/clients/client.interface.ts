export interface Client {
    cliente_id: number;
    identificacion: string;
    vehiculos: Vehiculo[];
    nombres?: string;
    apellidos?: string;
    razon_social?: string;
    direccion?: string;
    correo?: string;
    celular?: string;
}

export interface Vehiculo {
    id: number;
    idCliente: number;
    idTipoVehiculo: number;
    tipo_vehiculo?: string;
    placa: string;
    created_at: string;
    updated_at: string;
}

export interface TipoVehiculo {
    id:         number;
    detalle:    string;
    valor:      string;
    activo:     number;
    created_at: string;
    updated_at: string;
}
