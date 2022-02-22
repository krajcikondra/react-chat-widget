export const getCaretIndex = (el): number => {
  const selection = window.getSelection();
  if (selection === null) {
    return 0;
  }
  const range = selection.getRangeAt(0);
  return getCharacterOffsetWithinFinal(range, el);
}

export const getSelection = (el) => {
  const range = window.getSelection()!.getRangeAt(0);
  const preSelectionRange = range.cloneRange();
  preSelectionRange.selectNodeContents(el);
  preSelectionRange.setEnd(range.startContainer, range.startOffset);

  const start = preSelectionRange.toString().length;
  return {
    start: start,
    end: start + range.toString().length
  }
}

const getCharacterOffsetWithinFinal = (range, node) => {
  var treeWalker = document.createTreeWalker(
      node,
      NodeFilter.SHOW_ALL,
      function(node) {
        var nodeRange = document.createRange();
        nodeRange.selectNodeContents(node);
        return nodeRange.compareBoundaryPoints(Range.END_TO_END, range) < 1 ?
            NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      },
  );

  var charCount = 0, lastNodeLength = 0;

  if (range.startContainer.nodeType == 3) {
    charCount += range.startOffset;
  }

  let iterator = 0;
  while (treeWalker.nextNode()) {
    iterator++;
    charCount += lastNodeLength;
    lastNodeLength = 0;

    if(range.startContainer != treeWalker.currentNode) {
      if(treeWalker.currentNode instanceof Text) {
        lastNodeLength += treeWalker.currentNode.length;
      } else if(treeWalker.currentNode instanceof HTMLBRElement ||
          treeWalker.currentNode instanceof HTMLImageElement || treeWalker.currentNode instanceof HTMLDivElement
      ) {
        lastNodeLength += treeWalker.currentNode.outerHTML.length;
      }
    }
  }

  return charCount + lastNodeLength;
}

export const isFirefox = () => navigator.userAgent.search("Firefox") > 0;

export const updateCaret = (el, caret, offset) => {
  const range = document.createRange();
  const selection = window.getSelection()!;
  const result = calculatePos(el.childNodes, caret+offset);
  const index = result[0];
  const childPos = result[1];
  if (index === el.childNodes.length) {
    el.appendChild(document.createTextNode(''));
  }


  range.setStart(el.childNodes[index], childPos);
  range.collapse(true);
  selection.removeAllRanges();
  selection.addRange(range);
  el.focus();
}

export const calculatePos = (childNodes, pos) =>  {
  let myPos = 0;
  for (let i = 0; i < childNodes.length; i++) {
    if (myPos === pos) {
      return [i, 0];
    }

    if (childNodes[i].nodeType === Node.TEXT_NODE) {
      if ((myPos + childNodes[i].textContent.length) >= pos) {
        return [i, pos - myPos];
      }

      myPos += childNodes[i].textContent.length;
    } else {
      myPos += childNodes[i].outerHTML.length;
    }
  }
  return [childNodes.length, 0];
}

export const insertNodeAtCaret = (el) => {
  const position = getCaretIndex(el)
  let characterToEnter = '\n\n';
  let prevChar, char = '';
  if (position > 0) {
    prevChar = el.innerHTML.charAt(position - 1);
    char = el.innerHTML.charAt(position);
    const newLines = el.innerHTML.match(/\n/g);
    if(
      prevChar === char ||
      (prevChar === '\n' && char === '') ||
      (isFirefox() && newLines?.length > 0)
    ) {
      characterToEnter = '\n';
    }
  }
  const selection = window.getSelection()!;
  const node = document.createTextNode(characterToEnter);
  const range = selection.getRangeAt(0);
  range.collapse(false);
  range.insertNode(node);
  const cloneRange = range.cloneRange();
  cloneRange.selectNodeContents(node);
  cloneRange.collapse(false);
  selection.removeAllRanges();
  selection.addRange(cloneRange);
  el.innerHTML = el.innerHTML.replace(/<br>/g, '');
  updateCaret(el, position, 1);
}
