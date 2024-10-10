"use client";

import React from "react";
import ClientOnly from "./ClientOnly";
import FooterColumn from "@/components/FooterColumn";

type Props = {};

function Footer({}: Props) {
  const itemData = [
    [
      "ABOUT",
      "Carbin Fantasy",
      "Learn about new services",
      "Letter from our teams",
      "Careers",
      "Creators",
    ],
    [
      "Support",
      "Help Center",
      "Cabin Rent",
      "Cancellation options",
      "Safety information",
      "Report a neighborhood concern",
    ],
    [
      "Community",
      "Newsroom",
      "Learn about new services",
      "Letter from our teams",
      "Careers",
      "Creators",
    ],
    [
      "Rent out",
      "Try renting",
      "Cabin Rent",
      "Explore renting resources",
      "Safety information",
      "How to rent responsibly",
    ],
  ];

  const footerColumns = itemData.map((item, index) => (
    <FooterColumn key={index} index={index} data={item} />
  ));

  return (
    <ClientOnly>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-y-10 px-32 py-14 bg-gray-100 text-gray-600'>
        {footerColumns}
      </div>
      <div className='flex justify-center items-center bg-gray-100 m-auto w-full gap-8 text-first'>
        <p >
          &copy;By Asams Morgan All rights reserved
        </p>
        <p className="font-bold underline  cursor-pointer">
          <a href="https://github.com/294916437/cabin-fantasy" target="_blank" rel="noopener noreferrer">
           Go To GitHub Repository
          </a>
          </p>
          
      </div>
    </ClientOnly>
  );
}

export default Footer;
