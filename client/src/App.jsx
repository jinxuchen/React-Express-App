import reactLogo from "./assets/react.svg"
import viteLogo from "/vite.svg"
import "./css/App.css"

import User from "./user/User"
import Upload from "./upload/Upload"
import Demo from "./demo/Demo"

function App() {
    return (
        <>
            <User />
            <Upload />
            <div>
                <img src={viteLogo} className='logo' alt='Vite logo' />
                <img src={reactLogo} className='logo react' alt='React logo' />
            </div>
            <Demo />
        </>
    )
}

export default App
