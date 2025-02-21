import Carousel from 'react-bootstrap/Carousel';
import Img from"../image/img2.jpg";

function DarkVariantExample() {
  return (
        <div className='position-relative'>
    <Carousel data-bs-theme="light">
      <Carousel.Item>
        <img
          className="d-block w-100"style={{ height: "600px" }}
          src={Img}
          alt="First slide"
        />
        <Carousel.Caption>
          <h5>First slide label</h5>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100" style={{ height: "600px" }}
          src={"https://t3.ftcdn.net/jpg/07/00/56/44/240_F_700564497_fvftLEmH150p86ONnTABCaRBggIE8M0p.jpg"}
          alt="Second slide"
        />
        <Carousel.Caption>
          <h5>Second slide label</h5>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100" style={{ height: "600px" }}
          src={"https://t3.ftcdn.net/jpg/08/55/00/10/240_F_855001004_7IDR5mYcv9GDAMf6lAFy7evxP8ZFjbwP.jpg"}
        />
        <Carousel.Caption>
          <h5>Third slide label</h5>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </div>
  );
}

export default DarkVariantExample;