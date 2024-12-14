import {useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'

import apiInstance from '../../utils/axios'
import GetCurrentAddress from '../plugin/GetCurrentAddress'
import GetUserData from '../plugin/GetUserData'
import GetCartId from '../plugin/GetCartId'
import { CartContext } from '../plugin/Context';

import Swal from 'sweetalert2'


const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 1400,
    timerProgressBar: false,
})

const ProductDetail = () => {
    const [cartCount, setCartCount] = useContext(CartContext)
    const [product, setProduct] = useState([])
    const [specifications, setSpecifications] = useState([])
    const [sizes, setSizes] = useState([])
    const [gallery, setGallery] = useState([])
    const [colors, setColors] = useState([])
    const [sizeValue, setSizeValue] = useState('No Size Selected')
    const [colorValue, setColorValue] = useState('No Color Selected')
    const [qtyValue, setQtyValue] = useState(1)
    
    const [reviews, setReviews] = useState([])
    const [createReview, setCreateReview] = useState({
        user_id: 0,
        product_id: product?.id,
        review: '',
        rating:0
    })

    const param  = useParams().slug
    //console.log('param: ', param)

    const currentAddress = GetCurrentAddress();
    const userData = GetUserData();
    const cart_id = GetCartId();
    
    

    useEffect(() => {
        apiInstance.get(`products/${param}`)
        .then((res) => {
            let response;
            try{
                response = res.data
                //console.log(response)
                setProduct(response)
            } catch (error){
                console.log("Error: ", error)
            }

            if(product){
                
                setSpecifications(response.specification)
                setSizes(response.size)
                setGallery(response.gallery)
                setColors(response.color)
                //console.log('product: ', product)
                //console.log('specification: ', specifications)
                //console.log('gallery: ', gallery)
            }
        })
    },[param])

    
    const handleChooseColor = (event, colorName) => {
        event.preventDefault()
        setColorValue(colorName)
    }

    const handleChooseSize = (event, sizeName) => {
        event.preventDefault()
        setSizeValue(sizeName)
    }

    const handleQtyInput = (event, value) => {
        event.preventDefault()
        if (value <= product.stock_qty){
            setQtyValue(value)
        }else{
            setQtyValue(product.stock_qty)
            alert(`Only ${product.stock_qty} items available in stock`)
        }
    }

    const handleAddToCart = async (event) =>{
        event.preventDefault()
        ////console.log('product id: ', product.pid)
        //console.log('title: ', product.title)
        //console.log('size: ', sizeValue)
        
        //console.log('color: ', colorValue)
        //console.log('country: ', currentAddress.country)
        //console.log('qty: ', qtyValue)
        //console.log('price: ', product.price)
        //console.log('shipping amount: ', product.shipping_amount)
        //console.log('user data: ', userData?.user_id)
        //console.log('cart id: ', cart_id)

        try{
            const formdata = new FormData()
            formdata.append('product_id', product?.id)
            formdata.append('user_id', userData?.user_id)
            formdata.append('qty', qtyValue)
            formdata.append('price', product.price)
            formdata.append('shipping_amount', product.shipping_amount)
            formdata.append('country', currentAddress.country)
            formdata.append('size', sizeValue)
            formdata.append('color', colorValue)
            formdata.append('cart_id', cart_id)

            const response = await apiInstance.post('cart-view/', formdata)
            
            const url = userData ? `/cart-list/${cart_id}/${userData?.user_id}` : `/cart-list/${cart_id}/`
            apiInstance.get(url).then((res) => {
                setCartCount(res.data.length)
                console.log(cartCount)
            })


            Toast.fire({
                icon: 'success',
                title: response.data.message
            })
        } catch (error){
            console.log('Error: ', error)
        }
    }


    const fetchReviewData = () =>{
        if(product && product.id){
            try{
                apiInstance.get(`reviews/${product?.id}/`).then((res) => {
                    console.log('Review Data: ', res.data)
                    setReviews(res.data)
                })
            } catch (error){
                console.log('Error fetching Review Data: ', error)
            }
        }
    }

    useEffect(() => {
        if(product && product.id){
            fetchReviewData()
        }
    }, [product])


    const handleReviewChange = (event) =>{
        setCreateReview({
            ...createReview,
            [event.target.name]: event.target.value
        })
        
    }

    const handleReviewSubmit = (event) =>{
        event.preventDefault()

        if(userData?.user_id !== null  && userData?.user_id !== undefined){
            const formData = new FormData()
            formData.append('user_id', userData?.user_id)
            formData.append('product_id', product?.id)
            formData.append('review', createReview?.review)
            formData.append('rating', createReview?.rating)


            apiInstance.post(`reviews/${product?.id}/`, formData).then((res) => {
                console.log('Review Response: ', res.data)
                Toast.fire({
                    icon: 'success',
                    title: res.data.message
                })
                fetchReviewData()
            }).catch((error) => {
                console.log('Error submitting review: ', error)
            })
        } else{
            Toast.fire({
                icon: 'error',
                title: 'Please login to submit review'
        })
        }
    }

    const handleAddToWishlist = async (event, productId, userId) => {
        event.preventDefault();
        console.log('Add to wishlist: ', productId);
        console.log('User ID: ', userId);

        const formData = new FormData();
        formData.append("product_id", productId);
        formData.append("user_id", userId);

        try{
            const response = await apiInstance.post(`customer/wishlist/${userId}/`, formData);
            console.log('response: ', response.data);
            Toast.fire({
                icon: 'success',
                title: response.data.message
            })
        } catch(error){
            console.log('Error: ', error)
        }
    }


  return (
    <div>
      <main className="mb-4 mt-4">
            <div className="container mx-auto">
                {/* Section: Product details */}
                <section className="mb-9">
                    <div className="flex flex-wrap -mx-4">
                        <div className="w-full md:w-1/2 px-4 mb-4 md:mb-0">
                            {/* Gallery */}
                            <div className="">
                                <div className="flex flex-wrap -mx-2">
                                    <div className="w-full px-2">
                                        <div className="">
                                            <img
                                                src={product.image}
                                                style={{
                                                    width: "100%",
                                                    height: 500,
                                                    objectFit: "cover",
                                                    borderRadius: 10
                                                }}
                                                alt="Gallery image 1"
                                                className="w-full rounded-lg"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <div className="p-3 flex flex-row">
                                        {gallery?.map((image) => (
                                            <img
                                            key={image.gid}
                                            src={image.image}
                                            alt={`Gallery image ${image.gid}`}
                                            className="mr-4 w-16 h-16 md:w-36 md:h-36 rounded-md"
                                            />
                                        ))}
                                        
                                    </div>
                                    
                                </div>
                            </div>
                            {/* Gallery */}
                        </div>
                        <div className="w-full md:w-1/2 px-4 mb-4 md:mb-0">
                            {/* Details */}
                            <div>
                                <h1 className="fw-bold mb-3">{product.title}</h1>
                                <div className="flex text-primary items-center">
                                    <ul className="mb-3 d-flex p-0" style={{ listStyle: "none" }}>
                                        <li>
                                            <i className="fas fa-star fa-sm text-yellow-500" title="Bad" />
                                            <i className="fas fa-star fa-sm text-yellow-500" title="Bad" />
                                            <i className="fas fa-star fa-sm text-yellow-500" title="Bad" />
                                            <i className="fas fa-star fa-sm text-yellow-500" title="Bad" />
                                            <i className="fas fa-star fa-sm text-yellow-500" title="Bad" />
                                        </li>

                                        <li className="ml-2 text-sm">
                                            <a href="" className="text-decoration-none">
                                                <strong className="mr-2">4/5</strong>(2 reviews)
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <h5 className="mb-3">
                                    <s className="text-gray-500 mr-2 text-sm">${product.old_price}</s>
                                    <span className="">${product.price}</span>
                                </h5>
                                <p className="text-gray-600">
                                    {product.description? 
                                    product.description 
                                    : `Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                    Ratione accusantium harum repellendus illo mollitia similique
                                    atque vitae repudiandae animi dolor? Rem eveniet saepe
                                    deserunt aliquam. Enim incidunt quas voluptatibus perferendis.`}
                                </p>
                                <div className="overflow-x-auto">
                                    <table className="table-auto w-full text-left">
                                        <tbody>
                                            <tr>
                                                <th className="py-2 pr-4 w-1/4">
                                                    <strong>Category</strong>
                                                </th>
                                                <td>{product.category?.title}</td>
                                            </tr>
                                            {specifications.map((spec) => (
                                                <tr key={spec.id}>
                                                    <th className="py-2 pr-4 w-1/4">
                                                        {" "}
                                                        <strong>{spec.title}</strong>
                                                    </th>
                                                    <td>{spec.content}</td>
                                                </tr>
                                            ))

                                            }
                                        </tbody>
                                    </table>
                                </div>
                                <hr className="my-5" />
                                <div action="">
                                    <div className="flex flex-col">
                                        {/* Quantity */}
                                        <div className="mb-4">
                                            <h6 className="block font-bold mb-2"><b>Quantity</b></h6>
                                            <input
                                                type="number"
                                                id="qty"
                                                name="qty"
                                                className="w-1/2 border border-gray-300 p-2 rounded-lg"
                                                min={1}
                                                max={product.stock_qty}
                                                value={qtyValue}
                                                onChange={(event) => handleQtyInput(event, event.target.value)}
                                            />
                                        </div>

                                        {/* Size */}
                                        <div className="mb-4">
                                            <h6 className="block font-bold mb-2"><b>Size: </b><span>{sizeValue}</span></h6>
                                            <div className='flex' name="size" id="size">
                                                {sizes?.map((size) => (
                                                    <div key={size.id} className='block mr-2'>
                                                        <button 
                                                        className='btn btn-primary p-2 mr-2 mb-1 rounded-lg'
                                                        onClick={(event) => handleChooseSize(event, size.name)}
                                                        >{size.name}</button>
                                                    </div>
                                                ))
                                                }
                                            </div>
                                        </div>

                                        {/* Colors */}

                                        <div className="mb-4">
                                            <h6 className="block font-bold mb-2"><b>Color:</b> <span>{colorValue}</span></h6>
                                            <div className='flex flex-col' name="colors" id="colors">
                                                {colors?.map((color) => (
                                                <div key={color.id} className='flex flex-row items-center'>
                                                    <button 
                                                    className='btn p-3 mr-2 mb-1 color_button' 
                                                    style={{ background: color.color_code }}
                                                    name = 'colorButton'
                                                    id='colorButton'
                                                    onClick={(event) => handleChooseColor(event, color.name)}
                                                    ></button>
                                                    <label 
                                                    className='color_name bg-transparent text-left align-middle'  
                                                    name='colorLabel' 
                                                    id='colorLabel' 
                                                    htmlFor='colorButton'
                                                    onClick={(event) => handleChooseColor(event, color.name)}>{color.name}</label>  
                                                </div>))
                                                }
                                            </div>
                                            <hr />
                                        </div>

                                    </div>
                                    <button 
                                    type="button" 
                                    className="btn btn-primary rounded-lg mr-2"
                                    onClick={(event) => handleAddToCart(event)}>
                                        <i className="fas fa-cart-plus mr-2" /> Add to cart
                                    </button>
                                    <button 
                                    href="#!" 
                                    type="button" 
                                    className="btn btn-danger rounded-lg" 
                                    data-mdb-toggle="tooltip" 
                                    title="Add to wishlist"
                                    onClick={(e) => handleAddToWishlist(e, product.id, userData?.user_id)}>
                                        <i className="fas fa-heart" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <hr />
                <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">
                            Specifications
                        </button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">
                            Vendor
                        </button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false" >
                            Review
                        </button>
                    </li>
                </ul>
                <div className="tab-content" id="pills-tabContent">
                    <div
                        className="tab-pane fade show active"
                        id="pills-home"
                        role="tabpanel"
                        aria-labelledby="pills-home-tab"
                        tabIndex={0}
                    >
                        <div className="overflow-x-auto">
                            <table className="table-auto w-full text-left">
                                <tbody>
                                    <tr>
                                        <th className="py-2 pr-4 w-1/4">
                                            {" "}
                                            <strong>Category</strong>
                                        </th>
                                        <td>{product.category?.title}</td>
                                    </tr>
                                    {specifications.map((spec) => (
                                        <tr key={spec.id}>
                                            <th className="py-2 pr-4 w-1/4">
                                                {" "}
                                                <strong>{spec.title}</strong>
                                            </th>
                                            <td>{spec.content}</td>
                                        </tr>
                                    ))

                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div
                        className="tab-pane fade"
                        id="pills-profile"
                        role="tabpanel"
                        aria-labelledby="pills-profile-tab"
                        tabIndex={0}
                    >
                        <div className="card mb-3 max-w-md">
                            <div className="flex">
                                <div className="w-1/3">
                                    <img
                                        src="https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250"
                                        style={{
                                            height: "100%",
                                            width: "100%",
                                            objectFit: "cover"
                                        }}
                                        alt="User Image"
                                        className="img-fluid"
                                    />
                                </div>
                                <div className="w-2/3">
                                    <div className="p-4">
                                        <h5 className="font-bold">{product.vendor?.name?  product.vendor?.name : product.vendor?.user?.full_name || "Unknown"}</h5>
                                        <p className="">Vendor</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className="tab-pane fade"
                        id="pills-contact"
                        role="tabpanel"
                        aria-labelledby="pills-contact-tab"
                        tabIndex={0}
                    >
                        <div className="container mt-5">
                            <div className="row">
                                {/* Column 1: Form to create a new review */}
                                <div className="col-md-6">
                                    <h2 className="text-2xl font-bold mb-4">Create a New Review</h2>
                                    <form onSubmit={event => handleReviewSubmit(event)}>
                                        <div className="mb-3">
                                            <label htmlFor="ratingSelect" className="block text-sm font-medium text-gray-700">
                                                Rating
                                            </label>
                                            <select 
                                            name="rating" 
                                            id="rating" 
                                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-600 focus:border-blue-600 sm:text-sm rounded-md"
                                            onChange={(event) => handleReviewChange(event)}>
                                                <option value="1">1 Star</option>
                                                <option value="2">2 Star</option>
                                                <option value="3">3 Star</option>
                                                <option value="4">4 Star</option>
                                                <option value="5">5 Star</option>
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="review" className="block text-sm font-medium text-gray-700">
                                                Review
                                            </label>
                                            <textarea
                                                className="mt-1 block w-full h-44 shadow-sm sm:text-sm border border-gray-300 rounded-md text-black"
                                                id="review"
                                                name="review"
                                                rows={4}
                                                placeholder="Write your review"
                                                value={createReview.review}
                                                onChange={(event) => handleReviewChange(event)}
                                            />
                                        </div>
                                        <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                            Submit Review
                                        </button>
                                    </form>
                                </div>
                                {/* Column 2: Display existing reviews */}
                                <div className="col-md-6">
                                    <h2 className="text-2xl font-bold mb-4">Existing Reviews</h2>
                                    {reviews.length > 0 ? (
                                    <div className="card mb-3">
                                        {reviews.map((review) =>(
                                        <div key={review.id} className="row g-0">
                                            <div className="col-md-3">
                                                <img
                                                    src={review.profile?.image}
                                                    alt="User Image"
                                                    className="img-fluid rounded-md"
                                                />
                                            </div>
                                            <div className="col-md-9">
                                                <div className="card-body">
                                                    <h5 className="text-lg font-bold">{review.user?.username || review.user?.full_name}</h5>
                                                    <p className="text-sm text-gray-500">{review.date.split('T')[0]}</p>
                                                    <p className="text-base">
                                                        {review.review}
                                                    </p>
                                                    <p>
                                                        {review.rating === 1 && <><i className="fas fa-star text-yellow-500" /></>} 
                                                        {review.rating === 2 && (
                                                            <>
                                                                <i className="fas fa-star text-yellow-500" />
                                                                <i className="fas fa-star text-yellow-500" />
                                                            </>
                                                        )}
                                                        {review.rating === 3 && (
                                                            <>
                                                                <i className="fas fa-star text-yellow-500" />
                                                                <i className="fas fa-star text-yellow-500" />
                                                                <i className="fas fa-star text-yellow-500" />
                                                            </>
                                                        )}
                                                        {review.rating === 4 && (
                                                            <>
                                                                <i className="fas fa-star text-yellow-500" />
                                                                <i className="fas fa-star text-yellow-500" />
                                                                <i className="fas fa-star text-yellow-500" />
                                                                <i className="fas fa-star text-yellow-500" />
                                                            </>
                                                        )}
                                                        {review.rating === 5 && (
                                                            <>
                                                                <i className="fas fa-star text-yellow-500" />
                                                                <i className="fas fa-star text-yellow-500" />
                                                                <i className="fas fa-star text-yellow-500" />
                                                                <i className="fas fa-star text-yellow-500" />
                                                                <i className="fas fa-star text-yellow-500" />
                                                            </>
                                                        )}    
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        ))}
                                    </div>)
                                    :
                                    (
                                        <div className="card mb-3"><p>No reviews.</p></div>    
                                    )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tab-pane fade" id="pills-disabled" role="tabpanel" aria-labelledby="pills-disabled-tab" tabIndex={0}>
                        <div className="container mt-5">
                            <div className="row">
                                {/* Column 1: Form to submit new questions */}
                                <div className="col-md-6">
                                    <h2 className="text-2xl font-bold mb-4">Ask a Question</h2>
                                    <form>
                                        <div className="mb-3">
                                            <label htmlFor="askerName" className="block text-sm font-medium text-gray-700">
                                                Your Name
                                            </label>
                                            <input
                                                type="text"
                                                className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                id="askerName"
                                                placeholder="Enter your name"
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="questionText" className="block text-sm font-medium text-gray-700">
                                                Question
                                            </label>
                                            <textarea
                                                className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                id="questionText"
                                                rows={4}
                                                placeholder="Ask your question"
                                                defaultValue={""}
                                            />
                                        </div>
                                        <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                            Submit Question
                                        </button>
                                    </form>
                                </div>
                                {/* Column 2: Display existing questions and answers */}
                                <div className="col-md-6">
                                    <h2 className="text-2xl font-bold mb-4">Questions and Answers</h2>
                                    <div className="card mb-3">
                                        <div className="card-body">
                                            <h5 className="text-lg font-bold">User 1</h5>
                                            <p className="text-sm text-gray-500">August 10, 2023</p>
                                            <p className="text-base">
                                                What are the available payment methods?
                                            </p>
                                            <h6 className="text-sm font-medium text-gray-700">Answer:</h6>
                                            <p className="text-base">
                                                We accept credit/debit cards and PayPal as payment methods.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="card mb-3">
                                        <div className="card-body">
                                            <h5 className="text-lg font-bold">User 2</h5>
                                            <p className="text-sm text-gray-500">August 15, 2023</p>
                                            <p className="text-base">How long does shipping take?</p>
                                            <h6 className="text-sm font-medium text-gray-700">Answer:</h6>
                                            <p className="text-base">
                                                Shipping usually takes 3-5 business days within the US.
                                            </p>
                                        </div>
                                    </div>
                                    {/* More questions and answers can be added here */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
  )
}

export default ProductDetail
