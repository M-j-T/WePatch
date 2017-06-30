//文字列に装飾を加える
function designString(id,classname,styleString,selection,target,SelStr) {
	if (!selection || selection.rangeCount == 0) {
	  return;
	}
	var range = selection.getRangeAt(0);

	var contentsId = target.attr('tagName');

	var start = $(range.startContainer).parents().attr('tagName') ==  contentsId ? true : false;
	var end = $(range.endContainer).parents().attr('tagName') == contentsId ? true : false;

	if (start && end) {
	  var add = $('<span class="'+classname+'" id="'+id+'" style="' + styleString + '"></span>').append(range.cloneContents());
	  range.deleteContents();
	  range.insertNode(add.get(0));
	}

	selection.collapseToStart();
 }