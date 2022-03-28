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
  }

  clicked(event) {
    console.log(`clicked ${event.currentTarget.textContent.trim()}`)
    console.log('ID: ' + event.currentTarget.dataset.id);
  }
}
