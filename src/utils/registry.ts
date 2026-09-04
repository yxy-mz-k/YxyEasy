import type { App, Component, Plugin } from "vue";

/**
 * 组件注册表
 */
class ComponentRegistry {
  private components: Map<string, Component & Plugin> = new Map();

  /**
   * 注册组件
   */
  register(component: Component & Plugin, name?: string) {
    const componentName =
      name ||
      component.name ||
      (component as any).__name ||
      component.displayName;

    if (!componentName) {
      return;
    }

    this.components.set(componentName, component);
  }

  /**
   * 批量注册组件
   */
  registerAll(components: (Component & Plugin)[]) {
    components.forEach((comp) => this.register(comp));
  }

  /**
   * 获取组件
   */
  get(name: string) {
    return this.components.get(name);
  }

  /**
   * 获取所有组件
   */
  getAll() {
    return Array.from(this.components.values());
  }

  /**
   * 安装所有组件
   */
  install(app: App) {
    this.components.forEach((component, name) => {
      if (component.install) {
        app.use(component);
      } else {
        app.component(name, component);
      }
    });
  }
}

// 创建全局注册表
export const componentRegistry = new ComponentRegistry();

export default componentRegistry;
