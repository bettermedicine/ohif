// Runtime, this could technically be passed in via window/as a prop from whoever renders the ohif <App />?
window.config = {
    routerBasename: '/',
    // whiteLabelling: {},
    extensions: [],
    modes: [],
    customizationService: {
      // Shows a custom route -access via http://localhost:3000/custom
      // helloPage: '@ohif/extension-default.customizationModule.helloPage',
    },
    showStudyList: true,
    maxNumberOfWebWorkers: 4,
    // below flag is for performance reasons, but it might not work for all servers
    omitQuotationForMultipartRequest: true,
    showLoadingIndicator: true,
    maxNumRequests: {
      interaction: 100,
      thumbnail: 75,
      prefetch: 10,
    },
    // filterQueryParam: false,
    dataSources: [
      {
        friendlyName: 'Better Medicine pacs',
        namespace: '@ohif/extension-default.dataSourcesModule.dicomweb',
        sourceName: 'bm-pacs',
        configuration: {
          name: 'bm-pacs',
          wadoUriRoot: '/pacs',
          qidoRoot: '/pacs',
          wadoRoot: '/pacs',
          qidoSupportsIncludeField: false,
          supportsReject: false,
          imageRendering: 'wadors',
          thumbnailRendering: 'wadors',
          enableStudyLazyLoad: false, // this queries /studies - we don't necessarily want to do that for now.
          supportsFuzzyMatching: false,
          supportsWildcard: true,
          staticWado: true,
          singlepart: 'bulkdata,video,pdf',
        },
      },
    ],
    httpErrorHandler: error => {
      // This is 429 when rejected from the public idc sandbox too often.
      console.warn(error.status);
  
      // Could use services manager here to bring up a dialog/modal if needed.
      console.warn('test, navigate to https://ohif.org/');
    },
    whiteLabeling: {
      /* Optional: Should return a React component to be rendered in the "Logo" section of the application's Top Navigation bar */
      createLogoComponentFn: function (React) {
        return React.createElement(
          'a',
          {
            target: '_self',
            rel: 'noopener noreferrer',
            className: 'text-purple-600 line-through',
            href: '/',
          },
          React.createElement('img',
            {
              src: 'assets/BMIcon.png',
              className: 'w-8 h-8',
            }
          ))
      },
    },
    defaultDataSourceName: 'bm-pacs',
    hotkeys: [
      {
        commandName: 'incrementActiveViewport',
        label: 'Next Viewport',
        keys: ['right'],
      },
      {
        commandName: 'decrementActiveViewport',
        label: 'Previous Viewport',
        keys: ['left'],
      },
      { commandName: 'rotateViewportCW', label: 'Rotate Right', keys: ['r'] },
      { commandName: 'rotateViewportCCW', label: 'Rotate Left', keys: ['l'] },
      { commandName: 'invertViewport', label: 'Invert', keys: ['i'] },
      {
        commandName: 'flipViewportHorizontal',
        label: 'Flip Horizontally',
        keys: ['h'],
      },
      {
        commandName: 'flipViewportVertical',
        label: 'Flip Vertically',
        keys: ['v'],
      },
      { commandName: 'scaleUpViewport', label: 'Zoom In', keys: ['+'] },
      { commandName: 'scaleDownViewport', label: 'Zoom Out', keys: ['-'] },
      { commandName: 'fitViewportToWindow', label: 'Zoom to Fit', keys: ['='] },
      { commandName: 'resetViewport', label: 'Reset', keys: ['space'] },
      { commandName: 'nextImage', label: 'Next Image', keys: ['down'] },
      { commandName: 'previousImage', label: 'Previous Image', keys: ['up'] },
      // {
      //   commandName: 'previousViewportDisplaySet',
      //   label: 'Previous Series',
      //   keys: ['pagedown'],
      // },
      // {
      //   commandName: 'nextViewportDisplaySet',
      //   label: 'Next Series',
      //   keys: ['pageup'],
      // },
      {
        commandName: 'setToolActive',
        commandOptions: { toolName: 'Zoom' },
        label: 'Zoom',
        keys: ['z'],
      },
      // ~ Window level presets
      {
        commandName: 'windowLevelPreset1',
        label: 'W/L Preset 1',
        keys: ['1'],
      },
      {
        commandName: 'windowLevelPreset2',
        label: 'W/L Preset 2',
        keys: ['2'],
      },
      {
        commandName: 'windowLevelPreset3',
        label: 'W/L Preset 3',
        keys: ['3'],
      },
      {
        commandName: 'windowLevelPreset4',
        label: 'W/L Preset 4',
        keys: ['4'],
      },
      {
        commandName: 'windowLevelPreset5',
        label: 'W/L Preset 5',
        keys: ['5'],
      },
      {
        commandName: 'windowLevelPreset6',
        label: 'W/L Preset 6',
        keys: ['6'],
      },
      {
        commandName: 'windowLevelPreset7',
        label: 'W/L Preset 7',
        keys: ['7'],
      },
      {
        commandName: 'windowLevelPreset8',
        label: 'W/L Preset 8',
        keys: ['8'],
      },
      {
        commandName: 'windowLevelPreset9',
        label: 'W/L Preset 9',
        keys: ['9'],
      },
    ],
  };
  