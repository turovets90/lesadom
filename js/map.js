

var jsonPoints = {"type":"FeatureCollection","features":[
        {"type":"Feature","id":"1","geometry":{"type":"Point","coordinates":[53.906093, 27.520895]},"properties":{"balloonContent":"<div class='content_baloon'><p class='title'>Название магазина 1</p><p class='address'>г. Минск, ул. Кальварийская , 25</p><ul><li><a href='tel:8 (029) 111-11-11'>8 (029) 111-11-11</a></li><li><a href='tel:8 (029) 111-11-11'>8 (029) 111-11-11</a></li></ul></div></div>","clusterCaption":"","hintContent":""},"options":{"iconLayout":"default#image","iconImageHref":"img/map_icon.svg","iconImageSize":[43,50]}
        },

        {"type":"Feature","id":"2","geometry":{"type":"Point","coordinates":[53.870798, 27.490370]},"properties":{"balloonContent":"<div class='content_baloon'><p class='title'>Название магазина 2</p><p class='address'>г. Минск, пр. Дзержинского, 78</p><ul><li><a href='tel:8 (029) 111-11-11'>8 (029) 111-11-11</a></li><li><a href='tel:8 (029) 111-11-11'>8 (029) 111-11-11</a></li></ul></div></div>","clusterCaption":"","hintContent":""},"options":{"iconLayout":"default#image","iconImageHref":"img/map_icon.svg","iconImageSize":[43,50]}
        },

        {"type":"Feature","id":"3","geometry":{"type":"Point","coordinates":[53.866842, 27.525836]},"properties":{"balloonContent":"<div class='content_baloon'><p class='title'>Название магазина 3</p><p class='address'>г. Минск, ул. Казинца, 1</p><ul><li><a href='tel:8 (029) 111-11-11'>8 (029) 111-11-11</a></li><li><a href='tel:8 (029) 111-11-11'>8 (029) 111-11-11</a></li></ul></div></div>","clusterCaption":"","hintContent":""},"options":{"iconLayout":"default#image","iconImageHref":"img/map_icon.svg","iconImageSize":[43,50]}
        }

    ]};






var myMap = null,
    objectManager = null,
    c1,c2;

(function($) {
    $(function() {
        var $shoplist = $('.mf-shoplist');
        var $shoplistMap = $shoplist.find('.mf-shoplist-map');

        $('.js-locate-shop').on('click', function () {
            var $item = $(this).closest('.js-shop-item');

            c1 = parseFloat($item.data('c1'));
            c2 = parseFloat($item.data('c2'));

            myMap.setCenter([c1, c2], 12);
            myMap.balloon.open([c1, c2], $item.find('.js-balloon-content').html(), {});

            setTimeout(function () {
                myMap.panTo([c1, c2]);
                setTimeout(function () {
                    $('html, body').animate({ scrollTop: ($('#map').offset().top - 150) }, 500);
                }, 200);
                $shoplist.find('li').removeClass('active');
                $shoplistMap.addClass('active');

            }, 100)
        });

    });
})(jQuery);




ymaps.ready(init);

function init () {
    var windowWidth = $(window).width();
    myMap = new ymaps.Map('map', {
        center: [53.902284, 27.561831],
        zoom: 6
    }, {
        searchControlProvider: 'yandex#search'
    });

    clusterer = new ymaps.Clusterer({
        clusterIcons: [
            {
                href: 'img/map_icon.svg',
                size: [50, 50],
                offset: [-20, -20]
            },
            {
                href: 'img/map_icon.svg',
                size: [60, 60],
                offset: [-30, -30]
            }],
        clusterNumbers: [10],
        clusterIconContentLayout: null
    });


    objectManager = new ymaps.ObjectManager({
        clusterize: true,
        gridSize: 32
    });

    if(windowWidth < 800) {
        myMap.behaviors.disable(['drag']);
    } else {
        // myMap.behaviors.disable(['scrollZoom']);
    }


    MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
        '<div class="cluster_text">{{ properties.geoObjects.length }}</div>'
    );

    objectManager.clusters.options.set({
        clusterIcons: [{
            href: 'img/map_icon.svg',
            size: [43, 50],
            offset: [-20, -20]
        }],
        clusterIconContentLayout: MyIconContentLayout,
    });
    objectManager.add(jsonPoints);
    myMap.geoObjects.add(objectManager);
    myMap.setBounds( objectManager.getBounds(),{zoomMargin: 13} );


}
