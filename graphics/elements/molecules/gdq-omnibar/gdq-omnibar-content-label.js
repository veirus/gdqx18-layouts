import * as tslib_1 from "tslib";
import { TimelineLite, Power3, Power2 } from 'gsap';
const { customElement } = Polymer.decorators;
const memoizedYardstickWidths = new Map();
const memoizedBodyTweenDurations = new Map();
const MAX_MEMOIZATION_MAP_SIZE = 150;
const ANCHOR_TWEEN_DURATION = 0.3;
const BODY_TWEEN_DURATION_PER_PX = 0.002;
/**
 * @customElement
 * @polymer
 */
let GDQOmnibarContentLabelElement = class GDQOmnibarContentLabelElement extends Polymer.Element {
    enter(labelHtml) {
        labelHtml = this.processLabelHtml(labelHtml); // tslint:disable-line:no-parameter-reassignment
        const tl = new TimelineLite();
        const yardstickWidth = this.calcBodyWidth(labelHtml);
        tl.fromTo(this.$.anchor, ANCHOR_TWEEN_DURATION, {
            scaleY: 0
        }, {
            scaleY: 1,
            ease: Power3.easeInOut
        });
        tl.fromTo(this.$.body, this.calcBodyTweenDuration(labelHtml), {
            x: '-100%'
        }, {
            x: '0%',
            ease: Power2.easeOut,
            onStart: () => {
                const textElem = this.$.text;
                textElem.innerHTML = labelHtml;
                textElem.style.width = `${Math.ceil(yardstickWidth)}px`;
            }
        });
        return tl;
    }
    change(labelHtml) {
        labelHtml = this.processLabelHtml(labelHtml); // tslint:disable-line:no-parameter-reassignment
        const tl = new TimelineLite();
        const yardstickWidth = this.calcBodyWidth(labelHtml);
        tl.to(this.$.body, this.calcBodyTweenDuration(labelHtml), {
            x: '-100%',
            ease: Power2.easeIn,
            onComplete: () => {
                const textElem = this.$.text;
                textElem.innerHTML = labelHtml;
                textElem.style.width = `${Math.ceil(yardstickWidth)}px`;
            }
        });
        tl.to(this.$.body, this.calcBodyTweenDuration(labelHtml), {
            x: '0%',
            ease: Power2.easeOut,
            delay: 0.2
        });
        return tl;
    }
    exit() {
        const tl = new TimelineLite();
        tl.to(this.$.body, this.calcBodyTweenDuration(), {
            x: '-100%',
            ease: Power2.easeIn
        });
        tl.to(this, ANCHOR_TWEEN_DURATION, {
            scaleY: 0,
            ease: Power3.easeInOut
        });
        return tl;
    }
    processLabelHtml(labelHtml) {
        return labelHtml.replace(/\\n/g, '<br/>');
    }
    calcBodyWidth(labelHtml = '') {
        if (memoizedYardstickWidths.has(labelHtml)) {
            return memoizedYardstickWidths.get(labelHtml);
        }
        if (memoizedYardstickWidths.size > MAX_MEMOIZATION_MAP_SIZE) {
            memoizedYardstickWidths.clear();
        }
        this.$.yardstick.innerHTML = labelHtml;
        const width = this.$.yardstick.clientWidth;
        memoizedYardstickWidths.set(labelHtml, width);
        return width;
    }
    calcBodyTweenDuration(labelHtml) {
        if (memoizedBodyTweenDurations.has(labelHtml)) {
            return memoizedBodyTweenDurations.get(labelHtml);
        }
        if (memoizedBodyTweenDurations.size > MAX_MEMOIZATION_MAP_SIZE) {
            memoizedYardstickWidths.clear();
        }
        let duration;
        if (labelHtml) {
            const yardstickWidth = this.calcBodyWidth(labelHtml);
            duration = BODY_TWEEN_DURATION_PER_PX * (yardstickWidth + 30); // 30 = width added by chevrons
        }
        else {
            duration = BODY_TWEEN_DURATION_PER_PX * this.$.body.clientWidth;
        }
        memoizedBodyTweenDurations.set(labelHtml, duration);
        return duration;
    }
};
GDQOmnibarContentLabelElement = tslib_1.__decorate([
    customElement('gdq-omnibar-content-label')
], GDQOmnibarContentLabelElement);
export default GDQOmnibarContentLabelElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLW9tbmliYXItY29udGVudC1sYWJlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdkcS1vbW5pYmFyLWNvbnRlbnQtbGFiZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxZQUFZLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUVsRCxNQUFNLEVBQUMsYUFBYSxFQUFDLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQztBQUMzQyxNQUFNLHVCQUF1QixHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7QUFDMUMsTUFBTSwwQkFBMEIsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO0FBQzdDLE1BQU0sd0JBQXdCLEdBQUcsR0FBRyxDQUFDO0FBQ3JDLE1BQU0scUJBQXFCLEdBQUcsR0FBRyxDQUFDO0FBQ2xDLE1BQU0sMEJBQTBCLEdBQUcsS0FBSyxDQUFDO0FBRXpDOzs7R0FHRztBQUVILElBQXFCLDZCQUE2QixHQUFsRCxNQUFxQiw2QkFBOEIsU0FBUSxPQUFPLENBQUMsT0FBTztJQUN6RSxLQUFLLENBQUMsU0FBaUI7UUFDdEIsU0FBUyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLGdEQUFnRDtRQUU5RixNQUFNLEVBQUUsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzlCLE1BQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFckQsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxxQkFBcUIsRUFBRTtZQUMvQyxNQUFNLEVBQUUsQ0FBQztTQUNULEVBQUU7WUFDRixNQUFNLEVBQUUsQ0FBQztZQUNULElBQUksRUFBRSxNQUFNLENBQUMsU0FBUztTQUN0QixDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxF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