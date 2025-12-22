import { ListCinema } from "../molecules/ListCinema";
import { Header } from "../organisms/Header";


export default function HomeTemplate() {
    const cinemas = [
        {
            id: 1,
            name: "Cinema One",
            address: "123 Main St",
            postal_code: "12345",
            city: "Metropolis",
            country: "CountryA",
        },
        {
            id: 2,
            name: "Cinema Two",
            address: "456 Side St",
            postal_code: "67890",
            city: "Gotham",
            country: "CountryB",
        },
    ];

    return (
        <>
            <Header page="home" />
            <ListCinema cinemas={cinemas} />
        </>
    );
}
