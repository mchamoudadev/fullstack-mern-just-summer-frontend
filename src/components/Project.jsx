import axios from "axios";
import toast from "react-hot-toast";
import { GoPencil } from "react-icons/go";
import { HiOutlineTrash } from "react-icons/hi";
import { useRecoilState } from "recoil";
import { currentProjectState, modalState, updateState } from "../atom";

const Project = ({ project }) => {
	const { _id, title, description, budget, company } = project;
	const [show, setShow] = useRecoilState(modalState);
	const [currentProject, setCurrentProject] =
		useRecoilState(currentProjectState);

	const handleUpdate = (_id, title, description, budget, company) => {
		setShow(!show);
		setCurrentProject({
			_id: _id,
			title: title,
			description: description,
			budget: budget,
			company: company,
		});
	};

	const [updated, setUpdated] = useRecoilState(updateState);

	const handleDelete = async (_id) => {
		if (!confirm("Are you sure")) return;
		try {
			const { data } = await axios.delete(
				```http://localhost:8000/api/projects/delete-project/${_id}`
			);
			setUpdated(!updated);
			toast.success("deleted Successfully");
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="col-sm-4 my-2">
			<div className="card p-2 shadow-lg">
				<div className="card-title">
					<h4>{title}</h4>
				</div>

				<div className="card-body">
					<p>{description}</p>
				</div>

				<div className="card-footer">
					<div className="d-flex justify-content-between">
						<span>{company}</span>
						{/* <button className="btn bg-danger text-white">Delete</button> */}
						<div className="space-x">
							<HiOutlineTrash
								className="text-danger icon-size"
								onClick={() => handleDelete(_id)}
							/>
							<GoPencil
								className="text-success icon-size"
								onClick={() =>
									handleUpdate(_id, title, description, budget, company)
								}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default Project;
