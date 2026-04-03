export async function login(email: string, password: string) {
	await new Promise((r) => setTimeout(r, 800));

	if (email === "demo@demo.com" && password === "demo") {
		return { ok: true };
	}

	throw new Error("invalid credentials");
}

export async function signup(email: string, password: string) {
	await new Promise((r) => setTimeout(r, 800));

	if (email.length < 3) {
		throw new Error("email too short");
	}

	return { ok: true };
}
