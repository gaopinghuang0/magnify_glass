/*
 * jQuery magnify glass
 * 
 * Adopted from http://thecodeplayer.com/walkthrough/magnifying-glass-for-images-using-jquery-and-css3
 * 
 * @version v1.0 (02/2015)
 *  
 * Modified by:
 *   Gaoping Huang
 *   
 * Homepage:
 *   http://web.ics.purdue.edu/~huang679
 *   
 * GitHub:
 *   https://github.com/gaopinghuang0/magnify_glass
 *    
 * Dependencies:
 *   jQuery u1.7+
 *   CSS3 vendor prefixes
 */

(function($) {

	$.fn.magnify_glass = function(settings){
		if (!this.length) {
			return this;
		}
		var native_width = 0;
		var native_height = 0;
		$this = $(this);
		var picUrl="url('"+$this.find(".small").attr('src')+"') no-repeat";
		console.log(picUrl);
		$this.css("position", 'relative');
		var config = {
				height: '175px',
				width: '175px'
			};
		
		if (settings) {
			$.extend(config, settings);
		}

		$this.find(".large").css({
			background:picUrl,
			position: 'absolute',
			width: config.width,
			height: config.height,
			'border-radius': '100%',
			'box-shadow': "0 0 0 7px rgba(255, 255, 255, 0.85), \
						0 0 7px 7px rgba(0, 0, 0, 0.25), \
						inset 0 0 40px 2px rgba(0, 0, 0, 0.25)",
			display: 'none'
			});
		var initial_width = $this.width();
		$this.find('.small').css({
			width:initial_width,
			display: 'block'
			})
		//Now the mousemove function
		$this.mousemove(function(e){
			//When the user hovers on the image, the script will first calculate
			//the native dimensions if they don't exist. Only after the native dimensions
			//are available, the script will show the zoomed version.
			if(!native_width && !native_height)
			{
				//This will create a new image object with the same image as that in .small
				//We cannot directly get the dimensions from .small because of the 
				//width specified to 200px in the html. To get the actual dimensions we have
				//created this image object.
				var image_object = new Image();
				image_object.src = $this.find(".small").attr("src");
				
				//This code is wrapped in the .load function which is important.
				//width and height of the object would return 0 if accessed before 
				//the image gets loaded.
				native_width = image_object.width;
				native_height = image_object.height;
			}
			else
			{
				//x/y coordinates of the mouse
				//This is the position of .magnify with respect to the document.
				var magnify_offset = $this.offset();
				//We will deduct the positions of .magnify from the mouse positions with
				//respect to the document to get the mouse positions with respect to the 
				//container(.magnify)
				var mx = e.pageX - magnify_offset.left;
				var my = e.pageY - magnify_offset.top;
				
				//Finally the code to fade out the glass if the mouse is outside the container
				if(mx < $this.width() && my < $this.height() && mx > 0 && my > 0)
				{
					$this.find(".large").fadeIn(100);
				}
				else
				{
					$this.find(".large").fadeOut(100);
				}
				if($this.find(".large").is(":visible"))
				{
					//The background position of .large will be changed according to the position
					//of the mouse over the .small image. So we will get the ratio of the pixel
					//under the mouse pointer with respect to the image and use that to position the 
					//large image inside the magnifying glass
					var rx = Math.round(mx/$this.find(".small").width()*native_width - $this.find(".large").width()/2)*-1;
					var ry = Math.round(my/$this.find(".small").height()*native_height - $this.find(".large").height()/2)*-1;
					var bgp = rx + "px " + ry + "px";
					
					//Time to move the magnifying glass with the mouse
					var px = mx - $this.find(".large").width()/2;
					var py = my - $this.find(".large").height()/2;
					//Now the glass moves with the mouse
					//The logic is to deduct half of the glass's width and height from the 
					//mouse coordinates to place it with its center at the mouse coordinates
					
					//If you hover on the image now, you should see the magnifying glass in action
					$this.find(".large").css({left: px, top: py, backgroundPosition: bgp});
				}
			}
		});
	}

})(jQuery);