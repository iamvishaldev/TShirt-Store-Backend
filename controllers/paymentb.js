var braintree = require("braintree");

var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: "jykykdrrfvpmgn2b",
  publicKey: "m3mjqwnsjmy5w69t",
  privateKey: "bc8c96b4d08b3986a3708c60086df81e",
});

exports.getToken = (req, res) => {
  console.log("getToken");
  gateway.clientToken.generate({}, function (err, response) {
    if (err) {
      console.log("err", err);
      res.status(500).send(err);
    } else {
      res.send(response);
    }
  });
};

exports.processPayment = (req, res) => {
  let nonceFromTheClient = req.body.paymentMethodNonce;

  let amountFromTheClient = req.body.amount;
  gateway.transaction.sale(
    {
      amount: amountFromTheClient,
      paymentMethodNonce: nonceFromTheClient,
      options: {
        submitForSettlement: true,
      },
    },
    function (err, result) {
      if (err) {
        res.status(500).json(err);
      } else {
        res.json(result);
      }
    }
  );
};
