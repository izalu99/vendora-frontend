
import { useEffect } from "react"
import { logout } from "../../utils/auth"
import { Link } from 'react-router-dom'
const Logout = () => {
    
    useEffect(() => {
        logout()
    }, [])
  
    return (
    <div className=''>
      <main className="" style={{ marginBottom: 100, marginTop: 50 }}>
        <container className="row d-flex justify-content-center text-center">
          <h3>You have been logged out.</h3>
          <div className='col d-flex justify-content-center'>
            <Link to={`/login`} className='pe-3'>Login</Link>
            <Link to={`/register`}>Register</Link>
          </div>
        </container>
      </main>
    </div>
  )
}

export default Logout
