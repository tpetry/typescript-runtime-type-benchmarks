import { type } from 'arktype';
import { addCase } from '../benchmarks';

const LooseType = type({
  number: 'number',
  negNumber: 'number',
  maxNumber: 'number',
  string: 'string',
  longString: 'string',
  boolean: 'boolean',
  deeplyNested: {
    foo: 'string',
    num: 'number',
    bool: 'boolean',
  },
});

const SafeType = type({
  '+': 'delete',
  number: 'number',
  negNumber: 'number',
  maxNumber: 'number',
  string: 'string',
  longString: 'string',
  boolean: 'boolean',
  deeplyNested: {
    '+': 'delete',
    foo: 'string',
    num: 'number',
    bool: 'boolean',
  },
}).onDeepUndeclaredKey('delete');

const StrictType = type({
  '+': 'reject',
  number: 'number',
  negNumber: 'number',
  maxNumber: 'number',
  string: 'string',
  longString: 'string',
  boolean: 'boolean',
  deeplyNested: {
    '+': 'reject',
    foo: 'string',
    num: 'number',
    bool: 'boolean',
  },
});

addCase('arktype', 'assertLoose', data => {
  if (LooseType.allows(data)) return true;
  throw new Error('Invalid');
});

addCase('arktype', 'assertStrict', data => {
  if (StrictType.allows(data)) return true;
  throw new Error('Invalid');
});

addCase('arktype', 'parseSafe', data => {
  return SafeType.assert(data);
});

addCase('arktype', 'parseStrict', data => {
  return StrictType.assert(data);
});
