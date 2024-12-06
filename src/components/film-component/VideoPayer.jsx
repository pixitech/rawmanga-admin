/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import PrevIcon from "../icons/prev-icon";
import PauseIcon from "../icons/pause-icon";
import PlayIcon from "../icons/play-icon";
import NextIcon from "../icons/next-icon";
import SmallScreenIcon from "../icons/small-screen-icon";
import MaxVolumeIcon from "../icons/max-volume-icon";
import MidVolumeIcon from "../icons/mid-volume-icon";
import MuteVolume from "../icons/mute-volume-icon";
import MinVolumneIcon from "../icons/min-volume-icon";
import SettingIcon from "../icons/setting-icon";
import FullScreenIcon from "../icons/full-screen-icon";

const VideoPlayer = ({ src }) => {
	const [isWaiting, setIsWaiting] = useState(true);
	const [isPlaying, setIsPlaying] = useState(true);
	const [playbackRate, setPlaybackRate] = useState(1);
	const [durationSec, setDurationSec] = useState(0);
	const [elapsedSec, setElapsedSec] = useState(0);
	const [volume, setVolume] = useState("100");
	const [mute, setMute] = useState(true);
	const [openSetting, setOpenSetting] = useState(false);
	const [fullScreen, setFullScreen] = useState(false);
	const [showControl, setShowControl] = useState(false);

	const videoRef = useRef(null);
	const progressRef = useRef(null);
	const bufferRef = useRef(null);
	const videoContainerRef = useRef(null);
	const hideControlTimeout = useRef(null);
	const playButtonRef = useRef(null);
	const smallPlayButtonRef = useRef(null);

	const onWaiting = () => {
		if (isPlaying) setIsPlaying(false);
		setIsWaiting(true);
	};

	const onPlay = () => {
		if (isWaiting) setIsWaiting(false);
		setIsPlaying(true);
	};

	const onPause = () => {
		setIsPlaying(false);
		setIsWaiting(false);
	};

	const onProgress = () => {
		if (!videoRef.current) return;
		const element = videoRef.current;
		if (!element.buffered || !bufferRef.current) return;
		if (!element.buffered.length) return;
		const bufferedEnd = element.buffered.end(element.buffered.length - 1);
		const duration = element.duration;
		if (bufferRef && duration > 0) {
			bufferRef.current.style.width = (bufferedEnd / duration) * 100 + "%";
		}
	};

	const onTimeUpdate = () => {
		if (!videoRef.current) return;
		const element = videoRef.current;
		setIsWaiting(false);
		if (!element.buffered || !progressRef.current) return;
		const duration = element.duration;
		setDurationSec(duration);
		setElapsedSec(element.currentTime);
		if (progressRef && duration > 0) {
			progressRef.current.style.width = (element.currentTime / duration) * 100 + "%";
		}
	};
	const handleMouseMove = () => {
		setShowControl(true);
		if (hideControlTimeout.current) {
			clearTimeout(hideControlTimeout.current);
		}
		if (!isWaiting) {
			hideControlTimeout.current = setTimeout(() => {
				setShowControl(false);
			}, 3000);
		}
	};

	const handlePlayPauseClick = () => {
		if (videoRef.current) {
			if (isPlaying) {
				videoRef.current.pause();
			} else {
				videoRef.current.play();
			}
		}
	};

	const seekToPosition = (pos) => {
		if (!videoRef.current) return;
		if (pos < 0 || pos > 1) return;
		const durationMs = videoRef.current.duration * 1000 || 0;
		const newElapsedMs = durationMs * pos;
		const newTimeSec = newElapsedMs / 1000;
		videoRef.current.currentTime = newTimeSec;
	};
	const handlePrev = () => {
		if (!videoRef.current) return;
		videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 10);
	};
	const handleNext = () => {
		if (!videoRef.current) return;
		videoRef.current.currentTime = Math.min(videoRef.current.duration, videoRef.current.currentTime + 10);
	};
	const handleChangeVolumne = (e) => {
		if (!videoRef.current) return;
		setVolume(e.target.value);
		videoRef.current.volume = Number(e.target.value) / 100;
		if (videoRef.current.volume === 0) {
			setMute(true);
			videoRef.current.muted = true;
		} else {
			setMute(false);
			videoRef.current.muted = false;
		}
	};
	const handleMuteVolume = () => {
		if (!videoRef.current) return;
		if (mute) {
			if (Number(volume) > 0) {
				videoRef.current.volume = Number(volume) / 100;
			} else {
				videoRef.current.volume = 0.5;
				setVolume("50");
			}
			videoRef.current.muted = false;
		} else {
			videoRef.current.volume = 0;
			videoRef.current.muted = true;
		}
		setMute(!mute);
	};

	const handleFullScreen = () => {
		if (!videoContainerRef.current) return;
		const element = videoContainerRef.current;
		const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
		if (isMobile) {
			if (videoRef.current && videoRef.current.requestFullscreen) {
				videoRef.current.requestFullscreen();
			} else if (videoRef.current && videoRef.current.webkitEnterFullscreen) {
				videoRef.current.webkitEnterFullscreen();
			}
			return;
		}
		if (!document.fullscreenElement) {
			if (element.requestFullscreen) {
				element.requestFullscreen().catch((err) => {
					console.error(`Failed to enter fullscreen: ${err.message}`);
				});
				setFullScreen(true);
			} else if (element.webkitRequestFullscreen) {
				element.webkitRequestFullscreen(); // Safari
				setFullScreen(true);
			} else if (element.mozRequestFullScreen) {
				element.mozRequestFullScreen(); // Firefox
				setFullScreen(true);
			} else if (element.msRequestFullscreen) {
				element.msRequestFullscreen(); // IE/Edge
				setFullScreen(true);
			}
		} else {
			if (document.exitFullscreen) {
				document.exitFullscreen().catch((err) => {
					console.error(`Failed to exit fullscreen: ${err.message}`);
				});
			}
			setFullScreen(false);
		}
	};
	useEffect(() => {
		if (!videoRef.current) return;
		const element = videoRef.current;
		element.addEventListener("progress", onProgress);
		element.addEventListener("timeupdate", onTimeUpdate);
		element.addEventListener("waiting", onWaiting);
		element.addEventListener("play", onPlay);
		element.addEventListener("playing", onPlay);
		element.addEventListener("pause", onPause);
		return () => {
			element.removeEventListener("waiting", onWaiting);
			element.removeEventListener("play", onPlay);
			element.removeEventListener("playing", onPlay);
			element.removeEventListener("pause", onPause);
			element.removeEventListener("progress", onProgress);
			element.removeEventListener("timeupdate", onTimeUpdate);
		};
	}, [videoRef.current]);
	useEffect(() => {
		const container = videoContainerRef.current;
		if (!container) return;
		container.addEventListener("mousemove", handleMouseMove);
		return () => {
			container.removeEventListener("mousemove", handleMouseMove);
			if (hideControlTimeout.current) {
				clearTimeout(hideControlTimeout.current);
			}
		};
	}, []);
	useEffect(() => {
		if (!videoRef.current) return;
		if (videoRef.current.playbackRate === playbackRate) return;
		videoRef.current.playbackRate = playbackRate;
	}, [playbackRate]);
	useEffect(() => {
		const playVideo = () => {
			if (videoRef.current) {
				videoRef.current.play().catch((err) => {
					console.error("Autoplay blocked:", err);
				});
			}
		};
		const playButton = playButtonRef.current;
		const smallPlayButton = smallPlayButtonRef.current;
		if (playButton) {
			playButton.addEventListener("touchstart", playVideo);
		}
		if (smallPlayButton) {
			smallPlayButton.addEventListener("touchstart", playVideo);
		}
		return () => {
			if (playButton) {
				playButton.removeEventListener("touchstart", playVideo);
			}
			if (smallPlayButton) {
				smallPlayButton.removeEventListener("touchstart", playVideo);
			}
		};
	}, []);
	useEffect(() => {
		if (!videoRef.current) return;
		if (videoRef.current.muted) {
			setMute(true);
		} else {
			setMute(false);
		}
	}, [videoRef.current?.muted]);
	return (
		<div style={{ width: "860px", aspectRatio: "16/9" }}>
			<div className="video-container" ref={videoContainerRef}>
				<video className="video-player" ref={videoRef} autoPlay muted poster="/images/anisage-banner.jpg" src={src} />
				{showControl || !isPlaying || isWaiting ? (
					<div className="control-options">
						<div className="action-button">
							{isWaiting ? (
								<span className="loader"></span>
							) : (
								<>
									<div className="cursor-pointer" onClick={handlePrev}>
										<PrevIcon width="50px" height="50px" />
									</div>
									<div className="cursor-pointer" onClick={handlePlayPauseClick}>
										{isPlaying ? <PauseIcon width="70px" height="70px" /> : <PlayIcon width="70px" height="70px" />}
									</div>
									<div className="cursor-pointer" onClick={handleNext}>
										<NextIcon width="50px" height="50px" />
									</div>
								</>
							)}
						</div>
						<div className="action-bottom">
							<div
								style={{
									display: "flex",
									flexDirection: "row",
									width: "100%",
									minHeight: "4px",
									borderRadius: "8px",
									cursor: "pointer",
									background: "rgba(193, 193, 193, 0.5)",
									overflow: "hidden",
									transition: "height 0.2s linear",
									"&.hover": {
										transform: "scale(1, 1.5)",
									},
								}}
								onClick={(e) => {
									const { left, width } = e.currentTarget.getBoundingClientRect();
									const clickedPos = (e.clientX - left) / width;
									seekToPosition(clickedPos);
								}}
							>
								<div
									style={{
										display: "flex",
										flexDirection: "row",
										width: "100%",
										height: "100%",
										position: "relative",
									}}
								>
									<div style={{ height: "100%", background: "#f50", zIndex: "1" }} ref={progressRef}></div>
									<div style={{ height: "100%", background: "#FDFFFC", position: "absolute" }} ref={bufferRef}></div>
								</div>
							</div>
							<div className="button-bottom">
								<div className="button-bottom-left">
									<div
										onClick={handlePlayPauseClick}
										style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
									>
										{isPlaying ? <PauseIcon width="20px" height="20px" /> : <PlayIcon width="20px" height="20px" />}
									</div>
									<div className="button-volume">
										<div
											style={{ cursor: "pointer", justifyContent: "start", display: "flex", alignItems: "center" }}
											onClick={handleMuteVolume}
										>
											{Number(volume) >= 75 ? <MaxVolumeIcon width="20px" height="20px" /> : null}
											{Number(volume) >= 25 && Number(volume) < 75 ? (
												<MidVolumeIcon width="20px" height="20px" />
											) : null}
											{Number(volume) > 0 && Number(volume) < 25 ? <MinVolumneIcon width="20px" height="20px" /> : null}
											{Number(volume) === 0 ? <MuteVolume width="20px" height="20px" /> : null}
										</div>
										<input
											style={{ cursor: "pointer", height: "3px" }}
											id="typeinp"
											type="range"
											min="0"
											max="100"
											value={volume}
											onChange={(e) => handleChangeVolumne(e)}
											step="1"
										/>
									</div>
									<div style={{ display: "flex", flexDirection: "row", color: "white", alignItems: "center" }}>
										<p>{`${Math.floor(elapsedSec / 60)}:${Math.floor(elapsedSec % 60)}`}</p>/
										<p>{`${Math.floor(durationSec / 60)}:${Math.floor(durationSec % 60)}`}</p>
									</div>
								</div>
								<div className="button-bottom-right">
									<div style={{ position: "relative" }}>
										<div
											style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
											onClick={() => setOpenSetting(!openSetting)}
										>
											<SettingIcon width="20px" height="20px" />
										</div>
										{openSetting ? (
											<div style={{ position: "absolute", bottom: "24px", right: 0 }}>
												<div
													style={{
														background: "black",
														padding: "6px",
														width: "fit-content",
														display: "flex",
														flexDirection: "column",
														borderRadius: "6px",
														gap: "6px",
														alignItems: "center",
													}}
												>
													<div
														style={{
															color: playbackRate === 2 ? "#f9ab00" : "#ffffff",
															cursor: "pointer",
														}}
														onClick={() => setPlaybackRate(2)}
													>
														x2
													</div>
													<div
														style={{
															color: playbackRate === 1.5 ? "#f9ab00" : "#ffffff",
															cursor: "pointer",
														}}
														onClick={() => setPlaybackRate(1.5)}
													>
														x1.5
													</div>
													<div
														style={{
															color: playbackRate === 1 ? "#f9ab00" : "#ffffff",
															cursor: "pointer",
														}}
														onClick={() => setPlaybackRate(1)}
													>
														Normal
													</div>
													<div
														style={{
															color: playbackRate === 0.75 ? "#f9ab00" : "#ffffff",
															cursor: "pointer",
														}}
														onClick={() => setPlaybackRate(0.75)}
													>
														x0.75
													</div>
													<div
														style={{
															color: playbackRate === 0.5 ? "#f9ab00" : "#ffffff",
															cursor: "pointer",
														}}
														onClick={() => setPlaybackRate(0.5)}
													>
														x0.5
													</div>
												</div>
											</div>
										) : null}
									</div>
									<div onClick={handleFullScreen} style={{ cursor: "pointer", display: "flex", alignItems: "center" }}>
										{fullScreen ? (
											<SmallScreenIcon width="20px" height="20px" />
										) : (
											<FullScreenIcon width="20px" height="20px" />
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
				) : null}
			</div>
		</div>
	);
};

export default VideoPlayer;
