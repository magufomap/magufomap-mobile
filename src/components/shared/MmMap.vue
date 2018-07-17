<template>
  <MapboxView
    ref="map"
    :accessToken="accessToken"
    :mapStyle="mapStyle"
    :zoomLevel="zoomLevel"
    :showUserLocation="showUserLocation"
    @mapReady="handleMapReady">
  </MapboxView>
</template>
</template>

<script>
  import config from '../../config'
  import api from '../../services/api'

  export default {
    data: () => ({
      accessToken: config.MAPBOX_ACCESS_TOKEN,
      mapStyle: "street",
      zoomLevel: 3,
      showUserLocation: true
    }),
    mounted () {
    },
    methods: {
      handleMapReady (args){
        this.map = args.map
        console.log('!!! Ready')
        this.map.trackUser({
          mode: "FOLLOW_WITH_HEADING",
          animated: true
        })
        this.map.getViewport().then((result) => {
          console.log("Mapbox getViewport done, result: " + JSON.stringify(result));
        })
      }
    }
  }
</script>
