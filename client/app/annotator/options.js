var options = {
    'element': 'span',
    'className': 'highlighted-text',
    'exclude': [],
    'iframes': false,
    'iframesTimeout': 5000,
    'each': function (node, range) {
      node.setAttribute('id', 'highlighted-text');
      document.dispatchEvent(new CustomEvent('mark-complete', {bubbles: true}));      
      // alert('Hi');
      // node.style.fontWeight = 'bold';
      // node.style.background = '#73AD21';
      // // node.style.border = '1px solid black';
      // node.style['border-radius'] = '25px';
      // node.style.padding = '5px';
      // node.style.fontSize = '150%';
    },
    'filter': function (textNode, range, term, counter) {
      return true; // must return either true or false
    },
    'noMatch': function (range) {
      console.log('No Match Range', range);
      // the not found range
      alert('Hi');

    },
    'done': function (counter) {
      var container = document.querySelector('#context');
      window.angularComponentReference.zone.run(() => { window.angularComponentReference.componentFn(10); });
      // counter is a counter indicating the total number of all marks
    },
    'debug': false,
    'log': window.console
  };