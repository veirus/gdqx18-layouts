import * as tslib_1 from "tslib";
const { customElement, property } = Polymer.decorators;
const currentRun = nodecg.Replicant('currentRun');
const stopwatch = nodecg.Replicant('stopwatch');
const gameAudioChannels = nodecg.Replicant('gameAudioChannels');
/**
 * @customElement
 * @polymer
 */
let GDQRunnerNameplateElement = class GDQRunnerNameplateElement extends Polymer.Element {
    /**
     * @customElement
     * @polymer
     */
    constructor() {
        super(...arguments);
        this.noLeftCap = false;
        this.noRightCap = false;
        this.audio = false;
        this.noAudio = false;
        this.coop = false;
        this.finished = false;
        this.forfeit = false;
        this._numRunners = 1;
    }
    ready() {
        super.ready();
        this.currentRunChanged = this.currentRunChanged.bind(this);
        this.stopwatchChanged = this.stopwatchChanged.bind(this);
        this.gameAudioChannelsChanged = this.gameAudioChannelsChanged.bind(this);
        // Attach replicant change listeners.
        currentRun.on('change', this.currentRunChanged);
        stopwatch.on('change', this.stopwatchChanged);
        gameAudioChannels.on('change', this.gameAudioChannelsChanged);
    }
    /*
     * 1) For singleplayer, if both match (ignoring capitalization), show only twitch.
     * 2) For races, if everyone matches (ignoring capitalization), show only twitch, otherwise,
     *    if even one person needs to show both, everyone shows both.
     */
    currentRunChanged(newVal, oldVal) {
        if (!newVal || typeof newVal !== 'object') {
            return;
        }
        this.coop = newVal.coop;
        this._numRunners = newVal.runners.length;
        // Only invoke updateNames if the names could have changed.
        if (!oldVal || JSON.stringify(newVal.runners) !== JSON.stringify(oldVal.runners)) {
            this.updateNames(newVal.runners);
        }
    }
    updateNames(runners) {
        let canConflateAllRunners = true;
        runners.forEach(r => {
            if (r && (!r.stream || r.name.toLowerCase() !== r.stream.toLowerCase())) {
                canConflateAllRunners = false;
            }
        });
        const runner = runners[this.index];
        let alias;
        let twitchAlias;
        if (runner) {
            alias = runner.name;
            if (runner.stream) {
                twitchAlias = runner.stream;
            }
            else {
                twitchAlias = '';
            }
        }
        else {
            alias = '?';
            twitchAlias = '?';
        }
        this.$.nameplate.updateName({ alias, twitchAlias, rotate: !canConflateAllRunners });
    }
    stopwatchChanged(newVal) {
        if (newVal.results[this.index]) {
            this.forfeit = newVal.results[this.index].forfeit;
            this.place = newVal.results[this.index].place;
            this.time = newVal.results[this.index].time.formatted;
            this.finished = true;
        }
        else {
            this.forfeit = false;
            this.finished = false;
        }
    }
    gameAudioChannelsChanged(newVal) {
        if (this.noAudio) {
            return;
        }
        if (!newVal || newVal.length <= 0) {
            return;
        }
        const channels = newVal[this.index];
        const canHearSd = !channels.sd.muted && !channels.sd.fadedBelowThreshold;
        const canHearHd = !channels.hd.muted && !channels.hd.fadedBelowThreshold;
        this.audio = canHearSd || canHearHd;
    }
    _computeFirstPlace(place) {
        return place === 1;
    }
    _computeLastPlace(place, numRunners) {
        return place === numRunners;
    }
    _calcResultHidden(resultSide) {
        return !resultSide;
    }
};
tslib_1.__decorate([
    property({ type: Boolean, reflectToAttribute: true })
], GDQRunnerNameplateElement.prototype, "noLeftCap", void 0);
tslib_1.__decorate([
    property({ type: Boolean, reflectToAttribute: true })
], GDQRunnerNameplateElement.prototype, "noRightCap", void 0);
tslib_1.__decorate([
    property({ type: Number })
], GDQRunnerNameplateElement.prototype, "index", void 0);
tslib_1.__decorate([
    property({ type: String })
], GDQRunnerNameplateElement.prototype, "audioVertPos", void 0);
tslib_1.__decorate([
    property({ type: String })
], GDQRunnerNameplateElement.prototype, "audioHorizPos", void 0);
tslib_1.__decorate([
    property({ type: Boolean, reflectToAttribute: true })
], GDQRunnerNameplateElement.prototype, "audio", void 0);
tslib_1.__decorate([
    property({ type: Boolean, reflectToAttribute: true })
], GDQRunnerNameplateElement.prototype, "noAudio", void 0);
tslib_1.__decorate([
    property({ type: String })
], GDQRunnerNameplateElement.prototype, "resultSide", void 0);
tslib_1.__decorate([
    property({ type: Boolean, reflectToAttribute: true })
], GDQRunnerNameplateElement.prototype, "coop", void 0);
tslib_1.__decorate([
    property({ type: Boolean, reflectToAttribute: true })
], GDQRunnerNameplateElement.prototype, "finished", void 0);
tslib_1.__decorate([
    property({ type: Boolean, reflectToAttribute: true })
], GDQRunnerNameplateElement.prototype, "forfeit", void 0);
tslib_1.__decorate([
    property({ type: String })
], GDQRunnerNameplateElement.prototype, "time", void 0);
tslib_1.__decorate([
    property({ type: Number })
], GDQRunnerNameplateElement.prototype, "place", void 0);
tslib_1.__decorate([
    property({ type: Boolean, computed: '_computeFirstPlace(place)' })
], GDQRunnerNameplateElement.prototype, "firstPlace", void 0);
tslib_1.__decorate([
    property({ type: Boolean, computed: '_computeLastPlace(place, _numRunners)' })
], GDQRunnerNameplateElement.prototype, "lastPlace", void 0);
tslib_1.__decorate([
    property({ type: Number })
], GDQRunnerNameplateElement.prototype, "_numRunners", void 0);
GDQRunnerNameplateElement = tslib_1.__decorate([
    customElement('gdq-runner-nameplate')
], GDQRunnerNameplateElement);
export default GDQRunnerNameplateElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLXJ1bm5lci1uYW1lcGxhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnZHEtcnVubmVyLW5hbWVwbGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBS0EsTUFBTSxFQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO0FBQ3JELE1BQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQU0sWUFBWSxDQUFDLENBQUM7QUFDdkQsTUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBWSxXQUFXLENBQUMsQ0FBQztBQUMzRCxNQUFNLGlCQUFpQixHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQW9CLG1CQUFtQixDQUFDLENBQUM7QUFFbkY7OztHQUdHO0FBRUgsSUFBcUIseUJBQXlCLEdBQTlDLE1BQXFCLHlCQUEwQixTQUFRLE9BQU8sQ0FBQyxPQUFPO0lBTHRFOzs7T0FHRztJQUNIOztRQUdDLGNBQVMsR0FBWSxLQUFLLENBQUM7UUFHM0IsZUFBVSxHQUFZLEtBQUssQ0FBQztRQVk1QixVQUFLLEdBQVksS0FBSyxDQUFDO1FBR3ZCLFlBQU8sR0FBWSxLQUFLLENBQUM7UUFNekIsU0FBSSxHQUFZLEtBQUssQ0FBQztRQUd0QixhQUFRLEdBQVksS0FBSyxDQUFDO1FBRzFCLFlBQU8sR0FBWSxLQUFLLENBQUM7UUFlekIsZ0JBQVcsR0FBVyxDQUFDLENBQUM7SUFtR3pCLENBQUM7SUFqR0EsS0FBSztRQUNKLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUVkLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzNELElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyx3QkFBd0IsR0FBRyxJQUFJLENBQUMsd0JBQXdC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