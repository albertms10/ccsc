/**
 * Renders an array of elements with a separator.
 */
export default <T, U>(
  elements: T[],
  render: (element: T, index: number) => U,
  renderSeparator: (key: string) => U
): U[] =>
  elements.reduce(
    (result, element, index) =>
      result.concat(
        render(element, index) as never,
        ...(index < elements.length - 1
          ? [renderSeparator(`${index}-separator`) as never]
          : [])
      ),
    []
  );
