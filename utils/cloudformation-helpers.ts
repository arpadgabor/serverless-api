/**
 * The intrinsic function Ref returns the value of the specified parameter or resource.
 * @param logicalName Must be a literal string
 * @see [Reference](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/intrinsic-function-reference-ref.html)
 */
export const Ref = (logicalName: string) => ({
  Ref: logicalName,
})

/**
 * The intrinsic function `Fn::Sub` substitutes variables in an input string with values that you specify.
 *
 * In your templates, you can use this function to construct commands or outputs that include values that aren't available until you create or update a stack.
 *
 * @see [Reference](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/intrinsic-function-reference-sub.html)
 */
export const Sub = (value: string, substitutes?: object) => ({
  'Fn::Sub': substitutes ? [value, substitutes] : value,
})

/**
 * The intrinsic function `Fn::Join` appends a set of values into a single value, separated by the specified delimiter.
 *
 * If a delimiter is the empty string, the set of values are concatenated with no delimiter.
 *
 * @see [Reference](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/intrinsic-function-reference-join.html)
 */
export const Join = (delimiter: string, values: (string | object)[]) => ({
  'Fn::Join': [delimiter, values],
})

/**
 * The `Fn::GetAtt` intrinsic function returns the value of an attribute from a resource in the template.
 *
 * For more information about GetAtt return values for a particular resource, refer to the documentation for that resource in the [Resource and property reference](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-template-resource-type-ref.html).
 *
 * @see [Reference](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/intrinsic-function-reference-getatt.html)
 */
export const GetAtt = (
  logicalNameOfResource: string,
  attributeName: string | typeof Ref
) => ({
  'Fn::GetAtt': [logicalNameOfResource, attributeName],
})

/**
 * To split a string into a list of string values so that you can select an element from the resulting string list, use the `Fn::Split` intrinsic function.
 *
 * Specify the location of splits with a delimiter, such as `,` (a comma).
 *
 * After you split a string, use the `Fn::Select` function to pick a specific element.
 *
 * @see [Reference](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/intrinsic-function-reference-split.html)
 */
export const Split = (delimiter: string, values: (string | object)[]) => ({
  'Fn::Split': [delimiter, values],
})

/**
 * The intrinsic function `Fn::Select` returns a single object from a list of objects by index.
 *
 * @see [Reference](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/intrinsic-function-reference-select.html)
 */
export const Select = (
  index: number | object,
  values: (string | object)[]
) => ({
  'Fn::Select':
    typeof index === 'number' ? [`${index}`, values] : [index, values],
})
