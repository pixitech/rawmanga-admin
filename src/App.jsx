import "@/assets/css/style.scss";
import "./App.css";
import { AppProvider } from "./provider/app-provider";
import { AppRoutes } from "./routes";

function App() {
	return (
		<>
			<AppProvider>
				<AppRoutes />
			</AppProvider>
		</>
	);
}

export default App;
