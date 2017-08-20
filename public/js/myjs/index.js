$(function(){

//	fullpage
	$('#dowebok').fullpage({
		sectionsColor: ['#eee', '#eee', '#eee', '#eee'],
		anchors: ['page1', 'page2', 'page3', 'page4'],
		menu: '#menu',
		scrollBar:true,
		afterLoad: function(anchorLink, index){
			if(index == 1){
				$(".logo").slideDown(400);	
			}
		},
		onLeave: function(index, direction){
			if(index == 1){
				$(".logo").slideUp(400);
			}
		}
	});
	$("html").css({"overflow":"hidden"});
//	fullpage end
	
	
//	show qdcode
	$(".weixin").hover(function(){
		$(".qdcode").show();
	},function(){
		$(".qdcode").hide();
	})
//	show qdcode end
	
	
	

//	轮播
	$('#slider').vmcSlider({
		width: 1250,
		height: 448,
		gridCol: 10,
		gridRow: 5,
		gridVertical: 20,
		gridHorizontal: 10,
		autoPlay: true,
		ascending: true,
		effects: [
			'fade', 'fadeLeft', 'fadeRight', 'fadeTop', 'fadeBottom', 'fadeTopLeft', 'fadeBottomRight',
			'blindsLeft', 'blindsRight', 'blindsTop', 'blindsBottom', 'blindsTopLeft', 'blindsBottomRight',
			'curtainLeft', 'curtainRight', 'interlaceLeft', 'interlaceRight', 'mosaic', 'bomb', 'fumes'
		],
		ie6Tidy: false,
		random: false,
		duration: 2000,
		speed: 900
	});
//	轮播 end

});