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
    console.log('data', this.data);

    let slides = '';
    
    if (this.data.itemsPerSlide == 1) {
        for (let i = 0; i < this.data.items.length; i++) {
            slides += `
            <li id="item-${i}" class="glide__slide" onclick="ad.clickthrough(this)">
                <div class="item">
                    <img src="${this.data.items[i].image}"/>
                    <h4>${this.data.items[i].title}</h4>
                    <p>${this.data.items[i].description}</p>
                    <span>${this.data.items[i].price}</span>
                </div>
            </li>`;
        }
    } else {
        let x = Math.ceil(this.data.items.length / this.data.itemsPerSlide);
        console.log(x)

        for (let y = 0; y < x; y++) {
            let items = '';
            let h = (y + 1) * this.data.itemsPerSlide;
            h = h > this.data.items.length ? this.data.items.length : h;

            console.log(h)

            for (let i = y * this.data.itemsPerSlide; i < h; i++) {
                items += `
                <div id="item-${i}" class="item" onclick="ad.clickthrough(this)">
                    <div class="image">
                        <img src="${this.data.items[i].image}"/>
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
                <img src="${this.data.background}"/>
            </div>
            <!-- Additional required wrapper -->
            <div class="glide__track" data-glide-el="track">
                <ul class="glide__slides">
                <!-- Slides -->
                ${slides}
                </ul>
            </div>
      </div>
    `;
  }

  style() {
    console.log('elements', this.elems);

    const links = ['https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css'];

    return [...links,
      `
        #ad-container {
            
        }
        #ad-container {
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
        new Glide('.glide', {
            type: 'carousel',
            hoverpause: this.data.hoverPause,
            autoplay: this.data.autoplay,
        }).mount();
    }

  }

  clickthrough(e) {
    console.log(e.id)
    console.log(this.data)
    console.log(this.data.items[e.id.replace('item-','')])

    /**/
    this.tracker('CTR', 'image-' + e.id.replace('item-',''));

    this.linkOpener(this.data.items[e.id.replace('item-','')].clickthrough);
  }

}

window.ad = new AdUnit();
