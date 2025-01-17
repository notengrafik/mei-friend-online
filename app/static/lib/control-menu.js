import * as icon from './../css/icons.js';
import {
  fontList
} from './main.js';
import {
  svgNameSpace
} from './dom-utils.js'

export function createControlsMenu(parentElement, scale) {

  // Create control form
  let controlsForm = document.createElement('div');
  controlsForm.classList.add('control-menu');
  controlsForm.id = 'verovio-controls-form';
  parentElement.appendChild(controlsForm);

  // Zoom controls
  let zoomCtrls = document.createElement('div');
  zoomCtrls.id = 'zoom-ctrls';
  zoomCtrls.classList.add('controls');
  controlsForm.appendChild(zoomCtrls);

  let decreaseBtn = document.createElement('button');
  decreaseBtn.id = "decrease-scale-btn";
  decreaseBtn.classList.add('btn');
  decreaseBtn.classList.add('icon');
  decreaseBtn.innerHTML = icon.diffRemoved;
  decreaseBtn.classList.add('inline-block-tight');
  decreaseBtn.title = 'Decrease notation';
  zoomCtrls.appendChild(decreaseBtn);

  let zoomCtrl = document.createElement("input");
  zoomCtrl.id = 'verovio-zoom';
  zoomCtrl.classList.add('input-range');
  zoomCtrl.setAttribute('type', 'range');
  zoomCtrl.setAttribute('min', 10);
  zoomCtrl.setAttribute('max', 200);
  zoomCtrl.setAttribute('step', 1);
  zoomCtrl.setAttribute('value', `${scale}`);
  zoomCtrls.appendChild(zoomCtrl);
  zoomCtrl.title = 'Scale size of notation';

  let increaseBtn = document.createElement('button');
  increaseBtn.id = "increase-scale-btn";
  increaseBtn.classList.add('btn');
  increaseBtn.classList.add('icon');
  increaseBtn.innerHTML = icon.diffAdded;
  increaseBtn.classList.add('inline-block-tight');
  increaseBtn.title = 'Increase notation';
  zoomCtrls.appendChild(increaseBtn);

  // Pagination, page navigation
  let paginationCtrls = document.createElement('div');
  paginationCtrls.id = 'pagination-ctrls';
  paginationCtrls.classList.add('controls');
  controlsForm.appendChild(paginationCtrls);

  let sectionSelector = document.createElement('select');
  sectionSelector.id = "section-selector";
  sectionSelector.classList.add('icon');
  sectionSelector.classList.add('btn');
  // sectionSelector.classList.add('icon-multi-select');
  sectionSelector.classList.add('inline-block-tight');
  sectionSelector.title = 'Navigate encoded section/ending structure';
  sectionSelector.style.display = 'none';
  paginationCtrls.appendChild(sectionSelector);

  let firstBtn = document.createElement('button');
  firstBtn.id = "first-page-btn";
  firstBtn.classList.add('icon');
  firstBtn.classList.add('btn');
  firstBtn.innerHTML = icon.chevronFirst;
  firstBtn.classList.add('inline-block-tight');
  firstBtn.title = 'Flip to first page';
  firstBtn.setAttribute('type', 'button');
  firstBtn.setAttribute('value', 'first');
  paginationCtrls.appendChild(firstBtn);

  let prevBtn = document.createElement('button');
  prevBtn.id = "prev-page-btn";
  prevBtn.classList.add('icon');
  prevBtn.classList.add('btn');
  prevBtn.innerHTML = icon.chevronLeft;
  prevBtn.classList.add('inline-block-tight');
  prevBtn.title = 'Flip to previous page';
  prevBtn.setAttribute('type', 'button');
  prevBtn.setAttribute('value', 'backwards');
  paginationCtrls.appendChild(prevBtn);

  let paginationLabel = document.createElement('label');
  paginationLabel.id = 'pagination-label';
  paginationLabel.classList.add('label');
  paginationLabel.title = 'Page navigation: click to manually enter page number to be displayed';

  let pagination1 = document.createElement('div');
  pagination1.innerHTML = 'Loading';
  pagination1.id = 'pagination1';
  let pagination2 = document.createElement('div');
  pagination2.id = 'pagination2';
  pagination2.contentEditable = true;
  pagination2.title = 'Click to enter page number';
  let pagination3 = document.createElement('div');
  pagination3.id = 'pagination3';
  paginationLabel.appendChild(pagination1);
  paginationLabel.appendChild(pagination2);
  paginationLabel.appendChild(pagination3);
  paginationCtrls.appendChild(paginationLabel);

  let nextBtn = document.createElement('button');
  nextBtn.id = "next-page-btn";
  nextBtn.classList.add('btn');
  nextBtn.classList.add('icon');
  nextBtn.innerHTML = icon.chevronRight;
  nextBtn.classList.add('inline-block-tight');
  nextBtn.title = 'Flip to next page';
  nextBtn.setAttribute('type', 'button');
  nextBtn.setAttribute('value', 'forwards');
  paginationCtrls.appendChild(nextBtn);

  let lastBtn = document.createElement('button');
  lastBtn.id = "last-page-btn";
  lastBtn.classList.add('btn');
  lastBtn.classList.add('icon');
  lastBtn.innerHTML = icon.chevronLast;
  lastBtn.classList.add('inline-block-tight');
  lastBtn.title = 'Flip to last page';
  lastBtn.setAttribute('type', 'button');
  lastBtn.setAttribute('value', 'last');
  paginationCtrls.appendChild(lastBtn);

  // Flips notation automatically to cursor position in encoding
  let flipCheckbox = document.createElement('input');
  flipCheckbox.id = "flip-checkbox";
  flipCheckbox.setAttribute('type', 'checkbox');
  flipCheckbox.setAttribute('value', 'autoFlip');
  flipCheckbox.setAttribute('checked', 'true');
  flipCheckbox.title = 'Automatically flip page to encoding cursor position';
  paginationCtrls.appendChild(flipCheckbox);
  // manually flip to cursor position
  let flipBtn = document.createElement('button');
  flipBtn.id = "flip-btn";
  flipBtn.classList.add('btn');
  flipBtn.classList.add('icon');
  flipBtn.innerHTML = icon.flipToEncoding; // icon-alignment-aligned-to
  flipBtn.classList.add('inline-block-tight');
  flipBtn.title = 'Flip page manually to encoding cursor position';
  flipBtn.setAttribute('type', 'button');
  flipBtn.setAttribute('value', 'update');
  flipBtn.disabled = true;
  paginationCtrls.appendChild(flipBtn);

  flipCheckbox.addEventListener('change', () => {
    flipBtn.disabled = flipCheckbox.checked;
  });


  // breaks selector
  let breaksCtrls = document.createElement('div');
  breaksCtrls.id = 'breaks-ctrls';
  // breaksCtrls.classList.add('block');
  breaksCtrls.classList.add('controls');
  controlsForm.appendChild(breaksCtrls);

  let breaksSelector = document.createElement('select');
  breaksSelector.id = 'breaks-select';
  breaksSelector.classList.add('btn');
  breaksSelector.classList.add('input-select');
  breaksCtrls.title = 'Define system/page breaks behavior of notation';
  breaksCtrls.appendChild(breaksSelector);


  // MEI encoding update behavior
  let updateCtrls = document.createElement('div');
  updateCtrls.id = 'update-ctrls';
  // updateCtrls.classList.add('block');
  updateCtrls.classList.add('controls');
  controlsForm.appendChild(updateCtrls);

  let updateLabel = document.createElement('label');
  updateLabel.innerText = 'Update: ';
  updateLabel.classList.add('label');
  updateCtrls.appendChild(updateLabel);
  updateLabel.title = 'Control update behavior of notation after changes in encoding';

  let codeUpdateCheckbox = document.createElement("input");
  codeUpdateCheckbox.id = 'live-update-checkbox';
  codeUpdateCheckbox.setAttribute('type', 'checkbox');
  codeUpdateCheckbox.setAttribute('checked', 'true');
  codeUpdateCheckbox.title = 'Automatically update notation after changes in encoding';
  updateLabel.setAttribute('for', codeUpdateCheckbox.id);
  updateCtrls.appendChild(codeUpdateCheckbox);

  let codeUpdateBtn = document.createElement('button');
  codeUpdateBtn.id = "code-update-btn";
  codeUpdateBtn.classList.add('btn');
  codeUpdateBtn.classList.add('icon');
  codeUpdateBtn.innerHTML = icon.symLinkFile; // icon-alignment-aligned-to
  codeUpdateBtn.classList.add('inline-block-tight');
  codeUpdateBtn.title = 'Update notation manually';
  // codeUpdateBtn.innerHTML = 'Redo';
  codeUpdateBtn.setAttribute('type', 'button');
  codeUpdateBtn.setAttribute('value', 'codeUpdate');
  codeUpdateBtn.disabled = true;
  updateCtrls.appendChild(codeUpdateBtn);

  codeUpdateCheckbox.addEventListener('change', () => {
    codeUpdateBtn.disabled = codeUpdateCheckbox.checked;
  });


  // font selector
  let fontCtrls = document.createElement('div');
  fontCtrls.id = 'font-ctrls';
  fontCtrls.classList.add('controls');
  controlsForm.appendChild(fontCtrls);

  let fontSelector = document.createElement('select');
  fontSelector.id = 'font-select';
  fontSelector.classList.add('btn');
  fontCtrls.title = 'Select engraving font';
  fontSelector.classList.add('input-select');
  fontList.forEach(font => fontSelector.add(new Option(font)));
  fontCtrls.appendChild(fontSelector);

  // navigation controls
  let navigateCtrls = document.createElement('div');
  navigateCtrls.id = 'navigate-ctrls';
  // navigateCtrls.classList.add('block');
  navigateCtrls.classList.add('controls');
  controlsForm.appendChild(navigateCtrls);

  let backwardsBtn = document.createElement('button');
  backwardsBtn.id = "backwards-btn";
  backwardsBtn.classList.add('btn');
  backwardsBtn.classList.add('icon');
  backwardsBtn.innerHTML = icon.arrowLeft;
  backwardsBtn.classList.add('inline-block-tight');
  backwardsBtn.title = 'Navigate to left in notation';
  navigateCtrls.appendChild(backwardsBtn);

  let forwardsBtn = document.createElement('button');
  forwardsBtn.id = "forwards-btn";
  forwardsBtn.classList.add('btn');
  forwardsBtn.classList.add('icon');
  forwardsBtn.innerHTML = icon.arrowRight;
  forwardsBtn.classList.add('inline-block-tight');
  forwardsBtn.title = 'Navigate to right in notation';
  navigateCtrls.appendChild(forwardsBtn);

  let upwardsBtn = document.createElement('button');
  upwardsBtn.id = "upwards-btn";
  upwardsBtn.classList.add('btn');
  upwardsBtn.classList.add('icon');
  upwardsBtn.innerHTML = icon.arrowUp;
  upwardsBtn.classList.add('inline-block-tight');
  upwardsBtn.title = 'Navigate upwards in notation';
  navigateCtrls.appendChild(upwardsBtn);

  let downwardsBtn = document.createElement('button');
  downwardsBtn.id = "downwards-btn";
  downwardsBtn.classList.add('btn');
  downwardsBtn.classList.add('icon');
  downwardsBtn.innerHTML = icon.arrowDown;
  downwardsBtn.classList.add('inline-block-tight');
  downwardsBtn.title = 'Navigate downwards in notation';
  navigateCtrls.appendChild(downwardsBtn);

  let speedDiv = document.createElement('div');
  speedDiv.id = 'speed-div';
  speedDiv.classList.add('controls');
  controlsForm.appendChild(speedDiv);

  let verovioIcon = document.createElement('div');
  verovioIcon.innerHTML = icon.verovioV;
  verovioIcon.id = 'verovio-icon';
  verovioIcon.title = `Worker activity:
clockwise denotes Verovio activity,
anticlockwise speed worker activity`;
  speedDiv.appendChild(verovioIcon);

  let speedLabel = document.createElement('label');
  speedLabel.innerText = 'Speedmode:';
  speedLabel.id = 'speed-label';
  speedLabel.classList.add('label');
  speedDiv.appendChild(speedLabel);
  speedLabel.title = `In Speedmode, only the current page
is sent to Verovio to reduce rendering
time with large files`;

  let speedCheckbox = document.createElement('input');
  speedCheckbox.id = "speed-checkbox";
  speedCheckbox.setAttribute('type', 'checkbox');
  speedCheckbox.setAttribute('checked', 'false');
  speedCheckbox.classList.add('checkbox');
  speedCheckbox.title = 'Activate speedmode';
  speedLabel.setAttribute('for', speedCheckbox.id);
  speedCheckbox.checked = true;
  speedCheckbox.disabled = false;
  speedDiv.appendChild(speedCheckbox);

  // Create container element for pixel content (svg and jpg)
  let pixPanel = document.createElement('div');
  pixPanel.id = 'pix-container';
  parentElement.appendChild(pixPanel);

  // Create container element for Verovio SVG
  let verovioPanel = document.createElement('div');
  verovioPanel.id = 'verovio-panel';
  pixPanel.appendChild(verovioPanel);

  // Create container element for Source Edition Image
  let imagePanel = document.createElement('div');
  imagePanel.id = 'image-panel';
  imagePanel.style.display = 'none';
  var svg = document.createElementNS(svgNameSpace, 'svg');
  svg.id = 'source-image-container';
  var g = document.createElementNS(svgNameSpace, 'svg');
  g.id = 'source-image-svg';
  svg.appendChild(g);
  imagePanel.append(svg);
  pixPanel.appendChild(imagePanel);

} // createControlsMenu()

export function manualCurrentPage(v, cm, ev) {
  console.debug('manualCurrentPage: ', ev);
  ev.stopPropagation();
  if (ev.key === 'Enter' || ev.type === 'blur') {
    ev.preventDefault();
    let pageInput = parseInt(ev.target.innerText);
    if (pageInput) v.updatePage(cm, pageInput);
    v.updatePageNumDisplay();
  }
}

export function setBreaksOptions(tkAvailableOptions, defaultValue = 'auto') {
  if (defaultValue === '') defaultValue = 'auto';
  let breaksEl = document.getElementById('breaks-select');
  var breaksOpts = {
    none: 'None',
    auto: 'Automatic',
    // measure: 'Measure',
    line: 'System',
    encoded: 'System and page',
    smart: 'Smart'
  };
  for (let key of Object.keys(breaksOpts)) {
    breaksEl[breaksEl.options.length] = new Option(breaksOpts[key], key);
    if (key === 'smart') breaksEl[breaksEl.length - 1].disabled = true;
  }
  // var breaks = utils.findKey('breaks', tkAvailableOptions);
  // for (let index of breaks.values) {
  //   if (breaksOpts[index]) {
  //     breaksEl[breaksEl.options.length] = new Option(breaksOpts[index], index);
  //     if (index === defaultValue) {
  //       breaksEl[breaksEl.options.length - 1].selected = 'selected';
  //     }
  //   } else {
  //     breaksEl[breaksEl.options.length] = new Option(index, index);
  //   }
  // disable breaks=smart by default; only enabled with speedMode=false
  //   if (index === 'smart') breaksEl[breaksEl.length - 1].disabled = true;
  // }
}

export function handleSmartBreaksOption(speedMode) {
  let options = Array.from(document.getElementById('breaks-select').options);
  options.forEach(o => {
    if (o.value === 'smart') {
      if (speedMode && o.selected) {
        options.forEach(o => {
          if (o.value === 'auto') o.selected = true;
        });
      }
      o.disabled = speedMode;
    }
  });
}

// checks xmlDoc for section, ending, lem, rdg elements for quick navigation
export function generateSectionSelect(xmlDoc) {
  let selector = 'section,ending,lem,rdg';
  let sections = [ //first option with empty string for Firefox (TODO: beautify)
    ['', '']
  ];
  let baseSection = xmlDoc.querySelector('music score');
  if (baseSection) {
    let els = baseSection.querySelectorAll(selector);
    els.forEach(el => {
      let str = '';
      let parent = el.parentElement.closest(selector);
      if (parent) {
        str += '│ ';
        while (parent = parent.parentElement.closest(selector))
          str += '│ '; // &#9474;&nbsp; for indentation
      }
      sections.push([str + el.getAttribute('xml:id'), el.getAttribute('xml:id')]);
    });
    if (sections.length === 2) sections.pop(); // remove if only the one section
  }
  return sections;
}

export function addModifyerKeys(root) {
  let modifierKeys = {
    altKey: {
      symbol: "&#8997;",
      text: 'Alt',
      description: 'Alt key'
    }, // ALT
    shiftKey: {
      symbol: "&#8679;",
      text: "Shift",
      description: 'Shift key'
    }, // SHIFT
    cmd2Key: {
      symbol: "&#8997;",
      text: 'Alt',
      description: 'Alt key'
    }, // ALT
    cmdKey: {
      symbol: "&#8963;",
      text: 'Ctrl',
      description: 'Ctrl key'
    }, // CTRL
    ctrlKey: {
      symbol: "&#8963;",
      text: 'Ctrl',
      description: 'Ctrl key'
    }, // CTRL
  }
  // MAC key mapping
  if (navigator.platform.startsWith('Mac')) {
    modifierKeys.cmdKey = {
      symbol: "&#8984;",
      text: 'Cmd',
      description: 'Cmd key'
    }; // CMD
    modifierKeys.cmd2Key = {
      symbol: "&#8963;",
      text: 'Ctrl',
      description: 'Ctrl key'
    }; // Ctrl
  }
  // all keyShortCut innerHTML as spearate keyIcon spans
  document.querySelectorAll('.keyShortCut').forEach(e => {
    if (!e.querySelector('span'))
      e.innerHTML = '<span class="keyIcon">' + e.innerHTML + '</span>';
  });
  // attach these symbols to all occurrences in root
  Object.keys(modifierKeys).forEach(k => {
    root.querySelectorAll('.' + k).forEach(e => {
      let span = '<span class="keyIcon" title="' + modifierKeys[k].description + '">' + modifierKeys[k].symbol + '</span>';
      if (!e.querySelector('span'))
        e.innerHTML = span + '<span class="keyIcon">' + e.innerHTML + '</span>';
      else
        e.innerHTML = span + e.innerHTML;
    });
  });
}