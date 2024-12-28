export interface LoginCommand {
    username: string;
    password: string;
}

export interface AuthUserResponse {
    username: string;
    userId: string;
    userRoleValue: number;  // 0=Admin, 1=Empleado
    jwtToken: string;
    tokenExpiry: string;
}