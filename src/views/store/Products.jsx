import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import apiInstance from "../../utils/axios";
import GetCurrentAddress from '../plugin/GetCurrentAddress'
import GetUserData from '../plugin/GetUserData'
import GetCartId from '../plugin/GetCartId'
import Hero from "./Hero";
import { CartContext } from '../plugin/Context';

import Swal from 'sweetalert2'


const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 1200,
    timerProgressBar: false,
})

const Products = () => {
    const [cartCount, setCartCount] = useContext(CartContext);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [OpenVariationMenus, setOpenVariationMenus] = useState({});
    const [chosenColors, setChosenColors] = useState({});
    const [chosenSizes, setChosenSizes] = useState({});
    const [chosenQty, setChosenQty] = useState({});

    const currentAddress = GetCurrentAddress();
    const userData = GetUserData();
    const cart_id = GetCartId();


    const toggleVariationMenu = (productId) => {
        setOpenVariationMenus((prevVariationMenus) => ({
            ...prevVariationMenus,
            [productId]: !prevVariationMenus[productId],
        }));
    };

    const chooseColor = (productId, color) => {
        setChosenColors((prevChosenColors) => ({
            ...prevChosenColors,
            [productId]: color,
        }));
    }

    const chooseSize = (productId, size) => {
        setChosenSizes((prevChosenSizes) => ({
            ...prevChosenSizes,
            [productId]: size,
        }));
    }

    const handleQtyChange = (event, productId, qty) => {
        event.preventDefault();
        setChosenQty((prevChosenQty) => ({
            ...prevChosenQty,
            [productId]: qty,
        }));
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

    const handleAddToCart = async (event, productId, product) => {
        event.preventDefault();
        const product_id = product?.id;
        const user_id = userData?.user_id;
        const price = product?.price;
        const shipping_amount = product?.shipping_amount;
        const country = currentAddress?.country;
        console.log('product_id', product_id)
        console.log('user_id', user_id)
        console.log('country: ', country)
        try{
            const formData = new FormData();
            formData.append("Product ID: ", productId);
            formData.append("product_id",product_id)
            formData.append("user_id",user_id)
            formData.append("qty",chosenQty[productId])
            formData.append("price",price)
            formData.append("shipping_amount",shipping_amount)
            formData.append("country",country)
            formData.append("size",chosenSizes[product_id])
            formData.append("color",chosenColors[product_id])
            formData.append("cart_id",cart_id)
            
            console.log('chosen sizes: ', chosenSizes)
            console.log('chosen colors: ', chosenColors)
            console.log('chosen size: ', chosenSizes[productId])
            console.log('chosen color: ', chosenColors[productId])

            const response = await apiInstance.post('cart-view/', formData);
            console.log('response: ', response.data);

            const url = user_id ? `/cart-list/${cart_id}/${user_id}` : `/cart-list/${cart_id}/`;
            await apiInstance.get(url).then((res) => {
                setCartCount(res.data.length)
            })

            Toast.fire({
                icon: 'success',
                title: response.data.message
            })
        }catch(error){
            console.log("Error: ", error)
        }
    }

    useEffect(() => {
        apiInstance.get('products/')
            .then((res) => {
                const response = res.data;
                setProducts(response);
            });
    }, []);

    useEffect(() => {
        apiInstance.get('category/')
            .then((res) => {
                const responseCat = res.data;
                setCategories(responseCat);
            });
    }, []);

    useEffect(()=>{
        console.log('chosen colors:', chosenColors)
    },[chosenColors])

    return (
        <div className='bg-opacity-0'>
            <main className="mt-5 ml-5 mr-5">
                <div className='w-full min-h-50 mb-5'>
                    <Hero />
                </div>
                <div className="flex flex-col space-y-5 ml-5 mr-5">
                    {/* Section: Category */}
                    <section className="text-center">
                        <div className="flex flex-wrap justify-center">
                            <h4 className="text-center">Categories</h4>
                            {categories?.map((category) => (
                                <div key={category.slug} className="mx-4">
                                    <img 
                                    src={category.image || "https://placehold.co/100"} 
                                    style={{width: "100px", height: "100px", objectFit: "cover"}}
                                    className="rounded-full" 
                                    alt="Category" />
                                    <h6 className="text-center">{category.title || "Category"}</h6>
                                </div>
                            ))}
                        </div>
                    </section>
                    {/* Section: Products */}
                    <section className="text-center">
                        <div className="flex flex-wrap justify-center">
                            {products?.map((product, index) => (
                                <div key={index} className="w-full sm:w-1/2 lg:w-1/3 p-4">
                                    <div className="bg-white shadow-md rounded-lg">
                                        <div className="relative">
                                            <Link to={`/detail/${product.slug}`}>
                                                <img
                                                    src={product.image}
                                                    className="w-full h-48 object-cover"
                                                    alt={product.title}
                                                />
                                            </Link>
                                            <div className="absolute top-0 left-0 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-br-lg">
                                                New
                                            </div>
                                        </div>
                                        <div className="p-4">
                                            <Link to={`/detail/${product.slug}`} className="text-gray-900 hover:text-blue-500">
                                                <h5 className="text-lg font-semibold mb-2">{product.title}</h5>
                                            </Link>
                                            <p className="text-gray-600">{product.category?.title}</p>
                                            <h6 className="text-lg font-bold mb-3">${product.price}</h6>
                                            <div className="relative inline-block text-left space-x-2">
                                                <button
                                                    className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-button-bg text-sm font-medium text-gray-700 hover:bg-accent focus:outline-none"
                                                    type="button"
                                                    id="dropdownMenuButton"
                                                    aria-expanded={OpenVariationMenus[product.pid] ? "true" : "false"}
                                                    aria-haspopup="true"
                                                    onClick={() => toggleVariationMenu(product.pid)}
                                                >
                                                    <div className='text-white'>Variation</div>
                                                    <svg className="-mr-1 ml-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                                    </svg>
                                                </button>
                                                {/* Variation Menu */}
                                                {OpenVariationMenus[product.pid] && (
                                                <div className="origin-top-right absolute z-50 right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="dropdownMenuButton">
                                                        {product.size?.length > 0 && (
                                                            <>
                                                                <h6 className="px-4 py-2 text-sm text-gray-700">
                                                                    <b>Size</b>: {chosenSizes[product.pid] || ""}
                                                                </h6>
                                                                <div className="px-4 py-2 flex flex-wrap">
                                                                    {product.size?.map((size) => (
                                                                        <button 
                                                                        onClick={()=> chooseSize(product.pid, size.name)} 
                                                                        key={`${size.id}-${size.name}`} 
                                                                        className="bg-gray-200 text-gray-700 text-xs font-semibold py-1 px-2 rounded mr-2 mb-2"
                                                                        >{size.name}</button>
                                                                    ))}
                                                                </div>
                                                            </>
                                                        )}
                                                        {product.color?.length > 0 && (
                                                            <>
                                                                <h6 className="px-4 py-2 text-sm text-gray-700">
                                                                    <b>Color</b>: {chosenColors[product.pid] || ""}
                                                                </h6>
                                                                <div className="px-4 py-2 flex flex-wrap m-2">
                                                                    {product.color?.map((color) => (
                                                                        <div key={`${color.id}-${color.name}`} className='flex flex-wrap justify-evenly group' >
                                                                            <button 
                                                                            onClick={() => chooseColor(product.pid, color.name)} 
                                                                            key={`${color.id}-${color.name}`} 
                                                                            style={{backgroundColor: `#${color.color_code}`}} 
                                                                            className={`w-6 h-6 rounded-full mr-2 mb-2 group-hover:border group-hover:border-accent`}
                                                                            ></button>
                                                                            <div className='text-center align-middle group-hover:text-accent'>{color.name}</div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </>
                                                        )}
                                                        {product.stock_qty > 0 && (
                                                            <div className="flex flex-row">
                                                                <h6 className='pl-5 pr-1 py-2 text-gray-700 text-center align-middle'><b>Qty:</b></h6>
                                                                <input 
                                                                type="number" 
                                                                className="ml-1 px-2 py-2 text-sm text-gray-700 border border-gray-300 rounded w-1/2" 
                                                                placeholder="Quantity"
                                                                min={1}
                                                                max={product.stock_qty}
                                                                onChange={(e)=> handleQtyChange(e, product.pid, e.target.value)}
                                                                />
                                                            </div>

                                                        )}
                                                        <div className="px-4 py-2 flex">
                                                            <button
                                                            type="button" 
                                                            className="bg-button-bg py-1 px-2 rounded mr-2 mb-2"
                                                            onClick={(e) => handleAddToCart(e, product.id, product)}
                                                            >
                                                                <>
                                                                <i className="fas fa-shopping-cart mr-2 text-white"></i>
                                                                <div className='text-white'>Cart</div>
                                                                </>
                                                                
                                                            </button>
                                                            <button
                                                            type="button" 
                                                            className="bg-accent py-1 px-2 rounded mr-2 mb-2"
                                                            onClick={(e) => handleAddToWishlist(e, product?.id, userData?.user_id)}>
                                                                <>
                                                                <i className="fas fa-heart mr-2 text-white"></i>
                                                                <div className='text-white'>Wishlist</div>
                                                                </>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                )}
                                            </div>
                                            <button 
                                            className="bg-red-500 ml-2 text-white text-xs font-semibold py-1 px-2 rounded mt-2"
                                            onClick={(e) => handleAddToWishlist(e, product?.id, userData?.user_id)}>
                                                <i className="fas fa-heart"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
};

export default Products;