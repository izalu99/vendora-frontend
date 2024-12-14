import { useState, useEffect } from "react"
import { register } from '../../utils/auth';
import { useNavigate} from 'react-router-dom';
import { useAuthStore } from '../../store/auth';
import { Link } from 'react-router-dom';

const Register = () => {
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    
    useEffect(() => {
        if(isLoggedIn()){
            navigate('/');
        }
    },[isLoading, isLoggedIn, navigate]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        const { error } = await register(
            fullName, 
            email, 
            phone, 
            password, 
            confirmPassword);
        if (error) {
            alert(JSON.stringify(error));
        } else{
            navigate('/');
        }
    }


  return (
    <main className="" style={{ marginBottom: 100, marginTop: 50 }}>
    <div className="container">
        {/* Section: Login form */}
        <section className="">
            <div className="row d-flex justify-content-center">
                <div className="col-xl-5 col-md-8">
                    <div className="card rounded-5">
                        <div className="card-body p-4">
                            <h3 className="text-center">Register Account</h3>
                            <br />

                            <div className="tab-content">
                                <div className="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="tab-login">
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-outline mb-4">
                                            <label className="form-label" htmlFor="Full Name">
                                                Full Name
                                            </label>
                                            <input
                                                type="text"
                                                id="username"
                                                placeholder="Full Name"
                                                required
                                                className="form-control"
                                                value={fullName}
                                                onChange={(e) => setFullName(e.target.value)}
                                            />
                                        </div>
                                        <div className="form-outline mb-4">
                                            <label className="form-label" htmlFor="loginName">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                placeholder="Email Address"
                                                required
                                                className="form-control"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div>

                                        <div className="form-outline mb-4">
                                            <label className="form-label" htmlFor="loginName">
                                                Phone Number
                                            </label>
                                            <input
                                                type="text"
                                                id="phone"
                                                placeholder="Mobile Number"
                                                required
                                                className="form-control"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                            />
                                        </div>
                                        <div className="form-outline mb-4">
                                            <label className="form-label" htmlFor="loginPassword">
                                                Password
                                            </label>
                                            <input
                                                type="password"
                                                id="password"
                                                placeholder="Password"
                                                className="form-control"
                                                required
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </div>
                                        {/* Password input */}
                                        <div className="form-outline mb-4">
                                            <label className="form-label" htmlFor="loginPassword">
                                                Confirm Password
                                            </label>
                                            <input
                                                type="password"
                                                id="confirm-password"
                                                placeholder="Confirm Password"
                                                required
                                                className="form-control"
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                            />
                                        </div>
                                        {/* Password Check */}
                                        { password && confirmPassword ?
                                        <p className='fw-bold text-danger'>
                                          {confirmPassword !== password ? 'Passwords do not match' : ''}
                                        </p>
                                        : ''
                                        }

                                        <button className='btn btn-primary w-100' type="submit">
                                            <span className="mr-2">Sign Up</span>
                                            <i className="fas fa-user-plus" />
                                        </button>

                                        <div className="text-center">
                                            <p className='mt-4'>
                                                Already have an account? <Link to="/login/">Login</Link>
                                            </p>
                                        </div>
                                    </form>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
    </main>
  )
}

export default Register
