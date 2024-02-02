import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import { apiUrl, envGoogleMapAPIKey } from "@/constants";

function Map() {
  const [defaultProps, setDefaultProps] = useState({
    center: {
      lat: 10.87551835752956,
      lng: 106.88062193286082,
    },
    zoom: 11,
  });

  console.log(envGoogleMapAPIKey, apiUrl);
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: envGoogleMapAPIKey ?? "" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        yesIWantToUseGoogleMapApiInternals
      >
        {/* {dataMap.map((marker) => (
        <Marker
          key={marker.id}
          lat={marker.latitude}
          lng={marker.longitude}
          marker={marker}
          serviceImg={dataDetail?.service?.image}
          onCancel={onCancel}
          setDriver={setDriver}
        />
      ))}
      <Marker
        key={dataDetail.id}
        lat={dataDetail.pickupLat}
        lng={dataDetail.pickupLong}
        marker={{}}
        serviceImg={"/AVATAR/AVATAR_6egcLz0cdK.png"}
        type="user"
      /> */}
      </GoogleMapReact>
    </div>
  );
}

export default Map;
