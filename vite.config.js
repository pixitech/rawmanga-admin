import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// https://vitejs.dev/config/
export default ({ mode }) => {
	// Load app-level env vars to node-level env vars.
	process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

	return defineConfig({
		resolve: {
			alias: {
				"@": path.join(__dirname, "src"),
				"@components": path.join(__dirname, "src/components"),
			},
		},
		plugins: [react()],
	});
};
