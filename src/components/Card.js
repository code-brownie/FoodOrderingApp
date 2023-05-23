import React, { useRef, useState, useEffect } from 'react';
import { useCart, useDispatchCart } from './ContextReducer';
export default function Card(props) {
    const foodItem = props.foodItems;
    let option = props.food_option;
    let priceOption = option ? Object.keys(option) : [];
    let priceRef = useRef();
    const [Qty, setQty] = useState(1);
    const [size, setSize] = useState("");
    let dispatch = useDispatchCart();
    const data = useCart();
    let finalprice = Qty * parseInt(option[size]);
    const handleCart = async () => {
        let food = [];
        for (const item of data) {
            if (item.id === foodItem._id) {
                food = item;
                break;
            }
        }
        if (food !== []) {
            if (food.size === size) {
                await dispatch({ type: 'UPDATE', id: foodItem._id, Qty: Qty, price: finalprice });
                return
            }

            else if (food.size !== size) {
                await dispatch({ type: 'ADD', img: foodItem.img, id: foodItem._id, name: foodItem.name, Qty: Qty, size: size, price: finalprice });
                console.log(data);
                return
            }
            return
        }
        await dispatch({ type: 'ADD', img: foodItem.img, id: foodItem._id, name: foodItem.name, Qty: Qty, size: size, price: finalprice });

    }
    useEffect(() => {
        setSize(priceRef.current.value);
    }, [])

    return (
        <div>
            <div className="card mt-3 text-danger" style={{ width: "18rem" }}>
                <img src={foodItem.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }}
                />
                <div className="card-body bg-danger text-white">
                    <h5 className="card-title">{foodItem.name}</h5>
                    <div className="container w-100 p-0" style={{ height: "38px" }}>
                        <select className="m-2 h-100 bg-light" onChange={(e) => { setQty(e.target.value) }}>
                            {Array.from(Array(6), (e, i) => {
                                return (
                                    <option key={i + 1} value={i + 1}>
                                        {i + 1}
                                    </option>
                                );
                            })}
                        </select>
                        <select className="m-2 h-100 w-20  bg-light rounded" ref={priceRef} onChange={(e) => { setSize(e.target.value) }}>
                            {priceOption.map((data) => {
                                return (
                                    <option key={data} value={data}>
                                        {data}
                                    </option>
                                );
                            })}
                        </select>
                        <div className="d-inline ms-2 w-20 h-100 fs-5"> ₹{finalprice}/- </div>
                    </div>
                    <hr />
                    <button className='btn bg-white text-danger justify-centre ms-2' onClick={handleCart}>Add <i className="fa-solid fa-plus"></i></button>
                </div>
            </div>
        </div>
    );
}
