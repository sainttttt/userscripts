// ==UserScript==
// @name        Alcantara mode archive.org
// @namespace   Violentmonkey Scripts
// @match       https://archive.org/*
// @grant    GM_addStyle
// @version     1.0
// @author      -
// @description 9/24/2023, 6:48:09 PM
// @require https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js

// ==/UserScript==



var controls = {};
var controlsParent = {};
var banner = {};
var bannerParent = {};
var darkMode = false
var controlsHidden = false;

var darkModeStyle = `
  img.BRpageimage{
    -webkit-filter: invert(1);
    filter: invert(1);
  }
`
const darkSheet = new CSSStyleSheet();
darkSheet.replace(darkModeStyle)
var originalStyle = JSON.parse(JSON.stringify(document.adoptedStyleSheets))
toggleDark()





function toggleControls() {
  if (controlsHidden == true ) {
        controlsParent.appendChild(controls);
    bannerParent.appendChild(banner)
    controlsHidden = false
        document.querySelector('ia-book-theater').shadowRoot.querySelector('ia-bookreader').shadowRoot.querySelector('.main-component').querySelector('iaux-item-navigator').shadowRoot.querySelector(".minimized").style.display = "block";

  } else {
        controlsHidden = true
       controls = document.querySelector(".BRfooter")
      controlsParent = controls.parentNode;
    controls.parentNode.removeChild(controls)

       banner = document.querySelector(".BookReaderMessage")
      bannerParent = banner.parentNode
    bannerParent.removeChild(banner)

    var d = document.querySelector('.BRcontainer')
    d.style.bottom = "0px";
        document.querySelector('ia-book-theater').shadowRoot.querySelector('ia-bookreader').shadowRoot.querySelector('.main-component').querySelector('iaux-item-navigator').shadowRoot.querySelector(".minimized").style.display = "none";

  }
}

function toggleDark() {
  if (darkMode) {
    document.adoptedStyleSheets = originalStyle;
    darkMode = false;
  } else {
    document.adoptedStyleSheets = [...document.adoptedStyleSheets, darkSheet];
    darkMode = true;
  }
}


$( window ).on('load', function() {
  // your code here



  setTimeout(function() {


    var a= document.querySelector('ia-book-actions.focus-on-child-only').shadowRoot.querySelector('.lending-wrapper')
    console.log(a);
    var b = document.createElement('div')
    b.onclick = toggleDark;
    b.innerHTML = "<button> Dark/Light </button>"
    a.appendChild(b)

    document.querySelector('.BRcontainer').addEventListener("click", () => {
      toggleControls()
    })

  }, 2000);
})

// GM_addStyle(darkModeStyle)
