class ProductButton extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        const action = this.getAttribute('action') || '';
        this.shadowRoot.innerHTML = `
            <button type="button"><slot></slot></button>
        `;
        this.onClick = () => {
            this.dispatchEvent(new CustomEvent('product-action', {
                detail: { action },
                bubbles: true,
                composed: true
            }));
        };
    }

    connectedCallback() {
        this.shadowRoot.querySelector('button').addEventListener('click', this.onClick);
    }

    disconnectedCallback() {
        this.shadowRoot.querySelector('button').removeEventListener('click', this.onClick);
    }
}

customElements.define('product-button', ProductButton);
