const generateReceivedEmail = (order) => {
  return ` Dear ${
    order.fullName.split(" ")[0]
  }, <br />We have received your payment for order #${
    order._id
  }, and it is currently being processed. We will update you shortly. In the meantime, you can track your order <a href=https://rebirthisland.store/order/${
    order._id
  }>here.</a>
     <br/> Best regards, <br/> The Rebirth Team.`;
};

module.exports = generateReceivedEmail;
