
import { Link } from 'react-router-dom'
import { useAuthStore } from '../../store/auth';

const Dashboard = () => {
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  return (
    <div>
      {isLoggedIn()
        ? <div>
                <h1>Dashboard</h1>
                <Link to={`/logout`}>Logout</Link>
            </div>
        :<div>
            <h1>Home Page</h1>
            <div className='d-flex'>
            {/*<Link className='btn btn-primary' to={`/login`}>Login</Link>
            <Link className='btn btn-primary ms-4' to={`/register`}>Register</Link>
            */}
            </div>
        </div>
      
      }
    </div>
  )
}

export default Dashboard
