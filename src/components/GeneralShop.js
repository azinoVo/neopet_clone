import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';


const GeneralShop = ({ shop, user, prices }) => {
    const [gameShop, setShop] = useState([])
    const [userInfo, setUser] = useState({})
    const [shopPrices, setPrices] = useState({})


    useEffect(() => {
        console.log("shop", shop)
        setShop(shop)
    }, [shop])

    useEffect(() => {
        console.log("user", user)
        setUser(user)
    }, [user])

    useEffect(() => {
        console.log("prices", prices)
        setPrices(prices)
    }, [prices])


    return (
        <section className='main-content'>
            <div className='shop-header'>Welcome to the Shop</div>
            <div className='general'>
                <div className='user-info'>
                    <span>Mana Essence Amount: {userInfo.currency}</span>
                </div>
                <ul className='shop-list'>
                    <li style={{"text-decoration": "underline"}}>
                        <span>Item</span>
                        <span>Inventory Amount</span>
                        <span>Price</span>
                        <span>Buy Item</span>
                        <span>Sell Item</span>
                    </li>
                    {
                        gameShop.map((item, index) => {
                            return <li className='shop-item' key={`shopItem${index}`}>
                                <span>itemIcon {item}</span>
                                <span>x Inventory Amount</span>
                                <span>{shopPrices[item]}</span>
                                <button>Buy</button>
                                <button>Sell</button>
                            </li>
                        })
                    }
                </ul>
            </div>
        </section>
    );
}

const mapStateToProps = state => ({
    shop: state.game.shop,
    prices: state.game.shopPrices,
    user: state.user
});

export default connect(mapStateToProps, {})(GeneralShop);
