

// import Stripe from "stripe";
// import Order from "../model/orderModel.js";
// import User from "../model/userModel.js";
// import Razorpay from "razorpay";
// import dotenv from "dotenv";

// dotenv.config();
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
// console.log("Stripe Key:", process.env.STRIPE_SECRET_KEY);


// const razorpayInstance = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// })



// export const placeOrder = async (req, res) => {
//   try {
//     const { items, amount, address, paymentMethod } = req.body;
//     const userId = req.userId;
//     const orderData = {
//       userId,
//       items,
//       amount,
//       address,
//       paymentMethod: paymentMethod || 'COD',
//       payment: false,
//       date: Date.now()
//     }
//     const newOrder = new Order(orderData);
//     await newOrder.save();
//     await User.findByIdAndUpdate(userId, { cartData: {} });
//     return res.status(201).json({ message: "Order Placed Successfully", orderId: newOrder._id })
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Order Place Error", error: error.message })
//   }
// }

// // export const userOrders = async (req, res) => { //Order place ho gaya ✔️ ya nhi 
// //   try {
// //     const userId = req.userId;

// //     const orders = await Order.find({ userId }).sort({ createdAt: -1 });

// //     res.status(200).json({ orders });
// //   } catch (error) {
// //     res.status(500).json({ message: "Failed to fetch orders" });
// //   }
// // };

// export const userOrders = async (req, res) => {
//   try {
//     const userId = req.userId

//     const orders = await Order.find({ userId })
//       .sort({ createdAt: -1 })

//     res.status(200).json(orders)
//   } catch (error) {
//     console.log(error)
//     res.status(500).json({ message: "Failed to fetch orders" })
//   }
// }

// //for admin

// export const allOrders = async (req, res) => {
//   try {
//     const orders = await Order.find({}); // fetch all orders from DB
//     res.status(200).json({
//       success: true,
//       data: orders,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch orders",
//       error: error.message,
//     });
//   }
// };



// export const updateStatus = async (req, res) => {
//   try {
//     // const { id } = req.params; // order ID from URL
//     const { status, orderId } = req.body; // new status from request body

//     if (!status) {
//       return res.status(400).json({ success: false, message: "Status is required" });
//     }

//     if (!orderId) {
//       return res.status(404).json({ success: false, message: "Order id not found" });
//     }

//     const order = await Order.findByIdAndUpdate(orderId, { status });




//     res.status(201).json({
//       success: true,
//       message: "Order status updated successfully",
//       data: order,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to update order status",
//       error: error.message,
//     });
//   }
// };


// export const placeOrderRazorpay = async (req, res) => {
//   try {
//     const { items, amount, address } = req.body;
//     const userId = req.userId;

//     const newOrder = await Order.create({
//       items,
//       amount,
//       userId,
//       address,
//       paymentMethod: "Razorpay",
//       payment: false,
//       date: Date.now(),
//     });

//     const options = {
//       amount: Math.round(amount * 100), // 👈 ROUND KARO (decimal hatao)
//       currency: "INR",
//       receipt: newOrder._id.toString(),
//     };

//     const razorpayOrder = await razorpayInstance.orders.create(options);

//     return res.status(200).json({
//       success: true,
//       order: razorpayOrder,
//     });

//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // export const verifyRazorpay = async(req, res)=>{
// // try {
// //   const userId = req.userId
// //   const {razorpay_order_id} = req.body
// //   const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
// //    if (!razorpay_order_id) {
// //       return res.status(400).json({ 
// //         success: false, 
// //         message: "razorpay_order_id missing" 
// //       });
// //     }
// //   if(orderInfo.status == 'paid'){
// //     await Order.findByIdAndUpdate(orderInfo.receipt,{payment: true});
// //     res.status(200).json({message: 'Payment Successful'})
// //   }
// //   else{
// //     res.json({message: "Payment Failed"});
// //   }
// // } catch (error) {
// //   console.log(error);
// //   res.status(500).json({message: error.message})
// // }
// // }

// export const verifyRazorpay = async (req, res) => {
//   try {
//     console.log("=== VERIFY RAZORPAY CALLED ===");
//     console.log("Request Body:", req.body);
//     console.log("User ID:", req.userId);

//     const userId = req.userId;
//     const { razorpay_order_id } = req.body;

//     if (!razorpay_order_id) {
//       console.log("ERROR: Order ID missing!");
//       return res.status(400).json({
//         success: false,
//         message: "razorpay_order_id missing"
//       });
//     }

//     console.log("Fetching order from Razorpay:", razorpay_order_id);
//     const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
//     console.log("Order Info:", orderInfo);
//     console.log("Order Status:", orderInfo.status);

//     if (orderInfo.status === 'paid') {
//       await Order.findByIdAndUpdate(orderInfo.receipt, { payment: true });
//       res.status(200).json({ success: true, message: "Payment Successful" });
//     } else {
//       res.status(400).json({ success: false, message: "Payment Failed" });
//     }
//   } catch (error) {
//     console.log("=== RAZORPAY VERIFY ERROR ===");
//     console.log("Error:", error);
//     return res.status(500).json({
//       success: false,
//       message: error.message
//     });
//   }
// }
// export const placeOrderStripe = async (req, res) => {
//   try {
//     const { items, amount, address } = req.body;
//     const userId = req.userId;

//     const orderData = {
//       items,
//       amount,
//       userId,
//       address,
//       paymentMethod: "Stripe",
//       payment: false,
//       date: Date.now(),
//     };

//     const newOrder = new Order(orderData);
//     await newOrder.save();

//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: amount * 100, // paisa *100
//       currency: "inr",
//       metadata: {
//         orderId: newOrder._id.toString(),
//       },
//     });

//     res.json({
//       success: true,
//       clientSecret: paymentIntent.client_secret,
//     });

//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };



import Stripe from "stripe";
import Order from "../model/orderModel.js";
import User from "../model/userModel.js";
import Razorpay from "razorpay";
import dotenv from "dotenv";

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
})

export const placeOrder = async (req, res) => {
  try {
    const { items, amount, address, paymentMethod } = req.body;
    const userId = req.userId;

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: paymentMethod || 'COD',
      payment: false,
      date: Date.now()
    }

    const newOrder = new Order(orderData);
    await newOrder.save();
    await User.findByIdAndUpdate(userId, { cartData: {} });

    return res.status(201).json({
      success: true,
      message: "Order Placed Successfully",
      orderId: newOrder._id
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Order Place Error", error: error.message })
  }
}

export const userOrders = async (req, res) => {
  try {
    const userId = req.userId

    const orders = await Order.find({ userId })
      .sort({ createdAt: -1 })

    res.status(200).json(orders)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Failed to fetch orders" })
  }
}

export const allOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { status, orderId } = req.body;

    if (!status) {
      return res.status(400).json({ success: false, message: "Status is required" });
    }

    if (!orderId) {
      return res.status(404).json({ success: false, message: "Order id not found" });
    }

    const order = await Order.findByIdAndUpdate(orderId, { status });

    res.status(201).json({
      success: true,
      message: "Order status updated successfully",
      data: order,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to update order status",
      error: error.message,
    });
  }
};

export const placeOrderRazorpay = async (req, res) => {
  try {
    const { items, amount, address } = req.body;
    const userId = req.userId;

    const newOrder = await Order.create({
      items,
      amount,
      userId,
      address,
      paymentMethod: "Razorpay",
      payment: false,
      date: Date.now(),
    });

    // Convert to integer paise and round
    const amountInPaise = Math.round(amount * 100);

    const options = {
      amount: amountInPaise,
      currency: "INR",
      receipt: newOrder._id.toString(),
    };

    console.log("=== RAZORPAY ORDER CREATION ===");
    console.log("Amount (Rupees):", amount);
    console.log("Amount (Paise):", amountInPaise);
    console.log("Receipt ID:", newOrder._id.toString());

    const razorpayOrder = await razorpayInstance.orders.create(options);

    console.log("Razorpay Order Created:", razorpayOrder.id);

    return res.status(200).json({
      success: true,
      order: razorpayOrder,
    });

  } catch (error) {
    console.log("=== RAZORPAY ORDER ERROR ===");
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const verifyRazorpay = async (req, res) => {
  try {
    console.log("=== VERIFY RAZORPAY CALLED ===");
    console.log("Request Body:", req.body);
    console.log("User ID:", req.userId);

    const userId = req.userId;
    const { razorpay_order_id } = req.body;

    if (!razorpay_order_id) {
      console.log("ERROR: Order ID missing!");
      return res.status(400).json({
        success: false,
        message: "razorpay_order_id missing"
      });
    }

    console.log("Fetching order from Razorpay:", razorpay_order_id);
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

    console.log("Order Info:", orderInfo);
    console.log("Order Status:", orderInfo.status);

    if (orderInfo.status === 'paid') {
      await Order.findByIdAndUpdate(orderInfo.receipt, { payment: true });
      await User.findByIdAndUpdate(userId, { cartData: {} });

      console.log("Payment Verified Successfully!");

      return res.status(200).json({
        success: true,
        message: 'Payment Successful'
      });
    } else {
      console.log("Payment not completed. Status:", orderInfo.status);
      return res.status(400).json({
        success: false,
        message: "Payment Failed or Pending"
      });
    }
  } catch (error) {
    console.log("=== RAZORPAY VERIFY ERROR ===");
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
}

// export const placeOrderStripe = async (req, res) => {
//   try {
//     const { items, amount, address } = req.body;
//     const userId = req.userId;

//     const orderData = {
//       items,
//       amount,
//       userId,
//       address,
//       paymentMethod: "Stripe",
//       payment: false,
//       date: Date.now(),
//     };

//     const newOrder = new Order(orderData);
//     await newOrder.save();

//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: Math.round(amount * 100),
//       currency: "inr",
//       metadata: {
//         orderId: newOrder._id.toString(),
//       },
//     });

//     res.json({
//       success: true,
//       clientSecret: paymentIntent.client_secret,
//     });

//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };






// export const placeOrderStripe = async (req, res) => {
//   try {
//     const { items, amount, address } = req.body;
//     const userId = req.userId;

//     // Create order in database FIRST
//     const newOrder = await Order.create({
//       items,
//       amount,
//       userId,
//       address,
//       paymentMethod: "Stripe",
//       payment: false,
//       date: Date.now(),
//     });

//     // Create Stripe session
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ['card'],
//       line_items: [{
//         price_data: {
//           currency: "inr",
//           product_data: {
//             name: `Order #${newOrder._id.toString().slice(-6)}`,
//             images: items[0]?.image ? [items[0].image[0]] : [],
//           },
//           unit_amount: Math.round(amount * 100),
//         },
//         quantity: 1,
//       }],
//       mode: 'payment',
// success_url: `${process.env.FRONTEND_URL}/success?order_id=${newOrder._id}`,
//       cancel_url: `${process.env.FRONTEND_URL}/cancel`,
//       metadata: {
//         orderId: newOrder._id.toString()
//       }
//     });

//     res.json({ success: true, url: session.url, orderId: newOrder._id });
//   } catch (error) {
//     console.log("Stripe Error:", error);
//     res.status(500).json({ success: false, error: error.message });
//   }
// }


export const placeOrderStripe = async (req, res) => {
  try {
    const { items, address } = req.body;
    const userId = req.userId;

    // 1️⃣ Calculate subtotal and GST
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const gst = subtotal * 0.18;
    const totalAmount = subtotal + gst;
    const totalAmountInPaisa = Math.round(totalAmount * 100);

    // 2️⃣ Create order in DB
    const newOrder = await Order.create({
      items,
      amount: totalAmount, // store amount with GST
      userId,
      address,
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now(),
    });

    // 3️⃣ Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: items.map(item => ({
        price_data: {
          currency: "inr",
                   product_data: {
            name: `Order #${newOrder._id.toString().slice(-6)}`,
            images: items[0]?.image ? [items[0].image[0]] : [],
          },
          // Amount per item + GST distributed proportionally
          unit_amount: Math.round((item.price + item.price * 0.18) * 100),
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/success?order_id=${newOrder._id}`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
      metadata: { orderId: newOrder._id.toString() },
    });

    res.json({ success: true, url: session.url, orderId: newOrder._id });
  } catch (error) {
    console.log("Stripe Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};
// export const placeOrderStripe = async (req, res) => {
//   try {
//     const { items, address } = req.body;
//     const userId = req.userId; // must come from verified JWT

//     // ✅ Calculate amount on backend
//     const amount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
//     const totalAmount = Math.round(amount * 100); // Stripe expects cents

//     // ✅ Create order in DB
//     const newOrder = await Order.create({
//       items,
//       amount,
//       userId,
//       address,
//       paymentMethod: "Stripe",
//       payment: false,
//       date: Date.now(),
//     });

//     // ✅ Create Stripe checkout session with all items
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items: items.map(item => ({
//         price_data: {
//           currency: "usd",
//           product_data: {
//             name: item.name,
//             images: [item.imageUrl], // must be absolute URL
//           },
//           unit_amount: Math.round(item.price * 100),
//         },
//         quantity: item.quantity,
//       })),
//       mode: "payment",
//       success_url: `${process.env.FRONTEND_URL}/success?order_id=${newOrder._id}`,
//       cancel_url: `${process.env.FRONTEND_URL}/cancel`,
//       metadata: { orderId: newOrder._id.toString() },
//     });

//     res.json({ success: true, url: session.url, orderId: newOrder._id });
//   } catch (error) {
//     console.log("Stripe Error:", error);
//     res.status(500).json({ success: false, error: error.message });
//   }
// };