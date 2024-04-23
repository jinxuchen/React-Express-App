import reactLogo from "./assets/react.svg"
import viteLogo from "/vite.svg"
import "./css/App.css"

import User from "./user/User"
import Upload from "./upload/Upload"
import Demo from "./demo/Demo"
import Auth from "./auth/Auth"

function App() {
    return (
        <div style={{ display: "flex" }}>
            <Auth />
            <User />
            <Upload />
            <div>
                <img src={viteLogo} className='logo' alt='Vite logo' />
                <img src={reactLogo} className='logo react' alt='React logo' />
            </div>
            <Demo />
        </div>
    )
}

export default App
