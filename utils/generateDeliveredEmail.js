const generateDeliveredEmail = (order) => {
  const productRows = order.products
    .map(
      (product, i) => `
        <li> ${product.name} - Size: ${product.size}  - Quantity: ${product.quantity} - Price: ₦${product.price}</li>
    `
    )
    .join("");

  return `<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Delivery Confirmation</title>
</head>
<body>
    <p>Dear ${order.fullName.split(" ")[0]},</p>
    <p>We are pleased to inform you that your order <strong>#${
      order._id
    }</strong> has been successfully delivered to the following address:</p>
    <p>${order.address}, ${order.city}, ${order.state}</p>
    <p>Here are the details of your order:</p>
    <table border="1" cellpadding="10" cellspacing="0">
        <tr>
            <th>Order Number</th>
            <td>#${order._id}</td>
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
    <p><strong>Items Delivered:</strong></p>
    <ul>
       ${productRows}
    </ul>
    <p>If you have any questions or concerns about your order, please do not hesitate to contact our customer service team at  <a href="mailto:RebirthIsland7@gmail.com">
              RebirthIsland7@gmail.com
            </a>.</p>
    <p>Thank you for shopping with us!</p>
    <p>Best regards,<br>
   The Rebirth Team.
</body>
</html>`;
};

module.exports = generateDeliveredEmail;
