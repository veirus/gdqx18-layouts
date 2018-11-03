/// <reference path="../bower_components/paper-toggle-button/paper-toggle-button.d.ts" />
import {RecordTrackerEnabled} from '../src/types/schemas/recordTrackerEnabled'
(() => {
	const $toggle = document.getElementById('toggle') as PaperToggleButtonElement;
	if (!$toggle) {
		return;
	}
	const recordTrackerEnabled = nodecg.Replicant<RecordTrackerEnabled>('recordTrackerEnabled');

	recordTrackerEnabled.on('change', newVal => {
		$toggle.checked = Boolean(newVal);
	});

	$toggle.addEventListener('change', e => {
		if (e && e.target) {
			recordTrackerEnabled.value = Boolean((e.target as PaperToggleButtonElement).checked);
		}
	});
})();
