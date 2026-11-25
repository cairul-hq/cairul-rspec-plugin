import { testRunner } from '@cairul/pdk/runner';
import adapter from './run.mjs';
import { junit, testPlugin } from '@cairul/pdk/reports';

const reports = testPlugin('rspec.passed', { junit });

export default testRunner(reports, 'rspec.run', adapter);
