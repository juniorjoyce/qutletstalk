(function() {

	var content = $('#content');
	var video = $('#webcam')[0];

	var resize = function() {
		var w = $(this).width();
		var h = $(this).height() - 110;
		var ratio = video.width / video.height;
		if (content.width() > w) {
			content.width(w);
			content.height(w / ratio);
		}
		else {
			content.height(h);
			content.width(h * ratio);
		}
		content.css('left', (w - content.width()) / 2 );
		content.css('top', ((h - content.height()) / 2) + 55 );
	};

	$(window).resize(resize);
	$(window).ready(function() {
		resize();
		$('#watchVideo').click(function() {
			$(".browsers").fadeOut();
			$(".browsersWithVideo").delay(300).fadeIn();
			$("#video-demo").delay(300).fadeIn();
			$("#video-demo")[0].play();
			$('.backFromVideo').fadeIn();
			event.stopPropagation();
			return false;
		});
		$('.backFromVideo a').click(function() {
			$(".browsersWithVideo").fadeOut();
			$('.backFromVideo').fadeOut();
			$(".browsers").fadeIn();
			$("#video-demo")[0].pause();
			$('#video-demo').fadeOut();
			event.stopPropagation();
			return false;
		});
	});

	function hasGetUserMedia() {
		// Note: Opera builds are unprefixed.
		return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
			navigator.mozGetUserMedia || navigator.msGetUserMedia);
	}

	if (hasGetUserMedia()) {
		$('.introduction').fadeIn();
		$('.allow').fadeIn();
	} else {
		$('.browsers').fadeIn();
		return;
	}

	var webcamError = function(e) {
		alert('Webcam error!', e);
	};

	if (navigator.getUserMedia) {
		navigator.getUserMedia({audio: false, video: true}, function(stream) {
			video.src = stream;
			initialize();
		}, webcamError);
	} else if (navigator.webkitGetUserMedia) {
		navigator.webkitGetUserMedia({audio:false, video:true}, function(stream) {
			video.src = window.URL.createObjectURL(stream);
			initialize();
		}, webcamError);
	} else {
		//video.src = 'somevideo.webm'; // fallback.
	}

	var AudioContext = (
		window.AudioContext ||
		window.webkitAudioContext ||
		null
	);

	var timeOut, lastImageData, lastImageData1, lastImageData2, lastImageData3, lastImageData4, lastImageData5, lastImageData6, lastImageData7, lastImageData8, lastImageData9;
	var canvasSource = $("#canvas-source")[0];
	var canvasBlended = $("#canvas-blended")[0];
	var canvasBlended1 = $("#canvas-blended1")[0];
	var canvasBlended2 = $("#canvas-blended2")[0];
	var canvasBlended3 = $("#canvas-blended3")[0];
	var canvasBlended4 = $("#canvas-blended4")[0];
	var canvasBlended5 = $("#canvas-blended5")[0];
	var canvasBlended6 = $("#canvas-blended6")[0];
	var canvasBlended7 = $("#canvas-blended7")[0];
	var canvasBlended8 = $("#canvas-blended8")[0];
	var canvasBlended9 = $("#canvas-blended9")[0];

	var contextSource = canvasSource.getContext('2d');
	var contextBlended = canvasBlended.getContext('2d');
	var contextBlended1 = canvasBlended1.getContext('2d');
	var contextBlended2 = canvasBlended2.getContext('2d');
	var contextBlended3 = canvasBlended3.getContext('2d');
	var contextBlended4 = canvasBlended4.getContext('2d');
	var contextBlended5 = canvasBlended5.getContext('2d');
	var contextBlended6 = canvasBlended6.getContext('2d');
	var contextBlended7 = canvasBlended7.getContext('2d');
	var contextBlended8 = canvasBlended8.getContext('2d');
	var contextBlended9 = canvasBlended9.getContext('2d');

	var soundContext;
	var bufferLoader;
	var notes = [];

	// mirror video
	contextSource.translate(canvasSource.width, 0);
	contextSource.scale(-1, 1);

	var c = 5;

	function initialize() {
		if (!AudioContext) {
			alert("AudioContext not supported!");
		}
		else {
			$('.introduction').fadeOut();
			$('.allow').fadeOut();
			$('.loading').delay(300).fadeIn();
			setTimeout(loadSounds, 1000);
		}
	}

	function loadSounds() {
		soundContext = new AudioContext();
		bufferLoader = new BufferLoader(soundContext,
			[
				'sounds/note1.mp3',
				'sounds/note2.mp3',
				'sounds/note3.mp3',
				'sounds/note4.mp3',
				'sounds/note5.mp3',
				'sounds/note6.mp3',
				'sounds/note7.mp3',
				'sounds/note8.mp3'
			],
			finishedLoading
		);
		bufferLoader.load();
	}

	function finishedLoading(bufferList) {
		for (var i=0; i<8; i++) {
			var source = soundContext.createBufferSource();
			source.buffer = bufferList[i];
			source.connect(soundContext.destination);
			var note = {
				note: source,
				ready: true,
				visual: $("#note" + i)
			};
			notes.push(note);
		}
		start();
	}

	function playSound(obj) {
		if (!obj.ready) return;
		var source = soundContext.createBufferSource();
		source.buffer = obj.note.buffer;
		source.connect(soundContext.destination);
		source.start(0);
		obj.ready = false;
		// throttle the note
		setTimeout(setNoteReady, 400, obj);
	}

	function setNoteReady(obj) {
		obj.ready = true;
	}

	function start() {
		//$("#footer .instructions").show();
		$('.loading').fadeOut();
		$('body').addClass('black-background');
		$(".instructions").delay(600).fadeIn();
		$(canvasSource).delay(600).fadeIn();
		$(canvasBlended).delay(600).fadeIn();
		$(canvasBlended1).delay(600).fadeIn();
		$(canvasBlended2).delay(600).fadeIn();
		$(canvasBlended3).delay(600).fadeIn();
		$(canvasBlended4).delay(600).fadeIn();
		$(canvasBlended5).delay(600).fadeIn();
		$(canvasBlended6).delay(600).fadeIn();
		$(canvasBlended7).delay(600).fadeIn();
		$(canvasBlended8).delay(600).fadeIn();
		$(canvasBlended9).delay(600).fadeIn();
		$("#xylo").delay(600).fadeIn();
		$(".motion-cam").delay(600).fadeIn();
		update();
	}

	window.requestAnimFrame = (function(){
		return  window.requestAnimationFrame       ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame    ||
			window.oRequestAnimationFrame      ||
			window.msRequestAnimationFrame     ||
			function( callback ){
				window.setTimeout(callback, 1000 / 60);
			};
	})();

	function update() {
		drawVideo();
		blend();
		checkAreas();
		requestAnimFrame(update);
//		timeOut = setTimeout(update, 1000/60);
	}

	function drawVideo() {
		contextSource.drawImage(video, 0, 0, video.width, video.height);
	}

	function blend() {
		var width = canvasSource.width;
		var height = canvasSource.height;
		// get webcam image data
		var sourceData = contextSource.getImageData(0, 0, width, height * 0.1);
		var sourceData1 = contextSource.getImageData(0, height * 0.1, width, height * 0.1);
		var sourceData2 = contextSource.getImageData(0, height * 0.2, width, height * 0.1);
		var sourceData3 = contextSource.getImageData(0, height * 0.3, width, height * 0.1);
		var sourceData4 = contextSource.getImageData(0, height * 0.4, width, height * 0.1);
		var sourceData5 = contextSource.getImageData(0, height * 0.5, width, height * 0.1);
		var sourceData6 = contextSource.getImageData(0, height * 0.6, width, height * 0.1);
		var sourceData7 = contextSource.getImageData(0, height * 0.7, width, height * 0.1);
		var sourceData8 = contextSource.getImageData(0, height * 0.8, width, height * 0.1);
		var sourceData9 = contextSource.getImageData(0, height * 0.9, width, height * 0.1);
		// create an image if the previous image doesn’t exist
		if (!lastImageData) lastImageData = contextSource.getImageData(0, 0, width, height);
		if (!lastImageData1) lastImageData1 = contextSource.getImageData(0, 0, width, height);
		if (!lastImageData2) lastImageData2 = contextSource.getImageData(0, 0, width, height);
		if (!lastImageData3) lastImageData3 = contextSource.getImageData(0, 0, width, height);
		if (!lastImageData4) lastImageData4 = contextSource.getImageData(0, 0, width, height);
		if (!lastImageData5) lastImageData5 = contextSource.getImageData(0, 0, width, height);
		if (!lastImageData6) lastImageData6 = contextSource.getImageData(0, 0, width, height);
		if (!lastImageData7) lastImageData7 = contextSource.getImageData(0, 0, width, height);
		if (!lastImageData8) lastImageData8 = contextSource.getImageData(0, 0, width, height);
		if (!lastImageData9) lastImageData9 = contextSource.getImageData(0, 0, width, height);
		// create a ImageData instance to receive the blended result
		var blendedData = contextSource.createImageData(width, height);
		var blendedData1 = contextSource.createImageData(width, height);
		var blendedData2 = contextSource.createImageData(width, height);
		var blendedData3 = contextSource.createImageData(width, height);
		var blendedData4 = contextSource.createImageData(width, height);
		var blendedData5 = contextSource.createImageData(width, height);
		var blendedData6 = contextSource.createImageData(width, height);
		var blendedData7 = contextSource.createImageData(width, height);
		var blendedData8 = contextSource.createImageData(width, height);
		var blendedData9 = contextSource.createImageData(width, height);
		// blend the 2 images
		differenceAccuracy(blendedData.data, sourceData.data, lastImageData.data);
		differenceAccuracy(blendedData1.data, sourceData1.data, lastImageData1.data);
		differenceAccuracy(blendedData2.data, sourceData2.data, lastImageData2.data);
		differenceAccuracy(blendedData3.data, sourceData3.data, lastImageData3.data);
		differenceAccuracy(blendedData4.data, sourceData4.data, lastImageData4.data);
		differenceAccuracy(blendedData5.data, sourceData5.data, lastImageData5.data);
		differenceAccuracy(blendedData6.data, sourceData6.data, lastImageData6.data);
		differenceAccuracy(blendedData7.data, sourceData7.data, lastImageData7.data);
		differenceAccuracy(blendedData8.data, sourceData8.data, lastImageData8.data);
		differenceAccuracy(blendedData9.data, sourceData9.data, lastImageData9.data);

		// draw the result in a canvas
		contextBlended.putImageData(blendedData, 0, 0);
		contextBlended1.putImageData(blendedData1, 0, 0);
		contextBlended2.putImageData(blendedData2, 0, 0);
		contextBlended3.putImageData(blendedData3, 0, 0);
		contextBlended4.putImageData(blendedData4, 0, 0);
		contextBlended5.putImageData(blendedData5, 0, 0);
		contextBlended6.putImageData(blendedData6, 0, 0);
		contextBlended7.putImageData(blendedData7, 0, 0);
		contextBlended8.putImageData(blendedData8, 0, 0);
		contextBlended9.putImageData(blendedData9, 0, 0);
		// store the current webcam image
		lastImageData = sourceData;
		lastImageData1 = sourceData1;
		lastImageData2 = sourceData2;
		lastImageData3 = sourceData3;
		lastImageData4 = sourceData4;
		lastImageData5 = sourceData5;
		lastImageData6 = sourceData6;
		lastImageData7 = sourceData7;
		lastImageData8 = sourceData8;
		lastImageData9 = sourceData9;
	}

	function fastAbs(value) {
		// funky bitwise, equal Math.abs
		return (value ^ (value >> 31)) - (value >> 31);
	}

	function threshold(value) {
		return (value > 0x15) ? 0xFF : 0;
	}

	function difference(target, data1, data2) {
		// blend mode difference
		if (data1.length != data2.length) return null;
		var i = 0;
		while (i < (data1.length * 0.25)) {
			target[4*i] = data1[4*i] == 0 ? 0 : fastAbs(data1[4*i] - data2[4*i]);
			target[4*i+1] = data1[4*i+1] == 0 ? 0 : fastAbs(data1[4*i+1] - data2[4*i+1]);
			target[4*i+2] = data1[4*i+2] == 0 ? 0 : fastAbs(data1[4*i+2] - data2[4*i+2]);
			target[4*i+3] = 0xFF;
			++i;
		}
	}

	function differenceAccuracy(target, data1, data2) {
		if (data1.length != data2.length) return null;
		var i = 0;
		while (i < (data1.length * 0.25)) {
			var average1 = (data1[4*i] + data1[4*i+1] + data1[4*i+2]) / 3;
			var average2 = (data2[4*i] + data2[4*i+1] + data2[4*i+2]) / 3;
			var diff = threshold(fastAbs(average1 - average2));
			target[4*i] = diff;
			target[4*i+1] = diff;
			target[4*i+2] = diff;
			target[4*i+3] = 0xFF;
			++i;
		}
	}

	function checkAreas() {
		// loop over the note areas
		for (var r=0; r<10; ++r) {
			var blendedData = contextBlended.getImageData(1/10*r*video.width, 0, video.width/10, 100);
			var blendedData1 = contextBlended1.getImageData(1/10*r*video.width, 0, video.width/10, 100);
			var blendedData2 = contextBlended2.getImageData(1/10*r*video.width, 0, video.width/10, 100);
			var blendedData3 = contextBlended3.getImageData(1/10*r*video.width, 0, video.width/10, 100);
			var blendedData4 = contextBlended4.getImageData(1/10*r*video.width, 0, video.width/10, 100);
			var blendedData5 = contextBlended5.getImageData(1/10*r*video.width, 0, video.width/10, 100);
			var blendedData6 = contextBlended6.getImageData(1/10*r*video.width, 0, video.width/10, 100);
			var blendedData7 = contextBlended7.getImageData(1/10*r*video.width, 0, video.width/10, 100);
			var blendedData8 = contextBlended8.getImageData(1/10*r*video.width, 0, video.width/10, 100);
			var blendedData9 = contextBlended9.getImageData(1/10*r*video.width, 0, video.width/10, 100);
			var i, i1, i2, i3, i4, i5, i6, i7, i8, i9, average, average1, average2, average3, average4, average5, average6, average7, average8, average9;
			var i = i1 = i2 = i3 = i4 = i5 = i6 = i7= i8 = i9 = average = average1 = average2 = average3 = average4 = average5 = average6 = average7 = average8 = average9 =0;
			// loop over the pixels
			while (i < (blendedData.data.length * 0.25)) {
				// make an average between the color channel
				average += (blendedData.data[i*4] + blendedData.data[i*4+1] + blendedData.data[i*4+2]) / 3;
				++i;
			}
			while (i1 < (blendedData1.data.length * 0.25)) {
				// make an average between the color channel
				average1 += (blendedData1.data[i1*4] + blendedData1.data[i1*4+1] + blendedData1.data[i1*4+2]) / 3;
				++i1;
			}
			while (i2 < (blendedData2.data.length * 0.25)) {
				// make an average between the color channel
				average2 += (blendedData2.data[i2*4] + blendedData2.data[i2*4+1] + blendedData2.data[i2*4+2]) / 3;
				++i2;
			}
			while (i3 < (blendedData3.data.length * 0.25)) {
				// make an average between the color channel
				average3 += (blendedData3.data[i3*4] + blendedData3.data[i3*4+1] + blendedData3.data[i3*4+2]) / 3;
				++i3;
			}
			while (i4 < (blendedData4.data.length * 0.25)) {
				// make an average between the color channel
				average4 += (blendedData4.data[i4*4] + blendedData4.data[i4*4+1] + blendedData4.data[i4*4+2]) / 3;
				++i4;
			}
			while (i5 < (blendedData5.data.length * 0.25)) {
				// make an average between the color channel
				average5 += (blendedData5.data[i5*4] + blendedData5.data[i5*4+1] + blendedData5.data[i5*4+2]) / 3;
				++i5;
			}
			while (i6 < (blendedData6.data.length * 0.25)) {
				// make an average between the color channel
				average6 += (blendedData6.data[i6*4] + blendedData6.data[i6*4+1] + blendedData6.data[i6*4+2]) / 3;
				++i6;
			}
			while (i7 < (blendedData7.data.length * 0.25)) {
				// make an average between the color channel
				average7 += (blendedData7.data[i7*4] + blendedData7.data[i7*4+1] + blendedData7.data[i7*4+2]) / 3;
				++i7;
			}
			while (i8 < (blendedData8.data.length * 0.25)) {
				// make an average between the color channel
				average8 += (blendedData8.data[i8*4] + blendedData8.data[i8*4+1] + blendedData8.data[i8*4+2]) / 3;
				++i8;
			}
			while (i9 < (blendedData9.data.length * 0.25)) {
				// make an average between the color channel
				average9 += (blendedData9.data[i9*4] + blendedData9.data[i9*4+1] + blendedData9.data[i9*4+2]) / 3;
				++i9;
			}

			// calculate an average between of the color values of the note area
			average = Math.round(average / (blendedData.data.length * 0.25));
			average1 = Math.round(average1 / (blendedData1.data.length * 0.25));
			average2 = Math.round(average2 / (blendedData2.data.length * 0.25));
			average3 = Math.round(average3 / (blendedData3.data.length * 0.25));
			average4 = Math.round(average4 / (blendedData4.data.length * 0.25));
			average5 = Math.round(average5 / (blendedData5.data.length * 0.25));
			average6 = Math.round(average6 / (blendedData6.data.length * 0.25));
			average7 = Math.round(average7 / (blendedData7.data.length * 0.25));
			average8 = Math.round(average8 / (blendedData8.data.length * 0.25));
			average9 = Math.round(average9 / (blendedData9.data.length * 0.25));
			if (average > 50) {
				var mano = (r+1).toString();
				var notor = "#a".concat(mano);
				$(notor).css("background-color","rgba(255, 255, 255, 0.4)");
				$(notor).attr('datayams','active');
				//var temp = document.getElementById(notor).datayams;
				//if(temp == "active"){
				//	alert("hey");
				//}
				removeIT(notor);
			}
			if (average1 > 50) {
				var mano1 = (r+1).toString();
				var notor1 = "#b".concat(mano1);
				$(notor1).css("background-color","rgba(255, 255, 255, 0.4)");
				removeIT(notor1);
			}
			if (average2 > 50) {
				var mano2 = (r+1).toString();
				var notor2 = "#c".concat(mano2);
				$(notor2).css("background-color","rgba(255, 255, 255, 0.4)");
				removeIT(notor2);
			}
			if (average3 > 50) {
				var mano3 = (r+1).toString();
				var notor3 = "#d".concat(mano3);
				$(notor3).css("background-color","rgba(255, 255, 255, 0.4)");
				removeIT(notor3);
			}
			if (average4 > 50) {
				var mano4 = (r+1).toString();
				var notor4 = "#e".concat(mano4);
				$(notor4).css("background-color","rgba(255, 255, 255, 0.4)");
				removeIT(notor4);
			}
			if (average5 > 50) {
				var mano5 = (r+1).toString();
				var notor5 = "#f".concat(mano5);
				$(notor5).css("background-color","rgba(255, 255, 255, 0.4)");
				removeIT(notor5);
			}
			if (average6 > 50) {
				var mano6 = (r+1).toString();
				var notor6 = "#g".concat(mano6);
				$(notor6).css("background-color","rgba(255, 255, 255, 0.4)");
				removeIT(notor6);
			}
			if (average7 > 50) {
				var mano7 = (r+1).toString();
				var notor7 = "#h".concat(mano7);
				$(notor7).css("background-color","rgba(255, 255, 255, 0.4)");
				removeIT(notor7);
			}
			if (average8 > 50) {
				var mano8 = (r+1).toString();
				var notor8 = "#i".concat(mano8);
				$(notor8).css("background-color","rgba(255, 255, 255, 0.4)");
				removeIT(notor8);
			}
			if (average9 > 50) {
				var mano9 = (r+1).toString();
				var notor9 = "#j".concat(mano9);
				$(notor9).css("background-color","rgba(255, 255, 255, 0.4)");
				removeIT(notor9);

			}
		}
	}

	function removeIT(elementor){
		var chosen = elementor;
		$('.square').css("background-color","transparent");
		$(chosen).css("background-color","rgba(255, 255, 255, 0.4)");
		$(chosen).attr('datayams','inactive');
		setTimeout(
		  function() {
		    $(chosen).css("background-color","transparent");
	    }, 500);
	}


})();
