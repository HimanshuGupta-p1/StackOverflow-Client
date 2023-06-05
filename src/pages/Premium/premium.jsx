import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useSelector } from 'react-redux';
import './premium.css'
import axios from 'axios'
import logo from '../../assests/favicon.png'
import free from '../../assests/free.png'
import silver from '../../assests/silver.jpg'
import gold from '../../assests/gold.png'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar';
const Premium = () => {
  var currentUser = useSelector((state) => (state.currentUserReducer))
  const checkoutHandler = async (amount, type) => {

    const { data: { key } } = await axios.get("https://stack-overflow-server-oze7.onrender.com/api/getkey")

    const { data: { order } } = await axios.post(`https://stack-overflow-server-oze7.onrender.com/api/checkout/${currentUser?.result?._id}`, {
      amount
    })

    const options = {
      key,
      amount: order.amount,
      currency: "INR",
      name: "Stack Overflow",
      description: "Tutorial of RazorPay",
      image: logo,
      order_id: order.id,
      callback_url: `https://stack-overflow-server-oze7.onrender.com/api/paymentverification/${currentUser?.result?._id}`,
      prefill: {
        name: "Stack Overflow",
        email: "stackoverflow_p1@example.com",
        contact: "9999999999"
      },
      notes: {
        "address": "Razorpay Corporate Office"
      },
      theme: {
        "color": "#0352fc"
      }
    };
    const razor = new window.Razorpay(options);
    razor.open();
  }
  return (
    <div className='home-container-1'>
      <LeftSidebar/>
      <div className='premium'>
      <div>
        <Card style={{ width: '10rem', textAlign: 'center', padding: '100px' }}>
          <Card.Img variant="top" src={free} />
          <Card.Body>
            <Card.Title><b>FREE</b></Card.Title>
            <Card.Text>
              <h3>Free</h3>
              Ask 1 Question per day
            </Card.Text>
            <Button variant="primary">Free</Button>
          </Card.Body>
        </Card>
      </div>
      <div>

        <Card style={{ width: '10rem', textAlign: 'center', padding: '100px' }}>
          <Card.Img variant="top" src={silver} />
          <Card.Body>
            <Card.Title><b>SILVER</b></Card.Title>
            <Card.Text>
              <h3>Rs. 500/month</h3>
              <br />
              Ask 5 Questions per day
            </Card.Text>
            <Button variant="primary" onClick={() => checkoutHandler('500', 'Silver')}>Buy Silver</Button>
          </Card.Body>
        </Card>
      </div>
      <div>

        <Card style={{ width: '10rem', textAlign: 'center', padding: '100px' }}>
          <Card.Img variant="top" src={gold} />
          <Card.Body>
            <Card.Title><b>GOLD</b></Card.Title>
            <Card.Text>
              <h3>Rs. 1000/month</h3><br />
              Ask unlimited questions per day
            </Card.Text>
            <Button variant="primary" onClick={() => checkoutHandler('1000', 'Premium')}>Buy Gold</Button>
          </Card.Body>
        </Card>
      </div>
    </div>
    </div>

  )
}

export default Premium