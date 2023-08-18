import Stripe from 'stripe'

import config from '../../config.js'

const {
    stripeSecret
} = config

export default class PaymentService {
  constructor () {
    this.stripe = new Stripe("sk_test_51Na5VlJAG8C77VQOdHjwskTarOqTpORscxLPF7n47mJ0lLGsKqXCz3uMY4XiRGw9qVxlcvnlZT5PVrIdtYafQ83S00LAuGnkYz")
  }

 createPaymentIntent=async (data)=>{
    const paymentIntent = await this.stripe.paymentIntents.create(data);
    return paymentIntent;
 }
  calculateOrderAmount = (products) => {
    let total = 0
    products.forEach((prod) => {
      const { productId, quantity } = prod
      const { price } = productId
      total += price * quantity
    })
    return total * 100
  }

  createPaymentIntent = async (products, email) => {
    const orderDetails = JSON.stringify(
      products.reduce((acc, item) => {
        acc[item.productId.title] = item.quantity
        return acc
      }, {}),
      null,
    )

    const paymentIntentInfo = {
      amount: this.calculateOrderAmount(products),
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true
      },
      metadata: {
        user: email,
        orderDetails
      }
    }

    const paymentIntent = await this.stripe.paymentIntents.create(
      paymentIntentInfo
    )
    return paymentIntent
  }
}