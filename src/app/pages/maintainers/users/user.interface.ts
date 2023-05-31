export interface IUser {
    id:             number;
    username:       string;
    email:          string;
    persona_id:     number;
    identificacion: string;
    apellidos:      string;
    nombres:        string;
    celular?:       string | null;
    direccion?:     string | null;
    correo?:        string | null;
    role_id:        number;
    name_role:      string;
}
