import AppBar from "../../components/AppBar";
import Card from "../../components/Card";
function ListProducts({ title }) {
    return (
        <>
            <AppBar title={title} />
            <Card />
        </>
    )
}

export default ListProducts;