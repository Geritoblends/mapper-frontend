import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useLogin } from "@/hooks/useAuth";

export const Route = createFileRoute("/login")({
	component: LoginPage,
});

function LoginPage() {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const loginMutation = useLogin();

	return (
		<section className="auth-layout">
			{/* LEFT */}
			<div className="auth-left">
				<div className="auth-terminal">
					<p>$ authenticating...</p>
					{loginMutation.isPending && <p>$ verifying credentials...</p>}
					{loginMutation.isSuccess && (
						<p style={{ color: "var(--acc2)" }}>√ authenticated</p>
					)}
					{loginMutation.isError && (
						<p style={{ color: "var(--acc5)" }}>
							× {loginMutation.error.message}
						</p>
					)}
				</div>
			</div>

			{/* RIGHT */}
			<div className="auth-right">
				<div className="auth-header">
					<span className="chip">login</span>
					<h2>Welcome back</h2>
				</div>

				<form
					className="form-block"
					onSubmit={(e) => {
						e.preventDefault();
						loginMutation.mutate({ email, password });
					}}
				>
					<div className="fg">
						<label>EMAIL</label>
						<input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="you@domain.com"
							required
						/>
					</div>

					<div className="fg">
						<label>PASSWORD</label>
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="••••••••"
							required
						/>
					</div>

					<div className="auth-actions">
						<button
							type="submit"
							className="btn btn-acc"
							disabled={loginMutation.isPending}
						>
							{loginMutation.isPending ? "…" : "$ login"}
						</button>

						<button
							type="button"
							className="btn"
							onClick={() => navigate({ to: "/signup" })}
						>
							no account? →
						</button>
					</div>
				</form>
			</div>
		</section>
	);
}
