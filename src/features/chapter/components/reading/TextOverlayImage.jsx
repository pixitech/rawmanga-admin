import { useEffect, useRef } from "react";

const TextOverlayImage = ({ src, fontSize = 30, color, value }) => {
	const canvasRef = useRef(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		const context = canvas.getContext("2d");
		const image = new Image();

		const wrapText = (ctx, text, x, y, maxWidth, boxHeight) => {
			const words = text.split(" ");
			let line = "";
			const lines = [];
			words.forEach((word) => {
				const testLine = line + word + " ";
				const testWidth = ctx.measureText(testLine).width;
				if (testWidth > maxWidth && line !== "") {
					lines.push(line);
					line = word + " ";
				} else {
					line = testLine;
				}
			});
			lines.push(line);
			const fontSize = (boxHeight / lines.length) * 0.9;
			ctx.font = `${fontSize > 30 ? 30 : fontSize}px Arial`;
			const lineHeight = fontSize * 1.2;
			const totalTextHeight = lines.length * lineHeight;
			const startY = y + (boxHeight - totalTextHeight) / 2 + lineHeight / 2;
			lines.forEach((line, index) => {
				ctx.fillText(line.trim(), x, startY + index * lineHeight);
			});
		};

		image.onload = () => {
			canvas.width = image.width;
			canvas.height = image.height;
			context.drawImage(image, 0, 0);
			value.map((dialogue) => {
				let font = 25;
				context.font = `${font}px Arial`;
				context.textAlign = "center";
				context.textBaseline = "middle";
				context.fillStyle = color;
				const x = dialogue.x + dialogue.width / 2;
				const y = dialogue.y;
				const boxHeight = dialogue.height;
				wrapText(context, dialogue.text, x, y, dialogue.width, boxHeight);
			});
		};

		image.src = src;
	}, [src, value, fontSize, color]);

	return <canvas ref={canvasRef} className="canvas-container-vertical"></canvas>;
};

export default TextOverlayImage;
