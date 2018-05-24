/* global window */
import Mads from 'mads-custom';
import Glide from '@glidejs/glide';
import './main.css';


/*eslint-disable */
class AdUnit extends Mads {
  constructor() {
    super();

    // this.loadJS('https://code.jquery.com/jquery-1.11.3.min.js').then(() => {
    //   console.log(typeof window.jQuery !== 'undefined' ? 'jquery loaded' : 'jquery not loaded');
    // });
  }

  render() {

    let slides = '';
    
    if (this.data.itemsPerSlide == 1) {
        for (let i = 0; i < this.data.items.length; i++) {
            slides += `
            <li id="item-${i}" class="glide__slide" onclick="ad.clickthrough(this)">
                <div class="item">
                    <div class="image">
                    <img src="${this.data.items[i].image}"/>
                    </div>
                    <div class="content">
                    <h4>${this.data.items[i].title}</h4>
                    <span>${this.data.items[i].price}</span>
                    </div>
                </div>
            </li>`;
        }
    } else {
        let x = Math.ceil(this.data.items.length / this.data.itemsPerSlide);

        for (let y = 0; y < x; y++) {
            let items = '';
            let h = (y + 1) * this.data.itemsPerSlide;
            h = h > this.data.items.length ? this.data.items.length : h;

            for (let i = y * this.data.itemsPerSlide; i < h; i++) {
                items += `
                <div id="item-${i}" class="item" onclick="ad.clickthrough(this)">
                    <div class="image">
                        <img src="${this.data.items[i].image}"/>
                    </div>
                    <div class="content">
                        <h4>${this.data.items[i].title}</h4>
                        <span>${this.data.items[i].price}</span>
                    </div>
                </div>`;
            }
            slides += `
            <li id="item-${y}" class="glide__slide">
                ${items}
            </li>`;
        }
    }

    return `
      <div id="ad-container" class="glide">
            <div class="logo">
                <img src="img/tesco-img-07.png"/>
            </div>
        <!-- Additional required wrapper -->
        <div class="glide__track" data-glide-el="track">
            <ul class="glide__slides">
            <!-- Slides -->
            ${slides}
            </ul>
            <div class="glide__arrows" data-glide-el="controls">
                <button class="glide__arrow glide__arrow--left" data-glide-dir="<"><span class="glyphicon glyphicon-chevron-left"></span></button>
                <button class="glide__arrow glide__arrow--right" data-glide-dir=">"><span class="glyphicon glyphicon-chevron-right"></span></button>
            </div>
        </div>
      </div>
    `;
  }

  style() {
    const links = [''];

    return [...links,
      `
        #ad-container {
            
        }
        #ad-container, .glide__slide {
            width: ${this.data.width}px;
            height: ${this.data.height}px;
        }
        .item {
            width: ${this.data.itemWidth};
            height: ${this.data.itemHeight};
            float: left;
        }
      `];
  }

  events() {
    console.log('load events');

    if (this.data.slide) {
        let glide = new Glide('.glide', {
            type: 'carousel',
            hoverpause: this.data.hoverPause,
            autoplay: this.data.autoplay,
        }).mount();

        glide.on('swipe.start', () => {
            this.tracker('E', 'swipe');
            console.log('swipe');
        });

        document.querySelector('.glide__arrow--left').addEventListener('click', () => {
            this.tracker('E', 'prev');
            console.log('prev');
        })

        document.querySelector('.glide__arrow--right').addEventListener('click', () => {
            this.tracker('E', 'next');
            console.log('next');
        })
    }



  }

  clickthrough(e) {
    /**/
    this.tracker('CTR', 'image-' + e.id.replace('item-',''));

    console.log('image-' + e.id.replace('item-',''))

    this.linkOpener(this.data.items[e.id.replace('item-','')].clickthrough);
  }

}

window.ad = new AdUnit();
