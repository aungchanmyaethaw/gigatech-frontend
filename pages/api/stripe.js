const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function stripeHandler(req, res) {
  if (req.method === "POST") {
    try {
      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        payment_method_types: ["card"],
        shipping_address_collection: {
          allowed_countries: ["MM", "SG", "US", "TH"],
        },
        line_items: req.body.map((item) => {
          return {
            price_data: {
              currency: "usd",
              product_data: {
                name: item.productName,
                images: [
                  item.productImage.data[0].attributes.formats.small.url,
                ],
              },
              unit_amount: item.productPrice * 100,
            },
            quantity: item.qty,
          };
        }),
        success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/canceled`,
      });
      res.status(200).json(session);
    } catch (e) {
      console.log(e.message);
      res.status(e.statusCode || 500).json(e.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method not allowed.");
  }
}
