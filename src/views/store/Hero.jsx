import React from 'react'
import Slider from "react-slick";

const Hero = () => {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    return (
        <div>
            <div>{/* Hero Section*/}
                <Slider {...settings}>
                <div>
                    <h3 className='text-center'>This is not an actual e-commerce site.</h3>
                </div>
                <div>
                    <h3 className='text-center'>The products here are actually not for sale.</h3>
                </div>
                <div>
                    <h3 className='text-center'>For your eyes only.</h3>
                </div>
                </Slider>
            </div>
        </div>
    )
}

export default Hero