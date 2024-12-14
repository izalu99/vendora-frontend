
const StoreFooter = () => {
  return (
    
    <footer
        className="bg-primary-bg text-center text-lg-start"
        style={{ marginTop: 200 }}
    >
        {/* Grid container */}
        <div className="container p-4">
            <div className="row">
                <div className="col-md-6 mb-4 mb-md-0 d-flex justify-content-center justify-content-md-start align-items-center">
                    <strong>Get connected with us on social networks </strong>
                </div>
                <div className="col-md-6 d-flex justify-content-center justify-content-md-end">
                    {/* Facebook */}
                    <a
                        className="btn btn-primary btn-sm btn-floating me-2"
                        style={{ backgroundColor: "#3b5998" }}
                        href="https://www.facebook.com/login/"
                        target="_blank"
                        role="button"
                    >
                        <i className="fab fa-facebook-f" />
                    </a>
                    {/* Pinterest */}
                    <a
                        className="btn text-white btn-sm btn-floating me-2"
                        style={{ backgroundColor: "#c61118" }}
                        href="https://ca.pinterest.com/login/"
                        target="_blank"
                        role="button"
                    >
                        <i className="fab fa-pinterest" />
                    </a>
                    {/* Youtube */}
                    <a
                        className="btn text-white btn-sm btn-floating me-2"
                        style={{ backgroundColor: "#ed302f" }}
                        href="https://www.youtube.com/"
                        target="_blank"
                        role="button"
                    >
                        <i className="fab fa-youtube" />
                        
                    </a>
                    {/* Instagram */}
                    <a
                        className="btn text-white btn-sm btn-floating me-2"
                        style={{ backgroundColor: "#ac2bac" }}
                        href="https://www.instagram.com/"
                        role="button"
                        target="_blank"
                    >
                        <i className="fab fa-instagram" />
                    </a>
                </div>
            </div>
            <hr className="my-3" />
            <div className="row">
                <div className="col-lg-6 mb-4 mb-lg-0">
                    <p>
                        <strong>About us</strong>
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste atque
                        ea quis molestias. Fugiat pariatur maxime quis culpa corporis vitae
                        repudiandae aliquam voluptatem veniam, est atque cumque eum delectus
                        sint!
                    </p>
                </div>
                <div className="col-lg-3 mb-4 mb-lg-0">
                    <p>
                        <strong>Useful links</strong>
                    </p>
                    <ul className="list-unstyled mb-0">
                        <li>
                            <a href="#!" className="text-dark">
                                Privacy policy
                            </a>
                        </li>
                        <li>
                            <a href="#!" className="text-dark">
                                Media
                            </a>
                        </li>
                        <li>
                            <a href="#!" className="text-dark">
                                Job offers
                            </a>
                        </li>
                        <li>
                            <a href="#!" className="text-dark">
                                Cooperation
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="col-lg-3 mb-4 mb-lg-0">
                    <p>
                        <strong>Support</strong>
                    </p>
                    <ul className="list-unstyled">
                        <li>
                            <a href="#!" className="text-dark">
                                Complaints
                            </a>
                        </li>
                        <li>
                            <a href="#!" className="text-dark">
                                Help center
                            </a>
                        </li>
                        <li>
                            <a href="#!" className="text-dark">
                                Community
                            </a>
                        </li>
                        <li>
                            <a href="#!" className="text-dark">
                                FAQ
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div className="text-center p-3 bg-primary-bg">
            © 2024 - Date Copyright: 
            <a className="text-dark" href="#!">
                Vendora
            </a>
        </div>
        {/* Copyright */}
    </footer>

  )
}

export default StoreFooter
