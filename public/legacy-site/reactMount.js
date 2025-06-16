// File: reactMount.js
window.mountReactApp = function (targetEl, ComponentFn) {
  const root = ReactDOM.createRoot(targetEl);
  root.render(React.createElement(ComponentFn));
};
