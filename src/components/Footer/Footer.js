import { currentYear } from "../../constants/day";
import "./Footer.css";

/**
 * @function Footer footer of the app
 */
export const Footer = () => {
  return (
    <footer className="footer">
      <span>React todo list {currentYear}</span>
    </footer>
  );
};
