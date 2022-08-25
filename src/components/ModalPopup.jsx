import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import toast from "react-hot-toast";
import { useRecoilState, useRecoilValue } from "recoil";
import { currentProjectState, modalState, updateState } from "../atom";

function ModalPopup() {
	const [show, setShow] = useRecoilState(modalState);
	const [updated, setUpdated] = useRecoilState(updateState);

	const initialData = {
		_id: "",
		title: "",
		description: "",
		budget: 0,
		company: "",
	};

	// for changing the state
	const [projectBody, setProjectBody] = useRecoilState(currentProjectState);
	// for reading values
	const { _id, title, description, budget, company } =
		useRecoilValue(currentProjectState);

	const handleChange = (event) => {
		setProjectBody({ ...projectBody, [event.target.name]: event.target.value });
	};

	const handleClose = () => {
		setShow(!show);
		setProjectBody(initialData);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			if (_id) {
				const { data } = await axios.post(
					"http://localhost:8000/api/projects/update-project",
					projectBody
				);
			} else {
				const { data } = await axios.post(
					"http://localhost:8000/api/projects/register-project",
					projectBody
				);
			}

			toast.success("registred successfully", {
				duration: 8000,
				position: "top-center",
				style: {
					border: "1px solid #1ec072",
					padding: "16px",
					color: "#00710d",
				},
			});

			setProjectBody(initialData);
			setShow(!show);
			setUpdated(!updated);
			console.log(data);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Project Management</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form onSubmit={handleSubmit}>
						<div className="form-group my-2">
							<input
								type="text"
								className="text form-control"
								placeholder="enter project title"
								name="title"
								onChange={handleChange}
								value={title}
							/>
						</div>
						<div className="form-group my-2">
							<textarea
								className="form-control"
								placeholder="enter project description"
								name="description"
								onChange={handleChange}
								value={description}
							/>
						</div>
						<div className="form-group my-2">
							<input
								type="number"
								className="text form-control"
								placeholder="enter project budget"
								name="budget"
								value={budget}
								onChange={handleChange}
							/>
						</div>
						<div className="form-group my-2">
							<input
								type="text"
								className="text form-control"
								placeholder="enter project company"
								name="company"
								value={company}
								onChange={handleChange}
							/>
						</div>

						<div className="d-flex justify-content-end">
							<button
								type="submit"
								className={`btn ${_id ? "btn-primary" : "btn-success"}`}>
								{`${_id ? "Update Poject" : "Save Poject"}`}
							</button>
						</div>
					</form>
				</Modal.Body>
			</Modal>
		</>
	);
}

export default ModalPopup;
