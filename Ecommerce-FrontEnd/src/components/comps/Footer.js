import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faGithub,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="text-light text-center py-3">
      <div className="container">
        <p>
          &copy; 2023-2024 MedicalAI. This application was created by Safouat El
          Yassini. For business , please contact me at:
          <a
            href="https://www.linkedin.com/in/safouat-el-yassini-89147627a/"
            target="_blank"
            rel="noopener noreferrer"
            className="me-1"
          >
            <FontAwesomeIcon icon={faLinkedin} size="lg" />
          </a>
          <a
            href="https://twitter.com/SafouatEl"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faTwitter} size="lg" />
          </a>
          <a
            href="https://github.com/safouat"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faGithub} size="lg" />
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
