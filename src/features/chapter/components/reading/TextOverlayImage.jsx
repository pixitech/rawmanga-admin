import { useEffect, useRef } from "react";

const TextOverlayImage = ({ src, fontSize = 30, color, value, readMode }) => {
	const canvasRef = useRef(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		const context = canvas.getContext("2d");
		const image = new Image();

		image.onload = () => {
			canvas.width = image.width;
			canvas.height = image.height;
			context.drawImage(image, 0, 0);
			value.map((dialogue) => {
				let font = dialogue.height * 0.8;
				context.font = `${font}px Arial`;
				context.textAlign = "center";
				context.textBaseline = "middle";
				context.fillStyle = color;
				context.lineWidth = dialogue.width;
				context.fillText(
					dialogue.text,
					dialogue.x + dialogue.width / 2,
					dialogue.y + dialogue.height / 2,
					dialogue.width
				);
			});
		};
		image.src = src;
	}, [src, value, fontSize, color]);

	return <canvas ref={canvasRef} className="canvas-container-vertical"></canvas>;
};

export default TextOverlayImage;
