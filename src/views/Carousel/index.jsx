import Carousel from 'react-bootstrap/Carousel';
import i1 from '../../components/img/1.png';
import i2 from '../../components/img/2.png';
import i3 from '../../components/img/3.png';
import { useNavigate } from 'react-router';
import 'bootstrap/dist/css/bootstrap.css';





function Carrousel() {
  const navigate = useNavigate()

  return (

    <div className="container">


      <Carousel className="container">
        <Carousel.Item interval={3000}>
          <img className="d-block w-50 h-100px"
            src={i1}
            alt="First slide"
            onClick={() => navigate("/detail/:id")} />

        </Carousel.Item>
        <Carousel.Item interval={3000}>
          <img className="d-block w-50 h-100px"

            src={i2}
            alt="Second slide"
            onClick={() => navigate("/detail/:id")} />

        </Carousel.Item>
        <Carousel.Item interval={3000}>
          <img className="d-block w-50 h-100px"

            src={i3}
            alt="Third slide"
            onClick={() => navigate("/detail/:id")} />
        </Carousel.Item>
      </Carousel>



    </div>


  );
}

export default Carrousel;