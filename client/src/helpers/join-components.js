export default (components, render, renderSeparator) =>
  components.reduce(
    (result, child, index) =>
      index < components.length - 1
        ? result.concat([
            render(child, index),
            renderSeparator(index + "-separator"),
          ])
        : result.concat(render(child, index)),
    []
  );
