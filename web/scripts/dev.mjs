// Servidor de desarrollo. `pnpm dev` levanta Vite, que ya vigila los archivos
// y recarga el navegador al guardar (HMR). Con `pnpm dev --watch` además corre
// el chequeo de tipos de TypeScript en modo watch, así los errores aparecen al
// guardar y no recién en `pnpm build`. El resto de los argumentos (--port,
// --host, etc.) pasan directo a Vite.

import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import path from 'node:path';

const require = createRequire(import.meta.url);
const bin = (pkg, file) => path.join(path.dirname(require.resolve(`${pkg}/package.json`)), file);
const run = (file, args) => spawn(process.execPath, [file, ...args], { stdio: 'inherit' });

const args = process.argv.slice(2);
const children = [run(bin('vite', 'bin/vite.js'), args.filter((arg) => arg !== '--watch'))];
if (args.includes('--watch')) {
  children.push(run(bin('typescript', 'bin/tsc'), ['--noEmit', '--watch', '--preserveWatchOutput']));
}

// Cuando uno termina (Ctrl+C o un error), se cierra el otro y se devuelve su código.
let exiting = false;
for (const child of children) {
  child.on('exit', (code, signal) => {
    if (exiting) return;
    exiting = true;
    process.exitCode = code ?? (signal ? 1 : 0);
    for (const other of children) other.kill();
  });
}
