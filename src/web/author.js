class Author extends HTMLElement {
  // constructor is called when the element is displayed
  constructor() {
    super();

    // Attach to Shadow DOM
    this.attachShadow({
      mode: "open"
    });

    // Create Template Element with Slot
    let template = document.createElement('template');
    template.innerHTML = `<div id="author-data" style="border: 1px solid black"></div>`;

    // Attach
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  // Life cycle hook when web component is attached
  // to the DOM
  connectedCallback() {
  }

  renderUser(id = 1) {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(response => response.json())
      .then(json => `<p>${json.name}</p><p>${json.username}</p><p>${json.email}</p>`)
      .then(html => this.shadowRoot.getElementById('author-data').innerHTML = html)
      .then(_ => this.notifyLoad());
  }

  notifyLoad() {
    this.dispatchEvent(new CustomEvent("author_loaded", {
      bubbles: true,
      cancelable: false,
      composed: true,  // Break out of the shadow!!! (DOM)
    }));
  }

  // Define Observed Attributes
  static get observedAttributes() {
    return ['user-id'];
  }

  // Attribute Value Changed
  attributeChangedCallback(name, oldValue, newValue) {
    if (name == 'user-id') {
      console.log('user-id-changed');
      this.renderUser(newValue);
    }
  }
}

// make sure that the <hello-world></hello-world>
// or simply <hello-world /> is recognised as this element
window.customElements.define("author-data", Author);
