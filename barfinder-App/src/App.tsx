import React, { useRef } from 'react'
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useJsApiLoader,
} from '@react-google-maps/api'
// Styles
import { Wrapper, LoadingView } from './App.styles'
import { containerStyle, options, center } from './settings'

const App: React.FC = () => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-maps-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY!,
  })

  // Save map in ref if we want to access the map
  const mapRef = useRef<google.maps.Map<Element> | null>(null)

  const onLoad = (map: google.maps.Map<Element>): void => {
    mapRef.current = map
  }

  // clean up function
  const onUnmount = () => {
    mapRef.current = null
  }

  if (!isLoaded) return <div>Map Loading...</div>
  return (
    <Wrapper>
      <GoogleMap
        mapContainerStyle={containerStyle}
        options={options as google.maps.MapOptions}
        onLoad={onLoad}
        center={center}
        zoom={13}
        onUnmount={onUnmount}
      />
    </Wrapper>
  )
}

export default App
