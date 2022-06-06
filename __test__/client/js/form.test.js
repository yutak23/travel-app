import { drewSubmittingBtn } from '../../../src/client/js/form';
describe('class attribute test of adding and removing', () => {
	it('drewSubmittingBtn', async () => {
		document.body.innerHTML =
			'<div>' +
			'  <button id="submit-btn" />' +
			'  <button id="loading-btn" />' +
			'</div>';

		drewSubmittingBtn();

		expect(
			document.querySelector('#submit-btn').classList.contains('display-none')
		).toEqual(true);
		expect(
			document.querySelector('#loading-btn').classList.contains('display-none')
		).toEqual(false);
	});
});
