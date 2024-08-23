import { useEffect, useState } from "react"
import axios from "axios"

const Browser = ({imgdata}) => {

    const [activeImage, setActiveImage] = useState({
        "id": 0,
        "title": "Welcome!",
        "date": "",
        "short": "Welcome to nnexsus.net!",
        "description": "Click on an image or navigate through different folders in the File Explorer tab to get started!",
        "source": null,
        "thumb": null,
        "rating": "4.8",
        "folder": 0,
        "type": "image",
        "location": [41.836405543203604, -89.4198049096924]
    })
    const [activeSite, setActiveSite] = useState("ImageDetails")

    useEffect(() => {
        setActiveImage(imgdata)
        changeActiveSite("ImageDetails")
    }, [imgdata])

    const changeActiveSite = (site) => {
        setActiveSite(site)
        document.querySelectorAll('.browser-tab').forEach((el) => {
            el.classList.remove('selected')
        })
        document.getElementById(site).classList.add('selected')
    }

    const Rating = ({activeImage}) => {
        const [rating, setRating] = useState(0)

        const starImage = (id) => {
            axios.post(`https://arina.lol/api/win7${id}`)
            var r = rating + 1
            setRating(r)
        }

        useEffect(() => {
            setRating(activeImage.rating)
        }, [])

        return (
            <>            
                {activeImage.rating !== null ?
                    <button className="star-button" id={`/star/${activeImage.source}`} style={{borderRadius: '3px', cursor: 'pointer', display: 'flex', alignItems: 'center'}} onClick={(e) => starImage(e.currentTarget.id)}>
                        <img alt="star" width={'16px'} height={'16px'} src="/images/bgs/star.ico" />
                        {rating}
                    </button>
                : null}
            </>
        )
    }

    const ImageDetails = () => {
        return (
            <div style={{width: 'calc(100% - 8px)', margin: '3px', marginTop: 0, backgroundColor: 'white', border: 'solid 1px #3a3a3a', background: 'url(/images/bgs/shallowwater.webp)', backgroundSize: 'cover', imageRendering: 'pixelated'}}>
                <div style={{background: 'rgba(120, 120, 240, 0.5)', paddingTop: '3px', borderBottom: 'lightblue solid 1px'}}>
                    <h2 style={{color: 'lightblue', display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '5px', textShadow: 'black 0 0 2px', borderLeft: 'aliceblue 2px solid', borderRadius: '12px', paddingLeft: '2px'}}>{activeImage.title}
                        <img className="aero-border" style={{boxShadow: 'black 0 0 6px'}} alt="" width={'45%'} src={activeImage.thumb !== null ? `https://arina.lol/api/win7/thumb/${activeImage.thumb}` : "/images/bgs/welcome.webp"} />
                    </h2>
                </div>
                <p style={{color: 'white', fontSize: '18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '5px', alignItems: 'stretch'}}><i>{activeImage.short}</i>
                    <span style={{fontSize: '12px', color: 'white', boxShadow: 'none', borderTop: 'none', borderRadius: '0 0 8px 8px', padding: '3px', margin: '-5px 0 0 0', display: 'flex', alignItems: 'center'}} className="aero-border">
                        <Rating activeImage={activeImage} />
                        <b style={{color: 'lightblue', margin: '0 4px 0 20px', fontSize: '12px', textShadow: 'black 0 0 2px', borderLeft: 'aliceblue solid 1px', borderRadius: '4px', whiteSpace: 'nowrap'}}> {activeImage.date}</b>
                    </span>
                </p>
                <p style={{color: 'white', margin: '3px 5px', fontSize: '16px', boxShadow: 'none', padding: '3px', backgroundColor: 'rgba(55, 102, 147, 0.694)', textShadow: 'gray 0 0 2px'}} className="aero-border" >{activeImage.description}</p>
            </div>
        )
    }

    const SiteDetails = () => {
        return (
            <div style={{width: 'calc(100% - 8px)', margin: '3px', backgroundColor: 'white', border: 'solid 1px #3a3a3a', background: 'url(/images/bgs/Circles.png)', backgroundSize: '75px', imageRendering: 'pixelated'}}>
                <h2 style={{color: 'lightblue', display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '5px'}}>nnexsus.net<img alt="" width={'45%'} src={`/images/signature-logo-white.png`} /></h2>
                <p style={{color: 'white', margin: '3px 5px', fontSize: '14px'}}>
                    <span style={{fontSize: '14px'}}><b>Welcome to nnexsus.net! This site is a small Windows 7 design inspired site to view any of my photos or videos in higher quality than social media, and all in one place!</b></span>
                    <br/><br/>
                    My works are nothing close to award winning (yet...), but regardless, if anyone uses them for anything, please just credit me or link to my site or <a style={{color: 'lightblue'}} href="https://twitter.com/_nnexsus" target="_blank" rel="noreferrer">twitter</a>! 
                    <br/><br/>
                    I find weather to be one of the most interesting things this life has to offer, and thus want to share - to the best of my ability - why I see this. There's a rare, hard to describe beauty in every rainstorm,
                    knowing that it slowly shapes our terrain, or greatly affects our daily passage in life. The best of the best photos can occasionally capture this, and the best of the best videos - of which I am to try harder and
                    capture both of. This has become everything to me, and it will not stop.
                    <br/><br/>
                    Weather, too, is an extremely sensitive system - the likes of which we've easily altered in our human acitivities many times over the years, especially recently. I am extremely passionate, too, in protecting this sensitive part of the Earth,
                    as well as the Earth at large.
                </p>
            </div>
        )
    }

    return (
        <>
            <div className="toolbar">
                <div className="nav-buttons">
                    <div style={{zIndex: 3}}><button><img alt="decor" width={'16px'} height={'16px'} src="/images/bgs/nav-arrow.png" /></button></div>
                    <div style={{borderRadius: 0, marginLeft: '-15px', marginRight: '-15px', zIndex: 2, width: '15px', height: '19px', marginTop: '3px'}}></div>
                    <div style={{zIndex: 3}}><button><img alt="decor" width={'16px'} height={'16px'} src="/images/bgs/nav-arrow.png" style={{transform: 'rotateY(180deg)'}} /></button></div>
                </div>
                <button style={{width: '25px', background: 'none', border: 'none'}}>▾</button>
                <div className="textbox" style={{width: '100%'}}>
                    <input disabled value={activeSite === 'ImageDetails' ? "C:\\site\\imagedetails.html" : "C:\\site\\aboutsite.html"} style={{paddingLeft: '4px', color: 'black'}} type="text" />
                    <button style={{width: '25px', background: 'none', border: 'none'}}>▾</button>
                    <button style={{width: '25px', background: 'none', border: 'none', borderLeft: 'solid black 1px'}}><img width={'16px'} height={'16px'} alt="decor" src="/images/bgs/refresh.png" /></button>
                </div>
            </div>

            <div className="screen internet-explorer-grid" style={{height: 'calc(100% - 58px)', background: 'white'}}>
                <div className="nav-buttons browser-toolbar">
                    <p><u>F</u>ile</p>
                    <p><u>E</u>dit</p>
                    <p><u>V</u>iew</p>
                    <p><u>F</u>avorites</p>
                    <p><u>T</u>ools</p>
                    <p><u>H</u>elp</p>
                </div>
                <div className="browser-toolbar" style={{background: 'linear-gradient(0deg, #dce6f5 0%, #dce6f5 50%, #edf5fd 50.1%, #edf5fd 100%)', alignItems: 'end'}}>
                    <img width={'16px'} height={'16px'} style={{margin: '0 4px'}} alt="decor" src="/images/bgs/star.ico" />
                    <img width={'16px'} height={'16px'} style={{margin: '0 4px'}} alt="decor" src="/images/bgs/earth.ico" />
                    <div onClick={() => changeActiveSite("ImageDetails")} id="ImageDetails" className="browser-tab selected">
                        <p><img src="/images/bgs/news.ico" alt="decor" width={'16px'} height={'16px'}/>Picture</p>
                    </div>
                    <div onClick={() => changeActiveSite("SiteDetails")} id="SiteDetails" className="browser-tab" style={{borderLeft: 'none'}}>
                        <p><img src="/images/bgs/home.ico" alt="decor" width={'16px'} height={'16px'}/>About</p>
                    </div>
                    <div className="browser-tab extra-browser-tab" style={{borderLeft: 'none'}}></div>
                </div>
                <div style={{height: '3px', background: 'linear-gradient(0deg, #a7a398 0%, #bcd1ff 50%, #aabef4 100%)'}}></div>
                <div style={{background: '#bcd1ff', height: '100%', overflowY: 'scroll'}}>
                    {activeSite === "ImageDetails" ?
                        <ImageDetails/>
                    : <SiteDetails/>}
                </div>
            </div>
        </>
    )
}

export default Browser;