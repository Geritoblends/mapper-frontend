export interface User {
	userId: number;
	email: string;
	name: string;
	createdAt: string;
	updatedAt: string;
}

export interface AuthResponse {
	user: User;
	access_token: string;
}

export interface SignupInput {
	email: string;
	password: string;
	name: string;
}

export interface LoginInput {
	email: string;
	password: string;
}

export interface ApiError {
	message: string;
	errors?: {
		field: string;
		message: string;
	}[];
}
