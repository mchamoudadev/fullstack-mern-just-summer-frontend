import ModalPopup from "./components/ModalPopup";
import Projects from "./components/Projects";
import { useState } from "react";
import { modalState } from "./atom";
import { useRecoilState } from "recoil";

function App() {
	const [show, setShow] = useRecoilState(modalState);
	return (
		<div className="container">
			<h1 className="text-center my-4 fs-1">Projects</h1>
			<div className="d-flex justify-content-end mx-3">
				<button className="btn btn-success" onClick={() => setShow(!show)}>
					Add New Project
				</button>
			</div>
			<Projects />
			<ModalPopup />
		</div>
	);
}

export default App;
