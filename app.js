var contextID = -1;
var RightAltPressed = false;

chrome.input.ime.onFocus.addListener(function(context) {
    contextID = context.contextID;
});
chrome.input.ime.onBlur.addListener( function(context) {
    contextID = -1;
    RightAltPressed = false;
});


function mapKey( keyData ) {
    if( keyData.capsLock == true || keyData.shiftKey == true ) {
        switch( keyData.code ) {
            case 'KeyA': return { done: true, key: 'Ą' }
            case 'KeyC': return { done: true, key: 'Ć' }
            case 'KeyE': return { done: true, key: 'Ę' }
            case 'KeyL': return { done: true, key: 'Ł' }
            case 'KeyN': return { done: true, key: 'Ń' }
            case 'KeyO': return { done: true, key: 'Ó' }
            case 'KeyS': return { done: true, key: 'Ś' }
            case 'KeyX': return { done: true, key: 'Ź' }
            case 'KeyZ': return { done: true, key: 'Ż' }
        }
    } else {
        switch( keyData.code ) {
            case 'KeyA': return { done: true, key: 'ą' }
            case 'KeyC': return { done: true, key: 'ć' }
            case 'KeyE': return { done: true, key: 'ę' }
            case 'KeyL': return { done: true, key: 'ł' }
            case 'KeyN': return { done: true, key: 'ń' }
            case 'KeyO': return { done: true, key: 'ó' }
            case 'KeyS': return { done: true, key: 'ś' }
            case 'KeyX': return { done: true, key: 'ź' }
            case 'KeyZ': return { done: true, key: 'ż' }
        }
    }
    return { done: false, key: null };
}

chrome.input.ime.onKeyEvent.addListener( function( engineID, keyData ) {
    if( keyData.type == 'keydown' ) { 
        if( RightAltPressed == true ) {
            var plKey = mapKey( keyData );
            if( plKey.done == true ) {
                chrome.input.ime.commitText({ 'contextID' : contextID, 'text': plKey.key });
                return true;
            }
        }
        if( keyData.key == 'Alt' && keyData.code == 'AltRight' )
            RightAltPressed = true;
    } else if( keyData.type == 'keyup' ) {
        if( keyData.key == 'Alt' && keyData.code == 'AltRight' )
            RightAltPressed = false;
    }
    return false;
});
