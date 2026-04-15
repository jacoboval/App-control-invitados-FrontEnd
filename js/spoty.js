window.onSpotifyIframeApiReady = (IFrameAPI) => {
     const element = document.getElementById('embed-iframe');
  const options = {
    width: '100%',
      height: '120',
      uri: 'https://open.spotify.com/playlist/1tAIeEwjpiJgUinr7JBYwS?si=QqBJLesIRPiqifXdKTlLgQ'
    };
  const callback = (EmbedController) => {};
  IFrameAPI.createController(element, options, callback);
  //
};