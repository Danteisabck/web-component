class DestinationDateDisplay extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        this.destination = '';
        this.date = '';

        this.render();
    }

    setDestination(destination) {
        console.log('chosenDestination!', destination);
        this.destination = destination;
        this.render();
    }

    setDate(date) {
        this.date = this.formatDate(date);
        this.render();
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
    }

    render() {
        this.shadowRoot.innerHTML = `
      <p>Chosen destination: ${this.destination}</p>
      <p>Chosen date: ${this.date}</p>
    `;
    }
}

if (!customElements.get('destination-date-display')) {
    customElements.define('destination-date-display', DestinationDateDisplay);
}
