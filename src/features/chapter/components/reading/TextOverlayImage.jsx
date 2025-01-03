/* eslint-disable no-constant-condition */
import { useEffect, useRef } from "react";

const TextOverlayImage = ({ src, fontSize = 30, color, value, isCompare = false }) => {
	const canvasRef = useRef(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		const context = canvas.getContext("2d");
		const image = new Image();

		const wrapText = (ctx, text, x, y, maxWidth, boxHeight) => {
			let font = 16;
			context.font = `${font}px Arial`;
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
			let fontSize = boxHeight / lines.length;
			while (true) {
				ctx.font = `${fontSize}px Arial`;
				const testLineWidth = Math.max(...lines.map((line) => ctx.measureText(line).width));
				const totalTextHeight = fontSize * lines.length;
				if (testLineWidth <= maxWidth && totalTextHeight <= boxHeight) {
					break;
				}
				fontSize--;
			}
			const lineHeight = fontSize * 1.2;
			const totalTextHeight = lines.length * lineHeight;
			const startY = y + (boxHeight - totalTextHeight) / 2 + lineHeight / 2;
			ctx.lineWidth = 4;
			ctx.strokeStyle = "white";
			lines.forEach((line, index) => {
				const textY = startY + index * lineHeight;
				ctx.strokeText(line.trim(), x, textY);
				ctx.fillText(line.trim(), x, textY);
			});
		};

		image.onload = () => {
			canvas.width = image.width;
			canvas.height = image.height;
			context.drawImage(image, 0, 0);
			value.map((dialogue) => {
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

	return (
		<canvas
			ref={canvasRef}
			className={`${isCompare ? "compare-canvas-container-vertical" : "canvas-container-vertical"}`}
		></canvas>
	);
};

export default TextOverlayImage;
