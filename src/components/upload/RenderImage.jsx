import { Box } from "@mui/material";
import CloseCircleFillIcon from "../icons/close-circle-fill-icon";
import EyeFillIcon from "../icons/eye-fill-icon";
import { useState } from "react";

export default function RenderImage(props) {
	const [loaded, setLoaded] = useState();
	const showImage = () => {
		setLoaded(true);
	};
	return (
		<div className={`upload-list-container ${props?.className}`} key={props.image.uid} style={{ position: "relative" }}>
			<span>
				<div className="upload-list-item">
					<div className="upload-list-item-info">
						<span>
							{props.image.url &&
								(props.notShowImageLoading ? (
									<a
										className="upload-list-item-thumbnail"
										href={props.image.url}
										target="_blank"
										rel="noopener noreferrer"
									>
										<img src={props.image.url} alt="" className="upload-list-item-image" />
									</a>
								) : (
									<a
										className="upload-list-item-thumbnail"
										href={props.image.url}
										target="_blank"
										rel="noopener noreferrer"
										style={{
											position: "relative",
											minWidth: "100%",
											minHeight: "100%",
											display: "flex",
											textAlign: "center",
											justifyContent: "center",
											overflow: "hidden",
											border: "none",
										}}
									>
										<Box
											sx={
												loaded
													? { display: "none" }
													: {
															position: "relative",
															minWidth: "100%",
															minHeight: "100%",
															display: "flex",
															textAlign: "center",
															justifyContent: "center",
															overflow: "hidden",
															border: "none",
														}
											}
										>
											<img
												src="/images/manga-logo.svg"
												alt="images"
												style={{
													width: "auto",
													height: "auto",
													minWidth: "100%",
													minHeight: "100%",
													maxWidth: "auto !important",
													maxHeight: "auto !important",
												}}
											/>
											<Box
												sx={{
													position: "absolute",
													minWidth: "100%",
													minHeight: "100%",
													background: "#00000080",
												}}
											></Box>
										</Box>
										<img
											src={props.image.url}
											onLoad={showImage}
											alt=""
											style={loaded ? {} : { display: "none" }}
											className={"upload-list-item-image"}
										/>
									</a>
								))}
						</span>
					</div>
					{props?.hiddenEdit ? (
						<></>
					) : (
						<span className="upload-list-item-actions">
							<span
								role="img"
								aria-label="eye"
								className="cursor-pointer row-center"
								onClick={() => props.showFileProfileItem(props.image)}
							>
								<EyeFillIcon />
							</span>
							{!props.disabled ? (
								<span
									role="img"
									aria-label="delete"
									tabIndex="-1"
									className="cursor-pointer row-center"
									onClick={() => props.removeFile(props.image.url)}
									title="Remove"
								>
									<CloseCircleFillIcon />
								</span>
							) : (
								""
							)}
						</span>
					)}
				</div>
			</span>
		</div>
	);
}
