import "../styles/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-bottom">
        © {new Date().getFullYear()} ShreeCreations Chakan. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
