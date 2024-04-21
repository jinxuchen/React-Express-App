import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import dotenv from "dotenv"

// Load environment variables
dotenv.config()

console.log("VITE_SERVER_URL_HEROKU:", process.env.VITE_SERVER_URL_HEROKU)

export default defineConfig(({ mode }) => {
    return {
        plugins: [react()],
        define: {
            "process.env": {
                BASE_URL:
                    mode === "production"
                        ? process.env.VITE_SERVER_URL_HEROKU
                        : process.env.VITE_SERVER_URL_LOCAL,
            },
        },
    }
})
