import { Box, Modal, Typography } from "@mui/material";
import ButtonCancel from "../button/ButtonCancel";
import ButtonDeleteSubmit from "../button/ButtonDeleteSubmit";

const DeleteModal = ({ open, handleClose, handleSubmit, content, title }) => {
	return (
		<Modal open={open} onClose={handleClose}>
			<Box
				sx={{
					position: "absolute",
					top: "50%",
					left: "50%",
					transform: "translate(-50%, -50%)",
					borderRadius: "6px",
					width: 700,
					minHeight: "259px",
					bgcolor: "background.paper",
					boxShadow: 24,
					p: "32px 20px 20px 20px",
					textAlign: "center",
					"&:focus": {
						outline: "none",
					},
				}}
			>
				<Typography sx={{ mt: 2 }} fontSize="24px" fontWeight="700" color="#768394">
					{title ?? "Delete"}
				</Typography>
				<Typography sx={{ mt: 0.5 }} fontSize="16px" fontWeight="600" color="#768394">
					{content ?? "Bạn có chắc chắn muốn xóa người dùng này không?"}
				</Typography>
				<Box className={"row-center"} gap={"20px"} mt={4}>
					<ButtonCancel handleChange={handleClose} title="Cancel" />
					<ButtonDeleteSubmit handleChange={handleSubmit} isHiddenIcon={true} label="Submit" />
				</Box>
			</Box>
		</Modal>
	);
};
export default DeleteModal;
