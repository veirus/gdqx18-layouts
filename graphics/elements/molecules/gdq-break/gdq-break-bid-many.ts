import {TimelineLite, Power4} from 'gsap';
import {BidElement} from './gdq-break-bids';
import {createMaybeRandomTween} from '../../../../shared/lib/MaybeRandom';
import {ParentBid} from '../../../../src/types/index';
import {IGdqBreakBidManyOption} from './gdq-break-bid-many-option';

window.addEventListener('load', () => {
	const {customElement, property} = Polymer.decorators;

	/**
	 * @customElement
	 * @polymer
	 */
	@customElement('gdq-break-bid-many')
	class GdqBreakBidMany extends Polymer.Element implements BidElement {
		@property({type: Object})
		bid: ParentBid;

		enter() {
			(this.$.optionRepeat as Polymer.DomRepeat).render();

			const tl = new TimelineLite();
			const optionElements = Array.from(this.shadowRoot!.querySelectorAll('gdq-break-bid-many-option')) as IGdqBreakBidManyOption[];

			tl.addLabel('flickerOptions', '+=0');
			optionElements.forEach((optionElement, index) => {
				optionElement.style.opacity = '0';
				tl.add(createMaybeRandomTween({
					target: optionElement.style,
					propName: 'opacity',
					duration: 0.465,
					ease: Power4.easeIn,
					start: {probability: 1, normalValue: 0},
					end: {probability: 0, normalValue: 1}
				}), `flickerOptions+=${index * 0.1}`);
			});

			tl.addLabel('enterOptions', '+=0');
			optionElements.forEach((optionElement, index) => {
				tl.add(optionElement.enter(), `enterOptions+=${index * 0.1}`);
			});

			return tl;
		}

		exit() {
			const tl = new TimelineLite();

			const optionElements = Array.from(this.shadowRoot!.querySelectorAll('gdq-break-bid-many-option')) as IGdqBreakBidManyOption[];

			tl.addLabel('flickerOptions', '+=0');
			optionElements.slice(0).reverse().forEach((optionElement, index) => {
				tl.add(createMaybeRandomTween({
					target: optionElement.style,
					propName: 'opacity',
					duration: 0.2,
					ease: Power4.easeIn,
					start: {probability: 1, normalValue: 1},
					end: {probability: 0, normalValue: 0}
				}), `flickerOptions+=${index * 0.1}`);
			});

			return tl;
		}

		_calcOptions(bid: ParentBid) {
			if (!bid) {
				return [];
			}

			return bid.options.slice(0, 5);
		}
	}

	// This assignment to window is unnecessary, but tsc complains that the class is unused without it.
	(window as any).GdqBreakBidMany = GdqBreakBidMany;
});
