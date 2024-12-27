import React from "react";
import { Outlet } from "react-router-dom";

export function Layout() {
	return (
		<div className={"app"}>
			<header>
				<h1>Home Page</h1>
				<nav>
					<ul>
						<li>
							<a href="/work">Work</a>
						</li>
						<li>
							<a href="/about">About</a>
						</li>
					</ul>
				</nav>
			</header>
			<content>
				<Outlet />
			</content>
		</div>
	);
}
