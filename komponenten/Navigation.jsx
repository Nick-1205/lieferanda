import Link from "next/link";
import Image from "next/image";
import { Badge } from "react-bootstrap";
import { useSelector } from "react-redux";

export default function Navigation() {
  const wAnzahl = useSelector((state) => state.warenkorb.wAnzahl);

  return (
    <div className="shadow sticky-top p-2 mb-2 bg-danger">
      <div className="d-flex justify-content-between align-items-center">
        <Link href="/">
          <Image
            src={`/bilder/Gemini_Generated_Image_dfgrgydfgrgydfgr.png`}
            alt="Logo"
            width={180}
            height={75}
          ></Image>
        </Link>

        <Link href="/warenkorb">
          {wAnzahl > 0 ? (
            <div>
              <Image
                src={`/bilder/warenkorb.png`}
                alt="Warenkorb"
                width={30}
                height={30}
              ></Image>
              <Badge
                pill
                bg="success"
                style={{ position: "absolute", right: "25px", top: "25px" }}
              >
                {wAnzahl}
              </Badge>
            </div>
          ) : (
            <Image
              src={`/bilder/warenkorb.png`}
              alt="Warenkorb"
              width={30}
              height={30}
            ></Image>
          )}
        </Link>
      </div>
    </div>
  );
}
