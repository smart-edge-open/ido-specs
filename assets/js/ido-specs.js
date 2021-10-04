/*jQuery('.quickLinkBtn').on('click', function(){
            jQuery('.collapseArea').slideToggle();
    });*/
    
    jQuery(document).ready(function () {
        jQuery('.rightSection .rightHead').css('display','block');
        jQuery('.rightSection .download-strip').css('display','block');
        jQuery('.rightSection #contentArea').css('padding-top','80px');
        var currURL = window.location.href;//alert(currURL);
        /*var imgfolder = currURL.replace(document.location.origin+'/'+landing,'');   //alert(imgfolder);
        var the_arr = imgfolder.split('/'); //alert(the_arr);
        the_arr.pop();
        var finalURL = the_arr.join('/') ;//alert(finalURL);
        jQuery('.rightSection img').each(function(){
            jQuery(this).attr('src',jQuery(this).attr('src').replace(finalURL,''));
        });*/
        
        var list = new Array();
        var count = 1;
        jQuery('h2, h3, h4, h5').each(function(){
            var obj = jQuery(this);
            var id = jQuery(this).attr('id');
            if(jQuery.inArray(id, list) !== -1){
                obj.attr('id', id+'-'+count);
                count++;
            }else{
                list.push(id);
            }
        });
        
        
        jQuery('.download_page').on('click', function(){
            var obj = jQuery(this);           
           jQuery.ajax({
                url: "/index.php?option=com_products&view=product&task=product.downloadpdf",
                type: "POST",
            })
            .done(function(result) {
                var data = jQuery.parseJSON(result);
                if(typeof data.status != 'undefined' && data.status == 200){
                    var currentURL = window.location.href;
                    var absURL = currURL.replace(document.location.origin+'/','');
                    var layout = absURL.split('/')[0];
                    if(typeof layout != 'undefined' && layout == 'dashboard'){
                        var downloadUrl = currentURL.replace('/dashboard','/media/ido-specs');
                    }
                    if(typeof layout != 'undefined' && layout == 'docs'){
                       var downloadUrl = currentURL.replace('/docs','/media/specs');   
                    }
                    
                    if(typeof downloadUrl != 'undefined'){
                        var downloadUrl = downloadUrl.trimRight("/"); //alert(downloadUrl);
                        jQuery('.rightSection .download-strip .download-pdf').html('<a href="'+downloadUrl+'.pdf" download><i class="fa fa-file-pdf-o" aria-hidden="true"></i> Download this page</a>');
                    
                        obj.removeAttr('class');
                        obj.attr('download','');
                        obj.attr('href',downloadUrl);
                        var fileNameIndex = downloadUrl.lastIndexOf("/") + 1;
                        var filename = downloadUrl.substr(fileNameIndex);
                        //alert(downloadUrl);
                        const save = document.createElement('a');
                        if (typeof save.download !== 'undefined') {
                          save.href = downloadUrl+'.pdf';
                          save.target = '_blank';
                          save.download = filename;
                          save.dispatchEvent(new MouseEvent('click'));
                        } else {
                          window.location.href = downloadUrl+'.pdf';
                        }
                    }else{
                        alert('Error in creating pdf.');
                    }
                }
                
                //alert(data.status);
            })
            .fail(function( xhr, status, errorThrown ) {
                //alert('fail');
            });

        });
        
        String.prototype.trimRight = function(charlist) {
            if (charlist === undefined)
              charlist = "\s";
            return this.replace(new RegExp("[" + charlist + "]+$"), "");
        };
        
        jQuery('.collaspeHead').on('click', function(){
            if(jQuery(this).next('.collaspeContent').is(':visible')){
                jQuery(this).next('.collaspeContent').slideUp();
            }
            else{
                jQuery(this).children('ul').removeAttr('style');
                jQuery('.collaspeContent').slideUp();
                jQuery(this).next('.collaspeContent').slideDown();
            }
        });
        
        
        jQuery('.collaspeContent ul li a').click('on',function(e){        
            if(jQuery(this).parent('li').hasClass('with-section')){ 
                if(jQuery(this).parent('li').children('ul').hasClass('visible')){
                    jQuery(this).siblings('ul').removeClass('visible');
                    jQuery(this).siblings('i').removeClass('fa-angle-down').addClass('fa-angle-right');
                    //jQuery(this).siblings('ul').find('li').slideUp();
                    jQuery(this).siblings('ul').slideUp();
                }else{
                    jQuery(this).siblings('ul').addClass('visible');
                    jQuery(this).siblings('i').removeClass('fa-angle-right').addClass('fa-angle-down');
                    //jQuery(this).siblings('ul').find('li').slideDown();
                    jQuery(this).siblings('ul').slideDown();
                } 
                return false;
            }
        });
        
        var url = jQuery(location).attr('href').split("/").reverse()[1];
        if(typeof url != 'undefined' && url != ''){ 
            jQuery('li.'+url).parent('ul.parent').siblings('i').addClass('fa-angle-down').removeClass('fa-angle-right');
            jQuery('li.'+url).css('display','block');
            jQuery('li.'+url).parent('ul.parent').addClass('visible');
            //jQuery('.collaspeContent ul:not(.parent)').children('li').css('display','block');
        }
        
    });
    
    
jQuery(document).ready(function(){
    jQuery('.xbutton').on('click',function(e){e.preventDefault();
		jQuery('#alertMsg').remove();
	});
	 jQuery("#contact-button").click(function() {
        if(jQuery(this).parent().css("left") == "-280px"){
            jQuery(this).parent().animate({"left": "0px"});
        }
        else{
            jQuery(this).parent().animate({"left": "-280px"});
         }
      });
});
if (jQuery(window).width() < 768){
    var lastScrollTop = 0;
    jQuery(window).scroll(function() {
        var scrollTop = jQuery(this).scrollTop();        
        if (scrollTop > lastScrollTop) {
            if(jQuery('.sideBar-wrap').css('left') == '0px' ){
                jQuery(this).show();
            } else { 
                jQuery('.sideBar-wrap').hide();
            }
        } else {         
            jQuery('.sideBar-wrap').show();
        }        
        lastScrollTop = scrollTop;
    });
}



