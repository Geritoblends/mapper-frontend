"use client";

import { useRouterState, Link } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";

export interface NavItem {
	href: string;
	icon: LucideIcon;
	label: string;
}

interface ShellLayoutProps {
	children: React.ReactNode;
	navItems: NavItem[];
	header?: React.ReactNode;
}

const base =
	"flex items-center justify-center w-9 h-9 rounded-sm transition-colors text-[#504945] hover:text-[#d4be98] hover:bg-[#282828]";
const active = "text-[#d8a657] bg-[#282828]";

export function ShellLayout({ children, navItems, header }: ShellLayoutProps) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });

	return (
		<div
			style={{ fontFamily: "'JetBrains Mono', monospace" }}
			className="fixed inset-0 flex flex-col md:flex-row"
		>
			{/* Sidebar — desktop */}
			<aside className="hidden md:flex md:w-14 flex-col items-center gap-0.5 border-r border-[#282828] bg-[#1d2021] py-3">
				{navItems.map(({ href, icon: Icon, label }) => (
					<Link key={href} to={href} title={label}>
						<span
							className={`${base} ${pathname.startsWith(href) ? active : ""}`}
						>
							<Icon size={16} />
						</span>
					</Link>
				))}
			</aside>

			{/* Main */}
			<div className="flex-1 flex flex-col min-h-0">
				{header && (
					<header className="flex items-center justify-between shrink-0 px-4 md:px-5 h-11 border-b border-[#282828] bg-[#161616]">
						{header}
					</header>
				)}
				<main className="flex-1 overflow-y-auto bg-[#161616] px-4 md:px-5 py-5">
					{children}
				</main>
			</div>

			{/* Bottom nav — mobile */}
			<nav className="md:hidden flex shrink-0 border-t border-[#282828] bg-[#1d2021]">
				{navItems.map(({ href, icon: Icon, label }) => (
					<Link
						key={href}
						to={href}
						className={`flex-1 flex flex-col items-center justify-center gap-1 py-2.5 text-[9px] tracking-wide transition-colors ${pathname.startsWith(href) ? "text-[#d8a657]" : "text-[#504945]"}`}
					>
						<Icon size={18} />
						{label}
					</Link>
				))}
			</nav>
		</div>
	);
}
