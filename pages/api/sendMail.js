import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req, res) {
  if (req.method !== "POST") {
    res.status(400).send({ message: "Only POST requests allowed" });
    return;
  } else {
    try {
      console.log(req.body);
      const body = req.body;
      var nodemailer = require("nodemailer");

      var remetente = nodemailer.createTransport({
        host: "smtp.hostinger.com",
        port: 465,
        auth: {
          user: process.env.MAIL,
          pass: process.env.PASSMAIL,
        },
      });

      var emailASerEnviado = {
        from: process.env.MAIL,
        to: body.email,
        subject: "Desafio comics Jarder Silva",
        html: body.body,
      };

      remetente.sendMail(emailASerEnviado, function (error) {
        if (error) {
          console.log(error);
          res.status(500).send({ message: error });
          return;
        } else {
          res.status(200).send({ message: "Email enviado com sucesso!" });
          return;
        }
      });
    } catch (err) {
      res.status(500).send({ message: err.toString() });
      return;
    }
  }
}
