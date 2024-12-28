import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import { Clock } from "./modules/clock/Clock";
import { About } from "./pages/About";
import { Layout } from "./pages/Layout";
import { Work } from "./pages/Work";

export function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route path="/" element={<Clock />} />
					<Route path="/work" element={<Work />} />
					<Route path="/about" element={<About />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}
