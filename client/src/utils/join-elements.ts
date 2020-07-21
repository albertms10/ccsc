/**
 * Renders an array of `<T>` elements with a separator.
 */
export default <T>(
  elements: T[],
  render: (element: T, index: number) => T,
  renderSeparator: (key: string) => T
): T[] =>
  elements.reduce(
    (result, element, index) =>
      index < elements.length - 1
        ? result.concat(
            render(element, index) as never,
            renderSeparator(`${index}-separator`) as never
          )
        : result.concat(render(element, index) as never),
    []
  );
