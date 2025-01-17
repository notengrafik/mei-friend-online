let orientation = 'bottom'; // position of notation
let notationProportion = .5; // proportion notation div takes from container
let resizerWidth = 8; // 8 px, Attention: hard-coded also in left.css, right.css, top.css, bottom.css

let annotationPanelExtent = 250; // px, taken away from width of friendContainer

export function setOrientation(cm, o = '', v = null, storage = null) {
  if (o) orientation = o;
  if (storage && storage.supported) storage.orientation = orientation;
  let friendSz = document.getElementById("friendContainer");
  var stylesheet = document.getElementById("orientationCSS");
  stylesheet.setAttribute('href', root + 'css/' + orientation + '.css');
  // TODO: find a better solution for changing css and awaiting changes
  // $("#orientationCSS").load(function() {
  // v.updateLayout();
  // }).attr('href', root + '/css/' + orientation + '.css');
  let sz = calcSizeOfContainer();
  let notationPane = document.getElementById('notation');
  let imagePane = document.getElementById('image-panel');
  let verovioPane = document.getElementById('verovio-panel');
  let pixContainer = document.getElementById('pix-container');
  let showSourceImage = document.getElementById('showSourceImagePanel').checked;
  let controlMenu = document.getElementById('verovio-controls-form');
  let annotationPanel = document.getElementById('annotationPanel');
  // console.log('setOrientation(' + o + ') container size:', sz);
  let showAnnotationPanelCheckbox = document.getElementById('showAnnotationPanel');
  if (orientation === "top" || orientation === "bottom") {
    if (showAnnotationPanelCheckbox && showAnnotationPanelCheckbox.checked) {
      sz.width -= annotationPanelExtent; // subtract width of annotation panel
      annotationPanel.style.display = 'unset';
      annotationPanel.style.width = annotationPanelExtent;
      annotationPanel.style.height = sz.height + 5; // HACK for 5 pix difference!
    } else {
      annotationPanel.style.display = 'none';
    }
    notationPane.style.width = sz.width; //- 6; // TODO: remove when border removed
    notationPane.style.height = sz.height * notationProportion;
    cm.setSize(sz.width, sz.height * (1 - notationProportion) - resizerWidth);
  }
  if (orientation === "left" || orientation === "right") {
    if (showAnnotationPanelCheckbox && showAnnotationPanelCheckbox.checked) {
      sz.height -= annotationPanelExtent; // subtract width of annotation panel
      annotationPanel.style.display = 'unset';
      annotationPanel.style.width = sz.width + 5; // HACK for 5 pix difference!
      annotationPanel.style.height = annotationPanelExtent;
    } else {
      annotationPanel.style.display = 'none';
    }
    notationPane.style.width = Math.ceil(sz.width * notationProportion);
    notationPane.style.height = sz.height; //- 6; TODO: remove when border removed
    cm.setSize(Math.floor(sz.width * (1 - notationProportion) - resizerWidth), sz.height);
  }
  friendSz.style.width = sz.width;
  friendSz.style.height = sz.height;
  let sourceImagePosition = document.getElementById('selectSourceImagePosition').value;
  let sourceImageProportion = document.getElementById('sourceImageProportion').value;
  switch (sourceImagePosition) {
    case 'top':
      pixContainer.style.flexDirection = 'column-reverse';
      break;
    case 'bottom':
      pixContainer.style.flexDirection = 'column';
      break;
    case 'left':
      pixContainer.style.flexDirection = 'row-reverse';
      break;
    case 'right':
      pixContainer.style.flexDirection = 'row';
      break
  }
  switch (sourceImagePosition) {
    case 'top':
    case 'bottom':
      if (showSourceImage) {
        imagePane.style.display = 'block';
        imagePane.style.height = sourceImageProportion + '%';
        verovioPane.style.height = (100 - sourceImageProportion) + '%';
      } else {
        imagePane.style.display = 'none';
        imagePane.style.height = 0;
        verovioPane.style.height = '100%';
      }
      imagePane.style.width = notationPane.style.width;
      verovioPane.style.width = notationPane.style.width;
      break;
    case 'left':
    case 'right':
      if (showSourceImage) {
        imagePane.style.display = 'block';
        imagePane.style.width = sourceImageProportion + '%';;
        verovioPane.style.width = (100 - sourceImageProportion) + '%';;
      } else {
        imagePane.style.display = 'none';
        imagePane.style.width = 0;
        verovioPane.style.width = '100%';
      }
      imagePane.style.height = parseFloat(notationPane.style.height) - controlMenu.getBoundingClientRect().height;
      verovioPane.style.height = parseFloat(notationPane.style.height) - controlMenu.getBoundingClientRect().height;
      break;
  }

  // console.info('Notation size: ' + notationPane.style.width + '/' + notationPane.style.height);
  // redoLayout when done with loading TODO
  if (v) {
    if (v.speedMode &&
      document.getElementById('breaks-select').value === 'auto') {
      v.pageBreaks = {};
      v.pageSpanners = {};
      setTimeout(() => v.updateAll(cm), 33);
    } else {
      setTimeout(() => v.updateLayout(), 33);
    }
  }
}

export function getOrientation() {
  return orientation;
}

export function calcSizeOfContainer() {
  let bodySz = document.querySelector('body').getBoundingClientRect();
  let friendSz = document.getElementById("friendContainer").getBoundingClientRect();
  let headerSz = document.querySelector('.header').getBoundingClientRect();
  //let sizerSz = document.querySelector('.resizer').getBoundingClientRect();
  let footerSz = document.querySelector('.footer').getBoundingClientRect();
  friendSz.height = bodySz.height - headerSz.height - footerSz.height - resizerWidth;
  friendSz.width = bodySz.width - resizerWidth + 2; // TODO: hack for missing 2-px-width (21 April 2022)
  // console.log('calcSizeOfContainer(' + orientation + ') bodySz, header, sizer, footer: ' +
  // Math.round(bodySz.width) + '/' + Math.round(bodySz.height) + ', ' +
  // Math.round(headerSz.width) + '/' + Math.round(headerSz.height) + ', ' +
  // Math.round(footerSz.width) + '/' + Math.round(footerSz.height) + ', ' +
  // Math.round(friendSz.width) + '/' + Math.round(friendSz.height) + '.');
  return friendSz;
}

export function getVerovioContainerSize() {
  let v = document.getElementById('notation');
  let c = document.getElementById('verovio-controls-form');
  if (!c || !v) return false;
  let vbox = v.getBoundingClientRect();
  let cbox = c.getBoundingClientRect();
  vbox.height -= cbox.height;
  return vbox;
}

export function addResizerHandlers(v, cm) {
  const resizer = document.getElementById('dragMe');
  const notation = resizer.previousElementSibling;
  const encoding = resizer.nextElementSibling;
  let x = 0;
  let y = 0;
  let notationSize = 0;

  const mouseDownHandler = function (e) {
    x = e.clientX;
    y = e.clientY;
    if (orientation === "top" || orientation === "bottom")
      notationSize = notation.getBoundingClientRect().height;
    if (orientation === "left" || orientation === "right")
      notationSize = notation.getBoundingClientRect().width;
    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
    // console.log("Mouse down x/y: " + x + "/" + y + ', ' + notationSize);
  };

  const mouseMoveHandler = function (e) {
    const dx = e.clientX - x;
    const dy = e.clientY - y;
    let sz = resizer.parentNode.getBoundingClientRect();
    let szSz = resizer.getBoundingClientRect();
    console.log("Mouse move dx/dy: " + dx + "/" + dy +
      ', Container: ' + sz.width + '/' + sz.height);
    switch (orientation) {
      case 'top':
        notation.style.height = (notationSize + dy) + szSz.height;
        notationProportion = (notationSize + dy) / sz.height;
        cm.setSize(sz.width, sz.height - (notationSize + dy) - szSz.height);
        break;
      case 'bottom':
        notation.style.height = (notationSize - dy) + szSz.height;
        console.log('notation height: ' + notation.style.height);
        notationProportion = (notationSize - dy) / sz.height;
        cm.setSize(sz.width, sz.height - (notationSize - dy) - szSz.height);
        break;
      case 'right':
        notation.style.width = (notationSize - dx) + resizerWidth;
        notationProportion = (notationSize - dx) / sz.width;
        cm.setSize(sz.width - (notationSize - dx) - resizerWidth, sz.height - szSz.width);
        break;
      case 'left':
      default:
        notation.style.width = (notationSize + dx) + resizerWidth;
        notationProportion = (notationSize + dx) / sz.width;
        cm.setSize(sz.width - (notationSize + dx) - resizerWidth, sz.height - szSz.width);
        break;
    }
    const cursor = (orientation === "left" || orientation === "right") ?
      'col-resize' : 'row-resize';
    resizer.style.cursor = cursor;
    document.body.style.cursor = cursor;
    notation.style.userSelect = 'none';
    notation.style.pointerEvents = 'none';
    encoding.style.userSelect = 'none';
    encoding.style.pointerEvents = 'none';
  };

  const mouseUpHandler = function () {
    resizer.style.removeProperty('cursor');
    document.body.style.removeProperty('cursor');
    notation.style.removeProperty('user-select');
    notation.style.removeProperty('pointer-events');
    encoding.style.removeProperty('user-select');
    encoding.style.removeProperty('pointer-events');
    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);
    if (v) {
      setOrientation(cm, '', v);
    }
  }

  resizer.addEventListener('mousedown', mouseDownHandler);
}