export class User {
    id!: number | null;
    name!: string;
    lastName!: string;
    dni!: string;
    nickName!: string;
    date!: Date | null;
    email!: string;
    password!: string;
    status!: boolean;
    rol!: {
        id_rol: number;
        rol?: string;
    }
    showPassword?: boolean;
}
