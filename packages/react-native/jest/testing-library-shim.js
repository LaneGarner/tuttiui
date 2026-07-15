/**
 * Shim that maps @testing-library/react-native APIs
 * to @testing-library/react equivalents. Our RN mocks
 * render to plain React elements, so we can use the
 * DOM testing library underneath.
 */
const rtl = require("@testing-library/react");

function wrapRender(result) {
  return {
    ...result,
    getByRole: (...args) => result.container.querySelector(`[role="${args[0]}"]`) || rtl.screen.getByRole(...args),
    getByText: (...args) => rtl.screen.getByText(...args),
    getByTestId: (...args) => rtl.screen.getByTestId(...args),
    queryByTestId: (...args) => rtl.screen.queryByTestId(...args),
    queryByText: (...args) => rtl.screen.queryByText(...args),
    queryByRole: (...args) => rtl.screen.queryByRole(...args),
    getAllByText: (...args) => rtl.screen.getAllByText(...args),
    getAllByRole: (...args) => rtl.screen.getAllByRole(...args),
    getByPlaceholderText: (...args) => rtl.screen.getByPlaceholderText(...args),
    queryByPlaceholderText: (...args) => rtl.screen.queryByPlaceholderText(...args),
    getByLabelText: (...args) => rtl.screen.getByLabelText(...args),
    queryByLabelText: (...args) => rtl.screen.queryByLabelText(...args),
    findByText: (...args) => rtl.screen.findByText(...args),
    findByTestId: (...args) => rtl.screen.findByTestId(...args),
    UNSAFE_getByType: () => null,
    toJSON: () => null,
    debug: (...args) => rtl.screen.debug(...args),
  };
}

const fireEvent = {
  press: (element) => {
    // Our mocks map onPress to onClick
    rtl.fireEvent.click(element);
  },
  longPress: (element) => {
    // Our mocks map onLongPress to onContextMenu
    rtl.fireEvent.contextMenu(element);
  },
  changeText: (element, text) => {
    rtl.fireEvent.change(element, { target: { value: text } });
  },
  focus: (element) => {
    rtl.fireEvent.focus(element);
  },
  blur: (element) => {
    rtl.fireEvent.blur(element);
  },
  scroll: (element, eventData) => {
    rtl.fireEvent.scroll(element, eventData);
  },
  submitEditing: (element) => {
    rtl.fireEvent.submit(element);
  },
};

const screen = new Proxy(rtl.screen, {
  get(target, prop) {
    if (prop === "getByRole") {
      return (...args) => {
        try {
          return target.getByRole(...args);
        } catch {
          const el = document.querySelector(`[role="${args[0]}"]`);
          if (el) return el;
          throw new Error(`Unable to find role="${args[0]}"`);
        }
      };
    }
    return target[prop];
  },
});

module.exports = {
  render: (element, options) => {
    const result = rtl.render(element, options);
    return wrapRender(result);
  },
  screen,
  fireEvent,
  act: rtl.act,
  waitFor: rtl.waitFor,
  cleanup: rtl.cleanup,
  within: rtl.within,
};
