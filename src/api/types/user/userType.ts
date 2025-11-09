export interface UpdateUserDTO {
    username: string;
    password: string;
}

export interface CreateUserDTO extends UpdateUserDTO {
    emailAddress: string;
}

export interface UserDTO  {
    id: number;
    role: string;
    calendars: any[];
    emailAddress: string;
    username: string;

}