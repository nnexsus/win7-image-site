import { useParams } from "react-router"


const Image = () => {
    const id = useParams()

    return (
        <>
            <img width={'100%'} src={`https://arina.lol/api/win7/acfile/${id.id}`} alt="Full size image." />
        </>
    )
}

export default Image;