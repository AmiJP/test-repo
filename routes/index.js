var express = require("express");
var router = express.Router();
const stripe = require("stripe")("sk_test_rZUEERoYPoYnYVGlGJxAVpO5");

/* GET home page. */
router.get("/", function (req, res, next) {
  const { success, canceled } = req.query;
  res.render("index", { success, canceled });
});

router.post("/create-checkout-session", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: "price_1N7lm4Gp55QVLpbm14jWowlJ",
        quantity: 1,
      },
    ],
    mode: "subscription",
    success_url: `http://localhost:3000?success=true`,
    cancel_url: `http://localhost:3000?canceled=true`,
  });

  res.redirect(303, session.url);
});

router.post("/create-customer-portal-session", async (req, res) => {
  // Authenticate your user.
  const session = await stripe.billingPortal.sessions.create({
    customer: "cus_O6jnegVEpcvEJL",
    return_url: "http://localhost:3000",
  });

  res.redirect(session.url);
});

module.exports = router;
