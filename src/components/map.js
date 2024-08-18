import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import L from 'leaflet';

const socket = io.connect('https://arina.lol');

const Map = () => {

    const MapWrapper = () => {

        useEffect(() => {
            socket.emit('sync_poly')
        }, [])

        const SpecialPolys = () => {

            const markerRef = useRef([])

            const [markerstate, setMarkerstate] = useState([])

            useEffect(() => {
                socket.on('set_poly', (data) => {    
                    var mark = []
                    data.markers.forEach((el) => {
                        if (el.win7id !== null) mark.push({"coordinates": el.coordinates?.reverse(), "title": el.title, "type": el.type, "link": el.link, "win7id": el.win7id})
                    })
                    setMarkerstate(mark)
                    markerRef.current = markerRef.current.slice(0, mark.length)
                })
                return () => socket.off('set_poly')
            }, [markerstate, setMarkerstate])

            const map = useMap()

            const panMap = () => {
                if (localStorage.getItem('activeImage') !== null) {
                    const id = localStorage.getItem('activeImage')
                    markerstate.forEach((el) => {
                        if(el.win7id === parseInt(id)) {
                            var latlng = [el.coordinates[0] + 0.5, el.coordinates[1]]
                            map.flyTo(latlng, 8)
                            markerRef.current.forEach((li, ind) => {
                                if(li._latlng.lat === el.coordinates[0]) console.log(markerRef.current[ind]._icon.click())
                            })
                        }
                    })
                }
            }

            const fetchImageData = (id) => {
                localStorage.setItem('activeImage', id)
                document.getElementById('fetchImageData').click()
            }


            return (
                <>
                    <button id="panmap" style={{opacity: 0}} onClick={() => panMap()} ></button>
                    {markerstate?.map((el, ind) => {
                        if (el.win7id !== null) {
                            const Link = () => {
                                return (
                                    <div key={el.win7id} style={{display: 'flex', flexDirection: 'column'}}>
                                        <button style={{border: 'outset 2px', outline: 'black 1px solid', background: 'darkgreen', color: 'white'}} id={`${el.win7id}`} onClick={(e) => fetchImageData(e.currentTarget.id)}>Open Source</button>
                                        <iframe title="Image previewer." src={`${el.link}`} alt="decor" width={'240px'} height={'120px'} />
                                        <button style={{border: 'outset 2px', outline: 'black 1px solid', background: 'darkgreen', color: 'white'}} onClick={() => document.getElementsByClassName('leaflet-popup-close-button')[0].click()}>Close</button>
                                    </div>
                                )
                            }
                            return (
                                <Marker ref={(e) => (markerRef.current[ind] = e)} key={`mark-${el.coordinates[0]}-${ind}`} icon={L.icon({iconUrl: `/images/markers/${el.type}-marker.png`, iconSize: [16, 16], iconAnchor: [8, 0], popupAnchor: [0, 0]})} position={el.coordinates} >
                                    <Popup><p>{el.title}<br/>{el?.link !== null ? <Link/> : null}</p></Popup>
                                </Marker>
                            )
                        } else {
                            return (
                                <></>
                            )
                        }
                    })}
                </>
            )
        }

        return (
            <>
                <MapContainer style={{height: '100%', zIndex: 2}} center={[41, -88]} zoom={4} scrollWheelZoom={true}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <SpecialPolys/>
                </MapContainer>
            </>
        )
    }

    return (
        <>
            <div className="screen map-grid" style={{height: 'calc(100% - 16px)', background: 'white'}}>
                <div className="nav-buttons browser-toolbar">
                    <p><u>F</u>ile</p>
                    <p><u>E</u>dit</p>
                    <p><u>V</u>iew</p>
                    <p><u>F</u>avorites</p>
                    <p><u>T</u>ools</p>
                    <p><u>H</u>elp</p>
                </div>
                <div style={{height: '3px', background: 'linear-gradient(0deg, #a7a398 0%, #bcd1ff 50%, #aabef4 100%)'}}></div>
                <div style={{background: '#bcd1ff', height: '100%'}}>
                    <MapWrapper/>
                </div>
            </div>
        </>
    )
}
export default Map;