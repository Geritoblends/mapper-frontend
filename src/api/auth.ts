import { API_BASE_URL } from "@/lib/constants";
import type { AuthResponse, SignupInput, LoginInput } from "@/types/auth";

export async function signup(data: SignupInput): Promise<AuthResponse> {
	const response = await fetch(`${API_BASE_URL}/auth/signup`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
		credentials: "include", // Important for receiving cookies
	});

	const responseData = await response.json();

	if (!response.ok) {
		if (response.status === 409) {
			throw new Error("An account with this email address already exists.");
		}
		if (response.status === 400 && responseData.errors) {
			throw new Error(responseData.errors[0]?.message || "Validation failed");
		}
		throw new Error(responseData.message || "Signup failed");
	}

	return responseData;
}

export async function login(data: LoginInput): Promise<AuthResponse> {
	const response = await fetch(`${API_BASE_URL}/auth/login`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
		credentials: "include",
	});

	const responseData = await response.json();

	if (!response.ok) {
		if (response.status === 401) {
			throw new Error("Invalid email or password.");
		}
		if (response.status === 400 && responseData.errors) {
			throw new Error(responseData.errors[0]?.message || "Validation failed");
		}
		throw new Error(responseData.message || "Login failed");
	}

	return responseData;
}

export async function logout(): Promise<void> {
	await fetch(`${API_BASE_URL}/auth/logout`, {
		method: "POST",
		credentials: "include",
	});
}

export async function refreshToken(): Promise<{ access_token: string }> {
	const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
		method: "POST",
		credentials: "include",
	});

	const data = await response.json();

	if (!response.ok) {
		throw new Error("Failed to refresh token");
	}

	return data;
}

export async function getCurrentUser(): Promise<User | null> {
	const response = await fetch(`${API_BASE_URL}/auth/me`, {
		credentials: "include",
	});

	if (!response.ok) {
		if (response.status === 401) {
			return null;
		}
		throw new Error("Failed to fetch user");
	}

	const data = await response.json();
	return data.user;
}
