import React from "react";
import { Outlet } from "react-router-dom";

import { Clock } from "../modules/clock/Clock";

export function Layout() {
	return (
		<div>
			{/*<header>*/}
			{/*	<Clock />*/}
			{/*	<nav>*/}
			{/*		<ul>*/}
			{/*			<li>*/}
			{/*				<a href="/web-app/src/pages/Work">Work</a>*/}
			{/*			</li>*/}
			{/*			<li>*/}
			{/*				<a href="/web-app/src/pages/About">About</a>*/}
			{/*			</li>*/}
			{/*		</ul>*/}
			{/*	</nav>*/}
			{/*</header>*/}
			<content>
				<Outlet />
			</content>
		</div>
	);
}
