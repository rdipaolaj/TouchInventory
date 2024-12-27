export interface CreateUserResponse {
    userId: string;
}

export interface CreateUserCommand {
    username: string;
    email: string;
    phoneNumber: string;
    password: string;
    userRole: number;
}