import { useEffect, useState } from "react"

const Files = ({files}) => {

    const [curNav, setCurNav] = useState(6)
    const [pastNav, setPastNav] = useState(6)
    const [fileStore, setFileStore] = useState({"images": [], "folders": [{"id": 6, "title": "Pictures", "icon": "/images/bgs/image-folder.ico"}, {"id": 7, "title": "Videos", "icon": "/images/bgs/video-folder.ico"}]})

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
        setPastNav(curNav)
        setCurNav(parseInt(id))
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

        return (
            <div className="file-grid">
                <button style={{display: 'none'}} id="searchQuery" onClick={() => searchFiles()}></button>
                {files.folders.map((el) => {
                    if (el.folder === curNav) {
                        return (
                            <button key={`folder-file-${el.id}`} onClick={(e) => folderNav(e.currentTarget.id)} id={`${el.id}`} className="file-folder" style={{width: '125px', height: '125px', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '15px'}}>
                                <img alt="decor" width={'60px'} height={'60px'} src={`${el.icon}`} />
                                <p>{el.title}</p>
                            </button>
                        )
                    }
                })}
                {files.images.map((el) => {
                    if (el.folder === curNav) {
                        return ( 
                            <a key={`image-file-${el.id}`} href="#details">
                                <button id={`${el.id}`} onClick={(e) => fetchImageData(e.currentTarget.id)} className="file-file" style={{width: '125px', height: '125px', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '15px'}}>
                                    <img alt="decor" width={'60px'} style={{aspectRatio: '16/9'}} src={`https://arina.lol/api/win7/thumb/${el.thumb}`} />
                                    <p>{el.title}</p>
                                </button>
                            </a>
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
                    console.log(re)
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
                <div style={{display: 'flex', justifyContent: 'space-between', margin: '0 13px'}}>
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
                    <div style={{zIndex: 3}}><button onClick={() => folderNav(pastNav)}><img alt="decor" width={'16px'} height={'16px'} src="/images/bgs/nav-arrow.png" /></button></div>
                    <div style={{borderRadius: 0, marginLeft: '-15px', marginRight: '-15px', zIndex: 2, width: '15px', height: '19px', marginTop: '3px'}}></div>
                    <div style={{zIndex: 3}}><button onClick={() => folderNav(pastNav)}><img alt="decor" width={'16px'} height={'16px'} src="/images/bgs/nav-arrow.png" style={{transform: 'rotateY(180deg)'}} /></button></div>
                </div>
                <button style={{width: '25px', background: 'none', border: 'none'}}>▾</button>
                <div className="textbox">
                    <input type="text" disabled value={`C:\\users\\win7\\`} style={{color: 'black', marginLeft: '5px'}} />
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
                        <p style={{cursor: 'pointer', margin: '2px 5px'}}><img alt="decor" width={'16px'} height={'16px'} src="/images/bgs/photo-icon.png" style={{margin: '0 6px'}} onClick={() => folderNav(6)} /> Pictures</p>
                        <p style={{cursor: 'pointer', margin: '2px 5px'}}><img alt="decor" width={'16px'} height={'16px'} src="/images/bgs/video-icon.png" style={{margin: '0 6px'}} onClick={() => folderNav(7)} /> Videos</p>
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