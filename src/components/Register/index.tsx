import { BuiltInProviderType } from "next-auth/providers";
import { ClientSafeProvider, LiteralUnion, signIn } from "next-auth/react";
import React, { FC } from "react";
import { FaFacebookF, FaGoogle } from "react-icons/fa";

interface Props {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null;
}

const Register: FC<Props> = ({ providers }) => {
  const BRAND_NAME = process.env.NEXT_PUBLIC_BRAND_NAME;

  const socialProviders =
    providers &&
    Object.values(providers).filter(({ type }) => type !== "email");

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)] md:min-h-[calc(100vh-5rem)] items-center justify-center">
      <h1 className="font-Basic text-3xl tracking-tight py-6 text-primary dark:text-white">
        Create an account.
      </h1>

      {socialProviders &&
        Object.values(socialProviders).map(({ id, name }, index) => (
          <button
            key={id}
            onClick={() =>
              signIn(id, {
                callbackUrl: `${process.env.NEXTAUTH_URL}`,
              })
            }
            className={`button w-fit flex flex-row items-center py-3 px-10 ${
              Object.values(socialProviders).length - 1 !== index && "mb-2"
            }`}
          >
            <p className="mr-3">
              {" "}
              {id === "google" ? (
                <FaGoogle />
              ) : id === "facebook" ? (
                <FaFacebookF />
              ) : null}
            </p>
            Register with {name}
          </button>
        ))}

      <p className="text-sm py-6 text-tertiary dark:text-fourth">
        By continuing, I agree to {BRAND_NAME}&apos;s <u>Privacy Policy</u> and{" "}
        <u>Terms of Use.</u>
      </p>
    </div>
  );
};

export { Register };
