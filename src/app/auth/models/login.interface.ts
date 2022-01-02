import { User } from '@auth/models';

export interface AuthResponse {
    token: string;
    token_type: string;
    user: User;
}
