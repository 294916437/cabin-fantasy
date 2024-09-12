"use client";

import React from "react";
import ClientOnly from "./ClientOnly";
import FooterColumn from "@/components/FooterColumn";

type Props = {};

function Footer({}: Props) {
  const itemData = [
    [
      "ABOUT",
      "Newsroom",
      "Learn about new features",
      "Letter from our founders",
      "Careers",
      "Investors",
    ],
    [
      "Support",
      "Help Center",
      "AirCover",
      "Cancellation options",
      "Safety information",
      "Report a neighborhood concern",
    ],
    [
      "Community",
      "Newsroom",
      "Learn about new features",
      "Letter from our founders",
      "Careers",
      "Investors",
    ],
    [
      "Hosting",
      "Try hosting",
      "AirCover for Hosts",
      "Explore hosting resources",
      "Safety information",
      "How to host responsibly",
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
    </ClientOnly>
  );
}

export default Footer;
