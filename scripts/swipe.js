/*window.addEventListener('load', function() {
    var maybePreventPullToRefresh = false;
    var lastTouchY = 0;
    var touchstartHandler = function(e) {
        e.preventDefault();
        log('touchstart');
        if (e.touches.length != 1){
            return;
        }
        lastTouchY = e.touches[0].clientY;
        // Pull-to-refresh will only trigger if the scroll begins when the
        // document's Y offset is zero.
        maybePreventPullToRefresh = window.pageYOffset == 0;
    }

    var touchendHandler = function(e) {
        e.preventDefault();
        log('touchend');
    }

    var touchmoveHandler = function(e) {
        log('touchmove');
        var touchY = e.touches[0].clientY;
        var touchYDelta = touchY - lastTouchY;
        lastTouchY = touchY;

        if (maybePreventPullToRefresh) {
            // To suppress pull-to-refresh it is sufficient to preventDefault the
            // first overscrolling touchmove.
            maybePreventPullToRefresh = false;
            if (touchYDelta > 0) {
                e.preventDefault();
                return;
            }
        }
    }

    document.addEventListener('touchstart', touchstartHandler, {passive: false});
    document.addEventListener('touchmove', touchmoveHandler, {passive: false});  
    document.addEventListener('touchend ', touchendHandler, {passive: false});    
});*/

function log($msg){

    console.log($msg);
    $('#log').text($msg);

}

/*//Mínimo de píxeles de distancia a recorrer para activar el swipe
var swipeMinDistanceX = 10;
var swipeMinDistanceY = 10;

//Variables globales necesarias para funcionamiento interno
var swipeStartX;
var swipeStartY;

//Eventos touch
function initSwipe()
{
    log('init');
    document.addEventListener("touchstart", swipeStartHandler, true);
    //document.addEventListener("touchmove", swipeMoveHandler, true);
    //document.addEventListener("touchenter", endHandler, true);
    //document.addEventListener("touchleave", endHandler, true);
    document.addEventListener("touchend", swipeEndHandler, true);
    //document.addEventListener("touchcancel", cancelHandler, true);   
}

//Cancelar eventos
function cancelSwipe()
{
    document.removeEventListener("touchstart", swipeStartHandler, true);
    //document.removeEventListener("touchmove", swipeMoveHandler, true);
    //document.removeEventListener("touchenter", endHandler, true);
    //document.removeEventListener("touchleave", endHandler, true);
    document.removeEventListener("touchend", swipeEndHandler, true);
    //document.removeEventListener("touchcancel", cancelHandler, true);   
    
}

//Al empezar a tocar
function swipeStartHandler(startEvent)
{
    var touchStart = startEvent.changedTouches[0];
    swipeStartX = touchStart.clientX;
    swipeStartY = touchStart.clientY;
}

//Al hacer drag
function swipeEndHandler(moveEvent) 
{
    var touchMove = moveEvent.changedTouches[0];
    var moveX = touchMove.clientX;
    var moveY = touchMove.clientY;
    
    if(Math.abs(moveX - swipeStartX) > Math.abs(moveY - swipeStartY)) //Drag Horizontal
    {
        if ((moveX - swipeStartX) > swipeMinDistanceX) //Drag Derecha
        {
            log('Derecha');
            //Capa.className= "Mostrar"; //Muestra la capa
        }

        if ((moveX - swipeStartX) < -swipeMinDistanceX) //Drag Izquierda
        {
            log('Izquierda');
            //Capa.className= "Ocultar"; //Oculta la capa
        }
    } else { //Drag Vertical
        if ((moveY - swipeStartY) > swipeMinDistanceY) //Drag Abajo
        {
            moveEvent.preventDefault();
            log('Abajo');
        }
        
        if ((moveY - swipeStartY) < -swipeMinDistanceY) //Drag Arriba
        {
            log('Arriba');
        }
    }
}



initSwipe();
*/

