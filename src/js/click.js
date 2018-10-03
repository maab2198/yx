var main = {
        opt: {

            deviceBut: $(".preview__buttons span")
      
        },

        devicePrew: function() {
            this.opt.deviceBut.on("click", function() {
                var t = $(this).parents(".portfolio__preview").find(".prew"),
                    e = $(this).attr("data-src"),
                    n = $(this).attr("data-show");
                t.attr("id");
                main.opt.deviceBut.removeClass("active"), 
                $(this).addClass("active"), 
                t.attr("class", "prew " + n), 
                t.find("img").attr("src", e)
            })
        },


    };
$(document).ready(function() {


	 main.devicePrew();
});