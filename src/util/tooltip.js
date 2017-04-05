import {addClass, removeClass} from './helpers';
export default{
    install(Vue){
        Vue.directive('tooltip',{
                bind(el,bindings){
                    let div = document.createElement('DIV');
                    let text = document.createTextNode("Seats available: "+ bindings.value.seats);
                    div.appendChild(text);
                    addClass(div, 'tooltip');
                    el.appendChild(div);
                    let className = 'tooltip-show';
                    el.addEventListener('mouseover', function(){ addClass(div, className)});
                    el.addEventListener('mouseout', function(){ removeClass(div, className)});
                    el.addEventListener('touchstart', function(){ addClass(div, className)});
                    el.addEventListener('touchend', function(){ removeClass(div, className)});

                }
        });
    }
}

//{
//    bind(el, bindings)
//    {
//        let div = document.createElement('DIV');
//        let text = document.createTextNode("Seats available: " + bindings.value.seats);
//        div.appendChild(text);
//        addClass(div, 'tooltip');
//        el.appendChild(div);
//        let className = 'tooltip-show';
//        el.addEventListener('mouseover', function () {
//            addClass(div, className)
//        });
//        el.addEventListener('mouseout', function () {
//            removeClass(div, className)
//        });
//        el.addEventListener('touchstart', function () {
//            addClass(div, className)
//        });
//        el.addEventListener('touchend', function () {
//            removeClass(div, className)
//        });
//    }
//}