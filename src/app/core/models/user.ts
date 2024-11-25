export interface UserRequest {
    usr_email: string;
    usr_name: string;
    usr_password: string;
}

export interface UserResponse {
    usr_email: string;
    usr_id: string;
    usr_name: string;
    usr_password: string;
}

export interface LoginRequest {
    usr_email: string;
    usr_password: string;
}

export interface LoginResponse {
    token: string;
    usr_email: string;
    usr_id: 0;
    usr_name: string;
}