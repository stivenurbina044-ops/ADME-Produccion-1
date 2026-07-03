class ProductForm extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <form>
                <input name="productName" placeholder="Nombre" />
                <input name="productPrice" type="number" placeholder="Precio" />
                <input name="productStock" type="number" placeholder="Stock" />
                <slot name="button">
                    <product-button action="save">Guardar</product-button>
                </slot>
            </form>
        `;
        this.onSubmit = this.onSubmit.bind(this);
        this.onAction = this.onAction.bind(this);
    }

    connectedCallback() {
        this.addEventListener('product-action', this.onAction);
    }

    disconnectedCallback() {
        this.removeEventListener('product-action', this.onAction);
    }

    onAction(event) {
        if (event.detail.action === 'save') {
            this.onSubmit(event);
        }
    }

    onSubmit(event) {
        const formData = new FormData(this.shadowRoot.querySelector('form'));
        this.dispatchEvent(new CustomEvent('product-submit', {
            detail: {
                productName: formData.get('productName'),
                productPrice: Number(formData.get('productPrice')),
                productStock: Number(formData.get('productStock'))
            },
            bubbles: true,
            composed: true
        }));
        this.shadowRoot.querySelector('form').reset();
    }
}

customElements.define('product-form', ProductForm);