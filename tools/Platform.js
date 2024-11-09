import Link from "next/link";
import { FaInstagram, FaTelegram, FaTiktok, FaTwitter } from "react-icons/fa";
import { SiAparat } from "react-icons/si";
import { TbWorld } from "react-icons/tb";

const Platform = ({ color, colorHover, data }) => {
  const usersocialMedias = data ? JSON.parse(data) : [];

  const renderSocialMediasIcon = (icon) => {
    switch (icon) {
      case "telegram":
        return <FaTelegram className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7"/>;
        break;

      case "instagram":
        return <FaInstagram className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7"/>;
        break;

      case "x":
        return <FaTwitter className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7"/>;
        break;

      case "tiktok":
        return <FaTiktok className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7"/>;
        break;

      case "facebook":
        return <FaFacebook className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7"/>;
        break;

      case "aparat":
        return <SiAparat className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7"/>;
        break;

      case "eitaa":
        return (
          <div>
            <img src="/images/socialMedias/eitaa.svg" alt="" className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7"/>
          </div>
        );
        break;

      case "bale":
        return (
          <div>
            <img src="/images/socialMedias/bale.png" alt="" className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7"/>
          </div>
        );
        break;

      case "soroush":
        return (
          <div>
            <img src="/images/socialMedias/soroush.png" alt="" className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7"/>
          </div>
        );
        break;

      case "robika":
        return (
          <div>
            <img src="/images/socialMedias/robika.png" alt="" className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7"/>
          </div>
        );
        break;

      case "virasty":
        return (
          <div>
            <img src="/images/socialMedias/virasty.png" alt="" className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7"/>
          </div>
        );
        break;

      default:
        return <TbWorld className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7"/>
        break;
    }
  };

  return (
    <div className=" flex justify-start items-center text-3xl gap-4 text-slate-500">
      {usersocialMedias.map((item, index) => (
        <Link
          href={item.subject}
          target="_blank"
          key={index}
          className={`${color} hover:${colorHover} hover:cursor-pointer`}
        >
          {renderSocialMediasIcon(item.title)}
        </Link>
       ))}
    </div>
  );
};

export default Platform;
