import { useRouter } from "next/router";
import React, { FC } from "react";

interface Payment {
  id: string;
  address: string;
  href?: string;
}

interface Props {}

const Donate: FC<Props> = () => {
  const router = useRouter();

  const payments: Payment[] = [
    {
      id: "paypal",
      address: process.env.NEXT_PUBLIC_PAYMENT_PAYPAL || "",
    },
    {
      id: "btc",
      address: process.env.NEXT_PUBLIC_PAYMENT_BTC || "",
    },
    {
      id: "eth",
      address: process.env.NEXT_PUBLIC_PAYMENT_ETH || "",
    },
    {
      id: "venmo",
      address: process.env.NEXT_PUBLIC_PAYMENT_VENMO || "",
      href: `https://www.venmo.com/${process.env.NEXT_PUBLIC_PAYMENT_VENMO}`,
    },
    {
      id: "cashapp",
      address: process.env.NEXT_PUBLIC_PAYMENT_CASHAPP || "",
      href: `https://www.cash.app/${process.env.NEXT_PUBLIC_PAYMENT_CASHAPP}`,
    },
  ];

  const redirectToLink = (href: string) => router.push(href);

  return (
    <div className="flex flex-col justify-center items-center w-full pt-16 md:pt-20 pb-10 md:pb-12">
      <h1 className="font-Basic text-primary text-4xl md:text-6xl tracking-tighter">
        Donate
      </h1>

      <div className="flex flex-col justify-center items-center md:items-start py-14 w-full font-Times">
        {payments.map(({ id, address, href }) => (
          <div
            key={id}
            onClick={() => (href ? redirectToLink(href) : null)}
            className={`flex flex-col md:flex-row w-full md:w-full md:space-x-10 mb-4 md:mb-0 ${
              href && "cursor-pointer"
            }`}
          >
            <div
              className={`rounded-md shadow-md py-3 md:py-0 px-8 my-2 w-full md:w-fit md:ml-[20%] ${
                id === "venmo"
                  ? "bg-[#3D95CE]"
                  : id === "cashapp"
                  ? "bg-[#39b54a]"
                  : "bg-white"
              }`}
            >
              <img
                src={`/payments/${id}.png`}
                className="object-contain h-12 md:h-20 w-full md:w-fit"
              />
            </div>

            <p className="flex flex-row justify-center md:justify-start items-center text-tertiary md:text-left w-full text-sm md:text-base">
              {href ? (
                <a href={href} className="hover:underline">
                  {address}
                </a>
              ) : (
                <span>{address}</span>
              )}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export { Donate };
