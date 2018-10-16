(function() {
  'use strict';

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
     .register('./service-worker.js')
     .then(function() { 
      console.log('Service Worker Registered'); 
    });
  }else{
    console.log('Not Service Worker Registered');
  }
  var PUNTAJES = {
    AMEX:{
      APPLE: 6,
      ADIDAS: 6,
      BESTBUY: 6,
      BOOKINGCOM: 6,
      NETSHOES: 6,
      OSOM: 7,
      SORTEOSTEC: 6.5,
      UNDOSTRES: 5.5,
      KRISPYKREME: 6.5,
      SBARRO: 6.5,
      TACOINN: 6.5,
      ELFAROLITO: 6.5,
      SUSHIITTO: 15,
      NEVEGELATO: 6.5,
      ARRACHERAHOUSE: 6.5,
      CAFEDILETTO: 6.5,
      SIXTIESBURGUER: 6.5,
      NUNYSYOGURT: 6.5,
      GIORNALE: 7,
      LACOMER: 15,
      MEGASORIANA: 11,
      SEVENELEVEN: 15,
      MODATELAS: 10,
      ELSURTIDOR: 20,
      JUGUETRON: 20,
      TIENDAPAYBACK: 15,
      TINTORERIASMAX: 21.5,
      PETROSEVEN: 7.5,
      CINEMEX: 10,
      INTERJET: 6,
      HERTZ: 10,
      HOTELESMISION: 7,
      TRAVELIMPRESSIONS: 6,
      BOOKING: 6
    },
    MARK: {
      APPLE: 1,
      ADIDAS: 1,
      BESTBUY: 1,
      BOOKINGCOM: 1,
      NETSHOES: 1,
      OSOM: 2,
      SORTEOSTEC: 1.5,
      UNDOSTRES: 0.5,
      KRISPYKREME: 1.5,
      SBARRO: 1.5,
      TACOINN: 1.5,
      ELFAROLITO: 1.5,
      SUSHIITTO: 10,
      NEVEGELATO: 1.5,
      ARRACHERAHOUSE: 1.5,
      CAFEDILETTO: 1.5,
      SIXTIESBURGUER: 1.5,
      NUNYSYOGURT: 1.5,
      GIORNALE: 2,
      LACOMER: 10,
      MEGASORIANA: 6,
      SEVENELEVEN: 10,
      MODATELAS: 5,
      ELSURTIDOR: 15,
      JUGUETRON: 15,
      TIENDAPAYBACK: 10,
      AMERICANEXPRESS: 5,
      SANTANDER: 5,
      TINTORERIASMAX: 16.5,
      PETROSEVEN: 2.5,
      CINEMEX: 5,
      INTERJET: 1,
      HERTZ: 5,
      HOTELESMISION: 2,
      TRAVELIMPRESSIONS: 1,
      BOOKING: 1
    }
  };
  var types = ['AMEX', 'MARK'];
  var marks = {
    AMEX: ['APPLE','ADIDAS','BESTBUY','BOOKINGCOM','NETSHOES','OSOM','SORTEOSTEC','UNDOSTRES','KRISPYKREME','SBARRO','TACOINN','ELFAROLITO','SUSHIITTO','NEVEGELATO','ARRACHERAHOUSE','CAFEDILETTO','SIXTIESBURGUER','NUNYSYOGURT','GIORNALE','LACOMER','MEGASORIANA','SEVENELEVEN','MODATELAS','ELSURTIDOR','JUGUETRON',/*'TIENDAPAYBACK','TINTORERIASMAX','BOOKING'*/,'PETROSEVEN','CINEMEX','INTERJET','HERTZ','HOTELESMISION','TRAVELIMPRESSIONS'],
    MARK: ['APPLE','ADIDAS','BESTBUY','BOOKINGCOM','NETSHOES','OSOM','SORTEOSTEC','UNDOSTRES','KRISPYKREME','SBARRO','TACOINN','ELFAROLITO','SUSHIITTO','NEVEGELATO','ARRACHERAHOUSE','CAFEDILETTO','SIXTIESBURGUER','NUNYSYOGURT','GIORNALE','LACOMER','MEGASORIANA','SEVENELEVEN','MODATELAS','ELSURTIDOR','JUGUETRON',/*'TIENDAPAYBACK','TINTORERIASMAX','BOOKING'*/,'PETROSEVEN','CINEMEX','INTERJET','HERTZ','HOTELESMISION','TRAVELIMPRESSIONS','AMERICANEXPRESS','SANTANDER']
  };
  var timeOut;
  var intervalDisplay;
  var intervalWatch;
  var indexPointee;
  var timeDisplay;
  var timeSpeed;
  var score;
  var sizes = ['large', 'mediun', 'small', 'extralarge'];
  var sizesPointees = {
    small: 100,
    mediun: 125,
    large: 150,
    extralarge: 275,
  }
  var log = ($msg) => {
    console.log($msg);
    $('#log').text($msg);
  }

  var soundBack = new Audio("./audio/back.mp3");
  soundBack.loop = true;
  var soundCongrats = new Audio("./audio/congrats.mp3");
  var container = document.querySelector('main');
  $('#modalResultado').modal();
  var carousel = $('.carousel').carousel({
  	noWrap: true,
  	dist: 0,
  	indicators: true,
  	onCycleTo: function(e){
  		switch($(e).attr('index')){
  			case 'first': 
  				$('.chevron-left').addClass('hide');
  				$('.chevron-right').removeClass('hide');
  				break;
  			case 'last':
  				$('.chevron-left').removeClass('hide');
  				$('.chevron-right').addClass('hide');
  				break;
  			default:
  				$('.chevron-left').removeClass('hide');
  				$('.chevron-right').removeClass('hide');
  		}
  	}
  });
  $('.chevron').off('touchstart click').on('touchstart click', function(e){
  	e.stopPropagation();
  	let index = $(e.currentTarget).hasClass('chevron-left') 
  		? 
  			$('.indicator-item.active').prev().index()
  		:
  			$('.indicator-item.active').next().index()
  		;
  		log(index);
  	$('.carousel').carousel('set', index);
  });
  $('.indicators').prepend('<div class="logo-payback"></div>');
  $('.indicators').append('<div class="logo-amex"></div>');

  var init = () => {
    soundBack.play();
    //init config
    timeDisplay = 1000;
    timeSpeed = 4000;
    indexPointee = 0;
    timeOut = 45;
    score = 0;
    clearTimeout(intervalWatch);
    clearTimeout(intervalDisplay);

    display(timeDisplay, timeSpeed);
    $('.jqScore').text(formatScore(score, 1));
    $('.jqTime').text(timeOut);
    intervalWatch = setInterval(() => {
      $('.jqTime').text(timeOut);
      if(--timeOut <= -1){
        clearTimeout(intervalWatch);
        clearTimeout(intervalDisplay);
        $('.burble-left3').attr('title', "¡FELICIDADES! JUNTASTE "+formatScore(parseInt($('.jqScore').text()),0)+" PUNTOS.")
        soundBack.pause();
        $('#modalResultado').modal('open');
        soundCongrats.play();
      }else if(timeOut%10==0){
        timeDisplay *= 0.85;
        timeSpeed *= 0.75;
        clearTimeout(intervalDisplay);
        display(timeDisplay, timeSpeed);
      }
    },1000);
  }
  var colores = ['red', 'blue'];
  var display = ()=>{
    intervalDisplay = setInterval(()=>{
      let currentTarget = 'pointee'+indexPointee;
      let top = numberRandom(50, (screen.height-400));
      let direction = numberRandom(0, 1) ? 'left' : 'right';
      let size = sizes[numberRandom(0, 2)];
      let tipo = types[(numberRandom(0, 9) > 7 ? 0 : 1)];
      let marca = marks[tipo][numberRandom(0, marks[tipo].length-1)];
      let color = (tipo=='AMEX') ? 'juntos' : (marca == 'AMERICANEXPRESS' ? 'red' : 'blue');
      if(color=='juntos'){
        size = sizes[3];
      }
      let puntaje = PUNTAJES[tipo][marca];
      let clasePuntaje = 'points-'+puntaje.toString().replace('.', '-');
      //creación del pointee
      let pointee = $('<span>').attr({
        id: currentTarget,
        puntaje: puntaje,
        icono: '../images/iconos/' + marca + '.png'
      }).css({
        top: top + 'px'
      }).addClass('pointee pointee-'+color+' ' + direction + ' ' + size+' '+tipo+' '+marca+' '+clasePuntaje).html('<span class="icono"></span>');
      $('#container').append(pointee);

      currentTarget = '#' + currentTarget;
      
      //animación del pointee
      $(currentTarget + '.left').animate({
        left: screen.width + 50,
      },timeSpeed, () => {
        $(currentTarget).remove();
      });

      $(currentTarget+'.right').animate({
        right: screen.width + 50,
      },timeSpeed, () => {
        $(currentTarget).remove();
      });

      //indice del id del pointee
      indexPointee++;

      //eventos 
      var element = document.querySelector(currentTarget);

      container.addEventListener('click', handleGestureClickDocument, true);
      if (window.PointerEvent) {
        container.addEventListener('touchmove', handleGestureMoveDocument, true);
      } else {
        container.addEventListener('touchmove', handleGestureMoveDocument, true);
      }

    }, timeDisplay, "linear");
  }
  var numberRandom = (min, max) => {
    return Math.round(Math.random() * (max - min) + min);
  }
  var handleGestureClickDocument = (e) => {
    e.preventDefault();
    log('[ ' + e.x +' , ' + e.y + ']');
    checkCollision(e.x, e.y);
  }
  var handleGestureMoveDocument = (e) => {
    e.preventDefault();
    log('[ '+e.touches[0].clientX +' , '+e.touches[0].clientY + ']');
    checkCollision(e.touches[0].clientX, e.touches[0].clientY);
  }

  var checkCollision = (x, y) => {
    $('span.pointee').each(function(index, element){
      let iniX = $(element).position().left;
      let iniY = $(element).position().top;
      let size = $(element).hasClass('small') ? sizesPointees.small : 
        (
          $(element).hasClass('mediun') ? sizesPointees.mediun : 
          (
            $(element).hasClass('large') ? sizesPointees.large : sizesPointees.extralarge
          )
        );
      let puntaje = parseFloat($(element).attr('puntaje'));
      let finX = iniX + size;
      let finY = iniY + (size == sizesPointees.extralarge ? 150 : size);
      iniX+=(size/20);
      iniY+=(size/20);
      finX-=(size/20);
      finY-=(size/20);
      if((x > iniX && x < finX) && (y > iniY && y < finY) && !$(element).hasClass('pointee-explosion')){
        let explosion = (
          $(element).hasClass('MARK') && !$(element).hasClass('AMERICANEXPRESS')
        ) ? 'explosion-blue' : 'explosion-red';
        $(element).stop().addClass('pointee-explosion '+explosion);
        if($('.jqStopStarAudio i').text()=='volume_up'){
	        let soundBurbble = new Audio("./audio/burbble.mp3");
	        soundBurbble.play();
	      }
        score += puntaje;
        $('.jqScore').text(formatScore(score, 1));
        setTimeout(() => {
          $(element).remove();
        }, 500);
      }
    });
  }

  var formatScore = (n, c, d, t) => {
    var c = isNaN(c = Math.abs(c)) ? 2 : c,
      d = d == undefined ? "." : d,
      t = t == undefined ? "," : t,
      s = n < 0 ? "-" : "",
      i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
      j = (j = i.length) > 3 ? j % 3 : 0;

    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
  };

  $('.jqReloadPlay').off('click').on('click', function(){
    init();
  });
  $('.jqStopStarAudio').off('click').on('click', function(){
    if($(this).find('i').text()=='volume_up'){
      $(this).find('i').text('volume_off');
      soundBack.pause();
    }else{
      $(this).find('i').text('volume_up');
      soundBack.play();
    }
  });

  $('.jqJugar').off('click touchstart').on('click touchstart', function(e){
  	e.stopPropagation();
  	$('.navbar-fixed, #container, .fixed-action-btn').removeClass('hide');
  	$('.carousel').addClass('hide');
  	init();
  	log('jugar');
  });

  $('.jqInit').off('click').on('click', function(){
  	$('.navbar-fixed, #container, .fixed-action-btn').addClass('hide');
  	$('.carousel').removeClass('hide');
  	clearTimeout(intervalWatch);
    clearTimeout(intervalDisplay);
    $('.pointee').remove();
    $('.carousel').carousel('set', 0);
    soundBack.pause();
  	log('inicio');
  });

})();