import Clear from "../../assets/Clear.png";
import Cloud from "../../assets/LightCloud.png";
import HeavyCloud from "../../assets/HeavyCloud.png";
import HeavyRain from "../../assets/HeavyRain.png";
import Rain from "../../assets/LightRain.png";
import Thunderstorm from "../../assets/Thunderstorm.png";
import Snow from "../../assets/Snow.png";

function Image({ data, className }) {
  let image;
  const id = +data.weather?.[0].id;
  if (id <= 232) {
    image = Thunderstorm;
  } else if (id > 232 && id <= 520) {
    image = Rain;
  } else if (id > 520 && id <= 531) {
    image = HeavyRain;
  } else if (id >= 600 && id <= 622) {
    image = Snow;
  } else if (id >= 701 && id <= 781) {
    image = Cloud;
  } else if (id === 800) {
    image = Clear;
  } else if (id >= 801 && id <= 802) {
    image = Cloud;
  } else image = HeavyCloud;

  return <img src={image} alt={data.weather?.[0].main} className={className} />;
}

export { Image };
