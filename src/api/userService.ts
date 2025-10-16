import api from "./api";

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

export const userService = {
    async getAll(): Promise<UserDTO[]> {
        const response = await api.get<UserDTO[]>("/user");
        return response.data;
    },

    async create(user: CreateUserDTO): Promise<UserDTO> {
        const response = await api.post<UserDTO>("/user", user);
        return response.data;
    },

    async getById(id: number): Promise<UserDTO> {
        const response = await api.get<UserDTO>(`/user/${id}`);
        return response.data;
    },

    async update(id: number, updateUserDTO: UpdateUserDTO): Promise<UserDTO> {
        const response = await api.put<UserDTO>(`/user/${id}`, updateUserDTO);
        return response.data;
    },

    async delete(id: number): Promise<UserDTO> {
        const response = await api.delete<UserDTO>(`/user/${id}`);
        return response.data;
    },
};

