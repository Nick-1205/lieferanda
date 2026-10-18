import { Card, Button, Nav } from "react-bootstrap";
import Link from "next/link";
import jsondb from "@/jsondb/Produkte";
import { useState, useEffect } from "react";

export default function Produktliste({ produkte }) {
  const [kategorie, setKategorie] = useState("Alle");

  const kategorien = [
    "Alle",
    ...new Set(produkte?.map((p) => p.kategorie).filter(Boolean)),
  ];

  const gefilterteProdukte =
    kategorie === "Alle"
      ? produkte
      : produkte?.filter((p) => p.kategorie === kategorie);
  return (
    <div>
      <div>
        <Nav
          variant="underline"
          activeKey={kategorie}
          className="justify-content-center mb-4 gap-2"
        >
          {kategorien.map((k) => (
            <Nav.Item key={k} className="bg-light">
              <Nav.Link
                className="text-dark"
                eventKey={k}
                onClick={() => setKategorie(k)}
                style={{ cursor: "pointer" }}
              >
                {k}
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>
      </div>

      <div>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {gefilterteProdukte?.map((produkt) => (
            <div key={produkt.name} className="mt-3 col">
              <Card className="h-100">
                <Link href={`/produkte/${produkt.url}`} passHref>
                  {" "}
                  <Card.Img variant="top" src={produkt.bild}></Card.Img>
                </Link>

                <Card.Body>
                  <Card.Title>
                    {produkt.name} für {produkt.preis.toFixed(2)}€
                  </Card.Title>
                  <Card.Text>{produkt.beschreibung}</Card.Text>
                </Card.Body>

                <Link href={`/produkte/${produkt.url}`} passHref>
                  <Button variant="danger">Bestellen</Button>
                </Link>
              </Card>
            </div>
          ))}
        </div>
        <br></br>
      </div>
    </div>
  );
}
