class CustomIcon extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        const style = document.createElement('style');
        style.textContent = `
            @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');
        
            .material-symbols-outlined {
                font-variation-settings:
                    'FILL' 0,
                    'wght' 400,
                    'GRAD' 0,
                    'opsz' 24
            }
        `;

        const iconName = this.getAttribute('name');
        const resultIcon = document.createElement('span');
        resultIcon.className = 'material-symbols-outlined';
        resultIcon.innerHTML = iconName;

        this.shadowRoot.appendChild(style);
        this.shadowRoot.appendChild(resultIcon);
    }
}

if (!customElements.get('custom-icon')) {
    customElements.define('custom-icon', CustomIcon);
}
