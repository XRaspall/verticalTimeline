/* ----------------------------------
jQuery Timelinev 1.1.0
tested with jQuery v2.2.4

Copyright 2017, Created by Xavier Raspall Gonzalez
Free under the MIT license.
http://www.opensource.org/licenses/mit-license.php
---------------------------------- */

jQuery.fn.timelinev = function(options){
    // plugin settings
    settings = jQuery.extend({
        timelineDiv: 	 $(this),
        containerDivs: 	 '.timelineCont',
        dateDiv: 		 '.date',
        textDiv: 		 '.text',
        dateHtml: 		 'h2',
        textHtml: 		 'p',
        dateActiveClass: '.active',
        datesSpeed:      '750',
    }, options);
        
    console.log();

    $(function() {
        // setting variables
        var divsCont    = settings.timelineDiv.find(settings.containerDivs);
        var datesCont   = divsCont.find(settings.dateDiv+' '+settings.dateHtml);
        var dates       = parseFecha(datesCont);
        var dateActive  = dates.indexOf($(settings.dateActiveClass+' '+settings.dateDiv+' '+settings.dateHtml).html());

        var divHeight   = divsCont.outerHeight();

        //Show date active
        if (dateActive>1) {
            for (i = 0; i < dateActive-1; i++) {
                $(divsCont[i]).css('margin-top', -divHeight );
            }
        }

        //Bind click on date
        $(settings.containerDivs).find(settings.dateDiv).click(function(event){
            event.preventDefault();
            var dateSelected=$(this).find(settings.dateHtml);
            var posDate=dates.indexOf(dateSelected.html());

            if(posDate > dateActive && posDate!==dates.length){
                divsCont.removeClass('active');
                dateSelected.parent().parent().parent().addClass('active');

                if ((dateActive+1)!=(divsCont.length-2)){
                    decrementDate();
                }

                dateActive=posDate;
            }

            if(posDate < dateActive && posDate!==0){
                divsCont.removeClass('active');
                dateSelected.parent().parent().parent().addClass('active');

                incrementDate();
                dateActive=posDate;
            }
        });

        //Bind scroll
        settings.timelineDiv.bind('mousewheel DOMMouseScroll', function (event) {
            event.preventDefault();

            if ((event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) && (dateActive-1)!==0) {
                divsCont.removeClass('active');
                $(divsCont[(dateActive-1)]).addClass('active');

                incrementDate();
                dateActive=dateActive-1;

            }

            if ((event.originalEvent.wheelDelta < 0 || event.originalEvent.detail > 0) && (dateActive+1)!==(dates.length-1)){
                divsCont.removeClass('active');
                $(divsCont[(dateActive+1)]).addClass('active');

                if ((dateActive+1)!=(divsCont.length-2)){
                    decrementDate();
                }

                dateActive=dateActive+1;
            }
        });

        //Parse dates
        function parseFecha(fechasHTML) {
            var arrayDates = [];
            fechasHTML.each(function(){
                var singleDate = $(this).html();
                arrayDates.push(singleDate);
            });
            return arrayDates;
        }

        //Increment
        function incrementDate(){
            $(divsCont[(dateActive-1)]).animate({ 'margin-top': 0 }, {queue:true, duration:'settings.datesSpeed'});
            $(divsCont[(dateActive-2)]).animate({ 'margin-top': 0 }, {queue:true, duration:'settings.datesSpeed'});
        }

        //Decrement
        function decrementDate(){
            $(divsCont[dateActive-1]).animate({ 'margin-top': "-"+divHeight  }, {queue:true, duration:'settings.datesSpeed'});
        }

    });
};
