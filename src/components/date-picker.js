export class DatePicker extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        this.input = document.createElement('input');
        this.input.type = 'date';

        this.input.addEventListener('change', this.handleDateChange.bind(this));

        this.shadowRoot.appendChild(this.input);
    }

    handleDateChange(event) {
        const chosenDate = event.target.value;

        this.dispatchEvent(new CustomEvent('dateSelected', {
            detail: chosenDate
        }));
    }
}

if (!customElements.get('date-picker')) {
    customElements.define('date-picker', DatePicker);
}
