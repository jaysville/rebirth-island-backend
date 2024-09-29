const generateOrderConfirmationEmail = (order) => {
  const {
    fullName,
    email,
    phone,
    address,
    city,
    state,
    landmark,
    totalAmount,
    products,
  } = order;

  const productRows = products
    .map(
      (product) => `
      <tr>
        <td>${product.name}</td>
        <td>₦${product.price}</td>
        <td>${product.quantity}</td>
        <td>${product.size}</td>
      </tr>
    `
    )
    .join("");

  return `<html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Order Confirmation</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  margin: 0;
                  padding: 0;
                  background-color: #f4f4f4;
              }
              .container {
                  width: 100%;
                  max-width: 600px;
                  margin: 0 auto;
                  background-color: #ffffff;
                  padding: 20px;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              }
              .header {
                  background-color: #a55fa5;
                  color: white;
                  padding: 10px 0;
                  text-align: center;
              }
              .content {
                  padding: 20px;
              }
              .footer {
                  background-color: #f4f4f4;
                  color: #333;
                  text-align: center;
                  padding: 10px 0;
                  font-size: 12px;
              }
              .order-details {
                  margin: 20px 0;
              }
              .order-details th, .order-details td {
                  text-align: left;
                  padding: 8px;
                  border-bottom: 1px solid #ddd;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="header">
                  <h1>Order Confirmation</h1>
              </div>
              <div class="content">
                  <p>Hi ${fullName.split(" ")[0]},</p>
                  <p>Thank you for your order! We're excited to let you know that we've received your order and it's being processed. Here are the details:</p>
                  <table class="order-details">
                      <tr>
                          <th>Order Number:</th>
                          <td>#${order._id}</td>
                      </tr>
                      <tr>
                          <th>Order Date:</th>
                          <td>${new Date(
                            order.createdAt
                          ).toLocaleDateString()}</td>
                      </tr>
                      <tr>
                          <th> Fullname:</th>
                          <td>${fullName}</td>
                      </tr>
                      <tr>
                          <th>Email:</th>
                          <td>${email}</td>
                      </tr>
                      <tr>
                          <th>Phone:</th>
                          <td>${phone}</td>
                      </tr>
                      <tr>
                          <th>Shipping Address:</th>
                          <td>${address}, ${city}, ${state}</td>
                      </tr>
                      <tr>
                          <th>Landmark:</th>
                          <td>${landmark}</td>
                      </tr>
                      <tr>
                          <th>Total Amount:</th>
                          <td>₦${totalAmount}</td>
                      </tr>
                  </table>
                  <h2>Items Ordered:</h2>
                  <table class="order-details">
                      <tr>
                          <th>Product</th>
                          <th>Price</th>
                          <th>Quantity</th>
                          <th>Size</th>
                      </tr>
                      ${productRows}
                  </table>
                  <p>If you have any questions or need further assistance, please don't hesitate to contact our customer support team.</p>
              </div>
              <div class="footer">
                  <p>© ${new Date().getFullYear()} Rebirth Island. All rights reserved.</p>
              </div>
          </div>
      </body>
    </html>`;
};

module.exports = generateOrderConfirmationEmail;
