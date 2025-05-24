const express = require("express");
const cors = require("cors");
require("dotenv").config();
const sgMail = require("@sendgrid/mail");
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;
require("./models/dataBase");

app.use(cors());
app.use(express.json());

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/api/post", require("./routes/postNews"));
app.use("/api/services",require("./routes/productServices"))
app.use('/api/page-content', require('./routes/pageContentRoutes'));
app.use("/role", require("./routes/role"));
app.use("/brands", require("./routes/brand"));
app.use("/customers", require("./routes/Customers"));
app.use("/user",require("./routes/user"))
app.use((req, res) => res.status(404).json("NO content at this path"));

// Configure SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Contact form endpoint
app.post("/api/contact", async (req, res) => {
  try {
    const { firstName, lastName, mobile, email, message } = req.body;

    // Save contact info to Firestore
    await db.collection("contacts").add({
      firstName,
      lastName,
      mobile,
      email,
      message,
      createdAt: admin.firestore.Timestamp.now(),
    });

    // Auto-reply email using SendGrid
    const mailOptions = {
      to: email,
      from: process.env.SENDGRID_SENDER_EMAIL, // Must be verified in SendGrid
      subject: "Thank You for Contacting Us",
      text: `Hello ${firstName},\n\nThank you for reaching out! We will get back to you shortly.\n\nBest Regards,\nYour Company`,
    };

    await sgMail.send(mailOptions);

    res.status(200).json({ message: "Contact form submitted and email sent successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});


app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
