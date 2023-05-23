import React from 'react'

export default function Caroursel() {
    return (
        <div>
            <div id="carouselExampleFade" className="carousel slide carousel-fade" style={{ objectFit: "contain !important" }}>
                <div className="carousel-inner" id='carousel'>
                    <div className="carousel-caption d-none d-md-block" style={{ zIndex: "10" }}>
                        <form className="d-flex" role="search">
                            <input className="form-control me-2 outline-danger" type="search" placeholder="Search meal here" aria-label="Search" />
                            <button className="btn btn-outline-danger text-white" type="submit">Search</button>
                        </form>
                    </div>
                    <div className="carousel-item active">
                        <img src="http://source.unsplash.com/random/900x700/?burger" className="d-block w-100" alt="..." style={{ filter: "brightness(50%)" }} />
                    </div>
                    <div className="carousel-item">
                        <img src="http://source.unsplash.com/random/900x700/?pizza" className="d-block w-100" alt="..." style={{ filter: "brightness(50%)" }} />
                    </div>
                    <div className="carousel-item">
                        <img src="http://source.unsplash.com/random/900x700/?pasta" className="d-block w-100" alt="..." style={{ filter: "brightness(50%)" }} />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    )
}
