import Image from "next/image";

export const Logo = () => {
    return (
        <div>
            <Image src="/assets/images/image.png" width={100} height={40} alt="Cinegest Logo" className="h-10 w-auto" />
        </div>
    );
}