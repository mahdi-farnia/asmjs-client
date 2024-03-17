class ASMConsole {
  /**
   * @type {HTMLElement}
   */
  #listElem;

  constructor() {
    this.#listElem = document.getElementById('asmconsole');
  }

  print(msg) {
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(msg));
    this.#listElem.appendChild(li);
  }

  static #instance;
  static init() {
    if (!ASMConsole.#instance) ASMConsole.#instance = new ASMConsole();
    return ASMConsole.#instance;
  }
}

export default ASMConsole;
