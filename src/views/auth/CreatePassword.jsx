
import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import apiInstance from "../../utils/axios"
import { useNavigate } from "react-router-dom"
const CreatePassword = () => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [searchParam] = useSearchParams()
  const otp = searchParam.get('otp')
  const uidb64 = searchParam.get('uidb64')
  const navigate = useNavigate()

  const handlePasswordSubmit = async(e) => {
    e.preventDefault()
    console.log('Password', password);
    console.log('confirmPassword',  confirmPassword);
    if(password !== confirmPassword){
      alert('Passwords do not match')
    }
    else{
      const formData = new FormData()
      formData.append('password', password)
      formData.append('otp', otp)
      formData.append('uidb64', uidb64)
      try{
        await apiInstance.post(`user/password-change/`, formData).then((res) => {
          console.log(res.data);
          alert('Password changed successfully.')
          navigate('/login')

        })
      } catch(error){
        alert('An error occurred while trying to change password. Please try again')
        console.log(error)
      }
    }
  }

  return (
    <section>
    <main className="" style={{ marginBottom: 100, marginTop: 50 }}>
        <div className="container">
            <section className="">
                <div className="row d-flex justify-content-center">
                    <div className="col-xl-5 col-md-8">
                        <div className="card rounded-5">
                            <div className="card-body p-4">
                                <h3 className="text-center">Create New Password</h3>
                                <br />

                                <div className="tab-content">
                                    <div
                                        className="tab-pane fade show active"
                                        id="pills-login"
                                        role="tabpanel"
                                        aria-labelledby="tab-login"
                                    >
                                        <form onSubmit={handlePasswordSubmit}>
                                            {/* New Password input */}
                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="Full Name">
                                                    Enter New Password
                                                </label>
                                                <input
                                                    type="password"
                                                    id="password"
                                                    required
                                                    name="password"
                                                    className="form-control"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                />
                                            </div>

                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="Full Name">
                                                    Confirm New Password
                                                </label>
                                                <input
                                                    type="password"
                                                    id="confirmPassword"
                                                    required
                                                    name="confirmPassword"
                                                    className="form-control"
                                                    value={confirmPassword}
                                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                                />
                                                {/* {error !== null &&
                                                            <>
                                                                {error === true

                                                                    ? <p className='text-danger fw-bold mt-2'>Password Does Not Match</p>
                                                                    : <p className='text-success fw-bold mt-2'>Password Matched</p>
                                                                }
                                                            </>
                                                        } */}
                                            </div>


                                            <div className="text-center">
                                                <button type='submit' className='btn btn-primary w-100'>Reset Password</button>
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
</section>
  )
}

export default CreatePassword
