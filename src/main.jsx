import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Amplify } from "aws-amplify";
import { Environment } from "./utils/environment.js";

Amplify.configure({
	Auth: {
		Cognito: {
			mandatorySignIn: true,
			userPoolClientId: Environment.userPoolClientId,
			userPoolId: Environment.userPoolId,
		},
	},
});

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
