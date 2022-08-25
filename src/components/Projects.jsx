import Project from "./Project";
import axios from "axios";
import { useEffect, useState } from "react";
import { updateState } from "../atom";
import { useRecoilState } from "recoil";

const Projects = () => {
	const [projects, setProjects] = useState([]);
	const [loading, setLoading] = useState(false);
	const [updated, setUpdated] = useRecoilState(updateState);

	useEffect(() => {
		const getAllProjects = async () => {
			try {
				setLoading(true);
				const { data } = await axios.get(
					"http://localhost:8000/api/projects/get-all-projects"
				);

				setProjects(data.message);
				setLoading(false);
			} catch (err) {
				console.log(err);
			}
		};
		getAllProjects();
	}, [updated]);

	if (loading) return <h1>Loading...</h1>;

	return (
		<div className="container">
			<div className="row">
				{projects.map((project) => (
					<Project project={project} />
				))}
			</div>
		</div>
	);
};

export default Projects;
