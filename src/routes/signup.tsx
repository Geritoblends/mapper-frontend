import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { useSignup } from "@/hooks/useAuth";
import type { SignupInput } from "@/types/auth";

export const Route = createFileRoute("/signup")({
	component: SignupPage,
});

const STRENGTH_LABELS = [
	"",
	"very weak",
	"weak",
	"medium",
	"strong",
	"very strong",
];
const STRENGTH_COLORS: Record<number, string> = {
	1: "var(--acc5)",
	2: "var(--acc)",
	3: "var(--acc2)",
	4: "var(--acc2)",
};

function getStrength(pw: string) {
	let s = 0;
	if (pw.length >= 8) s++;
	if (pw.length >= 12) s++;
	if (/[A-Z]/.test(pw)) s++;
	if (/[0-9]/.test(pw)) s++;
	if (/[^a-zA-Z0-9]/.test(pw)) s++;
	return Math.min(s, 4);
}

function PasswordHint({ met, label }: { met: boolean; label: string }) {
	return (
		<span
			style={{
				fontSize: 10,
				color: met ? "var(--acc2)" : "var(--dimmer)",
				display: "flex",
				alignItems: "center",
				gap: 3,
				transition: "color .15s",
			}}
		>
			{met ? "✓" : "○"} {label}
		</span>
	);
}

function SignupPage() {
	const [formData, setFormData] = useState<SignupInput>({
		name: "",
		lastName: "",
		email: "",
		password: "",
		role: "pending",
	});
	const [confirmPassword, setConfirmPassword] = useState("");

	const signupMutation = useSignup();

	const strength = useMemo(
		() => getStrength(formData.password),
		[formData.password],
	);
	const strengthLabel =
		formData.password.length > 0 ? STRENGTH_LABELS[strength] : "";
	const strengthColor = STRENGTH_COLORS[strength] ?? "var(--dimmer)";

	const passwordsMatch = formData.password === confirmPassword;
	const isPasswordValid =
		formData.password.length >= 8 &&
		/[A-Z]/.test(formData.password) &&
		/[0-9]/.test(formData.password) &&
		/[^a-zA-Z0-9]/.test(formData.password);

	const canSubmit =
		isPasswordValid &&
		passwordsMatch &&
		!!formData.name &&
		!!formData.lastName &&
		!!formData.email &&
		!signupMutation.isPending;

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!canSubmit) return;
		signupMutation.mutate(formData);
	};

	const updateField = <K extends keyof SignupInput>(
		field: K,
		value: SignupInput[K],
	) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	return (
		<div
			style={{ display: "flex", minHeight: "100vh", background: "var(--bg)" }}
		>
			{/* Left — hero */}
			<div
				style={{
					flex: "0 0 50%",
					display: "none",
					flexDirection: "column",
					justifyContent: "space-between",
					padding: "2.5rem 3rem",
					borderRight: "1px solid var(--border)",
					background: "var(--surface)",
				}}
				className="auth-left"
			>
				<div style={{ fontSize: 12, color: "var(--dim)" }}>
					~/app
					<span style={{ color: "var(--acc)", fontWeight: 500 }}> $ _</span>
				</div>

				<div>
					<p
						style={{
							fontSize: 11,
							color: "var(--dimmer)",
							letterSpacing: ".08em",
							marginBottom: "1.25rem",
						}}
					>
						// get started
					</p>
					<h2
						style={{
							fontSize: "clamp(28px, 3vw, 42px)",
							fontWeight: 500,
							lineHeight: 1.1,
							letterSpacing: "-.02em",
							color: "var(--fg)",
							marginBottom: "1.5rem",
						}}
					>
						Your tools,
						<br />
						<span style={{ color: "var(--acc)" }}>your colors.</span>
					</h2>
					<p
						style={{
							fontSize: 13,
							color: "var(--dim)",
							lineHeight: 1.8,
							maxWidth: 340,
						}}
					>
						A minimal workspace built for developers. Configure everything via{" "}
						<code
							style={{
								fontSize: 11,
								color: "var(--acc3)",
								background: "var(--border)",
								padding: "1px 5px",
								borderRadius: 3,
							}}
						>
							scheme.json
						</code>
						.
					</p>

					<div
						style={{
							marginTop: "3rem",
							display: "flex",
							flexDirection: "column",
							gap: 0,
						}}
					>
						{[
							{ label: "role-based access", status: "stable" },
							{ label: "scheme-driven tokens", status: "stable" },
							{ label: "shadcn compatible", status: "beta" },
						].map(({ label, status }) => (
							<div
								key={label}
								style={{
									display: "flex",
									alignItems: "center",
									justifyContent: "space-between",
									padding: "10px 0",
									borderBottom: "1px solid var(--border)",
									fontSize: 12,
								}}
							>
								<span style={{ color: "var(--dim)" }}>{label}</span>
								<span
									style={{
										fontSize: 10,
										color: status === "stable" ? "var(--acc2)" : "var(--acc)",
									}}
								>
									{status}
								</span>
							</div>
						))}
					</div>
				</div>

				<div style={{ fontSize: 11, color: "var(--dimmer)" }}>
					mapper · v0.1.0 · MIT
				</div>
			</div>

			{/* Right — form */}
			<div
				style={{
					flex: 1,
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					padding: "2rem 1.5rem",
				}}
			>
				<div style={{ width: "100%", maxWidth: 380 }}>
					<div style={{ marginBottom: "2rem" }}>
						<p
							style={{
								fontSize: 11,
								color: "var(--dimmer)",
								letterSpacing: ".06em",
								marginBottom: ".6rem",
							}}
						>
							// signup
						</p>
						<h1
							style={{
								fontSize: 20,
								fontWeight: 500,
								letterSpacing: "-.02em",
								color: "var(--fg)",
							}}
						>
							Create account
						</h1>
					</div>

					<form
						onSubmit={handleSubmit}
						style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
					>
						<div
							style={{
								display: "grid",
								gridTemplateColumns: "1fr 1fr",
								gap: ".75rem",
							}}
						>
							<div className="fg">
								<label>FIRST NAME</label>
								<input
									value={formData.name}
									onChange={(e) => updateField("name", e.target.value)}
									placeholder="John"
									required
								/>
							</div>
							<div className="fg">
								<label>LAST NAME</label>
								<input
									value={formData.lastName}
									onChange={(e) => updateField("lastName", e.target.value)}
									placeholder="Doe"
									required
								/>
							</div>
						</div>

						<div className="fg">
							<label>EMAIL</label>
							<input
								type="email"
								value={formData.email}
								onChange={(e) => updateField("email", e.target.value)}
								placeholder="you@domain.com"
								required
							/>
						</div>

						<div className="fg">
							<label>PASSWORD</label>
							<input
								type="password"
								value={formData.password}
								onChange={(e) => updateField("password", e.target.value)}
								placeholder="••••••••"
								required
							/>

							{formData.password.length > 0 && (
								<>
									<div
										style={{
											display: "flex",
											alignItems: "center",
											gap: 8,
											marginTop: 6,
										}}
									>
										<div style={{ display: "flex", gap: 3 }}>
											{[0, 1, 2, 3].map((i) => (
												<div
													key={i}
													style={{
														width: 32,
														height: 2,
														borderRadius: 1,
														background:
															i < strength ? strengthColor : "var(--border)",
														transition: "background .2s",
													}}
												/>
											))}
										</div>
										<span style={{ fontSize: 10, color: "var(--dim)" }}>
											{strengthLabel}
										</span>
									</div>

									<div
										style={{
											display: "flex",
											gap: 10,
											flexWrap: "wrap",
											marginTop: 5,
										}}
									>
										<PasswordHint
											met={formData.password.length >= 8}
											label="8+ chars"
										/>
										<PasswordHint
											met={/[A-Z]/.test(formData.password)}
											label="uppercase"
										/>
										<PasswordHint
											met={/[0-9]/.test(formData.password)}
											label="number"
										/>
										<PasswordHint
											met={/[^a-zA-Z0-9]/.test(formData.password)}
											label="symbol"
										/>
									</div>
								</>
							)}
						</div>

						<div className="fg">
							<label>CONFIRM PASSWORD</label>
							<input
								type="password"
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
								placeholder="••••••••"
								required
							/>
							{confirmPassword && !passwordsMatch && (
								<span
									style={{ fontSize: 10, color: "var(--acc5)", marginTop: 1 }}
								>
									✗ passwords do not match
								</span>
							)}
							{confirmPassword && passwordsMatch && formData.password && (
								<span
									style={{ fontSize: 10, color: "var(--acc2)", marginTop: 1 }}
								>
									✓ passwords match
								</span>
							)}
						</div>

						<div className="fg">
							<label>ROLE</label>
							<select
								value={formData.role}
								onChange={(e) =>
									updateField("role", e.target.value as SignupInput["role"])
								}
							>
								<option value="pending">Pending (default)</option>
								<option value="lead">Lead</option>
								<option value="dev">Developer</option>
								<option value="customer">Customer</option>
							</select>
						</div>

						{(signupMutation.isPending ||
							signupMutation.isSuccess ||
							signupMutation.isError) && (
							<div
								style={{
									fontSize: 11,
									display: "flex",
									alignItems: "center",
									gap: 8,
									borderTop: "1px solid var(--border)",
									paddingTop: ".75rem",
									color: signupMutation.isError
										? "var(--acc5)"
										: signupMutation.isSuccess
											? "var(--acc2)"
											: "var(--dim)",
								}}
							>
								<span style={{ color: "var(--dimmer)" }}>$</span>
								{signupMutation.isPending && "creating user..."}
								{signupMutation.isSuccess && "✓ account created"}
								{signupMutation.isError && `✗ ${signupMutation.error.message}`}
							</div>
						)}

						<div
							style={{
								display: "flex",
								alignItems: "center",
								justifyContent: "space-between",
								paddingTop: ".25rem",
							}}
						>
							<button
								className="btn btn-acc"
								type="submit"
								disabled={!canSubmit}
							>
								{signupMutation.isPending ? "…" : "$ create"}
							</button>
							<button
								type="button"
								className="btn"
								onClick={() => (window.location.href = "/login")}
								style={{
									border: "none",
									color: "var(--dim)",
									padding: "7px 0",
								}}
							>
								already have one →
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
