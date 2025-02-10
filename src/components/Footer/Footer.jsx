import { Footer as footer } from "flowbite-react";

const Footer = () => {
  return (
    <footer>
      <div className=" w-full bg-black">
        <div className="container mx-auto grid w-full grid-cols-2 gap-8 px-6 py-8 md:grid-cols-4">
          <div>
            <footer.Title title="Company" />
            <footer.LinkGroup col>
              <footer.Link href="#">About</footer.Link>
              <footer.Link href="#">Careers</footer.Link>
              <footer.Link href="#">Brand Center</footer.Link>
              <footer.Link href="#">Blog</footer.Link>
            </footer.LinkGroup>
          </div>
          <div>
            <footer.Title title="help center" />
            <footer.LinkGroup col>
              <footer.Link href="#">Discord Server</footer.Link>
              <footer.Link href="#">Twitter</footer.Link>
              <footer.Link href="#">Facebook</footer.Link>
              <footer.Link href="#">Contact Us</footer.Link>
            </footer.LinkGroup>
          </div>
          <div>
            <footer.Title title="legal" />
            <footer.LinkGroup col>
              <footer.Link href="#">Privacy Policy</footer.Link>
              <footer.Link href="#">Licensing</footer.Link>
              <footer.Link href="#">Terms &amp; Conditions</footer.Link>
            </footer.LinkGroup>
          </div>
          <div>
            <footer.Title title="download" />
            <footer.LinkGroup col>
              <footer.Link href="#">iOS</footer.Link>
              <footer.Link href="#">Android</footer.Link>
              <footer.Link href="#">Windows</footer.Link>
              <footer.Link href="#">MacOS</footer.Link>
            </footer.LinkGroup>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
