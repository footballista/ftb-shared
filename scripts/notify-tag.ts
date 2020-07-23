import { emoji } from '../src/shared/utils/emoji';
import { TgClient } from '../src/shared/utils/telegram';
import { getRepository } from '../src/shared/utils/repository';
import { readFileSync } from 'fs';

const tgClient = new TgClient();

const notify = async () => {
  const repo = await getRepository();
  const tag = process.env.GITHUB_REF.split('/')[2];
  const changes = JSON.parse(readFileSync(__dirname + '/../CHANGELOG.json').toString())[tag];
  await tgClient.sendMessage(
    'channel',
    `${emoji.purple_heart} *SHARED COMPONENTS* new tag *v.${tag}* released. Do not forget to update dependencies in client projects.\n\n
Changes: \n ${changes}

\n\n Full changelog: https://github.com/${repo.owner}/${repo.name}/blob/master/CHANGELOG.md`,
  );
};

notify();
