import { testRunner } from '@cairul/plugin-kit/runner';
import adapter from './run.mjs';
import { junit, testPlugin } from '@cairul/plugin-kit/reports';

const reports = testPlugin('rspec.passed', { junit });

export default testRunner(reports, 'rspec.run', adapter);
