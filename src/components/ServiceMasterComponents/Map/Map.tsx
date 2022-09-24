import React from 'react';
import './Map.scss';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import { useSelector } from "react-redux";
import { APIState } from "../../../reducer/CommonReducer";
import { RootState } from "../../../config/Store";


const Map = () => {
    const data: any = useSelector<RootState, APIState>((state) => state.sdMaster);
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: 'AIzaSyAbGxCGRyI51IgjLi3sebel2fhLiMJ5Ygc'
    })

    return (
        <>
            <div className='map info-card py-2'>
                <div className='service-location-text'>Service Location</div>
                <div className='address mt-2'>{data?.sd_master?.Address1} {data?.sd_master?.Address2}</div>
                <div className='address'>{data?.sd_master?.City}, {data?.sd_master?.State}, {data?.sd_master?.ZipCode}</div>
                <div>
                    {
                        isLoaded &&
                        <GoogleMap
                            zoom={10}
                            center={{ lat: Number(data?.sd_master?.GeoLocationLatitude) ? Number(data?.sd_master?.GeoLocationLatitude) : 44, lng: Number(data?.sd_master?.GeoLocationLongitude) ? Number(data?.sd_master?.GeoLocationLongitude) : -80 }}
                            mapContainerClassName="map-container">
                            <Marker position={{ lat: Number(data?.sd_master?.GeoLocationLatitude), lng: Number(data?.sd_master?.GeoLocationLongitude) }} />
                        </GoogleMap>
                    }
                </div>
            </div>
        </>
    )
}

export default Map;