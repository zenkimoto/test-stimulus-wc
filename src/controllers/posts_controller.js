import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(json => json.reduce((acc, c) => `<tr>
                                              <td>${c.title}</td>
                                              <td><button data-action="click->posts#clicked" data-id="${c.userId}">View Author</button></td>
                                              </tr>${acc}`, ''))
      .then(html => this.element.innerHTML = html);
    // Dynamically add data action posts#clicked
  }

  clicked(event) {
    // Get id value from data attribute
    const userId = event.currentTarget.dataset.id;

    // dynamically set web component attribute
    document.getElementById('author-detail').setAttribute('user-id', userId);
  }
}
