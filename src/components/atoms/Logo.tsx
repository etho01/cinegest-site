import Image from "next/image";

export const Logo = () => {
    return (
        <div>
            <Image src="/assets/images/image.png" alt="Cinegest Logo" className="h-10 w-auto" />
        </div>
    );
}