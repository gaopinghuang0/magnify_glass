Magnifying glass is implemented by jQuery and CSS3.
It is adapted from [thecodeplayer.com](http://thecodeplayer.com/walkthrough/magnifying-glass-for-images-using-jquery-and-css3)
#magnify_glass
###Example1:
```html
<html>
   <head>
      <script src="http://code.jquery.com/jquery-1.10.2.js"></script>
      <script type="text/javascript" src="http://thecodeplayer.com/uploads/js/prefixfree.js"></script>
      <script src="jquery.magnify_glass.js"></script>
      <script>
      $(function() {
        $( ".magnify" ).magnify_glass();
        });
      </script>
  </head>
  <body>
    <div class="magnify" style="width:400px;">
      <!-- the large content is cloned from the small content -->
      <div class="large"></div>
      <!-- the demo picture is from flickr creative common -->
      <img class="small" src="https://farm4.staticflickr.com/3816/13541002244_b09843740e_b.jpg" alt="small"/>
   <p>(Auto-magnify when mouse over photo)</p>
    </div>
  </body>
</html>
```
See [Demo here](http://jsfiddle.net/xpc3va3y/5/)


