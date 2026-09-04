import type { DescriptionProps, DescInstance, UseDescReturnType } from './typing';
import { ref, getCurrentInstance, unref } from 'vue';

export function useDescription(props?: Partial<DescriptionProps>): UseDescReturnType {
  if (!getCurrentInstance()) {
    throw new Error('useDescription() can only be used inside setup() or functional components!');
  }
  const desc = ref<Nullable<DescInstance>>(null);
  const loaded = ref(false);
  const descUid = ref<any>(null);

  function register(instance: DescInstance) {
    const instanceUid = getCurrentInstance()?.uid;
    // When destroyOnClose modal reopens, component uid changes
    if (unref(loaded) && unref(descUid) === instanceUid) {
      return;
    }
    desc.value = instance;
    descUid.value = instanceUid;
    props && instance.setDescProps(props);
    loaded.value = true;
  }

  const methods: DescInstance = {
    setDescProps: (descProps: Partial<DescriptionProps>): void => {
      unref(desc)?.setDescProps(descProps);
    },
  };

  return [register, methods];
}
