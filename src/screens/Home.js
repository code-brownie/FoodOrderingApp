import React from 'react';
import Navbar from '../components/Navbar';
import Footers from '../components/Footers';
import Card from '../components/Card';
import { useEffect, useState } from 'react';

export default function Home(props) {
    const { showAlerts } = props;
    const [meal, setMeal] = useState('');

    const [foodCategory, setfoodCategory] = useState([]);
    const [foodItems, setfoodItems] = useState([]);

    const loadData = async () => {
        let response = await fetch("http://localhost:5000/api/foodData", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        response = await response.json();
        setfoodItems(response[0]);
        setfoodCategory(response[1]);
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div>
            <div>
                <Navbar showAlerts={showAlerts} />
            </div>
            <div>
                <div id="carouselExampleFade" className="carousel slide carousel-fade" style={{ objectFit: "contain !important" }}>
                    <div className="carousel-inner" id='carousel'>
                        <div className="carousel-caption d-none d-md-block" style={{ zIndex: "10" }}>
                            <div className="d-flex" role="search">
                                <input className="form-control me-2 outline-danger" value={meal} type="search" placeholder="Search meal here" aria-label="Search" onChange={(e) => { setMeal(e.target.value) }} />
                                {/* <button className="btn btn-outline-danger text-white" type="submit">Search</button> */}
                            </div>
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
            <div className="container">
                {foodCategory !== [] &&
                    foodCategory.map((data) => {
                        return (
                            <div className='row mb-3'>
                                <div key={data._id} className='fs-3 m-3'>{data.CategoryName}</div>
                                <hr />
                                {foodItems !== [] ? (
                                    foodItems
                                        .filter((items) => (items.CategoryName === data.CategoryName) && items.name.toLowerCase().includes(meal.toLocaleLowerCase()))
                                        .map((filterItems) => {
                                            return (
                                                <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                                                    <Card foodItems={filterItems}
                                                        food_option={filterItems.options[0]} />
                                                </div>
                                            );
                                        })
                                ) : (
                                    <div>No such Data found</div>
                                )}
                            </div>
                        );
                    })}
            </div>
            <div>
                <Footers />
            </div>
        </div>
    );
}
