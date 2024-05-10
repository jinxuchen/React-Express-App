import "./css/App.css"

import User from "./user/User"
import Upload from "./upload/Upload"
import Demo from "./demo/Demo"
import Auth from "./auth/Auth"
import {
    BrowserRouter as Router,
    Route,
    Link,
    Routes,
    useNavigate,
} from "react-router-dom"

function App() {
    return (
        <div style={{ display: "flex" }}>
            <Router>
                <nav>
                    <ul>
                        <li>
                            <Link to='/login'>Login</Link>
                        </li>
                        <li>
                            <Link to='/upload'>Upload</Link>
                        </li>
                        <li>
                            <Link to='/user'>User</Link>
                        </li>
                        <li>
                            <Link to='/demo'>Demo</Link>
                        </li>
                    </ul>
                </nav>
                <Routes>
                    <Route path='/*' element={<Auth />} />
                    <Route exact path='/login' element={<Auth />} />
                    <Route path='/upload' element={<Upload />} />
                    <Route path='/user' element={<User />} />
                    <Route path='/demo' element={<Demo />} />
                </Routes>
            </Router>
        </div>
    )
}

export default App
