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
      <ContainerStyled className="!pb-12">
        <div className="grid items-baseline content-center sm:grid-cols-2 xl:grid-cols-4">
          {/* col-1 */}
          <div className="p-4">
            <div className="flex flex-col mb-4 w-max">
              <h2
                href="/"
                className="text-2xl font-semibold font-heading lg:text-3xl text-light"
              >
                Giga<span className="text-primary !font-heading">Tech</span>
              </h2>
              <UnderLine className="!w-1/2" />
            </div>
            <p className="text-sm md:w-3/4 text-light">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse molestie arcu at est iaculis tempus. Maecenas
              consequat odio nulla, rutrum varius sem imperdiet sit amet.
              Vivamus sodales augue eget nibh lobortis sagittis.
            </p>
          </div>
          {/* col-2 */}
          <div className="p-4 ">
            <h2 className="mb-6 text-lg font-semibold font-heading lg:text-xl text-light">
              Quick Links
            </h2>
            <ul className="flex flex-col gap-2">
              <Link
                href="/"
                className="text-sm text-light w-max hover:text-primary "
              >
                Home
              </Link>
              <Link
                href="/"
                className="text-sm text-light w-max hover:text-primary "
              >
                About us
              </Link>
              <Link
                href="/"
                className="text-sm text-light w-max hover:text-primary "
              >
                Contect us
              </Link>
              <Link
                href="/"
                className="text-sm text-light w-max hover:text-primary "
              >
                Blogs
              </Link>
            </ul>
          </div>
          {/* col-3 */}
          <div className="p-4">
            <h2 className="mb-6 text-lg font-semibold font-heading lg:text-xl text-light">
              Shop Now
            </h2>
            <ul className="flex flex-col gap-2">
              <Link
                href="/collections"
                className="text-sm text-light w-max hover:text-primary "
              >
                Collections
              </Link>
              <Link
                href="/newarrivals?sort=createdAt:desc&start=0"
                className="text-sm text-light w-max hover:text-primary "
              >
                New Arrivals
              </Link>
              <Link
                href="/trending?start=0"
                className="text-sm text-light w-max hover:text-primary "
              >
                Trending
              </Link>
              <Link
                href="/topsellings"
                className="text-sm text-light w-max hover:text-primary "
              >
                Top Sellings
              </Link>
              <Link
                href="/cart"
                className="text-sm text-light w-max hover:text-primary "
              >
                Cart
              </Link>
            </ul>
          </div>
          {/* col-4 */}
          <div className="p-4">
            <h2 className="mb-6 text-lg font-semibold font-heading lg:text-xl text-light">
              Reach Us
            </h2>
            <p className="text-sm leading-7">
              199 Lafayette St
              <br />
              New York 10012
              <br />
              Phone: 1-123-456-789
              <br />
              Email:
              <span className="ml-2 text-primary">gigatech12823@gmail.com</span>
            </p>
          </div>
        </div>
        <div className="flex justify-center mt-12">
          <p>©️ 2022-GigaTech.All rights reserved.</p>
        </div>
      </ContainerStyled>
    </footer>
  );
};

export default Footer;
