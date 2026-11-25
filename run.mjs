import { join } from 'node:path';
import { count, z } from '@cairul/pdk';
import {
  counts,
  list,
  locations,
  lineLocations,
  option,
  repeat,
  report,
  requireExclusive,
  selectors,
  value,
} from '@cairul/pdk/runner';

function summarize(output) {
  const {
    example_count: total,
    failure_count: failed,
    pending_count: skipped,
  } = z
    .object({
      summary: z.object({ example_count: count, failure_count: count, pending_count: count }),
    })
    .parse(JSON.parse(output)).summary;
  return counts(Math.max(0, total - failed - skipped), failed, skipped);
}

export default {
  command: ['rspec'],
  select: selectors({ files: list, locations: lineLocations, description: value, tags: list }),
  build(select, temp) {
    requireExclusive(select.files, select.locations);
    return {
      args: [
        '--format',
        'json',
        '--out',
        join(temp, 'result.json'),
        ...option('--example', select.description),
        ...repeat('--tag', select.tags),
        ...(select.files ?? locations(select.locations)),
      ],
      read: report('result.json', summarize),
    };
  },
};
