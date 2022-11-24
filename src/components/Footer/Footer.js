import { currentYear } from "../../constants/now";
import "./Footer.css";

export const Footer = () => {
  return (
    <footer className="footer">
      <span>React todo list {currentYear}</span>
    </footer>
  );
};
