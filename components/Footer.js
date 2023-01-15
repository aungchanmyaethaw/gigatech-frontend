import React from "react";
import Link from "next/link";
import { ContainerStyled, UnderLine } from "styles/global.styles";
import { FiFacebook, FiInstagram, FiTwitter, FiYoutube } from "react-icons/fi";
const Footer = () => {
  return (
    <footer className="bg-dark-200">
      <div className="flex justify-center py-4 bg-dark-100">
        <div className="flex gap-4">
          <Link href="/">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-light text-primary">
              <FiFacebook className="text-xl" />
            </div>
          </Link>
          <Link href="/">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-light text-primary">
              <FiInstagram className="text-xl" />
            </div>
          </Link>
          <Link href="/">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-light text-primary">
              <FiTwitter className="text-xl" />
            </div>
          </Link>
          <Link href="/">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-light text-primary">
              <FiYoutube className="text-xl" />
            </div>
          </Link>
        </div>
      </div>
      <ContainerStyled>
        <div className="grid content-center grid-cols-1 gap-4 md:gap-6 lg:gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* col-1 */}
          <div className="p-4">
            <div className="flex flex-col mb-20 w-max">
              <h2
                href="/"
                className="text-2xl font-semibold font-heading lg:text-3xl text-light"
              >
                Giga<span className="text-primary !font-heading">Tech</span>
              </h2>
              <UnderLine className="!w-1/2" />
            </div>
          </div>
          {/* col-2 */}
          <div className="p-4">
            <h2 className="text-light">Col-2</h2>
          </div>
          {/* col-3 */}
          <div className="p-4">
            <h2 className="text-light">Col-3</h2>
          </div>
          {/* col-4 */}
          <div className="p-4">
            <h2 className="text-light">Col-4</h2>
          </div>
        </div>
      </ContainerStyled>
    </footer>
  );
};

export default Footer;
