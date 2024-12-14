import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";

import apiInstance from "../../utils/axios";
import GetCurrentAddress from '../plugin/GetCurrentAddress'
import GetUserData from '../plugin/GetUserData'
import GetCartId from '../plugin/GetCartId'

import Swal from 'sweetalert2'


const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 1200,
    timerProgressBar: false,
})

const Search = () => {
    const [products, setProducts] = useState([]);
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

    const handleAddToCart = async (event, productId, product) => {
        event.preventDefault();
        const product_id = product?.id;
        const user_id = userData?.user_id;
        const price = product?.price;
        const shipping_amount = product?.shipping_amount;
        const country = currentAddress?.country;

        try{
            const formData = new FormData();
            formData.append("Product ID: ", productId);
            formData.append("product_id",product_id)
            formData.append("user_id",user_id)
            formData.append("qty",chosenQty[productId])
            formData.append("price",price)
            formData.append("shipping_amount",shipping_amount)
            formData.append("country",country)
            formData.append("size",chosenSizes[productId])
            formData.append("color",chosenColors[productId])
            formData.append("cart_id",cart_id)

            const response = await apiInstance.post('cart-view/', formData);
            console.log('response: ', response.data);

            Toast.fire({
                icon: 'success',
                title: response.data.message
            })
        }catch(error){
            console.log("Error: ", error)
        }
    }

    const [searchParams] = useSearchParams();
    const query = searchParams.get("query");
    //console.log('query: ', query)

    const fetchProducts = async () => {
        if(query){
            try{
                await apiInstance.get(`search/?query=${query}`)
                    .then((res) => {
                        const response = res.data;
                        setProducts(response);
                    });
                //console.log('query: ', query)
            } catch(error){
                console.log('Error getting results from search: ', error)
            }    
        }
    }

    useEffect(() => {
        fetchProducts();
    }, [query]);


    return (
        <div>
            Search
            <main className="mt-5">
                <div className="flex flex-col space-y-5">
                    {/* Section: Products */}
                    <section className="text-center">
                        <div className="flex flex-wrap justify-center">
                            {products?.map((product) => (
                                <div key={product.pid} className="w-full sm:w-1/2 lg:w-1/3 p-4">
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
                                                    className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                                                    type="button"
                                                    id="dropdownMenuButton"
                                                    aria-expanded={OpenVariationMenus[product.pid] ? "true" : "false"}
                                                    aria-haspopup="true"
                                                    onClick={() => toggleVariationMenu(product.pid)}
                                                >
                                                    Variation
                                                    <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
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
                                                                <div className="px-4 py-2 flex flex-wrap">
                                                                    {product.color?.map((color) => (
                                                                        <button 
                                                                        onClick={() => chooseColor(product.pid, color.name)} 
                                                                        key={`${color.id}-${color.name}`} 
                                                                        style={{backgroundColor: `${color.color_code}`}} 
                                                                        className="w-6 h-6 rounded-full mr-2 mb-2"
                                                                        ></button>
                                                                        
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
                                                            className="bg-blue-500 text-white text-xs font-semibold py-1 px-2 rounded mr-2 mb-2"
                                                            onClick={(e) => handleAddToCart(e, product.pid, product)}
                                                            >
                                                                <i className="fas fa-shopping-cart"></i>
                                                            </button>
                                                            <button className="bg-red-500 text-white text-xs font-semibold py-1 px-2 rounded mr-2 mb-2">
                                                                <i className="fas fa-heart"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                )}
                                            </div>
                                            <button className="bg-red-500 ml-2 text-white text-xs font-semibold py-1 px-2 rounded mt-2">
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
    )
}

export default Search