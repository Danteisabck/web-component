import { oneEvent, expect } from '@open-wc/testing';
import '../src/components/date-picker';

describe('DatePicker', () => {
    it('renders an input with type "date"', async () => {
        const el = document.createElement('date-picker');
        document.body.appendChild(el);
        await el.updateComplete;

        const input = el.shadowRoot.querySelector('input');
        expect(input).to.exist;
        expect(input.type).to.equal('date');
    });

    it('dispatches dateSelected event on input change', async () => {
        const el = document.createElement('date-picker');
        document.body.appendChild(el);

        const input = el.shadowRoot.querySelector('input');
        const chosenDate = '2023-08-23';
        const eventPromise = oneEvent(el, 'dateSelected');

        input.value = chosenDate;
        input.dispatchEvent(new Event('change'));

        const event = await eventPromise;
        expect(event).to.exist;
        expect(event.detail).to.equal(chosenDate);
    });
});
