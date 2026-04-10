export interface User {
	userId: number;
	name: string;
	lastName: string;
	email: string;
	role: "pending" | "product_owner" | "lead" | "dev" | "customer";
	createdAt: string;
	updatedAt: string;
}

export interface AuthResponse {
	user: User;
	access_token: string;
}

export interface SignupInput {
	name: string;
	lastName: string;
	email: string;
	password: string;
	role?: "pending" | "product_owner" | "lead" | "dev" | "customer";
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
