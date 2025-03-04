const CrossIcon = ({ color }) => {
	return (
		<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M1.33333 0.5H14.6667C15.1269 0.5 15.5 0.8731 15.5 1.33333V14.6667C15.5 15.1269 15.1269 15.5 14.6667 15.5H1.33333C0.8731 15.5 0.5 15.1269 0.5 14.6667V1.33333C0.5 0.8731 0.8731 0.5 1.33333 0.5ZM7.16667 7.16667H3.83333V8.83333H7.16667V12.1667H8.83333V8.83333H12.1667V7.16667H8.83333V3.83333H7.16667V7.16667Z"
				fill={color ?? "white"}
			/>
		</svg>
	);
};
export default CrossIcon;
