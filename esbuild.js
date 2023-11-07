const { build, Loader} = require("esbuild");
const { dependencies, peerDependencies } = require('./package.json');
const fs = require("fs");
const path = require("node:path")
const copyPlugin = {
    name: 'gfx-copy-plugin',
    setup(build) {
        fs.mkdirSync(path.resolve(__dirname, 'dist/src/idl'), { recursive: true })
        fs.copyFileSync(path.resolve(__dirname, 'src/idl/gfx_stake_rewards.json'), path.resolve(__dirname, 'dist/src/idl/gfx_stake_rewards.json'))
    }
}
let externalDeps = Object.keys(dependencies)
if(peerDependencies){
    externalDeps=externalDeps.concat(Object.keys(peerDependencies))
}


const sharedConfig = {
    entryPoints: ["src/index.ts"],
    bundle: true,
    minify: true,
    external: externalDeps
};

build({
    ...sharedConfig,
    platform: 'node', // for CJS
    outfile: "dist/index.js",
    format: "cjs",
});

 build({
    ...sharedConfig,
    outfile: "dist/index.esm.js",
    platform: 'neutral', // for ESM
    format: "esm",
     plugins: [copyPlugin]
});

