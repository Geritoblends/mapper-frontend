import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { signup, login, logout, getCurrentUser } from "@/api/auth";
import type { SignupInput, LoginInput, User } from "@/types/auth";

const USER_QUERY_KEY = ["current-user"];

export function useCurrentUser() {
	return useQuery({
		queryKey: USER_QUERY_KEY,
		queryFn: getCurrentUser,
		staleTime: 5 * 60 * 1000, // 5 minutes
		retry: false,
	});
}

export function useSignup() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	return useMutation({
		mutationFn: (data: SignupInput) => signup(data),
		onSuccess: (data) => {
			queryClient.setQueryData(USER_QUERY_KEY, data.user);
			localStorage.setItem("access_token", data.access_token);
			navigate({ to: "/dashboard" });
		},
	});
}

export function useLogin() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	return useMutation({
		mutationFn: (data: LoginInput) => login(data),
		onSuccess: (data) => {
			queryClient.setQueryData(USER_QUERY_KEY, data.user);
			localStorage.setItem("access_token", data.access_token);
			navigate({ to: "/dashboard" });
		},
	});
}

export function useLogout() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	return useMutation({
		mutationFn: () => logout(),
		onSuccess: () => {
			queryClient.setQueryData(USER_QUERY_KEY, null);
			localStorage.removeItem("access_token");
			navigate({ to: "/login" });
		},
	});
}
