import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    this.element.textContent = "It works!";

    addEventListener('hello_clicked', (event) => {

      const comp = document.getElementById('hello_world_comp');

      // Passing data in dynamically
      comp.setAttribute('color', '#ff0000');

      this.element.textContent = 'Stimulus Says: Web Component Clicked!';
    }); 
  }
}
