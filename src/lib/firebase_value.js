/* eslint no-param-reassign: 0, consistent-return: 0 */

export default function firebaseValue(Vue) {
  Vue.prototype.$firebaseValue = (props, key) => {
    if (!Array.isArray(props) || props.length === 0) return;

    return props.reduce((acc, prop) => {
      if (prop['.key'] === key) {
        const val = prop['.value'];
        const { '.key': _, ...rest } = prop;
        return val || rest;
      }
      return acc;
    }, undefined);
  };
}
