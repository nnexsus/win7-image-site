import { useEffect, useState } from "react"

const baubles = [
    {hue: 'hue-shift(0deg)', desc: 'Featured Image!'}, 
    {hue: 'hue-rotate(195deg) saturate(1.5)', desc: 'New!'}, 
    {hue: 'hue-rotate(302deg) saturate(1.5)', desc: 'Updated!'}, 
    {hue: 'hue-rotate(98deg)', desc: 'New, but older image.'}, 
    {hue: 'saturate(2) hue-rotate(53deg)', desc: 'File expiring! Will be removed soon.'}, 
    {hue: 'saturate(0)', desc: 'Particularly Large File.'}, 
    {hue: 'hue-rotate(98deg)', desc: 'Raw image type.'}, 
    {hue: 'hue-rotate(147deg) saturate(2.5) brightness(1.2)', desc: 'Personal Favorite!'}
]

const Files = ({files}) => {

    const [curNav, setCurNav] = useState(6)
    const [pastNav, setPastNav] = useState([6])
    const [recentNav, setRecentNav]= useState(6)
    const [fileStore, setFileStore] = useState({"images": [], "folders": [{"id": 6, "title": "Pictures", "icon": "/images/bgs/image-folder.ico"}, {"id": 7, "title": "Videos", "icon": "/images/bgs/video-folder.ico"}]})
    const [folder, setFolder] = useState("")

    const fetchImageData = (id) => {
        localStorage.setItem('activeImage', id)
        document.getElementById('fetchImageData').click()
        document.getElementById('fetchImageDetails').click()
    }

    const searchQuery = (value) => {
        localStorage.setItem('searchQuery', value)
    }

    useEffect(() => {
        setFileStore({"images": files.images, "folders": files.folders})
    }, [files])

    const folderNav = (id) => {
        var navback = [...pastNav]
        navback.push(curNav)
        setPastNav(navback)
        setCurNav(parseInt(id))
        setRecentNav(parseInt(id))
        fileStore.folders.forEach((el) => {
            if (el.id === id) setFolder(el.title)
        })
    }

    const navBack = () => {
        var navback = [...pastNav]
        var x = navback.pop()
        setPastNav(navback.length === 0 ? [6] : navback)
        setCurNav(x)
        fileStore.folders.forEach((el) => {
            if (el.id === x) setFolder(el.title)
        })
    }

    const navForward = () => {
        var navback = [...pastNav]
        navback.push(curNav)
        setPastNav(navback)
        setCurNav(recentNav)
    }

    const FileGrid = () => {

        const [files, setFiles] = useState({"images": [], "folders": []})

        const searchFiles = () => {
            if (localStorage.getItem('searchQuery') === "") {
                setFiles(fileStore)
            }
            if (localStorage.getItem('searchQuery') !== null) {
                const value = localStorage.getItem('searchQuery')
                var fi = [];
                var fo = [];
                fileStore.folders.forEach((el) => {
                    if (el.title.toLowerCase().includes(value.toLowerCase())) fo.push(el)
                })
                fileStore.images.forEach((el) => {
                    if (el.title.toLowerCase().includes(value.toLowerCase())) fi.push(el)
                })
                setFiles({"images": fi, "folders": fo})
            }
        }

        useEffect(() => {
            setFiles(fileStore)
        }, [curNav, setCurNav, fileStore, setFileStore])

        const imgError = (target) => {
            target.src = '/images/bgs/image-icon.ico';
            target.style.aspectRatio = '16/9';
        }

        return (
            <div className="file-grid">
                <button style={{display: 'none'}} id="searchQuery" onClick={() => searchFiles()}></button>
                {files.folders.map((el) => {
                    if (el.folder === curNav) {
                        return (
                            <button key={`folder-file-${el.id}`} onClick={(e) => folderNav(e.currentTarget.id)} id={`${el.id}`} className="file-folder" style={{width: '115px', height: '115px', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '15px'}}>
                                <div style={{height: '67px', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundImage: 'url(/images/bgs/folder-half-back.ico)', backgroundSize: '100% 100%'}}>
                                    <img alt="decor" width={'60px'} height={'60px'} src={`/images/bgs/folder-half-front.ico`} style={{marginLeft: '-8px', marginBottom: '-60px', zIndex: 8}} />
                                    <img alt="decor" width={'60px'} height={'45px'} src={`${el.icon}`} style={{marginLeft: '4px', marginTop: '10px', zIndex: 7, transform: 'skewY(16deg)'}} />
                                </div>
                                <p style={{height: '1px'}}>{el.title}</p>
                            </button>
                        )
                    } else {
                        return (
                            <></>
                        )
                    }
                })}
                {files.images.map((el) => {
                    if (el.folder === curNav) {
                        console.log(el.public)
                        return ( 
                            <a key={`image-file-${el.id}`} href="#details" style={{cursor: 'default'}}>
                                {el.public !== null ?
                                    <img alt="decor" width={'16px'} height={'16px'} src={`/images/bgs/bauble.png`} title={`${baubles[el.public].desc}`} style={{marginLeft: '105px', marginBottom: '-35px', zIndex: 500, imageRendering: 'pixelated', filter: `${baubles[el.public].hue}`}} />
                                : null}
                                <button id={`${el.id}`} onClick={(e) => fetchImageData(e.currentTarget.id)} className="file-file" style={{width: '115px', height: '115px', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '15px', backgroundImage: `${el.type === "video" ? 'url(/images/bgs/film-reel-border.ico)' : 'none'}`, backgroundSize: '100% 100%'}}>
                                    <img alt="decor" width={'60px'} style={{aspectRatio: '16/9', border: 'solid 2px white', outline: '1px solid lightgray', borderRadius: '1px'}} onError={(e) => imgError(e.currentTarget)} src={`https://arina.lol/api/win7/thumb/${el.thumb}`} />
                                    <p>{el.title}</p>
                                </button>
                            </a>
                        )
                    } else {
                        return (
                            <></>
                        )
                    }
                })}
            </div>
        )
    }

    const FileDetails = ({files}) => {

        const [imagedata, setImagedata] = useState({camera: '', dim: '', ap: '', exp: '', iso: '', mm: '', size: ''})

        const [detailStore, setDetailStore] = useState({"images": [], "folders": [
            {
              "id": 6,
              "title": "Pictures",
              "icon": "/images/bgs/image-folder.png"
            },
            {
                "id": 7,
                "title": "Videos",
                "icon": "/images/bgs/video-folder.png"
        }]})

        const fetchImageData = () => {
            if (localStorage.getItem('activeImage') !== null) {
                detailStore.images.forEach((el) => {
                if (el.id === parseInt(localStorage.getItem('activeImage'))) {
                    if (el.settings === null) return setImagedata({camera: '', dim: '', ap: '', exp: '', iso: '', mm: '', size: ''})
                    var re = el.settings.replace(/'/g, '"')
                    setImagedata(JSON.parse(re))
                }
              })
            }
        }

        useEffect(() => {
            setDetailStore(files)
        }, [files])

        return (
            <>
                <button id="fetchImageDetails" onClick={() => fetchImageData()} style={{display: 'none'}} ></button>
                <div className="mobile-hide" style={{display: 'flex', justifyContent: 'space-between', margin: '0 13px', overflow: 'hidden'}}>
                    <p style={{marginTop: '2px', color: 'gray'}}>Camera: <br/><span style={{color: '#248aab'}}>{imagedata.camera}</span></p>
                    <p style={{marginTop: '2px', color: 'gray'}}>Dimensions: <br/><span style={{color: '#248aab'}}>{imagedata.dim}</span></p>
                    <p style={{marginTop: '2px', color: 'gray'}}>Aperature: <br/><span style={{color: '#248aab'}}>{imagedata.ap}</span></p>
                    <p style={{marginTop: '2px', color: 'gray'}}>Exposure: <br/><span style={{color: '#248aab'}}>{imagedata.exp}</span></p>
                    <p style={{marginTop: '2px', color: 'gray'}}>ISO: <br/><span style={{color: '#248aab'}}>{imagedata.iso}</span></p>
                    <p style={{marginTop: '2px', color: 'gray'}}>Focal (mm): <br/><span style={{color: '#248aab'}}>{imagedata.mm}</span></p>
                    <p style={{marginTop: '2px', color: 'gray'}}>Filesize: <br/><span style={{color: '#248aab'}}>{imagedata.size}</span></p>
                </div>
            </>
        )
    }

    return (
        <>
            <div className="toolbar">
                <div className="nav-buttons">
                    <div style={{zIndex: 3}}><button onClick={() => navBack()}><img alt="decor" width={'16px'} height={'16px'} src="/images/bgs/nav-arrow.png" /></button></div>
                    <div style={{borderRadius: 0, marginLeft: '-15px', marginRight: '-15px', zIndex: 2, width: '15px', height: '19px', marginTop: '3px'}}></div>
                    <div style={{zIndex: 3}}><button onClick={() => navForward()}><img alt="decor" width={'16px'} height={'16px'} src="/images/bgs/nav-arrow.png" style={{transform: 'rotateY(180deg)'}} /></button></div>
                </div>
                <button style={{width: '25px', background: 'none', border: 'none'}}>▾</button>
                <div className="textbox">
                    <input type="text" disabled value={`C:\\users\\win7\\${folder}`} style={{color: 'black', marginLeft: '5px'}} />
                    <button style={{width: '25px', background: 'none', border: 'none'}}>▾</button>
                    <button style={{width: '25px', background: 'none', border: 'none', borderLeft: 'solid black 1px'}}><img width={'16px'} height={'16px'} alt="decor" src="/images/bgs/refresh.ico" /></button>
                </div>
                <div className="textbox">
                    <input type="text" onChange={(e) => searchQuery(e.currentTarget.value)} />
                    <button onClick={() => document.getElementById('searchQuery').click()} style={{width: '25px', background: 'none', border: 'none', cursor: 'pointer'}}><img width={'16px'} height={'16px'} alt="decor" src="/images/bgs/magnifier.ico" /></button>
                </div>
            </div>

            <div className="screen file-explorer-grid" style={{height: 'calc(100% - 58px)', background: 'white'}}>
                <div className="file-top-bar">
                    <div>
                        <button>Organize ▾</button>
                        <button><img alt="decor" width={'16px'} height={'16px'} src="/images/bgs/photo-icon.png" />Open ▾</button>
                        <button>Print</button>
                        <button>Burn</button>
                    </div>
                    <div>
                        <p style={{pointerEvents: 'none', color: 'gray'}}>|</p>
                        <button><img alt="decor" width={'16px'} height={'16px'} src="/images/bgs/photo-icon.png" />▾</button>
                        <button><img alt="decor" width={'16px'} height={'16px'} src="/images/bgs/help.ico" /></button>
                    </div>
                </div>

                <div className="file-navigator">
                    <div>
                        <p style={{cursor: 'pointer', margin: '2px 5px', border: 'solid rgba(0,0,0,0.2) 1px'}} onClick={() => folderNav('6')}><img alt="decor" width={'16px'} height={'16px'} src="/images/bgs/photo-icon.png" style={{margin: '0 6px'}} /> Pictures</p>
                        <p style={{cursor: 'pointer', margin: '2px 5px', border: 'solid rgba(0,0,0,0.2) 1px'}} onClick={() => folderNav('7')}><img alt="decor" width={'16px'} height={'16px'} src="/images/bgs/video-icon.png" style={{margin: '0 6px'}} /> Videos</p>
                    </div>
                </div>

                <FileGrid/>

                <div className="file-details">
                    <FileDetails files={files}/>
                </div>
            </div>
        </>
    )
}

export default Files;