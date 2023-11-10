const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const stripe = require("stripe")(
  "sk_test_51NNYyrG4UbGwE58sxWScGH69CjjgyCBwSuyB0lO6wtvJ0r5ekVhKIP30Wblhc0ganhsgsFqqq9qCOrZvJ7cjMfDu00v5xkxTrS"
);
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurarea transportatorului Nodemailer
const transporter = nodemailer.createTransport({
  host: "smtp.hostinger.com", // De exemplu: 'smtp.example.com'
  port: 465, // De exemplu: 465 pentru SSL sau 587 pentru TLS
  secure: true, // true pentru 465 (SSL), false pentru alte porturi (ca 587 pentru TLS)
  auth: {
    user: "test@vkucode.com",
    pass: "testVkucode!2023",
  },
});

app.post("/send-email", (req, res) => {
  const { name, phoneNumber, email, comment } = req.body;

  const mailOptions = {
    from: "test@vkucode.com",
    to: "vkudesign@gmail.com",
    subject: "Nouveau message du website a part de " + name,
    text: `
      Nom: ${name}
      Telephone: ${phoneNumber}
      Email: ${email}
      Commentaire: ${comment || "N/A"}
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.json({
        success: false,
        message: "Erreur lors de l'envoi du message.",
      });
    } else {
      console.log("Email sent: " + info.response);
      res.json({
        success: true,
        message: "Le message a été envoyé avec succès !",
      });
    }
  });
});

app.post("/checkout", async (req, res) => {
  try {
    const { lineItems, productDetails } = req.body;
    const session = await stripe.checkout.sessions.create({
      shipping_address_collection: {
        allowed_countries: ["FR"],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 0,
              currency: "eur",
            },
            display_name: "Récupérer au dépôt",
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 1,
              },
              maximum: {
                unit: "business_day",
                value: 3,
              },
            },
            tax_behavior: "exclusive", // Adăugat acest câmp
          },
        },
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 1500,
              currency: "eur",
            },
            display_name: "Livraison Ile de France",
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 1,
              },
              maximum: {
                unit: "business_day",
                value: 2,
              },
            },
            tax_behavior: "exclusive", // Adăugat acest câmp
          },
        },
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 4000,
              currency: "eur",
            },
            display_name: "Livraison dans toute la France",
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 1,
              },
              maximum: {
                unit: "business_day",
                value: 7,
              },
            },
            tax_behavior: "exclusive", // Adăugat acest câmp
          },
        },
      ],
      line_items: lineItems,
      automatic_tax: {
        enabled: false,
      },
      invoice_creation: {
        enabled: true,
      },
      phone_number_collection: {
        enabled: true,
      },
      mode: "payment",
      payment_method_types: ["card"],
      success_url:
        "https://persosac.fr/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "https://persosac.fr/cancel",
      metadata: { productDetails: JSON.stringify(productDetails) },
    });

    return res.status(201).json(session);
  } catch (error) {
    return res.status(500).json(error);
  }
});

app.post("/email-confirmation", async (req, res) => {
  const session_id = req.body.session_id;
  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);
    const customerDetails = session.customer_details;
    const productDetails = JSON.parse(session.metadata.productDetails); // Recuperați detaliile produselor din metadata
    const productsPurchased = productDetails
      .map((item) => `${item.name}: €${item.price} x ${item.quantity}`)
      .join("<br />");
    const totalAmount = session.amount_total / 100;
    const shippingCost = session.total_details.amount_shipping / 100;
    const shippingMethod =
      shippingCost === 0 ? "Colectare la depozit" : "Livraison";

    const htmlTemplate = `
      <html>
      <body>
        <h1>Détails de paiement</h1>
        <p>Nom de l'acheteur: ${customerDetails.name}</p>
        <p>Produits achetés:<br />${productsPurchased}</p>
        <p>Le montant payé: €${totalAmount}</p>
        <p>Adresse email de l'acheteur: ${customerDetails.email}</p>
        <p>Type de paiement: CB</p>
        <p>Numéro de téléphone: ${customerDetails.phone}</p>
        <p>Méthode de livraison: ${shippingMethod}</p>
        <p>Adresse de livraison du client: ${customerDetails.address.line1}, ${customerDetails.address.city}, ${customerDetails.address.country}</p>
      </body>
      </html>
    `;

    // Trimiteți e-mailul către client
    let mailOptions = {
      from: "test@vkucode.com",
      to: customerDetails.email,
      subject: "Détails de paiement",
      html: htmlTemplate,
    };
    await transporter.sendMail(mailOptions);

    // Trimiteți e-mailul către furnizor
    mailOptions = {
      from: "test@vkucode.com",
      to: "test@vkucode.com",
      subject: "Nouveaux détails d'achat",
      html: htmlTemplate,
    };
    await transporter.sendMail(mailOptions);

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// starting server
const port = 3000;
app.listen(port, () => console.log("Server is running successfully"));
