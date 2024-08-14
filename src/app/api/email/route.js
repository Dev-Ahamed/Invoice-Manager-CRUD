import nodemailer from "nodemailer";
import * as handlebars from "handlebars";
import { NextResponse } from "next/server";
import { InvoiceTemplate } from "@/lib/emailTemplate/invoice";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

function compileInvoiceTemplate(data) {
  // Compile the template with Handlebars
  const template = handlebars.compile(InvoiceTemplate);

  // Inject data into the template
  const htmlBody = template({
    SERVER_URL: process.env.SERVER_URL,
    amount: data.amount,
    id: data.id,
    status: data.status,
    createdAt: new Date(data.createdAt).toLocaleDateString(),
    name: data.name, // Assuming there's a `name` field in the data
  });

  return htmlBody;
}

export async function POST(req) {
  const { subject, message, email, data } = await req.json();

  const template = compileInvoiceTemplate(data);

  const mailOptions = {
    from: `Invoice Manager <${process.env.EMAIL_USER}>`,
    // to: Optionally we can set primary recipient
    bcc: [email],
    subject: subject,
    html: template,
  };

  try {
    const info = await transporter.sendMail(mailOptions);

    return NextResponse.json({
      status: 200,
      message: "Email sent successfully",
      info: info.response,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 500,
      error: error,
      message: "Email not sent",
    });
  }
}
