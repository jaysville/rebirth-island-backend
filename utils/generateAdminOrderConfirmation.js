const generateAdminOrderConfirmation = (order) => {
  const { products } = order;

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
    <title>New Order Notification</title>
</head>
<body>

    <p>We have received a new order on our e-commerce site. Here are the details:</p>
    <table border="1" cellpadding="10" cellspacing="0">
        <tr>
            <th>Order Number</th>
            <td>#${order._id}</td>
        </tr>
        <tr>
            <th>Customer Name</th>
            <td>${order.fullName}</td>
        </tr>
        <tr>
            <th>Customer Email</th>
            <td>${order.email}</td>
        </tr>
         <tr>
            <th>Phone:</th>
            <td>${order.phone}</td>
        </tr>
        <tr>
            <th>Shipping Address</th>
            <td>${order.address}, ${order.city}, ${order.state}</td>
        </tr>
        <tr>
            <th>Order Date</th>
            <td>${new Date(order.createdAt).toLocaleDateString()}</td>
        </tr>

        <tr>
            <th>Total Amount:</th>
            <td>₦${order.totalAmount}</td>
        </tr>
    </table>
    <table >
         <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Size</th>
        </tr>
        ${productRows}
    </table>
</body>
</html>`;
};

module.exports = generateAdminOrderConfirmation;
