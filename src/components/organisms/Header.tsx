import { LinkButton } from "../atoms/Button";
import { Logo } from "../atoms/Logo";

interface HeaderProps {
    page?: string;
    pageTitle?: string;
}

export const Header = ({ pageTitle, page }: HeaderProps) => {
    return (
        <header className="flex justify-between items-center py-3 px-10">
            <div className="flex gap-8">
                <Logo />
                <LinkButton className={'text-lg ' + (page === 'home' ? 'font-bold' : '')} size="sm" variant="transparent" href="/">
                    Films
                </LinkButton>
                <LinkButton className={'text-lg ' + (page === 'cinema' ? 'font-bold' : '')} size="sm" variant="transparent" href="/cinema">
                    Cinema
                </LinkButton>
                <LinkButton className={'text-lg ' + (page === 'prix' ? 'font-bold' : '')} size="sm" variant="transparent" href="/prix">
                    Prix
                </LinkButton>
            </div>
            <div className="flex gap-8">

            </div>
        </header>
    );
}