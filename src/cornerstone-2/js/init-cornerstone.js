// Packages
// import Hammer from "hammerjs";
// import dicomParser from "dicom-parser";
// import * as cornerstone from "cornerstone-core";
// import * as cornerstoneMath from "cornerstone-math";
// import * as cornerstoneWADOImageLoader from "cornerstone-wado-image-loader";
// import * as cornerstoneTools from "@cornerstonejs/tools";

// Externals
cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
cornerstoneWADOImageLoader.external.dicomParser = dicomParser;
cornerstoneTools.external.cornerstoneMath = cornerstoneMath;
cornerstoneTools.external.cornerstone = cornerstone;
cornerstoneTools.external.Hammer = Hammer;

// WadoImageLoader Registration/Config
const config = {
    webWorkerPath: "/cornerstone-2/codecs/cornerstoneWADOImageLoaderWebWorker.js",
    taskConfiguration: {
        decodeTask: {
        codecsPath: "/cornerstone-2/codecs/cornerstoneWADOImageLoaderCodecs.js"
        }
    }
};
cornerstoneWADOImageLoader.webWorkerManager.initialize(config);
cornerstoneWADOImageLoader.initialized = true;

cornerstoneTools.init({
    globalToolSyncEnabled: true
});

// Grab Tool Classes
const WwwcTool = cornerstoneTools.WwwcTool;
const PanTool = cornerstoneTools.PanTool;
const PanMultiTouchTool = cornerstoneTools.PanMultiTouchTool;
const ZoomTool = cornerstoneTools.ZoomTool;
const ZoomTouchPinchTool = cornerstoneTools.ZoomTouchPinchTool;
const ZoomMouseWheelTool = cornerstoneTools.ZoomMouseWheelTool;

// Add them
cornerstoneTools.addTool(PanTool);
cornerstoneTools.addTool(ZoomTool);
cornerstoneTools.addTool(WwwcTool);
cornerstoneTools.addTool(PanMultiTouchTool);
cornerstoneTools.addTool(ZoomTouchPinchTool);
cornerstoneTools.addTool(ZoomMouseWheelTool);

// Set tool modes
cornerstoneTools.setToolActive("Pan", { mouseButtonMask: 4 }); // Middle
cornerstoneTools.setToolActive("Zoom", { mouseButtonMask: 2 }); // Right
cornerstoneTools.setToolActive("Wwwc", { mouseButtonMask: 1 }); // Left & Touch
cornerstoneTools.setToolActive("PanMultiTouch", {});
cornerstoneTools.setToolActive("ZoomMouseWheel", {});
cornerstoneTools.setToolActive("ZoomTouchPinch", {});

// DOM MUST BE LOADED
// Enable Canvas
this.canvas = document.querySelector('#cornerstone-element');
cornerstone.enable(this.canvas, {
    renderer: "webgl"
});

// Load Image
const baseUrl = `${window.location.protocol}//${window.location.host}/cornerstone-2`;
const imageId = `wadouri:${baseUrl}/test.dcm`;
cornerstone.loadImage(imageId).then(image => {
    cornerstone.displayImage(this.canvas, image);
});

setTimeout(() => {
    cornerstone.loadImage(imageId).then(image => {
    cornerstone.displayImage(this.canvas, image);
    });
}, 500);