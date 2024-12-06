import { styled } from "@mui/material";
import { useEffect, useState } from "react";

const PaceRoot = styled("div")`
	pointer-events: none;
	user-select: none;
`;

const PaceProgress = styled("div")`
	background: #1b65f8;
	position: fixed;
	z-index: 999999;
	top: 0;
	left: 0;
	height: 2px;
	transition: width 300ms;
	box-shadow:
		0 0 10px #1b65f8,
		0 0 5px #1b65f8;
`;

const PaceProgressInner = styled("div")`
	display: block;
	position: absolute;
	right: 0;
	width: 100px;
	height: 100%;
	box-shadow:
		0 0 10px #1b65f8,
		0 0 5px #1b65f8;
	opacity: 1;
	transform: rotate(3deg) translate(0px, -4px);
`;

const PaceActivity = styled("div")`
	display: block;
	position: fixed;
	z-index: 999999;
	top: 15px;
	right: 15px;
	width: 14px;
	height: 14px;
	border: solid 2px transparent;
	border-top-color: #1b65f8;
	border-left-color: #1b65f8;
	border-radius: 10px;
	animation: pace-spinner 400ms linear infinite;

	@keyframes pace-spinner {
		0% {
			transform: rotate(0deg);
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
			transform: rotate(360deg);
		}
	}
`;

const PageLoader = () => {
	const [width, setWidth] = useState(0);

	useEffect(() => {
		let intervalPageLoader;
		let isUnmounted = false;

		intervalPageLoader = setInterval(() => {
			if (!isUnmounted) {
				setWidth((prevWidth) => (prevWidth < 95 ? prevWidth + 1 : prevWidth));
			}
		}, 100);

		return () => {
			isUnmounted = true;
			clearInterval(intervalPageLoader);
		};
	}, []);

	return (
		<PaceRoot>
			<PaceProgress style={{ width: `${width}%` }}>
				<PaceProgressInner />
			</PaceProgress>
			<PaceActivity />
		</PaceRoot>
	);
};

export default PageLoader;
