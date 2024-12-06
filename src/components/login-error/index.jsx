import { Box, Typography } from "@mui/material";
import WarningAmberIcon from "../icons/warning-amber-icon";
import ErrorIcon from "../icons/error-icon";

function LoginError({ totalLogins, locked }) {
	if (totalLogins) {
		return (
			<Box
				className="row-sb"
				sx={{
					padding: {
						md: "8px",
						xs: "8px",
					},
					borderRadius: "4px",
					border: "1px solid #DBDBDB",
					borderLeft: "4px solid #FF7000",
				}}
			>
				<Typography className="row">
					<WarningAmberIcon fontSize="20px" />
					<Typography ml="8px">
						<Typography mb="8px" variant="body1" fontSize="16px" fontWeight={600}>
							Invalid Login Credentials
						</Typography>
						<Typography variant="span" fontSize="16px" fontWeight={400}>
							You have{" "}
							<Typography mb="8px" variant="span" fontSize="16px" fontWeight={600}>
								{totalLogins}
							</Typography>{" "}
							tries left.
						</Typography>
					</Typography>
				</Typography>
			</Box>
		);
	}

	if (locked) {
		return (
			<Box
				className="row-sb"
				sx={{
					padding: {
						md: "8px",
						xs: "8px",
					},
					borderRadius: "4px",
					border: "1px solid #DBDBDB",
					borderLeft: "4px solid #DA1E28",
					display: "flex",
				}}
			>
				<Typography width="24px">
					<ErrorIcon />
				</Typography>
				<Typography ml="8px">
					<Typography mb="8px" variant="body1" fontSize="16px" fontWeight={600}>
						Account Locked
					</Typography>
					<Typography variant="body1" fontSize="16px" fontWeight={400}>
						Please contact <a href="mailto:irc@dsta.gov.sg">DLS Helpdesk</a> if you require further assistance.
					</Typography>
				</Typography>
			</Box>
		);
	}
	return;
}

export default LoginError;
