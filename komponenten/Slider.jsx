import Image from "next/image";
import { Carousel } from "react-bootstrap";

export default function Slider() {
  return (
    <div>
      <Carousel controls={false} fade={true} interval={3000}>
        <Carousel.Item>
          <Image
            className="d-block w-100 rounded-3"
            src={`/bilder/essen/burger.jpg`}
            alt="burger"
            width={3000}
            height={500}
          ></Image>
        </Carousel.Item>
        <Carousel.Item>
          <Image
            className="d-block w-100 rounded-3"
            src={`/bilder/essen/burrito.jpg`}
            alt="pizza"
            width={3000}
            height={500}
          ></Image>
        </Carousel.Item>
        <Carousel.Item>
          <Image
            className="d-block w-100 rounded-3"
            src={`/bilder/essen/pizza.jpg`}
            alt="burrito"
            width={3000}
            height={500}
          ></Image>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}
