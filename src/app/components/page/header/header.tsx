import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandTwitter,
  IconPhoneCall,
  IconShoppingCart,
} from "@tabler/icons-react";
import Link from "next/link";
import SigninButton from "./login-button";
import SearchForm from "../../elements/search/Search";
import { getBrands } from "@/utils/branch";

export default async function Header() {
  return (
    <header className="header">
      <div className="header-top">
        <div className="container">
          <div className="header-top-wrapper">
            <div className="header-top-left">
              <div className="header-top-contact">
                <ul>
                  <li>
                    <Link href="mailto:info@example.com">info@example.com</Link>
                  </li>
                  <li>
                    <Link href="tel:+21236547898">
                      <IconPhoneCall size={18} /> +2 123 654 7898
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="header-top-right">
              <SigninButton />
              <div className="header-top-social">
                <Link href="#">
                  <IconBrandFacebook size={18} />
                </Link>
                <Link href="#">
                  <IconBrandTwitter size={18} />
                </Link>
                <Link href="#">
                  <IconBrandInstagram size={18} />
                </Link>
                <Link href="#">
                  <IconBrandLinkedin size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="main-navigation">
        <nav className="navbar navbar-expand-lg">
          <div className="container position-relative">
            <Link className="navbar-brand" href="/">
              <img
                className="rounded"
                src="https://datxe.com/wp-content/uploads/2021/08/cropped-logo-DatXE-App-vuong-1.jpg"
                alt="logo"
                style={{ maxWidth: "60px" }}
              />
            </Link>
            <div className="collapse navbar-collapse nav-search" id="main_nav">
              <SearchForm />
              <div className="nav-right">
                <div className="cart-btn">
                  <Link href="/gio-hang" className="nav-right-link">
                    <IconShoppingCart />
                    <span>0</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
