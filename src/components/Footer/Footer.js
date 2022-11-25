import { currentYear } from "../../constants/day";
import "./Footer.css";

export const Footer = () => {
  return (
    <footer className="footer">
      <span>React todo list {currentYear}</span>
    </footer>
  );
};
