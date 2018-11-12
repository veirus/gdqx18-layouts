import {TimelineLite, Power4, Power3, TweenLite} from 'gsap';
import {Interview3Anames} from '../../../../src/types/schemas/interview%3Anames';
import Random from '../../../../shared/lib/vendor/random';
import GdqLowerthirdNameplate from './gdq-lowerthird-nameplate';

const {customElement, property} = Polymer.decorators;
const NAME_ELEMENT_ENTRANCE_STAGGER = 0.15;
const interviewNames = nodecg.Replicant<Interview3Anames>('interview:names');
const lowerthirdShowing = nodecg.Replicant<boolean>('interview:lowerthirdShowing');

/**
 * @customElement
 * @polymer
 * @appliesMixin Polymer.MutableData
 */
@customElement('gdq-lowerthird')
export default class GdqLowerthird extends Polymer.MutableData(Polymer.Element) {
	@property({type: Boolean, reflectToAttribute: true})
	preview: boolean = false;

	@property({type: Number, reflectToAttribute: true})
	numNames: number;

	readonly tl = new TimelineLite({autoRemoveChildren: true});
	private _$nameElements: GdqLowerthirdNameplate[];

	ready() {
		super.ready();
		this._$nameElements = Array.from(this.shadowRoot!.querySelectorAll('#mainNames gdq-lowerthird-nameplate, #hostName'));
		this.reset();

		if (!this.preview && !(window as any).__SCREENSHOT_TESTING__) {
			lowerthirdShowing.on('change', newVal => {
				if (newVal) {
					this.tl.add(this.show());
				} else {
					this.tl.add(this.hide());
				}
			});
		}
	}

	updatePreview(names: Interview3Anames) {
		this.show(names).progress(1);
	}

	show(prefilledNames?: Interview3Anames) {
		const tl = new TimelineLite();
		const names = prefilledNames ?
			prefilledNames :
			interviewNames.value && interviewNames.value.filter(({name}) => {
				return Boolean(name) && name!.trim().length > 0;
			});
		if (!names || names.length <= 0) {
			return tl;
		}

		const nameElementsToShow = this._$nameElements.slice(0, names.length);
		const randomizedNameElements = Random.shuffle(
			Random.engines.browserCrypto,
			nameElementsToShow.slice(0).concat([this.$.header as GdqLowerthirdNameplate])
		);

		this.reset();

		tl.call(() => {
			this.numNames = names.length;
		});

		// Set names
		tl.call(() => {
			this._$nameElements.forEach((nameElement, index) => {
				nameElement.hidden = !names[index] || !names[index].name;
				if (!nameElement.hidden) {
					nameElement.name = names[index].name as string;
					nameElement.title = names[index].title as string;
				}
			});
		}, undefined, null, '+=0.3'); // Give time for interviewNames replicant to update.

		tl.to(this.$.background, 0.75, {
			y: '0%',
			ease: Power4.easeOut
		});

		tl.addLabel('nameElementsEnter', '+=0');

		tl.call(() => {
			// tl.timeScale(0.2);
		}, undefined, null, 'nameElementsEnter');

		randomizedNameElements.forEach((nameElem, index) => {
			tl.add(nameElem.enter(), `nameElementsEnter+=${NAME_ELEMENT_ENTRANCE_STAGGER * index}`);
		});

		return tl;
	}

	hide() {
		const tl = new TimelineLite();
		tl.to(this, 0.5, {
			y: '100%',
			ease: Power3.easeIn
		});
		return tl;
	}

	reset() {
		(this.$.header as GdqLowerthirdNameplate).reset();
		this._$nameElements.forEach(nameElem => nameElem.reset());
		TweenLite.set(this.$.background, {y: '100%'});
		TweenLite.set(this, {y: '0%', opacity: 1});
	}
}