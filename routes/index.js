var express = require("express");
var router = express.Router();
const stripe = require("stripe")("sk_test_rZUEERoYPoYnYVGlGJxAVpO5");

/* GET home page. */
router.get("/", function (req, res, next) {
  const { success, canceled } = req.query;
  res.render("index", { success, canceled });
});

router.post("/create-checkout-session", async (req, res) => {
  const baseUrl = `https://${req.get("host")}`;
  console.log(baseUrl);
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: "price_1N7lm4Gp55QVLpbm14jWowlJ",
        quantity: 1,
      },
    ],
    mode: "subscription",
    success_url: `${baseUrl}?success=true`,
    cancel_url: `${baseUrl}?canceled=true`,
  });

  res.redirect(303, session.url);
});

router.post("/create-customer-portal-session", async (req, res) => {
  const baseUrl = `https://${req.get("host")}`;
  // Authenticate your user.
  const session = await stripe.billingPortal.sessions.create({
    customer: "cus_O6jnegVEpcvEJL",
    return_url: baseUrl,
  });

  res.redirect(session.url);
});

module.exports = router;
