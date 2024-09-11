import { useEffect, useState } from "react";


const Player = ({imgdata}) => {
    
    const [activeImage, setActiveImage] = useState({})

    useEffect(() => {
        setActiveImage(imgdata)
    }, [imgdata])

    return (
        <>
            <div id="details" className="screen media-player-grid" style={{height: 'calc(100% - 14px)', background: 'white'}}>
                <div className="file-top-bar">
                    <div>
                        <button>Files ▾</button>
                        <button>Print ▾</button>
                        <button>E-mail</button>
                        <button>Burn ▾</button>
                        <button>Open ▾</button>
                    </div>
                    <div>
                        <button><img alt="decor" width={'16px'} height={'16px'} src="/images/bgs/help.ico" /></button>
                    </div>
                </div>
                <div style={{height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundImage: 'url(/images/bgs/image-icon.ico)', backgroundSize: '50%', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}>
                    {activeImage.type === 'image' ? 
                        <a rel="noreferrer" style={{height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}} href={`/image/${activeImage.source}`} target="_blank">
                            <img className="height-100" style={{cursor: 'pointer'}} alt={`${activeImage.short}`} src={activeImage.source !== null ? `https://arina.lol/api/win7/acfile/${activeImage.source}`: "/images/bgs/welcome.webp"} />
                        </a>
                    : 
                        <video className="height-100" controls src={`https://arina.lol/api/win7/acfile/${activeImage.source}`} />
                    }
                </div>
            </div>
        </>
    )
}

export default Player;