// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
/*
import mongodb from "@/utils/mongodb";
import jsondb from "@/jsondb/Produkte";
import Produkt from "@/models/Produkt";

export default async function handler(req, res) {
  await mongodb.dbConnect();
  await Produkt.deleteMany();
  await Produkt.insertMany(jsondb.produkte);
  const produkte = await Produkt.find({});
  await mongodb.dbDisconnect();
  //res.send({ text: "Daten gespeichert" });
  res.send(produkte);
}
*/

import mongodb from "@/utils/mongodb";
import Produkt from "@/models/Produkt";

export default async function handler(req, res) {
  try {
    await mongodb.dbConnect();
    const produkte = await Produkt.find({});
    await mongodb.dbDisconnect();
    res.status(200).json(produkte);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Fehler beim Laden der Produkte" });
  }
}
