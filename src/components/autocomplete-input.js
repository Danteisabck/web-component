import debounce from 'lodash/debounce';
import axios from "axios";

class AutocompleteInput extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        const template = document.createElement('template');
        template.innerHTML = `
             <style>
                :host {
                    display: block;
                    width: 700px;
                }
                
                .input-container {
                    display: flex;
                    align-items: center;
                    border-bottom: 2px solid #67c5f0;
                    margin-bottom: 20px;
                }

                input {
                    flex: 1;
                    padding: 10px;
                    border: none;
                    outline: none;
                }
                .results-container {
                    background-color: #def1fd;
                    padding: 0 10px;
                }
                .result-item {
                    display: flex;
                    align-items: center;
                    text-transform: capitalize;
                    padding: 5px 0;
                }
                .highlight {
                    font-weight: bold;
                }
                .text {
                    margin-left: 10px;
                }
            </style>
            <div class="input-container">
                <custom-icon class="input-icon" name="beach_access"></custom-icon>
                <input type="text" placeholder="Enter a destination...">
                <custom-icon class="search-icon" name="search"></custom-icon>
            </div>
            <div class="results-container"></div>
        `;

        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.input = this.shadowRoot.querySelector('input');
        this.resultsContainer = this.shadowRoot.querySelector('.results-container');

        this.debouncedHandleInput = debounce(this.handleInput.bind(this), 300);
        this.input.addEventListener('input', (e) => this.debouncedHandleInput(e.target.value));

        this.resultsContainer.addEventListener('click', this.handleResultClick.bind(this));
    }

    async handleInput(keyword) {
        this.fetchAutocompleteResultsAxios(keyword);
    }

    async fetchAutocompleteResultsAxios(keyword) {
        try {
            const response = await axios.get(`https://api.cloud.tui.com/search-destination/v2/de/package/TUICOM/2/autosuggest/peakwork/${keyword}`);
            this.displayResults(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    displayResults(results) {
        this.resultsContainer.innerHTML = '';

        const searchTerm = this.input.value.toLowerCase();

        const template = document.createElement('template');
        results[0].items.forEach(result => {
            const resultText = result.name.toLowerCase();
            const highlightedText = resultText.replace(
                new RegExp(searchTerm, 'gi'),
                match => `<span class="highlight">${match}</span>`
            );

            template.innerHTML = `
                <div class="result-item">
                    <custom-icon name="location_on"></custom-icon>
                    <div class="text">${highlightedText}</div>
                </div>
            `;

            const resultItem = template.content.firstElementChild.cloneNode(true);
            this.resultsContainer.appendChild(resultItem);
        });
    }

    handleResultClick(event) {
        const resultItem = event.target.closest('.result-item');
        if (resultItem) {
            const selectedItem = resultItem.querySelector('.text').textContent;
            this.input.value = '';
            this.resultsContainer.innerHTML = '';

            this.dispatchEvent(new CustomEvent('destinationSelected', {
                detail: selectedItem
            }));
        }
    }
}

if (!customElements.get('autocomplete-input')) {
    customElements.define('autocomplete-input', AutocompleteInput);
}
