import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import Sidebar from './Sidebar'
import apiInstance from "../../utils/axios";
import GetUserData from '../plugin/GetUserData'

import Swal from 'sweetalert2'


const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 1200,
    timerProgressBar: false,
})


const AddProduct = () => {
    const userData = GetUserData()
    const [product, setProduct] = useState({
        title: '',
        image: '',
        description: '',
        category: '',
        old_price: '',
        price: '',
        shipping_amount: '',
        stock_qty: '',
        vendor: userData?.vendor_id,
    })

    const [specifications, setSpecifications] = useState([
        {
            title: '',
            content: '',
        }
    ])

    const [sizes, setSizes] = useState([
        {
            name: '',
            price: '',
        }
    ])

    const [colors, setColors] = useState([
        {
            name: '',
            color_code: '',
        }
    ])

    const [gallery, setGallery] = useState([
        {
            image: '',
        }
    ])

    const [category, setCategory] = useState([])
    const [isLoading, setIsLoading] = useState(false)


    const handleAddMore = (setStateFunction) => {
        setStateFunction(prevState => [...prevState, {}])
    }


    const handleRemove = (index, setStateFunction) => {
        setStateFunction(prevState => prevState.filter((_, i) => i !== index));
    }

    const handleInputChange = (index, field, value, setStateFunction) => {
        setStateFunction(prevState => {
            const updatedState = [...prevState]
            updatedState[index][field] = value
            return updatedState
        })
    }

    const handleImageChange = (index, event, setStateFunction) => {
        const file = event.target.files[0]

        if(file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setStateFunction((prevState) => {
                    const updatedState = [...prevState]
                    updatedState[index].image = {
                        file, preview:reader.result
                        }
                    return updatedState
                })
            }

            reader.readAsDataURL(file)
        } else{
            setStateFunction((prevState) => {
                const updatedState = [...prevState]
                updatedState[index].image = null
                updatedState[index].preview = null
                return updatedState
            })
        }
    }

    const handleProductInputChange = (event) => {
        console.log(event.target.name, event.target.value)
        setProduct({
            ...product,
            [event.target.name]: event.target.value
        })
    }

    const handleProductFileChange = (event) => {
        const file = event.target.files[0]

        if (file){
            const reader = new FileReader()
            reader.onloadend = () => {
                setProduct({
                    ...product,
                    image: {
                        file: event.target.files[0], 
                        preview: reader.result
                    }
                })
            }
            reader.readAsDataURL(file)
        }
    }


    const fetchCategory = async () => {
        try {
            const response = await apiInstance.get('/category/')
            setCategory(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchCategory()
    },[])


    const handleSubmit = async (event) => {
        event.preventDefault()
        setIsLoading(true)

        if(product.title == '' || product.description == '' || product.price == '' || product.category== null || product.shipping_amount == '' || product.stock_qty == '' || product.image == null){
            console.log('Please fill required the fields')
            setIsLoading(false)

            Toast.fire({
                icon: 'warning',
                title: 'Missing Fields!',
                text: 'Please fill required fields to create a product.',
            })

            return
        }

        try{
            setIsLoading(true)
            const formData = new FormData()

            // append product data
            Object.entries(product).forEach(([key, value]) => {
                if(key === 'image' && value){
                    formData.append(key, value.file)
                } else {
                    formData.append(key, value)
                }
            })

            // append specifications data
            specifications.forEach((spec, index) => {
                Object.entries(spec).forEach(([key, value]) => {
                    formData.append(`specifications[${index}][${key}]`, value)
                })
            })

            // append colors data
            colors.forEach((color, index) => {
                Object.entries(color).forEach(([key, value]) => {
                    formData.append(`colors[${index}][${key}]`, value)
                })
            })


            // append sizes data
            sizes.forEach((size, index) => {
                Object.entries(size).forEach(([key, value]) => {
                    formData.append(`sizes[${index}][${key}]`, value)
                })
            })

            // append gallery data
            gallery.forEach((item, index) => {
                if (item.image) {
                    formData.append(`gallery[${index}][image]`, item.image.file);
                }
            });

            const response = await apiInstance.post(`vendor-create-product/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            Toast.fire({
                icon: 'success',
                title: 'Product Created Successfully',
                text: 'This product has been successfully created',
            });

            const data = await response.json()
            console.log('form submission: ', data)

        } catch (error) {
            console.log('Error submitting form to create product: ', error)
            setIsLoading(false)
        }
    }

    

    return (
    <div className="container-fluid" id="main">
        <div className="row row-offcanvas row-offcanvas-left h-100">
            <Sidebar />
            <div className="col-md-9 col-lg-10 main mt-4">
            <div className="container">
                <form
                encType="multipart/form-data" 
                onSubmit={handleSubmit}
                className="main-body">
                    <ul
                    className="nav nav-pills mb-3 d-flex justify-content-center mt-5"
                    id="pills-tab"
                    role="tablist">
                        <li className="nav-item" role="presentation">
                        <button
                        className="nav-link active"
                        id="pills-home-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-home"
                        type="button"
                        role="tab"
                        aria-controls="pills-home"
                        aria-selected="true">
                            Basic Information
                        </button>
                        </li>
                        <li className="nav-item" role="presentation">
                        <button
                        className="nav-link"
                        id="pills-profile-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-profile"
                        type="button"
                        role="tab"
                        aria-controls="pills-profile"
                        aria-selected="false">
                            Gallery
                        </button>
                        </li>
                        <li className="nav-item" role="presentation">
                        <button
                        className="nav-link"
                        id="pills-contact-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-contact"
                        type="button"
                        role="tab"
                        aria-controls="pills-contact"
                        aria-selected="false">
                            Specifications
                        </button>
                        </li>
                        <li className="nav-item" role="presentation">
                        <button
                        className="nav-link"
                        id="pills-size-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-size"
                        type="button"
                        role="tab"
                        aria-controls="pills-size"
                        aria-selected="false">
                            Size
                        </button>
                        </li>
                        <li className="nav-item" role="presentation">
                        <button
                        className="nav-link"
                        id="pills-color-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-color"
                        type="button"
                        role="tab"
                        aria-controls="pills-color"
                            aria-selected="false">
                            Color
                        </button>
                        </li>
                    </ul>
                    <div className="tab-content" id="pills-tabContent">
                        <div
                        className="tab-pane fade show active"
                        id="pills-home"
                        role="tabpanel"
                        aria-labelledby="pills-home-tab">
                            <div className="row gutters-sm shadow p-4 rounded">
                                <h4 className="mb-4">Product Details</h4>
                                <div className="col-md-12">
                                <div className="card mb-3">
                                    <div className="card-body">
                                    <div>
                                        <div className="row text-dark">
                                            <div className="col-lg-6 mb-2">
                                                <label htmlFor="image" className="mb-2">
                                                Product Thumbnail
                                                </label>
                                                <input
                                                type="file"
                                                className="form-control"
                                                name="image"
                                                id="image"
                                                onChange={handleProductFileChange}
                                                />
                                            </div>
                                            <div className="col-lg-6 mb-2 ">
                                                <label htmlFor="title" className="mb-2">
                                                Title
                                                </label>
                                                <input
                                                type="text"
                                                className="form-control"
                                                name="title"
                                                id="title"
                                                value={product.title || ''}
                                                onChange={(event) => handleProductInputChange(event)}
                                                />
                                            </div>
                                            <div className="col-lg-12 mb-2">
                                                <label htmlFor="description" className="mb-2">
                                                Description
                                                </label>
                                                <textarea
                                                name="description"
                                                className="form-control"
                                                id="description"
                                                rows={10}
                                                value={product.description || ''}
                                                onChange={(event) => handleProductInputChange(event)}
                                                />
                                            </div>
                                            <div className="col-lg-6 mb-2">
                                                <label htmlFor="category" className="mb-2">
                                                Category
                                                </label>
                                                <select
                                                name="category"
                                                className="select form-control"
                                                id="category"
                                                value={product.category }
                                                onChange={handleProductInputChange}
                                                >
                                                <option value="">- Select -</option>
                                                {category?.map((cat, index) => (
                                                    <option key={index} value={cat.id}> {/* value is the category id b/c category is a foreign key in product*/}
                                                        {cat.title}
                                                    </option>
                                                ))}
                                                </select>
                                            </div>
                                            <div className="col-lg-6 mb-2 ">
                                                <label htmlFor="old_price" className="mb-2">
                                                Old Price
                                                </label>
                                                <input
                                                type="number"
                                                className="form-control"
                                                name="old_price"
                                                id="old_price"
                                                value={product.old_price || ''}
                                                onChange={event => handleProductInputChange(event)}
                                                />
                                            </div>
                                            <div className="col-lg-6 mb-2 ">
                                                <label htmlFor="price" className="mb-2">
                                                Price
                                                </label>
                                                <input
                                                type="number"
                                                className="form-control"
                                                name="price"
                                                id="price"
                                                value={product.price || ''}
                                                onChange={event => handleProductInputChange(event)}
                                                />
                                            </div>
                                            <div className="col-lg-6 mb-2 ">
                                                <label htmlFor="shipping_amount" className="mb-2">
                                                Shipping Amount
                                                </label>
                                                <input
                                                type="number"
                                                className="form-control"
                                                name="shipping_amount"
                                                id="shipping_amount"
                                                value={product.shipping_amount || ''}
                                                onChange={(event) => handleProductInputChange(event)}
                                                />
                                            </div>
                                            <div className="col-lg-6 mb-2 ">
                                                <label htmlFor="stock_qty" className="mb-2">
                                                Stock Qty
                                                </label>
                                                <input
                                                type="number"
                                                className="form-control"
                                                name="stock_qty"
                                                id="stock_qty"
                                                value={product.stock_qty || ''}
                                                onChange={(event) => handleProductInputChange(event)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                        <div
                        className="tab-pane fade"
                        id="pills-profile"
                        role="tabpanel"
                        aria-labelledby="pills-profile-tab"
                        >
                        <div className="row gutters-sm shadow p-4 rounded">
                            <h4 className="mb-4">Gallery of Product Images</h4>
                            <div className="col-md-12">
                            <div className="card mb-3">
                                <div className="card-body">
                                    {gallery.length === 0 && (
                                        <h4 className=''>No Images Added.</h4>
                                    )}
                                    {gallery.map((galItem, index) => (
                                        <div key={index} className="row text-dark">
                                            <div className="col-lg-4 mb-2 content-center">
                                                <label htmlFor="" className="mb-2">
                                                    Product Image
                                                </label>
                                                {galItem.image && (
                                                    <img
                                                    src={galItem.image.preview}
                                                    style={{ width: "100%", height: "250px", objectFit: "cover" }}
                                                    alt=""
                                                    />
                                                )}
                                                {!galItem.image && (
                                                    <img
                                                    src={'https://archive.org/download/placeholder-image/placeholder-image.jpg'}
                                                    style={{ width: "100%", height: "250px", objectFit: "cover" }}
                                                    alt="default alt for image"
                                                    />
                                                )}
                                            </div>
                                            <div className="col-lg-6 mb-2 content-center">
                                                <div className='mb-2'>
                                                    <label htmlFor="" className="mb-2">
                                                        Product Image
                                                    </label>
                                                    <input
                                                        type="file"
                                                        className="form-control"
                                                        name=""
                                                        id=""
                                                        onChange = {(event) => handleImageChange(index, event, setGallery)}
                                                    />
                                                </div>
                                                
                                                <div  className='mt-4 mb-2'>
                                                    <button
                                                        className="btn btn-danger"
                                                        onClick={() => handleRemove(index, setGallery)}>
                                                        <i className="fas fa-trash" /> Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                ))}
                                <button 
                                onClick={() => handleAddMore(setGallery)}
                                className="btn btn-primary mt-5">
                                    <i className="fas fa-plus" /> Add Image
                                </button>
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
                        >
                        <div className="row gutters-sm shadow p-4 rounded">
                            <h4 className="mb-4">Specifications</h4>
                            <div className="col-md-12">
                            <div className="card mb-3">
                                <div className="card-body">
                                    {specifications.map((spec, index) => (
                                    <div key={index} className="row text-dark">
                                        <div className="col-lg-5">
                                            <label htmlFor="title" className="">
                                                Title
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="title"
                                                id="title"
                                                value={spec.title || ''}
                                                onChange={(event) => handleInputChange(index, 'title', event.target.value, setSpecifications)}
                                            />
                                        </div>
                                        <div className="col-lg-5">
                                            <label htmlFor="content" className="">
                                                Content
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="content"
                                                id="content"
                                                value={spec.content || ''}
                                                onChange={(event) => handleInputChange(index, 'content', event.target.value, setSpecifications)}
                                            />
                                        </div>
                                        <div className="col-lg-2">
                                            <button 
                                            className="btn btn-danger mt-4"
                                            onClick={()=> handleRemove(index, setSpecifications)}>
                                                <i className="fas fa-trash" /> Remove
                                            </button>
                                        </div>
                                    </div>
                                    ))}
                                    {specifications.length === 0 && (
                                        <h4 className=''>No Specifications Added.</h4>
                                    )}
                                    <button className="btn btn-primary mt-5"
                                    onClick={()=>handleAddMore(setSpecifications)}>
                                        <i className="fas fa-plus" /> Add Specifications
                                    </button>
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
                        >
                        <div className="row gutters-sm shadow p-4 rounded">
                            <h4 className="mb-4">Size</h4>
                            <div className="col-md-12">
                            <div className="card mb-3">
                                <div className="card-body">
                                <div className="row text-dark">
                                    <div className="col-lg-6 mb-2">
                                    <label htmlFor="" className="mb-2">
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name=""
                                        id=""
                                    />
                                    </div>
                                    <div className="col-lg-6 mb-2">
                                    <label htmlFor="" className="mb-2">
                                        Content
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name=""
                                        id=""
                                    />
                                    </div>
                                </div>
                                <button className="btn btn-primary mt-5">
                                    <i className="fas fa-plus" /> Add Specifications
                                </button>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                        <div
                        className="tab-pane fade"
                        id="pills-size"
                        role="tabpanel"
                        aria-labelledby="pills-size-tab"
                        >
                        <div className="row gutters-sm shadow p-4 rounded">
                            <h4 className="mb-4">Size</h4>
                            <div className="col-md-12">
                            <div className="card mb-3">
                                <div className="card-body">
                                    {sizes.map((size, index) => (
                                    <div key={index} className="row text-dark">
                                        <div className="col-lg-5">
                                            <label htmlFor="name" className="">
                                                Size Name
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="name"
                                                placeholder="e.g., Small, XS, Lg,..."
                                                id="name"
                                                value={size.name || ''}
                                                onChange={(event) => handleInputChange(index, 'name', event.target.value, setSizes)}
                                            />
                                        </div>
                                        <div className="col-lg-5">
                                            <label htmlFor="price" className="">
                                                Price
                                            </label>
                                            <input
                                                type="number"
                                                placeholder="e.g., 20 for $20"
                                                className="form-control"
                                                name="price"
                                                id="price"
                                                value={size.price || ''}
                                                onChange={(event) => handleInputChange(index, 'price', event.target.value, setSizes)}
                                            />
                                        </div>
                                        <div>
                                            <button
                                            className="btn btn-danger mt-4"
                                            onClick={() => handleRemove(index, setSizes)}>
                                                <i className="fas fa-trash" /> Remove
                                            </button>
                                        </div>
                                    </div>
                                    ))}
                                    {sizes.length === 0 && (
                                        <h4 className=''>No Sizes Added.</h4>
                                    )}
                                    <button className="btn btn-primary mt-5"
                                    onClick={()=> handleAddMore(setSizes)}>
                                        <i className="fas fa-plus" /> Add Size
                                    </button>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                        <div
                        className="tab-pane fade"
                        id="pills-color"
                        role="tabpanel"
                        aria-labelledby="pills-color-tab"
                        >
                        <div className="row gutters-sm shadow p-4 rounded">
                            <h4 className="mb-4">Color</h4>
                            <div className="col-md-12">
                            <div className="card mb-3">
                                <div className="card-body">
                                    {colors.map((color, index) => (
                                    <div key={index} className="row text-dark">
                                        <div className="col-lg-5">
                                            <label htmlFor="name" className="">
                                                Color Name
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="name"
                                                placeholder="e.g., Green"
                                                id="name"
                                                value={color.name || ''}
                                                onChange={(event) => handleInputChange(index, 'name', event.target.value, setColors)}
                                            />
                                        </div>
                                        <div className="col-lg-5">
                                            <label htmlFor="color_code" className="">
                                                Color Hex Code
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="e.g., f4f7f6 for #f4f7f6"
                                                className="form-control"
                                                name="color_code"
                                                id="color_code"
                                                value={color.color_code || ''}
                                                onChange={(event) => handleInputChange(index, 'color_code', event.target.value, setColors)}
                                            />
                                        </div>
                                        <div className='col-lg-2'>
                                            <button className="btn btn-danger mt-4"
                                            onClick={()=> handleRemove(index, setColors)}>
                                                <i className="fas fa-trash" /> Remove
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                {colors.length === 0 && (
                                    <h4 className=''>No Colors Added.</h4>
                                )}
                                <button className="btn btn-primary mt-5"
                                onClick={()=>handleAddMore(setColors)}>
                                    <i className="fas fa-plus" /> Add Color
                                </button>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                        <div>
                        
                        <div className="d-flex justify-content-center mt-5 mb-5">
                            <button className="btn btn-success w-50" type='submit'>
                            Create Product <i className="fa fa-check-circle" />{" "}
                            </button>
                        </div>
                        </div>
                    </div>
                </form>
            </div>
            </div>
        </div>
    </div>

    )
}

export default AddProduct