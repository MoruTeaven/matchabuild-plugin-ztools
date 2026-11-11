import {
  applyAssets,
  applyManifest,
  defineRunnerPlugin,
  getRunner,
} from '@moruteaven/matchabuild';

/**
 * ZTools 插件式宿主：与 uTools 同构，复用内核 vite runner + 清单能力。
 */
export default defineRunnerPlugin({
  id: 'ztools',

  async build(target, ctx) {
    const front = await getRunner('vite').build(target, ctx);
    await applyAssets(target, ctx);
    await applyManifest(target, ctx);
    return { ...front, runner: 'ztools' };
  },

  async dev(target, ctx) {
    await getRunner('vite').dev(target, ctx);
  },
});
