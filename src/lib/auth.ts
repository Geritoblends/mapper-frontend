import { API_BASE_URL } from "./constants";

let isRefreshing = false;
let failedQueue: Array<{
	resolve: (value: unknown) => void;
	reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: Error | null, token: string | null = null) => {
	failedQueue.forEach((prom) => {
		if (error) {
			prom.reject(error);
		} else {
			prom.resolve(token);
		}
	});
	failedQueue = [];
};

export async function fetchWithAuth(
	url: string,
	options: RequestInit = {},
): Promise<Response> {
	let accessToken = localStorage.getItem("access_token");

	const makeRequest = async (token: string | null) => {
		const headers = {
			"Content-Type": "application/json",
			...options.headers,
			...(token && { Authorization: `Bearer ${token}` }),
		};

		return fetch(`${API_BASE_URL}${url}`, {
			...options,
			headers,
			credentials: "include",
		});
	};

	let response = await makeRequest(accessToken);

	if (response.status === 401 && !isRefreshing) {
		isRefreshing = true;

		try {
			const refreshResponse = await fetch(`${API_BASE_URL}/auth/refresh`, {
				method: "POST",
				credentials: "include",
			});

			if (refreshResponse.ok) {
				const { access_token } = await refreshResponse.json();
				localStorage.setItem("access_token", access_token);
				processQueue(null, access_token);
				response = await makeRequest(access_token);
			} else {
				throw new Error("Refresh failed");
			}
		} catch (error) {
			processQueue(error as Error, null);
			localStorage.removeItem("access_token");
			window.location.href = "/login";
			throw error;
		} finally {
			isRefreshing = false;
		}
	} else if (response.status === 401 && isRefreshing) {
		return new Promise((resolve, reject) => {
			failedQueue.push({ resolve, reject });
		}).then((token) => {
			return makeRequest(token as string);
		}) as Promise<Response>;
	}

	return response;
}
