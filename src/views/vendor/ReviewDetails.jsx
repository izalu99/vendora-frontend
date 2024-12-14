

import {useState, useEffect} from "react"
import { useParams } from "react-router-dom"
import Sidebar from "./Sidebar"
import apiInstance from '../../utils/axios'
import GetUserData from '../plugin/GetUserData'
const ReviewDetails = () => {
    const userData = GetUserData();
    const [review, setReview] = useState({})
    const [updateReview, setUpdateReview] = useState({ reply:''})
    const param = useParams()
    console.log('param: ', param)

    const fetchReview = async () =>{
        const response =  await apiInstance.get(`/vendor-reviews/${userData?.vendor_id}/${param.review_id}`)
        console.log('review: ', response.data)
        setReview(response.data)
    }

    useEffect(() => {
        fetchReview()
    }, [])


    const handleReplyChange = (e) =>{
        //console.log(e.target.value)
        setUpdateReview({...updateReview, [e.target.name]: e.target.value})
    }

    const handleReplySubmit = async (e) =>{
        e.preventDefault()
        console.log('reply submitted')
        const formData = new FormData()
        formData.append('reply', updateReview.reply)

        await apiInstance.patch(`/vendor-reviews/${userData?.vendor_id}/${param.review_id}/`, formData).then((response) => {
            console.log('reply response: ', response.data)
            fetchReview()
            updateReview.reply = ''
        })

    }
    return (
    <div className="container-fluid" id="main">
        <div className="row row-offcanvas row-offcanvas-left h-100">
            <Sidebar />
            <div className="col-md-9 col-lg-10 main mt-4">
            <h4>
                <i className="fas fa-star" /> Review and Rating
            </h4>

            <section
                className="p-4 p-md-5 text-center text-lg-start shadow-1-strong rounded"
                style={{
                backgroundImage:
                    "url(https://mdbcdn.b-cdn.net/img/Photos/Others/background2.webp)"
                }}
            >
                <div className="row d-flex justify-content-center align-items-center">
                <div className="col-md-10">
                    <div key={review.id} className="card mt-3 mb-3">
                    <div className="card-body m-3">
                        <div className="row">
                        <div className="col-lg-4 d-flex justify-content-center align-items-center mb-4 mb-lg-0">
                            <img
                            src={review.profile?.image}
                            className="rounded-circle img-fluid shadow-1"
                            alt={review.profile?.full_name}
                            width={200}
                            height={200}
                            />
                        </div>
                        <div className="col-lg-8">
                            <p className="text-dark fw-bold mb-4">
                            Review:{" "}
                            <i>
                                {review.review}
                            </i>
                            </p>
                            <p className="fw-bold text-dark mb-2">
                            <strong>Name: {review.profile?.full_name}</strong>
                            </p>
                            <p className="fw-bold text-muted mb-0">
                            Product: {review.product?.title}
                            </p>
                            <p className="fw-bold text-muted mb-0">
                            Rating: {review.rating} { 
                            review.rating === 1 && <i className="fas fa-star" />}
                            {review.rating === 2 && <>
                                <i className="fas fa-star" />
                                <i className="fas fa-star" /></>
                            }
                            {review.rating === 3 && <>
                                <i className="fas fa-star" />
                                <i className="fas fa-star" />
                                <i className="fas fa-star" /></>
                            }
                            {review.rating === 4 && <>
                                <i className="fas fa-star" />
                                <i className="fas fa-star" />
                                <i className="fas fa-star" />
                                <i className="fas fa-star" /></>
                            }
                            {review.rating === 5 && <>
                                <i className="fas fa-star" />
                                <i className="fas fa-star" />
                                <i className="fas fa-star" />
                                <i className="fas fa-star" />
                                <i className="fas fa-star" /></>
                            }
                            </p>
                            {
                                review.reply && 
                                <div className="mt-3">
                                <p className="fw-bold text-dark mb-0">
                                    <strong>Reply: </strong>
                                </p>
                                <p className="fw-bold text-muted mb-0">
                                    {review.reply}
                                </p>
                                </div>
                            }
                            <div className="d-flex mt-3">
                            <form onSubmit={handleReplySubmit} method='POST' className='flex items-end'>
                                <textarea onChange={handleReplyChange} type="text" className='form-control min-h-10' placeholder='Write Reply' name="reply" id="" />
                                <button type='submit' className='btn btn-success ms-2 h-10'><i className='fas fa-paper-plane'></i></button>
                            </form>   
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                    
                </div>
                </div>
            </section>
            </div>
        </div>
    </div>

    )
}

export default ReviewDetails