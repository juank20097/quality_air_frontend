export class User {
    id!: number | null ;
    name!: string;
    lastName!: string;
    cedula!: string;
    fechaNacimiento!: Date | null;
    correo!: string;
    password!: string;
    status!: boolean;
    showPassword?: boolean;

}
