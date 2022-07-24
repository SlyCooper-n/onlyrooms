import Image from "next/image";
import { HTMLAttributes } from "react";

interface IllustrationProps extends HTMLAttributes<HTMLDivElement> {}

export const Illustration = ({ className }: IllustrationProps) => {
  return (
    <div
      className={
        "flex-col justify-center items-center bg-base-300 gap-12 " + className
      }
    >
      <Image
        src="/images/illustration.svg"
        alt="Illustration image"
        width={400}
        height={400}
      />

      <h2 className="text-3xl text-base-content font-semibold">
        Rooms for everybody.
      </h2>
    </div>
  );
};
