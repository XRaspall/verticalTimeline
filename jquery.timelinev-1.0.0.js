/* ----------------------------------
jQuery Timelinev 0.0.1
tested with jQuery v2.2.4

Copyright 2017, Created by Xavier Raspall Gonzalez
Free under the MIT license.
http://www.opensource.org/licenses/mit-license.php
---------------------------------- */

jQuery.fn.timelinev = function(options){
    // plugin settings
    settings = jQuery.extend({
        timelineDiv: 				'#timeline',
        containerDiv: 				'.timelineCont',
        dateDiv: 				    '.date',
        textDiv: 				    '.text',
        dateHtml: 				    'h2',
        textHtml: 				    'p',
        dateActiveClass: 			'.active',
        divHeight:       			'231',
        datesSpeed:       			'750',
    }, options);

    $(function() {
        // setting variables
        var timelineDiv = $(settings.timelineDiv);
        var divsCont    = timelineDiv.find(settings.containerDiv);
        var datesCont   = divsCont.find(settings.dateDiv+' '+settings.dateHtml);
        var dates       = parseFecha(datesCont);
        var dateActive  = dates.indexOf($(settings.timelineDiv+' '+settings.dateActiveClass+' '+settings.dateDiv+' '+settings.dateHtml).html());

        //Parse dates
        function parseFecha(fechasHTML) {
            var arrayDates = [];
            fechasHTML.each(function(){
                var singleDate = $(this).html();
                arrayDates.push(singleDate);
            });
            return arrayDates;
        }

        //Show date active
        if (dateActive>1) {
            for (i = 0; i < dateActive-1; i++) {
                $(divsCont[i]).css('margin-top', -settings.divHeight );
            }
        }

        //Bind click on date
        $(settings.containerDiv).find(settings.dateDiv).click(function(event){
            event.preventDefault();
            var dateSelected=$(this).find(settings.dateHtml);
            var posDate=dates.indexOf(dateSelected.html());

            if(posDate > dateActive && posDate!==dates.length){
                divsCont.removeClass('active');
                dateSelected.parent().parent().parent().addClass('active');

                $(divsCont[(dateActive-1)]).animate({ 'margin-top': "-"+settings.divHeight  }, {queue:true, duration:'settings.datesSpeed'});
                dateActive=posDate;
            }

            if(posDate < dateActive && posDate!==0){
                divsCont.removeClass('active');
                dateSelected.parent().parent().parent().addClass('active');

                $(divsCont[(dateActive-1)]).animate({ 'margin-top': 0 }, {queue:true, duration:'settings.datesSpeed'});
                $(divsCont[(dateActive-2)]).animate({ 'margin-top': 0 }, {queue:true, duration:'settings.datesSpeed'});
                dateActive=posDate;
            }
        });

        //Bind scroll
        timelineDiv.bind('mousewheel DOMMouseScroll', function (event) {
            event.preventDefault();

            if ((event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) && (dateActive-1)!==0) {
                divsCont.removeClass('active');
                $(divsCont[(dateActive-1)]).addClass('active');

                $(divsCont[(dateActive-1)]).animate({ 'margin-top': 0 }, {queue:true, duration:'settings.datesSpeed'});
                $(divsCont[(dateActive-2)]).animate({ 'margin-top': 0 }, {queue:true, duration:'settings.datesSpeed'});

                dateActive=dateActive-1;
            }

            if ((event.originalEvent.wheelDelta < 0 || event.originalEvent.detail > 0) && (dateActive+1)!==(dates.length-1)){
                divsCont.removeClass('active');
                $(divsCont[(dateActive+1)]).addClass('active');

                $(divsCont[dateActive-1]).animate({ 'margin-top': "-"+settings.divHeight  }, {queue:true, duration:'settings.datesSpeed'});
                dateActive=dateActive+1;
            }
        });


    });
};
