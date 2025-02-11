import { Footer as footer } from "flowbite-react";

const Footer = () => {
  return (
    <footer>
      <div className=" w-full bg-black">
        <div className="container mx-auto grid w-full grid-cols-2 gap-8 px-6 py-8 md:grid-cols-4">
          <div>
            <footer.Title title="Company" className="text-2xl" />
            <footer.LinkGroup col>
              <footer.Link href="#" className="text-2xl">
                About
              </footer.Link>
              <footer.Link href="#" className="text-2xl">
                Careers
              </footer.Link>
              <footer.Link href="#" className="text-2xl">
                Brand Center
              </footer.Link>
              <footer.Link href="#" className="text-2xl">
                Blog
              </footer.Link>
            </footer.LinkGroup>
          </div>
          <div>
            <footer.Title title="help center" className="text-2xl" />
            <footer.LinkGroup col>
              <footer.Link href="#" className="text-2xl">
                Discord Server
              </footer.Link>
              <footer.Link href="#" className="text-2xl">
                Twitter
              </footer.Link>
              <footer.Link href="#" className="text-2xl">
                Facebook
              </footer.Link>
              <footer.Link href="#" className="text-2xl">
                Contact Us
              </footer.Link>
            </footer.LinkGroup>
          </div>
          <div>
            <footer.Title title="legal" className="text-2xl" />
            <footer.LinkGroup col>
              <footer.Link href="#" className="text-2xl">
                Privacy Policy
              </footer.Link>
              <footer.Link href="#" className="text-2xl">
                Licensing
              </footer.Link>
              <footer.Link href="#" className="text-2xl">
                Terms &amp; Conditions
              </footer.Link>
            </footer.LinkGroup>
          </div>
          <div>
            <footer.Title title="download" className="text-2xl" />
            <footer.LinkGroup col>
              <footer.Link href="#" className="text-2xl">
                iOS
              </footer.Link>
              <footer.Link href="#" className="text-2xl">
                Android
              </footer.Link>
              <footer.Link href="#" className="text-2xl">
                Windows
              </footer.Link>
              <footer.Link href="#" className="text-2xl">
                MacOS
              </footer.Link>
            </footer.LinkGroup>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
