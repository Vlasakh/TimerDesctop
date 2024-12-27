import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import { About } from "./pages/About";
import { Layout } from "./pages/Layout";
import { Work } from "./pages/Work";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route path="/work" element={<Work />} />
					<Route path="/about" element={<About />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
