import { useParams } from "react-router";
import { Helmet } from "react-helmet";


const Image = () => {
    const id = useParams()

    return (
        <>
            <Helmet>
                <title>{id.id}</title>
                <meta property="og:title" content={`${id.id}`} />
                <meta property="og:description" content="nnexsus.net is a windows 7 design inspired site for viewing my weather photos and videos in high quality!" />
                <meta property="og:type" content="website" />
                <meta property="og:image" content={`https://arina.lol/api/win7/acfile/${id.id}`} />
                <meta property="og:url" content="https://nnexsus.net" />
                <meta name="theme-color" content="#2be387"/>

                <meta name="twitter:card" content="summary_large_image"/>
            
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="https://nnexsus.net/" />
                <meta property="twitter:title" content={`${id.id}`} />
                <meta property="twitter:description" content="nnexsus.net is a windows 7 design inspired site for viewing my weather photos and videos in high quality!" />
                <meta property="twitter:image" content={`https://arina.lol/api/win7/acfile/${id.id}`} />
            </Helmet>
            <img width={'100%'} src={`https://arina.lol/api/win7/acfile/${id.id}`} alt="Full size image." />
        </>
    )
}

export default Image;