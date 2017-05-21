var aImg = ['images/1.png',
			'images/2.png',
			'images/3.png',
			'images/4.png',
			'images/D-111.png',
			'images/D-a1.png',
			'images/D-a2.png',
			'images/D-a3.png',
			'images/D-a4.png',
			'images/D-ans-a1.png',
			'images/D-ans-a2.png',
			'images/D-ans-a3.png',
			'images/D-ans-a4.png',
			'images/D-ans-a5.png',
			'images/D-ans-a6.png',
			'images/D-ans-a7.png',
			'images/D-ans-a8.png',
			'images/D-ans-a9.png',
			'images/D-ans-a10.png',
			'images/D-ans-b1.png',
			'images/D-ans-b2.png',
			'images/D-ans-b3.png',
			'images/D-ans-b4.png',
			'images/D-ans-b5.png',
			'images/D-ans-b6.png',
			'images/D-ans-b7.png',
			'images/D-ans-b8.png',
			'images/D-ans-b9.png',
			'images/D-ans-b10.png',
			'images/D-ans-c1.png',
			'images/D-ans-c2.png',
			'images/D-ans-c3.png',
			'images/D-ans-c4.png',
			'images/D-ans-d1.png',
			'images/D-ans-d2.png',
			'images/D-ans-d3.png',
			'images/D-ans-d4.png',
			'images/D-b1.png',
			'images/D-b2.png',
			'images/D-b3.png',
			'images/D-b4.png',
			'images/D-bg002.jpg',
			'images/D-bg003.jpg',
			'images/D-bg004.jpg',
			'images/D-bg002.png',
			'images/D-bg003.png',
			'images/D-btn001.png',
			'images/D-btn002.png',
			'images/D-btn003.png',
			'images/D-btn004.png',
			'images/D-c1.png',
			'images/D-c2.png',
			'images/D-c3.png',
			'images/D-c4.png',
			'images/D-d1.png',
			'images/D-d2.png',
			'images/D-d3.png',
			'images/D-d4.png',
			'images/D-e1.png',
			'images/D-e2.png',
			'images/D-f1.png',
			'images/D-f2.png',
			'images/D-g1.png',
			'images/D-g2.png',
			'images/D-h1.png',
			'images/D-h2.png',
			'images/D-i1.png',
			'images/D-i2.png',
			'images/D-img1.png',
			'images/D-img2.png',
			'images/D-img3.png',
			'images/D-img4.png',
			'images/D-j1.png',
			'images/D-j2.png',
			'images/D-mailer001.png',
			'images/D-pop001.png',
			'images/D-q1-bag.jpg',
			'images/D-q2-bag.jpg',
			'images/D-q3-bag.jpg',
			'images/D-q4-bag.jpg',
			'images/D-question1.png',
			'images/D-question2.png',
			'images/D-question3.png',
			'images/D-question4.png',
			'images/D-question5.png',
			'images/D-question6.png',
			'images/D-question7.png',
			'images/D-question8.png',
			'images/D-question9.png',
			'images/D-question10.png',
			'images/D-text001.png',
			'images/D-text002.png',
			'images/D-text003.png',
			'images/D-text004.png',
			'images/left-btn.png',
			'images/right-btn.png'],
	len  = aImg.length,
	iNow = null;		

	//console.log(len);
 	loading();

/* 图片加载 */
	function loading(){
		var self = this;
		for(var i=0; i<len; i++){
			(function (i){
				var oImg = new Image();
				oImg.onload = function(){
					iNow++;
					var per = iNow/len,
						n   = (parseInt((per.toFixed(2) * 100)));
						$('.J-load-line').css("width",(n)+"%");
						$('.J-load-num').text((n)+"%");
					if( n >= 100 ){
						$('.J-load').animate({opacity:0}, 800, 'ease', function(){
							$(this).remove();
							$('.J-load').hide();
							$('.J-box2').show();
						});
					}
				};
				oImg.src = aImg[i];
			})(i);
		}		
	};












