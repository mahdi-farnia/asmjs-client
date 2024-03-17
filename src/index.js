import { ArchAttr, Processor } from '../lib/libasm.js';
import ASMConsole from './asmconsole.js';

const asmConsole = ASMConsole.init();
const [editorForm] = document.forms;
const arch = new ArchAttr();

// prettier-ignore
arch.defineRegisters()
  ("ax", 0)
  ("bx", 0)
  ("cx", 0)
  ("dx", 0)
  ("di", 0)
  ("si", 0);

// prettier-ignore
arch.defineInstructions()
  ("push", (regs, stack, [op]) => {
    console.log("pushing to stack");
    stack.push(op);
  })
  ("pop", (regs, stack, [op]) => {
    console.log(`STACK SIZE WHEN CALLING POP INSTRUCTION: ${stack.length}`);
    console.log("popping from stack");
  
    if (!regs.has(op)) 
      throw new Error(`Unknown register in pop operands: ${op}`);

    regs.set(op, stack.pop())
  })
  ("nop", (regs, stack, ops) => {
    console.log("NOP INSTRUCTION");
    console.table({ regs, stack, ops });
  })
  ("prnt", (regs, stack, operands) => {
    asmConsole.print(operands.join(" "))
  });

window['asmConsole'] = asmConsole;

editorForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const codeElement = guard(this.elements.namedItem('code'));

  const cpu = new Processor(codeElement.value, arch);

  cpu.onFinish(() => console.warn('Finished'));
  cpu.onTrap((err) => console.error(err));

  cpu.execute();
});

/**
 * @template T
 * @param {T} val
 * @param {string} [err]
 * @returns {T | never}
 */
function guard(val, err = '') {
  if (val != null) return val;

  throw new TypeError(err ?? 'null guard error!');
}
