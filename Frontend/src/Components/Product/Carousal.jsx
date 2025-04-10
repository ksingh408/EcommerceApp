
import React from 'react';
import { Carousel } from 'react-bootstrap';
import Img from '../image/img2.jpg'; // replace with your image path

const HeroCarousel = () => {
  const images = [
    Img,
    "https://t3.ftcdn.net/jpg/07/00/56/44/240_F_700564497_fvftLEmH150p86ONnTABCaRBggIE8M0p.jpg",
    "https://t3.ftcdn.net/jpg/08/55/00/10/240_F_855001004_7IDR5mYcv9GDAMf6lAFy7evxP8ZFjbwP.jpg"
  ];

  return (
    <div className="position-relative mt-3">
      <Carousel data-bs-theme="light" indicators={false}>
        {images.map((src, index) => (
          <Carousel.Item key={index}>
            <div
              style={{
                height: "70vh",
                width: "100%",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <img
                src={src}
                alt={`Slide ${index + 1}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                  position: "absolute",
                  top: 0,
                  left: 0,
                }}
              />
            </div>
            <Carousel.Caption className="d-none d-md-block">
              <h5>{`Slide ${index + 1} label`}</h5>
              <p>This is slide {index + 1}'s caption content.</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default HeroCarousel;




// import Carousel from 'react-bootstrap/Carousel';
// import Img from"../image/img2.jpg";

// function DarkVariantExample() {
//   return (
//         <div className='position-relative'>
//     <Carousel data-bs-theme="light">
//       <Carousel.Item>
//       <div style={{ height: "80vh", maxHeight: "600px" }}>
//         <img
//           className="d-block w-100 object-fit-cover"
//           src={Img}
//           alt="First slide"
//         />
//                  </div>
//         <Carousel.Caption>
//           <h5>First slide label</h5>
//           <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
//         </Carousel.Caption>
//       </Carousel.Item>
//       <Carousel.Item>
//       <div style={{ height: "80vh", maxHeight: "600px" }}>
//         <img
//           className="d-block w-100 object-fit-cover"
//           src={"https://t3.ftcdn.net/jpg/07/00/56/44/240_F_700564497_fvftLEmH150p86ONnTABCaRBggIE8M0p.jpg"}
//           alt="Second slide"
//         />
//                  </div>
//         <Carousel.Caption>
//           <h5>Second slide label</h5>
//           <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
//         </Carousel.Caption>
//       </Carousel.Item>
//       <Carousel.Item>
//       <div style={{ height: "80vh", maxHeight: "600px" }}>
//         <img
//           className="d-block w-100 object-fit-cover"
//           alt="Third slide"
//           src={"https://t3.ftcdn.net/jpg/08/55/00/10/240_F_855001004_7IDR5mYcv9GDAMf6lAFy7evxP8ZFjbwP.jpg"}
//         />
//                  </div>
//         <Carousel.Caption>
//           <h5>Third slide label</h5>
//           <p>
//             Praesent commodo cursus magna, vel scelerisque nisl consectetur.
//           </p>
//         </Carousel.Caption>
//       </Carousel.Item>
//     </Carousel>
//     </div>
//   );
// }

// export default DarkVariantExample;