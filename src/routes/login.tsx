import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/lib/auth";

export const Route = createFileRoute("/login")({
	component: LoginPage,
});

function LoginPage() {
	const nav = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const mutation = useMutation({
		mutationFn: () => login(email, password),
		onSuccess: () => {
			nav({ to: "/" });
		},
	});

	return (
		<section className="auth-layout">
			{/* LEFT */}
			<div className="auth-left">
				<div className="auth-terminal">
					<p>$ initializing session...</p>
					<p>$ connecting...</p>
					{mutation.isPending && <p>$ authenticating...</p>}
					{mutation.isSuccess && (
						<p style={{ color: "var(--acc2)" }}>√ success</p>
					)}
					{mutation.isError && (
						<p style={{ color: "var(--acc5)" }}>
							× {(mutation.error as Error).message}
						</p>
					)}
				</div>
			</div>

			{/* RIGHT */}
			<div className="auth-right">
				<div className="auth-header">
					<span className="chip">login</span>
					<h2>Access your workspace</h2>
				</div>

				<form
					className="form-block"
					onSubmit={(e) => {
						e.preventDefault();
						mutation.mutate();
					}}
				>
					<div className="fg">
						<label>EMAIL</label>
						<input
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="you@domain.com"
						/>
					</div>

					<div className="fg">
						<label>PASSWORD</label>
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="••••••••"
						/>
					</div>

					<div className="auth-actions">
						<button className="btn btn-acc" disabled={mutation.isPending}>
							{mutation.isPending ? "…" : "$ sign in"}
						</button>

						<button
							type="button"
							className="btn"
							onClick={() => nav({ to: "/signup" })}
						>
							create account →
						</button>
					</div>
				</form>
			</div>
		</section>
	);
}
