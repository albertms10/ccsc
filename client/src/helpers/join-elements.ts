/**
 * Renders the array of elements with a separator as a `JSX.Element`.
 */
export default (
  elements: any[],
  render: Function,
  renderSeparator: Function
): JSX.Element =>
  elements.reduce(
    (result, child, index) =>
      index < elements.length - 1
        ? result.concat([
            render(child, index),
            renderSeparator(index + "-separator"),
          ])
        : result.concat(render(child, index)),
    []
  );
